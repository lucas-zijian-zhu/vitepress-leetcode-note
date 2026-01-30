import{_ as o,c as t,o as a,ag as n}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"Promise：用法、组合、异常处理与并发控制（中文）","description":"","frontmatter":{},"headers":[],"relativePath":"reading-notes/web/promise.md","filePath":"reading-notes/web/promise.md"}'),s={name:"reading-notes/web/promise.md"};function l(r,e,c,i,d,u){return a(),t("div",null,e[0]||(e[0]=[n(`<h1 id="promise-用法、组合、异常处理与并发控制-中文" tabindex="-1">Promise：用法、组合、异常处理与并发控制（中文） <a class="header-anchor" href="#promise-用法、组合、异常处理与并发控制-中文" aria-label="Permalink to &quot;Promise：用法、组合、异常处理与并发控制（中文）&quot;">​</a></h1><p><a href="/reading-notes/web/promise.en.html">English</a></p><h2 id="_0-promise-是什么-先建立正确心智" tabindex="-1">0. Promise 是什么（先建立正确心智） <a class="header-anchor" href="#_0-promise-是什么-先建立正确心智" aria-label="Permalink to &quot;0. Promise 是什么（先建立正确心智）&quot;">​</a></h2><ul><li><strong>Promise 是一个“未来结果”的容器</strong>：可能成功（fulfilled）或失败（rejected）</li><li><strong>Promise 本身不等于并行</strong>：并发来自你同时启动了多个异步操作（I/O），而不是 Promise “开了线程”</li><li>状态只能从 <code>pending</code> → <code>fulfilled/rejected</code>，一旦决议不可逆</li></ul><h2 id="_1-new-promise-resolve-reject" tabindex="-1">1. <code>new Promise((resolve, reject) =&gt; {})</code> <a class="header-anchor" href="#_1-new-promise-resolve-reject" aria-label="Permalink to &quot;1. \`new Promise((resolve, reject) =&gt; {})\`&quot;">​</a></h2><h3 id="_1-1-基本用法" tabindex="-1">1.1 基本用法 <a class="header-anchor" href="#_1-1-基本用法" aria-label="Permalink to &quot;1.1 基本用法&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">const p = new Promise&lt;number&gt;((resolve, reject) =&gt; {
  setTimeout(() =&gt; resolve(42), 100);
  // reject(new Error(&quot;boom&quot;));
});

p.then((v) =&gt; console.log(&quot;value:&quot;, v)).catch((e) =&gt; console.error(&quot;err:&quot;, e));
</code></pre></div><h3 id="_1-2-约定-reject-用-error" tabindex="-1">1.2 约定：reject 用 <code>Error</code> <a class="header-anchor" href="#_1-2-约定-reject-用-error" aria-label="Permalink to &quot;1.2 约定：reject 用 \`Error\`&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.reject(new Error(&quot;network failed&quot;))
  .catch((e) =&gt; {
    console.log(e instanceof Error); // true
    console.log(e.message); // &quot;network failed&quot;
  });
