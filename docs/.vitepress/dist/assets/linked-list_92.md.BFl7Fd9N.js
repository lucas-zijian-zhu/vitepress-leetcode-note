import{_ as t,c as n,o,ag as i}from"./chunks/framework.Bw-5EFTY.js";const v=JSON.parse('{"title":"92. Reverse Linked List II","description":"","frontmatter":{},"headers":[],"relativePath":"linked-list/92.md","filePath":"linked-list/92.md"}'),l={name:"linked-list/92.md"};function a(s,e,r,d,p,c){return o(),n("div",null,e[0]||(e[0]=[i(`<h1 id="_92-reverse-linked-list-ii" tabindex="-1"><a href="https://leetcode.com/problems/reverse-linked-list-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">92. Reverse Linked List II</a> <a class="header-anchor" href="#_92-reverse-linked-list-ii" aria-label="Permalink to &quot;[92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given the <code>head</code> of a singly linked list and two integers <code>left</code> and <code>right</code> where <code>left &lt;= right</code>, reverse the nodes of the list from position <code>left</code> to position <code>right</code>, and return the reversed list.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/rev2ex2.jpg" style="width:542px;height:222px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [5], left = 1, right = 1
Output: [5]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the list is <code>n</code>.</li><li><code>1 &lt;= n &lt;= 500</code></li><li><code>-500 &lt;= Node.val &lt;= 500</code></li><li><code>1 &lt;= left &lt;= right &lt;= n</code></li></ul><p><strong>Follow up:</strong> Could you do it in one pass?</p><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><ol><li>Use a dummy node pointing to the head to handle edge cases (e.g., reversing from position 1).</li><li>Traverse to the node before <code>left</code> (call it <code>prev</code>).</li><li>Reverse the sublist between <code>left</code> and <code>right</code>: <ul><li>Use the standard linked list reversal approach by adjusting pointers.</li><li>Keep track of the reversed portion and the tail.</li></ul></li><li>Connect the reversed sublist back: <ul><li><code>prev.next</code> should point to the new head of the reversed sublist.</li><li>The tail of the reversed sublist should connect to the node after <code>right</code>.</li></ul></li><li>Return <code>dummy.next</code> as the new head.</li></ol><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-WMYC5" id="tab-nXvr5ZM" checked><label data-title="Kotlin" for="tab-nXvr5ZM">Kotlin</label><input type="radio" name="group-WMYC5" id="tab-pEfjbC7"><label data-title="TypeScript" for="tab-pEfjbC7">TypeScript</label><input type="radio" name="group-WMYC5" id="tab-T-_hhvV"><label data-title="Java" for="tab-T-_hhvV">Java</label><input type="radio" name="group-WMYC5" id="tab-DzqqhQ3"><label data-title="Python" for="tab-DzqqhQ3">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">/**
 * Definition for singly-linked list.
 * class ListNode(var \`val\`: Int) {
 *     var next: ListNode? = null
 * }
 */

class Solution {
    fun reverseBetween(head: ListNode?, left: Int, right: Int): ListNode? {
        if (head == null || left == right) return head

        val dummy = ListNode(0)
        dummy.next = head
        var prev: ListNode? = dummy

        // Step 1: move prev to the node before \`left\`
        for (i in 1 until left) {
            prev = prev?.next
        }

        // Step 2: reverse sublist from left to right
        val start = prev?.next       // the first node of sublist
        var then = start?.next       // the node to be moved

        for (i in 0 until right - left) {
            start?.next = then?.next
            then?.next = prev?.next
            prev?.next = then
            then = start?.next
        }

        return dummy.next
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class Solution {
    reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
        if (head === null || left === right) return head;

        const dummy = new ListNode(0);
        dummy.next = head;
        let prev: ListNode | null = dummy;

        // Step 1: move prev to the node before \`left\`
        for (let i = 1; i &lt; left; i++) {
            prev = prev!.next;
        }

        // Step 2: reverse sublist from left to right
        const start = prev!.next;       // the first node of sublist
        let then = start!.next;         // the node to be moved

        for (let i = 0; i &lt; right - left; i++) {
            start!.next = then!.next;
            then!.next = prev!.next;
            prev!.next = then;
            then = start!.next;
        }

        return dummy.next;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */

class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        if (head == null || left == right) return head;

        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;

        // Step 1: move prev to the node before \`left\`
        for (int i = 1; i &lt; left; i++) {
            prev = prev.next;
        }

        // Step 2: reverse sublist from left to right
        ListNode start = prev.next;       // the first node of sublist
        ListNode then = start.next;       // the node to be moved

        for (int i = 0; i &lt; right - left; i++) {
            start.next = then.next;
            then.next = prev.next;
            prev.next = then;
            then = start.next;
        }

        return dummy.next;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python"># Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -&gt; Optional[ListNode]:
        if head is None or left == right:
            return head

        dummy = ListNode(0)
        dummy.next = head
        prev = dummy

        # Step 1: move prev to the node before \`left\`
        for i in range(1, left):
            prev = prev.next

        # Step 2: reverse sublist from left to right
        start = prev.next       # the first node of sublist
        then = start.next       # the node to be moved

        for i in range(right - left):
            start.next = then.next
            then.next = prev.next
            prev.next = then
            then = start.next

        return dummy.next
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n)<br> We traverse the list once to reach the left boundary, once more to reverse the sublist, and reconnect nodes in constant time.</li><li><strong>Space Complexity:</strong> O(1)<br> We only use a few pointers for manipulation.</li></ul>`,16)]))}const u=t(l,[["render",a]]);export{v as __pageData,u as default};
