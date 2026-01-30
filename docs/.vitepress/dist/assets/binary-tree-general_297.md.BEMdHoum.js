import{_ as r,C as a,c as l,o as i,j as n,ag as o,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"297. Serialize and Deserialize Binary Tree","description":"","frontmatter":{},"headers":[],"relativePath":"binary-tree-general/297.md","filePath":"binary-tree-general/297.md"}'),u={name:"binary-tree-general/297.md"},p={id:"_297-serialize-and-deserialize-binary-tree",tabindex:"-1"};function c(g,e,v,h,f,b){const t=a("Badge");return i(),l("div",null,[n("h1",p,[e[0]||(e[0]=n("a",{href:"https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"297. Serialize and Deserialize Binary Tree",-1)),s(t,{type:"warning",text:"Hard"}),e[1]||(e[1]=d()),e[2]||(e[2]=n("a",{class:"header-anchor",href:"#_297-serialize-and-deserialize-binary-tree","aria-label":'Permalink to "[297. Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Hard" />"'},"​",-1))]),e[3]||(e[3]=o(`<p>Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.</p><p>Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.</p><p><strong>Clarification:</strong> The input/output format is the same as <a href="https://support.leetcode.com/hc/en-us/articles/32442719377939-How-to-create-test-cases-on-LeetCode#h_01J5EGREAW3NAEJ14XC07GRW1A" target="_blank">how LeetCode serializes a binary tree</a>. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/09/15/serdeser.jpg" style="width:442px;height:324px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: root = []
Output: []
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the tree is in the range <code>[0, 10^4]</code>.</li><li><code>-1000 &lt;= Node.val &lt;= 1000</code></li></ul><h2 id="🚀-approach-preorder-traversal-with-null-markers" tabindex="-1">🚀 Approach: Preorder Traversal with Null Markers <a class="header-anchor" href="#🚀-approach-preorder-traversal-with-null-markers" aria-label="Permalink to &quot;🚀 Approach: Preorder Traversal with Null Markers&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>We can use <strong>preorder traversal</strong> to serialize the tree. The key insight is to include <strong>null markers</strong> to preserve the tree structure during deserialization.</p><p><strong>Key Points:</strong></p><ol><li><strong>Preorder traversal</strong> visits root → left → right</li><li><strong>Include null markers</strong> for missing children to maintain structure</li><li><strong>Use a delimiter</strong> (like comma) to separate values</li><li><strong>Deserialize by rebuilding</strong> the tree using the same preorder logic</li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Serialize</strong>: Use preorder traversal, append &quot;null&quot; for missing nodes</li><li><strong>Deserialize</strong>: Parse the string and rebuild tree using preorder logic</li><li><strong>Handle edge cases</strong>: Empty tree, single node, etc.</li></ol><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-GgXZd" id="tab-saNbfi8" checked><label data-title="Kotlin" for="tab-saNbfi8">Kotlin</label><input type="radio" name="group-GgXZd" id="tab-XeWoCW4"><label data-title="TypeScript" for="tab-XeWoCW4">TypeScript</label><input type="radio" name="group-GgXZd" id="tab-Tu5NKm5"><label data-title="Java" for="tab-Tu5NKm5">Java</label><input type="radio" name="group-GgXZd" id="tab-WNbtaDS"><label data-title="Python" for="tab-WNbtaDS">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">/**
 * Definition for a binary tree node.
 * class TreeNode(var \`val\`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */

class Codec {
    // Encodes a tree to a single string.
    fun serialize(root: TreeNode?): String {
        val result = mutableListOf&lt;String&gt;()
        serializeHelper(root, result)
        return result.joinToString(&quot;,&quot;)
    }
    
    private fun serializeHelper(node: TreeNode?, result: MutableList&lt;String&gt;) {
        if (node == null) {
            result.add(&quot;null&quot;)
            return
        }
        
        result.add(node.\`val\`.toString())
        serializeHelper(node.left, result)
        serializeHelper(node.right, result)
    }

    // Decodes your encoded data to tree.
    fun deserialize(data: String): TreeNode? {
        val values = data.split(&quot;,&quot;).toMutableList()
        return deserializeHelper(values)
    }
    
    private fun deserializeHelper(values: MutableList&lt;String&gt;): TreeNode? {
        if (values.isEmpty()) return null
        
        val value = values.removeAt(0)
        if (value == &quot;null&quot;) return null
        
        val node = TreeNode(value.toInt())
        node.left = deserializeHelper(values)
        node.right = deserializeHelper(values)
        
        return node
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

class Codec {
    // Encodes a tree to a single string.
    serialize(root: TreeNode | null): string {
        const result: string[] = [];
        this.serializeHelper(root, result);
        return result.join(&#39;,&#39;);
    }
    
    private serializeHelper(node: TreeNode | null, result: string[]): void {
        if (node === null) {
            result.push(&#39;null&#39;);
            return;
        }
        
        result.push(node.val.toString());
        this.serializeHelper(node.left, result);
        this.serializeHelper(node.right, result);
    }

    // Decodes your encoded data to tree.
    deserialize(data: string): TreeNode | null {
        const values = data.split(&#39;,&#39;);
        let index = 0;
        
        return this.deserializeHelper(values);
        
        function deserializeHelper(values: string[]): TreeNode | null {
            if (index &gt;= values.length) return null;
            
            const value = values[index++];
            if (value === &#39;null&#39;) return null;
            
            const node = new TreeNode(parseInt(value));
            node.left = deserializeHelper(values);
            node.right = deserializeHelper(values);
            
            return node;
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
public class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        StringBuilder result = new StringBuilder();
        serializeHelper(root, result);
        return result.toString();
    }
    
    private void serializeHelper(TreeNode node, StringBuilder result) {
        if (node == null) {
            result.append(&quot;null,&quot;);
            return;
        }
        
        result.append(node.val).append(&quot;,&quot;);
        serializeHelper(node.left, result);
        serializeHelper(node.right, result);
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        String[] values = data.split(&quot;,&quot;);
        int[] index = {0};
        return deserializeHelper(values, index);
    }
    
    private TreeNode deserializeHelper(String[] values, int[] index) {
        if (index[0] &gt;= values.length || values[index[0]].equals(&quot;null&quot;)) {
            index[0]++;
            return null;
        }
        
        TreeNode node = new TreeNode(Integer.parseInt(values[index[0]++]));
        node.left = deserializeHelper(values, index);
        node.right = deserializeHelper(values, index);
        
        return node;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python"># Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Codec:

    def serialize(self, root):
        &quot;&quot;&quot;Encodes a tree to a single string.
        
        :type root: TreeNode
        :rtype: str
        &quot;&quot;&quot;
        result = []
        self._serialize_helper(root, result)
        return &#39;,&#39;.join(result)
    
    def _serialize_helper(self, node, result):
        if node is None:
            result.append(&#39;null&#39;)
            return
        
        result.append(str(node.val))
        self._serialize_helper(node.left, result)
        self._serialize_helper(node.right, result)

    def deserialize(self, data):
        &quot;&quot;&quot;Decodes your encoded data to tree.
        
        :type data: str
        :rtype: TreeNode
        &quot;&quot;&quot;
        values = data.split(&#39;,&#39;)
        return self._deserialize_helper(values)
    
    def _deserialize_helper(self, values):
        if not values:
            return None
        
        value = values.pop(0)
        if value == &#39;null&#39;:
            return None
        
        node = TreeNode(int(value))
        node.left = self._deserialize_helper(values)
        node.right = self._deserialize_helper(values)
        
        return node
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n) where n is the number of nodes <ul><li><strong>Serialize:</strong> O(n) - Visit each node once</li><li><strong>Deserialize:</strong> O(n) - Process each value once</li></ul></li><li><strong>Space Complexity:</strong> O(n) <ul><li><strong>Serialize:</strong> O(n) - Recursion stack + result string</li><li><strong>Deserialize:</strong> O(n) - Recursion stack + values array</li></ul></li></ul>`,21))])}const z=r(u,[["render",c]]);export{y as __pageData,z as default};
