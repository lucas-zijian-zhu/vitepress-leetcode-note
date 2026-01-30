import{_ as r,c as n,o as t,ag as o}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"105. Construct Binary Tree from Preorder and Inorder Traversal","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/105.md","filePath":"binary-tree-general/105.md"}'),i={name:"binary-tree-general/105.md"};function a(d,e,l,s,p,u){return t(),n("div",null,e[0]||(e[0]=[o(`<h1 id="_105-construct-binary-tree-from-preorder-and-inorder-traversal" tabindex="-1"><a href="https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">105. Construct Binary Tree from Preorder and Inorder Traversal</a> <a class="header-anchor" href="#_105-construct-binary-tree-from-preorder-and-inorder-traversal" aria-label="Permalink to &quot;[105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given two integer arrays <code>preorder</code> and <code>inorder</code> where <code>preorder</code> is the preorder traversal of a binary tree and <code>inorder</code> is the inorder traversal of the same tree, construct and return the binary tree.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/tree.jpg" style="width:277px;height:302px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: preorder = [-1], inorder = [-1]
Output: [-1]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= preorder.length &lt;= 3000</code></li><li><code>inorder.length == preorder.length</code></li><li><code>-3000 &lt;= preorder[i], inorder[i] &lt;= 3000</code></li><li><code>preorder</code> and <code>inorder</code> consist of <strong>unique</strong> values.</li><li>Each value of <code>inorder</code> also appears in <code>preorder</code>.</li><li><code>preorder</code> is <strong>guaranteed</strong> to be the preorder traversal of the tree.</li><li><code>inorder</code> is <strong>guaranteed</strong> to be the inorder traversal of the tree.</li></ul><h2 id="💡-approach-recursive-with-hash-map" tabindex="-1">💡 Approach: Recursive with Hash Map <a class="header-anchor" href="#💡-approach-recursive-with-hash-map" aria-label="Permalink to &quot;💡 Approach: Recursive with Hash Map&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>The key insight is that:</p><ol><li><strong>Preorder traversal</strong>: Root → Left → Right (first element is always the root)</li><li><strong>Inorder traversal</strong>: Left → Root → Right (root divides left and right subtrees)</li></ol><p>We can use this property to recursively build the tree:</p><ol><li>The first element in preorder is the root</li><li>Find the root&#39;s position in inorder to determine left and right subtrees</li><li>Recursively build left and right subtrees</li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Create a hash map</strong> to store the index of each value in inorder array for O(1) lookup</li><li><strong>Define recursive function</strong> <code>buildTree(preStart, inStart, inEnd)</code>: <ul><li><code>preStart</code>: current root index in preorder</li><li><code>inStart</code>, <code>inEnd</code>: current subtree range in inorder</li></ul></li><li><strong>Base case</strong>: If <code>inStart &gt; inEnd</code>, return null</li><li><strong>Create root</strong> from <code>preorder[preStart]</code></li><li><strong>Find root position</strong> in inorder using hash map</li><li><strong>Calculate left subtree size</strong> = <code>rootIndex - inStart</code></li><li><strong>Recursively build</strong>: <ul><li>Left subtree: <code>buildTree(preStart + 1, inStart, rootIndex - 1)</code></li><li>Right subtree: <code>buildTree(preStart + leftSize + 1, rootIndex + 1, inEnd)</code></li></ul></li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-2Jk-y" id="tab-Oa956OV" checked><label data-title="Kotlin" for="tab-Oa956OV">Kotlin</label><input type="radio" name="group-2Jk-y" id="tab-A9VZE9E"><label data-title="TypeScript" for="tab-A9VZE9E">TypeScript</label><input type="radio" name="group-2Jk-y" id="tab-xSDonU4"><label data-title="Java" for="tab-xSDonU4">Java</label><input type="radio" name="group-2Jk-y" id="tab-N5LkvL5"><label data-title="Python" for="tab-N5LkvL5">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TreeNode(var \`val\`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class Solution {
    private lateinit var preorder: IntArray
    private lateinit var inorder: IntArray
    private lateinit var inorderMap: MutableMap&lt;Int, Int&gt;
    private var preIndex = 0

    fun buildTree(preorder: IntArray, inorder: IntArray): TreeNode? {
        this.preorder = preorder
        this.inorder = inorder
        this.inorderMap = mutableMapOf()
        
        // Build hash map for O(1) lookup
        for (i in inorder.indices) {
            inorderMap[inorder[i]] = i
        }
        
        return buildTree(0, inorder.size - 1)
    }
    
    private fun buildTree(inStart: Int, inEnd: Int): TreeNode? {
        if (inStart &gt; inEnd) return null
        
        // Create root from preorder
        val rootValue = preorder[preIndex++]
        val root = TreeNode(rootValue)
        
        // Find root position in inorder
        val rootIndex = inorderMap[rootValue]!!
        
        // Build left and right subtrees
        root.left = buildTree(inStart, rootIndex - 1)
        root.right = buildTree(rootIndex + 1, inEnd)
        
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
    private preorder: number[];
    private inorder: number[];
    private inorderMap: Map&lt;number, number&gt;;
    private preIndex: number;

    constructor() {
        this.preorder = [];
        this.inorder = [];
        this.inorderMap = new Map();
        this.preIndex = 0;
    }

    buildTree(preorder: number[], inorder: number[]): TreeNode | null {
        this.preorder = preorder;
        this.inorder = inorder;
        this.inorderMap = new Map();
        this.preIndex = 0;
        
        // Build hash map for O(1) lookup
        for (let i = 0; i &lt; inorder.length; i++) {
            this.inorderMap.set(inorder[i], i);
        }
        
        return this.buildTreeRecursive(0, inorder.length - 1);
    }
    
    private buildTreeRecursive(inStart: number, inEnd: number): TreeNode | null {
        if (inStart &gt; inEnd) return null;
        
        // Create root from preorder
        const rootValue = this.preorder[this.preIndex++];
        const root = new TreeNode(rootValue);
        
        // Find root position in inorder
        const rootIndex = this.inorderMap.get(rootValue)!;
        
        // Build left and right subtrees
        root.left = this.buildTreeRecursive(inStart, rootIndex - 1);
        root.right = this.buildTreeRecursive(rootIndex + 1, inEnd);
        
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
    private int[] preorder;
    private int[] inorder;
    private Map&lt;Integer, Integer&gt; inorderMap;
    private int preIndex;

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        this.preorder = preorder;
        this.inorder = inorder;
        this.inorderMap = new HashMap&lt;&gt;();
        this.preIndex = 0;
        
        // Build hash map for O(1) lookup
        for (int i = 0; i &lt; inorder.length; i++) {
            inorderMap.put(inorder[i], i);
        }
        
        return buildTreeRecursive(0, inorder.length - 1);
    }
    
    private TreeNode buildTreeRecursive(int inStart, int inEnd) {
        if (inStart &gt; inEnd) return null;
        
        // Create root from preorder
        int rootValue = preorder[preIndex++];
        TreeNode root = new TreeNode(rootValue);
        
        // Find root position in inorder
        int rootIndex = inorderMap.get(rootValue);
        
        // Build left and right subtrees
        root.left = buildTreeRecursive(inStart, rootIndex - 1);
        root.right = buildTreeRecursive(rootIndex + 1, inEnd);
        
        return root;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -&gt; Optional[TreeNode]:
        self.preorder = preorder
        self.inorder = inorder
        self.inorder_map = {}
        self.pre_index = 0
        
        # Build hash map for O(1) lookup
        for i, val in enumerate(inorder):
            self.inorder_map[val] = i
        
        return self._build_tree(0, len(inorder) - 1)
    
    def _build_tree(self, in_start: int, in_end: int) -&gt; Optional[TreeNode]:
        if in_start &gt; in_end:
            return None
        
        # Create root from preorder
        root_value = self.preorder[self.pre_index]
        self.pre_index += 1
        root = TreeNode(root_value)
        
        # Find root position in inorder
        root_index = self.inorder_map[root_value]
        
        # Build left and right subtrees
        root.left = self._build_tree(in_start, root_index - 1)
        root.right = self._build_tree(root_index + 1, in_end)
        
        return root
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes. We visit each node exactly once.</li><li><strong>Space Complexity:</strong> O(n), for the hash map and recursion stack. In the worst case (skewed tree), the recursion stack can be O(n).</li></ul>`,20)]))}const v=r(i,[["render",a]]);export{h as __pageData,v as default};
