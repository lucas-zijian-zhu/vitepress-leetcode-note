import{_ as e,c as a,o,ag as n}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"120. Triangle","description":"","frontmatter":{},"headers":[],"relativePath":"multidimensional-dp/120.md","filePath":"multidimensional-dp/120.md"}'),i={name:"multidimensional-dp/120.md"};function l(r,t,d,p,s,c){return o(),a("div",null,t[0]||(t[0]=[n(`<h1 id="_120-triangle" tabindex="-1"><a href="https://leetcode.com/problems/triangle/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">120. Triangle</a> <a class="header-anchor" href="#_120-triangle" aria-label="Permalink to &quot;[120. Triangle](https://leetcode.com/problems/triangle/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a <code>triangle</code> array, return the minimum path sum from top to bottom.</p><p>For each step, you may move to an adjacent number of the row below. More formally, if you are on index <code>i</code> on the current row, you may move to either index <code>i</code> or index <code>i + 1</code> on the next row.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: triangle = [[-10]]
Output: -10
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= triangle.length &lt;= 200</code></li><li><code>triangle[0].length == 1</code></li><li><code>triangle[i].length == triangle[i - 1].length + 1</code></li><li><code>-10^4 &lt;= triangle[i][j] &lt;= 10^4</code></li></ul><p><strong>Follow up:</strong> Could youdo this using only <code>O(n)</code> extra space, where <code>n</code> is the total number of rows in the triangle?</p><h1 id="💡-approach-bottom-up-dynamic-programming" tabindex="-1">💡 Approach: Bottom-Up Dynamic Programming <a class="header-anchor" href="#💡-approach-bottom-up-dynamic-programming" aria-label="Permalink to &quot;💡 Approach: Bottom-Up Dynamic Programming&quot;">​</a></h1><h3 id="idea" tabindex="-1">Idea: <a class="header-anchor" href="#idea" aria-label="Permalink to &quot;Idea:&quot;">​</a></h3><ul><li>Start from the <strong>second-to-last row</strong> and move upward.</li><li>At each position <code>(i, j)</code>, you only need to consider its two adjacent elements in the row below: <code>dp[j]</code> and <code>dp[j+1]</code>.</li><li>Update: <code> triangle[i][j] += min(triangle[i+1][j], triangle[i+1][j+1])</code></li><li>After processing, the top element <code>triangle[0][0]</code> (or <code>dp[0]</code>) will hold the minimum path sum.</li></ul><h3 id="why-bottom-up" tabindex="-1">Why Bottom-Up? <a class="header-anchor" href="#why-bottom-up" aria-label="Permalink to &quot;Why Bottom-Up?&quot;">​</a></h3><p>✅ Each element only depends on the two elements directly below it.<br> ✅ Starting from the bottom avoids redundant computations and allows using <code>O(n)</code> space.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-2xKXp" id="tab-zl5xdvY" checked><label data-title="Kotlin" for="tab-zl5xdvY">Kotlin</label><input type="radio" name="group-2xKXp" id="tab-9hB-_UE"><label data-title="TypeScript" for="tab-9hB-_UE">TypeScript</label><input type="radio" name="group-2xKXp" id="tab-o5j6Rqe"><label data-title="Java" for="tab-o5j6Rqe">Java</label><input type="radio" name="group-2xKXp" id="tab-nGRZ_wu"><label data-title="Python" for="tab-nGRZ_wu">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
  fun minimumTotal(triangle: List&lt;List&lt;Int&gt;&gt;): Int {
      val dp = triangle.last().toMutableList() // initialize with the bottom row

      for (i in triangle.size - 2 downTo 0) { // iterate from the second-last row upwards
          for (j in 0..i) {
              dp[j] = triangle[i][j] + minOf(dp[j], dp[j + 1])
          }
      }

      return dp[0]
  }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    minimumTotal(triangle: number[][]): number {
        const dp = [...triangle[triangle.length - 1]]; // initialize with the bottom row

        for (let i = triangle.length - 2; i &gt;= 0; i--) { // iterate from the second-last row upwards
            for (let j = 0; j &lt;= i; j++) {
                dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
            }
        }

        return dp[0];
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int minimumTotal(List&lt;List&lt;Integer&gt;&gt; triangle) {
        List&lt;Integer&gt; dp = new ArrayList&lt;&gt;(triangle.get(triangle.size() - 1)); // initialize with the bottom row

        for (int i = triangle.size() - 2; i &gt;= 0; i--) { // iterate from the second-last row upwards
            for (int j = 0; j &lt;= i; j++) {
                dp.set(j, triangle.get(i).get(j) + Math.min(dp.get(j), dp.get(j + 1)));
            }
        }

        return dp.get(0);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -&gt; int:
        dp = triangle[-1][:]  # initialize with the bottom row

        for i in range(len(triangle) - 2, -1, -1):  # iterate from the second-last row upwards
            for j in range(i + 1):
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])

        return dp[0]
</code></pre></div></div></div><h1 id="⏱️-time-space-complexity" tabindex="-1">⏱️ Time &amp; Space Complexity <a class="header-anchor" href="#⏱️-time-space-complexity" aria-label="Permalink to &quot;⏱️ Time &amp; Space Complexity&quot;">​</a></h1><table tabindex="0"><thead><tr><th>Complexity Type</th><th>Big-O</th><th>Explanation</th></tr></thead><tbody><tr><td><strong>Time</strong></td><td><code>O(n²)</code></td><td>Each of the <code>n</code> rows has up to <code>n</code> elements to process</td></tr><tr><td><strong>Space</strong></td><td><code>O(n)</code></td><td>We only use a 1D <code>dp</code> array of size equal to the bottom row</td></tr></tbody></table><p>Here, <code>n</code> is the number of rows in the triangle.</p>`,21)]))}const h=e(i,[["render",l]]);export{g as __pageData,h as default};
