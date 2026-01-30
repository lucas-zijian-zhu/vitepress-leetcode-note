import{_ as o,C as n,c as s,o as c,j as a,ag as i,G as l,a as r}from"./chunks/framework.Bw-5EFTY.js";const k=JSON.parse('{"title":"20. Valid Parentheses","description":"","frontmatter":{},"headers":[],"relativePath":"stack/20.md","filePath":"stack/20.md"}'),p={name:"stack/20.md"},d={id:"_20-valid-parentheses",tabindex:"-1"};function u(h,e,m,g,b,f){const t=n("Badge");return c(),s("div",null,[a("h1",d,[e[0]||(e[0]=a("a",{href:"https://leetcode.com/problems/valid-parentheses/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"20. Valid Parentheses",-1)),l(t,{type:"tip",text:"Easy"}),e[1]||(e[1]=r()),e[2]||(e[2]=a("a",{class:"header-anchor",href:"#_20-valid-parentheses","aria-label":'Permalink to "[20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="tip" text="Easy" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>Given a string <code>s</code> containing just the characters <code>&#39;(&#39;</code>, <code>&#39;)&#39;</code>, <code>&#39;{&#39;</code>, <code>&#39;}&#39;</code>, <code>&#39;[&#39;</code> and <code>&#39;]&#39;</code>, determine if the input string is valid.</p><p>An input string is valid if:</p><ul><li>Open brackets must be closed by the same type of brackets.</li><li>Open brackets must be closed in the correct order.</li><li>Every close bracket has a corresponding open bracket of the same type.</li></ul><h2 id="example-1" tabindex="-1">Example 1 <a class="header-anchor" href="#example-1" aria-label="Permalink to &quot;Example 1&quot;">​</a></h2><p>Input: <code>s = &quot;()&quot;</code><br> Output: <code>true</code></p><h2 id="example-2" tabindex="-1">Example 2 <a class="header-anchor" href="#example-2" aria-label="Permalink to &quot;Example 2&quot;">​</a></h2><p>Input: <code>s = &quot;()[]{}&quot;</code><br> Output: <code>true</code></p><h2 id="example-3" tabindex="-1">Example 3 <a class="header-anchor" href="#example-3" aria-label="Permalink to &quot;Example 3&quot;">​</a></h2><p>Input: <code>s = &quot;(]&quot;</code><br> Output: <code>false</code></p><h2 id="example-4" tabindex="-1">Example 4 <a class="header-anchor" href="#example-4" aria-label="Permalink to &quot;Example 4&quot;">​</a></h2><p>Input: <code>s = &quot;([])&quot;</code><br> Output: <code>true</code></p><h2 id="example-5" tabindex="-1">Example 5 <a class="header-anchor" href="#example-5" aria-label="Permalink to &quot;Example 5&quot;">​</a></h2><p>Input: <code>s = &quot;([)]&quot;</code><br> Output: <code>false</code></p><h2 id="constraints" tabindex="-1">Constraints <a class="header-anchor" href="#constraints" aria-label="Permalink to &quot;Constraints&quot;">​</a></h2><ul><li><code>1 &lt;= s.length &lt;= 10^4</code></li><li><code>s</code> consists of parentheses only <code>&#39;()[]{}&#39;</code>.</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>We can use a <strong>stack</strong> to solve this problem:</p><ol><li>Initialize an empty stack.</li><li>Iterate through each character <code>c</code> in the string: <ul><li>If <code>c</code> is an <strong>opening bracket</strong> (<code>(</code>, <code>{</code>, <code>[</code>), push it onto the stack.</li><li>If <code>c</code> is a <strong>closing bracket</strong> (<code>)</code>, <code>}</code>, <code>]</code>): <ul><li>Check if the stack is empty. If it is, return <code>false</code>.</li><li>Otherwise, pop the top element from the stack and check if it matches the type of <code>c</code>. If it does not match, return <code>false</code>.</li></ul></li></ul></li><li>After iterating, if the stack is empty, all brackets were matched correctly, return <code>true</code>; otherwise, return <code>false</code>.</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-PV_vi" id="tab-iLxF9zA" checked><label data-title="Kotlin" for="tab-iLxF9zA">Kotlin</label><input type="radio" name="group-PV_vi" id="tab-CZypMiD"><label data-title="TypeScript" for="tab-CZypMiD">TypeScript</label><input type="radio" name="group-PV_vi" id="tab-eVSz37v"><label data-title="Java" for="tab-eVSz37v">Java</label><input type="radio" name="group-PV_vi" id="tab-BOB4T22"><label data-title="Python" for="tab-BOB4T22">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun isValid(s: String): Boolean {
    val stack = mutableListOf&lt;Char&gt;()
    val map = mapOf(&#39;)&#39; to &#39;(&#39;, &#39;}&#39; to &#39;{&#39;, &#39;]&#39; to &#39;[&#39;)

    for (c in s) {
        if (c in map.values) {
            stack.add(c)
        } else if (c in map.keys) {
            if (stack.isEmpty() || stack.last() != map[c]) return false
            stack.removeAt(stack.size - 1)
        }
    }
    return stack.isEmpty()
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function isValid(s: string): boolean {
    const stack: string[] = [];
    const map: { [key: string]: string } = {
        &#39;)&#39;: &#39;(&#39;,
        &#39;}&#39;: &#39;{&#39;,
        &#39;]&#39;: &#39;[&#39;
    };

    for (const c of s) {
        if (Object.values(map).includes(c)) {
            stack.push(c);
        } else if (c in map) {
            if (stack.length === 0 || stack.pop() !== map[c]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean isValid(String s) {
        Stack&lt;Character&gt; stack = new Stack&lt;&gt;();
        Map&lt;Character, Character&gt; map = new HashMap&lt;&gt;();
        map.put(&#39;)&#39;, &#39;(&#39;);
        map.put(&#39;}&#39;, &#39;{&#39;);
        map.put(&#39;]&#39;, &#39;[&#39;);

        for (char c : s.toCharArray()) {
            if (map.containsValue(c)) {
                stack.push(c);
            } else if (map.containsKey(c)) {
                if (stack.isEmpty() || stack.pop() != map.get(c)) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def isValid(self, s: str) -&gt; bool:
        stack = []
        mapping = {&#39;)&#39;: &#39;(&#39;, &#39;}&#39;: &#39;{&#39;, &#39;]&#39;: &#39;[&#39;}

        for char in s:
            if char in mapping.values():
                stack.append(char)
            elif char in mapping:
                if not stack or stack.pop() != mapping[char]:
                    return False
        
        return len(stack) == 0
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> <code>O(n)</code>, where <code>n</code> is the length of the string. We process each character exactly once.</li><li><strong>Space Complexity:</strong> <code>O(n)</code>, in the worst case we may store all opening brackets in the stack.</li></ul>`,22))])}const y=o(p,[["render",u]]);export{k as __pageData,y as default};
