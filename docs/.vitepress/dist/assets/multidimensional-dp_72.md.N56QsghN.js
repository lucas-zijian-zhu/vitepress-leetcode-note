import{_ as n,c as t,o,ag as a}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"72. Edit Distance","description":"","frontmatter":{},"headers":[],"relativePath":"multidimensional-dp/72.md","filePath":"multidimensional-dp/72.md"}'),i={name:"multidimensional-dp/72.md"};function d(r,e,l,c,p,s){return o(),t("div",null,e[0]||(e[0]=[a(`<h1 id="_72-edit-distance" tabindex="-1"><a href="https://leetcode.com/problems/edit-distance/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">72. Edit Distance</a> <a class="header-anchor" href="#_72-edit-distance" aria-label="Permalink to &quot;[72. Edit Distance](https://leetcode.com/problems/edit-distance/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given two strings <code>word1</code> and <code>word2</code>, return the minimum number of operations required to convert <code>word1</code> to <code>word2</code>.</p><p>You have the following three operations permitted on a word:</p><ul><li>Insert a character</li><li>Delete a character</li><li>Replace a character</li></ul><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: word1 = &quot;horse&quot;, word2 = &quot;ros&quot;
Output: 3
Explanation: 
horse -&gt; rorse (replace &#39;h&#39; with &#39;r&#39;)
rorse -&gt; rose (remove &#39;r&#39;)
rose -&gt; ros (remove &#39;e&#39;)
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: word1 = &quot;intention&quot;, word2 = &quot;execution&quot;
Output: 5
Explanation: 
intention -&gt; inention (remove &#39;t&#39;)
inention -&gt; enention (replace &#39;i&#39; with &#39;e&#39;)
enention -&gt; exention (replace &#39;n&#39; with &#39;x&#39;)
exention -&gt; exection (replace &#39;n&#39; with &#39;c&#39;)
exection -&gt; execution (insert &#39;u&#39;)
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>0 &lt;= word1.length, word2.length &lt;= 500</code></li><li><code>word1</code> and <code>word2</code> consist of lowercase English letters.</li></ul><h2 id="💡-approach-dynamic-programming" tabindex="-1">💡 Approach: Dynamic Programming <a class="header-anchor" href="#💡-approach-dynamic-programming" aria-label="Permalink to &quot;💡 Approach: Dynamic Programming&quot;">​</a></h2><p>We define a DP table <code>dp[i][j]</code>:</p><ul><li><code>dp[i][j]</code> = the minimum edit distance between <code>word1[0..i-1]</code> and <code>word2[0..j-1]</code>.</li></ul><h3 id="base-cases" tabindex="-1">Base cases: <a class="header-anchor" href="#base-cases" aria-label="Permalink to &quot;Base cases:&quot;">​</a></h3><ul><li><code>dp[0][j] = j</code> (turn empty <code>word1</code> into <code>word2[0..j-1]</code> by inserting <code>j</code> characters)</li><li><code>dp[i][0] = i</code> (turn <code>word1[0..i-1]</code> into empty <code>word2</code> by deleting <code>i</code> characters)</li></ul><h3 id="transition" tabindex="-1">Transition: <a class="header-anchor" href="#transition" aria-label="Permalink to &quot;Transition:&quot;">​</a></h3><ul><li>If <code>word1[i-1] == word2[j-1]</code> → no operation:<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">dp[i][j] = dp[i-1][j-1]
</code></pre></div></li><li>Else → take the minimum of:<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">dp[i][j] = 1 + min(
    dp[i-1][j],   // delete
    dp[i][j-1],   // insert
    dp[i-1][j-1]  // replace
)
</code></pre></div></li></ul><p>Finally, <code>dp[m][n]</code> gives the answer, where <code>m</code> and <code>n</code> are the lengths of <code>word1</code> and <code>word2</code>.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-G3r7y" id="tab-s2_sVAt" checked><label data-title="Kotlin" for="tab-s2_sVAt">Kotlin</label><input type="radio" name="group-G3r7y" id="tab-JSv3yAC"><label data-title="TypeScript" for="tab-JSv3yAC">TypeScript</label><input type="radio" name="group-G3r7y" id="tab-ZR6FPgq"><label data-title="Java" for="tab-ZR6FPgq">Java</label><input type="radio" name="group-G3r7y" id="tab-S0jVqyh"><label data-title="Python" for="tab-S0jVqyh">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun minDistance(word1: String, word2: String): Int {
        val m = word1.length
        val n = word2.length
        val dp = Array(m + 1) { IntArray(n + 1) }

        for (i in 0..m) dp[i][0] = i
        for (j in 0..n) dp[0][j] = j

        for (i in 1..m) {
            for (j in 1..n) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1]
                } else {
                    dp[i][j] = 1 + minOf(
                        dp[i - 1][j],   // delete
                        dp[i][j - 1],   // insert
                        dp[i - 1][j - 1] // replace
                    )
                }
            }
        }

        return dp[m][n]
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    minDistance(word1: string, word2: string): number {
        const m = word1.length;
        const n = word2.length;
        const dp = Array(m + 1).fill(null).map(() =&gt; Array(n + 1).fill(0));

        for (let i = 0; i &lt;= m; i++) dp[i][0] = i;
        for (let j = 0; j &lt;= n; j++) dp[0][j] = j;

        for (let i = 1; i &lt;= m; i++) {
            for (let j = 1; j &lt;= n; j++) {
                if (word1[i - 1] === word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j],   // delete
                        dp[i][j - 1],   // insert
                        dp[i - 1][j - 1] // replace
                    );
                }
            }
        }

        return dp[m][n];
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length();
        int n = word2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 0; i &lt;= m; i++) dp[i][0] = i;
        for (int j = 0; j &lt;= n; j++) dp[0][j] = j;

        for (int i = 1; i &lt;= m; i++) {
            for (int j = 1; j &lt;= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                        Math.min(dp[i - 1][j], dp[i][j - 1]), // delete, insert
                        dp[i - 1][j - 1] // replace
                    );
                }
            }
        }

        return dp[m][n];
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def minDistance(self, word1: str, word2: str) -&gt; int:
        m = len(word1)
        n = len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(
                        dp[i - 1][j],   # delete
                        dp[i][j - 1],   # insert
                        dp[i - 1][j - 1] # replace
                    )

        return dp[m][n]
</code></pre></div></div></div><hr><h1 id="⏱️-time-space-complexity" tabindex="-1">⏱️ Time &amp; Space Complexity <a class="header-anchor" href="#⏱️-time-space-complexity" aria-label="Permalink to &quot;⏱️ Time &amp; Space Complexity&quot;">​</a></h1><table tabindex="0"><thead><tr><th>Complexity Type</th><th>Big-O</th><th>Explanation</th></tr></thead><tbody><tr><td>🕒 Time</td><td><code>O(m * n)</code></td><td>Fill a DP table of size <code>m x n</code></td></tr><tr><td>🗃️ Space</td><td><code>O(m * n)</code></td><td>DP table of size <code>m x n</code></td></tr></tbody></table><p>Where <code>m</code> and <code>n</code> are the lengths of <code>word1</code> and <code>word2</code>.</p>`,25)]))}const h=n(i,[["render",d]]);export{u as __pageData,h as default};
