import{_ as t,c as u,o as e,ag as n}from"./chunks/framework.Bw-5EFTY.js";const p=JSON.parse('{"title":"36. Valid Sudoku","description":"","frontmatter":{},"headers":[],"relativePath":"matrix/36.md","filePath":"matrix/36.md"}'),q={name:"matrix/36.md"};function a(i,o,l,d,s,r){return e(),u("div",null,o[0]||(o[0]=[n(`<h1 id="_36-valid-sudoku" tabindex="-1"><a href="https://leetcode.com/problems/valid-sudoku/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">36. Valid Sudoku</a> <a class="header-anchor" href="#_36-valid-sudoku" aria-label="Permalink to &quot;[36. Valid Sudoku](https://leetcode.com/problems/valid-sudoku/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Determine if a<code>9 x 9</code> Sudoku boardis valid.Only the filled cells need to be validated<strong>according to the following rules</strong> :</p><ul><li>Each rowmust contain thedigits<code>1-9</code> without repetition.</li><li>Each column must contain the digits<code>1-9</code>without repetition.</li><li>Each of the nine<code>3 x 3</code> sub-boxes of the grid must contain the digits<code>1-9</code>without repetition.</li></ul><p><strong>Note:</strong></p><ul><li>A Sudoku board (partially filled) could be valid but is not necessarily solvable.</li><li>Only the filled cells need to be validated according to the mentionedrules.</li></ul><p><strong>Example 1:</strong><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png" style="height:250px;width:250px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = 
[[&quot;5&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]
,[&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]
,[&quot;.&quot;,&quot;9&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;]
,[&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;3&quot;]
,[&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;]
,[&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;]
,[&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;8&quot;,&quot;.&quot;]
,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;]
,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;9&quot;]]
Output: true
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = 
[[&quot;8&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]
,[&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;,&quot;9&quot;,&quot;5&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;]
,[&quot;.&quot;,&quot;9&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;]
,[&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;3&quot;]
,[&quot;4&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;3&quot;,&quot;.&quot;,&quot;.&quot;,&quot;1&quot;]
,[&quot;7&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;6&quot;]
,[&quot;.&quot;,&quot;6&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;2&quot;,&quot;8&quot;,&quot;.&quot;]
,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;4&quot;,&quot;1&quot;,&quot;9&quot;,&quot;.&quot;,&quot;.&quot;,&quot;5&quot;]
,[&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;.&quot;,&quot;8&quot;,&quot;.&quot;,&quot;.&quot;,&quot;7&quot;,&quot;9&quot;]]
Output: false
Explanation: Same as Example 1, except with the **5**  in the top left corner being modified to **8** . Since there are two 8&#39;s in the top left 3x3 sub-box, it is invalid.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>board.length == 9</code></li><li><code>board[i].length == 9</code></li><li><code>board[i][j]</code> is a digit <code>1-9</code> or <code>&#39;.&#39;</code>.</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>We can validate the Sudoku board using a <strong>HashSet</strong> to track whether a number has already appeared in its row, column, or 3×3 sub-box.</p><ol><li><strong>Iterate through each cell <code>(i, j)</code></strong> in the 9×9 board.</li><li><strong>Skip empty cells</strong> denoted by <code>&#39;.&#39;</code>.</li><li><strong>For each number <code>num</code>:</strong><ul><li>Check if it already exists in: <ol><li>Row <code>i</code></li><li>Column <code>j</code></li><li>3×3 sub-box <code>(i / 3, j / 3)</code></li></ol></li></ul></li><li><strong>Encode the check as strings</strong> and store in a single HashSet: <ul><li><code>&quot;num in row i&quot;</code></li><li><code>&quot;num in col j&quot;</code></li><li><code>&quot;num in box i/3-j/3&quot;</code></li></ul></li><li><strong>If any insertion fails</strong> (duplicate found), return <code>false</code>.</li><li><strong>If the whole board is scanned</strong> without conflict, return <code>true</code>.</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-bvkxn" id="tab-E_p6we9" checked><label data-title="Kotlin" for="tab-E_p6we9">Kotlin</label><input type="radio" name="group-bvkxn" id="tab-oV1WW4T"><label data-title="TypeScript" for="tab-oV1WW4T">TypeScript</label><input type="radio" name="group-bvkxn" id="tab-DXzxHPk"><label data-title="Java" for="tab-DXzxHPk">Java</label><input type="radio" name="group-bvkxn" id="tab-Dhpdstg"><label data-title="Python" for="tab-Dhpdstg">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun isValidSudoku(board: Array&lt;CharArray&gt;): Boolean {
        val seen = HashSet&lt;String&gt;()
        for (i in 0..8) {
            for (j in 0..8) {
                val num = board[i][j]
                if (num == &#39;.&#39;) continue
                if (!seen.add(&quot;$num in row $i&quot;) ||
                    !seen.add(&quot;$num in col $j&quot;) ||
                    !seen.add(&quot;$num in box \${i/3}-\${j/3}&quot;)) {
                    return false
                }
            }
        }
        return true
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function isValidSudoku(board: string[][]): boolean {
    const seen = new Set&lt;string&gt;();
    
    for (let i = 0; i &lt; 9; i++) {
        for (let j = 0; j &lt; 9; j++) {
            const num = board[i][j];
            if (num === &#39;.&#39;) continue;
            
            if (!seen.add(\`\${num} in row \${i}\`) ||
                !seen.add(\`\${num} in col \${j}\`) ||
                !seen.add(\`\${num} in box \${Math.floor(i/3)}-\${Math.floor(j/3)}\`)) {
                return false;
            }
        }
    }
    
    return true;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean isValidSudoku(char[][] board) {
        Set&lt;String&gt; seen = new HashSet&lt;&gt;();
        
        for (int i = 0; i &lt; 9; i++) {
            for (int j = 0; j &lt; 9; j++) {
                char num = board[i][j];
                if (num == &#39;.&#39;) continue;
                
                if (!seen.add(num + &quot; in row &quot; + i) ||
                    !seen.add(num + &quot; in col &quot; + j) ||
                    !seen.add(num + &quot; in box &quot; + i/3 + &quot;-&quot; + j/3)) {
                    return false;
                }
            }
        }
        
        return true;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def isValidSudoku(self, board: List[List[str]]) -&gt; bool:
        seen = set()
        
        for i in range(9):
            for j in range(9):
                num = board[i][j]
                if num == &#39;.&#39;:
                    continue
                
                if (not seen.add(f&quot;{num} in row {i}&quot;) or
                    not seen.add(f&quot;{num} in col {j}&quot;) or
                    not seen.add(f&quot;{num} in box {i//3}-{j//3}&quot;)):
                    return False
        
        return True
</code></pre></div></div></div><h3 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h3><ul><li><strong>Time Complexity:</strong> <code>O(1)</code> → 81 cells fixed for 9x9 board</li><li><strong>Space Complexity:</strong> <code>O(1)</code> → At most 81×3 entries in HashSet</li></ul>`,18)]))}const g=t(q,[["render",a]]);export{p as __pageData,g as default};
