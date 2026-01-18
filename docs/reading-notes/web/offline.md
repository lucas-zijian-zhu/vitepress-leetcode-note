# Web 离线化（Offline-first / PWA）实现笔记（中文）

[English](/reading-notes/web/offline.en.md)

这篇整理 Web 离线化的常用实现路径：从“可离线访问静态页面”到“可离线使用核心功能”。

## 0）在项目里怎么“接入” Service Worker（以 Vite/VitePress 为例）

很多同学卡在这里：**Service Worker 不是 import 进来的模块**，而是浏览器在你调用 `register()` 后下载并运行的“特殊脚本”。

### 0.1 文件放哪

以 Vite/VitePress 为例，通常把这些文件放到 `public/`（构建时原样拷贝到站点根路径）：

- `public/sw.js`（部署后能通过 `/sw.js` 访问）
- `public/offline.html`（部署后能通过 `/offline.html` 访问）

在 VitePress 项目里就是：

- `docs/public/sw.js`
- `docs/public/offline.html`

### 0.2 在哪里注册（页面端）

在你的页面 JS 里（入口脚本、或任意会在浏览器运行的代码里）注册：

```js
// main.js (browser)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    // 如果站点部署在子路径（有 base），要拼上 base
    const base = import.meta?.env?.BASE_URL ?? "/";
    const reg = await navigator.serviceWorker.register(`${base}sw.js`);
    console.log("SW scope:", reg.scope);
  });
}
```

### 0.3 为什么必须放在“根路径”附近

Service Worker 只能控制它的 **scope**。通常：

- `/sw.js` 可以控制整个站点（`/` 下的请求）
- `/foo/sw.js` 只能控制 `/foo/` 下的请求

### 0.4 开发环境注意

- 需要 HTTPS（或 localhost）
- 有些开发服务器/代理会让 SW 行为与生产不一致；离线能力以 build 后部署环境验证为准

## 1）离线化目标分层（先说清楚你要的是什么）

- **Level 0：离线可打开**：没网也能打开站点（App Shell + 离线页）
- **Level 1：离线可浏览静态资源**：HTML/CSS/JS/字体/图片可缓存
- **Level 2：离线可用核心数据**：关键数据可缓存/可回放（IndexedDB）
- **Level 3：离线可写**：离线期间产生操作，联网后自动同步（Background Sync / 自研队列）

越往上，复杂度越高；不要一开始就做 Level 3。

## 2）核心机制：Service Worker + Cache Storage

离线化的“开关”通常是 **Service Worker**：

- 通过 `fetch` 事件拦截请求
- 决定“走网络 / 走缓存 / 缓存+网络并用”
- 用 `Cache Storage` 缓存 Response

> 注意：Service Worker 的生命周期与页面解耦，可能随时被挂起/终止，所以逻辑要事件驱动 + 可持久化。

### 2.1 注册 Service Worker（页面端）

```js
// main.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    const base = import.meta?.env?.BASE_URL ?? "/";
    const reg = await navigator.serviceWorker.register(`${base}sw.js`);
    console.log("SW scope:", reg.scope);
  });
}
```

前置条件（常见踩坑）：

- 需要 HTTPS（或 localhost）
- `sw.js` 的路径决定可控制的 scope（通常放站点根路径：`/sw.js`）

## 3）最小可用：离线兜底页（Offline fallback）

思路：预缓存一个 `offline.html`，当网络失败时返回它。

```js
// sw.js (minimal)
const CACHE = "app-shell-v1";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) =>
      c.addAll([
        OFFLINE_URL,
        "/", // 可选：把首页也做成 App Shell
      ])
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        return await fetch(event.request);
      } catch {
        // 只对导航请求兜底更合理（避免接口/图片也返回 HTML）
        if (event.request.mode === "navigate") {
          const cache = await caches.open(CACHE);
          return (await cache.match(OFFLINE_URL)) ?? new Response("offline", { status: 503 });
        }
        throw new Error("offline");
      }
    })()
  );
});
```

## 4）缓存策略：别只会 Cache-First

