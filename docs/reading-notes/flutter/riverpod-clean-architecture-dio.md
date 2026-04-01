---
outline: [2, 3]
---

# Flutter：Riverpod + Clean Architecture + Dio（用户卡片 + 订单列表）

与 [MVVM 完整示例：用户详情页（用户卡片 + 订单列表）](../android/mvvm-example-user-orders.md) **同一业务场景**：上方 **用户卡片**，下方 **该用户订单列表**。本文用 **Clean Architecture** 分层，**Dio** 做 HTTP，**Riverpod** 做依赖注入与 UI 状态订阅。

::: info 范围说明
为突出 **架构骨架**，演示 **只做远程数据源**（不写本地 Room / Drift；上线可加 `data/local` 再在 Repository 里做缓存策略，思路与 Android 那篇一致）。

下文是 **主流、可参考** 的分层与组合，**不是** Flutter 官方钦点的「唯一最佳实践」——见 [与「最佳实践」的关系](#best-practice)。**完整 Clean Architecture** 与本文取舍见 [完整版与本文的对比](#full-vs-simplified)。
:::

## 与 Android MVVM 的对应关系

| Android | Flutter（本示例） |
|---------|-------------------|
| `ViewModel` + `StateFlow` / `UiState` | **Riverpod**：`AsyncNotifier` / `FutureProvider` + `AsyncValue` |
| `Repository` 接口 + 实现 | **Domain** `abstract class` + **Data** `*Impl` |
| Retrofit `ApiService` | **Dio** + `RemoteDataSource`（按资源拆分也可） |
| Hilt 注入 | **`Provider` / `Notifier` 的 `ref.watch`** |
| DTO ↔ Entity / Domain | **Data** `*Dto` + `mapper` → **Domain** `User` / `Order` |
| Compose / XML `collectAsState` | **`ref.watch(provider)`** + `when` / `switch` |

---

## 页面布局示意

```
┌─────────────────────────────────┐
│  查看用户 [ 1 ▼ ]   [ 刷新 ]    │
├─────────────────────────────────┤
│  [头像] 姓名 · 邮箱 · ID         │
│  会员 / 其他信息                 │
├─────────────────────────────────┤
│  订单列表                        │
│  ┌───────────────────────────┐  │
│  │ 订单 … · 金额 · 状态      │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

## 分层与目录（主流 Clean Architecture）

```
lib/
  main.dart
  core/
    network/
      dio_provider.dart          # 统一 Dio：BaseOptions、拦截器（可选）
  features/
    user_orders/
      domain/
        entities/
          user.dart
          order.dart
        repositories/
          user_repository.dart   # 抽象，只依赖 entity
      data/
        models/
          user_dto.dart
          post_dto.dart          # 演示用「帖子」模拟订单列表（JSONPlaceholder）
        mappers/
          user_mapper.dart
          order_mapper.dart
        datasources/
          user_remote_datasource.dart
        repositories/
          user_repository_impl.dart
      presentation/
        providers/
          user_orders_providers.dart
        pages/
          user_orders_page.dart
```

**依赖方向（只能向内）**：`presentation` → `domain` ← `data`。  
**Data** 实现 Domain 里定义的 Repository；**Presentation** 只认识 Domain 的实体与用例，不直接依赖 Dio。

---

## `pubspec.yaml` 依赖

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.6.1
  dio: ^5.7.0
```

---

## 1. Domain：实体与仓库契约

### `domain/entities/user.dart`

```dart
class User {
  const User({
    required this.id,
    required this.name,
    required this.email,
    this.avatarUrl,
    required this.createdAt,
    required this.membershipLevel,
  });

  final String id;
  final String name;
  final String email;
  final String? avatarUrl;
  final String createdAt;
  final String membershipLevel;
}
```

### `domain/entities/order.dart`

```dart
class Order {
  const Order({
    required this.id,
    required this.userId,
    required this.totalAmount,
    required this.status,
    required this.createdAt,
  });

  final String id;
  final String userId;
  final double totalAmount;
  final String status;
  final String createdAt;
}
```

### `domain/repositories/user_repository.dart`

```dart
import '../entities/order.dart';
import '../entities/user.dart';

/// 领域层只描述「能做什么」，不关心 Dio / JSON。
abstract class UserRepository {
  Future<User> getUser(String userId);
  Future<List<Order>> getOrdersByUser(String userId);
}
```

---

## 2. Data：DTO、Mapper、DataSource、Repository 实现

### `data/models/user_dto.dart`

```dart
class UserDto {
  UserDto({
    required this.id,
    required this.name,
    required this.email,
    this.address,
    this.company,
  });

  factory UserDto.fromJson(Map<String, dynamic> json) {
    return UserDto(
      id: json['id'] as int,
      name: json['name'] as String,
      email: json['email'] as String,
      address: json['address'] as Map<String, dynamic>?,
      company: json['company'] as Map<String, dynamic>?,
    );
  }

  final int id;
  final String name;
  final String email;
  final Map<String, dynamic>? address;
  final Map<String, dynamic>? company;
}
```

### `data/models/post_dto.dart`（演示：帖子列表 ≈ 订单列表）

```dart
class PostDto {
  PostDto({
    required this.id,
    required this.userId,
    required this.title,
    required this.body,
  });

  factory PostDto.fromJson(Map<String, dynamic> json) {
    return PostDto(
      id: json['id'] as int,
      userId: json['userId'] as int,
      title: json['title'] as String,
      body: json['body'] as String,
    );
  }

  final int id;
  final int userId;
  final String title;
  final String body;
}
```

### `data/mappers/user_mapper.dart`

```dart
import '../../domain/entities/user.dart';
import '../models/user_dto.dart';

extension UserDtoMapper on UserDto {
  User toDomain() {
    final zip = address?['zipcode'] as String?;
    return User(
      id: id.toString(),
      name: name,
      email: email,
      avatarUrl: 'https://i.pravatar.cc/128?u=$id',
      createdAt: zip != null ? '邮编 $zip' : '—',
      membershipLevel: company?['name'] as String? ?? '—',
    );
  }
}
```

### `data/mappers/order_mapper.dart`

```dart
import '../../domain/entities/order.dart';
import '../models/post_dto.dart';

extension PostDtoListMapper on List<PostDto> {
  List<Order> toOrders(String userId) {
    return map((p) {
      return Order(
        id: p.id.toString(),
        userId: userId,
        totalAmount: (10 + p.body.length * 0.5).roundToDouble(),
        status: p.title.length > 36 ? '${p.title.substring(0, 36)}…' : p.title,
        createdAt: '#${p.id}',
      );
    }).toList();
  }
}
```

### `data/datasources/user_remote_datasource.dart`

```dart
import 'package:dio/dio.dart';

import '../models/post_dto.dart';
import '../models/user_dto.dart';

/// 只负责 HTTP；异常原样抛出，由上层或全局错误处理转换。
class UserRemoteDataSource {
  UserRemoteDataSource(this._dio);

  final Dio _dio;

  Future<UserDto> fetchUser(String userId) async {
    final response = await _dio.get<Map<String, dynamic>>('/users/$userId');
    if (response.statusCode == 404) {
      throw DioException(
        requestOptions: response.requestOptions,
        response: response,
        type: DioExceptionType.badResponse,
        message: '用户不存在',
      );
    }
    return UserDto.fromJson(response.data!);
  }

  Future<List<PostDto>> fetchPostsByUser(String userId) async {
    final response = await _dio.get<List<dynamic>>(
      '/posts',
      queryParameters: {'userId': userId},
    );
    final list = response.data ?? [];
    return list
        .map((e) => PostDto.fromJson(e as Map<String, dynamic>))
        .toList();
  }
}
```

::: tip 真实项目
把 `fetchPostsByUser` 换成 `GET /users/:id/orders`，并新增 `OrderDto.fromJson`，`order_mapper` 映射即可；**不必改 Domain 与页面**。
:::

### `data/repositories/user_repository_impl.dart`

```dart
import '../../domain/entities/order.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/user_repository.dart';
import '../datasources/user_remote_datasource.dart';
import '../mappers/order_mapper.dart';
import '../mappers/user_mapper.dart';

class UserRepositoryImpl implements UserRepository {
  UserRepositoryImpl(this._remote);

  final UserRemoteDataSource _remote;

  @override
  Future<User> getUser(String userId) async {
    final dto = await _remote.fetchUser(userId);
    return dto.toDomain();
  }

  @override
  Future<List<Order>> getOrdersByUser(String userId) async {
    final posts = await _remote.fetchPostsByUser(userId);
    return posts.toOrders(userId);
  }
}
```

---

## 3. Core：Dio 单例（Base URL + 拦截器）

### `core/network/dio_provider.dart`

```dart
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

/// 与 Web 的 VITE_API_BASE 同理：可用 dart-define 注入生产地址。
const String kApiBaseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'https://jsonplaceholder.typicode.com',
);

final dioProvider = Provider<Dio>((ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: kApiBaseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
      headers: {'Accept': 'application/json'},
    ),
  );

  dio.interceptors.add(
    LogInterceptor(
      requestBody: true,
      responseBody: true,
      logPrint: (o) => print(o),
    ),
  );

  return dio;
});
```

运行时可覆盖基址：

```bash
flutter run --dart-define=API_BASE_URL=https://api.example.com
```

---

## 4. Presentation：Riverpod Provider 与页面

### `presentation/providers/user_orders_providers.dart`

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/dio_provider.dart';
import '../../data/datasources/user_remote_datasource.dart';
import '../../data/repositories/user_repository_impl.dart';
import '../../domain/entities/order.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/user_repository.dart';

final userRemoteDataSourceProvider = Provider<UserRemoteDataSource>((ref) {
  return UserRemoteDataSource(ref.watch(dioProvider));
});

final userRepositoryProvider = Provider<UserRepository>((ref) {
  return UserRepositoryImpl(ref.watch(userRemoteDataSourceProvider));
});

/// 按 userId 拉取用户（缓存策略可用 riverpod_annotation + keepAlive 扩展）
final userProvider = FutureProvider.family<User, String>((ref, userId) async {
  final repo = ref.watch(userRepositoryProvider);
  return repo.getUser(userId);
});

final ordersProvider =
    FutureProvider.family<List<Order>, String>((ref, userId) async {
  final repo = ref.watch(userRepositoryProvider);
  return repo.getOrdersByUser(userId);
});
```

::: tip 与 TanStack Query 的对照
`FutureProvider.family` 类似「按参数缓存的异步查询」；下拉刷新可对对应 `ref.invalidate(userProvider(userId))`。
:::

### `presentation/pages/user_orders_page.dart`

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../domain/entities/user.dart';
import '../providers/user_orders_providers.dart';

class UserOrdersPage extends ConsumerStatefulWidget {
  const UserOrdersPage({super.key});

  @override
  ConsumerState<UserOrdersPage> createState() => _UserOrdersPageState();
}

class _UserOrdersPageState extends ConsumerState<UserOrdersPage> {
  String _userId = '1';
  static const _options = ['1', '2', '5', '999'];

  @override
  Widget build(BuildContext context) {
    final userAsync = ref.watch(userProvider(_userId));
    final ordersAsync = ref.watch(ordersProvider(_userId));

    return Scaffold(
      appBar: AppBar(
        title: const Text('用户与订单'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              ref.invalidate(userProvider(_userId));
              ref.invalidate(ordersProvider(_userId));
            },
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Row(
            children: [
              const Text('查看用户：'),
              const SizedBox(width: 12),
              DropdownButton<String>(
                value: _userId,
                items: _options
                    .map(
                      (id) => DropdownMenuItem(
                        value: id,
                        child: Text(
                          id == '999' ? '999（测 404）' : '用户 $id',
                        ),
                      ),
                    )
                    .toList(),
                onChanged: (v) {
                  if (v != null) setState(() => _userId = v);
                },
              ),
            ],
          ),
          const SizedBox(height: 16),
          userAsync.when(
            data: (u) => _UserCard(u: u),
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (e, _) => Text('用户加载失败：$e'),
          ),
          const SizedBox(height: 24),
          const Text('订单列表', style: TextStyle(fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          ordersAsync.when(
            data: (list) {
              if (list.isEmpty) {
                return const Text('暂无订单（演示数据可能为空）');
              }
              return Column(
                children: list
                    .map(
                      (o) => Card(
                        child: ListTile(
                          title: Text('订单 ${o.id}'),
                          subtitle: Text(
                            '${o.createdAt} · ¥${o.totalAmount.toStringAsFixed(2)} · ${o.status}',
                          ),
                        ),
                      ),
                    )
                    .toList(),
              );
            },
            loading: () => const Padding(
              padding: EdgeInsets.all(24),
              child: Center(child: CircularProgressIndicator()),
            ),
            error: (e, _) => Text('订单失败：$e'),
          ),
        ],
      ),
    );
  }
}

class _UserCard extends StatelessWidget {
  const _UserCard({required this.u});

  final User u;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (u.avatarUrl != null)
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.network(
                  u.avatarUrl!,
                  width: 56,
                  height: 56,
                  fit: BoxFit.cover,
                ),
              ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    u.name,
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 4),
                  Text('ID: ${u.id} · ${u.email}'),
                  Text(
                    '${u.createdAt} · ${u.membershipLevel}',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

### `main.dart`

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'features/user_orders/presentation/pages/user_orders_page.dart';

void main() {
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'User Orders Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      home: const UserOrdersPage(),
    );
  }
}
```

---

## 5. 数据流小结（对照 Android 那篇「参数驱动」）

```
userId（State / Dropdown）
    ↓
ref.watch(userProvider(userId)) / ordersProvider(userId)
    ↓
UserRepository（Domain 接口）
    ↓
UserRepositoryImpl → UserRemoteDataSource → Dio GET
```

- **换用户**：`setState` 更新 `_userId` → Riverpod 自动用新 `family` 参数请求（并缓存不同 `userId` 的结果）。
- **刷新**：`ref.invalidate(...)` 丢弃缓存并重新 `Future`。

---

## 6. 可选扩展

| 能力 | 做法 |
|------|------|
| 本地缓存 | `data/local` + `isar` / `drift`，在 `UserRepositoryImpl` 内合并远程与本地 |
| 全局错误 / Token | Dio `InterceptorsWrapper` 里统一处理 401、刷新 Token |
| 代码生成 | `riverpod_annotation` + `@riverpod` 生成 Provider，减少手写 |
| 分页 | Domain 增加 `getOrdersPage(userId, page)`，Provider 用 `AsyncNotifier` 累积列表 |

---

## 完整 Clean Architecture 与本文的对比 {#full-vs-simplified}

「完整」一般指贴近 Robert C. Martin 原书的分层：**依赖由外向内**，内层不依赖外层；在 Flutter 里常会再细化为 **Entity → UseCase → Repository 接口 → Data 实现 → UI**。

| 层次 / 概念 | **更「完整」的 Clean Architecture** | **本文示例（刻意简化）** |
|---------------|--------------------------------------|---------------------------|
| **Entity** | 纯业务实体 + 不变式；可与框架无关 | ✅ 有 `User` / `Order` |
| **Use Case（用例）** | **每个业务动作一个类**（如 `GetUserUseCase`、`ObserveOrdersUseCase`），只依赖 **Repository 接口**，编排领域规则 | ❌ 未单独建用例类；**直接**在 UI 侧通过 `UserRepository` 调 `getUser` / `getOrdersByUser`，等价于把「用例」**折叠进 Repository 方法** |
| **Repository 接口** | 常表示「数据从哪来」的抽象；复杂场景下 **UseCase 组合多个 Repository** | ✅ 有 `UserRepository` 抽象；**仅远程**一种来源 |
| **Data 层** | DTO、Mapper、**Remote + Local** DataSource、**RepositoryImpl** 里做缓存/合并/重试策略 | ✅ DTO + Mapper + `UserRemoteDataSource` + `UserRepositoryImpl`；❌ **无**本地 DB、无「先缓存再网络」的完整策略 |
| **错误模型** | Domain 层定义 `Failure` / `Result<T>`，不把 `DioException` 泄漏到 UI | ❌ 演示里异常沿 `AsyncValue.error` 上抛，**未**做领域错误映射 |
| **Presentation** | 只依赖 **UseCase**（或仅依赖抽象端口），不直接 new 具体实现 | 依赖 `UserRepository`（抽象）✅；若严格到「只依赖 UseCase」，则 Presentation 不应直接 `watch(repository)` |

**一句话区别**：  
- **完整版**：**用例类**显式存在，领域规则与「取数」分离更清晰，适合规则多、多数据源、要强测「业务编排」的团队。  
- **本文**：**Repository 即端口**，用例逻辑薄时直接由 **Riverpod + Repository** 驱动，层数少、上手快，是社区里常见的 **「Pragmatic / 精简 Clean」**，不是原书四层样样齐全。

若要往「更完整」演进，最小增量通常是：在 `domain/usecases/` 增加 `GetUserUseCase(ref: UserRepository)`，`userProvider` 只调用 UseCase；再视需要加 `Result`/`Failure` 与本地 DataSource。

---

## 与「最佳实践」的关系 {#best-practice}

**结论：这是业界里很常见的一种「可维护、可测试」组合，但没有放之四海皆准的唯一答案。**

| 维度 | 说明 |
|------|------|
| **Riverpod + 分层 Repository** | 在 Flutter 社区里**使用面广**，官方维护、与测试/覆盖 `ProviderScope` 的集成成熟，**可以算「推荐候选」之一**，但不是必须用 Riverpod（Bloc、get_it + 手写类同样常见）。 |
| **Clean Architecture 全量三层** | 中大型、多人协作、长期迭代时**收益大**；小工具/原型若强行三层，会**过度设计**。可按 feature 渐进采用，或只抽 `repository` + `data` 两层。 |
| **Dio** | 拦截器、超时、下载等能力齐全，**事实上的主流 HTTP 客户端之一**；简单场景用官方 `http` 包也足够。 |
| **文内具体写法** | `FutureProvider.family` 适合**演示与中等复杂度**；更复杂的状态机、分页、乐观更新往往改用 **`AsyncNotifier` / `Notifier` + `riverpod_annotation`**。用 `posts` 模拟订单仅为对接公开 API，**不是**领域建模的最佳示范。 |

**实践上更靠谱的判据**：团队能稳定执行、代码评审能讲清依赖方向、单测能 mock `UserRepository`——比「是否叫 Clean Architecture」更重要。

---

## 小结

- **Clean Architecture**：Domain 稳定；Data 可替换 Dio 实现；Presentation 只依赖 Domain + Riverpod。
- **Dio**：集中 `BaseOptions`、超时、`LogInterceptor`；**真实基址**用 `--dart-define=API_BASE_URL=...`。
- **Riverpod**：`Provider` 组装依赖；`FutureProvider.family` 表达「随参数变化的异步数据」，接近你在 Web 里用 TanStack Query 的体验。

与 **Android MVVM + Repository** 一条线：只是 UI 层从 `ViewModel` 换成了 **Riverpod**，网络从 Retrofit 换成了 **Dio**，分层思想一致。
