import{_ as r,C as a,c as l,o,j as t,ag as i,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"98. Validate Binary Search Tree","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/98.md","filePath":"binary-tree-general/98.md"}'),p={name:"binary-tree-general/98.md"},u={id:"_98-validate-binary-search-tree",tabindex:"-1"};function c(h,e,v,g,f,b){const n=a("Badge");return o(),l("div",null,[t("h1",u,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/validate-binary-search-tree/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"98. Validate Binary Search Tree",-1)),s(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_98-validate-binary-search-tree","aria-label":'Permalink to "[98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>Given the <code>root</code> of a binary tree, determine if it is a valid binary search tree (BST).</p><p>A <strong>valid BST</strong> is defined as follows:</p><ul><li>The left subtree of a node contains only nodes with keys <strong>strictly less than</strong> the node&#39;s key.</li><li>The right subtree of a node contains only nodes with keys <strong>strictly greater than</strong> the node&#39;s key.</li><li>Both the left and right subtrees must also be binary search trees.</li></ul><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg" style="width:302px;height:182px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [2,1,3]
Output: true
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg" style="width:422px;height:292px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node&#39;s value is 5 but its right child&#39;s value is 4.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[1, 10^4]</code>.</li><li><code>-2^31 &lt;= Node.val &lt;= 2^31 - 1</code></li></ul><h2 id="💡-approach-inorder-traversal-with-previous-value" tabindex="-1">💡 Approach: Inorder Traversal with Previous Value <a class="header-anchor" href="#💡-approach-inorder-traversal-with-previous-value" aria-label="Permalink to &quot;💡 Approach: Inorder Traversal with Previous Value&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>For a valid BST, an <strong>inorder traversal</strong> produces a strictly increasing sequence. We can perform inorder traversal and check if each value is greater than the previous value.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Perform inorder traversal</strong> (left → root → right)</li><li><strong>Track the previous node&#39;s value</strong> during traversal</li><li><strong>Check if current value &gt; previous value</strong></li><li><strong>If any violation is found</strong>, return false</li><li><strong>If traversal completes without violation</strong>, return true</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Inorder traversal of BST must be strictly increasing</li><li>Use previous value to compare with current</li><li>Handle edge case of first node (no previous)</li><li>Can use either recursive or iterative approach</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-GUBU3" id="tab-WuPrvyW" checked><label data-title="Kotlin" for="tab-WuPrvyW">Kotlin</label><input type="radio" name="group-GUBU3" id="tab-wA6L0gg"><label data-title="TypeScript" for="tab-wA6L0gg">TypeScript</label><input type="radio" name="group-GUBU3" id="tab-j9F7G-P"><label data-title="Java" for="tab-j9F7G-P">Java</label><input type="radio" name="group-GUBU3" id="tab-Uioa5L0"><label data-title="Python" for="tab-Uioa5L0">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    private var prev: Int? = null
    
    fun isValidBST(root: TreeNode?): Boolean {
        if (root == null) return true
        
        // Check left subtree
        if (!isValidBST(root.left)) return false
        
        // Check current node
        if (prev != null &amp;&amp; root.\`val\` &lt;= prev!!) return false
        prev = root.\`val\`
        
        // Check right subtree
        return isValidBST(root.right)
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
    private prev: number | null = null;
    
    isValidBST(root: TreeNode | null): boolean {
        if (root === null) return true;
        
        // Check left subtree
        if (!this.isValidBST(root.left)) return false;
        
        // Check current node
        if (this.prev !== null &amp;&amp; root.val &lt;= this.prev) return false;
        this.prev = root.val;
        
        // Check right subtree
        return this.isValidBST(root.right);
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
    private Integer prev = null;
    
    public boolean isValidBST(TreeNode root) {
        if (root == null) return true;
        
        // Check left subtree
        if (!isValidBST(root.left)) return false;
        
        // Check current node
        if (prev != null &amp;&amp; root.val &lt;= prev) return false;
        prev = root.val;
        
        // Check right subtree
        return isValidBST(root.right);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -&gt; bool:
        self.prev = None
        
        def inorder(node):
            if not node:
                return True
            
            # Check left subtree
            if not inorder(node.left):
                return False
            
            # Check current node
            if self.prev is not None and node.val &lt;= self.prev:
                return False
            self.prev = node.val
            
            # Check right subtree
            return inorder(node.right)
        
        return inorder(root)
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes. We visit each node exactly once.</li><li><strong>Space Complexity:</strong> O(h), where h is the height of the tree (recursion stack space).</li></ul>`,20))])}const T=r(p,[["render",c]]);export{m as __pageData,T as default};
