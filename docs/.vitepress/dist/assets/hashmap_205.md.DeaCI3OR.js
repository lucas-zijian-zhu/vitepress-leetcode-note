import{_ as t,c as a,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"205. Isomorphic Strings","description":"","frontmatter":{},"headers":[],"relativePath":"hashmap/205.md","filePath":"hashmap/205.md"}'),s={name:"hashmap/205.md"};function r(i,e,c,l,d,p){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="_205-isomorphic-strings" tabindex="-1"><a href="https://leetcode.com/problems/isomorphic-strings/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">205. Isomorphic Strings</a> <a class="header-anchor" href="#_205-isomorphic-strings" aria-label="Permalink to &quot;[205. Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given two strings <code>s</code> and <code>t</code>, determine if they are isomorphic.</p><p>Two strings <code>s</code> and <code>t</code> are isomorphic if the characters in <code>s</code> can be replaced to get <code>t</code>.</p><p>All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.</p><p><strong>Example 1:</strong></p><div class="example-block"> Input: s = &quot;egg&quot;, t = &quot;add&quot; <p>Output: true</p><p>Explanation:</p><p>The strings <code>s</code> and <code>t</code> can be made identical by:</p><ul><li>Mapping <code>e</code> to <code>a</code>.</li><li>Mapping <code>g</code> to <code>d</code>.</li></ul></div><p><strong>Example 2:</strong></p><div class="example-block"> Input: s = &quot;foo&quot;, t = &quot;bar&quot; <p>Output: false</p><p>Explanation:</p><p>The strings <code>s</code> and <code>t</code> can not be made identical as <code>o</code> needs to be mapped to both <code>a</code> and <code>r</code>.</p></div><p><strong>Example 3:</strong></p><div class="example-block"> Input: s = &quot;paper&quot;, t = &quot;title&quot; <p>Output: true</p></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length &lt;= 5 * 10^4</code></li><li><code>t.length == s.length</code></li><li><code>s</code> and <code>t</code> consist of any valid ascii character.</li></ul><h3 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h3><p>Two strings <code>s</code> and <code>t</code> are isomorphic if there is a <strong>one-to-one</strong> mapping between characters of <code>s</code> and characters of <code>t</code> that preserves order.<br> We can enforce bijection by tracking <strong>two maps</strong> simultaneously:</p><ul><li><code>s -&gt; t</code> to ensure one character in <code>s</code> always maps to the same character in <code>t</code>.</li><li><code>t -&gt; s</code> to ensure no two different characters in <code>s</code> map to the same character in <code>t</code>.</li></ul><p>For each index <code>i</code>, check the existing mappings:</p><ul><li>If neither <code>s[i]</code> nor <code>t[i]</code> is mapped, create both mappings.</li><li>Otherwise, the existing mappings must match <code>s[i] -&gt; t[i]</code> <strong>and</strong> <code>t[i] -&gt; s[i]</code>; otherwise return <code>false</code>.</li></ul><p>This works for any Unicode chars (not restricted to 26 letters).</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-dTZNG" id="tab-BmZj5bl" checked><label data-title="Kotlin" for="tab-BmZj5bl">Kotlin</label><input type="radio" name="group-dTZNG" id="tab-zYGJIfb"><label data-title="TypeScript" for="tab-zYGJIfb">TypeScript</label><input type="radio" name="group-dTZNG" id="tab-tagJ7bx"><label data-title="Java" for="tab-tagJ7bx">Java</label><input type="radio" name="group-dTZNG" id="tab-8n71DHO"><label data-title="Python" for="tab-8n71DHO">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun isIsomorphic(s: String, t: String): Boolean {
        if (s.length != t.length) return false
        val st = HashMap&lt;Char, Char&gt;()
        val ts = HashMap&lt;Char, Char&gt;()

        for (i in s.indices) {
            val a = s[i]
            val b = t[i]

            val m1 = st[a]
            val m2 = ts[b]

            if (m1 == null &amp;&amp; m2 == null) {
                st[a] = b
                ts[b] = a
            } else {
                if (m1 != b || m2 != a) return false
            }
        }
        return true
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function isIsomorphic(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    
    const st = new Map&lt;string, string&gt;();
    const ts = new Map&lt;string, string&gt;();

    for (let i = 0; i &lt; s.length; i++) {
        const a = s[i];
        const b = t[i];

        const m1 = st.get(a);
        const m2 = ts.get(b);

        if (m1 === undefined &amp;&amp; m2 === undefined) {
            st.set(a, b);
            ts.set(b, a);
        } else {
            if (m1 !== b || m2 !== a) return false;
        }
    }
    
    return true;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean isIsomorphic(String s, String t) {
        if (s.length() != t.length()) return false;
        
        Map&lt;Character, Character&gt; st = new HashMap&lt;&gt;();
        Map&lt;Character, Character&gt; ts = new HashMap&lt;&gt;();

        for (int i = 0; i &lt; s.length(); i++) {
            char a = s.charAt(i);
            char b = t.charAt(i);

            Character m1 = st.get(a);
            Character m2 = ts.get(b);

            if (m1 == null &amp;&amp; m2 == null) {
                st.put(a, b);
                ts.put(b, a);
            } else {
                if (m1 == null || !m1.equals(b) || m2 == null || !m2.equals(a)) {
                    return false;
                }
            }
        }
        
        return true;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def isIsomorphic(self, s: str, t: str) -&gt; bool:
        if len(s) != len(t):
            return False
        
        st = {}
        ts = {}

        for i in range(len(s)):
            a = s[i]
            b = t[i]

            m1 = st.get(a)
            m2 = ts.get(b)

            if m1 is None and m2 is None:
                st[a] = b
                ts[b] = a
            else:
                if m1 != b or m2 != a:
                    return False

        return True
</code></pre></div></div></div><h3 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h3><ul><li><strong>Time:</strong> <code>O(n)</code> where <code>n</code> is the length of the strings.</li><li><strong>Space:</strong> <code>O(k)</code> for distinct characters encountered (bounded by charset size).</li></ul>`,22)]))}const g=t(s,[["render",r]]);export{u as __pageData,g as default};
