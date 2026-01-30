import{_ as t,c as n,o as r,ag as o}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"226. Invert Binary Tree","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/226.md","filePath":"binary-tree-general/226.md"}'),l={name:"binary-tree-general/226.md"};function a(i,e,s,d,c,p){return r(),n("div",null,e[0]||(e[0]=[o(`<h1 id="_226-invert-binary-tree" tabindex="-1"><a href="https://leetcode.com/problems/invert-binary-tree/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">226. Invert Binary Tree</a> <a class="header-anchor" href="#_226-invert-binary-tree" aria-label="Permalink to &quot;[226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given the <code>root</code> of a binary tree, invert the tree, and return its root.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg" style="width:500px;height:165px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg" style="width:500px;height:120px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [2,1,3]
Output: [2,3,1]
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = []
Output: []
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[0, 100]</code>.</li><li><code>-100 &lt;= Node.val &lt;= 100</code></li></ul><h2 id="💡-approach-recursive-dfs" tabindex="-1">💡 Approach: Recursive (DFS) <a class="header-anchor" href="#💡-approach-recursive-dfs" aria-label="Permalink to &quot;💡 Approach: Recursive (DFS)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>To invert a binary tree, we need to swap the left and right children of every node. This can be done recursively by:</p><ol><li><strong>Base case</strong>: If the node is <code>null</code>, return <code>null</code></li><li><strong>Recursive case</strong>: <ul><li>Swap the left and right children</li><li>Recursively invert the left subtree</li><li>Recursively invert the right subtree</li><li>Return the current node</li></ul></li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Base case</strong>: If <code>root</code> is <code>null</code>, return <code>null</code></li><li><strong>Swap children</strong>: Swap the left and right children of the current node</li><li><strong>Recursive calls</strong>: Recursively invert the left and right subtrees</li><li><strong>Return</strong>: Return the current node</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-sB-sl" id="tab-9ZpbL1T" checked><label data-title="Kotlin" for="tab-9ZpbL1T">Kotlin</label><input type="radio" name="group-sB-sl" id="tab-K4qsJQ2"><label data-title="TypeScript" for="tab-K4qsJQ2">TypeScript</label><input type="radio" name="group-sB-sl" id="tab-xfE6aNw"><label data-title="Java" for="tab-xfE6aNw">Java</label><input type="radio" name="group-sB-sl" id="tab-rEhcspu"><label data-title="Python" for="tab-rEhcspu">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    fun invertTree(root: TreeNode?): TreeNode? {
        if (root == null) return null
        
        // Swap left and right children
        val temp = root.left
        root.left = root.right
        root.right = temp
        
        // Recursively invert subtrees
        invertTree(root.left)
        invertTree(root.right)
        
        return root
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
    invertTree(root: TreeNode | null): TreeNode | null {
        if (root === null) return null;
        
        // Swap left and right children
        const temp = root.left;
        root.left = root.right;
        root.right = temp;
        
        // Recursively invert subtrees
        this.invertTree(root.left);
        this.invertTree(root.right);
        
        return root;
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
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        
        // Swap left and right children
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        
        // Recursively invert subtrees
        invertTree(root.left);
        invertTree(root.right);
        
        return root;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def invertTree(self, root: Optional[TreeNode]) -&gt; Optional[TreeNode]:
        if root is None:
            return None
        
        # Swap left and right children
        root.left, root.right = root.right, root.left
        
        # Recursively invert subtrees
        self.invertTree(root.left)
        self.invertTree(root.right)
        
        return root
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes in the tree. We visit each node exactly once.</li><li><strong>Space Complexity:</strong> O(h), where h is the height of the tree. The space is used by the recursion stack. In the worst case (skewed tree), the height is O(n).</li></ul>`,20)]))}const v=t(l,[["render",a]]);export{u as __pageData,v as default};