常见策略（按“体验 vs 新鲜度”权衡）：

- **Cache-first**：优先缓存，没命中再网络
  - 适合：静态资源（图片、字体、构建产物）
  - 风险：更新不及时（需要版本化/清理）
- **Network-first**：优先网络，失败再缓存
  - 适合：HTML 文档、强一致数据
  - 风险：弱网慢（需要超时）
- **Stale-while-revalidate（SWR）**：先返回缓存（即使旧），同时后台更新缓存
  - 适合：列表页、非强一致数据、读多写少
- **Cache-only / Network-only**
  - 适合：非常明确的场景（如离线包资源 / 支付等必须实时）

### 4.1 常用策略的最小实现（Service Worker 里写法）

下面给三个最常用的“可直接抄”的骨架：静态资源 cache-first、文档 network-first（带超时）、API 的 SWR。

**A. 静态资源（构建产物/图片/字体）：cache-first**

```js
const STATIC_CACHE = "static-v1";

async function cacheFirst(req) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}
```

**B. HTML 导航：network-first + timeout**

```js
function fetchWithTimeout(req, ms = 3000) {
  return Promise.race([
    fetch(req),
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetchWithTimeout(req, 3000);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req)) ?? (await cache.match(OFFLINE_URL));
  }
}
```

**C. GET 接口：stale-while-revalidate（先快后新）**

```js
const API_CACHE = "api-v1";

async function staleWhileRevalidate(req) {
  const cache = await caches.open(API_CACHE);
  const cached = await cache.match(req);
  const networkPromise = fetch(req).then((res) => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  return cached ?? networkPromise;
}
```

然后在 `fetch` 事件里按类型分流：

```js
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 只处理同源
  if (url.origin !== self.location.origin) return;

  // HTML 导航
  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // API（示例：同源 /api/ 下的 GET）
  if (url.pathname.startsWith("/api/") && event.request.method === "GET") {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // 其它资源（脚本/样式/图片等）
  event.respondWith(cacheFirst(event.request));
});
```

## 5）数据离线：缓存接口响应 vs IndexedDB

### 5.1 直接缓存 API Response（轻量）

- 用 Cache Storage 缓存 GET 请求结果
- 适合：只读、可接受一定陈旧的数据

一个最小例子（配合上面的 `staleWhileRevalidate`）：

- 联网：返回最新，同时更新缓存
- 离线：如果有缓存就返回缓存（页面仍可展示上次的数据）

### 5.2 用 IndexedDB 做“离线数据层”（更像 App）

适合：

- 需要查询、分页、增量更新
- 需要离线写入（本地队列 + 重放）

常见做法：

- fetch 成功后把数据写入 IndexedDB
- 离线时从 IndexedDB 读
- 联网后做同步（按版本号/时间戳增量拉取）

IndexedDB 原生 API 很啰嗦，实战里通常会用一个轻量封装库：

- **`idb`**：偏“薄封装”，保留 IndexedDB 的模型（推荐给工程化/可控的团队）
- **Dexie**：偏“更高层的 ORM/查询 API”，复杂查询/索引更舒服

下面用更常见的 `idb` 写一个最小例子（只演示 `kv` 的 get/put）：

```js
// npm i idb
import { openDB } from "idb";

const dbPromise = openDB("offline-db", 1, {
  upgrade(db) {
    db.createObjectStore("kv"); // key -> value
    db.createObjectStore("outbox", { keyPath: "id" }); // 给离线可写用
  },
});

async function kvGet(key) {
  return (await dbPromise).get("kv", key);
}

async function kvSet(key, value) {
  return (await dbPromise).put("kv", value, key);
}
```

页面端做“在线拉取 + 写入本地；离线回退读取本地”：

```js
async function fetchJsonWithIdbFallback(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("bad response");
    const data = await res.json();
    await kvSet(url, { data, ts: Date.now() });
    return data;
  } catch {
    const cached = await kvGet(url);
    if (cached?.data) return cached.data;
    throw new Error("no cache");
  }
}
```

