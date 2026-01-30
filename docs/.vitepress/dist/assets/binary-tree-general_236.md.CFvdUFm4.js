import{_ as n,C as r,c as l,o as a,j as t,ag as s,G as i,a as d}from"./chunks/framework.Bw-5EFTY.js";const c="/assets/236-1.CnuGSxsq.png",p="/assets/236-1.CnuGSxsq.png",C=JSON.parse('{"title":"236. Lowest Common Ancestor of a Binary Tree","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/236.md","filePath":"binary-tree-general/236.md"}'),u={name:"binary-tree-general/236.md"},h={id:"_236-lowest-common-ancestor-of-a-binary-tree",tabindex:"-1"};function g(f,e,m,v,b,y){const o=r("Badge");return a(),l("div",null,[t("h1",h,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"236. Lowest Common Ancestor of a Binary Tree",-1)),i(o,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_236-lowest-common-ancestor-of-a-binary-tree","aria-label":'Permalink to "[236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=s(`<p>Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.</p><p>According to the <a href="https://en.wikipedia.org/wiki/Lowest_common_ancestor" target="_blank" rel="noreferrer">definition of LCA on Wikipedia</a>: &quot;The lowest common ancestor is defined between two nodes <code>p</code> and <code>q</code> as the lowest node in <code>T</code> that has both <code>p</code> and <code>q</code> as descendants (where we allow <strong>a node to be a descendant of itself</strong>).&quot;</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
</code></pre></div><p><img src="`+c+`" alt="236-1"></p><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
</code></pre></div><p><img src="`+p+`" alt="236-2"></p><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2], p = 1, q = 2
Output: 1
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[2, 10^5]</code>.</li><li><code>-10^9 &lt;= Node.val &lt;= 10^9</code></li><li>All <code>Node.val</code> are <strong>unique</strong>.</li><li><code>p != q</code></li><li><code>p</code> and <code>q</code> will exist in the tree.</li></ul><h2 id="💡-approach-post-order-traversal" tabindex="-1">💡 Approach: Post-order Traversal <a class="header-anchor" href="#💡-approach-post-order-traversal" aria-label="Permalink to &quot;💡 Approach: Post-order Traversal&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>The key insight is to use <strong>post-order traversal</strong> (left ➝ right ➝ root) to find the LCA. At each node, we check if it&#39;s the LCA by examining the results from its left and right subtrees.</p><p><strong>Key Insight:</strong></p><ul><li>If both left and right subtrees return non-null nodes, the current node is the LCA</li><li>If only one subtree returns a non-null node, that node (or its ancestor) is the LCA</li><li>If the current node is <code>p</code> or <code>q</code>, return it immediately</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Base cases:</strong><ul><li>If current node is <code>null</code>, return <code>null</code></li><li>If current node is <code>p</code> or <code>q</code>, return the current node</li></ul></li><li><strong>Recursively search</strong> in left and right subtrees</li><li><strong>Check results:</strong><ul><li>If both left and right return non-null → current node is the LCA</li><li>If only one is non-null → return that one</li><li>If both are null → return <code>null</code></li></ul></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Post-order traversal ensures we check children before parent</li><li>Time complexity: O(n) where n is the number of nodes</li><li>Space complexity: O(h) where h is the height of the tree (recursion stack)</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-IgoYL" id="tab-cM1WsCR" checked><label data-title="Kotlin" for="tab-cM1WsCR">Kotlin</label><input type="radio" name="group-IgoYL" id="tab-JTvPAja"><label data-title="TypeScript" for="tab-JTvPAja">TypeScript</label><input type="radio" name="group-IgoYL" id="tab-7rJlYmT"><label data-title="Java" for="tab-7rJlYmT">Java</label><input type="radio" name="group-IgoYL" id="tab-xFKcQEf"><label data-title="Python" for="tab-xFKcQEf">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">/**
 * Definition for a binary tree node.
 * class TreeNode(var \`val\`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun lowestCommonAncestor(root: TreeNode?, p: TreeNode?, q: TreeNode?): TreeNode? {
        if (root == null || root == p || root == q) return root

        val left = lowestCommonAncestor(root.left, p, q)
        val right = lowestCommonAncestor(root.right, p, q)

        return when {
            left != null &amp;&amp; right != null -&gt; root
            left != null -&gt; left
            else -&gt; right
        }
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
class Solution {
    lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
        if (root === null || root === p || root === q) return root;

        const left = this.lowestCommonAncestor(root.left, p, q);
        const right = this.lowestCommonAncestor(root.right, p, q);

        if (left !== null &amp;&amp; right !== null) {
            return root;
        } else if (left !== null) {
            return left;
        } else {
            return right;
        }
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null &amp;&amp; right != null) {
            return root;
        } else if (left != null) {
            return left;
        } else {
            return right;
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python"># Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: &#39;TreeNode&#39;, p: &#39;TreeNode&#39;, q: &#39;TreeNode&#39;) -&gt; &#39;TreeNode&#39;:
        if root is None or root == p or root == q:
            return root

        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        if left is not None and right is not None:
            return root
        elif left is not None:
            return left
        else:
            return right
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes in the tree. We visit each node at most once.</li><li><strong>Space Complexity:</strong> O(h), where h is the height of the tree. This is the space used by the recursion stack. In the worst case (skewed tree), h = n, so space complexity is O(n).</li></ul>`,25))])}const w=n(u,[["render",g]]);export{C as __pageData,w as default};
