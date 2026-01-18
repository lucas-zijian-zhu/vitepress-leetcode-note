# Web Offline (Offline-first / PWA) Notes (English)

[中文](/reading-notes/web/offline.md)

This note summarizes practical approaches to “offline support” on the web—from “site can open offline” to “core features work offline”.

## 0) How Service Worker is “wired in” (Vite/VitePress example)

Common confusion: **Service Worker is not imported like a normal JS module**. The browser downloads and runs it after you call `register()`.

### 0.1 Where files live

With Vite/VitePress, put these under `public/` so they are copied to the site root at build time:

- `public/sw.js` (served as `/sw.js`)
- `public/offline.html` (served as `/offline.html`)

In a VitePress repo that usually means:

- `docs/public/sw.js`
- `docs/public/offline.html`

### 0.2 Where to register (page-side)

Register from any browser-side entry:

```js
// main.js (browser)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    // If your site is deployed under a base path, include the base.
    const base = import.meta?.env?.BASE_URL ?? "/";
    const reg = await navigator.serviceWorker.register(`${base}sw.js`);
    console.log("SW scope:", reg.scope);
  });
}
```

### 0.3 Why “root-ish path” matters

SW can only control its **scope**. Typically:

- `/sw.js` can control the whole site (`/`)
- `/foo/sw.js` can only control `/foo/`

### 0.4 Dev environment note

- HTTPS (or localhost) is required
- behavior can differ between dev and production; verify offline behavior on the built deployment

## 1) Define your offline target (levels)

- **Level 0: open offline**: the site loads without network (App Shell + offline fallback page)
- **Level 1: static assets offline**: HTML/CSS/JS/fonts/images are cached
- **Level 2: core data offline**: important data can be read offline (IndexedDB)
- **Level 3: offline writes**: actions are queued offline and synced when back online (Background Sync / custom queue)

Start from Level 0/1. Level 3 is a big jump in complexity.

## 2) The core: Service Worker + Cache Storage

Service Worker is usually the “switch” for offline:

- intercept requests via the `fetch` event
- decide “network vs cache vs both”
- store responses in **Cache Storage**

> Service Workers can be suspended/terminated anytime, so design event-driven logic and persist important state.

### 2.1 Register the Service Worker (page-side)

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

Common prerequisites:

- HTTPS (or localhost)
- the SW script path controls scope (usually put it at site root: `/sw.js`)

## 3) Minimum viable: offline fallback page

Precache an `offline.html`, return it when navigation fails.

```js
// sw.js (minimal)
const CACHE = "app-shell-v1";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) =>
      c.addAll([
        OFFLINE_URL,
        "/", // optional: treat home as an app shell entry
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
        // Fallback only for navigations; don't return HTML for APIs/images.
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

## 4) Caching strategies (don’t only do cache-first)

Common strategies (trade-off between UX freshness and speed):

- **Cache-first**: prefer cache, fallback to network
  - good for: build assets, fonts, images
  - risk: stale content (needs versioning/cleanup)
- **Network-first**: prefer network, fallback to cache
  - good for: HTML documents, strong-consistency data
  - risk: slow on poor network (use timeouts)
- **Stale-while-revalidate (SWR)**: return cached immediately, update cache in background
  - good for: lists, “mostly-read” data
- **Cache-only / Network-only**
  - for very explicit cases

### 4.1 Minimal implementations (in Service Worker)

Three practical building blocks you can copy: cache-first for static assets, network-first (with timeout) for navigations, and SWR for GET APIs.

**A. Static assets (build outputs/fonts/images): cache-first**

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

**B. HTML navigations: network-first + timeout**

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

**C. GET APIs: stale-while-revalidate (fast then fresh)**

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

Route by request type:

```js
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // same-origin only
  if (url.origin !== self.location.origin) return;

  // HTML navigation
  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // API (example: GET under /api/)
  if (url.pathname.startsWith("/api/") && event.request.method === "GET") {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // everything else
  event.respondWith(cacheFirst(event.request));
});
```

## 5) Offline data: cache API vs IndexedDB

### 5.1 Cache API responses (lightweight)

- cache GET responses in Cache Storage
- good for read-only data with acceptable staleness

Minimal behavior (with the SWR example above):

- online: return latest and refresh cache
- offline: serve cached response if present (UI can still show the last known data)

### 5.2 IndexedDB as an “offline data layer”

Good when:

- you need queries/pagination/incremental updates
- you want offline writes (local queue + replay)

Typical flow:

- on successful fetch: store normalized data in IndexedDB
- offline: read from IndexedDB
- online: sync (delta by version/timestamp)

Native IndexedDB is verbose, so most projects use a small wrapper:

- **`idb`**: a thin wrapper that keeps the IndexedDB model (great default)
- **Dexie**: a higher-level API with nicer querying/indexing

Below is a minimal example using `idb` (only `kv` get/put):

```js
// npm i idb
import { openDB } from "idb";

