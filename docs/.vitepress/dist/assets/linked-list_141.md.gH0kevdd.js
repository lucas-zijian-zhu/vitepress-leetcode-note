import{_ as t,c as a,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"141. Linked List Cycle","description":"","frontmatter":{},"headers":[],"relativePath":"linked-list/141.md","filePath":"linked-list/141.md"}'),s={name:"linked-list/141.md"};function l(i,e,d,c,p,r){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="_141-linked-list-cycle" tabindex="-1"><a href="https://leetcode.com/problems/linked-list-cycle/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">141. Linked List Cycle</a> <a class="header-anchor" href="#_141-linked-list-cycle" aria-label="Permalink to &quot;[141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given <code>head</code>, the head of a linked list, determine if the linked list has a cycle in it.</p><p>There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the<code>next</code>pointer. Internally, <code>pos</code>is used to denote the index of the node thattail&#39;s<code>next</code>pointer is connected to.<strong>Note that<code>pos</code>is not passed as a parameter</strong> .</p><p>Return<code>true</code> if there is a cycle in the linked list. Otherwise, return <code>false</code>.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png" style="width:300px;height:97px;margin-top:8px;margin-bottom:8px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png" style="width:141px;height:74px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
</code></pre></div><p><strong>Example 3:</strong><img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png" style="width:45px;height:45px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of the nodes in the list is in the range <code>[0, 10^4]</code>.</li><li><code>-10^5 &lt;= Node.val &lt;= 10^5</code></li><li><code>pos</code> is <code>-1</code> or a <strong>valid index</strong> in the linked-list.</li></ul><p><strong>Follow up:</strong> Can you solve it using <code>O(1)</code> (i.e. constant) memory?</p><h2 id="approach-1-two-pointers-floyd-s-cycle-detection-🌟" tabindex="-1">Approach 1: Two Pointers (Floyd&#39;s Cycle Detection) 🌟 <a class="header-anchor" href="#approach-1-two-pointers-floyd-s-cycle-detection-🌟" aria-label="Permalink to &quot;Approach 1: Two Pointers (Floyd&#39;s Cycle Detection) 🌟&quot;">​</a></h2><p><strong>Best Solution - O(1) Space</strong></p><p>Use the <strong>fast and slow pointer</strong> technique (also known as <strong>Floyd&#39;s Cycle Detection</strong> or <strong>Tortoise and Hare</strong>):</p><ol><li>Initialize two pointers: <code>slow</code> and <code>fast</code>, both starting at the head.</li><li>Move <code>slow</code> one step at a time and <code>fast</code> two steps at a time.</li><li>If there&#39;s a cycle, <code>fast</code> will eventually catch up to <code>slow</code> (they will meet).</li><li>If <code>fast</code> reaches <code>null</code>, there&#39;s no cycle.</li></ol><p><strong>Why this works:</strong></p><ul><li>If there&#39;s a cycle, the fast pointer will enter the cycle first and start &quot;lapping&quot; the slow pointer.</li><li>Since fast moves twice as fast, the distance between them decreases by 1 in each iteration.</li><li>Eventually, they must meet inside the cycle.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-lBgx4" id="tab-M2qsaQq" checked><label data-title="Kotlin" for="tab-M2qsaQq">Kotlin</label><input type="radio" name="group-lBgx4" id="tab-JNZGmDH"><label data-title="TypeScript" for="tab-JNZGmDH">TypeScript</label><input type="radio" name="group-lBgx4" id="tab-V-kN7nF"><label data-title="Java" for="tab-V-kN7nF">Java</label><input type="radio" name="group-lBgx4" id="tab-5-9NWWl"><label data-title="Python" for="tab-5-9NWWl">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun hasCycle(head: ListNode?): Boolean {
        var slow = head
        var fast = head
        
        while (fast?.next != null) {
            slow = slow?.next        // Move 1 step
            fast = fast.next?.next   // Move 2 steps
            
            if (slow == fast) {
                return true          // Pointers met - cycle detected
            }
        }
        
        return false                 // Fast reached end - no cycle
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head;
    
    while (fast !== null &amp;&amp; fast.next !== null) {
        slow = slow.next;            // Move 1 step
        fast = fast.next.next;       // Move 2 steps
        
        if (slow === fast) {
            return true;             // Pointers met - cycle detected
        }
    }
    
    return false;                    // Fast reached end - no cycle
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast != null &amp;&amp; fast.next != null) {
            slow = slow.next;        // Move 1 step
            fast = fast.next.next;   // Move 2 steps
            
            if (slow == fast) {
                return true;         // Pointers met - cycle detected
            }
        }
        
        return false;                // Fast reached end - no cycle
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def hasCycle(self, head: Optional[ListNode]) -&gt; bool:
        slow = head
        fast = head
        
        while fast and fast.next:
            slow = slow.next         # Move 1 step
            fast = fast.next.next    # Move 2 steps
            
            if slow == fast:
                return True          # Pointers met - cycle detected
        
        return False                 # Fast reached end - no cycle
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n) → In the worst case, we visit each node once</li><li><strong>Space Complexity:</strong> O(1) → Only two pointers used</li></ul><hr><h2 id="approach-2-hashset" tabindex="-1">Approach 2: HashSet <a class="header-anchor" href="#approach-2-hashset" aria-label="Permalink to &quot;Approach 2: HashSet&quot;">​</a></h2><ol><li>Traverse the linked list and store each node in a HashSet.</li><li>If a node is already in the HashSet → the list has a cycle.</li><li>If traversal finishes without repeats → no cycle.</li></ol><h2 id="code-1" tabindex="-1">Code <a class="header-anchor" href="#code-1" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-w-v4M" id="tab-sxrA2AI" checked><label data-title="Kotlin" for="tab-sxrA2AI">Kotlin</label><input type="radio" name="group-w-v4M" id="tab-z2VHs6p"><label data-title="TypeScript" for="tab-z2VHs6p">TypeScript</label><input type="radio" name="group-w-v4M" id="tab-jGuMfb6"><label data-title="Java" for="tab-jGuMfb6">Java</label><input type="radio" name="group-w-v4M" id="tab-4mQZ7aT"><label data-title="Python" for="tab-4mQZ7aT">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun hasCycle(head: ListNode?): Boolean {
        val seen = HashSet&lt;ListNode&gt;()
        var node = head
        while (node != null) {
            if (!seen.add(node)) {
                return true
            }
            node = node.next
        }
        return false
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    hasCycle(head: ListNode | null): boolean {
        const seen = new Set&lt;ListNode&gt;();
        let node = head;
        while (node !== null) {
            if (seen.has(node)) {
                return true;
            }
            seen.add(node);
            node = node.next;
        }
        return false;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean hasCycle(ListNode head) {
        Set&lt;ListNode&gt; seen = new HashSet&lt;&gt;();
        ListNode node = head;
        while (node != null) {
            if (!seen.add(node)) {
                return true;
            }
            node = node.next;
        }
        return false;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def hasCycle(self, head: Optional[ListNode]) -&gt; bool:
        seen = set()
        node = head
        while node:
            if node in seen:
                return True
            seen.add(node)
            node = node.next
        return False
</code></pre></div></div></div><h2 id="complexity-1" tabindex="-1">Complexity <a class="header-anchor" href="#complexity-1" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n) → Traverse each node at most once</li><li><strong>Space Complexity:</strong> O(n) → Store up to n nodes in the HashSet</li></ul>`,30)]))}const y=t(s,[["render",l]]);export{u as __pageData,y as default};
