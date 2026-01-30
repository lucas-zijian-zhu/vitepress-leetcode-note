import{_ as n,c as t,o as i,ag as o}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"73. Set Matrix Zeroes","description":"","frontmatter":{},"headers":[],"relativePath":"matrix/73.md","filePath":"matrix/73.md"}'),a={name:"matrix/73.md"};function r(s,e,l,c,d,m){return i(),t("div",null,e[0]||(e[0]=[o(`<h1 id="_73-set-matrix-zeroes" tabindex="-1"><a href="https://leetcode.com/problems/set-matrix-zeroes/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">73. Set Matrix Zeroes</a> <a class="header-anchor" href="#_73-set-matrix-zeroes" aria-label="Permalink to &quot;[73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an <code>m x n</code> integer matrix <code>matrix</code>, if an element is <code>0</code>, set its entire row and column to <code>0</code>&#39;s.</p><p>You must do it <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank">in place</a>.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/08/17/mat1.jpg" style="width:450px;height:169px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/08/17/mat2.jpg" style="width:450px;height:137px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == matrix.length</code></li><li><code>n == matrix[0].length</code></li><li><code>1 &lt;= m, n &lt;= 200</code></li><li><code>-2^31 &lt;= matrix[i][j] &lt;= 2^31 - 1</code></li></ul><p><strong>Follow up:</strong></p><ul><li>A straightforward solution using <code>O(mn)</code> space is probably a bad idea.</li><li>A simple improvement uses <code>O(m + n)</code> space, but still not the best solution.</li><li>Could you devise a constant space solution?</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><h3 id="key-idea" tabindex="-1">Key Idea <a class="header-anchor" href="#key-idea" aria-label="Permalink to &quot;Key Idea&quot;">​</a></h3><p>We need to mark which rows and columns should become <code>0</code> without using extra space.</p><ol><li><strong>Use the first row and first column as markers</strong>: <ul><li>If any element <code>matrix[i][j]</code> is <code>0</code>, mark its row and column by setting: <ul><li><code>matrix[i][0] = 0</code></li><li><code>matrix[0][j] = 0</code></li></ul></li></ul></li><li><strong>Handle first row and first column separately</strong>: <ul><li>Before marking, check if the first row or first column originally contains a <code>0</code>.</li></ul></li><li><strong>Second pass to set zeros</strong>: <ul><li>Iterate from <code>(1,1)</code> to <code>(m-1,n-1)</code>.</li><li>If the corresponding row/col marker is <code>0</code>, set <code>matrix[i][j] = 0</code>.</li></ul></li><li><strong>Finally handle the first row and first column</strong> if they need to be zeroed.</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-VBP3_" id="tab-h0nC8za" checked><label data-title="Kotlin" for="tab-h0nC8za">Kotlin</label><input type="radio" name="group-VBP3_" id="tab-Tnmx1IV"><label data-title="TypeScript" for="tab-Tnmx1IV">TypeScript</label><input type="radio" name="group-VBP3_" id="tab-BK7Hsl-"><label data-title="Java" for="tab-BK7Hsl-">Java</label><input type="radio" name="group-VBP3_" id="tab-Cwoae6w"><label data-title="Python" for="tab-Cwoae6w">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun setZeroes(matrix: Array&lt;IntArray&gt;) {
        val m = matrix.size
        val n = matrix[0].size

        var firstRowZero = false
        var firstColZero = false

        // Check if first row has any zero
        for (j in 0 until n) {
            if (matrix[0][j] == 0) {
                firstRowZero = true
                break
            }
        }

        // Check if first column has any zero
        for (i in 0 until m) {
            if (matrix[i][0] == 0) {
                firstColZero = true
                break
            }
        }

        // Use first row and column as markers
        for (i in 1 until m) {
            for (j in 1 until n) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0
                    matrix[0][j] = 0
                }
            }
        }

        // Set zeroes based on markers
        for (i in 1 until m) {
            for (j in 1 until n) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0
                }
            }
        }

        // Zero out the first row if needed
        if (firstRowZero) {
            for (j in 0 until n) {
                matrix[0][j] = 0
            }
        }

        // Zero out the first column if needed
        if (firstColZero) {
            for (i in 0 until m) {
                matrix[i][0] = 0
            }
        }
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    setZeroes(matrix: number[][]): void {
        const m = matrix.length;
        const n = matrix[0].length;

        let firstRowZero = false;
        let firstColZero = false;

        // Check if first row has any zero
        for (let j = 0; j &lt; n; j++) {
            if (matrix[0][j] === 0) {
                firstRowZero = true;
                break;
            }
        }

        // Check if first column has any zero
        for (let i = 0; i &lt; m; i++) {
            if (matrix[i][0] === 0) {
                firstColZero = true;
                break;
            }
        }

        // Use first row and column as markers
        for (let i = 1; i &lt; m; i++) {
            for (let j = 1; j &lt; n; j++) {
                if (matrix[i][j] === 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // Set zeroes based on markers
        for (let i = 1; i &lt; m; i++) {
            for (let j = 1; j &lt; n; j++) {
                if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        // Zero out the first row if needed
        if (firstRowZero) {
            for (let j = 0; j &lt; n; j++) {
                matrix[0][j] = 0;
            }
        }

        // Zero out the first column if needed
        if (firstColZero) {
            for (let i = 0; i &lt; m; i++) {
                matrix[i][0] = 0;
            }
        }
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;

        boolean firstRowZero = false;
        boolean firstColZero = false;

        // Check if first row has any zero
        for (int j = 0; j &lt; n; j++) {
            if (matrix[0][j] == 0) {
                firstRowZero = true;
                break;
            }
        }

        // Check if first column has any zero
        for (int i = 0; i &lt; m; i++) {
            if (matrix[i][0] == 0) {
                firstColZero = true;
                break;
            }
        }

        // Use first row and column as markers
        for (int i = 1; i &lt; m; i++) {
            for (int j = 1; j &lt; n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // Set zeroes based on markers
        for (int i = 1; i &lt; m; i++) {
            for (int j = 1; j &lt; n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        // Zero out the first row if needed
        if (firstRowZero) {
            for (int j = 0; j &lt; n; j++) {
                matrix[0][j] = 0;
            }
        }

        // Zero out the first column if needed
        if (firstColZero) {
            for (int i = 0; i &lt; m; i++) {
                matrix[i][0] = 0;
            }
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def setZeroes(self, matrix: List[List[int]]) -&gt; None:
        m = len(matrix)
        n = len(matrix[0])

        first_row_zero = False
        first_col_zero = False

        # Check if first row has any zero
        for j in range(n):
            if matrix[0][j] == 0:
                first_row_zero = True
                break

        # Check if first column has any zero
        for i in range(m):
            if matrix[i][0] == 0:
                first_col_zero = True
                break

        # Use first row and column as markers
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0
                    matrix[0][j] = 0

        # Set zeroes based on markers
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0

        # Zero out the first row if needed
        if first_row_zero:
            for j in range(n):
                matrix[0][j] = 0

        # Zero out the first column if needed
        if first_col_zero:
            for i in range(m):
                matrix[i][0] = 0
</code></pre></div></div></div><h3 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h3><ul><li><strong>Time Complexity</strong>: <code>O(m * n)</code></li><li><strong>Space Complexity</strong>: <code>O(1)</code> (excluding the input matrix)</li></ul>`,19)]))}const u=n(a,[["render",r]]);export{f as __pageData,u as default};
