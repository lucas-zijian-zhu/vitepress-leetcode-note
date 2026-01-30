import{_ as n,c as o,o as a,ag as t}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"133. Clone Graph","description":"","frontmatter":{},"headers":[],"relativePath":"graph-general/133.md","filePath":"graph-general/133.md"}'),l={name:"graph-general/133.md"};function i(s,e,d,r,p,c){return a(),o("div",null,e[0]||(e[0]=[t(`<h1 id="_133-clone-graph" tabindex="-1"><a href="https://leetcode.com/problems/clone-graph/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">133. Clone Graph</a> <a class="header-anchor" href="#_133-clone-graph" aria-label="Permalink to &quot;[133. Clone Graph](https://leetcode.com/problems/clone-graph/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a reference of a node in a <strong><a href="https://en.wikipedia.org/wiki/Connectivity_(graph_theory)#Connected_graph" target="_blank">connected</a></strong> undirected graph.</p><p>Return a <a href="https://en.wikipedia.org/wiki/Object_copying#Deep_copy" target="_blank"><strong>deep copy</strong></a> (clone) of the graph.</p><p>Each node in the graph contains a value (<code>int</code>) and a list (<code>List[Node]</code>) of its neighbors.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">class Node {
    public int val;
    public List&lt;Node&gt; neighbors;
}
</code></pre></div><p><strong>Test case format:</strong></p><p>For simplicity, each node&#39;s value is the same as the node&#39;s index (1-indexed). For example, the first node with <code>val == 1</code>, the second node with <code>val == 2</code>, and so on. The graph is represented in the test case using an adjacency list.</p><p><b>An adjacency list</b> is a collection of unordered <b>lists</b> used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.</p><p>The given node will always be the first node with <code>val = 1</code>. You must return the <strong>copy of the given node</strong> as a reference to the cloned graph.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2019/11/04/133_clone_graph_question.png" style="width:454px;height:500px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)&#39;s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)&#39;s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)&#39;s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)&#39;s neighbors are 1st node (val = 1) and 3rd node (val = 3).
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/01/07/graph.png" style="width:163px;height:148px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the graph is in the range <code>[0, 100]</code>.</li><li><code>1 &lt;= Node.val &lt;= 100</code></li><li><code>Node.val</code> is unique for each node.</li><li>There are no repeated edges and no self-loops in the graph.</li><li>The Graph is connected and all nodes can be visited starting from the given node.</li></ul><h2 id="💡-approach-dfs-with-hashmap" tabindex="-1">💡 Approach: DFS with HashMap <a class="header-anchor" href="#💡-approach-dfs-with-hashmap" aria-label="Permalink to &quot;💡 Approach: DFS with HashMap&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>To clone a graph, we need to create a copy of each node and maintain the same neighbor relationships. The key challenge is handling cycles in the graph. We use a <strong>HashMap</strong> to track visited nodes and their clones.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Use HashMap</strong> to store mapping from original node to cloned node</li><li><strong>Use DFS</strong> to traverse the graph</li><li><strong>For each node</strong>: <ul><li>If already cloned, return the clone from HashMap</li><li>Otherwise, create a new clone</li><li>Recursively clone all neighbors</li><li>Add neighbors to the cloned node</li></ul></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use HashMap to avoid infinite loops (handle cycles)</li><li>DFS or BFS both work</li><li>Deep copy means copying structure and values</li><li>Handle null input edge case</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-ufa_9" id="tab-VUl4SrX" checked><label data-title="Kotlin" for="tab-VUl4SrX">Kotlin</label><input type="radio" name="group-ufa_9" id="tab-d3eEYH7"><label data-title="TypeScript" for="tab-d3eEYH7">TypeScript</label><input type="radio" name="group-ufa_9" id="tab-wWj3TXC"><label data-title="Java" for="tab-wWj3TXC">Java</label><input type="radio" name="group-ufa_9" id="tab--hNAd1H"><label data-title="Python" for="tab--hNAd1H">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Node(var \`val\`: Int) {
    var neighbors: ArrayList&lt;Node?&gt; = ArrayList()
}

class Solution {
    private val visited = HashMap&lt;Node, Node&gt;()
    
    fun cloneGraph(node: Node?): Node? {
        if (node == null) return null
        
        // If node already cloned, return the clone
        if (visited.containsKey(node)) {
            return visited[node]
        }
        
        // Create a clone for the current node
        val cloneNode = Node(node.\`val\`)
        visited[node] = cloneNode
        
        // Clone all neighbors
        for (neighbor in node.neighbors) {
            cloneNode.neighbors.add(cloneGraph(neighbor))
        }
        
        return cloneNode
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Node {
    val: number;
    neighbors: Node[];
    constructor(val?: number, neighbors?: Node[]) {
        this.val = (val === undefined ? 0 : val);
        this.neighbors = (neighbors === undefined ? [] : neighbors);
    }
}

function cloneGraph(node: Node | null): Node | null {
    if (node === null) return null;
    
    const visited = new Map&lt;Node, Node&gt;();
    
    function dfs(node: Node): Node {
        // If node already cloned, return the clone
        if (visited.has(node)) {
            return visited.get(node)!;
        }
        
        // Create a clone for the current node
        const cloneNode = new Node(node.val);
        visited.set(node, cloneNode);
        
        // Clone all neighbors
        for (const neighbor of node.neighbors) {
            cloneNode.neighbors.push(dfs(neighbor));
        }
        
        return cloneNode;
    }
    
    return dfs(node);
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Node {
    public int val;
    public List&lt;Node&gt; neighbors;
    
    public Node() {
        val = 0;
        neighbors = new ArrayList&lt;Node&gt;();
    }
    
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList&lt;Node&gt;();
    }
    
    public Node(int _val, ArrayList&lt;Node&gt; _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}

class Solution {
    private HashMap&lt;Node, Node&gt; visited = new HashMap&lt;&gt;();
    
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        
        // If node already cloned, return the clone
        if (visited.containsKey(node)) {
            return visited.get(node);
        }
        
        // Create a clone for the current node
        Node cloneNode = new Node(node.val);
        visited.put(node, cloneNode);
        
        // Clone all neighbors
        for (Node neighbor : node.neighbors) {
            cloneNode.neighbors.add(cloneGraph(neighbor));
        }
        
        return cloneNode;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node: Optional[&#39;Node&#39;]) -&gt; Optional[&#39;Node&#39;]:
        if not node:
            return None
        
        visited = {}
        
        def dfs(node):
            # If node already cloned, return the clone
            if node in visited:
                return visited[node]
            
            # Create a clone for the current node
            clone_node = Node(node.val)
            visited[node] = clone_node
            
            # Clone all neighbors
            for neighbor in node.neighbors:
                clone_node.neighbors.append(dfs(neighbor))
            
            return clone_node
        
        return dfs(node)
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n + m), where n is the number of nodes and m is the number of edges. We visit each node and edge once.</li><li><strong>Space Complexity:</strong> O(n) for the HashMap to store all cloned nodes and O(h) for the recursion stack where h is the depth of the graph.</li></ul>`,28)]))}const u=n(l,[["render",i]]);export{g as __pageData,u as default};