const dbPromise = openDB("offline-db", 1, {
  upgrade(db) {
    db.createObjectStore("kv"); // key -> value
    db.createObjectStore("outbox", { keyPath: "id" }); // for offline writes
  },
});

async function kvGet(key) {
  return (await dbPromise).get("kv", key);
}

async function kvSet(key, value) {
  return (await dbPromise).put("kv", value, key);
}
```

Page-side “fetch online + persist; offline fallback to IDB”:

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

> Cache Storage is great for HTTP responses; IndexedDB is better for structured/queryable data.

## 6) If you want offline writes (Level 3), what should you do?

Core pattern: **Outbox (local op queue) + replay + idempotency**.

### 6.1 Minimal approach (without Background Sync)

1. user performs a write (e.g. “create todo”)
2. **write an operation record into outbox (IndexedDB)** and update UI optimistically
3. if online: flush immediately; if offline: flush on `online`
4. on success: remove from outbox; on failure: keep and retry later

Sketch:

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
      // key: server-side idempotency via clientRequestId
      await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...item.op, clientRequestId: item.id }),
      });
      await removeOutbox(item.id);
    } catch {
      break; // stop and retry later
    }
  }
}

window.addEventListener("online", () => {
  flushOutbox();
});
```

### 6.2 Use Background Sync when available (better UX)

- can sync even when the page isn’t in foreground (support varies)
- after writing outbox: `registration.sync.register("sync-outbox")`
- in SW: listen to `sync` and flush outbox

> Background Sync can be delayed by the browser/system, so still keep the “online flush” fallback.

### 6.3 Three things you must design upfront

- **Idempotency**: operations may replay multiple times; server must dedupe by `clientRequestId`
- **Conflict resolution**: what if both sides edit the same entity offline? (LWW/versioning/merge)
- **Data model**: offline writes are a synchronization problem, not “just add caches”

### 6.4 `idb` vs Dexie — which should you use?

Quick guidance:

- **Use `idb`** if you only need a few stores (kv/outbox) and mostly do `get/put/getAll/delete`, and you want to keep the underlying model explicit.
- **Use Dexie** if you need real “tables/indexes/queries” (filter/sort/paginate/transactions) with a database-like API.

Either way, the hard part is still the **sync protocol** (idempotency, conflicts, retries, versioning), not the wrapper API.

## 7) Update strategy (the classic offline pitfall)

Offline support often fails at “updates”.

Practical tips:

- **version your caches**: `app-shell-v1` → `app-shell-v2`
- clean old caches in `activate`
- provide a “new version available” UI (listen to `updatefound` / `controllerchange`)
- be careful with `skipWaiting()` (it can replace the controlling SW immediately and break in-page state)

## 8) Common pitfalls

- caching APIs with cache-first → data never updates
- returning offline HTML for every request → APIs/images also get HTML and debugging becomes painful
- never cleaning caches → storage grows forever
- cross-origin caching limitations (CORS / opaque responses)
- relying on in-memory state in SW → it can be killed anytime

## 9) Testing & debugging

- Chrome DevTools → Application → Service Workers / Cache Storage
- Network tab: enable “Offline”
- Check:
  - which requests hit cache
  - whether the page is controlled (`navigator.serviceWorker.controller`)
  - whether updates actually take effect

