import{_ as t,c as a,o,ag as n}from"./chunks/framework.Bw-5EFTY.js";const p=JSON.parse('{"title":"Web Offline (Offline-first / PWA) Notes (English)","description":"","frontmatter":{},"headers":[],"relativePath":"reading-notes/web/offline.en.md","filePath":"reading-notes/web/offline.en.md"}'),i={name:"reading-notes/web/offline.en.md"};function s(r,e,l,c,d,u){return o(),a("div",null,e[0]||(e[0]=[n(`<h1 id="web-offline-offline-first-pwa-notes-english" tabindex="-1">Web Offline (Offline-first / PWA) Notes (English) <a class="header-anchor" href="#web-offline-offline-first-pwa-notes-english" aria-label="Permalink to &quot;Web Offline (Offline-first / PWA) Notes (English)&quot;">​</a></h1><p><a href="/reading-notes/web/offline.html">中文</a></p><p>This note summarizes practical approaches to “offline support” on the web—from “site can open offline” to “core features work offline”.</p><h2 id="_0-how-service-worker-is-wired-in-vite-vitepress-example" tabindex="-1">0) How Service Worker is “wired in” (Vite/VitePress example) <a class="header-anchor" href="#_0-how-service-worker-is-wired-in-vite-vitepress-example" aria-label="Permalink to &quot;0) How Service Worker is “wired in” (Vite/VitePress example)&quot;">​</a></h2><p>Common confusion: <strong>Service Worker is not imported like a normal JS module</strong>. The browser downloads and runs it after you call <code>register()</code>.</p><h3 id="_0-1-where-files-live" tabindex="-1">0.1 Where files live <a class="header-anchor" href="#_0-1-where-files-live" aria-label="Permalink to &quot;0.1 Where files live&quot;">​</a></h3><p>With Vite/VitePress, put these under <code>public/</code> so they are copied to the site root at build time:</p><ul><li><code>public/sw.js</code> (served as <code>/sw.js</code>)</li><li><code>public/offline.html</code> (served as <code>/offline.html</code>)</li></ul><p>In a VitePress repo that usually means:</p><ul><li><code>docs/public/sw.js</code></li><li><code>docs/public/offline.html</code></li></ul><h3 id="_0-2-where-to-register-page-side" tabindex="-1">0.2 Where to register (page-side) <a class="header-anchor" href="#_0-2-where-to-register-page-side" aria-label="Permalink to &quot;0.2 Where to register (page-side)&quot;">​</a></h3><p>Register from any browser-side entry:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">// main.js (browser)
if (&quot;serviceWorker&quot; in navigator) {
  window.addEventListener(&quot;load&quot;, async () =&gt; {
    // If your site is deployed under a base path, include the base.
    const base = import.meta?.env?.BASE_URL ?? &quot;/&quot;;
    const reg = await navigator.serviceWorker.register(\`\${base}sw.js\`);
    console.log(&quot;SW scope:&quot;, reg.scope);
  });
}
</code></pre></div><h3 id="_0-3-why-root-ish-path-matters" tabindex="-1">0.3 Why “root-ish path” matters <a class="header-anchor" href="#_0-3-why-root-ish-path-matters" aria-label="Permalink to &quot;0.3 Why “root-ish path” matters&quot;">​</a></h3><p>SW can only control its <strong>scope</strong>. Typically:</p><ul><li><code>/sw.js</code> can control the whole site (<code>/</code>)</li><li><code>/foo/sw.js</code> can only control <code>/foo/</code></li></ul><h3 id="_0-4-dev-environment-note" tabindex="-1">0.4 Dev environment note <a class="header-anchor" href="#_0-4-dev-environment-note" aria-label="Permalink to &quot;0.4 Dev environment note&quot;">​</a></h3><ul><li>HTTPS (or localhost) is required</li><li>behavior can differ between dev and production; verify offline behavior on the built deployment</li></ul><h2 id="_1-define-your-offline-target-levels" tabindex="-1">1) Define your offline target (levels) <a class="header-anchor" href="#_1-define-your-offline-target-levels" aria-label="Permalink to &quot;1) Define your offline target (levels)&quot;">​</a></h2><ul><li><strong>Level 0: open offline</strong>: the site loads without network (App Shell + offline fallback page)</li><li><strong>Level 1: static assets offline</strong>: HTML/CSS/JS/fonts/images are cached</li><li><strong>Level 2: core data offline</strong>: important data can be read offline (IndexedDB)</li><li><strong>Level 3: offline writes</strong>: actions are queued offline and synced when back online (Background Sync / custom queue)</li></ul><p>Start from Level 0/1. Level 3 is a big jump in complexity.</p><h2 id="_2-the-core-service-worker-cache-storage" tabindex="-1">2) The core: Service Worker + Cache Storage <a class="header-anchor" href="#_2-the-core-service-worker-cache-storage" aria-label="Permalink to &quot;2) The core: Service Worker + Cache Storage&quot;">​</a></h2><p>Service Worker is usually the “switch” for offline:</p><ul><li>intercept requests via the <code>fetch</code> event</li><li>decide “network vs cache vs both”</li><li>store responses in <strong>Cache Storage</strong></li></ul><blockquote><p>Service Workers can be suspended/terminated anytime, so design event-driven logic and persist important state.</p></blockquote><h3 id="_2-1-register-the-service-worker-page-side" tabindex="-1">2.1 Register the Service Worker (page-side) <a class="header-anchor" href="#_2-1-register-the-service-worker-page-side" aria-label="Permalink to &quot;2.1 Register the Service Worker (page-side)&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">// main.js
if (&quot;serviceWorker&quot; in navigator) {
  window.addEventListener(&quot;load&quot;, async () =&gt; {
    const base = import.meta?.env?.BASE_URL ?? &quot;/&quot;;
    const reg = await navigator.serviceWorker.register(\`\${base}sw.js\`);
    console.log(&quot;SW scope:&quot;, reg.scope);
  });
}
</code></pre></div><p>Common prerequisites:</p><ul><li>HTTPS (or localhost)</li><li>the SW script path controls scope (usually put it at site root: <code>/sw.js</code>)</li></ul><h2 id="_3-minimum-viable-offline-fallback-page" tabindex="-1">3) Minimum viable: offline fallback page <a class="header-anchor" href="#_3-minimum-viable-offline-fallback-page" aria-label="Permalink to &quot;3) Minimum viable: offline fallback page&quot;">​</a></h2><p>Precache an <code>offline.html</code>, return it when navigation fails.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">// sw.js (minimal)
const CACHE = &quot;app-shell-v1&quot;;
const OFFLINE_URL = &quot;/offline.html&quot;;

self.addEventListener(&quot;install&quot;, (event) =&gt; {
  event.waitUntil(
    caches.open(CACHE).then((c) =&gt;
      c.addAll([
        OFFLINE_URL,
        &quot;/&quot;, // optional: treat home as an app shell entry
      ])
    )
  );
});

self.addEventListener(&quot;fetch&quot;, (event) =&gt; {
  event.respondWith(
    (async () =&gt; {
      try {
        return await fetch(event.request);
      } catch {
        // Fallback only for navigations; don&#39;t return HTML for APIs/images.
        if (event.request.mode === &quot;navigate&quot;) {
          const cache = await caches.open(CACHE);
          return (await cache.match(OFFLINE_URL)) ?? new Response(&quot;offline&quot;, { status: 503 });
        }
        throw new Error(&quot;offline&quot;);
      }
    })()
  );
});
</code></pre></div><h2 id="_4-caching-strategies-don-t-only-do-cache-first" tabindex="-1">4) Caching strategies (don’t only do cache-first) <a class="header-anchor" href="#_4-caching-strategies-don-t-only-do-cache-first" aria-label="Permalink to &quot;4) Caching strategies (don’t only do cache-first)&quot;">​</a></h2><p>Common strategies (trade-off between UX freshness and speed):</p><ul><li><strong>Cache-first</strong>: prefer cache, fallback to network <ul><li>good for: build assets, fonts, images</li><li>risk: stale content (needs versioning/cleanup)</li></ul></li><li><strong>Network-first</strong>: prefer network, fallback to cache <ul><li>good for: HTML documents, strong-consistency data</li><li>risk: slow on poor network (use timeouts)</li></ul></li><li><strong>Stale-while-revalidate (SWR)</strong>: return cached immediately, update cache in background <ul><li>good for: lists, “mostly-read” data</li></ul></li><li><strong>Cache-only / Network-only</strong><ul><li>for very explicit cases</li></ul></li></ul><h3 id="_4-1-minimal-implementations-in-service-worker" tabindex="-1">4.1 Minimal implementations (in Service Worker) <a class="header-anchor" href="#_4-1-minimal-implementations-in-service-worker" aria-label="Permalink to &quot;4.1 Minimal implementations (in Service Worker)&quot;">​</a></h3><p>Three practical building blocks you can copy: cache-first for static assets, network-first (with timeout) for navigations, and SWR for GET APIs.</p><p><strong>A. Static assets (build outputs/fonts/images): cache-first</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">const STATIC_CACHE = &quot;static-v1&quot;;

async function cacheFirst(req) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}
</code></pre></div><p><strong>B. HTML navigations: network-first + timeout</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">function fetchWithTimeout(req, ms = 3000) {
  return Promise.race([
    fetch(req),
    new Promise((_, reject) =&gt; setTimeout(() =&gt; reject(new Error(&quot;timeout&quot;)), ms)),
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
</code></pre></div><p><strong>C. GET APIs: stale-while-revalidate (fast then fresh)</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">const API_CACHE = &quot;api-v1&quot;;

async function staleWhileRevalidate(req) {
  const cache = await caches.open(API_CACHE);
  const cached = await cache.match(req);
  const networkPromise = fetch(req).then((res) =&gt; {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  return cached ?? networkPromise;
}
</code></pre></div><p>Route by request type:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">self.addEventListener(&quot;fetch&quot;, (event) =&gt; {
  const url = new URL(event.request.url);

  // same-origin only
  if (url.origin !== self.location.origin) return;

  // HTML navigation
  if (event.request.mode === &quot;navigate&quot;) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // API (example: GET under /api/)
  if (url.pathname.startsWith(&quot;/api/&quot;) &amp;&amp; event.request.method === &quot;GET&quot;) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // everything else
  event.respondWith(cacheFirst(event.request));
});
</code></pre></div><h2 id="_5-offline-data-cache-api-vs-indexeddb" tabindex="-1">5) Offline data: cache API vs IndexedDB <a class="header-anchor" href="#_5-offline-data-cache-api-vs-indexeddb" aria-label="Permalink to &quot;5) Offline data: cache API vs IndexedDB&quot;">​</a></h2><h3 id="_5-1-cache-api-responses-lightweight" tabindex="-1">5.1 Cache API responses (lightweight) <a class="header-anchor" href="#_5-1-cache-api-responses-lightweight" aria-label="Permalink to &quot;5.1 Cache API responses (lightweight)&quot;">​</a></h3><ul><li>cache GET responses in Cache Storage</li><li>good for read-only data with acceptable staleness</li></ul><p>Minimal behavior (with the SWR example above):</p><ul><li>online: return latest and refresh cache</li><li>offline: serve cached response if present (UI can still show the last known data)</li></ul><h3 id="_5-2-indexeddb-as-an-offline-data-layer" tabindex="-1">5.2 IndexedDB as an “offline data layer” <a class="header-anchor" href="#_5-2-indexeddb-as-an-offline-data-layer" aria-label="Permalink to &quot;5.2 IndexedDB as an “offline data layer”&quot;">​</a></h3><p>Good when:</p><ul><li>you need queries/pagination/incremental updates</li><li>you want offline writes (local queue + replay)</li></ul><p>Typical flow:</p><ul><li>on successful fetch: store normalized data in IndexedDB</li><li>offline: read from IndexedDB</li><li>online: sync (delta by version/timestamp)</li></ul><p>Native IndexedDB is verbose, so most projects use a small wrapper:</p><ul><li><strong><code>idb</code></strong>: a thin wrapper that keeps the IndexedDB model (great default)</li><li><strong>Dexie</strong>: a higher-level API with nicer querying/indexing</li></ul><p>Below is a minimal example using <code>idb</code> (only <code>kv</code> get/put):</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">// npm i idb
import { openDB } from &quot;idb&quot;;

const dbPromise = openDB(&quot;offline-db&quot;, 1, {
  upgrade(db) {
    db.createObjectStore(&quot;kv&quot;); // key -&gt; value
    db.createObjectStore(&quot;outbox&quot;, { keyPath: &quot;id&quot; }); // for offline writes
  },
});

async function kvGet(key) {
  return (await dbPromise).get(&quot;kv&quot;, key);
}

async function kvSet(key, value) {
  return (await dbPromise).put(&quot;kv&quot;, value, key);
}
</code></pre></div><p>Page-side “fetch online + persist; offline fallback to IDB”:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">async function fetchJsonWithIdbFallback(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(&quot;bad response&quot;);
    const data = await res.json();
    await kvSet(url, { data, ts: Date.now() });
    return data;
  } catch {
    const cached = await kvGet(url);
    if (cached?.data) return cached.data;
    throw new Error(&quot;no cache&quot;);
  }
}
</code></pre></div><blockquote><p>Cache Storage is great for HTTP responses; IndexedDB is better for structured/queryable data.</p></blockquote><h2 id="_6-if-you-want-offline-writes-level-3-what-should-you-do" tabindex="-1">6) If you want offline writes (Level 3), what should you do? <a class="header-anchor" href="#_6-if-you-want-offline-writes-level-3-what-should-you-do" aria-label="Permalink to &quot;6) If you want offline writes (Level 3), what should you do?&quot;">​</a></h2><p>Core pattern: <strong>Outbox (local op queue) + replay + idempotency</strong>.</p><h3 id="_6-1-minimal-approach-without-background-sync" tabindex="-1">6.1 Minimal approach (without Background Sync) <a class="header-anchor" href="#_6-1-minimal-approach-without-background-sync" aria-label="Permalink to &quot;6.1 Minimal approach (without Background Sync)&quot;">​</a></h3><ol><li>user performs a write (e.g. “create todo”)</li><li><strong>write an operation record into outbox (IndexedDB)</strong> and update UI optimistically</li><li>if online: flush immediately; if offline: flush on <code>online</code></li><li>on success: remove from outbox; on failure: keep and retry later</li></ol><p>Sketch:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">function uuid() {
  return crypto?.randomUUID?.() ?? String(Date.now()) + Math.random().toString(16).slice(2);
}

async function enqueueOp(op) {
  const record = { id: uuid(), op, ts: Date.now() };
  await (await dbPromise).put(&quot;outbox&quot;, record);
}

async function listOutbox() {
  return (await dbPromise).getAll(&quot;outbox&quot;);
}

async function removeOutbox(id) {
  return (await dbPromise).delete(&quot;outbox&quot;, id);
}

async function flushOutbox() {
  const items = await listOutbox();
  for (const item of items) {
    try {
      // key: server-side idempotency via clientRequestId
      await fetch(&quot;/api/apply&quot;, {
        method: &quot;POST&quot;,
        headers: { &quot;content-type&quot;: &quot;application/json&quot; },
        body: JSON.stringify({ ...item.op, clientRequestId: item.id }),
      });
      await removeOutbox(item.id);
    } catch {
      break; // stop and retry later
    }
  }
}

window.addEventListener(&quot;online&quot;, () =&gt; {
  flushOutbox();
});
</code></pre></div><h3 id="_6-2-use-background-sync-when-available-better-ux" tabindex="-1">6.2 Use Background Sync when available (better UX) <a class="header-anchor" href="#_6-2-use-background-sync-when-available-better-ux" aria-label="Permalink to &quot;6.2 Use Background Sync when available (better UX)&quot;">​</a></h3><ul><li>can sync even when the page isn’t in foreground (support varies)</li><li>after writing outbox: <code>registration.sync.register(&quot;sync-outbox&quot;)</code></li><li>in SW: listen to <code>sync</code> and flush outbox</li></ul><blockquote><p>Background Sync can be delayed by the browser/system, so still keep the “online flush” fallback.</p></blockquote><h3 id="_6-3-three-things-you-must-design-upfront" tabindex="-1">6.3 Three things you must design upfront <a class="header-anchor" href="#_6-3-three-things-you-must-design-upfront" aria-label="Permalink to &quot;6.3 Three things you must design upfront&quot;">​</a></h3><ul><li><strong>Idempotency</strong>: operations may replay multiple times; server must dedupe by <code>clientRequestId</code></li><li><strong>Conflict resolution</strong>: what if both sides edit the same entity offline? (LWW/versioning/merge)</li><li><strong>Data model</strong>: offline writes are a synchronization problem, not “just add caches”</li></ul><h3 id="_6-4-idb-vs-dexie-—-which-should-you-use" tabindex="-1">6.4 <code>idb</code> vs Dexie — which should you use? <a class="header-anchor" href="#_6-4-idb-vs-dexie-—-which-should-you-use" aria-label="Permalink to &quot;6.4 \`idb\` vs Dexie — which should you use?&quot;">​</a></h3><p>Quick guidance:</p><ul><li><strong>Use <code>idb</code></strong> if you only need a few stores (kv/outbox) and mostly do <code>get/put/getAll/delete</code>, and you want to keep the underlying model explicit.</li><li><strong>Use Dexie</strong> if you need real “tables/indexes/queries” (filter/sort/paginate/transactions) with a database-like API.</li></ul><p>Either way, the hard part is still the <strong>sync protocol</strong> (idempotency, conflicts, retries, versioning), not the wrapper API.</p><h2 id="_7-update-strategy-the-classic-offline-pitfall" tabindex="-1">7) Update strategy (the classic offline pitfall) <a class="header-anchor" href="#_7-update-strategy-the-classic-offline-pitfall" aria-label="Permalink to &quot;7) Update strategy (the classic offline pitfall)&quot;">​</a></h2><p>Offline support often fails at “updates”.</p><p>Practical tips:</p><ul><li><strong>version your caches</strong>: <code>app-shell-v1</code> → <code>app-shell-v2</code></li><li>clean old caches in <code>activate</code></li><li>provide a “new version available” UI (listen to <code>updatefound</code> / <code>controllerchange</code>)</li><li>be careful with <code>skipWaiting()</code> (it can replace the controlling SW immediately and break in-page state)</li></ul><h2 id="_8-common-pitfalls" tabindex="-1">8) Common pitfalls <a class="header-anchor" href="#_8-common-pitfalls" aria-label="Permalink to &quot;8) Common pitfalls&quot;">​</a></h2><ul><li>caching APIs with cache-first → data never updates</li><li>returning offline HTML for every request → APIs/images also get HTML and debugging becomes painful</li><li>never cleaning caches → storage grows forever</li><li>cross-origin caching limitations (CORS / opaque responses)</li><li>relying on in-memory state in SW → it can be killed anytime</li></ul><h2 id="_9-testing-debugging" tabindex="-1">9) Testing &amp; debugging <a class="header-anchor" href="#_9-testing-debugging" aria-label="Permalink to &quot;9) Testing &amp; debugging&quot;">​</a></h2><ul><li>Chrome DevTools → Application → Service Workers / Cache Storage</li><li>Network tab: enable “Offline”</li><li>Check: <ul><li>which requests hit cache</li><li>whether the page is controlled (<code>navigator.serviceWorker.controller</code>)</li><li>whether updates actually take effect</li></ul></li></ul>`,85)]))}const f=t(i,[["render",s]]);export{p as __pageData,f as default};
