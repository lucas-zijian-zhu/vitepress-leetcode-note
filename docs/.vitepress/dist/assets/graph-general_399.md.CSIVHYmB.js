import{_ as a,C as i,c as r,o,j as e,ag as s,G as l,a as u}from"./chunks/framework.Bw-5EFTY.js";const q=JSON.parse('{"title":"399. Evaluate Division","description":"","frontmatter":{},"headers":[],"relativePath":"graph-general/399.md","filePath":"graph-general/399.md"}'),d={name:"graph-general/399.md"},g={id:"_399-evaluate-division",tabindex:"-1"};function p(c,t,h,b,v,f){const n=i("Badge");return o(),r("div",null,[e("h1",g,[t[0]||(t[0]=e("a",{href:"https://leetcode.com/problems/evaluate-division/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"399. Evaluate Division",-1)),l(n,{type:"warning",text:"Medium"}),t[1]||(t[1]=u()),t[2]||(t[2]=e("a",{class:"header-anchor",href:"#_399-evaluate-division","aria-label":'Permalink to "[399. Evaluate Division](https://leetcode.com/problems/evaluate-division/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),t[3]||(t[3]=s(`<p>You are given an array of variable pairs <code>equations</code> and an array of real numbers <code>values</code>, where <code>equations[i] = [A<sub>i</sub>, B<sub>i</sub>]</code> and <code>values[i]</code> represent the equation <code>A<sub>i</sub> / B<sub>i</sub> = values[i]</code>. Each <code>A<sub>i</sub></code> or <code>B<sub>i</sub></code> is a string that represents a single variable.</p><p>You are also given some <code>queries</code>, where <code>queries[j] = [C<sub>j</sub>, D<sub>j</sub>]</code> represents the <code>j^th</code> query where you must find the answer for <code>C<sub>j</sub> / D<sub>j</sub> = ?</code>.</p><p>Return the answers to all queries. If a single answer cannot be determined, return <code>-1.0</code>.</p><p><strong>Note:</strong> The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.</p><p><strong>Note:</strong> The variables that do not occur in the list of equations are undefined, so the answer cannot be determined for them.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: equations = [[&quot;a&quot;,&quot;b&quot;],[&quot;b&quot;,&quot;c&quot;]], values = [2.0,3.0], queries = [[&quot;a&quot;,&quot;c&quot;],[&quot;b&quot;,&quot;a&quot;],[&quot;a&quot;,&quot;e&quot;],[&quot;a&quot;,&quot;a&quot;],[&quot;x&quot;,&quot;x&quot;]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation: 
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ? 
return: [6.0, 0.5, -1.0, 1.0, -1.0]
note: x is undefined =&gt; -1.0
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: equations = [[&quot;a&quot;,&quot;b&quot;],[&quot;b&quot;,&quot;c&quot;],[&quot;bc&quot;,&quot;cd&quot;]], values = [1.5,2.5,5.0], queries = [[&quot;a&quot;,&quot;c&quot;],[&quot;c&quot;,&quot;b&quot;],[&quot;bc&quot;,&quot;cd&quot;],[&quot;cd&quot;,&quot;bc&quot;]]
Output: [3.75000,0.40000,5.00000,0.20000]
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: equations = [[&quot;a&quot;,&quot;b&quot;]], values = [0.5], queries = [[&quot;a&quot;,&quot;b&quot;],[&quot;b&quot;,&quot;a&quot;],[&quot;a&quot;,&quot;c&quot;],[&quot;x&quot;,&quot;y&quot;]]
Output: [0.50000,2.00000,-1.00000,-1.00000]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= equations.length &lt;= 20</code></li><li><code>equations[i].length == 2</code></li><li><code>1 &lt;= A<sub>i</sub>.length, B<sub>i</sub>.length &lt;= 5</code></li><li><code>values.length == equations.length</code></li><li><code>0.0 &lt; values[i] &lt;= 20.0</code></li><li><code>1 &lt;= queries.length &lt;= 20</code></li><li><code>queries[i].length == 2</code></li><li><code>1 &lt;= C<sub>j</sub>.length, D<sub>j</sub>.length &lt;= 5</code></li><li><code>A<sub>i</sub>, B<sub>i</sub>, C<sub>j</sub>, D<sub>j</sub></code> consist of lower case English letters and digits.</li></ul><h2 id="🚀-approach" tabindex="-1">🚀 Approach <a class="header-anchor" href="#🚀-approach" aria-label="Permalink to &quot;🚀 Approach&quot;">​</a></h2><h3 id="method-1-dfs-bfs-graph-traversal-recommended" tabindex="-1">Method 1: DFS/BFS Graph Traversal (Recommended) <a class="header-anchor" href="#method-1-dfs-bfs-graph-traversal-recommended" aria-label="Permalink to &quot;Method 1: DFS/BFS Graph Traversal (Recommended)&quot;">​</a></h3><h4 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h4><p>This problem can be solved by modeling the division relationships as a <strong>weighted directed graph</strong>. Each variable is a node, and each equation creates bidirectional edges with appropriate weights.</p><p><strong>Key Insight:</strong> If we know <code>a/b = 2.0</code>, we can create edges <code>a→b</code> with weight 2.0 and <code>b→a</code> with weight 0.5. Then we can use DFS/BFS to find paths between variables and calculate the result by multiplying edge weights along the path.</p><h4 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h4><ol><li><strong>Build the graph</strong> - Create adjacency list with bidirectional edges</li><li><strong>For each query</strong> - Use DFS/BFS to find path from source to target</li><li><strong>Calculate result</strong> - Multiply weights along the path</li><li><strong>Handle edge cases</strong> - Return -1.0 if variables don&#39;t exist or no path exists</li></ol><h3 id="method-2-union-find-alternative" tabindex="-1">Method 2: Union-Find (Alternative) <a class="header-anchor" href="#method-2-union-find-alternative" aria-label="Permalink to &quot;Method 2: Union-Find (Alternative)&quot;">​</a></h3><h4 id="intuition-1" tabindex="-1">Intuition <a class="header-anchor" href="#intuition-1" aria-label="Permalink to &quot;Intuition&quot;">​</a></h4><p>We can use <strong>Union-Find with weights</strong> to represent division relationships. Each variable belongs to a component, and we track the weight ratio between each variable and its root.</p><p><strong>Key Insight:</strong> If we know <code>a/b = 2.0</code>, we can union <code>a</code> and <code>b</code> with weight 2.0. The Union-Find structure automatically maintains the weight relationships through path compression.</p><h4 id="algorithm-1" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm-1" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h4><ol><li><strong>Initialize Union-Find</strong> - Each variable is its own parent with weight 1.0</li><li><strong>Process equations</strong> - Union variables with their division ratios</li><li><strong>For each query</strong> - Find roots and calculate weight ratio</li><li><strong>Handle edge cases</strong> - Return -1.0 if variables don&#39;t exist or in different components</li></ol><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><h3 id="method-1-dfs-bfs-graph-traversal-recommended-1" tabindex="-1">Method 1: DFS/BFS Graph Traversal (Recommended) <a class="header-anchor" href="#method-1-dfs-bfs-graph-traversal-recommended-1" aria-label="Permalink to &quot;Method 1: DFS/BFS Graph Traversal (Recommended)&quot;">​</a></h3><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-MMwAI" id="tab-ERfts7c" checked><label data-title="Kotlin" for="tab-ERfts7c">Kotlin</label><input type="radio" name="group-MMwAI" id="tab-5oxpEvD"><label data-title="TypeScript" for="tab-5oxpEvD">TypeScript</label><input type="radio" name="group-MMwAI" id="tab-QIMkSLm"><label data-title="Java" for="tab-QIMkSLm">Java</label><input type="radio" name="group-MMwAI" id="tab-1IRDRl5"><label data-title="Python" for="tab-1IRDRl5">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun calcEquation(equations: List&lt;List&lt;String&gt;&gt;, values: DoubleArray, queries: List&lt;List&lt;String&gt;&gt;): DoubleArray {
        // Build adjacency list
        val graph = mutableMapOf&lt;String, MutableList&lt;Pair&lt;String, Double&gt;&gt;&gt;()
        
        for (i in equations.indices) {
            val (a, b) = equations[i]
            val value = values[i]
            
            graph.getOrPut(a) { mutableListOf() }.add(Pair(b, value))
            graph.getOrPut(b) { mutableListOf() }.add(Pair(a, 1.0 / value))
        }
        
        // Process queries using DFS
        val result = mutableListOf&lt;Double&gt;()
        for ((c, d) in queries) {
            if (!graph.containsKey(c) || !graph.containsKey(d)) {
                result.add(-1.0)
            } else {
                val visited = mutableSetOf&lt;String&gt;()
                val pathValue = dfs(graph, c, d, visited)
                result.add(pathValue)
            }
        }
        
        return result.toDoubleArray()
    }
    
    private fun dfs(graph: Map&lt;String, List&lt;Pair&lt;String, Double&gt;&gt;&gt;, start: String, target: String, visited: MutableSet&lt;String&gt;): Double {
        if (start == target) return 1.0
        
        visited.add(start)
        
        for ((neighbor, weight) in graph[start] ?: emptyList()) {
            if (neighbor !in visited) {
                val result = dfs(graph, neighbor, target, visited)
                if (result != -1.0) {
                    return weight * result
                }
            }
        }
        
        visited.remove(start)
        return -1.0
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    // Build adjacency list
    const graph = new Map&lt;string, Array&lt;[string, number]&gt;&gt;();
    
    for (let i = 0; i &lt; equations.length; i++) {
        const [a, b] = equations[i];
        const value = values[i];
        
        if (!graph.has(a)) graph.set(a, []);
        if (!graph.has(b)) graph.set(b, []);
        
        graph.get(a)!.push([b, value]);
        graph.get(b)!.push([a, 1.0 / value]);
    }
    
    // Process queries using DFS
    const result: number[] = [];
    for (const [c, d] of queries) {
        if (!graph.has(c) || !graph.has(d)) {
            result.push(-1.0);
        } else {
            const visited = new Set&lt;string&gt;();
            const pathValue = dfs(graph, c, d, visited);
            result.push(pathValue);
        }
    }
    
    return result;
}

function dfs(graph: Map&lt;string, Array&lt;[string, number]&gt;&gt;, start: string, target: string, visited: Set&lt;string&gt;): number {
    if (start === target) return 1.0;
    
    visited.add(start);
    
    const neighbors = graph.get(start) || [];
    for (const [neighbor, weight] of neighbors) {
        if (!visited.has(neighbor)) {
            const result = dfs(graph, neighbor, target, visited);
            if (result !== -1.0) {
                return weight * result;
            }
        }
    }
    
    visited.delete(start);
    return -1.0;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public double[] calcEquation(List&lt;List&lt;String&gt;&gt; equations, double[] values, List&lt;List&lt;String&gt;&gt; queries) {
        // Build adjacency list
        Map&lt;String, List&lt;Pair&lt;String, Double&gt;&gt;&gt; graph = new HashMap&lt;&gt;();
        
        for (int i = 0; i &lt; equations.size(); i++) {
            String a = equations.get(i).get(0);
            String b = equations.get(i).get(1);
            double value = values[i];
            
            graph.computeIfAbsent(a, k -&gt; new ArrayList&lt;&gt;()).add(new Pair&lt;&gt;(b, value));
            graph.computeIfAbsent(b, k -&gt; new ArrayList&lt;&gt;()).add(new Pair&lt;&gt;(a, 1.0 / value));
        }
        
        // Process queries using DFS
        double[] result = new double[queries.size()];
        for (int i = 0; i &lt; queries.size(); i++) {
            String c = queries.get(i).get(0);
            String d = queries.get(i).get(1);
            
            if (!graph.containsKey(c) || !graph.containsKey(d)) {
                result[i] = -1.0;
            } else {
                Set&lt;String&gt; visited = new HashSet&lt;&gt;();
                result[i] = dfs(graph, c, d, visited);
            }
        }
        
        return result;
    }
    
    private double dfs(Map&lt;String, List&lt;Pair&lt;String, Double&gt;&gt;&gt; graph, String start, String target, Set&lt;String&gt; visited) {
        if (start.equals(target)) return 1.0;
        
        visited.add(start);
        
        List&lt;Pair&lt;String, Double&gt;&gt; neighbors = graph.get(start);
        if (neighbors != null) {
            for (Pair&lt;String, Double&gt; neighbor : neighbors) {
                String next = neighbor.getKey();
                double weight = neighbor.getValue();
                
                if (!visited.contains(next)) {
                    double result = dfs(graph, next, target, visited);
                    if (result != -1.0) {
                        return weight * result;
                    }
                }
            }
        }
        
        visited.remove(start);
        return -1.0;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -&gt; List[float]:
        # Build adjacency list
        graph = defaultdict(list)
        
        for (a, b), value in zip(equations, values):
            graph[a].append((b, value))
            graph[b].append((a, 1.0 / value))
        
        # Process queries using DFS
        result = []
        for c, d in queries:
            if c not in graph or d not in graph:
                result.append(-1.0)
            else:
                visited = set()
                path_value = self.dfs(graph, c, d, visited)
                result.append(path_value)
        
        return result
    
    def dfs(self, graph: dict, start: str, target: str, visited: set) -&gt; float:
        if start == target:
            return 1.0
        
        visited.add(start)
        
        for neighbor, weight in graph[start]:
            if neighbor not in visited:
                result = self.dfs(graph, neighbor, target, visited)
                if result != -1.0:
                    return weight * result
        
        visited.remove(start)
        return -1.0
</code></pre></div></div></div><h3 id="method-2-union-find-alternative-1" tabindex="-1">Method 2: Union-Find (Alternative) <a class="header-anchor" href="#method-2-union-find-alternative-1" aria-label="Permalink to &quot;Method 2: Union-Find (Alternative)&quot;">​</a></h3><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-9eGTb" id="tab-_8SptLq" checked><label data-title="Kotlin" for="tab-_8SptLq">Kotlin</label><input type="radio" name="group-9eGTb" id="tab-w58HTh0"><label data-title="TypeScript" for="tab-w58HTh0">TypeScript</label><input type="radio" name="group-9eGTb" id="tab-MXlLbD0"><label data-title="Java" for="tab-MXlLbD0">Java</label><input type="radio" name="group-9eGTb" id="tab-l_hPZGn"><label data-title="Python" for="tab-l_hPZGn">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun calcEquation(equations: List&lt;List&lt;String&gt;&gt;, values: DoubleArray, queries: List&lt;List&lt;String&gt;&gt;): DoubleArray {
        val parent = mutableMapOf&lt;String, String&gt;()
        val weight = mutableMapOf&lt;String, Double&gt;()
        
        fun find(x: String): String {
            if (x !in parent) {
                parent[x] = x
                weight[x] = 1.0
                return x
            }
            
            if (parent[x] != x) {
                val root = find(parent[x]!!)
                weight[x] = weight[x]!! * weight[parent[x]!!]!!
                parent[x] = root
            }
            return parent[x]!!
        }
        
        fun union(x: String, y: String, value: Double) {
            val rootX = find(x)
            val rootY = find(y)
            
            if (rootX != rootY) {
                parent[rootX] = rootY
                weight[rootX] = value * weight[y]!! / weight[x]!!
            }
        }
        
        // Build the graph
        for (i in equations.indices) {
            val (a, b) = equations[i]
            val value = values[i]
            union(a, b, value)
        }
        
        // Process queries
        val result = mutableListOf&lt;Double&gt;()
        for ((c, d) in queries) {
            if (c !in parent || d !in parent) {
                result.add(-1.0)
            } else if (find(c) != find(d)) {
                result.add(-1.0)
            } else {
                result.add(weight[c]!! / weight[d]!!)
            }
        }
        
        return result.toDoubleArray()
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    const parent = new Map&lt;string, string&gt;();
    const weight = new Map&lt;string, number&gt;();
    
    function find(x: string): string {
        if (!parent.has(x)) {
            parent.set(x, x);
            weight.set(x, 1.0);
            return x;
        }
        
        if (parent.get(x) !== x) {
            const root = find(parent.get(x)!);
            weight.set(x, weight.get(x)! * weight.get(parent.get(x)!)!);
            parent.set(x, root);
        }
        return parent.get(x)!;
    }
    
    function union(x: string, y: string, value: number): void {
        const rootX = find(x);
        const rootY = find(y);
        
        if (rootX !== rootY) {
            parent.set(rootX, rootY);
            weight.set(rootX, value * weight.get(y)! / weight.get(x)!);
        }
    }
    
    // Build the graph
    for (let i = 0; i &lt; equations.length; i++) {
        const [a, b] = equations[i];
        const value = values[i];
        union(a, b, value);
    }
    
    // Process queries
    const result: number[] = [];
    for (const [c, d] of queries) {
        if (!parent.has(c) || !parent.has(d)) {
            result.push(-1.0);
        } else if (find(c) !== find(d)) {
            result.push(-1.0);
        } else {
            result.push(weight.get(c)! / weight.get(d)!);
        }
    }
    
    return result;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public double[] calcEquation(List&lt;List&lt;String&gt;&gt; equations, double[] values, List&lt;List&lt;String&gt;&gt; queries) {
        Map&lt;String, String&gt; parent = new HashMap&lt;&gt;();
        Map&lt;String, Double&gt; weight = new HashMap&lt;&gt;();
        
        private String find(String x) {
            if (!parent.containsKey(x)) {
                parent.put(x, x);
                weight.put(x, 1.0);
                return x;
            }
            
            if (!parent.get(x).equals(x)) {
                String root = find(parent.get(x));
                weight.put(x, weight.get(x) * weight.get(parent.get(x)));
                parent.put(x, root);
            }
            return parent.get(x);
        }
        
        private void union(String x, String y, double value) {
            String rootX = find(x);
            String rootY = find(y);
            
            if (!rootX.equals(rootY)) {
                parent.put(rootX, rootY);
                weight.put(rootX, value * weight.get(y) / weight.get(x));
            }
        }
        
        // Build the graph
        for (int i = 0; i &lt; equations.size(); i++) {
            String a = equations.get(i).get(0);
            String b = equations.get(i).get(1);
            double value = values[i];
            union(a, b, value);
        }
        
        // Process queries
        double[] result = new double[queries.size()];
        for (int i = 0; i &lt; queries.size(); i++) {
            String c = queries.get(i).get(0);
            String d = queries.get(i).get(1);
            
            if (!parent.containsKey(c) || !parent.containsKey(d)) {
                result[i] = -1.0;
            } else if (!find(c).equals(find(d))) {
                result[i] = -1.0;
            } else {
                result[i] = weight.get(c) / weight.get(d);
            }
        }
        
        return result;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -&gt; List[float]:
        parent = {}
        weight = {}
        
        def find(x):
            if x not in parent:
                parent[x] = x
                weight[x] = 1.0
                return x
            
            if parent[x] != x:
                root = find(parent[x])
                weight[x] = weight[x] * weight[parent[x]]
                parent[x] = root
            return parent[x]
        
        def union(x, y, value):
            root_x = find(x)
            root_y = find(y)
            
            if root_x != root_y:
                parent[root_x] = root_y
                weight[root_x] = value * weight[y] / weight[x]
        
        # Build the graph
        for i, (a, b) in enumerate(equations):
            value = values[i]
            union(a, b, value)
        
        # Process queries
        result = []
        for c, d in queries:
            if c not in parent or d not in parent:
                result.append(-1.0)
            elif find(c) != find(d):
                result.append(-1.0)
            else:
                result.append(weight[c] / weight[d])
        
        return result
</code></pre></div></div></div><h2 id="complexity-comparison" tabindex="-1">Complexity Comparison <a class="header-anchor" href="#complexity-comparison" aria-label="Permalink to &quot;Complexity Comparison&quot;">​</a></h2><p><strong>Notation:</strong></p><ul><li><strong>V</strong> = Number of variables (vertices in the graph)</li><li><strong>E</strong> = Number of equations (edges in the graph)</li><li><strong>Q</strong> = Number of queries</li><li><strong>α(V)</strong> = Inverse Ackermann function (practically constant ≈ 4)</li></ul><h3 id="method-1-dfs-bfs-graph-traversal-recommended-2" tabindex="-1">Method 1: DFS/BFS Graph Traversal (Recommended) <a class="header-anchor" href="#method-1-dfs-bfs-graph-traversal-recommended-2" aria-label="Permalink to &quot;Method 1: DFS/BFS Graph Traversal (Recommended)&quot;">​</a></h3><ul><li><strong>Setup Time:</strong> O(E) - Build adjacency list from equations</li><li><strong>Query Time:</strong> O(Q × (V + E)) - Process all queries, each may traverse entire graph</li><li><strong>Total Time:</strong> O(E + Q × (V + E)) = O((E + Q) × V) in worst case</li><li><strong>Space Complexity:</strong> O(E + V) for adjacency list + O(V) for recursion stack</li><li><strong>Per Query Time:</strong> O(V + E) per query (can be slow for large graphs)</li></ul><h3 id="method-2-union-find-alternative-2" tabindex="-1">Method 2: Union-Find (Alternative) <a class="header-anchor" href="#method-2-union-find-alternative-2" aria-label="Permalink to &quot;Method 2: Union-Find (Alternative)&quot;">​</a></h3><ul><li><strong>Setup Time:</strong> O(E × α(V)) - Build Union-Find structure from equations</li><li><strong>Query Time:</strong> O(Q × α(V)) - Process all queries</li><li><strong>Total Time:</strong> O((E + Q) × α(V)), where α is the inverse Ackermann function (practically constant ≈ 4)</li><li><strong>Space Complexity:</strong> O(V) for parent and weight maps</li><li><strong>Per Query Time:</strong> O(α(V)) per query (extremely fast)</li></ul><h2 id="method-comparison" tabindex="-1">Method Comparison <a class="header-anchor" href="#method-comparison" aria-label="Permalink to &quot;Method Comparison&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Aspect</th><th>DFS/BFS</th><th>Union-Find</th></tr></thead><tbody><tr><td><strong>Code Complexity</strong></td><td>🔧 Simple</td><td>🔧 Medium</td></tr><tr><td><strong>Implementation</strong></td><td>Standard graph traversal</td><td>Requires Union-Find implementation</td></tr><tr><td><strong>Query Speed</strong></td><td>🐌 O(V+E) - Slower</td><td>⚡ O(α(V)) - Extremely fast</td></tr><tr><td><strong>Memory Usage</strong></td><td>💾 O(E+V) - More</td><td>💾 O(V) - Less</td></tr><tr><td><strong>Best For</strong></td><td>Few queries</td><td>Many queries</td></tr><tr><td><strong>Worst Case</strong></td><td>May be slow</td><td>Stable performance</td></tr></tbody></table><h2 id="🏆-recommendation" tabindex="-1">🏆 Recommendation <a class="header-anchor" href="#🏆-recommendation" aria-label="Permalink to &quot;🏆 Recommendation&quot;">​</a></h2><p><strong>Prefer DFS/BFS method</strong> for this problem because:</p><ol><li><strong>Simple and intuitive</strong> - Standard graph traversal algorithm</li><li><strong>Easy to implement</strong> - No need for complex data structures</li><li><strong>Good for learning</strong> - Easier to understand and master</li></ol><p><strong>Choose Union-Find when</strong>:</p><ul><li>You have many queries</li><li>You need optimal performance</li><li>You want to demonstrate advanced algorithm knowledge</li></ul>`,46))])}const y=a(d,[["render",p]]);export{q as __pageData,y as default};
