---
outline: [2, 3]
---

# React：Zustand + TanStack Query 完整示例（用户卡片 + 订单列表）

与 [MVVM 完整示例：用户详情页（用户卡片 + 订单列表）](../android/mvvm-example-user-orders.md) **同一业务场景**：上方 **用户卡片**，下方 **该用户订单列表**。**Zustand** 管客户端/UI 状态，**TanStack Query** 管服务端状态（缓存、重试、失效）。

::: info 数据从哪来
下文 **`fetch` 走真实 HTTP**：通过环境变量 **`VITE_API_BASE`** 指向你的后端根地址（如 `https://api.myapp.com`）。未配置时默认使用 **JSONPlaceholder** 的公开接口，便于本地直接跑通；其中「订单」用该站的 **`posts?userId=`** 模拟列表形态，你上线后把路径换成真实的 `/users/:id/orders` 即可。
:::

## 和 Android MVVM 怎么对应

| Android（概念） | 本示例 |
|-----------------|--------|
| `ViewModel` 里可变的 UI 状态 | **Zustand** `useUiStore`（当前选中的 `userId` 等） |
| `Repository` + `Flow` / 一次性拉取 | **`fetch` + TanStack Query** `useQuery` |
| `UiState`（Loading / Success / Error） | **`useQuery`** 的 `isPending`、`data`、`isError`、`error` |
| 下拉刷新 / 重新拉取 | **`queryClient.invalidateQueries`** 或 **`refetch`** |
| 导航参数 `userId` | Zustand 的 **`currentUserId`**（或 React Router `useParams`） |

**分工约定**

| 库 | 放什么 |
|----|--------|
| **TanStack Query** | 用户、订单等 **服务端数据**（可缓存、可失效） |
| **Zustand** | **纯前端状态**（当前选中的 `userId`、侧栏开关等）。不要把 Query 里的数据再抄一份进 store |

---

## 页面布局示意

```
┌─────────────────────────────────────┐
│  [userId 选择 ▼]     [刷新订单]     │
├─────────────────────────────────────┤
│  [头像] 姓名 · 邮箱 · ID            │  ← useQuery → GET …/users/:id
│  注册信息 / 会员标签                 │
├─────────────────────────────────────┤
│  订单列表                            │  ← useQuery → GET …/posts?userId=
│  ┌───────────────────────────────┐  │     （真实项目改为 …/orders）
│  │ 金额 · 状态 · 时间/摘要        │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 依赖与运行

```bash
npm install zustand @tanstack/react-query
```

可选：`npm install @tanstack/react-query-devtools`，在 `QueryClientProvider` 内加 `<ReactQueryDevtools initialIsOpen={false} />`。

**环境变量（可选）**

项目根目录 `.env` / `.env.local`：

```ini
# 不填则使用文档中的默认公网演示基址
VITE_API_BASE=https://jsonplaceholder.typicode.com
```

上线后改为你的网关，例如 `https://api.example.com`（**不要**在末尾加 `/`；代码里会统一拼接路径）。

---

## 推荐目录结构

```
src/
  api/
    config.ts             # API_BASE（读 import.meta.env.VITE_API_BASE）
    types.ts
    userOrdersApi.ts      # 真实 fetch + DTO → 业务类型
  store/uiStore.ts
  queries/queryKeys.ts
  components/
    UserCard.tsx
    OrderList.tsx
    UserOrdersScreen.tsx
  App.tsx
  main.tsx
```

---

## 1. API 基址 `src/api/config.ts`

```ts
/** 生产环境在 .env 里配置 VITE_API_BASE=https://你的域名 */
export const API_BASE = (
  import.meta.env.VITE_API_BASE as string | undefined
)?.replace(/\/$/, '') ?? 'https://jsonplaceholder.typicode.com';
```

---

## 2. 类型 `src/api/types.ts`

```ts
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  membershipLevel: string;
};

export type Order = {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};
```

---

## 3. HTTP 封装 `src/api/userOrdersApi.ts`

::: tip 对接你自己的后端
把下面两个路径换成你文档里的真实路由即可；**保留** `!res.ok` 时 `throw` 与 `map*` 映射，组件层不用改。
:::

**默认（JSONPlaceholder）约定：**

| 业务 | HTTP | 说明 |
|------|------|------|
| 用户 | `GET {API_BASE}/users/:id` | 官方返回 JSON 用户对象 |
| 订单列表（演示） | `GET {API_BASE}/posts?userId=:id` | 用帖子列表模拟「多条记录」；正式环境改为 `GET …/orders?userId=` 等 |

