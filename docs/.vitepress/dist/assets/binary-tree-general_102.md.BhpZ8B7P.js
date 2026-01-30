import{_ as l,C as r,c as a,o,j as t,ag as i,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"102. Binary Tree Level Order Traversal","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/102.md","filePath":"binary-tree-general/102.md"}'),u={name:"binary-tree-general/102.md"},p={id:"_102-binary-tree-level-order-traversal",tabindex:"-1"};function c(v,e,h,g,f,m){const n=r("Badge");return o(),a("div",null,[t("h1",p,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/binary-tree-level-order-traversal/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"102. Binary Tree Level Order Traversal",-1)),s(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_102-binary-tree-level-order-traversal","aria-label":'Permalink to "[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>Given the <code>root</code> of a binary tree, return the level order traversal of its nodes&#39; values. (i.e., from left to right, level by level).</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg" style="width:277px;height:302px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1]
Output: [[1]]
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = []
Output: []
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[0, 2000]</code>.</li><li><code>-1000 &lt;= Node.val &lt;= 1000</code></li></ul><h2 id="💡-approach-breadth-first-search-bfs" tabindex="-1">💡 Approach: Breadth-First Search (BFS) <a class="header-anchor" href="#💡-approach-breadth-first-search-bfs" aria-label="Permalink to &quot;💡 Approach: Breadth-First Search (BFS)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>We need to traverse the binary tree level by level from left to right. This is a classic <strong>BFS (Breadth-First Search)</strong> problem where we use a queue to process nodes level by level.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Use a queue</strong> to store nodes for processing</li><li><strong>Process each level</strong> by iterating through all nodes at the current level</li><li><strong>Add children</strong> of current level nodes to the queue for the next level</li><li><strong>Collect values</strong> of each level into a separate list</li><li><strong>Return the result</strong> as a list of lists</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use queue for BFS traversal</li><li>Process nodes level by level</li><li>Maintain level separation</li><li>Handle empty tree case</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-8KRtP" id="tab-JlI1plw" checked><label data-title="Kotlin" for="tab-JlI1plw">Kotlin</label><input type="radio" name="group-8KRtP" id="tab-74u-a3o"><label data-title="TypeScript" for="tab-74u-a3o">TypeScript</label><input type="radio" name="group-8KRtP" id="tab-dtSmj0g"><label data-title="Java" for="tab-dtSmj0g">Java</label><input type="radio" name="group-8KRtP" id="tab-Hmmeu6Z"><label data-title="Python" for="tab-Hmmeu6Z">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    fun levelOrder(root: TreeNode?): List&lt;List&lt;Int&gt;&gt; {
        if (root == null) return emptyList()
        
        val result = mutableListOf&lt;List&lt;Int&gt;&gt;()
        val queue = ArrayDeque&lt;TreeNode&gt;()
        queue.add(root)
        
        while (queue.isNotEmpty()) {
            val levelSize = queue.size
            val currentLevel = mutableListOf&lt;Int&gt;()
            
            repeat(levelSize) {
                val node = queue.removeFirst()
                currentLevel.add(node.\`val\`)
                
                node.left?.let { queue.add(it) }
                node.right?.let { queue.add(it) }
            }
            
            result.add(currentLevel)
        }
        
        return result
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

class Solution {
    levelOrder(root: TreeNode | null): number[][] {
        if (root === null) return [];
        
        const result: number[][] = [];
        const queue: TreeNode[] = [root];
        
        while (queue.length &gt; 0) {
            const levelSize = queue.length;
            const currentLevel: number[] = [];
            
            for (let i = 0; i &lt; levelSize; i++) {
                const node = queue.shift()!;
                currentLevel.push(node.val);
                
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            
            result.push(currentLevel);
        }
        
        return result;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public List&lt;List&lt;Integer&gt;&gt; levelOrder(TreeNode root) {
        List&lt;List&lt;Integer&gt;&gt; result = new ArrayList&lt;&gt;();
        if (root == null) return result;
        
        Queue&lt;TreeNode&gt; queue = new LinkedList&lt;&gt;();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List&lt;Integer&gt; currentLevel = new ArrayList&lt;&gt;();
            
            for (int i = 0; i &lt; levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            
            result.add(currentLevel);
        }
        
        return result;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -&gt; List[List[int]]:
        if not root:
            return []
        
        result = []
        queue = [root]
        
        while queue:
            level_size = len(queue)
            current_level = []
            
            for i in range(level_size):
                node = queue.pop(0)
                current_level.append(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(current_level)
        
        return result
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes. We visit each node exactly once.</li><li><strong>Space Complexity:</strong> O(w), where w is the maximum width of the tree (maximum number of nodes at any level).</li></ul>`,20))])}const T=l(u,[["render",c]]);export{y as __pageData,T as default};
