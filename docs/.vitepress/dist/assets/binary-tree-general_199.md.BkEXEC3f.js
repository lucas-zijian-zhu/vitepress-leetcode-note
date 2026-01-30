import{_ as l,C as o,c as a,o as r,j as t,ag as i,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"199. Binary Tree Right Side View","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/199.md","filePath":"binary-tree-general/199.md"}'),u={name:"binary-tree-general/199.md"},p={id:"_199-binary-tree-right-side-view",tabindex:"-1"};function c(h,e,g,v,m,f){const n=o("Badge");return r(),a("div",null,[t("h1",p,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/binary-tree-right-side-view/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"199. Binary Tree Right Side View",-1)),s(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_199-binary-tree-right-side-view","aria-label":'Permalink to "[199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>Given the <code>root</code> of a binary tree, imagine yourself standing on the <strong>right side</strong> of it, return the values of the nodes you can see ordered from top to bottom.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2024/11/24/tmpd5jn43fs-1.png" style="width:400px;height:207px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2024/11/24/tmpkpe40xeh-1.png" style="width:400px;height:214px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2,3,4,null,null,null,5]
Output: [1,3,4,5]
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,null,3]
Output: [1,3]
</code></pre></div><p><strong>Example 4:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = []
Output: []
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li><li><code>-100 &lt;= Node.val &lt;= 100</code></li></ul><h2 id="💡-approach-level-order-traversal-bfs" tabindex="-1">💡 Approach: Level Order Traversal (BFS) <a class="header-anchor" href="#💡-approach-level-order-traversal-bfs" aria-label="Permalink to &quot;💡 Approach: Level Order Traversal (BFS)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>The right side view of a binary tree consists of the rightmost node at each level. We can solve this using <strong>BFS (level-order traversal)</strong> to process each level and collect the rightmost node.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Use BFS</strong> to traverse the tree level by level</li><li><strong>For each level</strong>, keep track of the rightmost node</li><li><strong>Add the rightmost node</strong> of each level to the result</li><li><strong>Return the result</strong> array</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use queue for BFS traversal</li><li>Process nodes level by level</li><li>Always take the rightmost node of each level</li><li>Handle empty tree case</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-sT9HJ" id="tab-j0Q_dQn" checked><label data-title="Kotlin" for="tab-j0Q_dQn">Kotlin</label><input type="radio" name="group-sT9HJ" id="tab-cHs1ZJ1"><label data-title="TypeScript" for="tab-cHs1ZJ1">TypeScript</label><input type="radio" name="group-sT9HJ" id="tab-ol4QrV8"><label data-title="Java" for="tab-ol4QrV8">Java</label><input type="radio" name="group-sT9HJ" id="tab-XZjtZJd"><label data-title="Python" for="tab-XZjtZJd">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    fun rightSideView(root: TreeNode?): List&lt;Int&gt; {
        if (root == null) return emptyList()
        
        val result = mutableListOf&lt;Int&gt;()
        val queue = ArrayDeque&lt;TreeNode&gt;()
        queue.add(root)
        
        while (queue.isNotEmpty()) {
            val levelSize = queue.size
            var rightmost = 0
            
            repeat(levelSize) {
                val node = queue.removeFirst()
                rightmost = node.\`val\`
                
                node.left?.let { queue.add(it) }
                node.right?.let { queue.add(it) }
            }
            
            result.add(rightmost)
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
    rightSideView(root: TreeNode | null): number[] {
        if (root === null) return [];
        
        const result: number[] = [];
        const queue: TreeNode[] = [root];
        
        while (queue.length &gt; 0) {
            const levelSize = queue.length;
            let rightmost = 0;
            
            for (let i = 0; i &lt; levelSize; i++) {
                const node = queue.shift()!;
                rightmost = node.val;
                
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            
            result.push(rightmost);
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
    public List&lt;Integer&gt; rightSideView(TreeNode root) {
        List&lt;Integer&gt; result = new ArrayList&lt;&gt;();
        if (root == null) return result;
        
        Queue&lt;TreeNode&gt; queue = new LinkedList&lt;&gt;();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            int rightmost = 0;
            
            for (int i = 0; i &lt; levelSize; i++) {
                TreeNode node = queue.poll();
                rightmost = node.val;
                
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            
            result.add(rightmost);
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
    def rightSideView(self, root: Optional[TreeNode]) -&gt; List[int]:
        if not root:
            return []
        
        result = []
        queue = [root]
        
        while queue:
            level_size = len(queue)
            rightmost = 0
            
            for i in range(level_size):
                node = queue.pop(0)
                rightmost = node.val
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(rightmost)
        
        return result
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes. We visit each node exactly once.</li><li><strong>Space Complexity:</strong> O(w), where w is the maximum width of the tree (maximum number of nodes at any level).</li></ul>`,22))])}const T=l(u,[["render",c]]);export{y as __pageData,T as default};
