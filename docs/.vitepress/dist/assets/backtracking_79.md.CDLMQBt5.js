import{_ as o,c as e,o as r,ag as n}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"79. Word Search","description":"","frontmatter":{},"headers":[],"relativePath":"backtracking/79.md","filePath":"backtracking/79.md"}'),a={name:"backtracking/79.md"};function i(l,t,c,d,s,u){return r(),e("div",null,t[0]||(t[0]=[n(`<h1 id="_79-word-search" tabindex="-1"><a href="https://leetcode.com/problems/word-search/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">79. Word Search</a> <a class="header-anchor" href="#_79-word-search" aria-label="Permalink to &quot;[79. Word Search](https://leetcode.com/problems/word-search/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an <code>m x n</code> grid of characters <code>board</code> and a string <code>word</code>, return <code>true</code> if <code>word</code> exists in the grid.</p><p>The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/04/word2.jpg" style="width:322px;height:242px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = [[&quot;A&quot;,&quot;B&quot;,&quot;C&quot;,&quot;E&quot;],[&quot;S&quot;,&quot;F&quot;,&quot;C&quot;,&quot;S&quot;],[&quot;A&quot;,&quot;D&quot;,&quot;E&quot;,&quot;E&quot;]], word = &quot;ABCCED&quot;
Output: true
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg" style="width:322px;height:242px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = [[&quot;A&quot;,&quot;B&quot;,&quot;C&quot;,&quot;E&quot;],[&quot;S&quot;,&quot;F&quot;,&quot;C&quot;,&quot;S&quot;],[&quot;A&quot;,&quot;D&quot;,&quot;E&quot;,&quot;E&quot;]], word = &quot;SEE&quot;
Output: true
</code></pre></div><p><strong>Example 3:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/10/15/word3.jpg" style="width:322px;height:242px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = [[&quot;A&quot;,&quot;B&quot;,&quot;C&quot;,&quot;E&quot;],[&quot;S&quot;,&quot;F&quot;,&quot;C&quot;,&quot;S&quot;],[&quot;A&quot;,&quot;D&quot;,&quot;E&quot;,&quot;E&quot;]], word = &quot;ABCB&quot;
Output: false
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == board.length</code></li><li><code>n = board[i].length</code></li><li><code>1 &lt;= m, n &lt;= 6</code></li><li><code>1 &lt;= word.length &lt;= 15</code></li><li><code>board</code> and <code>word</code> consists of only lowercase and uppercase English letters.</li></ul><p><strong>Follow up:</strong> Could you use search pruning to make your solution faster with a larger <code>board</code>?</p><h2 id="💡-approach-backtracking-dfs" tabindex="-1">💡 Approach: Backtracking (DFS) <a class="header-anchor" href="#💡-approach-backtracking-dfs" aria-label="Permalink to &quot;💡 Approach: Backtracking (DFS)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>backtracking with DFS</strong> problem. We need to search for a word in a 2D grid by exploring all possible paths from each cell. The key is to use DFS with backtracking to navigate through the grid while avoiding revisiting the same cell.</p><p><strong>Key Points:</strong></p><ul><li>Use DFS to explore all 4 directions (up, down, left, right)</li><li>Keep track of visited cells to avoid cycles</li><li>Backtrack when the current path doesn&#39;t lead to the word</li><li>Return immediately when word is found</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>For each cell</strong> in the board, start DFS search</li><li><strong>During DFS</strong>: <ul><li>Check if position is valid and character matches</li><li>Mark current cell as visited</li><li>Explore all 4 directions recursively</li><li>If current path forms the complete word, return true</li><li>Backtrack: unmark cell as visited</li></ul></li><li><strong>Return false</strong> if no path found starting from any cell</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use backtracking with visited tracking to avoid revisiting cells</li><li>Check bounds and character matching at each step</li><li>Early termination when word is found</li><li>Proper backtracking to restore grid state</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-lmpb3" id="tab-pFIJnhJ" checked><label data-title="Kotlin" for="tab-pFIJnhJ">Kotlin</label><input type="radio" name="group-lmpb3" id="tab-kITHIt7"><label data-title="TypeScript" for="tab-kITHIt7">TypeScript</label><input type="radio" name="group-lmpb3" id="tab-BpmWuB3"><label data-title="Java" for="tab-BpmWuB3">Java</label><input type="radio" name="group-lmpb3" id="tab-_GvA7Fl"><label data-title="Python" for="tab-_GvA7Fl">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    private val directions = arrayOf(
        intArrayOf(0, 1), intArrayOf(0, -1),
        intArrayOf(1, 0), intArrayOf(-1, 0)
    )
    
    fun exist(board: Array&lt;CharArray&gt;, word: String): Boolean {
        if (board.isEmpty() || board[0].isEmpty()) return false
        
        for (i in board.indices) {
            for (j in board[0].indices) {
                if (dfs(board, word, 0, i, j)) {
                    return true
                }
            }
        }
        return false
    }
    
    private fun dfs(board: Array&lt;CharArray&gt;, word: String, index: Int, row: Int, col: Int): Boolean {
        // Base case: found the complete word
        if (index == word.length) return true
        
        // Check bounds and character match
        if (row &lt; 0 || row &gt;= board.size || col &lt; 0 || col &gt;= board[0].size ||
            board[row][col] != word[index]) {
            return false
        }
        
        // Mark current cell as visited
        val originalChar = board[row][col]
        board[row][col] = &#39;#&#39;
        
        // Explore all 4 directions
        for (direction in directions) {
            if (dfs(board, word, index + 1, row + direction[0], col + direction[1])) {
                return true
            }
        }
        
        // Backtrack: restore the original character
        board[row][col] = originalChar
        return false
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function exist(board: string[][], word: string): boolean {
    if (board.length === 0 || board[0].length === 0) return false;
    
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    
    function dfs(index: number, row: number, col: number): boolean {
        // Base case: found the complete word
        if (index === word.length) return true;
        
        // Check bounds and character match
        if (row &lt; 0 || row &gt;= board.length || col &lt; 0 || col &gt;= board[0].length ||
            board[row][col] !== word[index]) {
            return false;
        }
        
        // Mark current cell as visited
        const originalChar = board[row][col];
        board[row][col] = &#39;#&#39;;
        
        // Explore all 4 directions
        for (const [dr, dc] of directions) {
            if (dfs(index + 1, row + dr, col + dc)) {
                return true;
            }
        }
        
        // Backtrack: restore the original character
        board[row][col] = originalChar;
        return false;
    }
    
    // Try starting from each cell
    for (let i = 0; i &lt; board.length; i++) {
        for (let j = 0; j &lt; board[0].length; j++) {
            if (dfs(0, i, j)) {
                return true;
            }
        }
    }
    
    return false;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    private int[][] directions = {​{0, 1}, {0, -1}, {1, 0}, {-1, 0}​};
    
    public boolean exist(char[][] board, String word) {
        if (board.length == 0 || board[0].length == 0) return false;
        
        for (int i = 0; i &lt; board.length; i++) {
            for (int j = 0; j &lt; board[0].length; j++) {
                if (dfs(board, word, 0, i, j)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private boolean dfs(char[][] board, String word, int index, int row, int col) {
        // Base case: found the complete word
        if (index == word.length()) return true;
        
        // Check bounds and character match
        if (row &lt; 0 || row &gt;= board.length || col &lt; 0 || col &gt;= board[0].length ||
            board[row][col] != word.charAt(index)) {
            return false;
        }
        
        // Mark current cell as visited
        char originalChar = board[row][col];
        board[row][col] = &#39;#&#39;;
        
        // Explore all 4 directions
        for (int[] direction : directions) {
            if (dfs(board, word, index + 1, row + direction[0], col + direction[1])) {
                return true;
            }
        }
        
        // Backtrack: restore the original character
        board[row][col] = originalChar;
        return false;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def exist(self, board: List[List[str]], word: str) -&gt; bool:
        if not board or not board[0]:
            return False
        
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        rows, cols = len(board), len(board[0])
        
        def dfs(index: int, row: int, col: int) -&gt; bool:
            # Base case: found the complete word
            if index == len(word):
                return True
            
            # Check bounds and character match
            if (row &lt; 0 or row &gt;= rows or col &lt; 0 or col &gt;= cols or 
                board[row][col] != word[index]):
                return False
            
            # Mark current cell as visited
            original_char = board[row][col]
            board[row][col] = &#39;#&#39;
            
            # Explore all 4 directions
            for dr, dc in directions:
                if dfs(index + 1, row + dr, col + dc):
                    return True
            
            # Backtrack: restore the original character
            board[row][col] = original_char
            return False
        
        # Try starting from each cell
        for i in range(rows):
            for j in range(cols):
                if dfs(0, i, j):
                    return True
        
        return False
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(M × N × 4^L) where M×N is the board size and L is the length of the word. In worst case, we explore 4 directions for each cell up to L depth</li><li><strong>Space Complexity:</strong> O(L) for the recursion stack during DFS</li></ul>`,25)]))}const g=o(a,[["render",i]]);export{h as __pageData,g as default};
