import{_ as n,c as t,o,ag as l}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"117. Populating Next Right Pointers in Each Node II","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/117.md","filePath":"binary-tree-general/117.md"}'),r={name:"binary-tree-general/117.md"};function a(i,e,s,d,c,p){return o(),t("div",null,e[0]||(e[0]=[l(`<h1 id="_117-populating-next-right-pointers-in-each-node-ii" tabindex="-1"><a href="https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">117. Populating Next Right Pointers in Each Node II</a> <a class="header-anchor" href="#_117-populating-next-right-pointers-in-each-node-ii" aria-label="Permalink to &quot;[117. Populating Next Right Pointers in Each Node II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a binary tree</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
</code></pre></div><p>Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to <code>NULL</code>.</p><p>Initially, all next pointers are set to <code>NULL</code>.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2019/02/15/117_sample.png" style="width:500px;height:171px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with &#39;#&#39; signifying the end of each level.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = []
Output: []
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[0, 6000]</code>.</li><li><code>-100 &lt;= Node.val &lt;= 100</code></li></ul><p><strong>Follow-up:</strong></p><ul><li>You may only use constant extra space.</li><li>The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.</li></ul><h2 id="💡-approach-level-by-level-with-previous-node" tabindex="-1">💡 Approach: Level-by-Level with Previous Node <a class="header-anchor" href="#💡-approach-level-by-level-with-previous-node" aria-label="Permalink to &quot;💡 Approach: Level-by-Level with Previous Node&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is similar to LeetCode 116, but the tree is not necessarily complete. We need to connect each node to its next right node at the same level. The key insight is to use the already established next pointers to traverse the current level while building the next level.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Use a dummy head</strong> to simplify the logic for the first node in each level</li><li><strong>Traverse level by level</strong>: <ul><li>Start from the root</li><li>For each level, use a <code>prev</code> pointer to track the previous node</li><li>Connect each node to the next node in the same level</li></ul></li><li><strong>Handle missing children</strong>: Skip null children and only process actual nodes</li><li><strong>Move to next level</strong>: Use the next pointers to move to the next level</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use <code>dummy.next</code> to get the first node of the next level</li><li>Use <code>prev</code> to track the previous node for connecting</li><li>Reset <code>dummy.next</code> and <code>prev</code> for each new level</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-PGMdy" id="tab-l6EHW9Z" checked><label data-title="Kotlin" for="tab-l6EHW9Z">Kotlin</label><input type="radio" name="group-PGMdy" id="tab-s5f8dXb"><label data-title="TypeScript" for="tab-s5f8dXb">TypeScript</label><input type="radio" name="group-PGMdy" id="tab-rqPNtIy"><label data-title="Java" for="tab-rqPNtIy">Java</label><input type="radio" name="group-PGMdy" id="tab-y5HT71S"><label data-title="Python" for="tab-y5HT71S">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Node(var \`val\`: Int) {
    var left: Node? = null
    var right: Node? = null
    var next: Node? = null
}

class Solution {
    fun connect(root: Node?): Node? {
        if (root == null) return null
        
        var current = root
        
        while (current != null) {
            val dummy = Node(0) // Dummy head for the next level
            var prev = dummy
            
            // Process current level
            while (current != null) {
                if (current.left != null) {
                    prev.next = current.left
                    prev = prev.next!!
                }
                if (current.right != null) {
                    prev.next = current.right
                    prev = prev.next!!
                }
                current = current.next
            }
            
            // Move to next level
            current = dummy.next
        }
        
        return root
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Node {
    val: number;
    left: Node | null;
    right: Node | null;
    next: Node | null;
    constructor(val?: number, left?: Node | null, right?: Node | null, next?: Node | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
        this.next = (next === undefined ? null : next);
    }
}

class Solution {
    connect(root: Node | null): Node | null {
        if (root === null) return null;
        
        let current: Node | null = root;
        
        while (current !== null) {
            const dummy = new Node(0); // Dummy head for the next level
            let prev: Node | null = dummy;
            
            // Process current level
            while (current !== null) {
                if (current.left !== null) {
                    prev.next = current.left;
                    prev = prev.next!;
                }
                if (current.right !== null) {
                    prev.next = current.right;
                    prev = prev.next!;
                }
                current = current.next;
            }
            
            // Move to next level
            current = dummy.next;
        }
        
        return root;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}
    
    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
}

class Solution {
    public Node connect(Node root) {
        if (root == null) return null;
        
        Node current = root;
        
        while (current != null) {
            Node dummy = new Node(0); // Dummy head for the next level
            Node prev = dummy;
            
            // Process current level
            while (current != null) {
                if (current.left != null) {
                    prev.next = current.left;
                    prev = prev.next;
                }
                if (current.right != null) {
                    prev.next = current.right;
                    prev = prev.next;
                }
                current = current.next;
            }
            
            // Move to next level
            current = dummy.next;
        }
        
        return root;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Node:
    def __init__(self, val: int = 0, left: &#39;Node&#39; = None, right: &#39;Node&#39; = None, next: &#39;Node&#39; = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next

class Solution:
    def connect(self, root: &#39;Node&#39;) -&gt; &#39;Node&#39;:
        if root is None:
            return None
        
        current = root
        
        while current is not None:
            dummy = Node(0)  # Dummy head for the next level
            prev = dummy
            
            # Process current level
            while current is not None:
                if current.left is not None:
                    prev.next = current.left
                    prev = prev.next
                if current.right is not None:
                    prev.next = current.right
                    prev = prev.next
                current = current.next
            
            # Move to next level
            current = dummy.next
        
        return root
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes. We visit each node exactly once.</li><li><strong>Space Complexity:</strong> O(1), using only constant extra space (the dummy node and prev pointer).</li></ul>`,24)]))}const v=n(r,[["render",a]]);export{h as __pageData,v as default};
