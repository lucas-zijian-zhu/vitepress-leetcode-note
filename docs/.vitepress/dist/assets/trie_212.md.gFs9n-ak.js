import{_ as e,c as r,o as n,ag as t}from"./chunks/framework.Bw-5EFTY.js";const p=JSON.parse('{"title":"212. Word Search II","description":"","frontmatter":{},"headers":[],"relativePath":"trie/212.md","filePath":"trie/212.md"}'),a={name:"trie/212.md"};function i(l,o,d,s,c,u){return n(),r("div",null,o[0]||(o[0]=[t(`<h1 id="_212-word-search-ii" tabindex="-1"><a href="https://leetcode.com/problems/word-search-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">212. Word Search II</a> <a class="header-anchor" href="#_212-word-search-ii" aria-label="Permalink to &quot;[212. Word Search II](https://leetcode.com/problems/word-search-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an <code>m x n</code> <code>board</code> of characters and a list of strings <code>words</code>, return all words on the board.</p><p>Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/07/search1.jpg" style="width:322px;height:322px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = [[&quot;o&quot;,&quot;a&quot;,&quot;a&quot;,&quot;n&quot;],[&quot;e&quot;,&quot;t&quot;,&quot;a&quot;,&quot;e&quot;],[&quot;i&quot;,&quot;h&quot;,&quot;k&quot;,&quot;r&quot;],[&quot;i&quot;,&quot;f&quot;,&quot;l&quot;,&quot;v&quot;]], words = [&quot;oath&quot;,&quot;pea&quot;,&quot;eat&quot;,&quot;rain&quot;]
Output: [&quot;eat&quot;,&quot;oath&quot;]
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/07/search2.jpg" style="width:322px;height:322px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = [[&quot;a&quot;,&quot;b&quot;],[&quot;c&quot;,&quot;d&quot;]], words = [&quot;abcb&quot;]
Output: []
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == board.length</code></li><li><code>n == board[i].length</code></li><li><code>1 &lt;= m, n &lt;= 12</code></li><li><code>board[i][j]</code> is a lowercase English letter.</li><li><code>1 &lt;= words.length &lt;= 3 * 10^4</code></li><li><code>1 &lt;= words[i].length &lt;= 10</code></li><li><code>words[i]</code> consists of lowercase English letters.</li><li>All the values of <code>words</code> are <strong>unique</strong>.</li></ul><h2 id="💡-approach-trie-backtracking" tabindex="-1">💡 Approach: Trie + Backtracking <a class="header-anchor" href="#💡-approach-trie-backtracking" aria-label="Permalink to &quot;💡 Approach: Trie + Backtracking&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This problem combines <strong>Trie</strong> data structure with <strong>Backtracking</strong> DFS to efficiently search for multiple words on a 2D board:</p><ol><li><strong>Build a Trie</strong> from all the words to search for efficient prefix checking</li><li><strong>DFS on the board</strong> starting from each cell</li><li><strong>Use Trie</strong> to guide the search and avoid exploring invalid paths early</li><li><strong>Backtrack</strong> when no valid words can be formed from current path</li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Build Trie</strong> from the <code>words</code> array for efficient searching</li><li><strong>For each cell</strong> on the board, start DFS search</li><li><strong>During DFS</strong>: <ul><li>Check if current character exists in Trie</li><li>If end of word is reached, add to results and optionally remove from Trie (to avoid duplicates)</li><li>Continue DFS to adjacent cells (up, down, left, right)</li><li>Mark current cell as visited and backtrack after exploring</li></ul></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use Trie to efficiently check if current path can lead to valid words</li><li>Mark cells as visited during DFS and unmark during backtrack</li><li>Remove found words from Trie to avoid duplicates (optional optimization)</li><li>Prune search early when Trie path doesn&#39;t exist</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-DS3MG" id="tab-hVjNkI_" checked><label data-title="Kotlin" for="tab-hVjNkI_">Kotlin</label><input type="radio" name="group-DS3MG" id="tab-JAzKc7l"><label data-title="TypeScript" for="tab-JAzKc7l">TypeScript</label><input type="radio" name="group-DS3MG" id="tab-RiX2qsG"><label data-title="Java" for="tab-RiX2qsG">Java</label><input type="radio" name="group-DS3MG" id="tab-xkzSnwY"><label data-title="Python" for="tab-xkzSnwY">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TrieNode {
    val children = mutableMapOf&lt;Char, TrieNode&gt;()
    var word: String? = null
}

class Solution {
    private val directions = arrayOf(
        intArrayOf(0, 1), intArrayOf(0, -1),
        intArrayOf(1, 0), intArrayOf(-1, 0)
    )
    
    fun findWords(board: Array&lt;CharArray&gt;, words: Array&lt;String&gt;): List&lt;String&gt; {
        // Build Trie from words
        val root = buildTrie(words)
        val result = mutableSetOf&lt;String&gt;()
        
        // DFS from each cell
        for (i in board.indices) {
            for (j in board[0].indices) {
                dfs(board, i, j, root, result)
            }
        }
        
        return result.toList()
    }
    
    private fun buildTrie(words: Array&lt;String&gt;): TrieNode {
        val root = TrieNode()
        for (word in words) {
            var node = root
            for (char in word) {
                node.children[char] = node.children.getOrDefault(char, TrieNode())
                node = node.children[char]!!
            }
            node.word = word
        }
        return root
    }
    
    private fun dfs(board: Array&lt;CharArray&gt;, row: Int, col: Int, node: TrieNode, result: MutableSet&lt;String&gt;) {
        // Check bounds and if cell is visited
        if (row &lt; 0 || row &gt;= board.size || col &lt; 0 || col &gt;= board[0].size) return
        if (board[row][col] == &#39;#&#39;) return
        
        val char = board[row][col]
        val nextNode = node.children[char] ?: return  // Early termination if path doesn&#39;t exist
        
        // Check if we found a complete word
        nextNode.word?.let { word -&gt;
            result.add(word)
            nextNode.word = null  // Avoid duplicates
        }
        
        // Mark current cell as visited
        board[row][col] = &#39;#&#39;
        
        // Explore all 4 directions
        for (direction in directions) {
            val newRow = row + direction[0]
            val newCol = col + direction[1]
            dfs(board, newRow, newCol, nextNode, result)
        }
        
        // Backtrack: restore the original character
        board[row][col] = char
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class TrieNode {
    children: Map&lt;string, TrieNode&gt; = new Map();
    word: string | null = null;
}

function findWords(board: string[][], words: string[]): string[] {
    const root = buildTrie(words);
    const result = new Set&lt;string&gt;();
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    
    function dfs(row: number, col: number, node: TrieNode): void {
        // Check bounds and if cell is visited
        if (row &lt; 0 || row &gt;= board.length || col &lt; 0 || col &gt;= board[0].length) return;
        if (board[row][col] === &#39;#&#39;) return;
        
        const char = board[row][col];
        const nextNode = node.children.get(char);
        if (!nextNode) return;  // Early termination
        
        // Check if we found a complete word
        if (nextNode.word) {
            result.add(nextNode.word);
            nextNode.word = null;  // Avoid duplicates
        }
        
        // Mark current cell as visited
        const originalChar = board[row][col];
        board[row][col] = &#39;#&#39;;
        
        // Explore all 4 directions
        for (const [dr, dc] of directions) {
            dfs(row + dr, col + dc, nextNode);
        }
        
        // Backtrack: restore the original character
        board[row][col] = originalChar;
    }
    
    // DFS from each cell
    for (let i = 0; i &lt; board.length; i++) {
        for (let j = 0; j &lt; board[0].length; j++) {
            dfs(i, j, root);
        }
    }
    
    return Array.from(result);
}

function buildTrie(words: string[]): TrieNode {
    const root = new TrieNode();
    for (const word of words) {
        let node = root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
        }
        node.word = word;
    }
    return root;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class TrieNode {
    Map&lt;Character, TrieNode&gt; children;
    String word;
    
    public TrieNode() {
        children = new HashMap&lt;&gt;();
        word = null;
    }
}

class Solution {
    private int[][] directions = {​{0, 1}, {0, -1}, {1, 0}, {-1, 0}​};
    
    public List&lt;String&gt; findWords(char[][] board, String[] words) {
        TrieNode root = buildTrie(words);
        Set&lt;String&gt; result = new HashSet&lt;&gt;();
        
        for (int i = 0; i &lt; board.length; i++) {
            for (int j = 0; j &lt; board[0].length; j++) {
                dfs(board, i, j, root, result);
            }
        }
        
        return new ArrayList&lt;&gt;(result);
    }
    
    private TrieNode buildTrie(String[] words) {
        TrieNode root = new TrieNode();
        for (String word : words) {
            TrieNode node = root;
            for (char c : word.toCharArray()) {
                node.children.putIfAbsent(c, new TrieNode());
                node = node.children.get(c);
            }
            node.word = word;
        }
        return root;
    }
    
    private void dfs(char[][] board, int row, int col, TrieNode node, Set&lt;String&gt; result) {
        // Check bounds and if cell is visited
        if (row &lt; 0 || row &gt;= board.length || col &lt; 0 || col &gt;= board[0].length) return;
        if (board[row][col] == &#39;#&#39;) return;
        
        char c = board[row][col];
        TrieNode nextNode = node.children.get(c);
        if (nextNode == null) return;  // Early termination
        
        // Check if we found a complete word
        if (nextNode.word != null) {
            result.add(nextNode.word);
            nextNode.word = null;  // Avoid duplicates
        }
        
        // Mark current cell as visited
        board[row][col] = &#39;#&#39;;
        
        // Explore all 4 directions
        for (int[] direction : directions) {
            dfs(board, row + direction[0], col + direction[1], nextNode, result);
        }
        
        // Backtrack: restore the original character
        board[row][col] = c;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -&gt; List[str]:
        root = self.build_trie(words)
        result = set()
        
        def dfs(row, col, node):
            # Check bounds and if cell is visited
            if (row &lt; 0 or row &gt;= len(board) or 
                col &lt; 0 or col &gt;= len(board[0]) or 
                board[row][col] == &#39;#&#39;):
                return
            
            char = board[row][col]
            next_node = node.children.get(char)
            if not next_node:
                return  # Early termination
            
            # Check if we found a complete word
            if next_node.word:
                result.add(next_node.word)
                next_node.word = None  # Avoid duplicates
            
            # Mark current cell as visited
            board[row][col] = &#39;#&#39;
            
            # Explore all 4 directions
            directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
            for dr, dc in directions:
                dfs(row + dr, col + dc, next_node)
            
            # Backtrack: restore the original character
            board[row][col] = char
        
        # DFS from each cell
        for i in range(len(board)):
            for j in range(len(board[0])):
                dfs(i, j, root)
        
        return list(result)
    
    def build_trie(self, words):
        root = TrieNode()
        for word in words:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.word = word
        return root
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(M × N × 4^L), where M×N is the board size and L is the maximum length of words. In worst case, we explore 4 directions for each cell up to L depth.</li><li><strong>Space Complexity:</strong> O(W × L), where W is the number of words and L is the average length of words for the Trie, plus O(L) for the recursion stack during DFS.</li></ul>`,21)]))}const g=e(a,[["render",i]]);export{p as __pageData,g as default};
