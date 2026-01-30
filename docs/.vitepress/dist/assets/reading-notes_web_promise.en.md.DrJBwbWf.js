import{_ as o,c as t,o as a,ag as n}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"Promise: APIs, patterns, error handling, and concurrency limit (English)","description":"","frontmatter":{},"headers":[],"relativePath":"reading-notes/web/promise.en.md","filePath":"reading-notes/web/promise.en.md"}'),s={name:"reading-notes/web/promise.en.md"};function l(r,e,i,c,d,u){return a(),t("div",null,e[0]||(e[0]=[n(`<h1 id="promise-apis-patterns-error-handling-and-concurrency-limit-english" tabindex="-1">Promise: APIs, patterns, error handling, and concurrency limit (English) <a class="header-anchor" href="#promise-apis-patterns-error-handling-and-concurrency-limit-english" aria-label="Permalink to &quot;Promise: APIs, patterns, error handling, and concurrency limit (English)&quot;">​</a></h1><p><a href="/reading-notes/web/promise.html">中文</a></p><h2 id="_0-the-right-mental-model" tabindex="-1">0. The right mental model <a class="header-anchor" href="#_0-the-right-mental-model" aria-label="Permalink to &quot;0. The right mental model&quot;">​</a></h2><ul><li>A Promise is a container for a <strong>future value</strong>: fulfilled or rejected.</li><li>A Promise is <strong>not</strong> “parallelism”. Concurrency comes from starting multiple async operations (often I/O), not from Promise creating threads.</li><li>State is one-way: <code>pending</code> → <code>fulfilled</code> / <code>rejected</code>.</li></ul><h2 id="_1-new-promise-resolve-reject" tabindex="-1">1. <code>new Promise((resolve, reject) =&gt; {})</code> <a class="header-anchor" href="#_1-new-promise-resolve-reject" aria-label="Permalink to &quot;1. \`new Promise((resolve, reject) =&gt; {})\`&quot;">​</a></h2><h3 id="_1-1-basic-usage" tabindex="-1">1.1 Basic usage <a class="header-anchor" href="#_1-1-basic-usage" aria-label="Permalink to &quot;1.1 Basic usage&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">const p = new Promise&lt;number&gt;((resolve, reject) =&gt; {
  setTimeout(() =&gt; resolve(42), 100);
  // reject(new Error(&quot;boom&quot;));
});

p.then((v) =&gt; console.log(&quot;value:&quot;, v)).catch((e) =&gt; console.error(&quot;err:&quot;, e));
</code></pre></div><h3 id="_1-2-prefer-rejecting-with-error" tabindex="-1">1.2 Prefer rejecting with <code>Error</code> <a class="header-anchor" href="#_1-2-prefer-rejecting-with-error" aria-label="Permalink to &quot;1.2 Prefer rejecting with \`Error\`&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.reject(new Error(&quot;network failed&quot;))
  .catch((e) =&gt; {
    console.log(e instanceof Error); // true
    console.log(e.message); // &quot;network failed&quot;
  });
</code></pre></div><h2 id="_2-promise-resolve-promise-reject" tabindex="-1">2. <code>Promise.resolve</code> / <code>Promise.reject</code> <a class="header-anchor" href="#_2-promise-resolve-promise-reject" aria-label="Permalink to &quot;2. \`Promise.resolve\` / \`Promise.reject\`&quot;">​</a></h2><h3 id="_2-1-promise-resolve-x-turns-a-value-into-a-fulfilled-promise" tabindex="-1">2.1 <code>Promise.resolve(x)</code> turns a value into a fulfilled Promise <a class="header-anchor" href="#_2-1-promise-resolve-x-turns-a-value-into-a-fulfilled-promise" aria-label="Permalink to &quot;2.1 \`Promise.resolve(x)\` turns a value into a fulfilled Promise&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(123).then((v) =&gt; console.log(v)); // 123
</code></pre></div><h3 id="_2-2-promise-adoption-it-follows-an-existing-promise" tabindex="-1">2.2 Promise “adoption”: it follows an existing Promise <a class="header-anchor" href="#_2-2-promise-adoption-it-follows-an-existing-promise" aria-label="Permalink to &quot;2.2 Promise “adoption”: it follows an existing Promise&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">const inner = new Promise&lt;string&gt;((resolve) =&gt; setTimeout(() =&gt; resolve(&quot;ok&quot;), 50));
Promise.resolve(inner).then((v) =&gt; console.log(v)); // &quot;ok&quot;
</code></pre></div><h3 id="_2-3-promise-reject-e-creates-a-rejected-promise" tabindex="-1">2.3 <code>Promise.reject(e)</code> creates a rejected Promise <a class="header-anchor" href="#_2-3-promise-reject-e-creates-a-rejected-promise" aria-label="Permalink to &quot;2.3 \`Promise.reject(e)\` creates a rejected Promise&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.reject(&quot;bad&quot;).catch((e) =&gt; console.log(&quot;caught:&quot;, e)); // &quot;bad&quot;
</code></pre></div><h2 id="_3-then-chaining-and-composition" tabindex="-1">3. <code>then</code>: chaining and composition <a class="header-anchor" href="#_3-then-chaining-and-composition" aria-label="Permalink to &quot;3. \`then\`: chaining and composition&quot;">​</a></h2><h3 id="_3-1-then-returns-a-new-promise" tabindex="-1">3.1 <code>then</code> returns a new Promise <a class="header-anchor" href="#_3-1-then-returns-a-new-promise" aria-label="Permalink to &quot;3.1 \`then\` returns a new Promise&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(1)
  .then((v) =&gt; v + 1)
  .then((v) =&gt; v * 10)
  .then((v) =&gt; console.log(v)); // 20
