import{_ as t,c as n,o as a,ag as l}from"./chunks/framework.Bw-5EFTY.js";const v=JSON.parse('{"title":"82. Remove Duplicates from Sorted List II","description":"","frontmatter":{},"headers":[],"relativePath":"linked-list/82.md","filePath":"linked-list/82.md"}'),i={name:"linked-list/82.md"};function r(o,e,s,d,c,u){return a(),n("div",null,e[0]||(e[0]=[l(`<h1 id="_82-remove-duplicates-from-sorted-list-ii" tabindex="-1"><a href="https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">82. Remove Duplicates from Sorted List II</a> <a class="header-anchor" href="#_82-remove-duplicates-from-sorted-list-ii" aria-label="Permalink to &quot;[82. Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given the <code>head</code> of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list <strong>sorted</strong> as well.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/linkedlist1.jpg" style="width:500px;height:142px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/linkedlist2.jpg" style="width:500px;height:205px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [1,1,1,2,3]
Output: [2,3]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the list is in the range <code>[0, 300]</code>.</li><li><code>-100 &lt;= Node.val &lt;= 100</code></li><li>The list is guaranteed to be <strong>sorted</strong> in ascending order.</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><ol><li>Since the list is sorted, duplicates will always appear consecutively.</li><li>Use a <strong>dummy node</strong> pointing to the head to handle edge cases (e.g., duplicates at the beginning).</li><li>Maintain two pointers: <ul><li><code>prev</code>: the last node before a group of duplicates.</li><li><code>curr</code>: the current node being inspected.</li></ul></li><li>Traverse the list: <ul><li>If <code>curr</code> has duplicates (i.e., <code>curr.val == curr.next.val</code>), skip the entire group of duplicates by moving <code>curr</code> forward until the value changes.</li><li>Connect <code>prev.next</code> to the node after the duplicates.</li><li>Otherwise, move <code>prev</code> forward normally.</li></ul></li><li>Continue until the end of the list.</li><li>Return <code>dummy.next</code> as the new head.</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-VxiXZ" id="tab-R0_AzP_" checked><label data-title="Kotlin" for="tab-R0_AzP_">Kotlin</label><input type="radio" name="group-VxiXZ" id="tab-l_S1Vb1"><label data-title="TypeScript" for="tab-l_S1Vb1">TypeScript</label><input type="radio" name="group-VxiXZ" id="tab-Mn6-jTp"><label data-title="Java" for="tab-Mn6-jTp">Java</label><input type="radio" name="group-VxiXZ" id="tab-URr1dfo"><label data-title="Python" for="tab-URr1dfo">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class ListNode(var \`val\`: Int) {
    var next: ListNode? = null
}

class Solution {
    fun deleteDuplicates(head: ListNode?): ListNode? {
        val dummy = ListNode(0)
        dummy.next = head
        var prev: ListNode? = dummy
        var curr = head

        while (curr != null) {
            // Detect duplicates
            if (curr.next != null &amp;&amp; curr.\`val\` == curr.next!!.\`val\`) {
                val duplicateVal = curr.\`val\`
                // Skip all nodes with the same value
                while (curr != null &amp;&amp; curr.\`val\` == duplicateVal) {
                    curr = curr.next
                }
                prev?.next = curr
            } else {
                prev = curr
                curr = curr.next
            }
        }

        return dummy.next
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function deleteDuplicates(head: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev: ListNode | null = dummy;
    let curr = head;

    while (curr !== null) {
        // Detect duplicates
        if (curr.next !== null &amp;&amp; curr.val === curr.next.val) {
            const duplicateVal = curr.val;
            // Skip all nodes with the same value
            while (curr !== null &amp;&amp; curr.val === duplicateVal) {
                curr = curr.next;
            }
            prev!.next = curr;
        } else {
            prev = curr;
            curr = curr.next;
        }
    }

    return dummy.next;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">public class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        ListNode curr = head;

        while (curr != null) {
            // Detect duplicates
            if (curr.next != null &amp;&amp; curr.val == curr.next.val) {
                int duplicateVal = curr.val;
                // Skip all nodes with the same value
                while (curr != null &amp;&amp; curr.val == duplicateVal) {
                    curr = curr.next;
                }
                prev.next = curr;
            } else {
                prev = curr;
                curr = curr.next;
            }
        }

        return dummy.next;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -&gt; Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        prev = dummy
        curr = head

        while curr:
            # Detect duplicates
            if curr.next and curr.val == curr.next.val:
                duplicate_val = curr.val
                # Skip all nodes with the same value
                while curr and curr.val == duplicate_val:
                    curr = curr.next
                prev.next = curr
            else:
                prev = curr
                curr = curr.next

        return dummy.next
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> <code>O(n)</code> — each node is visited once.</li><li><strong>Space Complexity:</strong> <code>O(1)</code> — no extra data structures are used, only pointers.</li></ul>`,14)]))}const m=t(i,[["render",r]]);export{v as __pageData,m as default};
