import{_ as t,c as a,o,ag as r}from"./chunks/framework.Bw-5EFTY.js";const p=JSON.parse('{"title":"Web Worker / Shared Worker / Service Worker：区别与实践","description":"","frontmatter":{},"headers":[],"relativePath":"reading-notes/web/workers.md","filePath":"reading-notes/web/workers.md"}'),s={name:"reading-notes/web/workers.md"};function n(l,e,i,d,c,h){return o(),a("div",null,e[0]||(e[0]=[r(`<h1 id="web-worker-shared-worker-service-worker-区别与实践" tabindex="-1">Web Worker / Shared Worker / Service Worker：区别与实践 <a class="header-anchor" href="#web-worker-shared-worker-service-worker-区别与实践" aria-label="Permalink to &quot;Web Worker / Shared Worker / Service Worker：区别与实践&quot;">​</a></h1><p><a href="/reading-notes/web/workers.en.html">English</a></p><p>这篇专门讲三种 Worker：它们解决什么问题、作用域/生命周期/能力边界、以及常见使用场景。</p><h2 id="总览对比" tabindex="-1">总览对比 <a class="header-anchor" href="#总览对比" aria-label="Permalink to &quot;总览对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>类型</th><th>作用域</th><th>生命周期</th><th>是否能拦截网络</th><th>主要通信</th><th>典型用途</th></tr></thead><tbody><tr><td>Web Worker</td><td>单页面（创建它的页面）</td><td>跟随页面</td><td>否</td><td><code>postMessage</code></td><td>计算/解析/压缩，避免卡 UI</td></tr><tr><td>Shared Worker</td><td>同源多页面共享</td><td>只要还有连接就存在</td><td>否</td><td><code>MessagePort</code></td><td>多标签共享连接/状态、统一后台任务</td></tr><tr><td>Service Worker</td><td>同源站点级</td><td>与页面解耦（可在后台）</td><td>是（<code>fetch</code> 事件）</td><td><code>postMessage</code> + 事件</td><td>离线缓存、PWA、推送、后台同步</td></tr></tbody></table><blockquote><p>共同点：都跑在独立线程/上下文里，<strong>不能直接操作 DOM</strong>，需要消息通信。</p></blockquote><h2 id="_1-web-worker" tabindex="-1">1）Web Worker <a class="header-anchor" href="#_1-web-worker" aria-label="Permalink to &quot;1）Web Worker&quot;">​</a></h2><h3 id="适合做什么" tabindex="-1">适合做什么 <a class="header-anchor" href="#适合做什么" aria-label="Permalink to &quot;适合做什么&quot;">​</a></h3><ul><li>CPU 密集：大 JSON 解析、加解密、图片/音频处理、复杂计算</li><li>长任务：把会卡主线程的逻辑挪出去</li></ul><h3 id="能力与限制" tabindex="-1">能力与限制 <a class="header-anchor" href="#能力与限制" aria-label="Permalink to &quot;能力与限制&quot;">​</a></h3><ul><li>无 DOM、无 <code>window</code>（但有 <code>self</code>）</li><li>通过 <code>postMessage</code> 通信（结构化克隆；部分场景可用 Transferable 提升性能）</li><li>适合“计算任务”，不适合“页面控制”</li></ul><h3 id="最小示例-创建与通信-vite-vitepress-风格" tabindex="-1">最小示例：创建与通信（Vite/VitePress 风格） <a class="header-anchor" href="#最小示例-创建与通信-vite-vitepress-风格" aria-label="Permalink to &quot;最小示例：创建与通信（Vite/VitePress 风格）&quot;">​</a></h3><p>文件：<code>worker.ts</code></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// worker.ts
self.onmessage = (event) =&gt; {
  const input = event.data as number;
  const output = input * 2;
  self.postMessage({ output });
};
</code></pre></div><p>文件：<code>main.ts</code></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// main.ts
const worker = new Worker(new URL(&quot;./worker.ts&quot;, import.meta.url), {
  type: &quot;module&quot;,
});

worker.onmessage = (event) =&gt; {
  console.log(&quot;from worker:&quot;, event.data); // { output: 20 }
};

worker.postMessage(10);
</code></pre></div><h2 id="_2-shared-worker" tabindex="-1">2）Shared Worker <a class="header-anchor" href="#_2-shared-worker" aria-label="Permalink to &quot;2）Shared Worker&quot;">​</a></h2><h3 id="与-web-worker-最大区别" tabindex="-1">与 Web Worker 最大区别 <a class="header-anchor" href="#与-web-worker-最大区别" aria-label="Permalink to &quot;与 Web Worker 最大区别&quot;">​</a></h3><ul><li><strong>同源下多个页面/Tab 可以共享同一个 Worker</strong></li><li>通信通过 <code>MessagePort</code>，每个连接一个端口</li></ul><h3 id="适合场景" tabindex="-1">适合场景 <a class="header-anchor" href="#适合场景" aria-label="Permalink to &quot;适合场景&quot;">​</a></h3><ul><li>多标签共享一个 WebSocket 连接（避免每个标签各建一个）</li><li>统一做节流/限流/后台轮询</li></ul><h3 id="最小示例-多-tab-共享-端口通信" tabindex="-1">最小示例：多 Tab 共享 + 端口通信 <a class="header-anchor" href="#最小示例-多-tab-共享-端口通信" aria-label="Permalink to &quot;最小示例：多 Tab 共享 + 端口通信&quot;">​</a></h3><p>文件：<code>shared-worker.ts</code></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// shared-worker.ts
const ports = new Set&lt;MessagePort&gt;();

self.onconnect = (event: MessageEvent) =&gt; {
  const port = (event as any).ports[0] as MessagePort;
  ports.add(port);

  port.onmessage = (e) =&gt; {
    // 广播给所有连接的页面
    for (const p of ports) p.postMessage({ echo: e.data, ts: Date.now() });
  };

  port.start();
};
</code></pre></div><p>页面：<code>main.ts</code></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// main.ts
const sw = new SharedWorker(new URL(&quot;./shared-worker.ts&quot;, import.meta.url), {
  type: &quot;module&quot;,
});

sw.port.onmessage = (e) =&gt; console.log(&quot;broadcast:&quot;, e.data);
sw.port.start();

sw.port.postMessage({ from: &quot;tab&quot;, msg: &quot;hello&quot; });
</code></pre></div><h2 id="_3-service-worker" tabindex="-1">3）Service Worker <a class="header-anchor" href="#_3-service-worker" aria-label="Permalink to &quot;3）Service Worker&quot;">​</a></h2><h3 id="核心能力-作为-可编程网络代理" tabindex="-1">核心能力：作为“可编程网络代理” <a class="header-anchor" href="#核心能力-作为-可编程网络代理" aria-label="Permalink to &quot;核心能力：作为“可编程网络代理”&quot;">​</a></h3><ul><li>可监听 <code>fetch</code>，决定走网络还是缓存</li><li>支持离线资源缓存（Cache Storage）</li><li>可做 PWA 能力：推送（push）、后台同步（sync，依赖支持情况）</li></ul><h3 id="生命周期要点-最容易踩坑" tabindex="-1">生命周期要点（最容易踩坑） <a class="header-anchor" href="#生命周期要点-最容易踩坑" aria-label="Permalink to &quot;生命周期要点（最容易踩坑）&quot;">​</a></h3><ul><li>安装（install）→ 激活（activate）→ 控制页面（clients）</li><li>可能随时被浏览器“挂起/终止”，所以不要依赖常驻内存</li><li>任务应以事件驱动+持久化存储为主（Cache/IndexedDB）</li></ul><h3 id="最小示例-注册-拦截-fetch-缓存-message-通信" tabindex="-1">最小示例：注册 + 拦截 fetch + 缓存 + message 通信 <a class="header-anchor" href="#最小示例-注册-拦截-fetch-缓存-message-通信" aria-label="Permalink to &quot;最小示例：注册 + 拦截 fetch + 缓存 + message 通信&quot;">​</a></h3><p><strong>注册（页面中）</strong></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// main.ts (browser)
if (&quot;serviceWorker&quot; in navigator) {
  const reg = await navigator.serviceWorker.register(&quot;/sw.js&quot;);
  console.log(&quot;sw registered:&quot;, reg.scope);

  navigator.serviceWorker.addEventListener(&quot;message&quot;, (e) =&gt; {
    console.log(&quot;from sw:&quot;, e.data);
  });

  // 发送消息给当前控制该页面的 SW
  navigator.serviceWorker.controller?.postMessage({ type: &quot;PING&quot; });
}
</code></pre></div><p><strong>Service Worker 文件（放在站点根路径可访问处，比如 Vite 的 <code>public/sw.js</code>）</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">// public/sw.js
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
      // 仅演示：可按需过滤 request/res（同源、GET、状态码等）
      cache.put(event.request, res.clone());
      return res;
    })()
  );
});
</code></pre></div><h2 id="如何选择" tabindex="-1">如何选择 <a class="header-anchor" href="#如何选择" aria-label="Permalink to &quot;如何选择&quot;">​</a></h2><ul><li>只是“让计算不阻塞 UI”：<strong>Web Worker</strong></li><li>多页面共享同一个后台执行体：<strong>Shared Worker</strong></li><li>需要离线/缓存/拦截请求/PWA：<strong>Service Worker</strong></li></ul><h2 id="常见误区" tabindex="-1">常见误区 <a class="header-anchor" href="#常见误区" aria-label="Permalink to &quot;常见误区&quot;">​</a></h2><ul><li>Worker 并不自动提升 I/O 并发；I/O 并发本身浏览器/Node 已能很好处理</li><li>Service Worker 不是为了跑重计算（它是网络与缓存层能力）</li><li>“Promise 很多”不等于“多线程很多”：Promise 主要解决异步编排，不提供 CPU 并行</li></ul>`,40)]))}const g=t(s,[["render",n]]);export{p as __pageData,g as default};
