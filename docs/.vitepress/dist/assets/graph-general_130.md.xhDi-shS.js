import{_ as e,C as r,c as a,o as s,j as n,ag as i,G as d,a as l}from"./chunks/framework.Bw-5EFTY.js";const v=JSON.parse('{"title":"130. Surrounded Regions","description":"","frontmatter":{},"headers":[],"relativePath":"graph-general/130.md","filePath":"graph-general/130.md"}'),c={name:"graph-general/130.md"},u={id:"_130-surrounded-regions",tabindex:"-1"};function p(g,o,b,h,f,m){const t=r("Badge");return s(),a("div",null,[n("h1",u,[o[0]||(o[0]=n("a",{href:"https://leetcode.com/problems/surrounded-regions/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"130. Surrounded Regions",-1)),d(t,{type:"warning",text:"Medium"}),o[1]||(o[1]=l()),o[2]||(o[2]=n("a",{class:"header-anchor",href:"#_130-surrounded-regions","aria-label":'Permalink to "[130. Surrounded Regions](https://leetcode.com/problems/surrounded-regions/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),o[3]||(o[3]=i(`<p>You are given an <code>m x n</code> matrix <code>board</code> containing <strong>letters</strong> <code>&#39;X&#39;</code> and <code>&#39;O&#39;</code>, <strong>capture regions</strong> that are <strong>surrounded</strong> :</p><ul><li><strong>Connect</strong> : A cell is connected to adjacent cells horizontally or vertically.</li><li><strong>Region</strong> : To form a region <strong>connect every</strong> <code>&#39;O&#39;</code> cell.</li><li><strong>Surround</strong> : The region is surrounded with <code>&#39;X&#39;</code> cells if you can **connect the region ** with <code>&#39;X&#39;</code> cells and none of the region cells are on the edge of the <code>board</code>.</li></ul><p>To capture a <strong>surrounded region</strong> , replace all <code>&#39;O&#39;</code>s with <code>&#39;X&#39;</code>s <strong>in-place</strong> within the original board. You do not need to return anything.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/xogrid.jpg" style="width:367px;height:158px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = [[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;O&quot;,&quot;O&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;X&quot;,&quot;O&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;O&quot;,&quot;X&quot;,&quot;X&quot;]]
Output: [[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;X&quot;,&quot;X&quot;,&quot;X&quot;],[&quot;X&quot;,&quot;O&quot;,&quot;X&quot;,&quot;X&quot;]]
Explanation: The bottom region is not captured because it is on the edge of the board and cannot be surrounded.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = [[&quot;X&quot;]]
Output: [[&quot;X&quot;]]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == board.length</code></li><li><code>n == board[i].length</code></li><li><code>1 &lt;= m, n &lt;= 200</code></li><li><code>board[i][j]</code> is <code>&#39;X&#39;</code> or <code>&#39;O&#39;</code>.</li></ul><h2 id="💡-approach-dfs-from-boundaries" tabindex="-1">💡 Approach: DFS from Boundaries <a class="header-anchor" href="#💡-approach-dfs-from-boundaries" aria-label="Permalink to &quot;💡 Approach: DFS from Boundaries&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>The key insight is that <strong>only &#39;O&#39;s connected to the boundary can survive</strong>. All other &#39;O&#39;s are surrounded and should be captured. We can use a two-step approach:</p><ol><li><strong>Mark boundary-connected &#39;O&#39;s</strong> as temporary markers (e.g., &#39;T&#39;)</li><li><strong>Replace remaining &#39;O&#39;s</strong> with &#39;X&#39; and restore &#39;T&#39;s to &#39;O&#39;</li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Find boundary &#39;O&#39;s</strong> and mark them as &#39;T&#39; using DFS</li><li><strong>Replace all remaining &#39;O&#39;s</strong> with &#39;X&#39; (these are surrounded)</li><li><strong>Restore all &#39;T&#39;s</strong> back to &#39;O&#39; (these are boundary-connected)</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Only boundary-connected &#39;O&#39;s survive</li><li>Use temporary marker to distinguish boundary &#39;O&#39;s</li><li>DFS from all boundary positions</li><li>Two-pass approach: mark then replace</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-LHcld" id="tab-RX-Ut-1" checked><label data-title="Kotlin" for="tab-RX-Ut-1">Kotlin</label><input type="radio" name="group-LHcld" id="tab-QzpoFuM"><label data-title="TypeScript" for="tab-QzpoFuM">TypeScript</label><input type="radio" name="group-LHcld" id="tab-CMM5XrW"><label data-title="Java" for="tab-CMM5XrW">Java</label><input type="radio" name="group-LHcld" id="tab-OV2BvW0"><label data-title="Python" for="tab-OV2BvW0">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun solve(board: Array&lt;CharArray&gt;): Unit {
        if (board.isEmpty()) return
        
        val rows = board.size
        val cols = board[0].size
        
        // Mark boundary-connected &#39;O&#39;s as &#39;T&#39;
        for (i in 0 until rows) {
            for (j in 0 until cols) {
                if ((i == 0 || i == rows - 1 || j == 0 || j == cols - 1) &amp;&amp; board[i][j] == &#39;O&#39;) {
                    dfs(board, i, j)
                }
            }
        }
        
        // Replace remaining &#39;O&#39;s with &#39;X&#39; and restore &#39;T&#39;s to &#39;O&#39;
        for (i in 0 until rows) {
            for (j in 0 until cols) {
                when (board[i][j]) {
                    &#39;O&#39; -&gt; board[i][j] = &#39;X&#39;
                    &#39;T&#39; -&gt; board[i][j] = &#39;O&#39;
                }
            }
        }
    }
    
    private fun dfs(board: Array&lt;CharArray&gt;, r: Int, c: Int) {
        val rows = board.size
        val cols = board[0].size
        
        if (r &lt; 0 || r &gt;= rows || c &lt; 0 || c &gt;= cols || board[r][c] != &#39;O&#39;) {
            return
        }
        
        board[r][c] = &#39;T&#39;
        
        dfs(board, r + 1, c)
        dfs(board, r - 1, c)
        dfs(board, r, c + 1)
        dfs(board, r, c - 1)
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function solve(board: string[][]): void {
    if (board.length === 0) return;
    
    const rows = board.length;
    const cols = board[0].length;
    
    // Mark boundary-connected &#39;O&#39;s as &#39;T&#39;
    for (let i = 0; i &lt; rows; i++) {
        for (let j = 0; j &lt; cols; j++) {
            if ((i === 0 || i === rows - 1 || j === 0 || j === cols - 1) &amp;&amp; board[i][j] === &#39;O&#39;) {
                dfs(board, i, j);
            }
        }
    }
    
    // Replace remaining &#39;O&#39;s with &#39;X&#39; and restore &#39;T&#39;s to &#39;O&#39;
    for (let i = 0; i &lt; rows; i++) {
        for (let j = 0; j &lt; cols; j++) {
            if (board[i][j] === &#39;O&#39;) {
                board[i][j] = &#39;X&#39;;
            } else if (board[i][j] === &#39;T&#39;) {
                board[i][j] = &#39;O&#39;;
            }
        }
    }
}

function dfs(board: string[][], r: number, c: number): void {
    const rows = board.length;
    const cols = board[0].length;
    
    if (r &lt; 0 || r &gt;= rows || c &lt; 0 || c &gt;= cols || board[r][c] !== &#39;O&#39;) {
        return;
    }
    
    board[r][c] = &#39;T&#39;;
    
    dfs(board, r + 1, c);
    dfs(board, r - 1, c);
    dfs(board, r, c + 1);
    dfs(board, r, c - 1);
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public void solve(char[][] board) {
        if (board.length == 0) return;
        
        int rows = board.length;
        int cols = board[0].length;
        
        // Mark boundary-connected &#39;O&#39;s as &#39;T&#39;
        for (int i = 0; i &lt; rows; i++) {
            for (int j = 0; j &lt; cols; j++) {
                if ((i == 0 || i == rows - 1 || j == 0 || j == cols - 1) &amp;&amp; board[i][j] == &#39;O&#39;) {
                    dfs(board, i, j);
                }
            }
        }
        
        // Replace remaining &#39;O&#39;s with &#39;X&#39; and restore &#39;T&#39;s to &#39;O&#39;
        for (int i = 0; i &lt; rows; i++) {
            for (int j = 0; j &lt; cols; j++) {
                if (board[i][j] == &#39;O&#39;) {
                    board[i][j] = &#39;X&#39;;
                } else if (board[i][j] == &#39;T&#39;) {
                    board[i][j] = &#39;O&#39;;
                }
            }
        }
    }
    
    private void dfs(char[][] board, int r, int c) {
        int rows = board.length;
        int cols = board[0].length;
        
        if (r &lt; 0 || r &gt;= rows || c &lt; 0 || c &gt;= cols || board[r][c] != &#39;O&#39;) {
            return;
        }
        
        board[r][c] = &#39;T&#39;;
        
        dfs(board, r + 1, c);
        dfs(board, r - 1, c);
        dfs(board, r, c + 1);
        dfs(board, r, c - 1);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def solve(self, board: List[List[str]]) -&gt; None:
        if not board:
            return
        
        rows, cols = len(board), len(board[0])
        
        # Mark boundary-connected &#39;O&#39;s as &#39;T&#39;
        for i in range(rows):
            for j in range(cols):
                if ((i == 0 or i == rows - 1 or j == 0 or j == cols - 1) and board[i][j] == &#39;O&#39;):
                    self.dfs(board, i, j)
        
        # Replace remaining &#39;O&#39;s with &#39;X&#39; and restore &#39;T&#39;s to &#39;O&#39;
        for i in range(rows):
            for j in range(cols):
                if board[i][j] == &#39;O&#39;:
                    board[i][j] = &#39;X&#39;
                elif board[i][j] == &#39;T&#39;:
                    board[i][j] = &#39;O&#39;
    
    def dfs(self, board: List[List[str]], r: int, c: int) -&gt; None:
        rows, cols = len(board), len(board[0])
        
        if r &lt; 0 or r &gt;= rows or c &lt; 0 or c &gt;= cols or board[r][c] != &#39;O&#39;:
            return
        
        board[r][c] = &#39;T&#39;
        
        self.dfs(board, r + 1, c)
        self.dfs(board, r - 1, c)
        self.dfs(board, r, c + 1)
        self.dfs(board, r, c - 1)
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(m × n), where m is the number of rows and n is the number of columns. We visit each cell at most once.</li><li><strong>Space Complexity:</strong> O(m × n) in the worst case for the recursion stack (if the entire boundary is filled with &#39;O&#39;s).</li></ul>`,21))])}const y=e(c,[["render",p]]);export{v as __pageData,y as default};
