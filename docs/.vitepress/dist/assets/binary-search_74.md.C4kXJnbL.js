import{_ as n,C as i,c as r,o,j as e,ag as l,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"74. Search a 2D Matrix","description":"","frontmatter":{},"headers":[],"relativePath":"binary-search/74.md","filePath":"binary-search/74.md"}'),c={name:"binary-search/74.md"},p={id:"_74-search-a-2d-matrix",tabindex:"-1"};function m(h,t,g,u,x,f){const a=i("Badge");return o(),r("div",null,[e("h1",p,[t[0]||(t[0]=e("a",{href:"https://leetcode.com/problems/search-a-2d-matrix/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"74. Search a 2D Matrix",-1)),s(a,{type:"warning",text:"Medium"}),t[1]||(t[1]=d()),t[2]||(t[2]=e("a",{class:"header-anchor",href:"#_74-search-a-2d-matrix","aria-label":'Permalink to "[74. Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),t[3]||(t[3]=l(`<p>You are given an <code>m x n</code> integer matrix <code>matrix</code> with the following two properties:</p><ul><li>Each row is sorted in non-decreasing order.</li><li>The first integer of each row is greater than the last integer of the previous row.</li></ul><p>Given an integer <code>target</code>, return <code>true</code> if <code>target</code> is in <code>matrix</code> or <code>false</code> otherwise.</p><p>You must write a solution in <code>O(log(m * n))</code> time complexity.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/10/05/mat.jpg" style="width:322px;height:242px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/10/05/mat2.jpg" style="width:322px;height:242px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == matrix.length</code></li><li><code>n == matrix[i].length</code></li><li><code>1 &lt;= m, n &lt;= 100</code></li><li><code>-10^4 &lt;= matrix[i][j], target &lt;= 10^4</code></li></ul><h2 id="💡-approach-binary-search-on-flattened-matrix" tabindex="-1">💡 Approach: Binary Search on Flattened Matrix <a class="header-anchor" href="#💡-approach-binary-search-on-flattened-matrix" aria-label="Permalink to &quot;💡 Approach: Binary Search on Flattened Matrix&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>Since the matrix has two key properties:</p><ol><li>Each row is sorted in non-decreasing order</li><li>The first integer of each row is greater than the last integer of the previous row</li></ol><p>This means we can treat the entire matrix as a <strong>single sorted array</strong> and apply binary search.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Flatten the matrix:</strong> Treat the 2D matrix as a 1D array</li><li><strong>Convert indices:</strong><ul><li>2D position <code>(row, col)</code> → 1D index: <code>row * n + col</code></li><li>1D index → 2D position: <code>row = index / n</code>, <code>col = index % n</code></li></ul></li><li><strong>Apply binary search</strong> on the flattened array</li><li><strong>Compare target</strong> with the element at the calculated 2D position</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Matrix properties allow treating it as a single sorted array</li><li>Index conversion between 1D and 2D coordinates</li><li>Binary search reduces time complexity to O(log(m*n))</li><li>Handle edge cases (empty matrix)</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-T1ahB" id="tab-USN5TIY" checked><label data-title="Kotlin" for="tab-USN5TIY">Kotlin</label><input type="radio" name="group-T1ahB" id="tab-MvQUX0c"><label data-title="TypeScript" for="tab-MvQUX0c">TypeScript</label><input type="radio" name="group-T1ahB" id="tab-8yb4AiQ"><label data-title="Java" for="tab-8yb4AiQ">Java</label><input type="radio" name="group-T1ahB" id="tab-mdKnsMh"><label data-title="Python" for="tab-mdKnsMh">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun searchMatrix(matrix: Array&lt;IntArray&gt;, target: Int): Boolean {
    if (matrix.isEmpty() || matrix[0].isEmpty()) return false
    
    val m = matrix.size
    val n = matrix[0].size
    var left = 0
    var right = m * n - 1
    
    while (left &lt;= right) {
        val mid = left + (right - left) / 2
        val row = mid / n
        val col = mid % n
        
        when {
            matrix[row][col] == target -&gt; return true
            matrix[row][col] &lt; target -&gt; left = mid + 1
            else -&gt; right = mid - 1
        }
    }
    
    return false
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function searchMatrix(matrix: number[][], target: number): boolean {
    if (!matrix.length || !matrix[0].length) return false;
    
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0;
    let right = m * n - 1;
    
    while (left &lt;= right) {
        const mid = left + Math.floor((right - left) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;
        
        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] &lt; target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return false;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return false;
        }
        
        int m = matrix.length;
        int n = matrix[0].length;
        int left = 0;
        int right = m * n - 1;
        
        while (left &lt;= right) {
            int mid = left + (right - left) / 2;
            int row = mid / n;
            int col = mid % n;
            
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] &lt; target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return false;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -&gt; bool:
        if not matrix or not matrix[0]:
            return False
        
        m, n = len(matrix), len(matrix[0])
        left, right = 0, m * n - 1
        
        while left &lt;= right:
            mid = (left + right) // 2
            row, col = divmod(mid, n)
            
            if matrix[row][col] == target:
                return True
            elif matrix[row][col] &lt; target:
                left = mid + 1
            else:
                right = mid - 1
        
        return False
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(log(m * n)), binary search on m*n elements</li><li><strong>Space Complexity:</strong> O(1), constant extra space used</li></ul>`,23))])}const b=n(c,[["render",m]]);export{y as __pageData,b as default};
