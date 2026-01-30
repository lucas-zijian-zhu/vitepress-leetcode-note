import{_ as n,c as t,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"289. Game of Life","description":"","frontmatter":{},"headers":[],"relativePath":"matrix/289.md","filePath":"matrix/289.md"}'),i={name:"matrix/289.md"};function r(l,e,s,c,d,p){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="_289-game-of-life" tabindex="-1"><a href="https://leetcode.com/problems/game-of-life/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">289. Game of Life</a> <a class="header-anchor" href="#_289-game-of-life" aria-label="Permalink to &quot;[289. Game of Life](https://leetcode.com/problems/game-of-life/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>According to <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Wikipedia&#39;s article</a>: &quot;The <b>Game of Life</b>, also known simply as <b>Life</b>, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.&quot;</p><p>The board is made up of an <code>m x n</code> grid of cells, where each cell has an initial state: <b>live</b> (represented by a <code>1</code>) or <b>dead</b> (represented by a <code>0</code>). Each cell interacts with its <a href="https://en.wikipedia.org/wiki/Moore_neighborhood" target="_blank">eight neighbors</a> (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):</p><ul><li>Any live cell with fewer than two live neighbors dies as if caused by under-population.</li><li>Any live cell with two or three live neighbors lives on to the next generation.</li><li>Any live cell with more than three live neighbors dies, as if by over-population.</li><li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li></ul><p>The next state of the board is determined by applying the above rules simultaneously to every cell in the current state of the <code>m x n</code> grid <code>board</code>. In this process, births and deaths occur <strong>simultaneously</strong> .</p><p>Given the current state of the <code>board</code>, <strong>update</strong> the <code>board</code> to reflect its next state.</p><p><strong>Note</strong> that you do not need to return anything.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/12/26/grid1.jpg" style="width:562px;height:322px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/12/26/grid2.jpg" style="width:402px;height:162px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = [[1,1],[1,0]]
Output: [[1,1],[1,1]]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == board.length</code></li><li><code>n == board[i].length</code></li><li><code>1 &lt;= m, n &lt;= 25</code></li><li><code>board[i][j]</code> is <code>0</code> or <code>1</code>.</li></ul><p><strong>Follow up:</strong></p><ul><li>Could you solve it in-place? Remember that the board needs to be updated simultaneously: You cannot update some cells first and then use their updated values to update other cells.</li><li>In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches upon the border of the array (i.e., live cells reach the border). How would you address these problems?</li></ul><h2 id="approach-o-1-extra-space-in-place-update" tabindex="-1">Approach (O(1) extra space, in-place update) <a class="header-anchor" href="#approach-o-1-extra-space-in-place-update" aria-label="Permalink to &quot;Approach (O(1) extra space, in-place update)&quot;">​</a></h2><p>We can store both the <strong>current state</strong> and the <strong>next state</strong> in each cell&#39;s integer using different bits:</p><ul><li><strong>Bit 0</strong> (<code>&amp; 1</code>): current state (0 = dead, 1 = live)</li><li><strong>Bit 1</strong> (<code>&amp; 2</code>): next state (0 = dead, 1 = live)</li></ul><h3 id="steps" tabindex="-1">Steps: <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps:&quot;">​</a></h3><ol><li><strong>First pass</strong>: Count the number of live neighbors for each cell (use <code>&amp; 1</code> to read only the current state). <ul><li>Rules: <ul><li>Live cell: stays alive if it has 2 or 3 live neighbors → set bit 1.</li><li>Dead cell: becomes alive if it has exactly 3 live neighbors → set bit 1.</li></ul></li><li>Setting next state: <code>board[r][c] |= 2</code></li></ul></li><li><strong>Second pass</strong>: Right shift each cell by 1 (<code>&gt;&gt; 1</code>) to make the next state the current state.</li></ol><h3 id="complexity" tabindex="-1">Complexity: <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity:&quot;">​</a></h3><ul><li><strong>Time</strong>: <code>O(m * n)</code></li><li><strong>Space</strong>: <code>O(1)</code> (in-place, constant extra variables)</li></ul><h3 id="common-pitfalls" tabindex="-1">Common pitfalls: <a class="header-anchor" href="#common-pitfalls" aria-label="Permalink to &quot;Common pitfalls:&quot;">​</a></h3><ul><li>Only read the <strong>current state</strong> when counting neighbors (<code>&amp; 1</code>).</li><li>Handle boundary conditions carefully.</li><li>Don’t forget the second pass to apply the next state.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-3XvY7" id="tab--kSJx2A" checked><label data-title="Kotlin" for="tab--kSJx2A">Kotlin</label><input type="radio" name="group-3XvY7" id="tab-n5LzYDC"><label data-title="TypeScript" for="tab-n5LzYDC">TypeScript</label><input type="radio" name="group-3XvY7" id="tab-Ky7dNkR"><label data-title="Java" for="tab-Ky7dNkR">Java</label><input type="radio" name="group-3XvY7" id="tab-aU03xRS"><label data-title="Python" for="tab-aU03xRS">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun gameOfLife(board: Array&lt;IntArray&gt;): Unit {
        val m = board.size
        if (m == 0) return
        val n = board[0].size
        val dirs = intArrayOf(-1, 0, 1)

        fun liveNeighbors(r: Int, c: Int): Int {
            var cnt = 0
            for (dr in dirs) {
                for (dc in dirs) {
                    if (dr == 0 &amp;&amp; dc == 0) continue
                    val nr = r + dr
                    val nc = c + dc
                    if (nr in 0 until m &amp;&amp; nc in 0 until n) {
                        cnt += (board[nr][nc] and 1)
                    }
                }
            }
            return cnt
        }

        // First pass: determine next state in bit 1
        for (r in 0 until m) {
            for (c in 0 until n) {
                val live = board[r][c] and 1
                val ln = liveNeighbors(r, c)
                if (live == 1 &amp;&amp; (ln == 2 || ln == 3)) {
                    board[r][c] = board[r][c] or 2
                } else if (live == 0 &amp;&amp; ln == 3) {
                    board[r][c] = board[r][c] or 2
                }
            }
        }
        // Second pass: apply next state
        for (r in 0 until m) {
            for (c in 0 until n) {
                board[r][c] = board[r][c] shr 1
            }
        }
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    gameOfLife(board: number[][]): void {
        const m = board.length;
        if (m === 0) return;
        const n = board[0].length;
        const dirs = [-1, 0, 1];

        const liveNeighbors = (r: number, c: number): number =&gt; {
            let cnt = 0;
            for (const dr of dirs) {
                for (const dc of dirs) {
                    if (dr === 0 &amp;&amp; dc === 0) continue;
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr &gt;= 0 &amp;&amp; nr &lt; m &amp;&amp; nc &gt;= 0 &amp;&amp; nc &lt; n) {
                        cnt += (board[nr][nc] &amp; 1);
                    }
                }
            }
            return cnt;
        };

        // First pass: determine next state in bit 1
        for (let r = 0; r &lt; m; r++) {
            for (let c = 0; c &lt; n; c++) {
                const live = board[r][c] &amp; 1;
                const ln = liveNeighbors(r, c);
                if (live === 1 &amp;&amp; (ln === 2 || ln === 3)) {
                    board[r][c] |= 2;
                } else if (live === 0 &amp;&amp; ln === 3) {
                    board[r][c] |= 2;
                }
            }
        }
        
        // Second pass: apply next state
        for (let r = 0; r &lt; m; r++) {
            for (let c = 0; c &lt; n; c++) {
                board[r][c] &gt;&gt;= 1;
            }
        }
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public void gameOfLife(int[][] board) {
        int m = board.length;
        if (m == 0) return;
        int n = board[0].length;
        int[] dirs = {-1, 0, 1};

        // First pass: determine next state in bit 1
        for (int r = 0; r &lt; m; r++) {
            for (int c = 0; c &lt; n; c++) {
                int live = board[r][c] &amp; 1;
                int ln = liveNeighbors(board, r, c, m, n, dirs);
                if (live == 1 &amp;&amp; (ln == 2 || ln == 3)) {
                    board[r][c] |= 2;
                } else if (live == 0 &amp;&amp; ln == 3) {
                    board[r][c] |= 2;
                }
            }
        }
        
        // Second pass: apply next state
        for (int r = 0; r &lt; m; r++) {
            for (int c = 0; c &lt; n; c++) {
                board[r][c] &gt;&gt;= 1;
            }
        }
    }

    private int liveNeighbors(int[][] board, int r, int c, int m, int n, int[] dirs) {
        int cnt = 0;
        for (int dr : dirs) {
            for (int dc : dirs) {
                if (dr == 0 &amp;&amp; dc == 0) continue;
                int nr = r + dr;
                int nc = c + dc;
                if (nr &gt;= 0 &amp;&amp; nr &lt; m &amp;&amp; nc &gt;= 0 &amp;&amp; nc &lt; n) {
                    cnt += (board[nr][nc] &amp; 1);
                }
            }
        }
        return cnt;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def gameOfLife(self, board: List[List[int]]) -&gt; None:
        m = len(board)
        if m == 0:
            return
        n = len(board[0])
        dirs = [-1, 0, 1]

        def live_neighbors(r: int, c: int) -&gt; int:
            cnt = 0
            for dr in dirs:
                for dc in dirs:
                    if dr == 0 and dc == 0:
                        continue
                    nr = r + dr
                    nc = c + dc
                    if 0 &lt;= nr &lt; m and 0 &lt;= nc &lt; n:
                        cnt += (board[nr][nc] &amp; 1)
            return cnt

        # First pass: determine next state in bit 1
        for r in range(m):
            for c in range(n):
                live = board[r][c] &amp; 1
                ln = live_neighbors(r, c)
                if live == 1 and (ln == 2 or ln == 3):
                    board[r][c] |= 2
                elif live == 0 and ln == 3:
                    board[r][c] |= 2

        # Second pass: apply next state
        for r in range(m):
            for c in range(n):
                board[r][c] &gt;&gt;= 1
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><strong>Time Complexity</strong>: <code>O(m * n)</code><br> We visit each cell twice (first to compute the next state, second to apply it). Each cell checks at most 8 neighbors, so it&#39;s <code>O(m * n)</code>.</li><li><strong>Space Complexity</strong>: <code>O(1)</code><br> The update is done in-place using bit manipulation, with no extra 2D arrays.</li></ul>`,28)]))}const u=n(i,[["render",r]]);export{h as __pageData,u as default};
