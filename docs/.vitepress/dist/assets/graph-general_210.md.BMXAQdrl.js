import{_ as t,C as o,c as s,o as i,j as n,ag as a,G as u,a as l}from"./chunks/framework.Bw-5EFTY.js";const v=JSON.parse('{"title":"210. Course Schedule II","description":"","frontmatter":{},"headers":[],"relativePath":"graph-general/210.md","filePath":"graph-general/210.md"}'),c={name:"graph-general/210.md"},d={id:"_210-course-schedule-ii",tabindex:"-1"};function p(g,e,h,b,f,m){const r=o("Badge");return i(),s("div",null,[n("h1",d,[e[0]||(e[0]=n("a",{href:"https://leetcode.com/problems/course-schedule-ii/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"210. Course Schedule II",-1)),u(r,{type:"warning",text:"Medium"}),e[1]||(e[1]=l()),e[2]||(e[2]=n("a",{class:"header-anchor",href:"#_210-course-schedule-ii","aria-label":'Permalink to "[210. Course Schedule II](https://leetcode.com/problems/course-schedule-ii/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=a(`<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you <strong>must</strong> take course <code>b<sub>i</sub></code> first if you want to take course <code>a<sub>i</sub></code>.</p><ul><li>For example, the pair <code>[0, 1]</code>, indicates that to take course <code>0</code> you have to first take course <code>1</code>.</li></ul><p>Return the ordering of courses you should take to finish all courses. If there are many valid answers, return <strong>any</strong> of them. If it is impossible to finish all courses, return <strong>an empty array</strong> .</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: numCourses = 1, prerequisites = []
Output: [0]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= numCourses &lt;= 2000</code></li><li><code>0 &lt;= prerequisites.length &lt;= numCourses * (numCourses - 1)</code></li><li><code>prerequisites[i].length == 2</code></li><li><code>0 &lt;= a<sub>i</sub>, b<sub>i</sub> &lt; numCourses</code></li><li><code>a<sub>i</sub> != b<sub>i</sub></code></li><li>All the pairs <code>[a<sub>i</sub>, b<sub>i</sub>]</code> are <strong>distinct</strong> .</li></ul><h2 id="🚀-approach-topological-sort-with-bfs-kahn-s-algorithm" tabindex="-1">🚀 Approach: Topological Sort with BFS (Kahn&#39;s Algorithm) <a class="header-anchor" href="#🚀-approach-topological-sort-with-bfs-kahn-s-algorithm" aria-label="Permalink to &quot;🚀 Approach: Topological Sort with BFS (Kahn&#39;s Algorithm)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a <strong>topological sorting</strong> problem. We need to find a valid ordering of courses such that all prerequisites are satisfied. This is equivalent to finding a topological ordering of a directed graph where:</p><ul><li>Each course is a node</li><li>Each prerequisite <code>[a, b]</code> creates a directed edge from <code>b</code> to <code>a</code> (b must be taken before a)</li></ul><p>If there&#39;s a cycle in the graph, no valid topological ordering exists.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Build the graph</strong> and calculate in-degrees for each node</li><li><strong>Use BFS (Kahn&#39;s Algorithm)</strong> to process nodes with zero in-degree</li><li><strong>Add processed nodes to result</strong> and reduce in-degrees of their neighbors</li><li><strong>If we can process all nodes</strong>, return the topological order; otherwise, return empty array</li></ol><p><strong>Key Insight:</strong> The order in which nodes are processed gives us a valid topological ordering.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-_KEby" id="tab-sd6fHGo" checked><label data-title="Kotlin" for="tab-sd6fHGo">Kotlin</label><input type="radio" name="group-_KEby" id="tab-U-0nlDc"><label data-title="TypeScript" for="tab-U-0nlDc">TypeScript</label><input type="radio" name="group-_KEby" id="tab-cbbAw1s"><label data-title="Java" for="tab-cbbAw1s">Java</label><input type="radio" name="group-_KEby" id="tab-N7_GyMc"><label data-title="Python" for="tab-N7_GyMc">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun findOrder(numCourses: Int, prerequisites: Array&lt;IntArray&gt;): IntArray {
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
        
        val result = mutableListOf&lt;Int&gt;()
        while (queue.isNotEmpty()) {
            val current = queue.poll()
            result.add(current)
            
            // Process neighbors
            graph[current]?.forEach { neighbor -&gt;
                inDegree[neighbor]--
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor)
                }
            }
        }
        
        return if (result.size == numCourses) result.toIntArray() else intArrayOf()
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function findOrder(numCourses: number, prerequisites: number[][]): number[] {
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
    
    const result: number[] = [];
    while (queue.length &gt; 0) {
        const current = queue.shift()!;
        result.push(current);
        
        // Process neighbors
        const neighbors = graph.get(current) || [];
        for (const neighbor of neighbors) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return result.length === numCourses ? result : [];
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
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
        
        List&lt;Integer&gt; result = new ArrayList&lt;&gt;();
        while (!queue.isEmpty()) {
            int current = queue.poll();
            result.add(current);
            
            // Process neighbors
            for (int neighbor : graph.get(current)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        if (result.size() == numCourses) {
            return result.stream().mapToInt(Integer::intValue).toArray();
        } else {
            return new int[0];
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -&gt; List[int]:
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
        
        result = []
        while queue:
            current = queue.popleft()
            result.append(current)
            
            # Process neighbors
            for neighbor in graph[current]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        return result if len(result) == numCourses else []
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(V + E), where V is the number of courses and E is the number of prerequisites</li><li><strong>Space Complexity:</strong> O(V + E) for storing the graph, in-degree array, and result</li></ul>`,24))])}const q=t(c,[["render",p]]);export{v as __pageData,q as default};
