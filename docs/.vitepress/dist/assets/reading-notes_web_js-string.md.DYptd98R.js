import{_ as e,c as o,o as a,ag as c}from"./chunks/framework.Bw-5EFTY.js";const p=JSON.parse('{"title":"JavaScript 字符串：常用方法与操作整理（中文）","description":"","frontmatter":{},"headers":[],"relativePath":"reading-notes/web/js-string.md","filePath":"reading-notes/web/js-string.md"}'),d={name:"reading-notes/web/js-string.md"};function s(u,t,n,l,r,i){return a(),o("div",null,t[0]||(t[0]=[c(`<h1 id="javascript-字符串-常用方法与操作整理-中文" tabindex="-1">JavaScript 字符串：常用方法与操作整理（中文） <a class="header-anchor" href="#javascript-字符串-常用方法与操作整理-中文" aria-label="Permalink to &quot;JavaScript 字符串：常用方法与操作整理（中文）&quot;">​</a></h1><p><a href="/reading-notes/web/js-string.en.html">English</a></p><p>本篇整理 JS 字符串的常规用法、操作方法，以及一道综合题（句首大写 + 名字替换）。</p><h2 id="_0-先建立正确心智" tabindex="-1">0. 先建立正确心智 <a class="header-anchor" href="#_0-先建立正确心智" aria-label="Permalink to &quot;0. 先建立正确心智&quot;">​</a></h2><ul><li><strong>字符串是不可变的</strong>：所有“修改”操作都返回新字符串，不改变原串。</li><li><strong>索引从 0 开始</strong>：<code>str[0]</code>、<code>str.charAt(0)</code> 取第一个字符；负索引在部分方法里表示“从末尾数”（如 <code>slice(-1)</code>）。</li><li><strong>常用场景</strong>：截取、分割、替换、大小写、与正则配合做匹配/替换。</li></ul><h2 id="_1-属性与基础" tabindex="-1">1. 属性与基础 <a class="header-anchor" href="#_1-属性与基础" aria-label="Permalink to &quot;1. 属性与基础&quot;">​</a></h2><h3 id="_1-1-length、索引" tabindex="-1">1.1 <code>length</code>、索引 <a class="header-anchor" href="#_1-1-length、索引" aria-label="Permalink to &quot;1.1 \`length\`、索引&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">const s = &quot;hello&quot;;
s.length;        // 5
s[0];            // &quot;h&quot;
s.charAt(0);     // &quot;h&quot;
s[s.length - 1]; // &quot;o&quot;
</code></pre></div><h3 id="_1-2-遍历" tabindex="-1">1.2 遍历 <a class="header-anchor" href="#_1-2-遍历" aria-label="Permalink to &quot;1.2 遍历&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">for (const c of &quot;hi&quot;) console.log(c); // &quot;h&quot;, &quot;i&quot;
[...&quot;hi&quot;];  // [&quot;h&quot;, &quot;i&quot;]
</code></pre></div><h2 id="_2-常用方法速览" tabindex="-1">2. 常用方法速览 <a class="header-anchor" href="#_2-常用方法速览" aria-label="Permalink to &quot;2. 常用方法速览&quot;">​</a></h2><table tabindex="0"><thead><tr><th>方法</th><th>作用</th><th>示例</th></tr></thead><tbody><tr><td><code>slice(start, end?)</code></td><td>截取子串，支持负索引</td><td><code>&quot;abc&quot;.slice(1, -1)</code> → <code>&quot;b&quot;</code></td></tr><tr><td><code>substring(start, end?)</code></td><td>截取，负值当 0</td><td><code>&quot;abc&quot;.substring(1, 2)</code> → <code>&quot;b&quot;</code></td></tr><tr><td><code>split(sep?, limit?)</code></td><td>按分隔符拆成数组</td><td><code>&quot;a,b,c&quot;.split(&quot;,&quot;)</code> → <code>[&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]</code></td></tr><tr><td><code>trim()</code> / <code>trimStart()</code> / <code>trimEnd()</code></td><td>去首尾空白</td><td><code>&quot; hi &quot;.trim()</code> → <code>&quot;hi&quot;</code></td></tr><tr><td><code>toUpperCase()</code> / <code>toLowerCase()</code></td><td>全串大小写</td><td><code>&quot;Hi&quot;.toLowerCase()</code> → <code>&quot;hi&quot;</code></td></tr><tr><td><code>charAt(i)</code></td><td>取第 i 个字符</td><td><code>&quot;hi&quot;.charAt(1)</code> → <code>&quot;i&quot;</code></td></tr><tr><td><code>concat(...strs)</code></td><td>拼接（多用 <code>+</code> 或模板字符串）</td><td><code>&quot;a&quot;.concat(&quot;b&quot;)</code> → <code>&quot;ab&quot;</code></td></tr><tr><td><code>includes(sub)</code> / <code>startsWith(sub)</code> / <code>endsWith(sub)</code></td><td>是否包含/开头/结尾</td><td><code>&quot;hello&quot;.includes(&quot;ell&quot;)</code> → <code>true</code></td></tr><tr><td><code>indexOf(sub, from?)</code> / <code>lastIndexOf(sub, from?)</code></td><td>子串首次/末次下标</td><td><code>&quot;abca&quot;.indexOf(&quot;a&quot;, 1)</code> → <code>3</code></td></tr><tr><td><code>repeat(n)</code></td><td>重复 n 次</td><td><code>&quot;ab&quot;.repeat(2)</code> → <code>&quot;abab&quot;</code></td></tr><tr><td><code>padStart(len, pad)</code> / <code>padEnd(len, pad)</code></td><td>补足长度</td><td><code>&quot;5&quot;.padStart(3, &quot;0&quot;)</code> → <code>&quot;005&quot;</code></td></tr></tbody></table><h2 id="_3-替换与查找" tabindex="-1">3. 替换与查找 <a class="header-anchor" href="#_3-替换与查找" aria-label="Permalink to &quot;3. 替换与查找&quot;">​</a></h2><h3 id="_3-1-replace-searchvalue-replacement" tabindex="-1">3.1 <code>replace(searchValue, replacement)</code> <a class="header-anchor" href="#_3-1-replace-searchvalue-replacement" aria-label="Permalink to &quot;3.1 \`replace(searchValue, replacement)\`&quot;">​</a></h3><ul><li><strong>只替换第一个匹配</strong>（除非 <code>searchValue</code> 是带 <code>g</code> 的正则）。</li><li><code>replacement</code> 可以是字符串或函数：<code>(match, ...groups) =&gt; string</code>。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">&quot;a1b2&quot;.replace(/\\d/, &quot;x&quot;);     // &quot;axb2&quot;
&quot;a1b2&quot;.replace(/\\d/g, &quot;x&quot;);    // &quot;axbx&quot;
&quot;hello&quot;.replace(&quot;l&quot;, &quot;L&quot;);     // &quot;heLlo&quot;
&quot;hello&quot;.replace(/l/g, &quot;L&quot;);   // &quot;heLLo&quot;
</code></pre></div><h3 id="_3-2-replace-用函数做-按匹配替换" tabindex="-1">3.2 <code>replace</code> 用函数做“按匹配替换” <a class="header-anchor" href="#_3-2-replace-用函数做-按匹配替换" aria-label="Permalink to &quot;3.2 \`replace\` 用函数做“按匹配替换”&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">&quot;abc-123&quot;.replace(/([a-z]+)-(\\d+)/, (_, letters, digits) =&gt; digits + &quot;-&quot; + letters);
// &quot;123-abc&quot;
</code></pre></div><h3 id="_3-3-search-regexp-、match-regexp-、matchall-regexp" tabindex="-1">3.3 <code>search(regexp)</code>、<code>match(regexp)</code>、<code>matchAll(regexp)</code> <a class="header-anchor" href="#_3-3-search-regexp-、match-regexp-、matchall-regexp" aria-label="Permalink to &quot;3.3 \`search(regexp)\`、\`match(regexp)\`、\`matchAll(regexp)\`&quot;">​</a></h3><ul><li><code>search</code>：返回第一个匹配的索引，没有则 <code>-1</code>。</li><li><code>match</code>：无 <code>g</code> 时返回第一个匹配及分组；有 <code>g</code> 时返回所有匹配组成的数组（无分组）。</li><li><code>matchAll</code>：返回匹配的迭代器，每个元素含分组。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">&quot;hi 123&quot;.search(/\\d/);           // 3
&quot;a1b2&quot;.match(/\\d/g);            // [&quot;1&quot;, &quot;2&quot;]
&quot;a1b2&quot;.match(/(\\d)/g);         // [&quot;1&quot;, &quot;2&quot;]
[...&quot;x1y2&quot;.matchAll(/(\\d)/g)]; // [[&quot;1&quot;,&quot;1&quot;],[&quot;2&quot;,&quot;2&quot;]]
</code></pre></div><h2 id="_4-与正则配合的-split" tabindex="-1">4. 与正则配合的 split <a class="header-anchor" href="#_4-与正则配合的-split" aria-label="Permalink to &quot;4. 与正则配合的 split&quot;">​</a></h2><ul><li><code>split</code> 可以传正则，<strong>若正则里带捕获组，分隔符也会出现在结果数组中</strong>。</li><li>利用这一点可以“按句号/问号/感叹号分句，但保留标点”。</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">&quot;a.b.c&quot;.split(/\\./);              // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
&quot;a. b. c&quot;.split(/(\\.)\\s*/);       // [&quot;a&quot;, &quot;.&quot;, &quot;b&quot;, &quot;.&quot;, &quot;c&quot;]
&quot;Hi. Bye! Ok?&quot;.split(/([.!?]\\s*)/);
// [&quot;Hi&quot;, &quot;. &quot;, &quot;Bye&quot;, &quot;! &quot;, &quot;Ok&quot;, &quot;? &quot;, &quot;&quot;]
// 用空串 join 即可还原标点和空格，再按“每两块为一组”可得到 [句子, 分隔符] 对
</code></pre></div><p>更常见的“按句分割且保留分隔符”写法：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">&quot;First. Second! Third?&quot;.split(/([.!?]\\s*)/);
// [&quot;First&quot;, &quot;. &quot;, &quot;Second&quot;, &quot;! &quot;, &quot;Third&quot;, &quot;? &quot;, &quot;&quot;]
// 奇数下标是分隔符，偶数下标（及末尾空）是句子内容，可 map 处理每句再 join(&quot;&quot;)
</code></pre></div><h2 id="_5-实践-句首大写-名字规范化-formattext" tabindex="-1">5. 实践：句首大写 + 名字规范化（formatText） <a class="header-anchor" href="#_5-实践-句首大写-名字规范化-formattext" aria-label="Permalink to &quot;5. 实践：句首大写 + 名字规范化（formatText）&quot;">​</a></h2><p><strong>需求</strong>：</p><ol><li>每句首字母大写，保留前导空格（不把空格 trim 掉）。</li><li>给定名字列表，在文本中忽略大小写匹配整词，并统一替换成“首字母大写、其余小写”。</li></ol><p><strong>思路</strong>：</p><ul><li>用 <code>split(/([.!?]\\s*)/)</code> 按句号/问号/感叹号分句并保留分隔符，然后对每一段找第一个字母并大写。</li><li>用 <code>RegExp(&quot;\\\\b&quot; + name + &quot;\\\\b&quot;, &quot;gi&quot;)</code> 做整词、忽略大小写匹配，再 <code>replace</code> 成规范格式。</li></ul><p><strong>实现</strong>：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">function formatText(str, names) {
  if (!str) return str;

  // 1. 每句首字母大写，但保留前导空格
  let formatted = str
    .split(/([.!?]\\s*)/) // 保留分隔符
    .map(sentence =&gt; {
      if (sentence.trim().length === 0) return sentence; // 全是空格/空的话直接返回

      // 找到第一个字母字符的位置
      let firstLetterIndex = sentence.search(/[a-zA-Z]/);
      if (firstLetterIndex === -1) return sentence; // 如果没有字母，原样返回

      return (
        sentence.slice(0, firstLetterIndex) +
        sentence.charAt(firstLetterIndex).toUpperCase() +
        sentence.slice(firstLetterIndex + 1)
      );
    })
    .join(&quot;&quot;);

  // 2. 名字替换（忽略大小写，替换成首字母大写）
  names.forEach(name =&gt; {
    let regex = new RegExp(\`\\\\b\${name}\\\\b\`, &quot;gi&quot;);
    formatted = formatted.replace(regex, () =&gt; {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    });
  });

  return formatted;
}
</code></pre></div><p><strong>用到的点</strong>：</p><ul><li><code>split(/([.!?]\\s*)/)</code>：按句分割并保留 <code>.!?</code> 及后跟空白。</li><li><code>sentence.search(/[a-zA-Z]/)</code>：找到第一个字母下标。</li><li><code>slice</code> + <code>charAt(...).toUpperCase()</code> + <code>slice</code>：只把首字母变大写，前导空格保留。</li><li><code>new RegExp(&quot;\\\\b&quot; + name + &quot;\\\\b&quot;, &quot;gi&quot;)</code>：整词、忽略大小写；<code>replace(regex, fn)</code> 统一成首字母大写。</li></ul><p><strong>测试</strong>：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="vp-code"><code class="language-js">const input =
  &quot;  today lucas and joshua go to the grocery store.did they buy any good stuff?  Nobody knows!Only lUcas know it.  Am I right?&quot;;
const names = [&quot;lucas&quot;, &quot;joshua&quot;];

console.log(formatText(input, names));
// &quot;  Today Lucas and Joshua go to the grocery store.Did they buy any good stuff?  Nobody knows!Only Lucas know it.  Am I right?&quot;
</code></pre></div><ul><li>句首（Today, Did, Nobody, Only, Am）大写，前导空格保留。</li><li>文中 <code>lucas</code> / <code>lUcas</code>、<code>joshua</code> 均被规范为 <code>Lucas</code>、<code>Joshua</code>。</li></ul><hr><p>小结：字符串处理 = 截取（<code>slice</code>）、分割（<code>split</code>）、替换（<code>replace</code>）、大小写（<code>toUpperCase</code>/<code>toLowerCase</code>）、查找（<code>search</code>/<code>indexOf</code>），再配合正则做整词/多匹配/保留分隔符等，即可覆盖大部分业务场景。</p>`,40)]))}const h=e(d,[["render",s]]);export{p as __pageData,h as default};
