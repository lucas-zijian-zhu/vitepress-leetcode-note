import{_ as t,c as n,o as l,ag as a}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"21. Merge Two Sorted Lists","description":"","frontmatter":{},"headers":[],"relativePath":"linked-list/21.md","filePath":"linked-list/21.md"}'),s={name:"linked-list/21.md"};function o(i,e,p,r,d,c){return l(),n("div",null,e[0]||(e[0]=[a(`<h1 id="_21-merge-two-sorted-lists" tabindex="-1"><a href="https://leetcode.com/problems/merge-two-sorted-lists/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">21. Merge Two Sorted Lists</a> <a class="header-anchor" href="#_21-merge-two-sorted-lists" aria-label="Permalink to &quot;[21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.</p><p>Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p><p>Return the head of the merged linked list.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg" style="width:662px;height:302px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: list1 = [], list2 = []
Output: []
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: list1 = [], list2 = [0]
Output: [0]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in both lists is in the range <code>[0, 50]</code>.</li><li><code>-100 &lt;= Node.val &lt;= 100</code></li><li>Both <code>list1</code> and <code>list2</code> are sorted in <strong>non-decreasing</strong> order.</li></ul><h2 id="approach-iterative" tabindex="-1">Approach: Iterative <a class="header-anchor" href="#approach-iterative" aria-label="Permalink to &quot;Approach: Iterative&quot;">​</a></h2><ol><li>Create a dummy head node to simplify edge cases.</li><li>Use a pointer <code>current</code> to build the merged list.</li><li>Compare nodes from <code>l1</code> and <code>l2</code>, attach the smaller one to <code>current.next</code>.</li><li>Move the pointer of the list from which the node was taken.</li><li>After the loop, attach the remaining nodes from the non-empty list.</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-rawDv" id="tab-DqnjSn0" checked><label data-title="Kotlin" for="tab-DqnjSn0">Kotlin</label><input type="radio" name="group-rawDv" id="tab-VbuDELd"><label data-title="TypeScript" for="tab-VbuDELd">TypeScript</label><input type="radio" name="group-rawDv" id="tab-9BY7AsB"><label data-title="Java" for="tab-9BY7AsB">Java</label><input type="radio" name="group-rawDv" id="tab-nPR91_i"><label data-title="Python" for="tab-nPR91_i">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun mergeTwoLists(l1: ListNode?, l2: ListNode?): ListNode? {
        val dummy = ListNode(0)
        var current = dummy
        var p1 = l1
        var p2 = l2

        while (p1 != null &amp;&amp; p2 != null) {
            if (p1.\`val\` &lt; p2.\`val\`) {
                current.next = p1
                p1 = p1.next
            } else {
                current.next = p2
                p2 = p2.next
            }
            current = current.next!!
        }

        current.next = p1 ?: p2
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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let current = dummy;
    let p1 = list1;
    let p2 = list2;

    while (p1 !== null &amp;&amp; p2 !== null) {
        if (p1.val &lt; p2.val) {
            current.next = p1;
            p1 = p1.next;
        } else {
            current.next = p2;
            p2 = p2.next;
        }
        current = current.next!;
    }

    current.next = p1 || p2;
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
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        ListNode p1 = list1;
        ListNode p2 = list2;

        while (p1 != null &amp;&amp; p2 != null) {
            if (p1.val &lt; p2.val) {
                current.next = p1;
                p1 = p1.next;
            } else {
                current.next = p2;
                p2 = p2.next;
            }
            current = current.next;
        }

        current.next = (p1 != null) ? p1 : p2;
        return dummy.next;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -&gt; Optional[ListNode]:
        dummy = ListNode(0)
        current = dummy
        p1, p2 = list1, list2

        while p1 and p2:
            if p1.val &lt; p2.val:
                current.next = p1
                p1 = p1.next
            else:
                current.next = p2
                p2 = p2.next
            current = current.next

        current.next = p1 or p2
        return dummy.next
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li>Time Complexity: O(n + m) → traverse all nodes from both lists once</li><li>Space Complexity: O(1) for iterative solution, O(n + m) for recursive solution</li></ul>`,18)]))}const v=t(s,[["render",o]]);export{m as __pageData,v as default};
