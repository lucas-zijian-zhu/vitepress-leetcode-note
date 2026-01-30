import{_ as a,c as e,o,ag as t}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"52. N-Queens II","description":"","frontmatter":{},"headers":[],"relativePath":"backtracking/52.md","filePath":"backtracking/52.md"}'),l={name:"backtracking/52.md"};function i(c,n,r,s,d,u){return o(),e("div",null,n[0]||(n[0]=[t(`<h1 id="_52-n-queens-ii" tabindex="-1"><a href="https://leetcode.com/problems/n-queens-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">52. N-Queens II</a> <a class="header-anchor" href="#_52-n-queens-ii" aria-label="Permalink to &quot;[52. N-Queens II](https://leetcode.com/problems/n-queens-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>The <strong>n-queens</strong> puzzle is the problem of placing <code>n</code> queens on an <code>n x n</code> chessboard such that no two queens attack each other.</p><p>Given an integer <code>n</code>, return the number of distinct solutions to the<strong>n-queens puzzle</strong> .</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/queens.jpg" style="width:600px;height:268px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 1
Output: 1
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= n &lt;= 9</code></li></ul><h2 id="💡-approach-backtracking-with-constraint-satisfaction" tabindex="-1">💡 Approach: Backtracking with Constraint Satisfaction <a class="header-anchor" href="#💡-approach-backtracking-with-constraint-satisfaction" aria-label="Permalink to &quot;💡 Approach: Backtracking with Constraint Satisfaction&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>backtracking</strong> problem where we need to count the number of valid solutions for the N-Queens puzzle. Unlike the N-Queens I problem that returns all solutions, this problem only needs the count, which allows for some optimizations.</p><p><strong>Key Rules for N-Queens:</strong></p><ul><li>Place one queen per row</li><li>No two queens can be in the same column</li><li>No two queens can be in the same diagonal (both main and anti-diagonal)</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Use backtracking</strong> to place queens row by row</li><li><strong>Track constraints</strong> efficiently: <ul><li><code>cols</code> array to track used columns</li><li><code>diag1</code> array for main diagonal (row - col = constant)</li><li><code>diag2</code> array for anti-diagonal (row + col = constant)</li></ul></li><li><strong>For each row</strong>, try placing queen in each column</li><li><strong>If placement is valid</strong>, recurse to next row</li><li><strong>Count all valid solutions</strong></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use arrays to track column and diagonal conflicts for O(1) checking</li><li>Main diagonal: row - col = constant (can be negative, offset by n)</li><li>Anti-diagonal: row + col = constant</li><li>Only count solutions, don&#39;t store them</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-x0Vpr" id="tab-kjo5Eeg" checked><label data-title="Kotlin" for="tab-kjo5Eeg">Kotlin</label><input type="radio" name="group-x0Vpr" id="tab-9S7L5aP"><label data-title="TypeScript" for="tab-9S7L5aP">TypeScript</label><input type="radio" name="group-x0Vpr" id="tab-RmA0KiM"><label data-title="Java" for="tab-RmA0KiM">Java</label><input type="radio" name="group-x0Vpr" id="tab-74RYg7U"><label data-title="Python" for="tab-74RYg7U">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun totalNQueens(n: Int): Int {
        val cols = BooleanArray(n)
        val diag1 = BooleanArray(2 * n - 1) // main diagonal
        val diag2 = BooleanArray(2 * n - 1) // anti-diagonal
        
        return backtrack(0, n, cols, diag1, diag2)
    }
    
    private fun backtrack(
        row: Int,
        n: Int,
        cols: BooleanArray,
        diag1: BooleanArray,
        diag2: BooleanArray
    ): Int {
        // Base case: all queens placed
        if (row == n) {
            return 1
        }
        
        var count = 0
        
        // Try placing queen in each column of current row
        for (col in 0 until n) {
            val d1 = row - col + n - 1 // offset to avoid negative index
            val d2 = row + col
            
            if (!cols[col] &amp;&amp; !diag1[d1] &amp;&amp; !diag2[d2]) {
                // Place queen
                cols[col] = true
                diag1[d1] = true
                diag2[d2] = true
                
                // Recurse to next row
                count += backtrack(row + 1, n, cols, diag1, diag2)
                
                // Backtrack
                cols[col] = false
                diag1[d1] = false
                diag2[d2] = false
            }
        }
        
        return count
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function totalNQueens(n: number): number {
    const cols: boolean[] = new Array(n).fill(false);
    const diag1: boolean[] = new Array(2 * n - 1).fill(false); // main diagonal
    const diag2: boolean[] = new Array(2 * n - 1).fill(false); // anti-diagonal
    
    return backtrack(0, n, cols, diag1, diag2);
}

function backtrack(
    row: number,
    n: number,
    cols: boolean[],
    diag1: boolean[],
    diag2: boolean[]
): number {
    // Base case: all queens placed
    if (row === n) {
        return 1;
    }
    
    let count = 0;
    
    // Try placing queen in each column of current row
    for (let col = 0; col &lt; n; col++) {
        const d1 = row - col + n - 1; // offset to avoid negative index
        const d2 = row + col;
        
        if (!cols[col] &amp;&amp; !diag1[d1] &amp;&amp; !diag2[d2]) {
            // Place queen
            cols[col] = true;
            diag1[d1] = true;
            diag2[d2] = true;
            
            // Recurse to next row
            count += backtrack(row + 1, n, cols, diag1, diag2);
            
            // Backtrack
            cols[col] = false;
            diag1[d1] = false;
            diag2[d2] = false;
        }
    }
    
    return count;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int totalNQueens(int n) {
        boolean[] cols = new boolean[n];
        boolean[] diag1 = new boolean[2 * n - 1]; // main diagonal
        boolean[] diag2 = new boolean[2 * n - 1]; // anti-diagonal
        
        return backtrack(0, n, cols, diag1, diag2);
    }
    
    private int backtrack(
        int row,
        int n,
        boolean[] cols,
        boolean[] diag1,
        boolean[] diag2
    ) {
        // Base case: all queens placed
        if (row == n) {
            return 1;
        }
        
        int count = 0;
        
        // Try placing queen in each column of current row
        for (int col = 0; col &lt; n; col++) {
            int d1 = row - col + n - 1; // offset to avoid negative index
            int d2 = row + col;
            
            if (!cols[col] &amp;&amp; !diag1[d1] &amp;&amp; !diag2[d2]) {
                // Place queen
                cols[col] = true;
                diag1[d1] = true;
                diag2[d2] = true;
                
                // Recurse to next row
                count += backtrack(row + 1, n, cols, diag1, diag2);
                
                // Backtrack
                cols[col] = false;
                diag1[d1] = false;
                diag2[d2] = false;
            }
        }
        
        return count;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def totalNQueens(self, n: int) -&gt; int:
        cols = [False] * n
        diag1 = [False] * (2 * n - 1)  # main diagonal
        diag2 = [False] * (2 * n - 1)  # anti-diagonal
        
        return self.backtrack(0, n, cols, diag1, diag2)
    
    def backtrack(self, row: int, n: int, cols: List[bool], diag1: List[bool], diag2: List[bool]) -&gt; int:
        # Base case: all queens placed
        if row == n:
            return 1
        
        count = 0
        
        # Try placing queen in each column of current row
        for col in range(n):
            d1 = row - col + n - 1  # offset to avoid negative index
            d2 = row + col
            
            if not cols[col] and not diag1[d1] and not diag2[d2]:
                # Place queen
                cols[col] = True
                diag1[d1] = True
                diag2[d2] = True
                
                # Recurse to next row
                count += self.backtrack(row + 1, n, cols, diag1, diag2)
                
                # Backtrack
                cols[col] = False
                diag1[d1] = False
                diag2[d2] = False
        
        return count
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(N!) - In worst case, we explore all N! permutations of placing queens, but with pruning it&#39;s much better in practice</li><li><strong>Space Complexity:</strong> O(N) - For the constraint tracking arrays and recursion stack depth</li></ul>`,22)]))}const h=a(l,[["render",i]]);export{g as __pageData,h as default};