```ts
import { API_BASE } from './config';
import type { Order, User } from './types';

/** JSONPlaceholder 用户 DTO（只列用到的字段） */
type UserDto = {
  id: number;
  name: string;
  email: string;
  address?: { zipcode?: string };
  company?: { name?: string };
};

/** JSONPlaceholder 帖子 DTO，演示「按用户拉列表」 */
type PostDto = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function mapUser(dto: UserDto): User {
  return {
    id: String(dto.id),
    name: dto.name,
    email: dto.email,
    avatarUrl: `https://i.pravatar.cc/128?u=${dto.id}`,
    createdAt: dto.address?.zipcode ? `邮编 ${dto.address.zipcode}` : '—',
    membershipLevel: dto.company?.name ?? '—',
  };
}

function mapOrdersFromPosts(dtos: PostDto[], userId: string): Order[] {
  return dtos.map((p) => ({
    id: String(p.id),
    userId,
    totalAmount: Math.round(10 + p.body.length * 0.5),
    status: p.title.length > 32 ? `${p.title.slice(0, 32)}…` : p.title,
    createdAt: `#${p.id}`,
  }));
}

export async function fetchUser(userId: string): Promise<User> {
  const res = await fetch(`${API_BASE}/users/${encodeURIComponent(userId)}`);
  if (!res.ok) {
    throw new Error(
      res.status === 404 ? '用户不存在' : `用户请求失败（${res.status}）`
    );
  }
  const dto = (await res.json()) as UserDto;
  return mapUser(dto);
}

/**
 * 演示环境：posts?userId= 模拟订单列表。
 * 真实项目可改为：fetch(`${API_BASE}/orders?userId=${userId}`) 再 map 成 Order[]。
 */
export async function fetchOrdersByUser(userId: string): Promise<Order[]> {
  const res = await fetch(
    `${API_BASE}/posts?userId=${encodeURIComponent(userId)}`
  );
  if (!res.ok) {
    throw new Error(`订单列表请求失败（${res.status}）`);
  }
  const dtos = (await res.json()) as PostDto[];
  return mapOrdersFromPosts(dtos, userId);
}
```

---

## 4. Query Key `src/queries/queryKeys.ts`

```ts
export const queryKeys = {
  users: {
    detail: (userId: string) => ['users', 'detail', userId] as const,
  },
  orders: {
    byUser: (userId: string) => ['orders', 'byUser', userId] as const,
  },
};
```

---

## 5. Zustand `src/store/uiStore.ts`

```ts
import { create } from 'zustand';

type UiState = {
  currentUserId: string;
  setCurrentUserId: (id: string) => void;
};

export const useUiStore = create<UiState>((set) => ({
  currentUserId: '1',
  setCurrentUserId: (id) => set({ currentUserId: id }),
}));
```

---

## 6. 入口 `src/main.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
```

---

## 7. 组件

### `src/components/UserCard.tsx`

```tsx
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../api/userOrdersApi';
import { queryKeys } from '../queries/queryKeys';

type Props = { userId: string };

export function UserCard({ userId }: Props) {
  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => fetchUser(userId),
  });

  if (isPending) {
    return (
      <div className="card muted">用户加载中…</div>
    );
  }
  if (isError) {
    return (
      <div className="card error">
        <span>加载失败：{(error as Error).message}</span>
        <button type="button" onClick={() => refetch()}>
          重试
        </button>
      </div>
    );
  }

  return (
    <div className={`card user-card ${isFetching ? 'fetching' : ''}`}>
      {data.avatarUrl && (
        <img
          className="avatar"
          src={data.avatarUrl}
          alt=""
          width={56}
          height={56}
        />
      )}
      <div>
        <p className="title">{data.name}</p>
        <p className="meta">
          ID: {data.id} · {data.email}
        </p>
        <p className="sub">
          {data.createdAt} · {data.membershipLevel}
        </p>
      </div>
    </div>
  );
}
```

### `src/components/OrderList.tsx`

```tsx
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchOrdersByUser } from '../api/userOrdersApi';
import { queryKeys } from '../queries/queryKeys';

type Props = { userId: string };

