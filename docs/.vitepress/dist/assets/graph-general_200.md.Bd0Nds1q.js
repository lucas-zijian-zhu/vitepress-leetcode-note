import{_ as e,C as a,c as i,o as r,j as t,ag as s,G as l,a as c}from"./chunks/framework.Bw-5EFTY.js";const b=JSON.parse('{"title":"200. Number of Islands","description":"","frontmatter":{},"headers":[],"relativePath":"graph-general/200.md","filePath":"graph-general/200.md"}'),d={name:"graph-general/200.md"},u={id:"_200-number-of-islands",tabindex:"-1"};function p(g,n,h,m,q,f){const o=a("Badge");return r(),i("div",null,[t("h1",u,[n[0]||(n[0]=t("a",{href:"https://leetcode.com/problems/number-of-islands/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"200. Number of Islands",-1)),l(o,{type:"warning",text:"Medium"}),n[1]||(n[1]=c()),n[2]||(n[2]=t("a",{class:"header-anchor",href:"#_200-number-of-islands","aria-label":'Permalink to "[200. Number of Islands](https://leetcode.com/problems/number-of-islands/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),n[3]||(n[3]=s(`<p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>&#39;1&#39;</code>s (land) and <code>&#39;0&#39;</code>s (water), return the number of islands.</p><p>An <strong>island</strong> is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: grid = [
  [&quot;1&quot;,&quot;1&quot;,&quot;1&quot;,&quot;1&quot;,&quot;0&quot;],
  [&quot;1&quot;,&quot;1&quot;,&quot;0&quot;,&quot;1&quot;,&quot;0&quot;],
  [&quot;1&quot;,&quot;1&quot;,&quot;0&quot;,&quot;0&quot;,&quot;0&quot;],
  [&quot;0&quot;,&quot;0&quot;,&quot;0&quot;,&quot;0&quot;,&quot;0&quot;]
]
Output: 1
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: grid = [
  [&quot;1&quot;,&quot;1&quot;,&quot;0&quot;,&quot;0&quot;,&quot;0&quot;],
  [&quot;1&quot;,&quot;1&quot;,&quot;0&quot;,&quot;0&quot;,&quot;0&quot;],
  [&quot;0&quot;,&quot;0&quot;,&quot;1&quot;,&quot;0&quot;,&quot;0&quot;],
  [&quot;0&quot;,&quot;0&quot;,&quot;0&quot;,&quot;1&quot;,&quot;1&quot;]
]
Output: 3
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == grid.length</code></li><li><code>n == grid[i].length</code></li><li><code>1 &lt;= m, n &lt;= 300</code></li><li><code>grid[i][j]</code> is <code>&#39;0&#39;</code> or <code>&#39;1&#39;</code>.</li></ul><h2 id="💡-approach-bfs-with-stack-iterative" tabindex="-1">💡 Approach: BFS with Stack (Iterative) <a class="header-anchor" href="#💡-approach-bfs-with-stack-iterative" aria-label="Permalink to &quot;💡 Approach: BFS with Stack (Iterative)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>We can use <strong>BFS with a stack</strong> to explore each island. When we find a &#39;1&#39;, we increment the island count and then use BFS to mark all connected &#39;1&#39;s as visited (by changing them to &#39;0&#39;). This approach avoids potential stack overflow issues that might occur with deep recursion.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Iterate through each cell</strong> in the grid</li><li><strong>When we find a &#39;1&#39;</strong>, increment island count</li><li><strong>Use BFS with stack</strong> to mark all connected &#39;1&#39;s as visited (change to &#39;0&#39;)</li><li><strong>BFS explores</strong> all 4 directions (up, down, left, right)</li><li><strong>Return the total count</strong> of islands</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use BFS with explicit stack to avoid recursion stack overflow</li><li>Mark visited cells by changing &#39;1&#39; to &#39;0&#39;</li><li>Check boundaries before exploring neighbors</li><li>Use coordinate encoding (i * column + j) for efficient storage</li><li>Count each new &#39;1&#39; as a new island</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-rwUSM" id="tab-wSyBUmR" checked><label data-title="Kotlin" for="tab-wSyBUmR">Kotlin</label><input type="radio" name="group-rwUSM" id="tab-KLinuXX"><label data-title="TypeScript" for="tab-KLinuXX">TypeScript</label><input type="radio" name="group-rwUSM" id="tab-MqleB3u"><label data-title="Java" for="tab-MqleB3u">Java</label><input type="radio" name="group-rwUSM" id="tab-WvpE_iR"><label data-title="Python" for="tab-WvpE_iR">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun numIslands(grid: Array&lt;CharArray&gt;): Int {
        if (grid.isEmpty()) return 0
        
        val rows = grid.size
        val cols = grid[0].size
        var count = 0
        val stack = mutableListOf&lt;Int&gt;()
        val directions = arrayOf(intArrayOf(1, 0), intArrayOf(0, 1), intArrayOf(-1, 0), intArrayOf(0, -1))
        
        for (i in 0 until rows) {
            for (j in 0 until cols) {
                if (grid[i][j] == &#39;1&#39;) {
                    count++
                    stack.add(i * cols + j)
                    
                    while (stack.isNotEmpty()) {
                        val dot = stack.removeAt(0)
                        val r = dot / cols
                        val c = dot % cols
                        
                        for (direction in directions) {
                            val nr = r + direction[0]
                            val nc = c + direction[1]
                            
                            if (nr &gt;= 0 &amp;&amp; nr &lt; rows &amp;&amp; nc &gt;= 0 &amp;&amp; nc &lt; cols &amp;&amp; grid[nr][nc] == &#39;1&#39;) {
                                grid[nr][nc] = &#39;0&#39;
                                stack.add(nr * cols + nc)
                            }
                        }
                    }
                }
            }
        }
        
        return count
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function numIslands(grid: string[][]): number {
    if (grid.length === 0) return 0;
    
    let count = 0;
    const row = grid.length, column = grid[0].length;
    const stack: number[] = [];
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    
    for (let i = 0; i &lt; row; i++) {
        for (let j = 0; j &lt; column; j++) {
            if (grid[i][j] === &#39;1&#39;) {
                count++;
                stack.push(i * column + j);
                
                while (stack.length) {
                    const dot = stack.shift()!;
                    const r = Math.floor(dot / column);
                    const c = dot % column;
                    
                    for (let direction of directions) {
                        const nr = r + direction[0];
                        const nc = c + direction[1];
                        
                        if ((nr &gt;= 0 &amp;&amp; nr &lt; row) &amp;&amp; (nc &gt;= 0 &amp;&amp; nc &lt; column) &amp;&amp; (grid[nr][nc] === &#39;1&#39;)) {
                            grid[nr][nc] = &#39;0&#39;;
                            stack.push(nr * column + nc);
                        }
                    }
                }
            }
        }
    }
    
    return count;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int numIslands(char[][] grid) {
        if (grid.length == 0) return 0;
        
        int rows = grid.length;
        int cols = grid[0].length;
        int count = 0;
        Queue&lt;Integer&gt; queue = new LinkedList&lt;&gt;();
        int[][] directions = {​{1, 0}, {0, 1}, {-1, 0}, {0, -1}​};
        
        for (int i = 0; i &lt; rows; i++) {
            for (int j = 0; j &lt; cols; j++) {
                if (grid[i][j] == &#39;1&#39;) {
                    count++;
                    queue.offer(i * cols + j);
                    
                    while (!queue.isEmpty()) {
                        int dot = queue.poll();
                        int r = dot / cols;
                        int c = dot % cols;
                        
                        for (int[] direction : directions) {
                            int nr = r + direction[0];
                            int nc = c + direction[1];
                            
                            if (nr &gt;= 0 &amp;&amp; nr &lt; rows &amp;&amp; nc &gt;= 0 &amp;&amp; nc &lt; cols &amp;&amp; grid[nr][nc] == &#39;1&#39;) {
                                grid[nr][nc] = &#39;0&#39;;
                                queue.offer(nr * cols + nc);
                            }
                        }
                    }
                }
            }
        }
        
        return count;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def numIslands(self, grid: List[List[str]]) -&gt; int:
        if not grid:
            return 0
        
        rows, cols = len(grid), len(grid[0])
        count = 0
        stack = []
        directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]
        
        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == &#39;1&#39;:
                    count += 1
                    stack.append(i * cols + j)
                    
                    while stack:
                        dot = stack.pop(0)
                        r = dot // cols
                        c = dot % cols
                        
                        for direction in directions:
                            nr = r + direction[0]
                            nc = c + direction[1]
                            
                            if (0 &lt;= nr &lt; rows and 0 &lt;= nc &lt; cols and grid[nr][nc] == &#39;1&#39;):
                                grid[nr][nc] = &#39;0&#39;
                                stack.append(nr * cols + nc)
        
        return count
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(m × n), where m is the number of rows and n is the number of columns. We visit each cell once.</li><li><strong>Space Complexity:</strong> O(m × n) in the worst case for the queue/stack (if the entire grid is filled with land). This approach avoids potential stack overflow issues that could occur with deep recursion.</li></ul>`,19))])}const y=e(d,[["render",p]]);export{b as __pageData,y as default};
