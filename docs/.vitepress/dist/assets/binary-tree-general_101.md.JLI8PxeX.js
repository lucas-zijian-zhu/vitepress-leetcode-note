import{_ as t,c as r,o as n,ag as a}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"101. Symmetric Tree","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/101.md","filePath":"binary-tree-general/101.md"}'),o={name:"binary-tree-general/101.md"};function l(i,e,s,p,d,c){return n(),r("div",null,e[0]||(e[0]=[a(`<h1 id="_101-symmetric-tree" tabindex="-1"><a href="https://leetcode.com/problems/symmetric-tree/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">101. Symmetric Tree</a> <a class="header-anchor" href="#_101-symmetric-tree" aria-label="Permalink to &quot;[101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given the <code>root</code> of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/symtree1.jpg" style="width:354px;height:291px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2,2,3,4,4,3]
Output: true
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/symtree2.jpg" style="width:308px;height:258px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2,2,null,3,null,3]
Output: false
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[1, 1000]</code>.</li><li><code>-100 &lt;= Node.val &lt;= 100</code></li></ul><p><strong>Follow up:</strong> Could you solve it both recursively and iteratively?</p><h2 id="💡-approach-recursive-dfs" tabindex="-1">💡 Approach: Recursive (DFS) <a class="header-anchor" href="#💡-approach-recursive-dfs" aria-label="Permalink to &quot;💡 Approach: Recursive (DFS)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>A tree is symmetric if the left subtree is a mirror reflection of the right subtree. We can solve this recursively by comparing the left and right subtrees.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Base case</strong>: If both nodes are <code>null</code>, they are symmetric.</li><li><strong>Base case</strong>: If one node is <code>null</code> and the other is not, they are not symmetric.</li><li><strong>Base case</strong>: If the values are different, they are not symmetric.</li><li><strong>Recursive case</strong>: Check if the left subtree of the left node is symmetric to the right subtree of the right node, and vice versa.</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-FrfPY" id="tab-ki3g0Ds" checked><label data-title="Kotlin" for="tab-ki3g0Ds">Kotlin</label><input type="radio" name="group-FrfPY" id="tab-_FeVk5J"><label data-title="TypeScript" for="tab-_FeVk5J">TypeScript</label><input type="radio" name="group-FrfPY" id="tab-DhoB0Fn"><label data-title="Java" for="tab-DhoB0Fn">Java</label><input type="radio" name="group-FrfPY" id="tab-vQlI4A7"><label data-title="Python" for="tab-vQlI4A7">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    fun isSymmetric(root: TreeNode?): Boolean {
        return isMirror(root, root)
    }
    
    private fun isMirror(t1: TreeNode?, t2: TreeNode?): Boolean {
        if (t1 == null &amp;&amp; t2 == null) return true
        if (t1 == null || t2 == null) return false
        return (t1.\`val\` == t2.\`val\`) &amp;&amp; 
               isMirror(t1.right, t2.left) &amp;&amp; 
               isMirror(t1.left, t2.right)
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
    isSymmetric(root: TreeNode | null): boolean {
        return this.isMirror(root, root);
    }
    
    private isMirror(t1: TreeNode | null, t2: TreeNode | null): boolean {
        if (t1 === null &amp;&amp; t2 === null) return true;
        if (t1 === null || t2 === null) return false;
        return (t1.val === t2.val) &amp;&amp; 
               this.isMirror(t1.right, t2.left) &amp;&amp; 
               this.isMirror(t1.left, t2.right);
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
    public boolean isSymmetric(TreeNode root) {
        return isMirror(root, root);
    }
    
    private boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null &amp;&amp; t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        return (t1.val == t2.val) &amp;&amp; 
               isMirror(t1.right, t2.left) &amp;&amp; 
               isMirror(t1.left, t2.right);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -&gt; bool:
        return self.is_mirror(root, root)
    
    def is_mirror(self, t1: Optional[TreeNode], t2: Optional[TreeNode]) -&gt; bool:
        if t1 is None and t2 is None:
            return True
        if t1 is None or t2 is None:
            return False
        return (t1.val == t2.val) and \\
               self.is_mirror(t1.right, t2.left) and \\
               self.is_mirror(t1.left, t2.right)
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes in the tree. We visit each node once.</li><li><strong>Space Complexity:</strong> O(h), where h is the height of the tree. The space is used by the recursion stack.</li></ul>`,18)]))}const m=t(o,[["render",l]]);export{h as __pageData,m as default};
