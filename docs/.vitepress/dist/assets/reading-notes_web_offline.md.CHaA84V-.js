import{_ as t,c as o,o as n,ag as a}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"Web 离线化（Offline-first / PWA）实现笔记（中文）","description":"","frontmatter":{},"headers":[],"relativePath":"reading-notes/web/offline.md","filePath":"reading-notes/web/offline.md"}'),i={name:"reading-notes/web/offline.md"};function r(s,e,l,c,d,u){return n(),o("div",null,e[0]||(e[0]=[a(`<h1 id="web-离线化-offline-first-pwa-实现笔记-中文" tabindex="-1">Web 离线化（Offline-first / PWA）实现笔记（中文） <a class="header-anchor" href="#web-离线化-offline-first-pwa-实现笔记-中文" aria-label="Permalink to &quot;Web 离线化（Offline-first / PWA）实现笔记（中文）&quot;">​</a></h1><p><a href="/reading-notes/web/offline.en.html">English</a></p><p>这篇整理 Web 离线化的常用实现路径：从“可离线访问静态页面”到“可离线使用核心功能”。</p><h2 id="_0-在项目里怎么-接入-service-worker-以-vite-vitepress-为例" tabindex="-1">0）在项目里怎么“接入” Service Worker（以 Vite/VitePress 为例） <a class="header-anchor" href="#_0-在项目里怎么-接入-service-worker-以-vite-vitepress-为例" aria-label="Permalink to &quot;0）在项目里怎么“接入” Service Worker（以 Vite/VitePress 为例）&quot;">​</a></h2><p>很多同学卡在这里：<strong>Service Worker 不是 import 进来的模块</strong>，而是浏览器在你调用 <code>register()</code> 后下载并运行的“特殊脚本”。</p><h3 id="_0-1-文件放哪" tabindex="-1">0.1 文件放哪 <a class="header-anchor" href="#_0-1-文件放哪" aria-label="Permalink to &quot;0.1 文件放哪&quot;">​</a></h3><p>以 Vite/VitePress 为例，通常把这些文件放到 <code>public/</code>（构建时原样拷贝到站点根路径）：</p><ul><li><code>public/sw.js</code>（部署后能通过 <code>/sw.js</code> 访问）</li><li><code>public/offline.html</code>（部署后能通过 <code>/offline.html</code> 访问）</li></ul><p>在 VitePress 项目里就是：</p><ul><li><code>docs/public/sw.js</code></li><li><code>docs/public/offline.html</code></li></ul><h3 id="_0-2-在哪里注册-页面端" tabindex="-1">0.2 在哪里注册（页面端） <a class="header-anchor" href="#_0-2-在哪里注册-页面端" aria-label="Permalink to &quot;0.2 在哪里注册（页面端）&quot;">​</a></h3><p>在你的页面 JS 里（入口脚本、或任意会在浏览器运行的代码里）注册：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">// main.js (browser)
if (&quot;serviceWorker&quot; in navigator) {
  window.addEventListener(&quot;load&quot;, async () =&gt; {
    // 如果站点部署在子路径（有 base），要拼上 base
    const base = import.meta?.env?.BASE_URL ?? &quot;/&quot;;
    const reg = await navigator.serviceWorker.register(\`\${base}sw.js\`);
    console.log(&quot;SW scope:&quot;, reg.scope);
  });
}
</code></pre></div><h3 id="_0-3-为什么必须放在-根路径-附近" tabindex="-1">0.3 为什么必须放在“根路径”附近 <a class="header-anchor" href="#_0-3-为什么必须放在-根路径-附近" aria-label="Permalink to &quot;0.3 为什么必须放在“根路径”附近&quot;">​</a></h3><p>Service Worker 只能控制它的 <strong>scope</strong>。通常：</p><ul><li><code>/sw.js</code> 可以控制整个站点（<code>/</code> 下的请求）</li><li><code>/foo/sw.js</code> 只能控制 <code>/foo/</code> 下的请求</li></ul><h3 id="_0-4-开发环境注意" tabindex="-1">0.4 开发环境注意 <a class="header-anchor" href="#_0-4-开发环境注意" aria-label="Permalink to &quot;0.4 开发环境注意&quot;">​</a></h3><ul><li>需要 HTTPS（或 localhost）</li><li>有些开发服务器/代理会让 SW 行为与生产不一致；离线能力以 build 后部署环境验证为准</li></ul><h2 id="_1-离线化目标分层-先说清楚你要的是什么" tabindex="-1">1）离线化目标分层（先说清楚你要的是什么） <a class="header-anchor" href="#_1-离线化目标分层-先说清楚你要的是什么" aria-label="Permalink to &quot;1）离线化目标分层（先说清楚你要的是什么）&quot;">​</a></h2><ul><li><strong>Level 0：离线可打开</strong>：没网也能打开站点（App Shell + 离线页）</li><li><strong>Level 1：离线可浏览静态资源</strong>：HTML/CSS/JS/字体/图片可缓存</li><li><strong>Level 2：离线可用核心数据</strong>：关键数据可缓存/可回放（IndexedDB）</li><li><strong>Level 3：离线可写</strong>：离线期间产生操作，联网后自动同步（Background Sync / 自研队列）</li></ul><p>越往上，复杂度越高；不要一开始就做 Level 3。</p><h2 id="_2-核心机制-service-worker-cache-storage" tabindex="-1">2）核心机制：Service Worker + Cache Storage <a class="header-anchor" href="#_2-核心机制-service-worker-cache-storage" aria-label="Permalink to &quot;2）核心机制：Service Worker + Cache Storage&quot;">​</a></h2><p>离线化的“开关”通常是 <strong>Service Worker</strong>：</p><ul><li>通过 <code>fetch</code> 事件拦截请求</li><li>决定“走网络 / 走缓存 / 缓存+网络并用”</li><li>用 <code>Cache Storage</code> 缓存 Response</li></ul><blockquote><p>注意：Service Worker 的生命周期与页面解耦，可能随时被挂起/终止，所以逻辑要事件驱动 + 可持久化。</p></blockquote><h3 id="_2-1-注册-service-worker-页面端" tabindex="-1">2.1 注册 Service Worker（页面端） <a class="header-anchor" href="#_2-1-注册-service-worker-页面端" aria-label="Permalink to &quot;2.1 注册 Service Worker（页面端）&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">// main.js
if (&quot;serviceWorker&quot; in navigator) {
  window.addEventListener(&quot;load&quot;, async () =&gt; {
    const base = import.meta?.env?.BASE_URL ?? &quot;/&quot;;
    const reg = await navigator.serviceWorker.register(\`\${base}sw.js\`);
    console.log(&quot;SW scope:&quot;, reg.scope);
  });
}
</code></pre></div><p>前置条件（常见踩坑）：</p><ul><li>需要 HTTPS（或 localhost）</li><li><code>sw.js</code> 的路径决定可控制的 scope（通常放站点根路径：<code>/sw.js</code>）</li></ul><h2 id="_3-最小可用-离线兜底页-offline-fallback" tabindex="-1">3）最小可用：离线兜底页（Offline fallback） <a class="header-anchor" href="#_3-最小可用-离线兜底页-offline-fallback" aria-label="Permalink to &quot;3）最小可用：离线兜底页（Offline fallback）&quot;">​</a></h2><p>思路：预缓存一个 <code>offline.html</code>，当网络失败时返回它。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">// sw.js (minimal)
const CACHE = &quot;app-shell-v1&quot;;
const OFFLINE_URL = &quot;/offline.html&quot;;

self.addEventListener(&quot;install&quot;, (event) =&gt; {
  event.waitUntil(
    caches.open(CACHE).then((c) =&gt;
      c.addAll([
        OFFLINE_URL,
        &quot;/&quot;, // 可选：把首页也做成 App Shell
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
        // 只对导航请求兜底更合理（避免接口/图片也返回 HTML）
        if (event.request.mode === &quot;navigate&quot;) {
          const cache = await caches.open(CACHE);
          return (await cache.match(OFFLINE_URL)) ?? new Response(&quot;offline&quot;, { status: 503 });
        }
        throw new Error(&quot;offline&quot;);
      }
    })()
  );
});
</code></pre></div><h2 id="_4-缓存策略-别只会-cache-first" tabindex="-1">4）缓存策略：别只会 Cache-First <a class="header-anchor" href="#_4-缓存策略-别只会-cache-first" aria-label="Permalink to &quot;4）缓存策略：别只会 Cache-First&quot;">​</a></h2><p>常见策略（按“体验 vs 新鲜度”权衡）：</p><ul><li><strong>Cache-first</strong>：优先缓存，没命中再网络 <ul><li>适合：静态资源（图片、字体、构建产物）</li><li>风险：更新不及时（需要版本化/清理）</li></ul></li><li><strong>Network-first</strong>：优先网络，失败再缓存 <ul><li>适合：HTML 文档、强一致数据</li><li>风险：弱网慢（需要超时）</li></ul></li><li><strong>Stale-while-revalidate（SWR）</strong>：先返回缓存（即使旧），同时后台更新缓存 <ul><li>适合：列表页、非强一致数据、读多写少</li></ul></li><li><strong>Cache-only / Network-only</strong><ul><li>适合：非常明确的场景（如离线包资源 / 支付等必须实时）</li></ul></li></ul><h3 id="_4-1-常用策略的最小实现-service-worker-里写法" tabindex="-1">4.1 常用策略的最小实现（Service Worker 里写法） <a class="header-anchor" href="#_4-1-常用策略的最小实现-service-worker-里写法" aria-label="Permalink to &quot;4.1 常用策略的最小实现（Service Worker 里写法）&quot;">​</a></h3><p>下面给三个最常用的“可直接抄”的骨架：静态资源 cache-first、文档 network-first（带超时）、API 的 SWR。</p><p><strong>A. 静态资源（构建产物/图片/字体）：cache-first</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">const STATIC_CACHE = &quot;static-v1&quot;;

async function cacheFirst(req) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}
</code></pre></div><p><strong>B. HTML 导航：network-first + timeout</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">function fetchWithTimeout(req, ms = 3000) {
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
</code></pre></div><p><strong>C. GET 接口：stale-while-revalidate（先快后新）</strong></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">const API_CACHE = &quot;api-v1&quot;;

async function staleWhileRevalidate(req) {
  const cache = await caches.open(API_CACHE);
  const cached = await cache.match(req);
  const networkPromise = fetch(req).then((res) =&gt; {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  return cached ?? networkPromise;
}
</code></pre></div><p>然后在 <code>fetch</code> 事件里按类型分流：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">self.addEventListener(&quot;fetch&quot;, (event) =&gt; {
  const url = new URL(event.request.url);

  // 只处理同源
  if (url.origin !== self.location.origin) return;

  // HTML 导航
  if (event.request.mode === &quot;navigate&quot;) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // API（示例：同源 /api/ 下的 GET）
  if (url.pathname.startsWith(&quot;/api/&quot;) &amp;&amp; event.request.method === &quot;GET&quot;) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // 其它资源（脚本/样式/图片等）
  event.respondWith(cacheFirst(event.request));
});
</code></pre></div><h2 id="_5-数据离线-缓存接口响应-vs-indexeddb" tabindex="-1">5）数据离线：缓存接口响应 vs IndexedDB <a class="header-anchor" href="#_5-数据离线-缓存接口响应-vs-indexeddb" aria-label="Permalink to &quot;5）数据离线：缓存接口响应 vs IndexedDB&quot;">​</a></h2><h3 id="_5-1-直接缓存-api-response-轻量" tabindex="-1">5.1 直接缓存 API Response（轻量） <a class="header-anchor" href="#_5-1-直接缓存-api-response-轻量" aria-label="Permalink to &quot;5.1 直接缓存 API Response（轻量）&quot;">​</a></h3><ul><li>用 Cache Storage 缓存 GET 请求结果</li><li>适合：只读、可接受一定陈旧的数据</li></ul><p>一个最小例子（配合上面的 <code>staleWhileRevalidate</code>）：</p><ul><li>联网：返回最新，同时更新缓存</li><li>离线：如果有缓存就返回缓存（页面仍可展示上次的数据）</li></ul><h3 id="_5-2-用-indexeddb-做-离线数据层-更像-app" tabindex="-1">5.2 用 IndexedDB 做“离线数据层”（更像 App） <a class="header-anchor" href="#_5-2-用-indexeddb-做-离线数据层-更像-app" aria-label="Permalink to &quot;5.2 用 IndexedDB 做“离线数据层”（更像 App）&quot;">​</a></h3><p>适合：</p><ul><li>需要查询、分页、增量更新</li><li>需要离线写入（本地队列 + 重放）</li></ul><p>常见做法：</p><ul><li>fetch 成功后把数据写入 IndexedDB</li><li>离线时从 IndexedDB 读</li><li>联网后做同步（按版本号/时间戳增量拉取）</li></ul><p>IndexedDB 原生 API 很啰嗦，实战里通常会用一个轻量封装库：</p><ul><li><strong><code>idb</code></strong>：偏“薄封装”，保留 IndexedDB 的模型（推荐给工程化/可控的团队）</li><li><strong>Dexie</strong>：偏“更高层的 ORM/查询 API”，复杂查询/索引更舒服</li></ul><p>下面用更常见的 <code>idb</code> 写一个最小例子（只演示 <code>kv</code> 的 get/put）：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">// npm i idb
import { openDB } from &quot;idb&quot;;

const dbPromise = openDB(&quot;offline-db&quot;, 1, {
  upgrade(db) {
    db.createObjectStore(&quot;kv&quot;); // key -&gt; value
    db.createObjectStore(&quot;outbox&quot;, { keyPath: &quot;id&quot; }); // 给离线可写用
  },
});

async function kvGet(key) {
  return (await dbPromise).get(&quot;kv&quot;, key);
}

async function kvSet(key, value) {
  return (await dbPromise).put(&quot;kv&quot;, value, key);
}
</code></pre></div><p>页面端做“在线拉取 + 写入本地；离线回退读取本地”：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">async function fetchJsonWithIdbFallback(url) {
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
</code></pre></div><blockquote><p>IndexedDB 更适合“结构化数据”（可查询/可增量），Cache Storage 更适合“HTTP Response 缓存”。</p></blockquote><h2 id="_6-如果要实现-离线可写-level-3-应该怎么做" tabindex="-1">6）如果要实现“离线可写”（Level 3），应该怎么做？ <a class="header-anchor" href="#_6-如果要实现-离线可写-level-3-应该怎么做" aria-label="Permalink to &quot;6）如果要实现“离线可写”（Level 3），应该怎么做？&quot;">​</a></h2><p>核心模式：<strong>Outbox（本地操作队列）+ 重放（replay）+ 幂等（idempotent）</strong>。</p><h3 id="_6-1-最小方案-不依赖-background-sync" tabindex="-1">6.1 最小方案（不依赖 Background Sync） <a class="header-anchor" href="#_6-1-最小方案-不依赖-background-sync" aria-label="Permalink to &quot;6.1 最小方案（不依赖 Background Sync）&quot;">​</a></h3><ol><li>用户执行写操作（例如“新增一条 todo”）</li><li><strong>先写入本地 outbox（IndexedDB）</strong>，UI 先做“乐观更新”</li><li>如果当前在线，立即尝试 flush；如果离线，等 <code>online</code> 事件再 flush</li><li>flush 成功后，从 outbox 删除该操作；失败则保留，稍后重试</li></ol><p>示意：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">function uuid() {
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
      // 关键：让服务端支持幂等（比如带 clientRequestId）
      await fetch(&quot;/api/apply&quot;, {
        method: &quot;POST&quot;,
        headers: { &quot;content-type&quot;: &quot;application/json&quot; },
        body: JSON.stringify({ ...item.op, clientRequestId: item.id }),
      });
      await removeOutbox(item.id);
    } catch {
      // 失败就停（避免无限快速重试），下次再来
      break;
    }
  }
}

window.addEventListener(&quot;online&quot;, () =&gt; {
  flushOutbox();
});
</code></pre></div><h3 id="_6-2-有条件时用-background-sync-体验更好" tabindex="-1">6.2 有条件时用 Background Sync（体验更好） <a class="header-anchor" href="#_6-2-有条件时用-background-sync-体验更好" aria-label="Permalink to &quot;6.2 有条件时用 Background Sync（体验更好）&quot;">​</a></h3><ul><li>页面不在前台时也能触发同步（浏览器支持情况不一）</li><li>做法：写入 outbox 后调用 <code>registration.sync.register(&quot;sync-outbox&quot;)</code></li><li>SW 里监听 <code>sync</code> 事件，触发 <code>flushOutbox</code></li></ul><blockquote><p>注意：Background Sync 不一定可用；即使可用也可能被系统策略延后，所以仍要有“在线时手动 flush”的兜底。</p></blockquote><h3 id="_6-3-你必须提前想清楚的-3-件事" tabindex="-1">6.3 你必须提前想清楚的 3 件事 <a class="header-anchor" href="#_6-3-你必须提前想清楚的-3-件事" aria-label="Permalink to &quot;6.3 你必须提前想清楚的 3 件事&quot;">​</a></h3><ul><li><strong>幂等</strong>：同一操作可能被重放多次（断网/重试/页面刷新），服务端必须用 <code>clientRequestId</code> 去重</li><li><strong>冲突解决</strong>：离线期间两端都改了同一条数据怎么办？（最后写入覆盖/版本号/合并策略）</li><li><strong>数据模型</strong>：离线可写更像“同步系统”，别把它当成“多加几行缓存”</li></ul><h3 id="_6-4-到底用-idb-还是-dexie" tabindex="-1">6.4 到底用 <code>idb</code> 还是 Dexie？ <a class="header-anchor" href="#_6-4-到底用-idb-还是-dexie" aria-label="Permalink to &quot;6.4 到底用 \`idb\` 还是 Dexie？&quot;">​</a></h3><p>简单选型建议：</p><ul><li><strong>用 <code>idb</code></strong>：你只需要少量 store（kv/outbox），主要是 <code>get/put/getAll/delete</code>，希望保持底层模型清晰可控</li><li><strong>用 Dexie</strong>：你有明显的“表/索引/查询”需求（按字段过滤、排序、分页、事务），希望更接近数据库使用体验</li></ul><p>不管用哪个库，真正的难点都在 <strong>同步协议</strong>（幂等、冲突、重试、版本化），而不是“API 怎么写”。</p><h2 id="_7-更新策略-怎么让用户拿到最新资源" tabindex="-1">7）更新策略：怎么让用户拿到最新资源 <a class="header-anchor" href="#_7-更新策略-怎么让用户拿到最新资源" aria-label="Permalink to &quot;7）更新策略：怎么让用户拿到最新资源&quot;">​</a></h2><p>离线化最大坑之一是“更新”。</p><p>常见建议：</p><ul><li><strong>cache 版本化</strong>：<code>app-shell-v1</code> → <code>app-shell-v2</code></li><li><code>activate</code> 阶段清理旧 cache</li><li>提供“有新版本可用”的提示（监听 <code>updatefound</code> / <code>controllerchange</code>）</li><li>谨慎使用 <code>skipWaiting()</code>（会导致新 SW 抢占控制权，可能引起页面状态丢失）</li></ul><h2 id="_8-常见坑-踩过一次就记住" tabindex="-1">8）常见坑（踩过一次就记住） <a class="header-anchor" href="#_8-常见坑-踩过一次就记住" aria-label="Permalink to &quot;8）常见坑（踩过一次就记住）&quot;">​</a></h2><ul><li><strong>把 API 也 cache-first</strong>：数据永远不更新</li><li><strong>对所有请求都返回离线页</strong>：图片/接口请求也被返回 HTML，导致更难排查</li><li><strong>没有清理旧缓存</strong>：Cache Storage 无限膨胀</li><li><strong>跨域请求缓存受限</strong>：受 CORS/opaque response 影响</li><li><strong>Service Worker 被终止</strong>：不要把“状态”只放内存</li></ul><h2 id="_9-测试与排查" tabindex="-1">9）测试与排查 <a class="header-anchor" href="#_9-测试与排查" aria-label="Permalink to &quot;9）测试与排查&quot;">​</a></h2><ul><li>Chrome DevTools → Application → Service Workers / Cache Storage</li><li>Network 面板：勾选 “Offline” 验证兜底路径</li><li>关注： <ul><li>哪些资源命中 cache</li><li>SW 是否控制页面（<code>navigator.serviceWorker.controller</code>）</li><li>更新是否生效（旧 SW 是否还在控制）</li></ul></li></ul>`,85)]))}const g=t(i,[["render",r]]);export{h as __pageData,g as default};
