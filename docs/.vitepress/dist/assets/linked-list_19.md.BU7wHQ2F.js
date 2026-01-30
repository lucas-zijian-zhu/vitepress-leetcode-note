import{_ as t,c as n,o,ag as s}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"19. Remove Nth Node From End of List","description":"","frontmatter":{},"headers":[],"relativePath":"linked-list/19.md","filePath":"linked-list/19.md"}'),a={name:"linked-list/19.md"};function d(i,e,l,r,c,p){return o(),n("div",null,e[0]||(e[0]=[s(`<h1 id="_19-remove-nth-node-from-end-of-list" tabindex="-1"><a href="https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">19. Remove Nth Node From End of List</a> <a class="header-anchor" href="#_19-remove-nth-node-from-end-of-list" aria-label="Permalink to &quot;[19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given the <code>head</code> of a linked list, remove the <code>n^th</code> node from the end of the list and return its head.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg" style="width:542px;height:222px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [1], n = 1
Output: []
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [1,2], n = 1
Output: [1]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the list is <code>sz</code>.</li><li><code>1 &lt;= sz &lt;= 30</code></li><li><code>0 &lt;= Node.val &lt;= 100</code></li><li><code>1 &lt;= n &lt;= sz</code></li></ul><p><strong>Follow up:</strong> Could you do this in one pass?</p><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>The standard approach is the <strong>two-pointer technique</strong>:</p><ol><li>Use two pointers, <code>first</code> and <code>second</code>, both starting at a dummy node before <code>head</code>.</li><li>Move <code>first</code> pointer <code>n + 1</code> steps forward, so the gap between <code>first</code> and <code>second</code> is <code>n</code> nodes.</li><li>Move both pointers forward together until <code>first</code> reaches the end of the list.</li><li><code>second.next</code> now points to the node to remove. Update <code>second.next</code> to skip the target node.</li><li>Return <code>dummy.next</code> as the new head.</li></ol><p>This ensures <strong>one-pass traversal</strong> and avoids calculating the length first.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Dm-6v" id="tab-V6TEgly" checked><label data-title="Kotlin" for="tab-V6TEgly">Kotlin</label><input type="radio" name="group-Dm-6v" id="tab-5wAc3Md"><label data-title="TypeScript" for="tab-5wAc3Md">TypeScript</label><input type="radio" name="group-Dm-6v" id="tab-IcTUQm9"><label data-title="Java" for="tab-IcTUQm9">Java</label><input type="radio" name="group-Dm-6v" id="tab-N4ZYCfC"><label data-title="Python" for="tab-N4ZYCfC">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class ListNode(var \`val\`: Int) {
    var next: ListNode? = null
}

fun removeNthFromEnd(head: ListNode?, n: Int): ListNode? {
    val dummy = ListNode(0)
    dummy.next = head
    var first: ListNode? = dummy
    var second: ListNode? = dummy

    // Move first n+1 steps ahead
    repeat(n + 1) {
        first = first?.next
    }

    // Move both pointers until first reaches the end
    while (first != null) {
        first = first.next
        second = second?.next
    }

    // Remove the nth node
    second?.next = second?.next?.next

    return dummy.next
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;
    let first: ListNode | null = dummy;
    let second: ListNode | null = dummy;

    // Move first n+1 steps ahead
    for (let i = 0; i &lt;= n; i++) {
        first = first!.next;
    }

    // Move both pointers until first reaches the end
    while (first !== null) {
        first = first.next;
        second = second!.next;
    }

    // Remove the nth node
    second!.next = second!.next!.next;

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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode first = dummy;
        ListNode second = dummy;

        // Move first n+1 steps ahead
        for (int i = 0; i &lt;= n; i++) {
            first = first.next;
        }

        // Move both pointers until first reaches the end
        while (first != null) {
            first = first.next;
            second = second.next;
        }

        // Remove the nth node
        second.next = second.next.next;

        return dummy.next;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -&gt; Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        first = dummy
        second = dummy

        # Move first n+1 steps ahead
        for _ in range(n + 1):
            first = first.next

        # Move both pointers until first reaches the end
        while first:
            first = first.next
            second = second.next

        # Remove the nth node
        second.next = second.next.next

        return dummy.next
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(L), where L is the length of the linked list. We traverse the list once.</li><li><strong>Space Complexity:</strong> O(1), no extra space is used except pointers.</li></ul>`,19)]))}const u=t(a,[["render",d]]);export{m as __pageData,u as default};
