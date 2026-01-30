import{_ as a,C as r,c as l,o as s,j as t,ag as d,a as n,G as i}from"./chunks/framework.Bw-5EFTY.js";const T=JSON.parse('{"title":"129. Sum Root to Leaf Numbers","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/129.md","filePath":"binary-tree-general/129.md"}'),u={name:"binary-tree-general/129.md"},p={id:"_129-sum-root-to-leaf-numbers",tabindex:"-1"};function c(h,e,m,g,f,v){const o=r("Badge");return s(),l("div",null,[t("h1",p,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/sum-root-to-leaf-numbers/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"129. Sum Root to Leaf Numbers",-1)),e[1]||(e[1]=n()),i(o,{type:"warning",text:"Medium"}),e[2]||(e[2]=n()),e[3]||(e[3]=t("a",{class:"header-anchor",href:"#_129-sum-root-to-leaf-numbers","aria-label":'Permalink to "[129. Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/description/?envType=study-plan-v2&envId=top-interview-150) <Badge type="warning" text="Medium" />"'},"​",-1))]),e[4]||(e[4]=d(`<p>You are given the <code>root</code> of a binary tree containing digits from <code>0</code> to <code>9</code> only.</p><p>Each root-to-leaf path in the tree represents a number.</p><ul><li>For example, the root-to-leaf path <code>1 -&gt; 2 -&gt; 3</code> represents the number <code>123</code>.</li></ul><p>Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a <strong>32-bit</strong> integer.</p><p>A <strong>leaf</strong> node is a node with no children.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/num1tree.jpg" style="width:212px;height:182px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2,3]
Output: 25
Explanation:
The root-to-leaf path &lt;code&gt;1-&gt;2&lt;/code&gt; represents the number &lt;code&gt;12&lt;/code&gt;.
The root-to-leaf path &lt;code&gt;1-&gt;3&lt;/code&gt; represents the number &lt;code&gt;13&lt;/code&gt;.
Therefore, sum = 12 + 13 = &lt;code&gt;25&lt;/code&gt;.
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/num2tree.jpg" style="width:292px;height:302px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [4,9,0,5,1]
Output: 1026
Explanation:
The root-to-leaf path &lt;code&gt;4-&gt;9-&gt;5&lt;/code&gt; represents the number 495.
The root-to-leaf path &lt;code&gt;4-&gt;9-&gt;1&lt;/code&gt; represents the number 491.
The root-to-leaf path &lt;code&gt;4-&gt;0&lt;/code&gt; represents the number 40.
Therefore, sum = 495 + 491 + 40 = &lt;code&gt;1026&lt;/code&gt;.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[1, 1000]</code>.</li><li><code>0 &lt;= Node.val &lt;= 9</code></li><li>The depth of the tree will not exceed <code>10</code>.</li></ul><h2 id="💡-approach" tabindex="-1">💡 Approach <a class="header-anchor" href="#💡-approach" aria-label="Permalink to &quot;💡 Approach&quot;">​</a></h2><p>Use <strong>DFS (Depth-First Search)</strong> to track the number formed along each path.</p><p>At each node:</p><ol><li>Multiply the current accumulated number by 10 and add the node’s value.</li><li>If it’s a <strong>leaf node</strong>, return the accumulated number.</li><li>Otherwise, recurse on the left and right subtrees.</li><li>Sum all values returned from the left and right subtrees to get the total.</li></ol><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-YvGoC" id="tab-1D2ABPt" checked><label data-title="Kotlin" for="tab-1D2ABPt">Kotlin</label><input type="radio" name="group-YvGoC" id="tab-J5fA_a8"><label data-title="TypeScript" for="tab-J5fA_a8">TypeScript</label><input type="radio" name="group-YvGoC" id="tab-_uNXAwk"><label data-title="Java" for="tab-_uNXAwk">Java</label><input type="radio" name="group-YvGoC" id="tab-i62k8Tn"><label data-title="Python" for="tab-i62k8Tn">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    fun sumNumbers(root: TreeNode?): Int {
        return dfs(root, 0)
    }

    private fun dfs(node: TreeNode?, currentSum: Int): Int {
        if (node == null) return 0

        val newSum = currentSum * 10 + node.\`val\`

        if (node.left == null &amp;&amp; node.right == null) {
            return newSum
        }

        return dfs(node.left, newSum) + dfs(node.right, newSum)
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
    sumNumbers(root: TreeNode | null): number {
        return this.dfs(root, 0);
    }

    private dfs(node: TreeNode | null, currentSum: number): number {
        if (node === null) return 0;

        const newSum = currentSum * 10 + node.val;

        if (node.left === null &amp;&amp; node.right === null) {
            return newSum;
        }

        return this.dfs(node.left, newSum) + this.dfs(node.right, newSum);
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
    public int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }

    private int dfs(TreeNode node, int currentSum) {
        if (node == null) return 0;

        int newSum = currentSum * 10 + node.val;

        if (node.left == null &amp;&amp; node.right == null) {
            return newSum;
        }

        return dfs(node.left, newSum) + dfs(node.right, newSum);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -&gt; int:
        return self.dfs(root, 0)

    def dfs(self, node: Optional[TreeNode], current_sum: int) -&gt; int:
        if node is None:
            return 0

        new_sum = current_sum * 10 + node.val

        if node.left is None and node.right is None:
            return new_sum

        return self.dfs(node.left, new_sum) + self.dfs(node.right, new_sum)
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><p>Time Complexity: O(n), where n is the number of nodes in the tree.</p><p>Space Complexity: O(h), where h is the height of the tree (due to recursion stack).</p>`,21))])}const y=a(u,[["render",c]]);export{T as __pageData,y as default};
