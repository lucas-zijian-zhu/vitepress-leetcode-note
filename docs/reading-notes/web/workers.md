# Web Worker / Shared Worker / Service Worker：区别与实践

[English](/reading-notes/web/workers.en.md)

这篇专门讲三种 Worker：它们解决什么问题、作用域/生命周期/能力边界、以及常见使用场景。

## 总览对比

| 类型 | 作用域 | 生命周期 | 是否能拦截网络 | 主要通信 | 典型用途 |
| --- | --- | --- | --- | --- | --- |
| Web Worker | 单页面（创建它的页面） | 跟随页面 | 否 | `postMessage` | 计算/解析/压缩，避免卡 UI |
| Shared Worker | 同源多页面共享 | 只要还有连接就存在 | 否 | `MessagePort` | 多标签共享连接/状态、统一后台任务 |
| Service Worker | 同源站点级 | 与页面解耦（可在后台） | 是（`fetch` 事件） | `postMessage` + 事件 | 离线缓存、PWA、推送、后台同步 |

> 共同点：都跑在独立线程/上下文里，**不能直接操作 DOM**，需要消息通信。

## 1）Web Worker

### 适合做什么

- CPU 密集：大 JSON 解析、加解密、图片/音频处理、复杂计算
- 长任务：把会卡主线程的逻辑挪出去

### 能力与限制

- 无 DOM、无 `window`（但有 `self`）
- 通过 `postMessage` 通信（结构化克隆；部分场景可用 Transferable 提升性能）
- 适合“计算任务”，不适合“页面控制”

### 最小示例：创建与通信（Vite/VitePress 风格）

文件：`worker.ts`

```ts
// worker.ts
self.onmessage = (event) => {
  const input = event.data as number;
  const output = input * 2;
  self.postMessage({ output });
};
```

文件：`main.ts`

```ts
// main.ts
const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});

worker.onmessage = (event) => {
  console.log("from worker:", event.data); // { output: 20 }
};

worker.postMessage(10);
```

## 2）Shared Worker

### 与 Web Worker 最大区别

- **同源下多个页面/Tab 可以共享同一个 Worker**
- 通信通过 `MessagePort`，每个连接一个端口

### 适合场景

- 多标签共享一个 WebSocket 连接（避免每个标签各建一个）
- 统一做节流/限流/后台轮询

### 最小示例：多 Tab 共享 + 端口通信

文件：`shared-worker.ts`

```ts
// shared-worker.ts
const ports = new Set<MessagePort>();

self.onconnect = (event: MessageEvent) => {
  const port = (event as any).ports[0] as MessagePort;
  ports.add(port);

  port.onmessage = (e) => {
    // 广播给所有连接的页面
    for (const p of ports) p.postMessage({ echo: e.data, ts: Date.now() });
  };

  port.start();
};
```

页面：`main.ts`

```ts
// main.ts
const sw = new SharedWorker(new URL("./shared-worker.ts", import.meta.url), {
  type: "module",
});

sw.port.onmessage = (e) => console.log("broadcast:", e.data);
sw.port.start();

sw.port.postMessage({ from: "tab", msg: "hello" });
```

## 3）Service Worker

### 核心能力：作为“可编程网络代理”

- 可监听 `fetch`，决定走网络还是缓存
- 支持离线资源缓存（Cache Storage）
- 可做 PWA 能力：推送（push）、后台同步（sync，依赖支持情况）

### 生命周期要点（最容易踩坑）

- 安装（install）→ 激活（activate）→ 控制页面（clients）
- 可能随时被浏览器“挂起/终止”，所以不要依赖常驻内存
- 任务应以事件驱动+持久化存储为主（Cache/IndexedDB）

### 最小示例：注册 + 拦截 fetch + 缓存 + message 通信

**注册（页面中）**

```ts
// main.ts (browser)
if ("serviceWorker" in navigator) {
  const reg = await navigator.serviceWorker.register("/sw.js");
  console.log("sw registered:", reg.scope);

  navigator.serviceWorker.addEventListener("message", (e) => {
    console.log("from sw:", e.data);
  });

  // 发送消息给当前控制该页面的 SW
  navigator.serviceWorker.controller?.postMessage({ type: "PING" });
}
```

**Service Worker 文件（放在站点根路径可访问处，比如 Vite 的 `public/sw.js`）**

```js
// public/sw.js
const CACHE_NAME = "app-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", async (event) => {
  if (event.data?.type === "PING") {
    const clients = await self.clients.matchAll();
    for (const client of clients) client.postMessage({ type: "PONG" });
  }
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(event.request);
      if (cached) return cached;
      const res = await fetch(event.request);
      // 仅演示：可按需过滤 request/res（同源、GET、状态码等）
      cache.put(event.request, res.clone());
      return res;
    })()
  );
});
```

## 如何选择

- 只是“让计算不阻塞 UI”：**Web Worker**
- 多页面共享同一个后台执行体：**Shared Worker**
- 需要离线/缓存/拦截请求/PWA：**Service Worker**

## 常见误区

- Worker 并不自动提升 I/O 并发；I/O 并发本身浏览器/Node 已能很好处理
- Service Worker 不是为了跑重计算（它是网络与缓存层能力）
- “Promise 很多”不等于“多线程很多”：Promise 主要解决异步编排，不提供 CPU 并行
