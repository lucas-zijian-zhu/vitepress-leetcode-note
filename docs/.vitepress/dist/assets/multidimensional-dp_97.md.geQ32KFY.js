import{_ as t,c as n,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"97. Interleaving String","description":"","frontmatter":{},"headers":[],"relativePath":"multidimensional-dp/97.md","filePath":"multidimensional-dp/97.md"}'),s={name:"multidimensional-dp/97.md"};function i(d,e,l,c,r,p){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="_97-interleaving-string" tabindex="-1"><a href="https://leetcode.com/problems/interleaving-string/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">97. Interleaving String</a> <a class="header-anchor" href="#_97-interleaving-string" aria-label="Permalink to &quot;[97. Interleaving String](https://leetcode.com/problems/interleaving-string/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given strings <code>s1</code>, <code>s2</code>, and <code>s3</code>, find whether <code>s3</code> is formed by an <strong>interleaving</strong> of <code>s1</code> and <code>s2</code>.</p><p>An <strong>interleaving</strong> of two strings <code>s</code> and <code>t</code> is a configuration where <code>s</code> and <code>t</code> are divided into <code>n</code> and <code>m</code> <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1b:" data-state="closed" class="">substrings</button> respectively, such that:</p><ul><li><code>s = s<sub>1</sub> + s<sub>2</sub> + ... + s<sub>n</sub></code></li><li><code>t = t<sub>1</sub> + t<sub>2</sub> + ... + t<sub>m</sub></code></li><li><code>|n - m| &lt;= 1</code></li><li>The <strong>interleaving</strong> is <code>s<sub>1</sub> + t<sub>1</sub> + s<sub>2</sub> + t<sub>2</sub> + s<sub>3</sub> + t<sub>3</sub> + ...</code> or <code>t<sub>1</sub> + s<sub>1</sub> + t<sub>2</sub> + s<sub>2</sub> + t<sub>3</sub> + s<sub>3</sub> + ...</code></li></ul><p><strong>Note:</strong> <code>a + b</code> is the concatenation of strings <code>a</code> and <code>b</code>.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/09/02/interleave.jpg" style="width:561px;height:203px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s1 = &quot;aabcc&quot;, s2 = &quot;dbbca&quot;, s3 = &quot;aadbbcbcac&quot;
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = &quot;aa&quot; + &quot;bc&quot; + &quot;c&quot;, and s2 into s2 = &quot;dbbc&quot; + &quot;a&quot;.
Interleaving the two splits, we get &quot;aa&quot; + &quot;dbbc&quot; + &quot;bc&quot; + &quot;a&quot; + &quot;c&quot; = &quot;aadbbcbcac&quot;.
Since s3 can be obtained by interleaving s1 and s2, we return true.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s1 = &quot;aabcc&quot;, s2 = &quot;dbbca&quot;, s3 = &quot;aadbbbaccc&quot;
Output: false
Explanation: Notice how it is impossible to interleave s2 with any other string to obtain s3.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s1 = &quot;&quot;, s2 = &quot;&quot;, s3 = &quot;&quot;
Output: true
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>0 &lt;= s1.length, s2.length &lt;= 100</code></li><li><code>0 &lt;= s3.length &lt;= 200</code></li><li><code>s1</code>, <code>s2</code>, and <code>s3</code> consist of lowercase English letters.</li></ul><p><strong>Follow up:</strong> Could you solve it using only <code>O(s2.length)</code> additional memory space?</p><h1 id="💡-approach-dynamic-programming" tabindex="-1">💡 Approach: Dynamic Programming <a class="header-anchor" href="#💡-approach-dynamic-programming" aria-label="Permalink to &quot;💡 Approach: Dynamic Programming&quot;">​</a></h1><h3 id="idea" tabindex="-1">Idea: <a class="header-anchor" href="#idea" aria-label="Permalink to &quot;Idea:&quot;">​</a></h3><ul><li>Use a <strong>2D DP table</strong> where <code>dp[i][j]</code> means: <blockquote><p><code>s3[0..i+j-1]</code> can be formed by interleaving <code>s1[0..i-1]</code> and <code>s2[0..j-1]</code>.</p></blockquote></li><li>Initialize <code>dp[0][0] = true</code> because two empty strings can form an empty string.</li><li>At each cell <code>(i, j)</code>, if: <ul><li>The previous state <code>dp[i-1][j]</code> is <code>true</code> and <code>s1[i-1] == s3[i+j-1]</code>, then <code>dp[i][j] = true</code>.</li><li>Or if <code>dp[i][j-1]</code> is <code>true</code> and <code>s2[j-1] == s3[i+j-1]</code>, then <code>dp[i][j] = true</code>.</li></ul></li><li>Finally, check <code>dp[m][n]</code>.</li></ul><h3 id="why-it-works" tabindex="-1">Why it works? <a class="header-anchor" href="#why-it-works" aria-label="Permalink to &quot;Why it works?&quot;">​</a></h3><p>✅ Covers all possible interleaving configurations.<br> ✅ Maintains the relative order of both strings.<br> ✅ Efficient and easy to implement.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-CZ6-q" id="tab-C1li2Ub" checked><label data-title="Kotlin" for="tab-C1li2Ub">Kotlin</label><input type="radio" name="group-CZ6-q" id="tab-K-rRFDV"><label data-title="TypeScript" for="tab-K-rRFDV">TypeScript</label><input type="radio" name="group-CZ6-q" id="tab-fOk6PSI"><label data-title="Java" for="tab-fOk6PSI">Java</label><input type="radio" name="group-CZ6-q" id="tab-afiNo1T"><label data-title="Python" for="tab-afiNo1T">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun isInterleave(s1: String, s2: String, s3: String): Boolean {
        val m = s1.length
        val n = s2.length
        if (m + n != s3.length) return false

        val dp = Array(m + 1) { BooleanArray(n + 1) }
        dp[0][0] = true

        for (i in 0..m) {
            for (j in 0..n) {
                if (i &gt; 0 &amp;&amp; s1[i-1] == s3[i+j-1]) {
                    dp[i][j] = dp[i][j] || dp[i-1][j]
                }
                if (j &gt; 0 &amp;&amp; s2[j-1] == s3[i+j-1]) {
                    dp[i][j] = dp[i][j] || dp[i][j-1]
                }
            }
        }

        return dp[m][n]
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    isInterleave(s1: string, s2: string, s3: string): boolean {
        const m = s1.length;
        const n = s2.length;
        if (m + n !== s3.length) return false;

        const dp = Array(m + 1).fill(null).map(() =&gt; Array(n + 1).fill(false));
        dp[0][0] = true;

        for (let i = 0; i &lt;= m; i++) {
            for (let j = 0; j &lt;= n; j++) {
                if (i &gt; 0 &amp;&amp; s1[i-1] === s3[i+j-1]) {
                    dp[i][j] = dp[i][j] || dp[i-1][j];
                }
                if (j &gt; 0 &amp;&amp; s2[j-1] === s3[i+j-1]) {
                    dp[i][j] = dp[i][j] || dp[i][j-1];
                }
            }
        }

        return dp[m][n];
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length();
        int n = s2.length();
        if (m + n != s3.length()) return false;

        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;

        for (int i = 0; i &lt;= m; i++) {
            for (int j = 0; j &lt;= n; j++) {
                if (i &gt; 0 &amp;&amp; s1.charAt(i-1) == s3.charAt(i+j-1)) {
                    dp[i][j] = dp[i][j] || dp[i-1][j];
                }
                if (j &gt; 0 &amp;&amp; s2.charAt(j-1) == s3.charAt(i+j-1)) {
                    dp[i][j] = dp[i][j] || dp[i][j-1];
                }
            }
        }

        return dp[m][n];
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -&gt; bool:
        m = len(s1)
        n = len(s2)
        if m + n != len(s3):
            return False

        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True

        for i in range(m + 1):
            for j in range(n + 1):
                if i &gt; 0 and s1[i-1] == s3[i+j-1]:
                    dp[i][j] = dp[i][j] or dp[i-1][j]
                if j &gt; 0 and s2[j-1] == s3[i+j-1]:
                    dp[i][j] = dp[i][j] or dp[i][j-1]

        return dp[m][n]
</code></pre></div></div></div><hr><h1 id="⏱️-time-space-complexity" tabindex="-1">⏱️ Time &amp; Space Complexity <a class="header-anchor" href="#⏱️-time-space-complexity" aria-label="Permalink to &quot;⏱️ Time &amp; Space Complexity&quot;">​</a></h1><table tabindex="0"><thead><tr><th>Complexity Type</th><th>Big-O</th><th>Explanation</th></tr></thead><tbody><tr><td><strong>Time</strong></td><td><code>O(m × n)</code></td><td>Traverse all combinations of <code>s1</code> and <code>s2</code></td></tr><tr><td><strong>Space</strong></td><td><code>O(m × n)</code></td><td>DP table of size <code>(m+1) × (n+1)</code></td></tr></tbody></table><p>Where:</p><ul><li><code>m = s1.length</code></li><li><code>n = s2.length</code></li></ul>`,27)]))}const b=t(s,[["render",i]]);export{g as __pageData,b as default};
