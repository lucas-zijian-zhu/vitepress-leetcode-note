# Android 架构笔记：单例、MVVM、Flow、Retrofit/Room、DI

[English](/reading-notes/android/android-architecture.en.md)

总结 Kotlin 单例、ViewModel + Flow、MVVM、Repository 中 Flow 的使用、Retrofit/Room 配合 Flow，以及 Hilt 依赖注入。

---

## 1）Kotlin 单例的几种方式

| 方式 | 特点 | 适用场景 |
|------|------|----------|
| **object** | 天生单例，线程安全（类加载时立即初始化） | 无状态工具、全局配置 |
| **双检锁 getInstance(context)** | 首次调用时创建，需传入参数 | 依赖 Context 且调用方每次都能提供时 |
| **companion object + by lazy** | 延迟初始化，首次访问才创建 | 无参；或依赖 Context 且在 Application 中初始化 |

### 1.1 object 单例

```kotlin
object ApiConfig {
    const val BASE_URL = "https://api.example.com"
    val timeout = 30
}

// 使用
ApiConfig.BASE_URL
```

- **线程安全**：JVM 保证类加载时的静态初始化是线程安全的。
- **无参、无依赖** 时首选。
- 缺点：类加载时即初始化，无法延迟。

### 1.2 双检锁 getInstance(context)

依赖 Context 且每次调用都能传入时，用 **getInstance** + **synchronized** 双检锁：

```kotlin
class DatabaseHelper private constructor(context: Context) {
    companion object {
        @Volatile
        private var instance: DatabaseHelper? = null

        fun getInstance(context: Context): DatabaseHelper =
            instance ?: synchronized(this) {
                instance ?: DatabaseHelper(context.applicationContext).also { instance = it }
            }
    }
}
```

- 务必用 `applicationContext`，避免持有 Activity 导致泄露。

### 1.3 companion object + by lazy（延迟单例）

**无参** 时，用 `by lazy` 延迟初始化：

```kotlin
class Logger {
    companion object {
        val instance: Logger by lazy { Logger() }
    }
}
```

**依赖 Context** 且 Context 只在 Application 中可用时，在 Application 里用 `by lazy`：

```kotlin
class MyApplication : Application() {
    val databaseHelper: DatabaseHelper by lazy {
        DatabaseHelper(applicationContext)
    }
}
```

- `object` = 立即初始化；`by lazy` = 首次访问时初始化。
- **lazy 默认线程安全**（`LazyThreadSafetyMode.SYNCHRONIZED`）。

### 1.4 与 DI 的关系

现代项目多用 **Hilt/Koin** 提供单例，而不是手写 `object`、`by lazy` 或双检锁：

```kotlin
@Singleton
@Provides
fun provideApiService(retrofit: Retrofit): ApiService = retrofit.create(ApiService::class.java)
```

- 单例由容器管理，便于测试（可替换实现）。
- 只有纯工具类、无依赖的配置才适合用 `object`。

---

## 2）ViewModel + Flow

### 2.1 职责划分

- **ViewModel**：持有 UI 状态、调用 Repository、管理协程。
- **Flow**：在 Repo 层表示「流式数据」，ViewModel 负责收集并转换后暴露给 UI。

### 2.2 ViewModel 暴露 Flow 给 UI

```kotlin
class UserViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {

    val userState: StateFlow<UserState> = userRepository
        .observeUser()
        .map { user -> UserState.Success(user) }
        .catch { e -> emit(UserState.Error(e.message)) }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = UserState.Loading
        )
}
```

要点：

- `stateIn`：把 Flow 转成 `StateFlow`，供 UI 持续订阅。
- `viewModelScope`：ViewModel 销毁时自动取消。
- `SharingStarted.WhileSubscribed(5000)`：无订阅且超过 5 秒后停止上游。

### 2.3 UI 订阅 StateFlow

```kotlin
@Composable
fun UserScreen(viewModel: UserViewModel = hiltViewModel()) {
    val state by viewModel.userState.collectAsStateWithLifecycle()

    when (val s = state) {
        is UserState.Loading -> Loading()
        is UserState.Success -> UserContent(s.user)
        is UserState.Error -> ErrorView(s.message)
    }
}

// Fragment
viewLifecycleOwner.lifecycleScope.launch {
    viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
        viewModel.userState.collect { state -> updateUI(state) }
    }
}
```

- `collectAsStateWithLifecycle` 或 `repeatOnLifecycle(STARTED)` 确保只在 STARTED 之后收集，避免重复订阅和泄露。

---

## 3）MVVM 结构

```
UI (Activity/Fragment/Composable)
    ↑ StateFlow / LiveData
ViewModel
    ↑ 调用
Repository
    ↑              ↑
Remote (Retrofit)  Local (Room)
```

### 3.1 数据流向

1. **UI** → 通过事件（点击等）调用 ViewModel 的方法。
2. **ViewModel** → 调用 Repository 获取/更新数据。
3. **Repository** → 合并 Remote 与 Local，返回 Flow/LiveData。
4. **ViewModel** → 将 Flow 转成 StateFlow，供 UI 订阅。
5. **UI** → 根据 State 渲染界面。

### 3.2 示例骨架

```kotlin
// Repository
interface UserRepository {
    fun observeUser(): Flow<User>
    suspend fun refreshUser()
}

// ViewModel
class UserViewModel(repository: UserRepository) : ViewModel() {
    val state = repository.observeUser()
        .map { UserState.Success(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), UserState.Loading)
}

// UI 只依赖 ViewModel，不直接接触 Repository
```

---