</code></pre></div><h2 id="_2-promise-resolve-promise-reject" tabindex="-1">2. <code>Promise.resolve</code> / <code>Promise.reject</code> <a class="header-anchor" href="#_2-promise-resolve-promise-reject" aria-label="Permalink to &quot;2. \`Promise.resolve\` / \`Promise.reject\`&quot;">​</a></h2><h3 id="_2-1-promise-resolve-x-把值-promise-化" tabindex="-1">2.1 <code>Promise.resolve(x)</code>：把值“Promise 化” <a class="header-anchor" href="#_2-1-promise-resolve-x-把值-promise-化" aria-label="Permalink to &quot;2.1 \`Promise.resolve(x)\`：把值“Promise 化”&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(123).then((v) =&gt; console.log(v)); // 123
</code></pre></div><h3 id="_2-2-吸收-adopt-已有-promise-的状态" tabindex="-1">2.2 “吸收（adopt）”已有 Promise 的状态 <a class="header-anchor" href="#_2-2-吸收-adopt-已有-promise-的状态" aria-label="Permalink to &quot;2.2 “吸收（adopt）”已有 Promise 的状态&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">const inner = new Promise&lt;string&gt;((resolve) =&gt; setTimeout(() =&gt; resolve(&quot;ok&quot;), 50));
Promise.resolve(inner).then((v) =&gt; console.log(v)); // &quot;ok&quot;
</code></pre></div><h3 id="_2-3-promise-reject-e-直接创建-rejected" tabindex="-1">2.3 <code>Promise.reject(e)</code>：直接创建 rejected <a class="header-anchor" href="#_2-3-promise-reject-e-直接创建-rejected" aria-label="Permalink to &quot;2.3 \`Promise.reject(e)\`：直接创建 rejected&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.reject(&quot;bad&quot;).catch((e) =&gt; console.log(&quot;caught:&quot;, e)); // &quot;bad&quot;
</code></pre></div><blockquote><p>实战中更推荐 <code>Promise.reject(new Error(&quot;bad&quot;))</code>，便于堆栈与定位。</p></blockquote><h2 id="_3-then-链式组合的核心" tabindex="-1">3. <code>then</code>：链式组合的核心 <a class="header-anchor" href="#_3-then-链式组合的核心" aria-label="Permalink to &quot;3. \`then\`：链式组合的核心&quot;">​</a></h2><h3 id="_3-1-then-会返回一个-新的-promise" tabindex="-1">3.1 <code>then</code> 会返回一个“新的 Promise” <a class="header-anchor" href="#_3-1-then-会返回一个-新的-promise" aria-label="Permalink to &quot;3.1 \`then\` 会返回一个“新的 Promise”&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(1)
  .then((v) =&gt; v + 1)
  .then((v) =&gt; v * 10)
  .then((v) =&gt; console.log(v)); // 20
</code></pre></div><h3 id="_3-2-then-的回调里-return-promise-会被-展开" tabindex="-1">3.2 <code>then</code> 的回调里 <strong>return Promise</strong> 会被“展开” <a class="header-anchor" href="#_3-2-then-的回调里-return-promise-会被-展开" aria-label="Permalink to &quot;3.2 \`then\` 的回调里 **return Promise** 会被“展开”&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(&quot;A&quot;)
  .then((v) =&gt; Promise.resolve(v + &quot;B&quot;))
  .then((v) =&gt; console.log(v)); // &quot;AB&quot;
</code></pre></div><h3 id="_3-3-then-里抛异常-会变成-rejected" tabindex="-1">3.3 <code>then</code> 里抛异常，会变成 rejected <a class="header-anchor" href="#_3-3-then-里抛异常-会变成-rejected" aria-label="Permalink to &quot;3.3 \`then\` 里抛异常，会变成 rejected&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(1)
  .then(() =&gt; {
    throw new Error(&quot;oops&quot;);
  })
  .catch((e) =&gt; console.log(&quot;caught:&quot;, e.message)); // &quot;oops&quot;
</code></pre></div><h3 id="_3-4-then-onfulfilled-onrejected-不推荐的-二参写法" tabindex="-1">3.4 <code>then(onFulfilled, onRejected)</code>：不推荐的“二参写法” <a class="header-anchor" href="#_3-4-then-onfulfilled-onrejected-不推荐的-二参写法" aria-label="Permalink to &quot;3.4 \`then(onFulfilled, onRejected)\`：不推荐的“二参写法”&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.reject(new Error(&quot;fail&quot;))
  .then(
    () =&gt; &quot;never&quot;,
    (e) =&gt; &quot;recovered: &quot; + e.message
  )
  .then((v) =&gt; console.log(v)); // &quot;recovered: fail&quot;
</code></pre></div><blockquote><p>更推荐 <code>.catch(...)</code>，可读性更好且不容易漏掉后续链路的异常。</p></blockquote><h2 id="_4-catch-失败分支-也是恢复点" tabindex="-1">4. <code>catch</code>：失败分支（也是恢复点） <a class="header-anchor" href="#_4-catch-失败分支-也是恢复点" aria-label="Permalink to &quot;4. \`catch\`：失败分支（也是恢复点）&quot;">​</a></h2><h3 id="_4-1-等价-catch-fn-≈-then-undefined-fn" tabindex="-1">4.1 等价：<code>catch(fn)</code> ≈ <code>then(undefined, fn)</code> <a class="header-anchor" href="#_4-1-等价-catch-fn-≈-then-undefined-fn" aria-label="Permalink to &quot;4.1 等价：\`catch(fn)\` ≈ \`then(undefined, fn)\`&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.reject(&quot;x&quot;)
  .catch((e) =&gt; {
    console.log(&quot;catch:&quot;, e);
    return &quot;recover&quot;;
  })
  .then((v) =&gt; console.log(&quot;after:&quot;, v)); // &quot;recover&quot;
