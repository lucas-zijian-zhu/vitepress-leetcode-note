# Web Worker / Shared Worker / Service Worker: differences and practices (English)

[中文](/reading-notes/web/workers.md)

This note focuses on three worker types: what problems they solve, how scope/lifecycle/capabilities differ, and common usage patterns.

## Overall comparison

| Type | Scope | Lifecycle | Can intercept network? | Main messaging | Typical use |
| --- | --- | --- | --- | --- | --- |
| Web Worker | Single page (the page that created it) | tied to the page | No | `postMessage` | compute/parse/compress without blocking UI |
| Shared Worker | shared across same-origin pages | alive while there are connections | No | `MessagePort` | share connection/state across tabs; unified background tasks |
| Service Worker | site-level (same origin) | decoupled from pages (can run in background) | Yes (`fetch` event) | events + `postMessage` | offline cache, PWA, push, background sync |

> Common: all run in an isolated context/thread, **cannot directly access the DOM**, and must communicate via messages.

## 1) Web Worker

### What it’s good for

- CPU-intensive tasks: large JSON parsing, crypto, image/audio processing, heavy computation
- Long-running tasks: move work off the main thread to avoid UI jank

### Capabilities and limitations

- No DOM, no `window` (but you do have `self`)
- Communicate via `postMessage` (structured clone; use Transferable in some cases for better performance)
- Great for “computation”; not for “controlling the page”

### Minimal example: create + message (Vite/VitePress style)

File: `worker.ts`

```ts
// worker.ts
self.onmessage = (event) => {
  const input = event.data as number;
  const output = input * 2;
  self.postMessage({ output });
};
```

File: `main.ts`

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

## 2) Shared Worker

### The biggest difference from Web Worker

- **One worker can be shared by multiple same-origin pages/tabs**
- Messaging is done through `MessagePort` (one port per connection)

### Good use cases

- Share a single WebSocket connection across tabs (instead of one per tab)
- Centralize throttling/rate limiting/polling work in the background

### Minimal example: multi-tab sharing + port messaging

File: `shared-worker.ts`

```ts
// shared-worker.ts
const ports = new Set<MessagePort>();

self.onconnect = (event: MessageEvent) => {
  const port = (event as any).ports[0] as MessagePort;
  ports.add(port);

  port.onmessage = (e) => {
    // broadcast to all connected pages
    for (const p of ports) p.postMessage({ echo: e.data, ts: Date.now() });
  };

  port.start();
};
```

Page: `main.ts`

```ts
// main.ts
const sw = new SharedWorker(new URL("./shared-worker.ts", import.meta.url), {
  type: "module",
});

sw.port.onmessage = (e) => console.log("broadcast:", e.data);
sw.port.start();

sw.port.postMessage({ from: "tab", msg: "hello" });
```

## 3) Service Worker

### Core capability: a “programmable network proxy”

- Can listen to `fetch` and decide whether to serve from network or cache
- Supports offline caching (Cache Storage)
- Enables PWA features: push, background sync (depending on browser support)

### Lifecycle notes (common pitfalls)

- install → activate → control pages (clients)
- The browser may suspend/terminate it at any time, so don’t rely on in-memory state
- Prefer event-driven logic + persistent storage (Cache/IndexedDB)

### Minimal example: register + intercept fetch + cache + message

**Register (in a page)**

```ts
// main.ts (browser)
if ("serviceWorker" in navigator) {
  const reg = await navigator.serviceWorker.register("/sw.js");
  console.log("sw registered:", reg.scope);

  navigator.serviceWorker.addEventListener("message", (e) => {
    console.log("from sw:", e.data);
  });

  // send message to the SW that currently controls this page
  navigator.serviceWorker.controller?.postMessage({ type: "PING" });
}
```

**Service Worker file** (place at a URL reachable from site root, e.g. Vite `public/sw.js`)

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
      // demo only: you may want to filter requests/responses (same-origin, GET, status codes, etc.)
      cache.put(event.request, res.clone());
      return res;
    })()
  );
});
```

## How to choose

- If your goal is “do compute without blocking UI”: **Web Worker**
- If you need one background executor shared across pages/tabs: **Shared Worker**
- If you need offline/cache/network interception/PWA: **Service Worker**

## Common misconceptions

- Workers don’t automatically improve I/O concurrency; browsers/Node already handle I/O concurrency well
- Service Workers are not for heavy computation (they’re primarily for network + cache capabilities)
- “Many Promises” ≠ “many threads”: Promises help async orchestration, not CPU parallelism
