import{_ as t,c as r,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"106. Construct Binary Tree from Inorder and Postorder Traversal","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/106.md","filePath":"binary-tree-general/106.md"}'),i={name:"binary-tree-general/106.md"};function a(s,e,l,d,p,u){return n(),r("div",null,e[0]||(e[0]=[o(`<h1 id="_106-construct-binary-tree-from-inorder-and-postorder-traversal" tabindex="-1"><a href="https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">106. Construct Binary Tree from Inorder and Postorder Traversal</a> <a class="header-anchor" href="#_106-construct-binary-tree-from-inorder-and-postorder-traversal" aria-label="Permalink to &quot;[106. Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given two integer arrays <code>inorder</code> and <code>postorder</code> where <code>inorder</code> is the inorder traversal of a binary tree and <code>postorder</code> is the postorder traversal of the same tree, construct and return the binary tree.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/tree.jpg" style="width:277px;height:302px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: inorder = [-1], postorder = [-1]
Output: [-1]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= inorder.length &lt;= 3000</code></li><li><code>postorder.length == inorder.length</code></li><li><code>-3000 &lt;= inorder[i], postorder[i] &lt;= 3000</code></li><li><code>inorder</code> and <code>postorder</code> consist of <strong>unique</strong> values.</li><li>Each value of <code>postorder</code> also appears in <code>inorder</code>.</li><li><code>inorder</code> is <strong>guaranteed</strong> to be the inorder traversal of the tree.</li><li><code>postorder</code> is <strong>guaranteed</strong> to be the postorder traversal of the tree.</li></ul><h2 id="💡-approach-recursive-with-hash-map" tabindex="-1">💡 Approach: Recursive with Hash Map <a class="header-anchor" href="#💡-approach-recursive-with-hash-map" aria-label="Permalink to &quot;💡 Approach: Recursive with Hash Map&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>The key insight is that:</p><ol><li><strong>Inorder traversal</strong>: Left → Root → Right (root divides left and right subtrees)</li><li><strong>Postorder traversal</strong>: Left → Right → Root (last element is always the root)</li></ol><p>We can use this property to recursively build the tree:</p><ol><li>The last element in postorder is the root</li><li>Find the root&#39;s position in inorder to determine left and right subtrees</li><li>Recursively build right and left subtrees (note the order!)</li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Create a hash map</strong> to store the index of each value in inorder array for O(1) lookup</li><li><strong>Define recursive function</strong> <code>buildTree(inStart, inEnd, postStart, postEnd)</code>: <ul><li><code>inStart</code>, <code>inEnd</code>: current subtree range in inorder</li><li><code>postStart</code>, <code>postEnd</code>: current subtree range in postorder</li></ul></li><li><strong>Base case</strong>: If <code>inStart &gt; inEnd</code> or <code>postStart &gt; postEnd</code>, return null</li><li><strong>Create root</strong> from <code>postorder[postEnd]</code> (last element)</li><li><strong>Find root position</strong> in inorder using hash map</li><li><strong>Calculate subtree sizes</strong>: <ul><li>Left subtree size = <code>rootIndex - inStart</code></li><li>Right subtree size = <code>inEnd - rootIndex</code></li></ul></li><li><strong>Recursively build</strong>: <ul><li>Right subtree: <code>buildTree(rootIndex + 1, inEnd, postStart + leftSize, postEnd - 1)</code></li><li>Left subtree: <code>buildTree(inStart, rootIndex - 1, postStart, postStart + leftSize - 1)</code></li></ul></li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-fExz1" id="tab-ha2d4UZ" checked><label data-title="Kotlin" for="tab-ha2d4UZ">Kotlin</label><input type="radio" name="group-fExz1" id="tab-SG1DoxC"><label data-title="TypeScript" for="tab-SG1DoxC">TypeScript</label><input type="radio" name="group-fExz1" id="tab-xYmVcTT"><label data-title="Java" for="tab-xYmVcTT">Java</label><input type="radio" name="group-fExz1" id="tab-V9gKrET"><label data-title="Python" for="tab-V9gKrET">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    private lateinit var inorder: IntArray
    private lateinit var postorder: IntArray
    private lateinit var inorderMap: MutableMap&lt;Int, Int&gt;

    fun buildTree(inorder: IntArray, postorder: IntArray): TreeNode? {
        this.inorder = inorder
        this.postorder = postorder
        this.inorderMap = mutableMapOf()
        
        // Build hash map for O(1) lookup
        for (i in inorder.indices) {
            inorderMap[inorder[i]] = i
        }
        
        return buildTree(0, inorder.size - 1, 0, postorder.size - 1)
    }
    
    private fun buildTree(inStart: Int, inEnd: Int, postStart: Int, postEnd: Int): TreeNode? {
        if (inStart &gt; inEnd || postStart &gt; postEnd) return null
        
        // Create root from postorder (last element)
        val rootValue = postorder[postEnd]
        val root = TreeNode(rootValue)
        
        // Find root position in inorder
        val rootIndex = inorderMap[rootValue]!!
        
        // Calculate left subtree size
        val leftSize = rootIndex - inStart
        
        // Build right and left subtrees
        root.right = buildTree(rootIndex + 1, inEnd, postStart + leftSize, postEnd - 1)
        root.left = buildTree(inStart, rootIndex - 1, postStart, postStart + leftSize - 1)
        
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
    private inorder: number[];
    private postorder: number[];
    private inorderMap: Map&lt;number, number&gt;;

    constructor() {
        this.inorder = [];
        this.postorder = [];
        this.inorderMap = new Map();
    }

    buildTree(inorder: number[], postorder: number[]): TreeNode | null {
        this.inorder = inorder;
        this.postorder = postorder;
        this.inorderMap = new Map();
        
        // Build hash map for O(1) lookup
        for (let i = 0; i &lt; inorder.length; i++) {
            this.inorderMap.set(inorder[i], i);
        }
        
        return this.buildTreeRecursive(0, inorder.length - 1, 0, postorder.length - 1);
    }
    
    private buildTreeRecursive(inStart: number, inEnd: number, postStart: number, postEnd: number): TreeNode | null {
        if (inStart &gt; inEnd || postStart &gt; postEnd) return null;
        
        // Create root from postorder (last element)
        const rootValue = this.postorder[postEnd];
        const root = new TreeNode(rootValue);
        
        // Find root position in inorder
        const rootIndex = this.inorderMap.get(rootValue)!;
        
        // Calculate left subtree size
        const leftSize = rootIndex - inStart;
        
        // Build right and left subtrees
        root.right = this.buildTreeRecursive(rootIndex + 1, inEnd, postStart + leftSize, postEnd - 1);
        root.left = this.buildTreeRecursive(inStart, rootIndex - 1, postStart, postStart + leftSize - 1);
        
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
    private int[] inorder;
    private int[] postorder;
    private Map&lt;Integer, Integer&gt; inorderMap;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        this.inorder = inorder;
        this.postorder = postorder;
        this.inorderMap = new HashMap&lt;&gt;();
        
        // Build hash map for O(1) lookup
        for (int i = 0; i &lt; inorder.length; i++) {
            inorderMap.put(inorder[i], i);
        }
        
        return buildTreeRecursive(0, inorder.length - 1, 0, postorder.length - 1);
    }
    
    private TreeNode buildTreeRecursive(int inStart, int inEnd, int postStart, int postEnd) {
        if (inStart &gt; inEnd || postStart &gt; postEnd) return null;
        
        // Create root from postorder (last element)
        int rootValue = postorder[postEnd];
        TreeNode root = new TreeNode(rootValue);
        
        // Find root position in inorder
        int rootIndex = inorderMap.get(rootValue);
        
        // Calculate left subtree size
        int leftSize = rootIndex - inStart;
        
        // Build right and left subtrees
        root.right = buildTreeRecursive(rootIndex + 1, inEnd, postStart + leftSize, postEnd - 1);
        root.left = buildTreeRecursive(inStart, rootIndex - 1, postStart, postStart + leftSize - 1);
        
        return root;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -&gt; Optional[TreeNode]:
        self.inorder = inorder
        self.postorder = postorder
        self.inorder_map = {}
        
        # Build hash map for O(1) lookup
        for i, val in enumerate(inorder):
            self.inorder_map[val] = i
        
        return self._build_tree(0, len(inorder) - 1, 0, len(postorder) - 1)
    
    def _build_tree(self, in_start: int, in_end: int, post_start: int, post_end: int) -&gt; Optional[TreeNode]:
        if in_start &gt; in_end or post_start &gt; post_end:
            return None
        
        # Create root from postorder (last element)
        root_value = self.postorder[post_end]
        root = TreeNode(root_value)
        
        # Find root position in inorder
        root_index = self.inorder_map[root_value]
        
        # Calculate left subtree size
        left_size = root_index - in_start
        
        # Build right and left subtrees
        root.right = self._build_tree(root_index + 1, in_end, post_start + left_size, post_end - 1)
        root.left = self._build_tree(in_start, root_index - 1, post_start, post_start + left_size - 1)
        
        return root
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes. We visit each node exactly once.</li><li><strong>Space Complexity:</strong> O(n), for the hash map and recursion stack. In the worst case (skewed tree), the recursion stack can be O(n).</li></ul>`,20)]))}const g=t(i,[["render",a]]);export{h as __pageData,g as default};