> IndexedDB 更适合“结构化数据”（可查询/可增量），Cache Storage 更适合“HTTP Response 缓存”。

## 6）如果要实现“离线可写”（Level 3），应该怎么做？

核心模式：**Outbox（本地操作队列）+ 重放（replay）+ 幂等（idempotent）**。

### 6.1 最小方案（不依赖 Background Sync）

1. 用户执行写操作（例如“新增一条 todo”）
2. **先写入本地 outbox（IndexedDB）**，UI 先做“乐观更新”
3. 如果当前在线，立即尝试 flush；如果离线，等 `online` 事件再 flush
4. flush 成功后，从 outbox 删除该操作；失败则保留，稍后重试

示意：

```js
function uuid() {
  return crypto?.randomUUID?.() ?? String(Date.now()) + Math.random().toString(16).slice(2);
}

async function enqueueOp(op) {
  const record = { id: uuid(), op, ts: Date.now() };
  await (await dbPromise).put("outbox", record);
}

async function listOutbox() {
  return (await dbPromise).getAll("outbox");
}

async function removeOutbox(id) {
  return (await dbPromise).delete("outbox", id);
}

async function flushOutbox() {
  const items = await listOutbox();
  for (const item of items) {
    try {
      // 关键：让服务端支持幂等（比如带 clientRequestId）
      await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...item.op, clientRequestId: item.id }),
      });
      await removeOutbox(item.id);
    } catch {
      // 失败就停（避免无限快速重试），下次再来
      break;
    }
  }
}

window.addEventListener("online", () => {
  flushOutbox();
});
```

### 6.2 有条件时用 Background Sync（体验更好）

- 页面不在前台时也能触发同步（浏览器支持情况不一）
- 做法：写入 outbox 后调用 `registration.sync.register("sync-outbox")`
- SW 里监听 `sync` 事件，触发 `flushOutbox`

> 注意：Background Sync 不一定可用；即使可用也可能被系统策略延后，所以仍要有“在线时手动 flush”的兜底。

### 6.3 你必须提前想清楚的 3 件事

- **幂等**：同一操作可能被重放多次（断网/重试/页面刷新），服务端必须用 `clientRequestId` 去重
- **冲突解决**：离线期间两端都改了同一条数据怎么办？（最后写入覆盖/版本号/合并策略）
- **数据模型**：离线可写更像“同步系统”，别把它当成“多加几行缓存”

### 6.4 到底用 `idb` 还是 Dexie？

简单选型建议：

- **用 `idb`**：你只需要少量 store（kv/outbox），主要是 `get/put/getAll/delete`，希望保持底层模型清晰可控
- **用 Dexie**：你有明显的“表/索引/查询”需求（按字段过滤、排序、分页、事务），希望更接近数据库使用体验

不管用哪个库，真正的难点都在 **同步协议**（幂等、冲突、重试、版本化），而不是“API 怎么写”。

## 7）更新策略：怎么让用户拿到最新资源

离线化最大坑之一是“更新”。

常见建议：

- **cache 版本化**：`app-shell-v1` → `app-shell-v2`
- `activate` 阶段清理旧 cache
- 提供“有新版本可用”的提示（监听 `updatefound` / `controllerchange`）
- 谨慎使用 `skipWaiting()`（会导致新 SW 抢占控制权，可能引起页面状态丢失）

## 8）常见坑（踩过一次就记住）

- **把 API 也 cache-first**：数据永远不更新
- **对所有请求都返回离线页**：图片/接口请求也被返回 HTML，导致更难排查
- **没有清理旧缓存**：Cache Storage 无限膨胀
- **跨域请求缓存受限**：受 CORS/opaque response 影响
- **Service Worker 被终止**：不要把“状态”只放内存

## 9）测试与排查

- Chrome DevTools → Application → Service Workers / Cache Storage
- Network 面板：勾选 “Offline” 验证兜底路径
- 关注：
  - 哪些资源命中 cache
  - SW 是否控制页面（`navigator.serviceWorker.controller`）
  - 更新是否生效（旧 SW 是否还在控制）

