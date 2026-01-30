import{_ as e,c as o,o as n,ag as r}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"54. Spiral Matrix","description":"","frontmatter":{},"headers":[],"relativePath":"matrix/54.md","filePath":"matrix/54.md"}'),a={name:"matrix/54.md"};function i(l,t,s,p,d,c){return n(),o("div",null,t[0]||(t[0]=[r(`<h1 id="_54-spiral-matrix" tabindex="-1"><a href="https://leetcode.com/problems/spiral-matrix/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">54. Spiral Matrix</a> <a class="header-anchor" href="#_54-spiral-matrix" aria-label="Permalink to &quot;[54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an <code>m x n</code> <code>matrix</code>, return all elements of the <code>matrix</code> in spiral order.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg" style="width:242px;height:242px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg" style="width:322px;height:242px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == matrix.length</code></li><li><code>n == matrix[i].length</code></li><li><code>1 &lt;= m, n &lt;= 10</code></li><li><code>-100 &lt;= matrix[i][j] &lt;= 100</code></li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>We need to return all elements of a matrix in <strong>clockwise spiral order</strong>.</p><p><strong>Key Idea: Use four boundary pointers to simulate the spiral traversal.</strong></p><ol><li><p>Define four boundaries:</p><ul><li><code>top = 0</code></li><li><code>bottom = m - 1</code></li><li><code>left = 0</code></li><li><code>right = n - 1</code></li></ul></li><li><p>Traverse the matrix in <strong>4 directions in a loop</strong>:</p><ol><li><strong>Left → Right</strong> along the <code>top</code> row, then <code>top++</code></li><li><strong>Top → Bottom</strong> along the <code>right</code> column, then <code>right--</code></li><li><strong>Right → Left</strong> along the <code>bottom</code> row (if <code>top &lt;= bottom</code>), then <code>bottom--</code></li><li><strong>Bottom → Top</strong> along the <code>left</code> column (if <code>left &lt;= right</code>), then <code>left++</code></li></ol></li><li><p>Stop when the boundaries overlap: <code>top &gt; bottom</code> or <code>left &gt; right</code>.</p></li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-6t-7v" id="tab-o1vULad" checked><label data-title="Kotlin" for="tab-o1vULad">Kotlin</label><input type="radio" name="group-6t-7v" id="tab-FMvR2Bn"><label data-title="TypeScript" for="tab-FMvR2Bn">TypeScript</label><input type="radio" name="group-6t-7v" id="tab-yv0ags0"><label data-title="Java" for="tab-yv0ags0">Java</label><input type="radio" name="group-6t-7v" id="tab-V-guleT"><label data-title="Python" for="tab-V-guleT">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun spiralOrder(matrix: Array&lt;IntArray&gt;): List&lt;Int&gt; {
        val res = mutableListOf&lt;Int&gt;()
        if (matrix.isEmpty()) return res
        
        var top = 0
        var bottom = matrix.size - 1
        var left = 0
        var right = matrix[0].size - 1
        
        while (top &lt;= bottom &amp;&amp; left &lt;= right) {
            // 1. Traverse from left to right
            for (j in left..right) res.add(matrix[top][j])
            top++
            
            // 2. Traverse from top to bottom
            for (i in top..bottom) res.add(matrix[i][right])
            right--
            
            // 3. Traverse from right to left
            if (top &lt;= bottom) {
                for (j in right downTo left) res.add(matrix[bottom][j])
                bottom--
            }
            
            // 4. Traverse from bottom to top
            if (left &lt;= right) {
                for (i in bottom downTo top) res.add(matrix[i][left])
                left++
            }
        }
        
        return res
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    spiralOrder(matrix: number[][]): number[] {
        const res: number[] = [];
        if (matrix.length === 0) return res;
        
        let top = 0;
        let bottom = matrix.length - 1;
        let left = 0;
        let right = matrix[0].length - 1;
        
        while (top &lt;= bottom &amp;&amp; left &lt;= right) {
            // 1. Traverse from left to right
            for (let j = left; j &lt;= right; j++) {
                res.push(matrix[top][j]);
            }
            top++;
            
            // 2. Traverse from top to bottom
            for (let i = top; i &lt;= bottom; i++) {
                res.push(matrix[i][right]);
            }
            right--;
            
            // 3. Traverse from right to left
            if (top &lt;= bottom) {
                for (let j = right; j &gt;= left; j--) {
                    res.push(matrix[bottom][j]);
                }
                bottom--;
            }
            
            // 4. Traverse from bottom to top
            if (left &lt;= right) {
                for (let i = bottom; i &gt;= top; i--) {
                    res.push(matrix[i][left]);
                }
                left++;
            }
        }
        
        return res;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public List&lt;Integer&gt; spiralOrder(int[][] matrix) {
        List&lt;Integer&gt; res = new ArrayList&lt;&gt;();
        if (matrix.length == 0) return res;
        
        int top = 0;
        int bottom = matrix.length - 1;
        int left = 0;
        int right = matrix[0].length - 1;
        
        while (top &lt;= bottom &amp;&amp; left &lt;= right) {
            // 1. Traverse from left to right
            for (int j = left; j &lt;= right; j++) {
                res.add(matrix[top][j]);
            }
            top++;
            
            // 2. Traverse from top to bottom
            for (int i = top; i &lt;= bottom; i++) {
                res.add(matrix[i][right]);
            }
            right--;
            
            // 3. Traverse from right to left
            if (top &lt;= bottom) {
                for (int j = right; j &gt;= left; j--) {
                    res.add(matrix[bottom][j]);
                }
                bottom--;
            }
            
            // 4. Traverse from bottom to top
            if (left &lt;= right) {
                for (int i = bottom; i &gt;= top; i--) {
                    res.add(matrix[i][left]);
                }
                left++;
            }
        }
        
        return res;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -&gt; List[int]:
        res = []
        if not matrix:
            return res
        
        top = 0
        bottom = len(matrix) - 1
        left = 0
        right = len(matrix[0]) - 1
        
        while top &lt;= bottom and left &lt;= right:
            # 1. Traverse from left to right
            for j in range(left, right + 1):
                res.append(matrix[top][j])
            top += 1
            
            # 2. Traverse from top to bottom
            for i in range(top, bottom + 1):
                res.append(matrix[i][right])
            right -= 1
            
            # 3. Traverse from right to left
            if top &lt;= bottom:
                for j in range(right, left - 1, -1):
                    res.append(matrix[bottom][j])
                bottom -= 1
            
            # 4. Traverse from bottom to top
            if left &lt;= right:
                for i in range(bottom, top - 1, -1):
                    res.append(matrix[i][left])
                left += 1
        
        return res
</code></pre></div></div></div><h3 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h3><ul><li><strong>Time Complexity</strong>: <code>O(m*n)</code> — each element visited once</li><li><strong>Space Complexity</strong>: <code>O(1)</code> extra (excluding the output list)</li></ul>`,16)]))}const h=e(a,[["render",i]]);export{g as __pageData,h as default};
