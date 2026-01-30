import{_ as i,C as r,c as o,o as a,j as n,ag as l,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const T=JSON.parse('{"title":"530. Minimum Absolute Difference in BST","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/530.md","filePath":"binary-tree-general/530.md"}'),p={name:"binary-tree-general/530.md"},c={id:"_530-minimum-absolute-difference-in-bst",tabindex:"-1"};function u(f,e,m,h,v,g){const t=r("Badge");return a(),o("div",null,[n("h1",c,[e[0]||(e[0]=n("a",{href:"https://leetcode.com/problems/minimum-absolute-difference-in-bst/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"530. Minimum Absolute Difference in BST",-1)),s(t,{type:"warning",text:"Easy"}),e[1]||(e[1]=d()),e[2]||(e[2]=n("a",{class:"header-anchor",href:"#_530-minimum-absolute-difference-in-bst","aria-label":'Permalink to "[530. Minimum Absolute Difference in BST](https://leetcode.com/problems/minimum-absolute-difference-in-bst/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Easy" />"'},"​",-1))]),e[3]||(e[3]=l(`<p>Given the <code>root</code> of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/02/05/bst1.jpg" style="width:292px;height:301px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [4,2,6,1,3]
Output: 1
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/02/05/bst2.jpg" style="width:282px;height:301px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,0,48,null,null,12,49]
Output: 1
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[2, 10^4]</code>.</li><li><code>0 &lt;= Node.val &lt;= 10^5</code></li></ul><p><strong>Note:</strong> This question is the same as 783: <a href="https://leetcode.com/problems/minimum-distance-between-bst-nodes/" target="_blank"><a href="https://leetcode.com/problems/minimum-distance-between-bst-nodes/" target="_blank" rel="noreferrer">https://leetcode.com/problems/minimum-distance-between-bst-nodes/</a></a></p><h2 id="💡-approach-inorder-traversal" tabindex="-1">💡 Approach: Inorder Traversal <a class="header-anchor" href="#💡-approach-inorder-traversal" aria-label="Permalink to &quot;💡 Approach: Inorder Traversal&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>Since this is a <strong>Binary Search Tree (BST)</strong>, an inorder traversal will give us the nodes in sorted order. The minimum absolute difference will be between two consecutive nodes in the sorted order.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Perform inorder traversal</strong> to get nodes in sorted order</li><li><strong>Keep track of the previous node</strong> during traversal</li><li><strong>Calculate the difference</strong> between current and previous node</li><li><strong>Update minimum difference</strong> if current difference is smaller</li><li><strong>Return the minimum difference</strong></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use inorder traversal for BST to get sorted order</li><li>Track previous node during traversal</li><li>Compare consecutive nodes only</li><li>Handle single node case</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-A1K2g" id="tab-h0SjOsb" checked><label data-title="Kotlin" for="tab-h0SjOsb">Kotlin</label><input type="radio" name="group-A1K2g" id="tab-0j72WT0"><label data-title="TypeScript" for="tab-0j72WT0">TypeScript</label><input type="radio" name="group-A1K2g" id="tab-iiWdGuv"><label data-title="Java" for="tab-iiWdGuv">Java</label><input type="radio" name="group-A1K2g" id="tab-zUDg_du"><label data-title="Python" for="tab-zUDg_du">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    private var minDiff = Int.MAX_VALUE
    private var prev: TreeNode? = null
    
    fun getMinimumDifference(root: TreeNode?): Int {
        inorder(root)
        return minDiff
    }
    
    private fun inorder(node: TreeNode?) {
        if (node == null) return
        
        inorder(node.left)
        
        prev?.let {
            minDiff = minOf(minDiff, node.\`val\` - it.\`val\`)
        }
        prev = node
        
        inorder(node.right)
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
    private minDiff: number = Number.MAX_SAFE_INTEGER;
    private prev: TreeNode | null = null;
    
    getMinimumDifference(root: TreeNode | null): number {
        this.inorder(root);
        return this.minDiff;
    }
    
    private inorder(node: TreeNode | null): void {
        if (node === null) return;
        
        this.inorder(node.left);
        
        if (this.prev !== null) {
            this.minDiff = Math.min(this.minDiff, node.val - this.prev.val);
        }
        this.prev = node;
        
        this.inorder(node.right);
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
    private int minDiff = Integer.MAX_VALUE;
    private TreeNode prev = null;
    
    public int getMinimumDifference(TreeNode root) {
        inorder(root);
        return minDiff;
    }
    
    private void inorder(TreeNode node) {
        if (node == null) return;
        
        inorder(node.left);
        
        if (prev != null) {
            minDiff = Math.min(minDiff, node.val - prev.val);
        }
        prev = node;
        
        inorder(node.right);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def getMinimumDifference(self, root: Optional[TreeNode]) -&gt; int:
        self.min_diff = float(&#39;inf&#39;)
        self.prev = None
        
        def inorder(node):
            if not node:
                return
            
            inorder(node.left)
            
            if self.prev is not None:
                self.min_diff = min(self.min_diff, node.val - self.prev.val)
            self.prev = node
            
            inorder(node.right)
        
        inorder(root)
        return self.min_diff
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes. We visit each node exactly once.</li><li><strong>Space Complexity:</strong> O(h), where h is the height of the tree (recursion stack space).</li></ul>`,19))])}const y=i(p,[["render",u]]);export{T as __pageData,y as default};
