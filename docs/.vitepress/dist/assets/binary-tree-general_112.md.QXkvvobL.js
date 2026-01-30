import{_ as t,c as a,o,ag as r}from"./chunks/framework.Bw-5EFTY.js";const d=JSON.parse('{"title":"112. Path Sum","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/112.md","filePath":"binary-tree-general/112.md"}'),n={name:"binary-tree-general/112.md"};function s(l,e,i,c,p,u){return o(),a("div",null,e[0]||(e[0]=[r(`<h1 id="_112-path-sum" tabindex="-1"><a href="https://leetcode.com/problems/path-sum/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">112. Path Sum</a> <a class="header-anchor" href="#_112-path-sum" aria-label="Permalink to &quot;[112. Path Sum](https://leetcode.com/problems/path-sum/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return <code>true</code> if the tree has a <strong>root-to-leaf</strong> path such that adding up all the values along the path equals <code>targetSum</code>.</p><p>A <strong>leaf</strong> is a node with no children.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg" style="width:500px;height:356px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2,3], targetSum = 5
Output: false
Explanation: There are two root-to-leaf paths in the tree:
(1 --&gt; 2): The sum is 3.
(1 --&gt; 3): The sum is 4.
There is no root-to-leaf path with sum = 5.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [], targetSum = 0
Output: false
Explanation: Since the tree is empty, there are no root-to-leaf paths.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[0, 5000]</code>.</li><li><code>-1000 &lt;= Node.val &lt;= 1000</code></li><li><code>-1000 &lt;= targetSum &lt;= 1000</code></li></ul><h2 id="💡-approach-dfs-depth-first-search" tabindex="-1">💡 Approach: DFS (Depth-First Search) <a class="header-anchor" href="#💡-approach-dfs-depth-first-search" aria-label="Permalink to &quot;💡 Approach: DFS (Depth-First Search)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>We need to check if there exists a <strong>root-to-leaf path</strong> where the sum of node values equals the target sum. This is a classic tree traversal problem that can be solved using <strong>DFS</strong>.</p><h3 id="strategy" tabindex="-1">Strategy <a class="header-anchor" href="#strategy" aria-label="Permalink to &quot;Strategy&quot;">​</a></h3><p>Use <strong>recursive DFS</strong> to traverse the tree:</p><ul><li><strong>Base case</strong>: If we reach a leaf node, check if the current sum equals the target</li><li><strong>Recursive case</strong>: Continue traversing left and right subtrees, subtracting the current node&#39;s value from the target</li></ul><h3 id="algorithm-steps" tabindex="-1">Algorithm Steps <a class="header-anchor" href="#algorithm-steps" aria-label="Permalink to &quot;Algorithm Steps&quot;">​</a></h3><ol><li><strong>Base case</strong>: If node is <code>null</code>, return <code>false</code> (no path exists)</li><li><strong>Leaf check</strong>: If it&#39;s a leaf node, check if <code>targetSum == node.val</code></li><li><strong>Recursive calls</strong>: Traverse left and right subtrees with <code>targetSum - node.val</code></li><li><strong>Return</strong>: <code>true</code> if either subtree has a valid path</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-v8Ah8" id="tab-8NH9PnG" checked><label data-title="Kotlin" for="tab-8NH9PnG">Kotlin</label><input type="radio" name="group-v8Ah8" id="tab-w_Dm8E3"><label data-title="TypeScript" for="tab-w_Dm8E3">TypeScript</label><input type="radio" name="group-v8Ah8" id="tab-YQjrADA"><label data-title="Java" for="tab-YQjrADA">Java</label><input type="radio" name="group-v8Ah8" id="tab-rma0oNh"><label data-title="Python" for="tab-rma0oNh">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun hasPathSum(root: TreeNode?, targetSum: Int): Boolean {
        // Base case: empty tree
        if (root == null) return false
        
        // Leaf node: check if target reached
        if (root.left == null &amp;&amp; root.right == null) {
            return targetSum == root.\`val\`
        }
        
        // Recursively check left and right subtrees
        val remainingSum = targetSum - root.\`val\`
        return hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum)
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    // Base case: empty tree
    if (!root) return false;
    
    // Leaf node: check if target reached
    if (!root.left &amp;&amp; !root.right) {
        return targetSum === root.val;
    }
    
    // Recursively check left and right subtrees
    const remainingSum = targetSum - root.val;
    return hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum);
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        // Base case: empty tree
        if (root == null) return false;
        
        // Leaf node: check if target reached
        if (root.left == null &amp;&amp; root.right == null) {
            return targetSum == root.val;
        }
        
        // Recursively check left and right subtrees
        int remainingSum = targetSum - root.val;
        return hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -&gt; bool:
        # Base case: empty tree
        if not root:
            return False
        
        # Leaf node: check if target reached
        if not root.left and not root.right:
            return targetSum == root.val
        
        # Recursively check left and right subtrees
        remaining_sum = targetSum - root.val
        return self.hasPathSum(root.left, remaining_sum) or self.hasPathSum(root.right, remaining_sum)
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(N) where N is the number of nodes in the tree</li><li><strong>Space Complexity:</strong> O(H) where H is the height of the tree (worst case O(N) for skewed tree)</li></ul>`,23)]))}const g=t(n,[["render",s]]);export{d as __pageData,g as default};