## 4）Repository 中 Flow 的使用

Repository 作为「单一数据源」，对外暴露 Flow，内部组合网络和本地数据。

### 4.1 只读流（观察）

```kotlin
class UserRepositoryImpl @Inject constructor(
    private val userDao: UserDao,
    private val api: ApiService
) : UserRepository {

    override fun observeUser(): Flow<User> = userDao
        .observeUser()
        .map { it.toDomain() }
}
```

- 本地是主数据源时，直接转发 Room 的 Flow。
- 需要时可在 `map` 中做领域模型转换。

### 4.2 网络 + 本地（先网络再缓存）

```kotlin
override fun observeUser(): Flow<User> = flow {
    val remote = api.getUser()
    userDao.insert(remote.toEntity())
    emitAll(userDao.observeUser().map { it.toDomain() })
}.catch { e ->
    // 网络失败时回退到本地缓存
    emitAll(userDao.observeUser().map { it.toDomain() })
}
```

- 先请求网络，写入本地，再观察本地 Flow。
- `catch` 中可回退到本地，保证有数据可展示。

### 4.3 刷新入口

```kotlin
override suspend fun refreshUser() {
    val user = api.getUser()
    userDao.insert(user.toEntity())
}
```

- ViewModel 在适当时机调用（如下拉刷新、启动时）。

---

## 5）Retrofit + Flow

### 5.1 suspend 转 Flow

Retrofit 本身是 suspend，需要流式时用 `flow` 包装：

```kotlin
interface ApiService {
    @GET("user")
    suspend fun getUser(): UserDto
}

// Repository 中
fun fetchUserFlow(): Flow<User> = flow {
    emit(api.getUser().toDomain())
}.flowOn(Dispatchers.IO)
```

### 5.2 使用 CallAdapter（可选）

通过 `retrofit2.adapter.rxjava3` 或社区库可让接口直接返回 `Flow`，但多数场景用 `flow { }` 包装 suspend 即可。

### 5.3 错误与重试

```kotlin
fun fetchUserFlow(): Flow<Result<User>> = flow {
    emit(Result.success(api.getUser().toDomain()))
}.catch { e ->
    emit(Result.failure(e))
}.retry(2) { cause -> cause is IOException }
```

---

## 6）Room + Flow

### 6.1 DAO 返回 Flow

Room 支持直接返回 `Flow<T>`，数据变化时自动重新发射：

```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM user WHERE id = :id")
    fun observeUser(id: String): Flow<UserEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(user: UserEntity)

    @Query("DELETE FROM user")
    suspend fun deleteAll()
}
```

- 每次表中相关数据变化，Flow 会发出新值。
- 适合列表、详情等需要「实时更新」的场景。

### 6.2 多表组合

```kotlin
@Query("""
    SELECT * FROM user u
    LEFT JOIN order o ON u.id = o.userId
    WHERE u.id = :id
""")
fun observeUserWithOrders(id: String): Flow<UserWithOrders>
```

### 6.3 配置与依赖

```kotlin
// build.gradle
implementation("androidx.room:room-ktx:2.6.0")
ksp("androidx.room:room-compiler:2.6.0")
```

---

## 7）配合 Hilt 的 DI

### 7.1 模块划分

|  layer   | 作用域        | 说明                          |
|----------|---------------|-------------------------------|
| ApiService | @Singleton  | Retrofit 网络接口            |
| Dao       | @Singleton  | Room DAO                      |
| Repository | @Singleton | 注入 Dao、ApiService         |
| ViewModel  | 无          | 由 `@HiltViewModel` 自动注入 |

### 7.2 提供依赖

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Singleton
    @Provides
    fun provideRetrofit(): Retrofit = Retrofit.Builder()
        .baseUrl("https://api.example.com")
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    @Singleton
    @Provides
    fun provideApiService(retrofit: Retrofit): ApiService =
        retrofit.create(ApiService::class.java)

    @Singleton
    @Provides
    fun provideDatabase(@ApplicationContext app: Context): AppDatabase =
        Room.databaseBuilder(app, AppDatabase::class.java, "app_db").build()

    @Singleton
    @Provides
    fun provideUserDao(db: AppDatabase): UserDao = db.userDao()

    @Singleton
    @Provides
    fun provideUserRepository(
        dao: UserDao,
        api: ApiService
    ): UserRepository = UserRepositoryImpl(dao, api)
}
```

### 7.3 ViewModel 注入

```kotlin
@HiltViewModel
class UserViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {
    // ...
}

// Activity/Fragment
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    private val viewModel: UserViewModel by viewModels()
}
```

### 7.4 整体调用链

```
Hilt 注入 AppDatabase、UserDao、ApiService
    → UserRepositoryImpl(dao, api)
    → UserViewModel(repository)
    → UI 通过 hiltViewModel() / by viewModels() 获取 ViewModel
```

---

## 8）汇总对照

| 层级    | 数据形态       | 典型用法                                      |
|---------|----------------|-----------------------------------------------|
| Room    | Flow\<Entity\> | DAO 方法返回 `Flow`，表变化即推送             |
| Retrofit| suspend        | 接口 suspend，Repo 中用 `flow { emit(...) }` 包装 |
| Repo    | Flow\<Domain\> | 合并 Room Flow 和网络，做转换与错误处理       |
| ViewModel | StateFlow    | `stateIn` 将 Flow 转为 StateFlow 供 UI 订阅   |
| UI      | collect        | `collectAsStateWithLifecycle` / `repeatOnLifecycle` |
| 单例    | object / DI    | 配置用 object，业务单例交给 Hilt               |
