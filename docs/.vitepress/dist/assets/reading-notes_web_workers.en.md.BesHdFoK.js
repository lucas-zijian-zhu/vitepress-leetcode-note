import{_ as t,c as a,o,ag as r}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"Web Worker / Shared Worker / Service Worker: differences and practices (English)","description":"","frontmatter":{},"headers":[],"relativePath":"reading-notes/web/workers.en.md","filePath":"reading-notes/web/workers.en.md"}'),s={name:"reading-notes/web/workers.en.md"};function n(i,e,c,l,d,p){return o(),a("div",null,e[0]||(e[0]=[r(`<h1 id="web-worker-shared-worker-service-worker-differences-and-practices-english" tabindex="-1">Web Worker / Shared Worker / Service Worker: differences and practices (English) <a class="header-anchor" href="#web-worker-shared-worker-service-worker-differences-and-practices-english" aria-label="Permalink to &quot;Web Worker / Shared Worker / Service Worker: differences and practices (English)&quot;">​</a></h1><p><a href="/reading-notes/web/workers.html">中文</a></p><p>This note focuses on three worker types: what problems they solve, how scope/lifecycle/capabilities differ, and common usage patterns.</p><h2 id="overall-comparison" tabindex="-1">Overall comparison <a class="header-anchor" href="#overall-comparison" aria-label="Permalink to &quot;Overall comparison&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Type</th><th>Scope</th><th>Lifecycle</th><th>Can intercept network?</th><th>Main messaging</th><th>Typical use</th></tr></thead><tbody><tr><td>Web Worker</td><td>Single page (the page that created it)</td><td>tied to the page</td><td>No</td><td><code>postMessage</code></td><td>compute/parse/compress without blocking UI</td></tr><tr><td>Shared Worker</td><td>shared across same-origin pages</td><td>alive while there are connections</td><td>No</td><td><code>MessagePort</code></td><td>share connection/state across tabs; unified background tasks</td></tr><tr><td>Service Worker</td><td>site-level (same origin)</td><td>decoupled from pages (can run in background)</td><td>Yes (<code>fetch</code> event)</td><td>events + <code>postMessage</code></td><td>offline cache, PWA, push, background sync</td></tr></tbody></table><blockquote><p>Common: all run in an isolated context/thread, <strong>cannot directly access the DOM</strong>, and must communicate via messages.</p></blockquote><h2 id="_1-web-worker" tabindex="-1">1) Web Worker <a class="header-anchor" href="#_1-web-worker" aria-label="Permalink to &quot;1) Web Worker&quot;">​</a></h2><h3 id="what-it-s-good-for" tabindex="-1">What it’s good for <a class="header-anchor" href="#what-it-s-good-for" aria-label="Permalink to &quot;What it’s good for&quot;">​</a></h3><ul><li>CPU-intensive tasks: large JSON parsing, crypto, image/audio processing, heavy computation</li><li>Long-running tasks: move work off the main thread to avoid UI jank</li></ul><h3 id="capabilities-and-limitations" tabindex="-1">Capabilities and limitations <a class="header-anchor" href="#capabilities-and-limitations" aria-label="Permalink to &quot;Capabilities and limitations&quot;">​</a></h3><ul><li>No DOM, no <code>window</code> (but you do have <code>self</code>)</li><li>Communicate via <code>postMessage</code> (structured clone; use Transferable in some cases for better performance)</li><li>Great for “computation”; not for “controlling the page”</li></ul><h3 id="minimal-example-create-message-vite-vitepress-style" tabindex="-1">Minimal example: create + message (Vite/VitePress style) <a class="header-anchor" href="#minimal-example-create-message-vite-vitepress-style" aria-label="Permalink to &quot;Minimal example: create + message (Vite/VitePress style)&quot;">​</a></h3><p>File: <code>worker.ts</code></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// worker.ts
self.onmessage = (event) =&gt; {
  const input = event.data as number;
  const output = input * 2;
  self.postMessage({ output });
};
</code></pre></div><p>File: <code>main.ts</code></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// main.ts
const worker = new Worker(new URL(&quot;./worker.ts&quot;, import.meta.url), {
  type: &quot;module&quot;,
});

worker.onmessage = (event) =&gt; {
  console.log(&quot;from worker:&quot;, event.data); // { output: 20 }
};

worker.postMessage(10);
</code></pre></div><h2 id="_2-shared-worker" tabindex="-1">2) Shared Worker <a class="header-anchor" href="#_2-shared-worker" aria-label="Permalink to &quot;2) Shared Worker&quot;">​</a></h2><h3 id="the-biggest-difference-from-web-worker" tabindex="-1">The biggest difference from Web Worker <a class="header-anchor" href="#the-biggest-difference-from-web-worker" aria-label="Permalink to &quot;The biggest difference from Web Worker&quot;">​</a></h3><ul><li><strong>One worker can be shared by multiple same-origin pages/tabs</strong></li><li>Messaging is done through <code>MessagePort</code> (one port per connection)</li></ul><h3 id="good-use-cases" tabindex="-1">Good use cases <a class="header-anchor" href="#good-use-cases" aria-label="Permalink to &quot;Good use cases&quot;">​</a></h3><ul><li>Share a single WebSocket connection across tabs (instead of one per tab)</li><li>Centralize throttling/rate limiting/polling work in the background</li></ul><h3 id="minimal-example-multi-tab-sharing-port-messaging" tabindex="-1">Minimal example: multi-tab sharing + port messaging <a class="header-anchor" href="#minimal-example-multi-tab-sharing-port-messaging" aria-label="Permalink to &quot;Minimal example: multi-tab sharing + port messaging&quot;">​</a></h3><p>File: <code>shared-worker.ts</code></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// shared-worker.ts
const ports = new Set&lt;MessagePort&gt;();

