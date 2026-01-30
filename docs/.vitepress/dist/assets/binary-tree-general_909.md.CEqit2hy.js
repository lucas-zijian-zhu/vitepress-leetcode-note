import{_ as o,C as a,c as r,o as s,j as n,ag as i,G as l,a as d}from"./chunks/framework.Bw-5EFTY.js";const w=JSON.parse('{"title":"909. Snakes and Ladders","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/909.md","filePath":"binary-tree-general/909.md"}'),c={name:"binary-tree-general/909.md"},u={id:"_909-snakes-and-ladders",tabindex:"-1"};function p(g,e,h,b,m,f){const t=a("Badge");return s(),r("div",null,[n("h1",u,[e[0]||(e[0]=n("a",{href:"https://leetcode.com/problems/snakes-and-ladders/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"909. Snakes and Ladders",-1)),l(t,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=n("a",{class:"header-anchor",href:"#_909-snakes-and-ladders","aria-label":'Permalink to "[909. Snakes and Ladders](https://leetcode.com/problems/snakes-and-ladders/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>You are given an <code>n x n</code> integer matrix <code>board</code> where the cells are labeled from <code>1</code> to <code>n^2</code> in a <a href="https://en.wikipedia.org/wiki/Boustrophedon" target="_blank"><strong>Boustrophedon style</strong></a> starting from the bottom left of the board (i.e. <code>board[n - 1][0]</code>) and alternating direction each row.</p><p>You start on square <code>1</code> of the board. In each move, starting from square <code>curr</code>, do the following:</p><ul><li><p>Choose a destination square <code>next</code> with a label in the range <code>[curr + 1, min(curr + 6, n^2)]</code>.</p></li><li><p>This choice simulates the result of a standard <strong>6-sided die roll</strong> : i.e., there are always at most 6 destinations, regardless of the size of the board.</p></li><li><p>If <code>next</code> has a snake or ladder, you <strong>must</strong> move to the destination of that snake or ladder. Otherwise, you move to <code>next</code>.</p></li><li><p>The game ends when you reach the square <code>n^2</code>.</p></li></ul><p>A board square on row <code>r</code> and column <code>c</code> has a snake or ladder if <code>board[r][c] != -1</code>. The destination of that snake or ladder is <code>board[r][c]</code>. Squares <code>1</code> and <code>n^2</code> are not the starting points of any snake or ladder.</p><p>Note that you only take a snake or ladder at most once per dice roll. If the destination to a snake or ladder is the start of another snake or ladder, you do <strong>not</strong> follow the subsequent snake or ladder.</p><ul><li>For example, suppose the board is <code>[[-1,4],[-1,3]]</code>, and on the first move, your destination square is <code>2</code>. You follow the ladder to square <code>3</code>, but do <strong>not</strong> follow the subsequent ladder to <code>4</code>.</li></ul><p>Return the least number of dice rolls required to reach the square <code>n^2</code>. If it is not possible to reach the square, return <code>-1</code>.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2018/09/23/snakes.png" style="width:500px;height:394px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
Output: 4
Explanation: 
In the beginning, you start at square 1 (at row 5, column 0).
You decide to move to square 2 and must take the ladder to square 15.
You then decide to move to square 17 and must take the snake to square 13.
You then decide to move to square 14 and must take the ladder to square 35.
You then decide to move to square 36, ending the game.
This is the lowest possible number of moves to reach the last square, so return 4.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: board = [[-1,-1],[-1,3]]
Output: 1
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>n == board.length == board[i].length</code></li><li><code>2 &lt;= n &lt;= 20</code></li><li><code>board[i][j]</code> is either <code>-1</code> or in the range <code>[1, n^2]</code>.</li><li>The squares labeled <code>1</code> and <code>n^2</code> are not the starting points of any snake or ladder.</li></ul><h2 id="🚀-approach-bfs-shortest-path" tabindex="-1">🚀 Approach: BFS (Shortest Path) <a class="header-anchor" href="#🚀-approach-bfs-shortest-path" aria-label="Permalink to &quot;🚀 Approach: BFS (Shortest Path)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a <strong>shortest path problem</strong> in a graph where:</p><ul><li>Each square is a <strong>node</strong></li><li>Each die roll creates up to 6 <strong>edges</strong> to reachable squares</li><li>Snakes and ladders are <strong>shortcuts</strong> to other nodes</li></ul><p>We can use <strong>BFS</strong> to find the minimum number of moves since BFS naturally finds the shortest path in an unweighted graph.</p><p><strong>Key Challenges:</strong></p><ol><li><strong>Boustrophedon layout</strong> - Need to convert square number to (row, col) coordinates</li><li><strong>Snakes and ladders</strong> - Need to follow them to destination</li><li><strong>Shortest path</strong> - BFS guarantees minimum moves</li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Convert square number to coordinates</strong> - Handle the zigzag layout</li><li><strong>BFS from square 1</strong> - Use queue to explore all reachable squares</li><li><strong>For each square</strong> - Try all 6 die rolls (1-6)</li><li><strong>Follow snakes/ladders</strong> - Jump to destination if present</li><li><strong>Track visited squares</strong> - Avoid revisiting</li><li><strong>Return steps</strong> when reaching n²</li></ol><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-DVZwI" id="tab-wqrZUyJ" checked><label data-title="Kotlin" for="tab-wqrZUyJ">Kotlin</label><input type="radio" name="group-DVZwI" id="tab-s62_ByW"><label data-title="TypeScript" for="tab-s62_ByW">TypeScript</label><input type="radio" name="group-DVZwI" id="tab-14Oe_PI"><label data-title="Java" for="tab-14Oe_PI">Java</label><input type="radio" name="group-DVZwI" id="tab-wJWM63h"><label data-title="Python" for="tab-wJWM63h">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun snakesAndLadders(board: Array&lt;IntArray&gt;): Int {
        val n = board.size
        val target = n * n
        
        val visited = BooleanArray(target + 1)
        val queue = ArrayDeque&lt;Pair&lt;Int, Int&gt;&gt;() // (position, steps)
        queue.offer(Pair(1, 0))
        visited[1] = true
        
        while (queue.isNotEmpty()) {
            val (curr, steps) = queue.poll()
            
            if (curr == target) return steps
            
            // Try all 6 die rolls
            for (i in 1..6) {
                var next = curr + i
                if (next &gt; target) break
                
                // Get board coordinates
                val (row, col) = getCoordinates(next, n)
                
                // Follow snake or ladder if present
                if (board[row][col] != -1) {
                    next = board[row][col]
                }
                
                if (!visited[next]) {
                    visited[next] = true
                    queue.offer(Pair(next, steps + 1))
                }
            }
        }
        
        return -1
    }
    
    private fun getCoordinates(square: Int, n: Int): Pair&lt;Int, Int&gt; {
        val row = (square - 1) / n
        val col = (square - 1) % n
        
        val actualRow = n - 1 - row
        val actualCol = if (row % 2 == 0) col else n - 1 - col
        
        return Pair(actualRow, actualCol)
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function snakesAndLadders(board: number[][]): number {
    const n = board.length;
    const target = n * n;
    
    const visited = new Array(target + 1).fill(false);
    const queue: [number, number][] = [[1, 0]]; // [position, steps]
    visited[1] = true;
    
    while (queue.length &gt; 0) {
        const [curr, steps] = queue.shift()!;
        
        if (curr === target) return steps;
        
        // Try all 6 die rolls
        for (let i = 1; i &lt;= 6; i++) {
            let next = curr + i;
            if (next &gt; target) break;
            
            // Get board coordinates
            const [row, col] = getCoordinates(next, n);
            
            // Follow snake or ladder if present
            if (board[row][col] !== -1) {
                next = board[row][col];
            }
            
            if (!visited[next]) {
                visited[next] = true;
                queue.push([next, steps + 1]);
            }
        }
    }
    
    return -1;
}

function getCoordinates(square: number, n: number): [number, number] {
    const row = Math.floor((square - 1) / n);
    const col = (square - 1) % n;
    
    const actualRow = n - 1 - row;
    const actualCol = row % 2 === 0 ? col : n - 1 - col;
    
    return [actualRow, actualCol];
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int snakesAndLadders(int[][] board) {
        int n = board.length;
        int target = n * n;
        
        boolean[] visited = new boolean[target + 1];
        Queue&lt;int[]&gt; queue = new LinkedList&lt;&gt;();
        queue.offer(new int[]{1, 0}); // {position, steps}
        visited[1] = true;
        
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int curr = current[0];
            int steps = current[1];
            
            if (curr == target) return steps;
            
            // Try all 6 die rolls
            for (int i = 1; i &lt;= 6; i++) {
                int next = curr + i;
                if (next &gt; target) break;
                
                // Get board coordinates
                int[] coords = getCoordinates(next, n);
                int row = coords[0];
                int col = coords[1];
                
                // Follow snake or ladder if present
                if (board[row][col] != -1) {
                    next = board[row][col];
                }
                
                if (!visited[next]) {
                    visited[next] = true;
                    queue.offer(new int[]{next, steps + 1});
                }
            }
        }
        
        return -1;
    }
    
    private int[] getCoordinates(int square, int n) {
        int row = (square - 1) / n;
        int col = (square - 1) % n;
        
        int actualRow = n - 1 - row;
        int actualCol = (row % 2 == 0) ? col : n - 1 - col;
        
        return new int[]{actualRow, actualCol};
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -&gt; int:
        n = len(board)
        target = n * n
        
        visited = [False] * (target + 1)
        queue = deque([(1, 0)])  # (position, steps)
        visited[1] = True
        
        while queue:
            curr, steps = queue.popleft()
            
            if curr == target:
                return steps
            
            # Try all 6 die rolls
            for i in range(1, 7):
                next_pos = curr + i
                if next_pos &gt; target:
                    break
                
                # Get board coordinates
                row, col = self.get_coordinates(next_pos, n)
                
                # Follow snake or ladder if present
                if board[row][col] != -1:
                    next_pos = board[row][col]
                
                if not visited[next_pos]:
                    visited[next_pos] = True
                    queue.append((next_pos, steps + 1))
        
        return -1
    
    def get_coordinates(self, square: int, n: int) -&gt; tuple:
        row = (square - 1) // n
        col = (square - 1) % n
        
        actual_row = n - 1 - row
        actual_col = col if row % 2 == 0 else n - 1 - col
        
        return (actual_row, actual_col)
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><p><strong>Notation:</strong></p><ul><li><p><strong>n</strong> = Board dimension (n × n board)</p></li><li><p><strong>V</strong> = Number of squares = n²</p></li><li><p><strong>E</strong> = Number of edges ≈ 6V (each square can connect to 6 others)</p></li><li><p><strong>Time Complexity:</strong> O(n²) = O(V)</p><ul><li>Each square is visited at most once</li><li>For each square, we try up to 6 die rolls</li><li>Total: O(V × 6) = O(V) = O(n²)</li></ul></li><li><p><strong>Space Complexity:</strong> O(n²) = O(V)</p><ul><li>Visited array: O(V)</li><li>Queue: O(V) in worst case</li></ul></li></ul>`,28))])}const q=o(c,[["render",p]]);export{w as __pageData,q as default};
