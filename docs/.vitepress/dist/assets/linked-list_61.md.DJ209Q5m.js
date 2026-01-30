import{_ as t,c as n,o as a,ag as l}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"61. Rotate List","description":"","frontmatter":{},"headers":[],"relativePath":"linked-list/61.md","filePath":"linked-list/61.md"}'),i={name:"linked-list/61.md"};function o(s,e,d,r,c,h){return a(),n("div",null,e[0]||(e[0]=[l(`<h1 id="_61-rotate-list" tabindex="-1"><a href="https://leetcode.com/problems/rotate-list/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">61. Rotate List</a> <a class="header-anchor" href="#_61-rotate-list" aria-label="Permalink to &quot;[61. Rotate List](https://leetcode.com/problems/rotate-list/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given the <code>head</code> of a linkedlist, rotate the list to the right by <code>k</code> places.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/rotate1.jpg" style="width:450px;height:191px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/roate2.jpg" style="width:305px;height:350px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [0,1,2], k = 4
Output: [2,0,1]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the list is in the range <code>[0, 500]</code>.</li><li><code>-100 &lt;= Node.val &lt;= 100</code></li><li><code>0 &lt;= k &lt;= 2 * 10^9</code></li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><ol><li><strong>Handle edge cases</strong>: If the list is empty or has only one node, return it as is.</li><li><strong>Calculate effective rotation</strong>: Since rotating by the list length results in the same list, we only need to rotate by <code>k % length</code>.</li><li><strong>Find the new tail</strong>: The new tail will be at position <code>length - k - 1</code> from the beginning.</li><li><strong>Perform rotation</strong>: <ul><li>Find the current tail and make it point to the original head</li><li>Set the new head to be the node after the new tail</li><li>Set the new tail&#39;s next to null</li></ul></li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-LMffQ" id="tab-Xtl4Cew" checked><label data-title="Kotlin" for="tab-Xtl4Cew">Kotlin</label><input type="radio" name="group-LMffQ" id="tab-icfncO_"><label data-title="TypeScript" for="tab-icfncO_">TypeScript</label><input type="radio" name="group-LMffQ" id="tab-z9CMr-a"><label data-title="Java" for="tab-z9CMr-a">Java</label><input type="radio" name="group-LMffQ" id="tab-AcrN_KH"><label data-title="Python" for="tab-AcrN_KH">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class ListNode(var \`val\`: Int) {
    var next: ListNode? = null
}

fun rotateRight(head: ListNode?, k: Int): ListNode? {
    if (head == null || head.next == null) return head
    
    // Calculate the length of the list
    var length = 1
    var tail = head
    while (tail?.next != null) {
        tail = tail.next
        length++
    }
    
    // Calculate effective rotation
    val effectiveK = k % length
    if (effectiveK == 0) return head
    
    // Find the new tail (length - effectiveK - 1 steps from head)
    var newTail = head
    repeat(length - effectiveK - 1) {
        newTail = newTail?.next
    }
    
    // Perform rotation
    val newHead = newTail?.next
    newTail?.next = null
    tail?.next = head
    
    return newHead
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head || !head.next) return head;
    
    // Calculate the length of the list
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    // Calculate effective rotation
    const effectiveK = k % length;
    if (effectiveK === 0) return head;
    
    // Find the new tail (length - effectiveK - 1 steps from head)
    let newTail = head;
    for (let i = 0; i &lt; length - effectiveK - 1; i++) {
        newTail = newTail!.next;
    }
    
    // Perform rotation
    const newHead = newTail!.next;
    newTail!.next = null;
    tail.next = head;
    
    return newHead;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">public class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null) return head;
        
        // Calculate the length of the list
        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }
        
        // Calculate effective rotation
        int effectiveK = k % length;
        if (effectiveK == 0) return head;
        
        // Find the new tail (length - effectiveK - 1 steps from head)
        ListNode newTail = head;
        for (int i = 0; i &lt; length - effectiveK - 1; i++) {
            newTail = newTail.next;
        }
        
        // Perform rotation
        ListNode newHead = newTail.next;
        newTail.next = null;
        tail.next = head;
        
        return newHead;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -&gt; Optional[ListNode]:
        if not head or not head.next:
            return head
        
        # Calculate the length of the list
        length = 1
        tail = head
        while tail.next:
            tail = tail.next
            length += 1
        
        # Calculate effective rotation
        effective_k = k % length
        if effective_k == 0:
            return head
        
        # Find the new tail (length - effective_k - 1 steps from head)
        new_tail = head
        for _ in range(length - effective_k - 1):
            new_tail = new_tail.next
        
        # Perform rotation
        new_head = new_tail.next
        new_tail.next = None
        tail.next = head
        
        return new_head
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the length of the linked list. We traverse the list twice: once to find the length and once to find the new tail.</li><li><strong>Space Complexity:</strong> O(1), we only use a constant amount of extra space.</li></ul>`,14)]))}const f=t(i,[["render",o]]);export{u as __pageData,f as default};