</code></pre></div><h3 id="_3-2-returning-a-promise-is-automatically-unwrapped" tabindex="-1">3.2 Returning a Promise is automatically unwrapped <a class="header-anchor" href="#_3-2-returning-a-promise-is-automatically-unwrapped" aria-label="Permalink to &quot;3.2 Returning a Promise is automatically unwrapped&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(&quot;A&quot;)
  .then((v) =&gt; Promise.resolve(v + &quot;B&quot;))
  .then((v) =&gt; console.log(v)); // &quot;AB&quot;
</code></pre></div><h3 id="_3-3-throwing-inside-then-turns-the-chain-into-rejected" tabindex="-1">3.3 Throwing inside <code>then</code> turns the chain into rejected <a class="header-anchor" href="#_3-3-throwing-inside-then-turns-the-chain-into-rejected" aria-label="Permalink to &quot;3.3 Throwing inside \`then\` turns the chain into rejected&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(1)
  .then(() =&gt; {
    throw new Error(&quot;oops&quot;);
  })
  .catch((e) =&gt; console.log(&quot;caught:&quot;, e.message)); // &quot;oops&quot;
</code></pre></div><h2 id="_4-catch-error-branch-also-a-recovery-point" tabindex="-1">4. <code>catch</code>: error branch (also a recovery point) <a class="header-anchor" href="#_4-catch-error-branch-also-a-recovery-point" aria-label="Permalink to &quot;4. \`catch\`: error branch (also a recovery point)&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.reject(&quot;x&quot;)
  .catch((e) =&gt; {
    console.log(&quot;catch:&quot;, e);
    return &quot;recover&quot;;
  })
  .then((v) =&gt; console.log(&quot;after:&quot;, v)); // &quot;recover&quot;
</code></pre></div><h2 id="_5-finally-cleanup-doesn-t-change-outcome-unless-it-fails" tabindex="-1">5. <code>finally</code>: cleanup (doesn’t change outcome unless it fails) <a class="header-anchor" href="#_5-finally-cleanup-doesn-t-change-outcome-unless-it-fails" aria-label="Permalink to &quot;5. \`finally\`: cleanup (doesn’t change outcome unless it fails)&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(&quot;ok&quot;)
  .finally(() =&gt; console.log(&quot;cleanup&quot;))
  .then((v) =&gt; console.log(&quot;value:&quot;, v));
</code></pre></div><p>If <code>finally</code> throws, it overrides the original result:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.resolve(&quot;ok&quot;)
  .finally(() =&gt; {
    throw new Error(&quot;cleanup failed&quot;);
  })
  .then(console.log)
  .catch((e) =&gt; console.log(e.message)); // &quot;cleanup failed&quot;
