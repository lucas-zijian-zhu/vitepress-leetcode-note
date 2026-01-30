import{_ as n,C as l,c as o,o as r,j as t,ag as s,G as i,a as p}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"100. Same Tree","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/100.md","filePath":"binary-tree-general/100.md"}'),d={name:"binary-tree-general/100.md"},c={id:"_100-same-tree",tabindex:"-1"};function u(h,e,g,v,m,f){const a=l("Badge");return r(),o("div",null,[t("h1",c,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/same-tree/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"100. Same Tree",-1)),i(a,{type:"warning",text:"Easy"}),e[1]||(e[1]=p()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_100-same-tree","aria-label":'Permalink to "[100. Same Tree](https://leetcode.com/problems/same-tree/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Easy" />"'},"​",-1))]),e[3]||(e[3]=s(`<p>Given the roots of two binary trees <code>p</code> and <code>q</code>, write a function to check if they are the same or not.</p><p>Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/ex1.jpg" style="width:622px;height:182px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: p = [1,2,3], q = [1,2,3]
Output: true
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/ex2.jpg" style="width:382px;height:182px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: p = [1,2], q = [1,null,2]
Output: false
</code></pre></div><p><strong>Example 3:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/ex3.jpg" style="width:622px;height:182px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: p = [1,2,1], q = [1,1,2]
Output: false
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in both trees is in the range <code>[0, 100]</code>.</li><li><code>-10^4 &lt;= Node.val &lt;= 10^4</code></li></ul><h2 id="💡-approach-recursive-comparison-depth-first-search" tabindex="-1">💡 Approach: Recursive Comparison (Depth-First Search) <a class="header-anchor" href="#💡-approach-recursive-comparison-depth-first-search" aria-label="Permalink to &quot;💡 Approach: Recursive Comparison (Depth-First Search)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>We can solve this problem using <strong>recursion</strong> by comparing the corresponding nodes of both trees:</p><h3 id="steps" tabindex="-1">Steps <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps&quot;">​</a></h3><ol><li>If both nodes are <code>null</code>, they are equal → return <code>true</code>.</li><li>If one is <code>null</code> and the other is not, they are not equal → return <code>false</code>.</li><li>If the values of the two nodes are different → return <code>false</code>.</li><li>Otherwise, recursively check the <strong>left</strong> and <strong>right</strong> subtrees.</li></ol><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-wlESi" id="tab-syNBvbI" checked><label data-title="Kotlin" for="tab-syNBvbI">Kotlin</label><input type="radio" name="group-wlESi" id="tab-HOXLvWe"><label data-title="TypeScript" for="tab-HOXLvWe">TypeScript</label><input type="radio" name="group-wlESi" id="tab-b1GrONd"><label data-title="Java" for="tab-b1GrONd">Java</label><input type="radio" name="group-wlESi" id="tab-gZF95KY"><label data-title="Python" for="tab-gZF95KY">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

fun isSameTree(p: TreeNode?, q: TreeNode?): Boolean {
    if (p == null &amp;&amp; q == null) return true
    if (p == null || q == null) return false
    if (p.\`val\` != q.\`val\`) return false

    return isSameTree(p.left, q.left) &amp;&amp; isSameTree(p.right, q.right)
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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null &amp;&amp; q === null) return true;
    if (p === null || q === null) return false;
    if (p.val !== q.val) return false;

    return isSameTree(p.left, q.left) &amp;&amp; isSameTree(p.right, q.right);
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
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null &amp;&amp; q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;

        return isSameTree(p.left, q.left) &amp;&amp; isSameTree(p.right, q.right);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -&gt; bool:
        if p is None and q is None:
            return True
        if p is None or q is None:
            return False
        if p.val != q.val:
            return False

        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><ul><li><p><strong>Time Complexity:</strong> <code>O(n)</code><br> We traverse each node in both trees once. In the worst case, we compare all nodes.</p></li><li><p><strong>Space Complexity:</strong> <code>O(h)</code><br> Where <code>h</code> is the height of the tree. This space is used by the call stack during recursion.</p><ul><li>Worst case (<code>skewed tree</code>): <code>O(n)</code></li><li>Best case (<code>balanced tree</code>): <code>O(log n)</code></li></ul></li></ul>`,20))])}const T=n(d,[["render",u]]);export{y as __pageData,T as default};