export function OrderList({ userId }: Props) {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: queryKeys.orders.byUser(userId),
    queryFn: () => fetchOrdersByUser(userId),
    enabled: Boolean(userId),
  });

  const invalidateOrders = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.orders.byUser(userId),
    });
  };

  if (isPending) {
    return <div className="card muted">订单加载中…</div>;
  }
  if (isError) {
    return (
      <div className="card error">
        <span>订单加载失败：{(error as Error).message}</span>
        <button type="button" onClick={() => refetch()}>
          重试
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="order-section">
        <p className="muted-inline">暂无订单数据（演示接口下部分 userId 会为空列表）</p>
      </div>
    );
  }

  return (
    <div className="order-section">
      <div className="toolbar">
        <span className="toolbar-title">订单列表</span>
        <button type="button" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? '刷新中…' : '刷新'}
        </button>
        <button type="button" className="secondary" onClick={invalidateOrders}>
          失效缓存
        </button>
      </div>
      <ul className="order-list">
        {data.map((o) => (
          <li key={o.id} className="order-item">
            <div className="order-id">订单 {o.id}</div>
            <div className="order-meta">
              {o.createdAt} · ¥{o.totalAmount.toFixed(2)} · {o.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### `src/components/UserOrdersScreen.tsx`

```tsx
import { useUiStore } from '../store/uiStore';
import { UserCard } from './UserCard';
import { OrderList } from './OrderList';

/** JSONPlaceholder 存在 1–10 等用户；999 会 404，用于测错误态 */
const USER_OPTIONS = ['1', '2', '5', '999'];

export function UserOrdersScreen() {
  const currentUserId = useUiStore((s) => s.currentUserId);
  const setCurrentUserId = useUiStore((s) => s.setCurrentUserId);

  return (
    <div className="screen">
      <header className="screen-header">
        <label className="field">
          <span className="field-label">查看用户</span>
          <select
            value={currentUserId}
            onChange={(e) => setCurrentUserId(e.target.value)}
          >
            {USER_OPTIONS.map((id) => (
              <option key={id} value={id}>
                {id === '999' ? '999（不存在，测错误）' : `用户 ${id}`}
              </option>
            ))}
          </select>
        </label>
      </header>

      <UserCard userId={currentUserId} />
      <OrderList userId={currentUserId} />
    </div>
  );
}
```

### `src/App.tsx`

```tsx
import { UserOrdersScreen } from './components/UserOrdersScreen';

export default function App() {
  return <UserOrdersScreen />;
}
```

### `src/index.css`（示例样式，便于阅读）

```css
:root {
  font-family: system-ui, sans-serif;
  color: #1a1a1a;
  background: #f4f6f9;
}

.screen {
  max-width: 560px;
  margin: 0 auto;
  padding: 24px 16px 48px;
}

.screen-header {
  margin-bottom: 16px;
}

.field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.field-label {
  font-size: 14px;
  color: #555;
}

select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
}

.card {
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #e2e6ee;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.card.muted {
  color: #666;
}

.card.error {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  color: #b00020;
  border-color: #ffcdd2;
}

.card.fetching {
  opacity: 0.85;
}

.user-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.avatar {
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.meta {
  margin: 8px 0 0;
  font-size: 14px;
  color: #555;
}

.sub {
  margin: 6px 0 0;
  font-size: 13px;
  color: #888;
}

.muted-inline {
  margin: 0;
  font-size: 14px;
  color: #888;
}

.order-section {
  margin-top: 16px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #e2e6ee;
  background: #fff;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.toolbar-title {
  font-weight: 600;
  margin-right: auto;
}

button {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #c5cae0;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button.secondary {
  border-style: dashed;
}

.order-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.order-item {
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 8px;
}

.order-id {
  font-weight: 500;
}

.order-meta {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
}
```

---

## 8. 行为说明

1. **切换 `userId`**：`queryKey` 变化 → 自动请求新用户与新列表；已缓存的 id 再切回来会命中缓存（在 `staleTime` 内）。
2. **刷新 / 失效**：`refetch` 立即再请求；`invalidateQueries` 标记过期，适合「提交成功后刷新列表」。
3. **错误态**：选 **999** 时用户接口返回 404，卡片显示错误；帖子接口可能对空 `userId` 仍返回 `[]`，属演示站行为，换真实 `/orders` 后由你后端统一约定即可。
4. **数据不要双写进 Zustand**：展示始终以 Query 为准。

---

## 9. 写操作后刷新列表（示例）

```ts
queryClient.invalidateQueries({ queryKey: queryKeys.orders.byUser(userId) });
```

---

## 小结

- **Zustand**：`currentUserId` 等纯 UI 状态。  
- **TanStack Query**：`fetch` 到的用户与列表；**基址**用 `VITE_API_BASE`，默认走可访问的演示 API。  
- 替换为自家接口时：只改 **`config.ts` 的 env** 与 **`userOrdersApi.ts` 的路径和 DTO 映射**，组件可保持不变。
