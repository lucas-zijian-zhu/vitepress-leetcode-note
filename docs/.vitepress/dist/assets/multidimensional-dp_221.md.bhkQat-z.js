import{_ as a,c as e,o as n,ag as i}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"221. Maximal Square","description":"","frontmatter":{},"headers":[],"relativePath":"multidimensional-dp/221.md","filePath":"multidimensional-dp/221.md"}'),o={name:"multidimensional-dp/221.md"};function r(l,t,d,s,p,c){return n(),e("div",null,t[0]||(t[0]=[i(`<h1 id="_221-maximal-square" tabindex="-1"><a href="https://leetcode.com/problems/maximal-square/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">221. Maximal Square</a> <a class="header-anchor" href="#_221-maximal-square" aria-label="Permalink to &quot;[221. Maximal Square](https://leetcode.com/problems/maximal-square/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an <code>m x n</code> binary <code>matrix</code> filled with <code>0</code>&#39;s and <code>1</code>&#39;s, find the largest square containing only <code>1</code>&#39;s and return its area.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/26/max1grid.jpg" style="width:400px;height:319px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: matrix = [[&quot;1&quot;,&quot;0&quot;,&quot;1&quot;,&quot;0&quot;,&quot;0&quot;],[&quot;1&quot;,&quot;0&quot;,&quot;1&quot;,&quot;1&quot;,&quot;1&quot;],[&quot;1&quot;,&quot;1&quot;,&quot;1&quot;,&quot;1&quot;,&quot;1&quot;],[&quot;1&quot;,&quot;0&quot;,&quot;0&quot;,&quot;1&quot;,&quot;0&quot;]]
Output: 4
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/26/max2grid.jpg" style="width:165px;height:165px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: matrix = [[&quot;0&quot;,&quot;1&quot;],[&quot;1&quot;,&quot;0&quot;]]
Output: 1
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: matrix = [[&quot;0&quot;]]
Output: 0
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == matrix.length</code></li><li><code>n == matrix[i].length</code></li><li><code>1 &lt;= m, n &lt;= 300</code></li><li><code>matrix[i][j]</code> is <code>&#39;0&#39;</code> or <code>&#39;1&#39;</code>.</li></ul><h2 id="🚀-approach-dynamic-programming" tabindex="-1">🚀 Approach: Dynamic Programming <a class="header-anchor" href="#🚀-approach-dynamic-programming" aria-label="Permalink to &quot;🚀 Approach: Dynamic Programming&quot;">​</a></h2><p>We use a <code>dp</code> table where <code>dp[i][j]</code> represents the <strong>side length of the largest square</strong><br> whose bottom-right corner is at <code>(i, j)</code>.</p><h3 id="state-transition" tabindex="-1">State Transition <a class="header-anchor" href="#state-transition" aria-label="Permalink to &quot;State Transition&quot;">​</a></h3><p>If <code>matrix[i][j] == &#39;1&#39;</code>, then:</p><ul><li>We can extend the square only if the top, left, and top-left cells also form a square.</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Formula:
dp[i][j] = min(
  dp[i-1][j],      // top  
  dp[i][j-1],      // left  
  dp[i-1][j-1]     // top-left  
) + 1
</code></pre></div><p>If <code>matrix[i][j] == &#39;0&#39;</code>, then <code>dp[i][j] = 0</code>.</p><h2 id="📝-base-case" tabindex="-1">📝 Base Case <a class="header-anchor" href="#📝-base-case" aria-label="Permalink to &quot;📝 Base Case&quot;">​</a></h2><p>On the first row or column, <code>dp[i][j] = 1</code> if <code>matrix[i][j] == &#39;1&#39;</code>.</p><h2 id="🎯-final-answer" tabindex="-1">🎯 Final Answer <a class="header-anchor" href="#🎯-final-answer" aria-label="Permalink to &quot;🎯 Final Answer&quot;">​</a></h2><p>The area of the largest square is the square of the maximum value in <code>dp</code>.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-TVWDp" id="tab-F-zFWic" checked><label data-title="Kotlin" for="tab-F-zFWic">Kotlin</label><input type="radio" name="group-TVWDp" id="tab-qFwYpGb"><label data-title="TypeScript" for="tab-qFwYpGb">TypeScript</label><input type="radio" name="group-TVWDp" id="tab-YuRw-Lz"><label data-title="Java" for="tab-YuRw-Lz">Java</label><input type="radio" name="group-TVWDp" id="tab-BLy2q5-"><label data-title="Python" for="tab-BLy2q5-">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun maximalSquare(matrix: Array&lt;CharArray&gt;): Int {
        if (matrix.isEmpty() || matrix[0].isEmpty()) return 0
        val m = matrix.size
        val n = matrix[0].size
        val dp = Array(m) { IntArray(n) }

        var maxSide = 0

        for (i in 0 until m) {
            for (j in 0 until n) {
                if (matrix[i][j] == &#39;1&#39;) {
                    dp[i][j] = if (i == 0 || j == 0) {
                        1
                    } else {
                        minOf(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
                    }
                    maxSide = maxOf(maxSide, dp[i][j])
                }
            }
        }

        return maxSide * maxSide
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    maximalSquare(matrix: string[][]): number {
        if (matrix.length === 0 || matrix[0].length === 0) return 0;
        const m = matrix.length;
        const n = matrix[0].length;
        const dp = Array(m).fill(null).map(() =&gt; Array(n).fill(0));

        let maxSide = 0;

        for (let i = 0; i &lt; m; i++) {
            for (let j = 0; j &lt; n; j++) {
                if (matrix[i][j] === &#39;1&#39;) {
                    dp[i][j] = (i === 0 || j === 0) ? 1 : 
                        Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
                    maxSide = Math.max(maxSide, dp[i][j]);
                }
            }
        }

        return maxSide * maxSide;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int maximalSquare(char[][] matrix) {
        if (matrix.length == 0 || matrix[0].length == 0) return 0;
        int m = matrix.length;
        int n = matrix[0].length;
        int[][] dp = new int[m][n];

        int maxSide = 0;

        for (int i = 0; i &lt; m; i++) {
            for (int j = 0; j &lt; n; j++) {
                if (matrix[i][j] == &#39;1&#39;) {
                    dp[i][j] = (i == 0 || j == 0) ? 1 : 
                        Math.min(Math.min(dp[i-1][j], dp[i][j-1]), dp[i-1][j-1]) + 1;
                    maxSide = Math.max(maxSide, dp[i][j]);
                }
            }
        }

        return maxSide * maxSide;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -&gt; int:
        if not matrix or not matrix[0]:
            return 0
        m = len(matrix)
        n = len(matrix[0])
        dp = [[0] * n for _ in range(m)]

        max_side = 0

        for i in range(m):
            for j in range(n):
                if matrix[i][j] == &#39;1&#39;:
                    dp[i][j] = 1 if (i == 0 or j == 0) else \\
                        min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
                    max_side = max(max_side, dp[i][j])

        return max_side * max_side
</code></pre></div></div></div><h2 id="⏳-complexity" tabindex="-1">⏳ Complexity <a class="header-anchor" href="#⏳-complexity" aria-label="Permalink to &quot;⏳ Complexity&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody><tr><td><strong>Time</strong></td><td>O(m × n) — We iterate over each cell of the matrix exactly once.</td></tr><tr><td><strong>Space</strong></td><td>O(m × n) — for the <code>dp</code> table.</td></tr><tr><td></td><td>Can be optimized to O(n) — by reusing one row at a time.</td></tr></tbody></table>`,25)]))}const h=a(o,[["render",r]]);export{u as __pageData,h as default};
