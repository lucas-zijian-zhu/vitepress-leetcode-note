import{_ as e,c as a,o as n,ag as i}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"48. Rotate Image","description":"","frontmatter":{},"headers":[],"relativePath":"matrix/48.md","filePath":"matrix/48.md"}'),r={name:"matrix/48.md"};function o(l,t,s,p,c,d){return n(),a("div",null,t[0]||(t[0]=[i(`<h1 id="_48-rotate-image" tabindex="-1"><a href="https://leetcode.com/problems/rotate-image/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">48. Rotate Image</a> <a class="header-anchor" href="#_48-rotate-image" aria-label="Permalink to &quot;[48. Rotate Image](https://leetcode.com/problems/rotate-image/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given an <code>n x n</code> 2D <code>matrix</code> representing an image, rotate the image by <strong>90</strong> degrees (clockwise).</p><p>You have to rotate the image <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>in-place</strong></a>, which means you have to modify the input 2D matrix directly. <strong>DO NOT</strong> allocate another 2D matrix and do the rotation.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg" style="width:500px;height:188px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg" style="width:500px;height:201px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>n == matrix.length == matrix[i].length</code></li><li><code>1 &lt;= n &lt;= 20</code></li><li><code>-1000 &lt;= matrix[i][j] &lt;= 1000</code></li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><h3 id="method-1-transpose-reverse-recommended" tabindex="-1">Method 1: Transpose + Reverse (Recommended) <a class="header-anchor" href="#method-1-transpose-reverse-recommended" aria-label="Permalink to &quot;Method 1: Transpose + Reverse (Recommended)&quot;">​</a></h3><ol><li><p><strong>Transpose the matrix</strong></p><ul><li>Flip the matrix along its main diagonal.</li><li>Swap <code>matrix[i][j]</code> with <code>matrix[j][i]</code> for <code>i &lt; j</code>.</li></ul></li><li><p><strong>Reverse each row</strong></p><ul><li>After transposing, reverse each row to complete the 90-degree rotation.</li></ul></li></ol><p><strong>Why it works:</strong></p><ul><li>Transpose converts rows into columns.</li><li>Reversing each row rotates columns into the correct clockwise order.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-kB2qn" id="tab-8mrA4gu" checked><label data-title="Kotlin" for="tab-8mrA4gu">Kotlin</label><input type="radio" name="group-kB2qn" id="tab-US6ab2j"><label data-title="TypeScript" for="tab-US6ab2j">TypeScript</label><input type="radio" name="group-kB2qn" id="tab-bYNjzTb"><label data-title="Java" for="tab-bYNjzTb">Java</label><input type="radio" name="group-kB2qn" id="tab-NRmiFG8"><label data-title="Python" for="tab-NRmiFG8">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun rotate(matrix: Array&lt;IntArray&gt;): Unit {
        val n = matrix.size

        // 1. Transpose the matrix
        for (i in 0 until n) {
            for (j in i + 1 until n) {
                val temp = matrix[i][j]
                matrix[i][j] = matrix[j][i]
                matrix[j][i] = temp
            }
        }

        // 2. Reverse each row
        for (i in 0 until n) {
            var l = 0
            var r = n - 1
            while (l &lt; r) {
                val temp = matrix[i][l]
                matrix[i][l] = matrix[i][r]
                matrix[i][r] = temp
                l++
                r--
            }
        }
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function rotate(matrix: number[][]): void {
    const n = matrix.length;

    // 1. Transpose the matrix
    for (let i = 0; i &lt; n; i++) {
        for (let j = i + 1; j &lt; n; j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    // 2. Reverse each row
    for (let i = 0; i &lt; n; i++) {
        let l = 0;
        let r = n - 1;
        while (l &lt; r) {
            const temp = matrix[i][l];
            matrix[i][l] = matrix[i][r];
            matrix[i][r] = temp;
            l++;
            r--;
        }
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;

        // 1. Transpose the matrix
        for (int i = 0; i &lt; n; i++) {
            for (int j = i + 1; j &lt; n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }

        // 2. Reverse each row
        for (int i = 0; i &lt; n; i++) {
            int l = 0, r = n - 1;
            while (l &lt; r) {
                int temp = matrix[i][l];
                matrix[i][l] = matrix[i][r];
                matrix[i][r] = temp;
                l++;
                r--;
            }
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def rotate(self, matrix: List[List[int]]) -&gt; None:
        n = len(matrix)

        # 1. Transpose the matrix
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

        # 2. Reverse each row
        for i in range(n):
            l, r = 0, n - 1
            while l &lt; r:
                matrix[i][l], matrix[i][r] = matrix[i][r], matrix[i][l]
                l += 1
                r -= 1
</code></pre></div></div></div><p><strong>Complexity:</strong></p><ul><li><strong>Time:</strong> O(n²) — every element is moved once</li><li><strong>Space:</strong> O(1) — in-place rotation</li></ul>`,18)]))}const h=e(r,[["render",o]]);export{g as __pageData,h as default};