</code></pre></div><h3 id="_4-2-catch-里再抛出-会继续-rejected" tabindex="-1">4.2 catch 里再抛出，会继续 rejected <a class="header-anchor" href="#_4-2-catch-里再抛出-会继续-rejected" aria-label="Permalink to &quot;4.2 catch 里再抛出，会继续 rejected&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.reject(&quot;x&quot;)
  .catch(() =&gt; {
    throw new Error(&quot;still bad&quot;);
  })
  .catch((e) =&gt; console.log(e.message)); // &quot;still bad&quot;
</code></pre></div><h2 id="_5-finally-清理资源-不改结果-除非你在-finally-里出错" tabindex="-1">5. <code>finally</code>：清理资源（不改结果，除非你在 finally 里出错） <a class="header-anchor" href="#_5-finally-清理资源-不改结果-除非你在-finally-里出错" aria-label="Permalink to &quot;5. \`finally\`：清理资源（不改结果，除非你在 finally 里出错）&quot;">​</a></h2><h3 id="_5-1-finally-不改变-value-error" tabindex="-1">5.1 finally 不改变 value / error <a class="header-anchor" href="#_5-1-finally-不改变-value-error" aria-label="Permalink to &quot;5.1 finally 不改变 value / error&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(&quot;ok&quot;)
  .finally(() =&gt; console.log(&quot;cleanup&quot;))
  .then((v) =&gt; console.log(&quot;value:&quot;, v));
</code></pre></div><h3 id="_5-2-finally-自己抛错-返回-rejected-会覆盖原结果" tabindex="-1">5.2 finally 自己抛错/返回 rejected，会覆盖原结果 <a class="header-anchor" href="#_5-2-finally-自己抛错-返回-rejected-会覆盖原结果" aria-label="Permalink to &quot;5.2 finally 自己抛错/返回 rejected，会覆盖原结果&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(&quot;ok&quot;)
  .finally(() =&gt; {
    throw new Error(&quot;cleanup failed&quot;);
  })
  .then(console.log)
  .catch((e) =&gt; console.log(e.message)); // &quot;cleanup failed&quot;
</code></pre></div><h2 id="_6-async-await-promise-的语法糖" tabindex="-1">6. <code>async/await</code>：Promise 的语法糖 <a class="header-anchor" href="#_6-async-await-promise-的语法糖" aria-label="Permalink to &quot;6. \`async/await\`：Promise 的语法糖&quot;">​</a></h2><h3 id="_6-1-await-到-rejected-会抛异常" tabindex="-1">6.1 <code>await</code> 到 rejected 会抛异常 <a class="header-anchor" href="#_6-1-await-到-rejected-会抛异常" aria-label="Permalink to &quot;6.1 \`await\` 到 rejected 会抛异常&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">async function main() {
  try {
    await Promise.reject(new Error(&quot;boom&quot;));
  } catch (e) {
    console.log(&quot;caught&quot;);
  }
}
main();
</code></pre></div><h3 id="_6-2-并发-不要把并发写成串行" tabindex="-1">6.2 并发：不要把并发写成串行 <a class="header-anchor" href="#_6-2-并发-不要把并发写成串行" aria-label="Permalink to &quot;6.2 并发：不要把并发写成串行&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// 串行（慢）：等 A 完成才开始 B
async function serial() {
  const a = await fetch(&quot;/a&quot;); // 例子：浏览器里
  const b = await fetch(&quot;/b&quot;);
  return [a, b];
}

