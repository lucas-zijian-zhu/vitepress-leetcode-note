import{_ as a,c as t,o,ag as n}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"383. Ransom Note","description":"","frontmatter":{},"headers":[],"relativePath":"hashmap/383.md","filePath":"hashmap/383.md"}'),c={name:"hashmap/383.md"};function s(r,e,l,i,p,d){return o(),t("div",null,e[0]||(e[0]=[n(`<h1 id="_383-ransom-note" tabindex="-1"><a href="https://leetcode.com/problems/ransom-note/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">383. Ransom Note</a> <a class="header-anchor" href="#_383-ransom-note" aria-label="Permalink to &quot;[383. Ransom Note](https://leetcode.com/problems/ransom-note/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given two strings <code>ransomNote</code> and <code>magazine</code>, return <code>true</code> if <code>ransomNote</code> can be constructed by using the letters from <code>magazine</code> and <code>false</code> otherwise.</p><p>Each letter in <code>magazine</code> can only be used once in <code>ransomNote</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: ransomNote = &quot;a&quot;, magazine = &quot;b&quot;
Output: false
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: ransomNote = &quot;aa&quot;, magazine = &quot;ab&quot;
Output: false
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: ransomNote = &quot;aa&quot;, magazine = &quot;aab&quot;
Output: true
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= ransomNote.length, magazine.length &lt;= 10^5</code></li><li><code>ransomNote</code> and <code>magazine</code> consist of lowercase English letters.</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>We need to determine if the <code>ransomNote</code> string can be constructed from the characters available in the <code>magazine</code> string.<br> A simple and efficient way to solve this is:</p><ol><li><p><strong>Count the characters in <code>magazine</code></strong></p><ul><li>We create a map (or array) to store the frequency of each character in <code>magazine</code>.</li></ul></li><li><p><strong>Check each character in <code>ransomNote</code></strong></p><ul><li>For each character, check if it exists in the map with a positive count.</li><li>If the count is zero or the character doesn&#39;t exist, return <code>false</code>.</li></ul></li><li><p><strong>If all characters in <code>ransomNote</code> are available</strong>, return <code>true</code>.</p></li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Bk4ON" id="tab-CxnGxlP" checked><label data-title="Kotlin" for="tab-CxnGxlP">Kotlin</label><input type="radio" name="group-Bk4ON" id="tab-S3UEsq4"><label data-title="TypeScript" for="tab-S3UEsq4">TypeScript</label><input type="radio" name="group-Bk4ON" id="tab-531vKD7"><label data-title="Java" for="tab-531vKD7">Java</label><input type="radio" name="group-Bk4ON" id="tab-GoV8iwd"><label data-title="Python" for="tab-GoV8iwd">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun canConstruct(ransomNote: String, magazine: String): Boolean {
        val map = mutableMapOf&lt;Char, Int&gt;()
        for (c in magazine) {
            map[c] = map.getOrDefault(c, 0) + 1
        }
        for(c in ransomNote) {
            if (map.getOrDefault(c, 0) == 0) {
                return false
            }
            map[c] = map.getOrDefault(c, 0) - 1
        }
        return true
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function canConstruct(ransomNote: string, magazine: string): boolean {
    const map = new Map&lt;string, number&gt;();
    
    for (const c of magazine) {
        map.set(c, (map.get(c) || 0) + 1);
    }
    
    for (const c of ransomNote) {
        if ((map.get(c) || 0) === 0) {
            return false;
        }
        map.set(c, (map.get(c) || 0) - 1);
    }
    
    return true;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        Map&lt;Character, Integer&gt; map = new HashMap&lt;&gt;();
        
        for (char c : magazine.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }
        
        for (char c : ransomNote.toCharArray()) {
            if (map.getOrDefault(c, 0) == 0) {
                return false;
            }
            map.put(c, map.getOrDefault(c, 0) - 1);
        }
        
        return true;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -&gt; bool:
        map_dict = {}
        
        for c in magazine:
            map_dict[c] = map_dict.get(c, 0) + 1
        
        for c in ransomNote:
            if map_dict.get(c, 0) == 0:
                return False
            map_dict[c] = map_dict.get(c, 0) - 1
        
        return True
</code></pre></div></div></div><p><strong>Complexity Analysis</strong>:</p><ul><li><strong>Time Complexity</strong>: <code>O(m + n)</code> where <code>m</code> is the length of <code>magazine</code> and <code>n</code> is the length of <code>ransomNote</code>.</li><li><strong>Space Complexity</strong>: <code>O(1)</code> because the number of possible characters (26 lowercase letters) is constant.</li></ul>`,18)]))}const g=a(c,[["render",s]]);export{m as __pageData,g as default};
