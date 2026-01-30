import{_ as n,C as o,c as i,o as r,j as t,ag as l,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const b=JSON.parse('{"title":"124. Binary Tree Maximum Path Sum","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/124.md","filePath":"binary-tree-general/124.md"}'),p={name:"binary-tree-general/124.md"},m={id:"_124-binary-tree-maximum-path-sum",tabindex:"-1"};function h(u,e,c,g,f,v){const a=o("Badge");return r(),i("div",null,[t("h1",m,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/binary-tree-maximum-path-sum/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"124. Binary Tree Maximum Path Sum",-1)),s(a,{type:"danger",text:"Hard"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_124-binary-tree-maximum-path-sum","aria-label":'Permalink to "[124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="danger" text="Hard" />"'},"​",-1))]),e[3]||(e[3]=l(`<p>A <strong>path</strong> in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence <strong>at most once</strong> . Note that the path does not need to pass through the root.</p><p>The <strong>path sum</strong> of a path is the sum of the node&#39;s values in the path.</p><p>Given the <code>root</code> of a binary tree, return the maximum <strong>path sum</strong> of any <strong>non-empty</strong> path.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg" style="width:322px;height:182px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -&gt; 1 -&gt; 3 with a path sum of 2 + 1 + 3 = 6.
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -&gt; 20 -&gt; 7 with a path sum of 15 + 20 + 7 = 42.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[1, 3 * 10^4]</code>.</li><li><code>-1000 &lt;= Node.val &lt;= 1000</code></li></ul><h2 id="💡-approach" tabindex="-1">💡 Approach <a class="header-anchor" href="#💡-approach" aria-label="Permalink to &quot;💡 Approach&quot;">​</a></h2><p>Use <strong>post-order traversal</strong> (left ➝ right ➝ root) combined with <strong>recursive backtracking</strong>.<br> At each node:</p><ol><li>Calculate the maximum contribution from the left subtree <code>leftGain</code> (use 0 if it’s negative).</li><li>Calculate the maximum contribution from the right subtree <code>rightGain</code> (use 0 if it’s negative).</li><li>The maximum path sum with the current node as the highest point is: <code>val + leftGain + rightGain</code> Update the <strong>global maximum</strong> if this is higher.</li><li>To continue the path upward, return: <code>val + max(leftGain, rightGain)</code> since the path cannot split upward (it must go through only one child).</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-I2f23" id="tab-QQXoj7r" checked><label data-title="Kotlin" for="tab-QQXoj7r">Kotlin</label><input type="radio" name="group-I2f23" id="tab-dp5MoTR"><label data-title="TypeScript" for="tab-dp5MoTR">TypeScript</label><input type="radio" name="group-I2f23" id="tab-5fj7Z7S"><label data-title="Java" for="tab-5fj7Z7S">Java</label><input type="radio" name="group-I2f23" id="tab-5mQP5g1"><label data-title="Python" for="tab-5mQP5g1">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
 var left: TreeNode? = null
 var right: TreeNode? = null
}

class Solution {
 private var maxSum = Int.MIN_VALUE

 fun maxPathSum(root: TreeNode?): Int {
     maxGain(root)
     return maxSum
 }

 private fun maxGain(node: TreeNode?): Int {
     if (node == null) return 0

     val leftGain = maxOf(maxGain(node.left), 0)
     val rightGain = maxOf(maxGain(node.right), 0)

     val currentMax = node.\`val\` + leftGain + rightGain
     maxSum = maxOf(maxSum, currentMax)

     return node.\`val\` + maxOf(leftGain, rightGain)
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
    private maxSum = Number.MIN_SAFE_INTEGER;

    maxPathSum(root: TreeNode | null): number {
        this.maxGain(root);
        return this.maxSum;
    }

    private maxGain(node: TreeNode | null): number {
        if (node === null) return 0;

        const leftGain = Math.max(this.maxGain(node.left), 0);
        const rightGain = Math.max(this.maxGain(node.right), 0);

        const currentMax = node.val + leftGain + rightGain;
        this.maxSum = Math.max(this.maxSum, currentMax);

        return node.val + Math.max(leftGain, rightGain);
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
    private int maxSum = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        maxGain(root);
        return maxSum;
    }

    private int maxGain(TreeNode node) {
        if (node == null) return 0;

        int leftGain = Math.max(maxGain(node.left), 0);
        int rightGain = Math.max(maxGain(node.right), 0);

        int currentMax = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, currentMax);

        return node.val + Math.max(leftGain, rightGain);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def __init__(self):
        self.max_sum = float(&#39;-inf&#39;)

    def maxPathSum(self, root: Optional[TreeNode]) -&gt; int:
        self.max_gain(root)
        return self.max_sum

    def max_gain(self, node: Optional[TreeNode]) -&gt; int:
        if node is None:
            return 0

        left_gain = max(self.max_gain(node.left), 0)
        right_gain = max(self.max_gain(node.right), 0)

        current_max = node.val + left_gain + right_gain
        self.max_sum = max(self.max_sum, current_max)

        return node.val + max(left_gain, right_gain)
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><p>Time Complexity: O(n), where n is the number of nodes in the tree.</p><p>Space Complexity: O(h), where h is the height of the tree (due to recursion stack).</p>`,17))])}const y=n(p,[["render",h]]);export{b as __pageData,y as default};
