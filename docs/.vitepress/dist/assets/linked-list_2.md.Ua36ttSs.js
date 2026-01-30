import{_ as n,c as t,o as a,ag as l}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"2. Add Two Numbers","description":"","frontmatter":{},"headers":[],"relativePath":"linked-list/2.md","filePath":"linked-list/2.md"}'),s={name:"linked-list/2.md"};function o(r,e,i,d,p,c){return a(),t("div",null,e[0]||(e[0]=[l(`<h1 id="_2-add-two-numbers" tabindex="-1"><a href="https://leetcode.com/problems/add-two-numbers/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">2. Add Two Numbers</a> <a class="header-anchor" href="#_2-add-two-numbers" aria-label="Permalink to &quot;[2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong> , and each of their nodes contains a single digit. Add the two numbers and return the sumas a linked list.</p><p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/10/02/addtwonumber1.jpg" style="width:483px;height:342px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: l1 = [0], l2 = [0]
Output: [0]
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in each linked list is in the range <code>[1, 100]</code>.</li><li><code>0 &lt;= Node.val &lt;= 9</code></li><li>It is guaranteed that the list represents a number that does not have leading zeros.</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><ol><li>Create a dummy head node to simplify list operations.</li><li>Use pointers <code>p</code> and <code>q</code> to traverse the two linked lists, and maintain a <code>carry</code> variable for overflow.</li><li>At each step: <ul><li>Sum the corresponding nodes and the <code>carry</code>.</li><li>Update the current node value as <code>sum % 10</code>.</li><li>Update <code>carry = sum / 10</code>.</li></ul></li><li>Move the pointers forward.</li><li>After traversal, if <code>carry &gt; 0</code>, append a new node with <code>carry</code>.</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-90vCu" id="tab-j_esICW" checked><label data-title="Kotlin" for="tab-j_esICW">Kotlin</label><input type="radio" name="group-90vCu" id="tab-6VgQj0N"><label data-title="TypeScript" for="tab-6VgQj0N">TypeScript</label><input type="radio" name="group-90vCu" id="tab--DX2HWp"><label data-title="Java" for="tab--DX2HWp">Java</label><input type="radio" name="group-90vCu" id="tab-THmZLN8"><label data-title="Python" for="tab-THmZLN8">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class ListNode(var \`val\`: Int) {
    var next: ListNode? = null
}

fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {
    val dummyHead = ListNode(0)
    var p = l1
    var q = l2
    var current = dummyHead
    var carry = 0

    while (p != null || q != null) {
        val x = p?.\`val\` ?: 0
        val y = q?.\`val\` ?: 0
        val sum = carry + x + y
        carry = sum / 10
        current.next = ListNode(sum % 10)
        current = current.next!!

        p = p?.next
        q = q?.next
    }

    if (carry &gt; 0) {
        current.next = ListNode(carry)
    }

    return dummyHead.next
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummyHead = new ListNode(0);
    let p = l1;
    let q = l2;
    let current = dummyHead;
    let carry = 0;

    while (p !== null || q !== null) {
        const x = p?.val ?? 0;
        const y = q?.val ?? 0;
        const sum = carry + x + y;
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next!;

        p = p?.next ?? null;
        q = q?.next ?? null;
    }

    if (carry &gt; 0) {
        current.next = new ListNode(carry);
    }

    return dummyHead.next;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">public class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummyHead = new ListNode(0);
        ListNode p = l1, q = l2, current = dummyHead;
        int carry = 0;

        while (p != null || q != null) {
            int x = (p != null) ? p.val : 0;
            int y = (q != null) ? q.val : 0;
            int sum = carry + x + y;
            carry = sum / 10;
            current.next = new ListNode(sum % 10);
            current = current.next;

            if (p != null) p = p.next;
            if (q != null) q = q.next;
        }

        if (carry &gt; 0) {
            current.next = new ListNode(carry);
        }

        return dummyHead.next;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -&gt; Optional[ListNode]:
        dummy_head = ListNode(0)
        p, q, current = l1, l2, dummy_head
        carry = 0

        while p or q:
            x = p.val if p else 0
            y = q.val if q else 0
            sum_val = carry + x + y
            carry = sum_val // 10
            current.next = ListNode(sum_val % 10)
            current = current.next

            p = p.next if p else None
            q = q.next if q else None

        if carry &gt; 0:
            current.next = ListNode(carry)

        return dummy_head.next
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(max(m, n)) — traverse both linked lists once.</li><li><strong>Space Complexity:</strong> O(max(m, n)) — new linked list for the result.</li></ul>`,17)]))}const v=n(s,[["render",o]]);export{m as __pageData,v as default};
