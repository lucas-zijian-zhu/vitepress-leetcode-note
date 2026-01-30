import{_ as t,c as n,o as a,ag as i}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"63. Unique Paths II","description":"","frontmatter":{},"headers":[],"relativePath":"multidimensional-dp/63.md","filePath":"multidimensional-dp/63.md"}'),o={name:"multidimensional-dp/63.md"};function l(s,e,d,r,c,p){return a(),n("div",null,e[0]||(e[0]=[i(`<h1 id="_63-unique-paths-ii" tabindex="-1"><a href="https://leetcode.com/problems/unique-paths-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">63. Unique Paths II</a> <a class="header-anchor" href="#_63-unique-paths-ii" aria-label="Permalink to &quot;[63. Unique Paths II](https://leetcode.com/problems/unique-paths-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given an <code>m x n</code> integer array <code>grid</code>. There is a robot initially located at the <b>top-left corner</b> (i.e., <code>grid[0][0]</code>). The robot tries to move to the <strong>bottom-right corner</strong> (i.e., <code>grid[m - 1][n - 1]</code>). The robot can only move either down or right at any point in time.</p><p>An obstacle and space are marked as <code>1</code> or <code>0</code> respectively in <code>grid</code>. A path that the robot takes cannot include <strong>any</strong> square that is an obstacle.</p><p>Return the number of possible unique paths that the robot can take to reach the bottom-right corner.</p><p>The testcases are generated so that the answer will be less than or equal to <code>2 * 10^9</code>.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg" style="width:242px;height:242px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -&gt; Right -&gt; Down -&gt; Down
2. Down -&gt; Down -&gt; Right -&gt; Right
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/04/robot2.jpg" style="width:162px;height:162px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: obstacleGrid = [[0,1],[0,0]]
Output: 1
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == obstacleGrid.length</code></li><li><code>n == obstacleGrid[i].length</code></li><li><code>1 &lt;= m, n &lt;= 100</code></li><li><code>obstacleGrid[i][j]</code> is <code>0</code> or <code>1</code>.</li></ul><h2 id="🚀-approach" tabindex="-1">🚀 Approach <a class="header-anchor" href="#🚀-approach" aria-label="Permalink to &quot;🚀 Approach&quot;">​</a></h2><p>We use <strong>Dynamic Programming (DP)</strong> to solve this.</p><ul><li>Define <code>dp[i][j]</code> as the number of unique paths to cell <code>(i,j)</code>.</li><li>If <code>obstacleGrid[i][j] == 1</code>, we cannot pass through this cell → set <code>dp[i][j] = 0</code>.</li><li>Otherwise: <ul><li>If <code>i == 0</code> and <code>j == 0</code> (start point), <code>dp[0][0] = 1</code>.</li><li>If <code>i &gt; 0</code>, we can come from above → add <code>dp[i-1][j]</code>.</li><li>If <code>j &gt; 0</code>, we can come from left → add <code>dp[i][j-1]</code>.</li></ul></li><li>Finally return <code>dp[m-1][n-1]</code>.</li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-VDJqT" id="tab-_c4S60y" checked><label data-title="Kotlin" for="tab-_c4S60y">Kotlin</label><input type="radio" name="group-VDJqT" id="tab-l7hNLJE"><label data-title="TypeScript" for="tab-l7hNLJE">TypeScript</label><input type="radio" name="group-VDJqT" id="tab-Vfu_r1p"><label data-title="Java" for="tab-Vfu_r1p">Java</label><input type="radio" name="group-VDJqT" id="tab-0cwgnqz"><label data-title="Python" for="tab-0cwgnqz">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun uniquePathsWithObstacles(obstacleGrid: Array&lt;IntArray&gt;): Int {
        val m = obstacleGrid.size
        val n = obstacleGrid[0].size

        if (obstacleGrid[0][0] == 1 || obstacleGrid[m-1][n-1] == 1) return 0

        val dp = Array(m) { IntArray(n) }
        dp[0][0] = 1

        for (i in 0 until m) {
            for (j in 0 until n) {
                if (obstacleGrid[i][j] == 1) {
                    dp[i][j] = 0
                } else {
                    if (i &gt; 0) dp[i][j] += dp[i - 1][j]
                    if (j &gt; 0) dp[i][j] += dp[i][j - 1]
                }
            }
        }

        return dp[m-1][n-1]
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    uniquePathsWithObstacles(obstacleGrid: number[][]): number {
        const m = obstacleGrid.length;
        const n = obstacleGrid[0].length;

        if (obstacleGrid[0][0] === 1 || obstacleGrid[m-1][n-1] === 1) return 0;

        const dp = Array(m).fill(null).map(() =&gt; Array(n).fill(0));
        dp[0][0] = 1;

        for (let i = 0; i &lt; m; i++) {
            for (let j = 0; j &lt; n; j++) {
                if (obstacleGrid[i][j] === 1) {
                    dp[i][j] = 0;
                } else {
                    if (i &gt; 0) dp[i][j] += dp[i - 1][j];
                    if (j &gt; 0) dp[i][j] += dp[i][j - 1];
                }
            }
        }

        return dp[m-1][n-1];
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int m = obstacleGrid.length;
        int n = obstacleGrid[0].length;

        if (obstacleGrid[0][0] == 1 || obstacleGrid[m-1][n-1] == 1) return 0;

        int[][] dp = new int[m][n];
        dp[0][0] = 1;

        for (int i = 0; i &lt; m; i++) {
            for (int j = 0; j &lt; n; j++) {
                if (obstacleGrid[i][j] == 1) {
                    dp[i][j] = 0;
                } else {
                    if (i &gt; 0) dp[i][j] += dp[i - 1][j];
                    if (j &gt; 0) dp[i][j] += dp[i][j - 1];
                }
            }
        }

        return dp[m-1][n-1];
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -&gt; int:
        m = len(obstacleGrid)
        n = len(obstacleGrid[0])

        if obstacleGrid[0][0] == 1 or obstacleGrid[m-1][n-1] == 1:
            return 0

        dp = [[0] * n for _ in range(m)]
        dp[0][0] = 1

        for i in range(m):
            for j in range(n):
                if obstacleGrid[i][j] == 1:
                    dp[i][j] = 0
                else:
                    if i &gt; 0:
                        dp[i][j] += dp[i - 1][j]
                    if j &gt; 0:
                        dp[i][j] += dp[i][j - 1]

        return dp[m-1][n-1]
</code></pre></div></div></div><h2 id="⏳-complexity-analysis" tabindex="-1">⏳ Complexity Analysis <a class="header-anchor" href="#⏳-complexity-analysis" aria-label="Permalink to &quot;⏳ Complexity Analysis&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Metric</th><th>Complexity</th></tr></thead><tbody><tr><td>🕒 <strong>Time Complexity</strong></td><td>O(m * n)</td></tr><tr><td>💾 <strong>Space Complexity</strong></td><td>O(m * n)</td></tr></tbody></table>`,19)]))}const g=t(o,[["render",l]]);export{u as __pageData,g as default};