self.onconnect = (event: MessageEvent) =&gt; {
  const port = (event as any).ports[0] as MessagePort;
  ports.add(port);

  port.onmessage = (e) =&gt; {
    // broadcast to all connected pages
    for (const p of ports) p.postMessage({ echo: e.data, ts: Date.now() });
  };

  port.start();
};
</code></pre></div><p>Page: <code>main.ts</code></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// main.ts
const sw = new SharedWorker(new URL(&quot;./shared-worker.ts&quot;, import.meta.url), {
  type: &quot;module&quot;,
});

sw.port.onmessage = (e) =&gt; console.log(&quot;broadcast:&quot;, e.data);
sw.port.start();

sw.port.postMessage({ from: &quot;tab&quot;, msg: &quot;hello&quot; });
</code></pre></div><h2 id="_3-service-worker" tabindex="-1">3) Service Worker <a class="header-anchor" href="#_3-service-worker" aria-label="Permalink to &quot;3) Service Worker&quot;">​</a></h2><h3 id="core-capability-a-programmable-network-proxy" tabindex="-1">Core capability: a “programmable network proxy” <a class="header-anchor" href="#core-capability-a-programmable-network-proxy" aria-label="Permalink to &quot;Core capability: a “programmable network proxy”&quot;">​</a></h3><ul><li>Can listen to <code>fetch</code> and decide whether to serve from network or cache</li><li>Supports offline caching (Cache Storage)</li><li>Enables PWA features: push, background sync (depending on browser support)</li></ul><h3 id="lifecycle-notes-common-pitfalls" tabindex="-1">Lifecycle notes (common pitfalls) <a class="header-anchor" href="#lifecycle-notes-common-pitfalls" aria-label="Permalink to &quot;Lifecycle notes (common pitfalls)&quot;">​</a></h3><ul><li>install → activate → control pages (clients)</li><li>The browser may suspend/terminate it at any time, so don’t rely on in-memory state</li><li>Prefer event-driven logic + persistent storage (Cache/IndexedDB)</li></ul><h3 id="minimal-example-register-intercept-fetch-cache-message" tabindex="-1">Minimal example: register + intercept fetch + cache + message <a class="header-anchor" href="#minimal-example-register-intercept-fetch-cache-message" aria-label="Permalink to &quot;Minimal example: register + intercept fetch + cache + message&quot;">​</a></h3><p><strong>Register (in a page)</strong></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// main.ts (browser)
if (&quot;serviceWorker&quot; in navigator) {
  const reg = await navigator.serviceWorker.register(&quot;/sw.js&quot;);
  console.log(&quot;sw registered:&quot;, reg.scope);

  navigator.serviceWorker.addEventListener(&quot;message&quot;, (e) =&gt; {
    console.log(&quot;from sw:&quot;, e.data);
  });

  // send message to the SW that currently controls this page
  navigator.serviceWorker.controller?.postMessage({ type: &quot;PING&quot; });
}
</code></pre></div><p><strong>Service Worker file</strong> (place at a URL reachable from site root, e.g. Vite <code>public/sw.js</code>)</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">// public/sw.js
const CACHE_NAME = &quot;app-cache-v1&quot;;

self.addEventListener(&quot;install&quot;, (event) =&gt; {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener(&quot;activate&quot;, (event) =&gt; {
  event.waitUntil(self.clients.claim());
});

self.addEventListener(&quot;message&quot;, async (event) =&gt; {
  if (event.data?.type === &quot;PING&quot;) {
    const clients = await self.clients.matchAll();
    for (const client of clients) client.postMessage({ type: &quot;PONG&quot; });
  }
});

self.addEventListener(&quot;fetch&quot;, (event) =&gt; {
  event.respondWith(
    (async () =&gt; {
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
</code></pre></div><h2 id="how-to-choose" tabindex="-1">How to choose <a class="header-anchor" href="#how-to-choose" aria-label="Permalink to &quot;How to choose&quot;">​</a></h2><ul><li>If your goal is “do compute without blocking UI”: <strong>Web Worker</strong></li><li>If you need one background executor shared across pages/tabs: <strong>Shared Worker</strong></li><li>If you need offline/cache/network interception/PWA: <strong>Service Worker</strong></li></ul><h2 id="common-misconceptions" tabindex="-1">Common misconceptions <a class="header-anchor" href="#common-misconceptions" aria-label="Permalink to &quot;Common misconceptions&quot;">​</a></h2><ul><li>Workers don’t automatically improve I/O concurrency; browsers/Node already handle I/O concurrency well</li><li>Service Workers are not for heavy computation (they’re primarily for network + cache capabilities)</li><li>“Many Promises” ≠ “many threads”: Promises help async orchestration, not CPU parallelism</li></ul>`,40)]))}const g=t(s,[["render",n]]);export{u as __pageData,g as default};
