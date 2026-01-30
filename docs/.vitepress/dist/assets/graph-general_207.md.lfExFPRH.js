import{_ as o,C as t,c as s,o as i,j as n,ag as a,G as l,a as u}from"./chunks/framework.Bw-5EFTY.js";const q=JSON.parse('{"title":"207. Course Schedule","description":"","frontmatter":{},"headers":[],"relativePath":"graph-general/207.md","filePath":"graph-general/207.md"}'),c={name:"graph-general/207.md"},p={id:"_207-course-schedule",tabindex:"-1"};function d(g,e,h,b,m,f){const r=t("Badge");return i(),s("div",null,[n("h1",p,[e[0]||(e[0]=n("a",{href:"https://leetcode.com/problems/course-schedule/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"207. Course Schedule",-1)),l(r,{type:"warning",text:"Medium"}),e[1]||(e[1]=u()),e[2]||(e[2]=n("a",{class:"header-anchor",href:"#_207-course-schedule","aria-label":'Permalink to "[207. Course Schedule](https://leetcode.com/problems/course-schedule/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=a(`<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you <strong>must</strong> take course <code>b<sub>i</sub></code> first if you want to take course <code>a<sub>i</sub></code>.</p><ul><li>For example, the pair <code>[0, 1]</code>, indicates that to take course <code>0</code> you have to first take course <code>1</code>.</li></ul><p>Return <code>true</code> if you can finish all courses. Otherwise, return <code>false</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= numCourses &lt;= 2000</code></li><li><code>0 &lt;= prerequisites.length &lt;= 5000</code></li><li><code>prerequisites[i].length == 2</code></li><li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li><li>All the pairs prerequisites[i] are <strong>unique</strong> .</li></ul><h2 id="🚀-approach-topological-sort-with-bfs-kahn-s-algorithm" tabindex="-1">🚀 Approach: Topological Sort with BFS (Kahn&#39;s Algorithm) <a class="header-anchor" href="#🚀-approach-topological-sort-with-bfs-kahn-s-algorithm" aria-label="Permalink to &quot;🚀 Approach: Topological Sort with BFS (Kahn&#39;s Algorithm)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>cycle detection in a directed graph</strong> problem. We can model the courses and prerequisites as a directed graph where:</p><ul><li>Each course is a node</li><li>Each prerequisite <code>[a, b]</code> creates a directed edge from <code>b</code> to <code>a</code> (b must be taken before a)</li></ul><p>The problem asks if we can find a valid topological ordering, which is possible if and only if the graph is a <strong>DAG (Directed Acyclic Graph)</strong>.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Build the graph</strong> and calculate in-degrees for each node</li><li><strong>Use BFS (Kahn&#39;s Algorithm)</strong> to process nodes with zero in-degree</li><li><strong>For each processed node</strong>, reduce in-degrees of its neighbors</li><li><strong>If we can process all nodes</strong>, there&#39;s no cycle; otherwise, there&#39;s a cycle</li></ol><p><strong>Key Insight:</strong> If there&#39;s a cycle in the graph, some nodes will never have their in-degree reduced to 0, so they&#39;ll never be processed.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-sEYwn" id="tab-LI7D3A4" checked><label data-title="Kotlin" for="tab-LI7D3A4">Kotlin</label><input type="radio" name="group-sEYwn" id="tab-r7uN1uu"><label data-title="TypeScript" for="tab-r7uN1uu">TypeScript</label><input type="radio" name="group-sEYwn" id="tab-HBL2XuW"><label data-title="Java" for="tab-HBL2XuW">Java</label><input type="radio" name="group-sEYwn" id="tab-_-B_OqA"><label data-title="Python" for="tab-_-B_OqA">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun canFinish(numCourses: Int, prerequisites: Array&lt;IntArray&gt;): Boolean {
        // Build adjacency list and calculate in-degrees
        val graph = mutableMapOf&lt;Int, MutableList&lt;Int&gt;&gt;()
        val inDegree = IntArray(numCourses)
        
        for ((course, prereq) in prerequisites) {
            graph.getOrPut(prereq) { mutableListOf() }.add(course)
            inDegree[course]++
        }
        
        // BFS with queue for topological sort
        val queue = ArrayDeque&lt;Int&gt;()
        for (i in 0 until numCourses) {
            if (inDegree[i] == 0) {
                queue.offer(i)
            }
        }
        
        var processed = 0
        while (queue.isNotEmpty()) {
            val current = queue.poll()
            processed++
            
            // Process neighbors
            graph[current]?.forEach { neighbor -&gt;
                inDegree[neighbor]--
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor)
                }
            }
        }
        
        return processed == numCourses
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // Build adjacency list and calculate in-degrees
    const graph = new Map&lt;number, number[]&gt;();
    const inDegree = new Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        if (!graph.has(prereq)) {
            graph.set(prereq, []);
        }
        graph.get(prereq)!.push(course);
        inDegree[course]++;
    }
    
    // BFS with queue for topological sort
    const queue: number[] = [];
    for (let i = 0; i &lt; numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    let processed = 0;
    while (queue.length &gt; 0) {
        const current = queue.shift()!;
        processed++;
        
        // Process neighbors
        const neighbors = graph.get(current) || [];
        for (const neighbor of neighbors) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return processed === numCourses;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Build adjacency list and calculate in-degrees
        List&lt;List&lt;Integer&gt;&gt; graph = new ArrayList&lt;&gt;();
        int[] inDegree = new int[numCourses];
        
        for (int i = 0; i &lt; numCourses; i++) {
            graph.add(new ArrayList&lt;&gt;());
        }
        
        for (int[] prereq : prerequisites) {
            int course = prereq[0];
            int prereqCourse = prereq[1];
            graph.get(prereqCourse).add(course);
            inDegree[course]++;
        }
        
        // BFS with queue for topological sort
        Queue&lt;Integer&gt; queue = new LinkedList&lt;&gt;();
        for (int i = 0; i &lt; numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }
        
        int processed = 0;
        while (!queue.isEmpty()) {
            int current = queue.poll();
            processed++;
            
            // Process neighbors
            for (int neighbor : graph.get(current)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        return processed == numCourses;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -&gt; bool:
        # Build adjacency list and calculate in-degrees
        graph = [[] for _ in range(numCourses)]
        in_degree = [0] * numCourses
        
        for course, prereq in prerequisites:
            graph[prereq].append(course)
            in_degree[course] += 1
        
        # BFS with queue for topological sort
        queue = deque()
        for i in range(numCourses):
            if in_degree[i] == 0:
                queue.append(i)
        
        processed = 0
        while queue:
            current = queue.popleft()
            processed += 1
            
            # Process neighbors
            for neighbor in graph[current]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        return processed == numCourses
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(V + E), where V is the number of courses and E is the number of prerequisites</li><li><strong>Space Complexity:</strong> O(V + E) for storing the graph and in-degree array</li></ul>`,22))])}const y=o(c,[["render",d]]);export{q as __pageData,y as default};
