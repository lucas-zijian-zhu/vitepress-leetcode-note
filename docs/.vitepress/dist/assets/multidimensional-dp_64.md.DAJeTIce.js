import{_ as t,c as i,o as e,ag as a}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"64. Minimum Path Sum","description":"","frontmatter":{},"headers":[],"relativePath":"multidimensional-dp/64.md","filePath":"multidimensional-dp/64.md"}'),o={name:"multidimensional-dp/64.md"};function l(d,n,r,p,s,c){return e(),i("div",null,n[0]||(n[0]=[a(`<h1 id="_64-minimum-path-sum" tabindex="-1"><a href="https://leetcode.com/problems/minimum-path-sum/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">64. Minimum Path Sum</a> <a class="header-anchor" href="#_64-minimum-path-sum" aria-label="Permalink to &quot;[64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a <code>m x n</code> <code>grid</code> filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.</p><p><strong>Note:</strong> You can only move either down or right at any point in time.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg" style="width:242px;height:242px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: grid = [[1,2,3],[4,5,6]]
Output: 12
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == grid.length</code></li><li><code>n == grid[i].length</code></li><li><code>1 &lt;= m, n &lt;= 200</code></li><li><code>0 &lt;= grid[i][j] &lt;= 200</code></li></ul><h2 id="💡-approach-2d-dynamic-programming" tabindex="-1">💡 Approach: 2D Dynamic Programming <a class="header-anchor" href="#💡-approach-2d-dynamic-programming" aria-label="Permalink to &quot;💡 Approach: 2D Dynamic Programming&quot;">​</a></h2><h3 id="idea" tabindex="-1">Idea <a class="header-anchor" href="#idea" aria-label="Permalink to &quot;Idea&quot;">​</a></h3><ul><li>Define <code>dp[i][j]</code> as the <strong>minimum path sum to reach cell (i, j)</strong>.</li><li>Transition:<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
</code></pre></div></li></ul><p>since you can only come from the cell above or from the left.</p><ul><li>Boundary:</li><li>First row: can only come from the left.</li><li>First column: can only come from the top.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-3wuw4" id="tab-dlVAQvr" checked><label data-title="Kotlin" for="tab-dlVAQvr">Kotlin</label><input type="radio" name="group-3wuw4" id="tab-L6yrwg6"><label data-title="TypeScript" for="tab-L6yrwg6">TypeScript</label><input type="radio" name="group-3wuw4" id="tab-ulZizdy"><label data-title="Java" for="tab-ulZizdy">Java</label><input type="radio" name="group-3wuw4" id="tab-hg4KPdJ"><label data-title="Python" for="tab-hg4KPdJ">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
  fun minPathSum(grid: Array&lt;IntArray&gt;): Int {
      val m = grid.size
      val n = grid[0].size

      val dp = Array(m) { IntArray(n) }
      dp[0][0] = grid[0][0]

      // Initialize first row
      for (j in 1 until n) {
          dp[0][j] = dp[0][j - 1] + grid[0][j]
      }

      // Initialize first column
      for (i in 1 until m) {
          dp[i][0] = dp[i - 1][0] + grid[i][0]
      }

      // Fill in the rest of dp table
      for (i in 1 until m) {
          for (j in 1 until n) {
              dp[i][j] = grid[i][j] + minOf(dp[i - 1][j], dp[i][j - 1])
          }
      }

      return dp[m - 1][n - 1]
  }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function minPathSum(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;

    const dp: number[][] = Array(m).fill(null).map(() =&gt; Array(n).fill(0));
    dp[0][0] = grid[0][0];

    // Initialize first row
    for (let j = 1; j &lt; n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    // Initialize first column
    for (let i = 1; i &lt; m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }

    // Fill in the rest of dp table
    for (let i = 1; i &lt; m; i++) {
        for (let j = 1; j &lt; n; j++) {
            dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }

    return dp[m - 1][n - 1];
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;

        int[][] dp = new int[m][n];
        dp[0][0] = grid[0][0];

        // Initialize first row
        for (int j = 1; j &lt; n; j++) {
            dp[0][j] = dp[0][j - 1] + grid[0][j];
        }

        // Initialize first column
        for (int i = 1; i &lt; m; i++) {
            dp[i][0] = dp[i - 1][0] + grid[i][0];
        }

        // Fill in the rest of dp table
        for (int i = 1; i &lt; m; i++) {
            for (int j = 1; j &lt; n; j++) {
                dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
            }
        }

        return dp[m - 1][n - 1];
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def minPathSum(self, grid: List[List[int]]) -&gt; int:
        m, n = len(grid), len(grid[0])

        dp = [[0] * n for _ in range(m)]
        dp[0][0] = grid[0][0]

        # Initialize first row
        for j in range(1, n):
            dp[0][j] = dp[0][j - 1] + grid[0][j]

        # Initialize first column
        for i in range(1, m):
            dp[i][0] = dp[i - 1][0] + grid[i][0]

        # Fill in the rest of dp table
        for i in range(1, m):
            for j in range(1, n):
                dp[i][j] = grid[i][j] + min(dp[i - 1][j], dp[i][j - 1])

        return dp[m - 1][n - 1]
</code></pre></div></div></div><h1 id="⏱️-time-space-complexity" tabindex="-1">⏱️ Time &amp; Space Complexity <a class="header-anchor" href="#⏱️-time-space-complexity" aria-label="Permalink to &quot;⏱️ Time &amp; Space Complexity&quot;">​</a></h1><table tabindex="0"><thead><tr><th>Complexity Type</th><th>Big-O</th><th>Explanation</th></tr></thead><tbody><tr><td><strong>Time</strong></td><td><code>O(m × n)</code></td><td>Each cell in the <code>m × n</code> grid is visited exactly once</td></tr><tr><td><strong>Space</strong></td><td><code>O(m × n)</code></td><td>A separate <code>dp</code> table of size <code>m × n</code> is used</td></tr></tbody></table><h3 id="notes" tabindex="-1">Notes: <a class="header-anchor" href="#notes" aria-label="Permalink to &quot;Notes:&quot;">​</a></h3><ul><li>If you overwrite the input <code>grid</code> in-place, the extra space can be reduced to <code>O(1)</code>.</li><li>If you only keep one row or column at a time, the space can also be optimized to <code>O(n)</code>.</li></ul>`,20)]))}const g=t(o,[["render",l]]);export{u as __pageData,g as default};
