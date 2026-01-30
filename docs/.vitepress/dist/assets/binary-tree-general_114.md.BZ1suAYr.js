import{_ as r,C as l,c as o,o as a,j as t,ag as i,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"114. Flatten Binary Tree to Linked List","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/114.md","filePath":"binary-tree-general/114.md"}'),c={name:"binary-tree-general/114.md"},h={id:"_114-flatten-binary-tree-to-linked-list",tabindex:"-1"};function u(p,e,g,f,v,m){const n=l("Badge");return a(),o("div",null,[t("h1",h,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"114. Flatten Binary Tree to Linked List",-1)),s(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_114-flatten-binary-tree-to-linked-list","aria-label":'Permalink to "[114. Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>Given the <code>root</code> of a binary tree, flatten the tree into a &quot;linked list&quot;:</p><ul><li>The &quot;linked list&quot; should use the same <code>TreeNode</code> class where the <code>right</code> child pointer points to the next node in the list and the <code>left</code> child pointer is always <code>null</code>.</li><li>The &quot;linked list&quot; should be in the same order as a <a href="https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR" target="_blank"><strong>pre-order</strong> ** traversal** </a> of the binary tree.</li></ul><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/01/14/flaten.jpg" style="width:500px;height:226px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = []
Output: []
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [0]
Output: [0]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[0, 2000]</code>.</li><li><code>-100 &lt;= Node.val &lt;= 100</code></li></ul><p><strong>Follow up:</strong> Can you flatten the tree in-place (with <code>O(1)</code> extra space)?</p><h2 id="💡-approach-morris-traversal-o-1-space" tabindex="-1">💡 Approach: Morris Traversal (O(1) Space) <a class="header-anchor" href="#💡-approach-morris-traversal-o-1-space" aria-label="Permalink to &quot;💡 Approach: Morris Traversal (O(1) Space)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>The key insight is to flatten the tree in-place by rearranging the pointers. We can use Morris traversal technique to achieve O(1) space complexity.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Start from root</strong> and traverse the tree</li><li><strong>For each node with a left child</strong>: <ul><li>Find the rightmost node in the left subtree</li><li>Connect this rightmost node to the current node&#39;s right child</li><li>Move the left subtree to the right</li><li>Set left child to null</li></ul></li><li><strong>Move to the right child</strong> and repeat</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use Morris traversal to achieve O(1) space</li><li>Find rightmost node in left subtree to connect properly</li><li>Rearrange pointers to flatten in pre-order</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-EqF6Y" id="tab-nOmtQpD" checked><label data-title="Kotlin" for="tab-nOmtQpD">Kotlin</label><input type="radio" name="group-EqF6Y" id="tab-UwmFH0R"><label data-title="TypeScript" for="tab-UwmFH0R">TypeScript</label><input type="radio" name="group-EqF6Y" id="tab-QgYBt-Z"><label data-title="Java" for="tab-QgYBt-Z">Java</label><input type="radio" name="group-EqF6Y" id="tab-7d_n_YX"><label data-title="Python" for="tab-7d_n_YX">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    fun flatten(root: TreeNode?) {
        var curr = root
        
        while (curr != null) {
            if (curr.left != null) {
                // Find the rightmost node in the left subtree
                var rightmost = curr.left
                while (rightmost?.right != null) {
                    rightmost = rightmost.right
                }
                
                // Connect the rightmost node of left subtree to current&#39;s right
                rightmost?.right = curr.right
                curr.right = curr.left
                curr.left = null
            }
            
            curr = curr.right
        }
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
    flatten(root: TreeNode | null): void {
        let curr: TreeNode | null = root;
        
        while (curr !== null) {
            if (curr.left !== null) {
                // Find the rightmost node in the left subtree
                let rightmost: TreeNode | null = curr.left;
                while (rightmost.right !== null) {
                    rightmost = rightmost.right;
                }
                
                // Connect the rightmost node of left subtree to current&#39;s right
                rightmost.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            
            curr = curr.right;
        }
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
    public void flatten(TreeNode root) {
        TreeNode curr = root;
        
        while (curr != null) {
            if (curr.left != null) {
                // Find the rightmost node in the left subtree
                TreeNode rightmost = curr.left;
                while (rightmost.right != null) {
                    rightmost = rightmost.right;
                }
                
                // Connect the rightmost node of left subtree to current&#39;s right
                rightmost.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            
            curr = curr.right;
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flatten(self, root: Optional[TreeNode]) -&gt; None:
        curr = root
        
        while curr:
            if curr.left:
                # Find the rightmost node in the left subtree
                rightmost = curr.left
                while rightmost.right:
                    rightmost = rightmost.right
                
                # Connect the rightmost node of left subtree to current&#39;s right
                rightmost.right = curr.right
                curr.right = curr.left
                curr.left = None
            
            curr = curr.right
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes. Each node is visited at most twice.</li><li><strong>Space Complexity:</strong> O(1), using only constant extra space.</li></ul>`,22))])}const T=r(c,[["render",u]]);export{y as __pageData,T as default};
