import{_ as o,C as a,c as r,o as l,j as t,ag as i,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"230. Kth Smallest Element in a BST","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/230.md","filePath":"binary-tree-general/230.md"}'),p={name:"binary-tree-general/230.md"},c={id:"_230-kth-smallest-element-in-a-bst",tabindex:"-1"};function u(h,e,v,g,m,f){const n=a("Badge");return l(),r("div",null,[t("h1",c,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"230. Kth Smallest Element in a BST",-1)),s(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_230-kth-smallest-element-in-a-bst","aria-label":'Permalink to "[230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>Given the <code>root</code> of a binary search tree, and an integer <code>k</code>, return the <code>k^th</code> smallest value (<strong>1-indexed</strong> ) of all the values of the nodes in the tree.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg" style="width:212px;height:301px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [3,1,4,null,2], k = 1
Output: 1
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg" style="width:382px;height:302px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is <code>n</code>.</li><li><code>1 &lt;= k &lt;= n &lt;= 10^4</code></li><li><code>0 &lt;= Node.val &lt;= 10^4</code></li></ul><p><strong>Follow up:</strong> If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?</p><h2 id="💡-approach-inorder-traversal" tabindex="-1">💡 Approach: Inorder Traversal <a class="header-anchor" href="#💡-approach-inorder-traversal" aria-label="Permalink to &quot;💡 Approach: Inorder Traversal&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>Since this is a <strong>Binary Search Tree (BST)</strong>, an inorder traversal will visit the nodes in ascending order (smallest to largest). We can perform inorder traversal and return the kth node we visit.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Perform inorder traversal</strong> (left → root → right)</li><li><strong>Keep a counter</strong> to track how many nodes we&#39;ve visited</li><li><strong>When counter equals k</strong>, we&#39;ve found the kth smallest element</li><li><strong>Return the value</strong> of that node</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Inorder traversal of BST gives sorted order</li><li>Use counter to track visited nodes</li><li>Stop traversal once kth element is found</li><li>Can optimize by stopping early</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-wMUKx" id="tab-GYC7WAd" checked><label data-title="Kotlin" for="tab-GYC7WAd">Kotlin</label><input type="radio" name="group-wMUKx" id="tab-Xkxx9zn"><label data-title="TypeScript" for="tab-Xkxx9zn">TypeScript</label><input type="radio" name="group-wMUKx" id="tab-_rBR9Ix"><label data-title="Java" for="tab-_rBR9Ix">Java</label><input type="radio" name="group-wMUKx" id="tab-xmn2XBx"><label data-title="Python" for="tab-xmn2XBx">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    private var count = 0
    private var result = 0
    
    fun kthSmallest(root: TreeNode?, k: Int): Int {
        count = k
        inorder(root)
        return result
    }
    
    private fun inorder(node: TreeNode?) {
        if (node == null) return
        
        inorder(node.left)
        
        count--
        if (count == 0) {
            result = node.\`val\`
            return
        }
        
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
    private count: number = 0;
    private result: number = 0;
    
    kthSmallest(root: TreeNode | null, k: number): number {
        this.count = k;
        this.inorder(root);
        return this.result;
    }
    
    private inorder(node: TreeNode | null): void {
        if (node === null) return;
        
        this.inorder(node.left);
        
        this.count--;
        if (this.count === 0) {
            this.result = node.val;
            return;
        }
        
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
    private int count = 0;
    private int result = 0;
    
    public int kthSmallest(TreeNode root, int k) {
        count = k;
        inorder(root);
        return result;
    }
    
    private void inorder(TreeNode node) {
        if (node == null) return;
        
        inorder(node.left);
        
        count--;
        if (count == 0) {
            result = node.val;
            return;
        }
        
        inorder(node.right);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -&gt; int:
        self.count = k
        self.result = 0
        
        def inorder(node):
            if not node:
                return
            
            inorder(node.left)
            
            self.count -= 1
            if self.count == 0:
                self.result = node.val
                return
            
            inorder(node.right)
        
        inorder(root)
        return self.result
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(h + k), where h is the height of the tree. In the worst case, we might need to visit k nodes.</li><li><strong>Space Complexity:</strong> O(h), where h is the height of the tree (recursion stack space).</li></ul>`,19))])}const k=o(p,[["render",u]]);export{y as __pageData,k as default};