// 并发（快）：先同时发出去，再一起 await
async function parallel() {
  const pa = fetch(&quot;/a&quot;);
  const pb = fetch(&quot;/b&quot;);
  return await Promise.all([pa, pb]);
}
</code></pre></div><h3 id="_6-3-什么时候用-then-什么时候用-async-await" tabindex="-1">6.3 什么时候用 <code>.then()</code>，什么时候用 <code>async/await</code> <a class="header-anchor" href="#_6-3-什么时候用-then-什么时候用-async-await" aria-label="Permalink to &quot;6.3 什么时候用 \`.then()\`，什么时候用 \`async/await\`&quot;">​</a></h3><p>经验法则：<strong>写“控制流”用 <code>async/await</code>，写“流水线/组合”用 <code>.then()</code></strong>。</p><p>更适合用 <code>async/await</code> 的场景：</p><ul><li><strong>多步顺序逻辑</strong>：中间要 <code>return/continue/break</code>、条件分支很多</li><li><strong>需要 <code>try/catch/finally</code></strong>：错误处理、资源清理更直观</li><li><strong>循环里要 await</strong>：比如按顺序重试、分页拉取（注意并发场景要用 <code>Promise.all</code>）</li></ul><p>更适合用 <code>.then()</code> 的场景：</p><ul><li><strong>简单的一两步转换</strong>：不想为了 <code>await</code> 再包一层 <code>async function</code></li><li><strong>函数式/管道式组合</strong>：<code>then</code> 链清晰表达“输入 → 输出”的变换</li><li><strong>库/工具函数返回 Promise 链</strong>：避免在内部引入 <code>try/catch</code> 风格（由调用方决定怎么处理）</li></ul><p>对照例子（同样的语义，两种写法都可以）：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// then：更像“流水线”
function loadUserThen(id: string) {
  return fetch(\`/users/\${id}\`)
    .then((r) =&gt; {
      if (!r.ok) throw new Error(&quot;bad response&quot;);
      return r.json() as Promise&lt;{ name: string }&gt;;
    })
    .then((u) =&gt; u.name);
}

// async/await：更像“控制流”
async function loadUserAwait(id: string) {
  const r = await fetch(\`/users/\${id}\`);
  if (!r.ok) throw new Error(&quot;bad response&quot;);
  const u = (await r.json()) as { name: string };
  return u.name;
}
</code></pre></div><h2 id="_7-组合方法-all-allsettled-race-any" tabindex="-1">7. 组合方法（all / allSettled / race / any） <a class="header-anchor" href="#_7-组合方法-all-allsettled-race-any" aria-label="Permalink to &quot;7. 组合方法（all / allSettled / race / any）&quot;">​</a></h2><p>为了让示例可运行，先定义一个工具函数：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">function sleep(ms: number) {
  return new Promise&lt;void&gt;((r) =&gt; setTimeout(r, ms));
}
</code></pre></div><h3 id="_7-1-promise-all-全成功才成功-遇到失败会短路" tabindex="-1">7.1 <code>Promise.all</code>：全成功才成功（遇到失败会短路） <a class="header-anchor" href="#_7-1-promise-all-全成功才成功-遇到失败会短路" aria-label="Permalink to &quot;7.1 \`Promise.all\`：全成功才成功（遇到失败会短路）&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">async function demoAll() {
  const p1 = sleep(50).then(() =&gt; &quot;A&quot;);
  const p2 = sleep(80).then(() =&gt; &quot;B&quot;);
  const out = await Promise.all([p1, p2]);
  console.log(out); // [&quot;A&quot;, &quot;B&quot;]
}

demoAll();
</code></pre></div><p>失败短路：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.all([Promise.resolve(1), Promise.reject(&quot;x&quot;), Promise.resolve(3)])
  .then(console.log)
  .catch((e) =&gt; console.log(&quot;all failed:&quot;, e)); // &quot;x&quot;
</code></pre></div><blockquote><p>注意：短路只是让 <code>Promise.all</code> 自己失败；其它 Promise 可能仍在执行（比如请求已经发出）。</p></blockquote><h3 id="_7-2-promise-allsettled-全完成再汇总-不短路" tabindex="-1">7.2 <code>Promise.allSettled</code>：全完成再汇总（不短路） <a class="header-anchor" href="#_7-2-promise-allsettled-全完成再汇总-不短路" aria-label="Permalink to &quot;7.2 \`Promise.allSettled\`：全完成再汇总（不短路）&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.allSettled([Promise.resolve(&quot;ok&quot;), Promise.reject(&quot;bad&quot;)]).then(
  (res) =&gt; console.log(res)
  // [
  //   { status: &quot;fulfilled&quot;, value: &quot;ok&quot; },
  //   { status: &quot;rejected&quot;, reason: &quot;bad&quot; }
  // ]
);
</code></pre></div><h3 id="_7-3-promise-race-谁先完成就用谁-成功-失败都算" tabindex="-1">7.3 <code>Promise.race</code>：谁先完成就用谁（成功/失败都算） <a class="header-anchor" href="#_7-3-promise-race-谁先完成就用谁-成功-失败都算" aria-label="Permalink to &quot;7.3 \`Promise.race\`：谁先完成就用谁（成功/失败都算）&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.race([sleep(30).then(() =&gt; &quot;fast&quot;), sleep(100).then(() =&gt; &quot;slow&quot;)]).then(
  console.log
); // &quot;fast&quot;
</code></pre></div><h3 id="_7-4-promise-any-谁先成功就用谁-全失败才失败" tabindex="-1">7.4 <code>Promise.any</code>：谁先成功就用谁（全失败才失败） <a class="header-anchor" href="#_7-4-promise-any-谁先成功就用谁-全失败才失败" aria-label="Permalink to &quot;7.4 \`Promise.any\`：谁先成功就用谁（全失败才失败）&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.any([Promise.reject(&quot;a&quot;), sleep(50).then(() =&gt; &quot;ok&quot;)]).then(console.log); // &quot;ok&quot;

Promise.any([Promise.reject(&quot;a&quot;), Promise.reject(&quot;b&quot;)])
  .then(console.log)
  .catch((e) =&gt; {
    console.log(e.name); // &quot;AggregateError&quot;
    console.log(e.errors); // [&quot;a&quot;, &quot;b&quot;] (实现可能略有差异)
  });
</code></pre></div><h2 id="_8-常见模式-超时控制-race-timeout" tabindex="-1">8. 常见模式：超时控制（race + timeout） <a class="header-anchor" href="#_8-常见模式-超时控制-race-timeout" aria-label="Permalink to &quot;8. 常见模式：超时控制（race + timeout）&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">function withTimeout&lt;T&gt;(p: Promise&lt;T&gt;, ms: number) {
  const timeout = new Promise&lt;T&gt;((_, reject) =&gt; {
    setTimeout(() =&gt; reject(new Error(\`Timeout after \${ms}ms\`)), ms);
  });
  return Promise.race([p, timeout]);
}

withTimeout(sleep(200).then(() =&gt; &quot;ok&quot;), 100).then(console.log).catch((e) =&gt; {
  console.log(e.message); // Timeout after 100ms
});
</code></pre></div><h2 id="_9-未捕获错误的排查-unhandledrejection" tabindex="-1">9. 未捕获错误的排查（unhandledrejection） <a class="header-anchor" href="#_9-未捕获错误的排查-unhandledrejection" aria-label="Permalink to &quot;9. 未捕获错误的排查（unhandledrejection）&quot;">​</a></h2><h3 id="_9-1-浏览器" tabindex="-1">9.1 浏览器 <a class="header-anchor" href="#_9-1-浏览器" aria-label="Permalink to &quot;9.1 浏览器&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">window.addEventListener(&quot;unhandledrejection&quot;, (event) =&gt; {
  console.log(&quot;unhandledrejection:&quot;, event.reason);
});

Promise.reject(&quot;oops&quot;); // 没有 catch，会触发
</code></pre></div><h3 id="_9-2-node-js" tabindex="-1">9.2 Node.js <a class="header-anchor" href="#_9-2-node-js" aria-label="Permalink to &quot;9.2 Node.js&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">process.on(&quot;unhandledRejection&quot;, (reason) =&gt; {
  console.log(&quot;unhandledRejection:&quot;, reason);
});

Promise.reject(&quot;oops&quot;);
</code></pre></div><h2 id="并发控制-任务池-最多同时执行-limit-个" tabindex="-1">并发控制：任务池（最多同时执行 limit 个） <a class="header-anchor" href="#并发控制-任务池-最多同时执行-limit-个" aria-label="Permalink to &quot;并发控制：任务池（最多同时执行 limit 个）&quot;">​</a></h2><p>核心思路：维护一个 <code>queue</code>（待执行任务）和一个 <code>running</code>（当前运行数）。</p><ul><li>只要 <code>running &lt; limit</code> 就从队列里取任务启动</li><li><strong>谁先结束，谁触发补位</strong>（在 <code>finally</code> 里 <code>running--</code> 然后 <code>runNext()</code>）</li><li>关键点：传入 <strong>任务函数</strong> <code>() =&gt; Promise</code>，不要传已经启动的 <code>Promise</code></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">function runPool(tasks, limit = 4) {
  let running = 0;
  let queue = [...tasks];

  return new Promise((resolve) =&gt; {
    function runNext() {
      if (queue.length === 0 &amp;&amp; running === 0) {
        resolve();
        return;
      }

      while (running &lt; limit &amp;&amp; queue.length &gt; 0) {
        const task = queue.shift();
        running++;

        Promise.resolve()
          .then(task) // 统一同步/异步：同步 throw 也会变成 rejected
          .catch(() =&gt; {}) // 避免未处理 rejected（可改成错误收集/上报）
          .finally(() =&gt; {
            running--;
            runNext(); // ⭐ 谁先结束，谁触发补位
          });
      }
    }

    runNext();
  });
}
</code></pre></div><p>注意：</p><ul><li>这个版本的 <code>runPool</code> <strong>只 resolve，不 reject</strong>：某个 task 失败不会让 <code>runPool</code> 自己失败（任务失败需要你在 task 内部自行处理/上报）。</li><li>如果你希望 “一旦某个 task 失败就让整体失败 / 或汇总 allSettled 结果”，可以在这个骨架上加 <code>reject</code> 或结果收集（会稍微复杂一点）。</li><li>这个版本适合“一次性提交一个任务列表”；如果你要“运行过程中继续追加任务”，需要一个长期存在的全局队列（并提供 close/onIdle 之类信号），实现会更复杂。</li></ul><h3 id="可动态追加任务的版本-taskpool-add-close-done" tabindex="-1">可动态追加任务的版本：<code>TaskPool</code>（<code>add</code> / <code>close</code> / <code>done</code>） <a class="header-anchor" href="#可动态追加任务的版本-taskpool-add-close-done" aria-label="Permalink to &quot;可动态追加任务的版本：\`TaskPool\`（\`add\` / \`close\` / \`done\`）&quot;">​</a></h3><p>如果你要“不断追加任务”，可以把队列做成一个长期存活的对象：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">class TaskPool {
  constructor(limit = 4) {
    this.limit = limit;
    this.running = 0;
    this.queue = [];
    this.closed = false;

    this._resolve = null;
    this.done = new Promise((res) =&gt; (this._resolve = res));
  }

  add(task) {
    if (this.closed) {
      throw new Error(&quot;TaskPool is closed&quot;);
    }

    this.queue.push(task);
    this._runNext(); // ⭐ 关键：追加时立刻尝试调度
  }

  _runNext() {
    while (this.running &lt; this.limit &amp;&amp; this.queue.length &gt; 0) {
      const task = this.queue.shift();
      this.running++;

      Promise.resolve()
        .then(task)
        .catch(() =&gt; {}) // 可改成错误收集
        .finally(() =&gt; {
          this.running--;
          this._runNext();

          // 👇 只有明确 close 后，才允许完成
          if (this.closed &amp;&amp; this.running === 0 &amp;&amp; this.queue.length === 0) {
            this._resolve();
          }
        });
    }
  }

  close() {
    this.closed = true;

    // 如果此刻已经空了，立即完成
    if (this.running === 0 &amp;&amp; this.queue.length === 0) {
      this._resolve();
    }
  }
}
</code></pre></div><h2 id="结论-什么时候用-promise-什么时候别用" tabindex="-1">结论：什么时候用 Promise（什么时候别用） <a class="header-anchor" href="#结论-什么时候用-promise-什么时候别用" aria-label="Permalink to &quot;结论：什么时候用 Promise（什么时候别用）&quot;">​</a></h2><ul><li><strong>I/O 编排</strong>：Promise 非常适合（请求、读写、定时器、事件）</li><li><strong>CPU 密集</strong>：Promise 不能解决卡顿，需要 Worker/多线程（见 <code>workers.md</code> / <code>js-multithreading.md</code>）</li></ul>`,82)]))}const g=o(s,[["render",l]]);export{h as __pageData,g as default};
