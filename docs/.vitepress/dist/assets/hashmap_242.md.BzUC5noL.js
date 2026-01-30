import{_ as t,c as e,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"242. Valid Anagram","description":"","frontmatter":{},"headers":[],"relativePath":"hashmap/242.md","filePath":"hashmap/242.md"}'),r={name:"hashmap/242.md"};function l(s,a,c,i,p,d){return n(),e("div",null,a[0]||(a[0]=[o(`<h1 id="_242-valid-anagram" tabindex="-1"><a href="https://leetcode.com/problems/valid-anagram/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">242. Valid Anagram</a> <a class="header-anchor" href="#_242-valid-anagram" aria-label="Permalink to &quot;[242. Valid Anagram](https://leetcode.com/problems/valid-anagram/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>t</code> is an anagram of <code>s</code>, and <code>false</code> otherwise.</p><p><strong>Example 1:</strong></p><p>Input:<br><code>s = &quot;anagram&quot;, t = &quot;nagaram&quot;</code><br> Output:<br><code>true</code></p><p><strong>Example 2:</strong></p><p>Input:<br><code>s = &quot;rat&quot;, t = &quot;car&quot;</code><br> Output:<br><code>false</code></p><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length, t.length &lt;= 5 * 10^4</code></li><li><code>s</code> and <code>t</code> consist of lowercase English letters.</li></ul><p><strong>Follow-up:</strong><br> What if the inputs contain Unicode characters? How would you adapt your solution to such a case?</p><h2 id="approach-—-counting-with-hash-fixed-array" tabindex="-1">Approach — Counting with Hash / Fixed Array <a class="header-anchor" href="#approach-—-counting-with-hash-fixed-array" aria-label="Permalink to &quot;Approach — Counting with Hash / Fixed Array&quot;">​</a></h2><h3 id="idea" tabindex="-1">Idea <a class="header-anchor" href="#idea" aria-label="Permalink to &quot;Idea&quot;">​</a></h3><ul><li>If lengths differ → return <code>false</code>.</li><li>Count each char in <code>s</code> (+1) and in <code>t</code> (−1) using a hash table (or fixed-size array for lowercase letters).</li><li>If any count &lt; 0 → not an anagram.</li></ul><p><strong>Why Hash?</strong></p><ul><li>Works for all characters (not just a–z).</li><li>Array version is a faster special case if charset is known (e.g., 26 lowercase letters).</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-1z-0A" id="tab-EJ7NL5v" checked><label data-title="Kotlin" for="tab-EJ7NL5v">Kotlin</label><input type="radio" name="group-1z-0A" id="tab-vxC9Xw7"><label data-title="TypeScript" for="tab-vxC9Xw7">TypeScript</label><input type="radio" name="group-1z-0A" id="tab-x8XkpZN"><label data-title="Java" for="tab-x8XkpZN">Java</label><input type="radio" name="group-1z-0A" id="tab-GrO3Ufe"><label data-title="Python" for="tab-GrO3Ufe">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun isAnagram(s: String, t: String): Boolean {
        if (s.length != t.length) return false
        val map = HashMap&lt;Char, Int&gt;()
        for (c in s) map[c] = (map[c] ?: 0) + 1
        for (c in t) {
            val count = (map[c] ?: 0) - 1
            if (count &lt; 0) return false
            map[c] = count
        }
        return true
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    
    const map = new Map&lt;string, number&gt;();
    
    for (const c of s) {
        map.set(c, (map.get(c) || 0) + 1);
    }
    
    for (const c of t) {
        const count = (map.get(c) || 0) - 1;
        if (count &lt; 0) return false;
        map.set(c, count);
    }
    
    return true;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        
        Map&lt;Character, Integer&gt; map = new HashMap&lt;&gt;();
        
        for (char c : s.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }
        
        for (char c : t.toCharArray()) {
            int count = map.getOrDefault(c, 0) - 1;
            if (count &lt; 0) return false;
            map.put(c, count);
        }
        
        return true;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def isAnagram(self, s: str, t: str) -&gt; bool:
        if len(s) != len(t):
            return False
        
        map_dict = {}
        
        for c in s:
            map_dict[c] = map_dict.get(c, 0) + 1
        
        for c in t:
            count = map_dict.get(c, 0) - 1
            if count &lt; 0:
                return False
            map_dict[c] = count
        
        return True
</code></pre></div></div></div><h3 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h3><ul><li><strong>Time:</strong> O(n)</li><li><strong>Space:</strong> O(1) for fixed alphabet, O(k) for k distinct chars.</li></ul>`,18)]))}const g=t(r,[["render",l]]);export{h as __pageData,g as default};
