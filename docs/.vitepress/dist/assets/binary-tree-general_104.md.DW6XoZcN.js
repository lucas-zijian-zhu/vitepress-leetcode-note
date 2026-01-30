import{_ as n,C as o,c as r,o as l,j as t,ag as i,G as s,a as p}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"104. Maximum Depth of Binary Tree","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/104.md","filePath":"binary-tree-general/104.md"}'),d={name:"binary-tree-general/104.md"},h={id:"_104-maximum-depth-of-binary-tree",tabindex:"-1"};function c(u,e,m,g,f,v){const a=o("Badge");return l(),r("div",null,[t("h1",h,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/maximum-depth-of-binary-tree/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"104. Maximum Depth of Binary Tree",-1)),s(a,{type:"warning",text:"Easy"}),e[1]||(e[1]=p()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_104-maximum-depth-of-binary-tree","aria-label":'Permalink to "[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Easy" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>Given the <code>root</code> of a binary tree, return its maximum depth.</p><p>A binary tree&#39;s <strong>maximum depth</strong> is the number of nodes along the longest path from the root node down to the farthest leaf node.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg" style="width:400px;height:277px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [3,9,20,null,null,15,7]
Output: 3
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,null,2]
Output: 2
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[0, 10^4]</code>.</li><li><code>-100 &lt;= Node.val &lt;= 100</code></li></ul><h2 id="💡-approach-recursive-depth-first-search-dfs" tabindex="-1">💡 Approach: Recursive Depth-First Search (DFS) <a class="header-anchor" href="#💡-approach-recursive-depth-first-search-dfs" aria-label="Permalink to &quot;💡 Approach: Recursive Depth-First Search (DFS)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>The maximum depth of a binary tree is defined as the number of nodes along the longest path from the root node down to the farthest leaf node. This problem can be naturally solved using recursion.</p><h3 id="recursive-logic" tabindex="-1">Recursive Logic <a class="header-anchor" href="#recursive-logic" aria-label="Permalink to &quot;Recursive Logic&quot;">​</a></h3><ul><li>If the current node is <code>null</code>, return <code>0</code> (base case).</li><li>Otherwise: <ul><li>Recursively compute the maximum depth of the left subtree.</li><li>Recursively compute the maximum depth of the right subtree.</li><li>Return <code>1 + max(leftDepth, rightDepth)</code>.</li></ul></li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-K4U0P" id="tab-o0IIhFX" checked><label data-title="Kotlin" for="tab-o0IIhFX">Kotlin</label><input type="radio" name="group-K4U0P" id="tab-5u-Obgo"><label data-title="TypeScript" for="tab-5u-Obgo">TypeScript</label><input type="radio" name="group-K4U0P" id="tab-TJzYTY7"><label data-title="Java" for="tab-TJzYTY7">Java</label><input type="radio" name="group-K4U0P" id="tab-GRbBTUm"><label data-title="Python" for="tab-GRbBTUm">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

fun maxDepth(root: TreeNode?): Int {
    if (root == null) return 0
    val leftDepth = maxDepth(root.left)
    val rightDepth = maxDepth(root.right)
    return 1 + maxOf(leftDepth, rightDepth)
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

function maxDepth(root: TreeNode | null): number {
    if (root === null) return 0;
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    return 1 + Math.max(leftDepth, rightDepth);
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
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);
        return 1 + Math.max(leftDepth, rightDepth);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -&gt; int:
        if root is None:
            return 0
        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)
        return 1 + max(left_depth, right_depth)
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><p><strong>Time Complexity:</strong> O(n) where n is the number of nodes in the tree.</p><p><strong>Space Complexity:</strong> O(h), where h is the height of the tree (due to recursion stack).</p>`,18))])}const x=n(d,[["render",c]]);export{y as __pageData,x as default};
