import{_ as o,C as l,c as r,o as i,j as t,ag as a,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"222. Count Complete Tree Nodes","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/222.md","filePath":"binary-tree-general/222.md"}'),h={name:"binary-tree-general/222.md"},c={id:"_222-count-complete-tree-nodes",tabindex:"-1"};function p(g,e,u,f,v,b){const n=l("Badge");return i(),r("div",null,[t("h1",c,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/count-complete-tree-nodes/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"222. Count Complete Tree Nodes",-1)),s(n,{type:"warning",text:"Easy"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_222-count-complete-tree-nodes","aria-label":'Permalink to "[222. Count Complete Tree Nodes](https://leetcode.com/problems/count-complete-tree-nodes/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Easy" />"'},"​",-1))]),e[3]||(e[3]=a(`<p>Given the <code>root</code> of a <strong>complete</strong> binary tree, return the number of the nodes in the tree.</p><p>According to <strong><a href="http://en.wikipedia.org/wiki/Binary_tree#Types_of_binary_trees" target="_blank">Wikipedia</a></strong> , every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between <code>1</code> and <code>2^h</code> nodes inclusive at the last level <code>h</code>.</p><p>Design an algorithm that runs in less than<code data-stringify-type="code">O(n)</code>time complexity.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/01/14/complete.jpg" style="width:372px;height:302px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2,3,4,5,6]
Output: 6
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = []
Output: 0
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1]
Output: 1
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[0, 5 * 10^4]</code>.</li><li><code>0 &lt;= Node.val &lt;= 5 * 10^4</code></li><li>The tree is guaranteed to be <strong>complete</strong> .</li></ul><h2 id="💡-approach" tabindex="-1">💡 Approach <a class="header-anchor" href="#💡-approach" aria-label="Permalink to &quot;💡 Approach&quot;">​</a></h2><p>Use the properties of a <strong>complete binary tree</strong> to optimize the counting process.</p><p>At each node:</p><ol><li>Compute the height of the left subtree (<code>leftHeight</code>) and the right subtree (<code>rightHeight</code>).</li><li>If both heights are equal: <ul><li>The left subtree is a <strong>perfect binary tree</strong> with <code>2^leftHeight - 1</code> nodes.</li><li>So total nodes = <code>(1 &lt;&lt; leftHeight) + countNodes(right)</code></li></ul></li><li>If the heights are not equal: <ul><li>The right subtree is a <strong>perfect binary tree</strong> with <code>2^rightHeight - 1</code> nodes.</li><li>So total nodes = <code>(1 &lt;&lt; rightHeight) + countNodes(left)</code></li></ul></li><li>Recursively apply this logic to the non-perfect subtree.</li></ol><p>This method avoids traversing every node and runs in <strong>log² n</strong> time.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-FQ9Q0" id="tab-eeXo18S" checked><label data-title="Kotlin" for="tab-eeXo18S">Kotlin</label><input type="radio" name="group-FQ9Q0" id="tab-oUk8LED"><label data-title="TypeScript" for="tab-oUk8LED">TypeScript</label><input type="radio" name="group-FQ9Q0" id="tab-vC1Ri0q"><label data-title="Java" for="tab-vC1Ri0q">Java</label><input type="radio" name="group-FQ9Q0" id="tab-LTPQTgh"><label data-title="Python" for="tab-LTPQTgh">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    fun countNodes(root: TreeNode?): Int {
        if (root == null) return 0

        val leftHeight = getHeight(root.left)
        val rightHeight = getHeight(root.right)

        return if (leftHeight == rightHeight) {
            (1 shl leftHeight) + countNodes(root.right)
        } else {
            (1 shl rightHeight) + countNodes(root.left)
        }
    }

    private fun getHeight(node: TreeNode?): Int {
        var height = 0
        var current = node
        while (current != null) {
            height++
            current = current.left
        }
        return height
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
    countNodes(root: TreeNode | null): number {
        if (root === null) return 0;

        const leftHeight = this.getHeight(root.left);
        const rightHeight = this.getHeight(root.right);

        if (leftHeight === rightHeight) {
            return (1 &lt;&lt; leftHeight) + this.countNodes(root.right);
        } else {
            return (1 &lt;&lt; rightHeight) + this.countNodes(root.left);
        }
    }

    private getHeight(node: TreeNode | null): number {
        let height = 0;
        let current = node;
        while (current !== null) {
            height++;
            current = current.left;
        }
        return height;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class TreeNode {
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
    public int countNodes(TreeNode root) {
        if (root == null) return 0;

        int leftHeight = getHeight(root.left);
        int rightHeight = getHeight(root.right);

        if (leftHeight == rightHeight) {
            return (1 &lt;&lt; leftHeight) + countNodes(root.right);
        } else {
            return (1 &lt;&lt; rightHeight) + countNodes(root.left);
        }
    }

    private int getHeight(TreeNode node) {
        int height = 0;
        TreeNode current = node;
        while (current != null) {
            height++;
            current = current.left;
        }
        return height;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def countNodes(self, root: Optional[TreeNode]) -&gt; int:
        if root is None:
            return 0

        left_height = self.get_height(root.left)
        right_height = self.get_height(root.right)

        if left_height == right_height:
            return (1 &lt;&lt; left_height) + self.countNodes(root.right)
        else:
            return (1 &lt;&lt; right_height) + self.countNodes(root.left)

    def get_height(self, node: Optional[TreeNode]) -&gt; int:
        height = 0
        current = node
        while current is not None:
            height += 1
            current = current.left
        return height
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><p><strong>Time Complexity:</strong> O(log² n)</p><ul><li><p>Each recursive call does O(log n) work to compute height.</p></li><li><p>There are O(log n) levels of recursion in the worst case.</p></li></ul><p><strong>Space Complexity:</strong> O(log n)</p><ul><li>Due to recursion stack (tree height in a complete binary tree).</li></ul>`,24))])}const N=o(h,[["render",p]]);export{y as __pageData,N as default};
