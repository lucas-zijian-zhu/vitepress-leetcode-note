import{_ as e,c as n,o as s,ag as a}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"14. Longest Common Prefix","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/14.md","filePath":"array-string/14.md"}'),o={name:"array-string/14.md"};function r(i,t,l,p,c,d){return s(),n("div",null,t[0]||(t[0]=[a(`<h1 id="_14-longest-common-prefix" tabindex="-1"><a href="https://leetcode.com/problems/longest-common-prefix/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">14. Longest Common Prefix</a> <a class="header-anchor" href="#_14-longest-common-prefix" aria-label="Permalink to &quot;[14. Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Write a function to find the longest common prefix string amongst an array of strings.</p><p>If there is no common prefix, return an empty string <code>&quot;&quot;</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: strs = [&quot;flower&quot;,&quot;flow&quot;,&quot;flight&quot;]
Output: &quot;fl&quot;
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: strs = [&quot;dog&quot;,&quot;racecar&quot;,&quot;car&quot;]
Output: &quot;&quot;
Explanation: There is no common prefix among the input strings.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= strs.length &lt;= 200</code></li><li><code>0 &lt;= strs[i].length &lt;= 200</code></li><li><code>strs[i]</code> consists of only lowercase English letters if it is non-empty.</li></ul><h2 id="📝-approach" tabindex="-1">📝 Approach <a class="header-anchor" href="#📝-approach" aria-label="Permalink to &quot;📝 Approach&quot;">​</a></h2><p>We use <strong>vertical scanning</strong>:</p><ul><li>Start from the first character of the first string.</li><li>Check if this character is the same in all strings at the same position.</li><li>If we find a mismatch or reach the end of any string, we stop and return the prefix found so far.</li></ul><p>This method avoids extra space and is easy to implement.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-WqjQx" id="tab-Tr3i0XB" checked><label data-title="Kotlin" for="tab-Tr3i0XB">Kotlin</label><input type="radio" name="group-WqjQx" id="tab-jCyv6E_"><label data-title="TypeScript" for="tab-jCyv6E_">TypeScript</label><input type="radio" name="group-WqjQx" id="tab-Ewt_1KZ"><label data-title="Java" for="tab-Ewt_1KZ">Java</label><input type="radio" name="group-WqjQx" id="tab-P6vKFGs"><label data-title="Python" for="tab-P6vKFGs">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun longestCommonPrefix(strs: Array&lt;String&gt;): String {
        if (strs.isEmpty()) return &quot;&quot;

        for (i in strs[0].indices) {
            val c = strs[0][i]
            for (j in 1 until strs.size) {
                if (i &gt;= strs[j].length || strs[j][i] != c) {
                    return strs[0].substring(0, i)
                }
            }
        }

        return strs[0]
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return &quot;&quot;;

    for (let i = 0; i &lt; strs[0].length; i++) {
        const c = strs[0][i];
        for (let j = 1; j &lt; strs.length; j++) {
            if (i &gt;= strs[j].length || strs[j][i] !== c) {
                return strs[0].substring(0, i);
            }
        }
    }

    return strs[0];
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return &quot;&quot;;

        for (int i = 0; i &lt; strs[0].length(); i++) {
            char c = strs[0].charAt(i);
            for (int j = 1; j &lt; strs.length; j++) {
                if (i &gt;= strs[j].length() || strs[j].charAt(i) != c) {
                    return strs[0].substring(0, i);
                }
            }
        }

        return strs[0];
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def longestCommonPrefix(self, strs: List[str]) -&gt; str:
        if not strs:
            return &quot;&quot;

        for i in range(len(strs[0])):
            c = strs[0][i]
            for j in range(1, len(strs)):
                if i &gt;= len(strs[j]) or strs[j][i] != c:
                    return strs[0][:i]

        return strs[0]
</code></pre></div></div></div><h2 id="⏱️-complexity-analysis" tabindex="-1">⏱️ Complexity Analysis <a class="header-anchor" href="#⏱️-complexity-analysis" aria-label="Permalink to &quot;⏱️ Complexity Analysis&quot;">​</a></h2><h3 id="time-complexity" tabindex="-1">Time Complexity <a class="header-anchor" href="#time-complexity" aria-label="Permalink to &quot;Time Complexity&quot;">​</a></h3><ul><li>We iterate through each character of the strings at most once, until we find a mismatch.</li><li>In the worst case, all strings are identical, and we traverse all characters.</li><li>Let: <ul><li><em>n</em> = number of strings</li><li><em>m</em> = length of the shortest string</li></ul></li><li>Then the total number of comparisons is at most <strong>n × m</strong>.</li></ul><p>So the time complexity is:</p><p><strong>O(S)</strong> — where <em>S</em> is the sum of all characters in all strings (bounded by <em>n × m</em>).</p><hr><h3 id="space-complexity" tabindex="-1">Space Complexity <a class="header-anchor" href="#space-complexity" aria-label="Permalink to &quot;Space Complexity&quot;">​</a></h3><ul><li>We only use a few integer variables and return a substring of the first string.</li><li>We don’t allocate any extra data structures proportional to the input size.</li></ul><p>So the space complexity is:</p><p><strong>O(1)</strong> — constant extra space.</p><hr><table tabindex="0"><thead><tr><th>Type</th><th>Complexity</th></tr></thead><tbody><tr><td>Time</td><td><strong>O(S)</strong></td></tr><tr><td>Space</td><td><strong>O(1)</strong></td></tr></tbody></table>`,28)]))}const h=e(o,[["render",r]]);export{g as __pageData,h as default};