</code></pre></div><h2 id="_6-async-await" tabindex="-1">6. <code>async/await</code> <a class="header-anchor" href="#_6-async-await" aria-label="Permalink to &quot;6. \`async/await\`&quot;">​</a></h2><p>Rejected Promises throw at <code>await</code>:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">async function main() {
  try {
    await Promise.reject(new Error(&quot;boom&quot;));
  } catch (e) {
    console.log(&quot;caught&quot;);
  }
}
main();
</code></pre></div><p>Concurrency: avoid writing parallel work as serial:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">async function parallel() {
  const pa = fetch(&quot;/a&quot;);
  const pb = fetch(&quot;/b&quot;);
  return await Promise.all([pa, pb]);
}
</code></pre></div><h3 id="_6-3-when-to-use-then-vs-async-await" tabindex="-1">6.3 When to use <code>.then()</code> vs <code>async/await</code> <a class="header-anchor" href="#_6-3-when-to-use-then-vs-async-await" aria-label="Permalink to &quot;6.3 When to use \`.then()\` vs \`async/await\`&quot;">​</a></h3><p>Rule of thumb: use <strong><code>async/await</code> for control flow</strong>, and <strong><code>.then()</code> for pipelines/composition</strong>.</p><p>Prefer <code>async/await</code> when:</p><ul><li><strong>Multi-step sequential logic</strong> with lots of branching / early returns</li><li>You want <strong><code>try/catch/finally</code></strong> to read like normal synchronous code</li><li>You need to <strong><code>await</code> inside loops</strong> (for true parallelism, still use <code>Promise.all</code>)</li></ul><p>Prefer <code>.then()</code> when:</p><ul><li>It’s a <strong>small one- or two-step transformation</strong> and you don’t want to wrap another <code>async</code> function</li><li>You like a <strong>pipeline style</strong>: “input → output” transformations</li><li>You’re writing a <strong>utility/library</strong> that naturally returns a Promise chain (callers decide how to handle errors)</li></ul><p>Same logic, two styles:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">// then: pipeline style
function loadUserThen(id: string) {
  return fetch(\`/users/\${id}\`)
    .then((r) =&gt; {
      if (!r.ok) throw new Error(&quot;bad response&quot;);
      return r.json() as Promise&lt;{ name: string }&gt;;
    })
    .then((u) =&gt; u.name);
}

// async/await: control-flow style
async function loadUserAwait(id: string) {
  const r = await fetch(\`/users/\${id}\`);
  if (!r.ok) throw new Error(&quot;bad response&quot;);
  const u = (await r.json()) as { name: string };
  return u.name;
}
</code></pre></div><h2 id="_7-combinators-all-allsettled-race-any" tabindex="-1">7. Combinators: <code>all / allSettled / race / any</code> <a class="header-anchor" href="#_7-combinators-all-allsettled-race-any" aria-label="Permalink to &quot;7. Combinators: \`all / allSettled / race / any\`&quot;">​</a></h2><p>Helper:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">function sleep(ms: number) {
  return new Promise&lt;void&gt;((r) =&gt; setTimeout(r, ms));
}
</code></pre></div><h3 id="_7-1-promise-all" tabindex="-1">7.1 <code>Promise.all</code> <a class="header-anchor" href="#_7-1-promise-all" aria-label="Permalink to &quot;7.1 \`Promise.all\`&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">async function demoAll() {
  const p1 = sleep(50).then(() =&gt; &quot;A&quot;);
  const p2 = sleep(80).then(() =&gt; &quot;B&quot;);
  const out = await Promise.all([p1, p2]);
  console.log(out); // [&quot;A&quot;, &quot;B&quot;]
}
demoAll();
</code></pre></div><p>Short-circuit on failure:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.all([Promise.resolve(1), Promise.reject(&quot;x&quot;), Promise.resolve(3)])
  .then(console.log)
  .catch((e) =&gt; console.log(&quot;all failed:&quot;, e)); // &quot;x&quot;
</code></pre></div><h3 id="_7-2-promise-allsettled" tabindex="-1">7.2 <code>Promise.allSettled</code> <a class="header-anchor" href="#_7-2-promise-allsettled" aria-label="Permalink to &quot;7.2 \`Promise.allSettled\`&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.allSettled([Promise.resolve(&quot;ok&quot;), Promise.reject(&quot;bad&quot;)]).then(
  (res) =&gt; console.log(res)
);
</code></pre></div><h3 id="_7-3-promise-race" tabindex="-1">7.3 <code>Promise.race</code> <a class="header-anchor" href="#_7-3-promise-race" aria-label="Permalink to &quot;7.3 \`Promise.race\`&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.race([sleep(30).then(() =&gt; &quot;fast&quot;), sleep(100).then(() =&gt; &quot;slow&quot;)]).then(
  console.log
); // &quot;fast&quot;
</code></pre></div><h3 id="_7-4-promise-any" tabindex="-1">7.4 <code>Promise.any</code> <a class="header-anchor" href="#_7-4-promise-any" aria-label="Permalink to &quot;7.4 \`Promise.any\`&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.any([Promise.reject(&quot;a&quot;), sleep(50).then(() =&gt; &quot;ok&quot;)]).then(console.log); // &quot;ok&quot;
</code></pre></div><p>All fail:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">Promise.any([Promise.reject(&quot;a&quot;), Promise.reject(&quot;b&quot;)])
  .then(console.log)
  .catch((e) =&gt; {
    console.log(e.name); // &quot;AggregateError&quot;
    console.log(e.errors); // [&quot;a&quot;, &quot;b&quot;] (implementation may vary)
  });
</code></pre></div><h2 id="_8-pattern-timeout-race-timeout" tabindex="-1">8. Pattern: timeout (<code>race + timeout</code>) <a class="header-anchor" href="#_8-pattern-timeout-race-timeout" aria-label="Permalink to &quot;8. Pattern: timeout (\`race + timeout\`)&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">function withTimeout&lt;T&gt;(p: Promise&lt;T&gt;, ms: number) {
  const timeout = new Promise&lt;T&gt;((_, reject) =&gt; {
    setTimeout(() =&gt; reject(new Error(\`Timeout after \${ms}ms\`)), ms);
  });
  return Promise.race([p, timeout]);
}

withTimeout(sleep(200).then(() =&gt; &quot;ok&quot;), 100).catch((e) =&gt; console.log(e.message));
</code></pre></div><h2 id="_9-debugging-unhandledrejection" tabindex="-1">9. Debugging: <code>unhandledrejection</code> <a class="header-anchor" href="#_9-debugging-unhandledrejection" aria-label="Permalink to &quot;9. Debugging: \`unhandledrejection\`&quot;">​</a></h2><p>Browser:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">window.addEventListener(&quot;unhandledrejection&quot;, (event) =&gt; {
  console.log(&quot;unhandledrejection:&quot;, event.reason);
});
Promise.reject(&quot;oops&quot;);
</code></pre></div><p>Node:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="vp-code"><code class="language-ts">process.on(&quot;unhandledRejection&quot;, (reason) =&gt; {
  console.log(&quot;unhandledRejection:&quot;, reason);
});
Promise.reject(&quot;oops&quot;);
</code></pre></div><h2 id="concurrency-control-a-simple-task-pool-max-limit-concurrent" tabindex="-1">Concurrency control: a simple task pool (max <code>limit</code> concurrent) <a class="header-anchor" href="#concurrency-control-a-simple-task-pool-max-limit-concurrent" aria-label="Permalink to &quot;Concurrency control: a simple task pool (max \`limit\` concurrent)&quot;">​</a></h2><p>Core idea: maintain a <code>queue</code> of pending tasks and a <code>running</code> counter.</p><ul><li>Start tasks while <code>running &lt; limit</code></li><li>When any task finishes, it frees a slot and triggers a refill (<code>finally</code> → <code>running--</code> → <code>runNext()</code>)</li><li>Key point: pass <strong>task functions</strong> <code>() =&gt; Promise</code>, not already-started Promises</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">function runPool(tasks, limit = 4) {
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
          .then(task) // normalize sync/async: sync throws become rejected
          .catch(() =&gt; {}) // avoid unhandled rejections (or collect/report errors)
          .finally(() =&gt; {
            running--;
            runNext(); // ⭐ whoever finishes first refills the pool
          });
      }
    }

    runNext();
  });
}
</code></pre></div><p>Notes:</p><ul><li>This version <strong>only resolves and never rejects</strong>: a failed task won’t fail <code>runPool</code> itself (handle/report failures inside each task).</li><li>If you need “fail fast” or “allSettled-style results”, you can extend this skeleton with <code>reject</code> / result collection (a bit more code).</li><li>This version is best for submitting a fixed list of tasks. If you need to keep appending tasks while running, you’ll need a long-lived global queue (with an explicit close/onIdle signal), which is more involved.</li></ul><h3 id="dynamic-version-taskpool-add-close-done" tabindex="-1">Dynamic version: <code>TaskPool</code> (<code>add</code> / <code>close</code> / <code>done</code>) <a class="header-anchor" href="#dynamic-version-taskpool-add-close-done" aria-label="Permalink to &quot;Dynamic version: \`TaskPool\` (\`add\` / \`close\` / \`done\`)&quot;">​</a></h3><p>If tasks keep arriving over time, make the queue a long-lived object:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">class TaskPool {
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
    this._runNext(); // ⭐ key: schedule immediately on add
  }

  _runNext() {
    while (this.running &lt; this.limit &amp;&amp; this.queue.length &gt; 0) {
      const task = this.queue.shift();
      this.running++;

      Promise.resolve()
        .then(task)
        .catch(() =&gt; {}) // can be replaced with error collection
        .finally(() =&gt; {
          this.running--;
          this._runNext();

          // Only resolve after an explicit close
          if (this.closed &amp;&amp; this.running === 0 &amp;&amp; this.queue.length === 0) {
            this._resolve();
          }
        });
    }
  }

  close() {
    this.closed = true;

    // If already empty, resolve immediately
    if (this.running === 0 &amp;&amp; this.queue.length === 0) {
      this._resolve();
    }
  }
}
</code></pre></div>`,73)]))}const g=o(s,[["render",l]]);export{h as __pageData,g as default};
