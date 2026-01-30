import{_ as e,c as a,o,ag as n}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"49. Group Anagrams","description":"","frontmatter":{},"headers":[],"relativePath":"hashmap/49.md","filePath":"hashmap/49.md"}'),s={name:"hashmap/49.md"};function r(i,t,l,c,p,u){return o(),a("div",null,t[0]||(t[0]=[n(`<h1 id="_49-group-anagrams" tabindex="-1"><a href="https://leetcode.com/problems/group-anagrams/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">49. Group Anagrams</a> <a class="header-anchor" href="#_49-group-anagrams" aria-label="Permalink to &quot;[49. Group Anagrams](https://leetcode.com/problems/group-anagrams/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an array of strings <code>strs</code>, group the <strong>anagrams</strong> together. You can return the answer in <strong>any order</strong>.</p><p><strong>Example 1:</strong></p><div class="example-block"><p>Input: strs = [&quot;eat&quot;,&quot;tea&quot;,&quot;tan&quot;,&quot;ate&quot;,&quot;nat&quot;,&quot;bat&quot;]</p><p>Output: [[&quot;bat&quot;],[&quot;nat&quot;,&quot;tan&quot;],[&quot;ate&quot;,&quot;eat&quot;,&quot;tea&quot;]]</p><p>Explanation:</p><ul><li>There is no string in <code>strs</code> that can be rearranged to form <code>&quot;bat&quot;</code>.</li><li>The strings <code>&quot;nat&quot;</code> and <code>&quot;tan&quot;</code> are anagrams as they can be rearranged to form each other.</li><li>The strings <code>&quot;ate&quot;</code>, <code>&quot;eat&quot;</code>, and <code>&quot;tea&quot;</code> are anagrams as they can be rearranged to form each other.</li></ul></div><p><strong>Example 2:</strong></p><div class="example-block"><p>Input: strs = [&quot;&quot;]</p><p>Output: [[&quot;&quot;]]</p></div><p><strong>Example 3:</strong></p><div class="example-block"><p>Input: strs = [&quot;a&quot;]</p><p>Output: [[&quot;a&quot;]]</p></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= strs.length &lt;= 10^4</code></li><li><code>0 &lt;= strs[i].length &lt;= 100</code></li><li><code>strs[i]</code> consists of lowercase English letters.</li></ul><h2 id="approach-count-signature" tabindex="-1">Approach (Count Signature) <a class="header-anchor" href="#approach-count-signature" aria-label="Permalink to &quot;Approach (Count Signature)&quot;">​</a></h2><p>For each word:</p><ol><li>Create an <code>IntArray(26)</code> to count occurrences of <code>a..z</code>.</li><li>Build a <strong>key string</strong> from these counts (e.g., <code>&quot;1#0#0#...#&quot;</code>). <ul><li>Using a delimiter (like <code>#</code>) prevents ambiguity (<code>[1,11]</code> vs <code>[11,1]</code>).</li></ul></li><li>Insert the word into a hash map: <code>key -&gt; list of words</code>.</li><li>At the end, return the map’s values.</li></ol><p>This guarantees that all anagrams share the same key and are grouped.</p><hr><h2 id="correctness-edge-cases" tabindex="-1">Correctness &amp; Edge Cases <a class="header-anchor" href="#correctness-edge-cases" aria-label="Permalink to &quot;Correctness &amp; Edge Cases&quot;">​</a></h2><ul><li>Empty strings <code>&quot;&quot;</code> produce all-zero counts; they group together.</li><li>Single-letter words group by their sole letter.</li><li>Input guarantees lowercase English letters; a 26-length count is sufficient.</li><li>The delimiter in the key avoids collisions from concatenated digits.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-OmimA" id="tab-HBr3uQA" checked><label data-title="Kotlin" for="tab-HBr3uQA">Kotlin</label><input type="radio" name="group-OmimA" id="tab-aZreH-g"><label data-title="TypeScript" for="tab-aZreH-g">TypeScript</label><input type="radio" name="group-OmimA" id="tab-wiIOhcS"><label data-title="Java" for="tab-wiIOhcS">Java</label><input type="radio" name="group-OmimA" id="tab-b_3Evvt"><label data-title="Python" for="tab-b_3Evvt">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun groupAnagrams(strs: Array&lt;String&gt;): List&lt;List&lt;String&gt;&gt; {
    val groups = HashMap&lt;String, MutableList&lt;String&gt;&gt;()

    for (s in strs) {
        val cnt = IntArray(26)
        for (ch in s) {
            cnt[ch - &#39;a&#39;]++
        }
        // Build a stable key: &quot;c0#c1#...#c25#&quot;
        val key = buildString(26 * 2) {
            for (i in 0 until 26) {
                append(cnt[i])
                append(&#39;#&#39;)
            }
        }
        groups.computeIfAbsent(key) { mutableListOf() }.add(s)
    }

    return groups.values.map { it.toList() }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map&lt;string, string[]&gt;();

    for (const s of strs) {
        const cnt = new Array(26).fill(0);
        for (const ch of s) {
            cnt[ch.charCodeAt(0) - &#39;a&#39;.charCodeAt(0)]++;
        }
        // Build a stable key: &quot;c0#c1#...#c25#&quot;
        const key = cnt.join(&#39;#&#39;);
        
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(s);
    }

    return Array.from(groups.values());
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public List&lt;List&lt;String&gt;&gt; groupAnagrams(String[] strs) {
        Map&lt;String, List&lt;String&gt;&gt; groups = new HashMap&lt;&gt;();

        for (String s : strs) {
            int[] cnt = new int[26];
            for (char ch : s.toCharArray()) {
                cnt[ch - &#39;a&#39;]++;
            }
            // Build a stable key: &quot;c0#c1#...#c25#&quot;
            StringBuilder key = new StringBuilder();
            for (int i = 0; i &lt; 26; i++) {
                key.append(cnt[i]).append(&#39;#&#39;);
            }
            
            groups.computeIfAbsent(key.toString(), k -&gt; new ArrayList&lt;&gt;()).add(s);
        }

        return new ArrayList&lt;&gt;(groups.values());
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def groupAnagrams(self, strs: List[str]) -&gt; List[List[str]]:
        groups = {}

        for s in strs:
            cnt = [0] * 26
            for ch in s:
                cnt[ord(ch) - ord(&#39;a&#39;)] += 1
            # Build a stable key: &quot;c0#c1#...#c25#&quot;
            key = &#39;#&#39;.join(map(str, cnt))
            
            if key not in groups:
                groups[key] = []
            groups[key].append(s)

        return list(groups.values())
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li>Let <code>N</code> be the number of words and <code>L</code> the average word length.</li><li><strong>Time:</strong> <code>O(N · L)</code> — counting characters is linear in word length.</li><li><strong>Space:</strong> <code>O(N · L)</code> — storing all words plus the keys/lists (the key is length ~ <code>O(26)</code> per distinct anagram class; dominant term is storing the input in groups).</li></ul>`,21)]))}const h=e(s,[["render",r]]);export{g as __pageData,h as default};
