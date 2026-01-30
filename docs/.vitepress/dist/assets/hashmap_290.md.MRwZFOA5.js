import{_ as t,c as a,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"290. Word Pattern","description":"","frontmatter":{},"headers":[],"relativePath":"hashmap/290.md","filePath":"hashmap/290.md"}'),p={name:"hashmap/290.md"};function r(s,e,i,l,d,c){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="_290-word-pattern" tabindex="-1"><a href="https://leetcode.com/problems/word-pattern/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">290. Word Pattern</a> <a class="header-anchor" href="#_290-word-pattern" aria-label="Permalink to &quot;[290. Word Pattern](https://leetcode.com/problems/word-pattern/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a <code>pattern</code> and a string <code>s</code>, determine if <code>s</code> follows the same pattern.</p><p>Here <strong>follow</strong> means a full match such that there is a bijection between a letter in <code>pattern</code> and a <strong>non-empty</strong> word in <code>s</code>.</p><p>Specifically:</p><ul><li>Each letter in <code>pattern</code> maps to <strong>exactly one</strong> unique word in <code>s</code>.</li><li>Each unique word in <code>s</code> maps to <strong>exactly one</strong> letter in <code>pattern</code>.</li><li>No two letters map to the same word, and no two words map to the same letter.</li></ul><hr><p><strong>Example 1:</strong></p><p>Input:<br><code>pattern = &quot;abba&quot;, s = &quot;dog cat cat dog&quot;</code><br> Output:<br><code>true</code></p><p>Explanation:<br> The bijection can be established as:</p><ul><li><code>&#39;a&#39;</code> → <code>&quot;dog&quot;</code></li><li><code>&#39;b&#39;</code> → <code>&quot;cat&quot;</code></li></ul><hr><p><strong>Example 2:</strong></p><p>Input:<br><code>pattern = &quot;abba&quot;, s = &quot;dog cat cat fish&quot;</code><br> Output:<br><code>false</code></p><hr><p><strong>Example 3:</strong></p><p>Input:<br><code>pattern = &quot;aaaa&quot;, s = &quot;dog cat cat dog&quot;</code><br> Output:<br><code>false</code></p><hr><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= pattern.length &lt;= 300</code></li><li><code>pattern</code> contains only lowercase English letters.</li><li><code>1 &lt;= s.length &lt;= 3000</code></li><li><code>s</code> contains only lowercase English letters and spaces <code>&#39; &#39;</code>.</li><li><code>s</code> does <strong>not</strong> contain leading or trailing spaces.</li><li>All words in <code>s</code> are separated by a <strong>single space</strong>.</li></ul><h2 id="approach-hashmap-bijection-check" tabindex="-1">Approach (HashMap + Bijection Check) <a class="header-anchor" href="#approach-hashmap-bijection-check" aria-label="Permalink to &quot;Approach (HashMap + Bijection Check)&quot;">​</a></h2><ol><li><strong>Split words</strong>: <code>words = s.split(&quot; &quot;)</code>. If <code>words.size != pattern.length</code>, return <code>false</code>.</li><li><strong>Bijection (two-way) mapping</strong>: <ul><li>Maintain <code>p2w: Char -&gt; String</code> and <code>w2p: String -&gt; Char</code>.</li><li>For each index <code>i</code>: <ul><li>Let <code>pc = pattern[i]</code>, <code>w = words[i]</code>.</li><li>If <code>pc</code> is already mapped, it must equal <code>w</code>; otherwise <code>false</code>.</li><li>If <code>w</code> is already mapped, it must equal <code>pc</code>; otherwise <code>false</code>.</li><li>Else create both mappings.</li></ul></li></ul></li><li>If all positions pass, return <code>true</code>.</li></ol><p><strong>Why two maps?</strong><br> To enforce <strong>one-to-one</strong> (bijective) mapping in both directions, preventing cases like two pattern chars → same word or one word ← multiple chars.</p><h3 id="edge-cases" tabindex="-1">Edge Cases <a class="header-anchor" href="#edge-cases" aria-label="Permalink to &quot;Edge Cases&quot;">​</a></h3><ul><li>Length mismatch between <code>pattern</code> and words.</li><li>Repeated characters/words breaking bijection.</li><li>Extra spaces are not expected by problem, but if trimming is needed, call <code>trim()</code> before <code>split(&quot; &quot;)</code>.</li></ul><h3 id="correctness" tabindex="-1">Correctness <a class="header-anchor" href="#correctness" aria-label="Permalink to &quot;Correctness&quot;">​</a></h3><p>At each step we ensure consistency of previously established mappings in both directions. Any violation immediately returns <code>false</code>. If the scan completes, a bijection exists → <code>true</code>.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-k3yRN" id="tab-hFz6kaQ" checked><label data-title="Kotlin" for="tab-hFz6kaQ">Kotlin</label><input type="radio" name="group-k3yRN" id="tab-bn9-6oQ"><label data-title="TypeScript" for="tab-bn9-6oQ">TypeScript</label><input type="radio" name="group-k3yRN" id="tab--essXgR"><label data-title="Java" for="tab--essXgR">Java</label><input type="radio" name="group-k3yRN" id="tab-AIGJ3QS"><label data-title="Python" for="tab-AIGJ3QS">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun wordPattern(pattern: String, s: String): Boolean {
        val words = s.split(&quot; &quot;)
        if (words.size != pattern.length) return false

        val p2w = HashMap&lt;Char, String&gt;()
        val w2p = HashMap&lt;String, Char&gt;()

        for (i in pattern.indices) {
            val pc = pattern[i]
            val w = words[i]

            val mappedW = p2w[pc]
            if (mappedW != null &amp;&amp; mappedW != w) return false

            val mappedP = w2p[w]
            if (mappedP != null &amp;&amp; mappedP != pc) return false

            if (mappedW == null &amp;&amp; mappedP == null) {
                p2w[pc] = w
                w2p[w] = pc
            }
        }
        return true
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function wordPattern(pattern: string, s: string): boolean {
    const words = s.split(&quot; &quot;);
    if (words.length !== pattern.length) return false;

    const p2w = new Map&lt;string, string&gt;();
    const w2p = new Map&lt;string, string&gt;();

    for (let i = 0; i &lt; pattern.length; i++) {
        const pc = pattern[i];
        const w = words[i];

        const mappedW = p2w.get(pc);
        if (mappedW !== undefined &amp;&amp; mappedW !== w) return false;

        const mappedP = w2p.get(w);
        if (mappedP !== undefined &amp;&amp; mappedP !== pc) return false;

        if (mappedW === undefined &amp;&amp; mappedP === undefined) {
            p2w.set(pc, w);
            w2p.set(w, pc);
        }
    }
    
    return true;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean wordPattern(String pattern, String s) {
        String[] words = s.split(&quot; &quot;);
        if (words.length != pattern.length()) return false;

        Map&lt;Character, String&gt; p2w = new HashMap&lt;&gt;();
        Map&lt;String, Character&gt; w2p = new HashMap&lt;&gt;();

        for (int i = 0; i &lt; pattern.length(); i++) {
            char pc = pattern.charAt(i);
            String w = words[i];

            String mappedW = p2w.get(pc);
            if (mappedW != null &amp;&amp; !mappedW.equals(w)) return false;

            Character mappedP = w2p.get(w);
            if (mappedP != null &amp;&amp; !mappedP.equals(pc)) return false;

            if (mappedW == null &amp;&amp; mappedP == null) {
                p2w.put(pc, w);
                w2p.put(w, pc);
            }
        }
        
        return true;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def wordPattern(self, pattern: str, s: str) -&gt; bool:
        words = s.split(&quot; &quot;)
        if len(words) != len(pattern):
            return False

        p2w = {}
        w2p = {}

        for i in range(len(pattern)):
            pc = pattern[i]
            w = words[i]

            mapped_w = p2w.get(pc)
            if mapped_w is not None and mapped_w != w:
                return False

            mapped_p = w2p.get(w)
            if mapped_p is not None and mapped_p != pc:
                return False

            if mapped_w is None and mapped_p is None:
                p2w[pc] = w
                w2p[w] = pc

        return True
</code></pre></div></div></div><h3 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h3><ul><li><strong>Time:</strong> <code>O(n)</code> where <code>n = pattern.length</code> (hash lookups are amortized O(1)).</li><li><strong>Space:</strong> <code>O(k)</code> where <code>k</code> is the number of distinct chars/words (at most <code>n</code>).</li></ul>`,30)]))}const h=t(p,[["render",r]]);export{g as __pageData,h as default};
