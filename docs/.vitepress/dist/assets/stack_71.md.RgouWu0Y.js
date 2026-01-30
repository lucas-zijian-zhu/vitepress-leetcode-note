import{_ as a,C as n,c as s,o as i,j as t,ag as l,G as r,a as p}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"71. Simplify Path","description":"","frontmatter":{},"headers":[],"relativePath":"stack/71.md","filePath":"stack/71.md"}'),c={name:"stack/71.md"},d={id:"_71-simplify-path",tabindex:"-1"};function u(h,e,m,g,q,b){const o=n("Badge");return i(),s("div",null,[t("h1",d,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/simplify-path/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"71. Simplify Path",-1)),r(o,{type:"warning",text:"Medium"}),e[1]||(e[1]=p()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_71-simplify-path","aria-label":'Permalink to "[71. Simplify Path](https://leetcode.com/problems/simplify-path/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=l(`<p>You are given an absolute path for a Unix-style file system, which always begins with a slash <code>/</code>. Your task is to transform this absolute path into its <strong>simplified canonical path</strong>.</p><h2 id="rules-of-unix-style-file-system" tabindex="-1">Rules of Unix-style file system <a class="header-anchor" href="#rules-of-unix-style-file-system" aria-label="Permalink to &quot;Rules of Unix-style file system&quot;">​</a></h2><ul><li>A single period <code>.</code> represents the current directory.</li><li>A double period <code>..</code> represents the previous/parent directory.</li><li>Multiple consecutive slashes such as <code>//</code> or <code>///</code> are treated as a single slash <code>/</code>.</li><li>Any sequence of periods that does <strong>not match</strong> the rules above should be treated as a <strong>valid directory or file name</strong>. For example, <code>...</code> and <code>....</code> are valid directory or file names.</li></ul><h2 id="simplified-canonical-path-requirements" tabindex="-1">Simplified canonical path requirements <a class="header-anchor" href="#simplified-canonical-path-requirements" aria-label="Permalink to &quot;Simplified canonical path requirements&quot;">​</a></h2><ul><li>The path must start with a single slash <code>/</code>.</li><li>Directories within the path must be separated by exactly one slash <code>/</code>.</li><li>The path must not end with a slash <code>/</code>, unless it is the root directory.</li><li>The path must not have any single or double periods (<code>.</code> and <code>..</code>) used to denote current or parent directories.</li></ul><p>Return the <strong>simplified canonical path</strong>.</p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="example-1" tabindex="-1">Example 1 <a class="header-anchor" href="#example-1" aria-label="Permalink to &quot;Example 1&quot;">​</a></h3><p><strong>Input:</strong><br><code>path = &quot;/home/&quot;</code></p><p><strong>Output:</strong><br><code>&quot;/home&quot;</code></p><p><strong>Explanation:</strong><br> The trailing slash should be removed.</p><h3 id="example-2" tabindex="-1">Example 2 <a class="header-anchor" href="#example-2" aria-label="Permalink to &quot;Example 2&quot;">​</a></h3><p><strong>Input:</strong><br><code>path = &quot;/home//foo/&quot;</code></p><p><strong>Output:</strong><br><code>&quot;/home/foo&quot;</code></p><p><strong>Explanation:</strong><br> Multiple consecutive slashes are replaced by a single one.</p><h3 id="example-3" tabindex="-1">Example 3 <a class="header-anchor" href="#example-3" aria-label="Permalink to &quot;Example 3&quot;">​</a></h3><p><strong>Input:</strong><br><code>path = &quot;/home/user/Documents/../Pictures&quot;</code></p><p><strong>Output:</strong><br><code>&quot;/home/user/Pictures&quot;</code></p><p><strong>Explanation:</strong><br> A double period <code>&quot;..&quot;</code> refers to the directory up a level (the parent directory).</p><h3 id="example-4" tabindex="-1">Example 4 <a class="header-anchor" href="#example-4" aria-label="Permalink to &quot;Example 4&quot;">​</a></h3><p><strong>Input:</strong><br><code>path = &quot;/../&quot;</code></p><p><strong>Output:</strong><br><code>&quot;/&quot;</code></p><p><strong>Explanation:</strong><br> Going one level up from the root directory is not possible.</p><h3 id="example-5" tabindex="-1">Example 5 <a class="header-anchor" href="#example-5" aria-label="Permalink to &quot;Example 5&quot;">​</a></h3><p><strong>Input:</strong><br><code>path = &quot;/.../a/../b/c/../d/./&quot;</code></p><p><strong>Output:</strong><br><code>&quot;/.../b/d&quot;</code></p><p><strong>Explanation:</strong><br><code>&quot;...&quot;</code> is a valid name for a directory in this problem.</p><h2 id="constraints" tabindex="-1">Constraints <a class="header-anchor" href="#constraints" aria-label="Permalink to &quot;Constraints&quot;">​</a></h2><ul><li><code>1 &lt;= path.length &lt;= 3000</code></li><li><code>path</code> consists of English letters, digits, period <code>.</code>, slash <code>/</code>, or <code>_</code>.</li><li><code>path</code> is a valid absolute Unix path.</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><ol><li>Split the path by <code>/</code> to get each directory component.</li><li>Use a stack to keep track of valid directory names: <ul><li>Ignore empty strings and <code>.</code>.</li><li>If <code>..</code>, pop from the stack if it&#39;s not empty.</li><li>Otherwise, push the directory name onto the stack.</li></ul></li><li>Join the stack elements with <code>/</code> and prepend <code>/</code> to get the canonical path.</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-oGTvE" id="tab-j7BS699" checked><label data-title="Kotlin" for="tab-j7BS699">Kotlin</label><input type="radio" name="group-oGTvE" id="tab-uRNLOIe"><label data-title="TypeScript" for="tab-uRNLOIe">TypeScript</label><input type="radio" name="group-oGTvE" id="tab-GCndELK"><label data-title="Java" for="tab-GCndELK">Java</label><input type="radio" name="group-oGTvE" id="tab-nTBEARG"><label data-title="Python" for="tab-nTBEARG">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun simplifyPath(path: String): String {
        val stack = mutableListOf&lt;String&gt;()
        val components = path.split(&quot;/&quot;)

        for (comp in components) {
            when {
                comp.isEmpty() || comp == &quot;.&quot; -&gt; continue
                comp == &quot;..&quot; -&gt; if (stack.isNotEmpty()) stack.removeAt(stack.size - 1)
                else -&gt; stack.add(comp)
            }
        }

        return &quot;/&quot; + stack.joinToString(&quot;/&quot;)
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function simplifyPath(path: string): string {
    const stack: string[] = [];
    const components = path.split(&quot;/&quot;);

    for (const comp of components) {
        if (comp === &quot;&quot; || comp === &quot;.&quot;) {
            continue;
        } else if (comp === &quot;..&quot;) {
            if (stack.length &gt; 0) {
                stack.pop();
            }
        } else {
            stack.push(comp);
        }
    }

    return &quot;/&quot; + stack.join(&quot;/&quot;);
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public String simplifyPath(String path) {
        Stack&lt;String&gt; stack = new Stack&lt;&gt;();
        String[] components = path.split(&quot;/&quot;);

        for (String comp : components) {
            if (comp.isEmpty() || comp.equals(&quot;.&quot;)) {
                continue;
            } else if (comp.equals(&quot;..&quot;)) {
                if (!stack.isEmpty()) {
                    stack.pop();
                }
            } else {
                stack.push(comp);
            }
        }

        return &quot;/&quot; + String.join(&quot;/&quot;, stack);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def simplifyPath(self, path: str) -&gt; str:
        stack = []
        components = path.split(&quot;/&quot;)

        for comp in components:
            if comp == &quot;&quot; or comp == &quot;.&quot;:
                continue
            elif comp == &quot;..&quot;:
                if stack:
                    stack.pop()
            else:
                stack.append(comp)

        return &quot;/&quot; + &quot;/&quot;.join(stack)
</code></pre></div></div></div><h2 id="time-space-complexity" tabindex="-1">Time &amp; Space Complexity <a class="header-anchor" href="#time-space-complexity" aria-label="Permalink to &quot;Time &amp; Space Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> <code>O(n)</code> — each character is processed at most twice (split + stack operations).</li><li><strong>Space Complexity:</strong> <code>O(n)</code> — the stack stores directory names, which in the worst case is proportional to the number of path components.</li></ul>`,35))])}const v=a(c,[["render",u]]);export{y as __pageData,v as default};
