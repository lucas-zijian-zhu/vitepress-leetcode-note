import{_ as e,c as t,o as l,ag as i}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"148. Sort List","description":"","frontmatter":{},"headers":[],"relativePath":"linked-list/148.md","filePath":"linked-list/148.md"}'),o={name:"linked-list/148.md"};function r(a,n,s,d,p,u){return l(),t("div",null,n[0]||(n[0]=[i(`<h1 id="_148-sort-list" tabindex="-1"><a href="https://leetcode.com/problems/sort-list/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">148. Sort List</a> <a class="header-anchor" href="#_148-sort-list" aria-label="Permalink to &quot;[148. Sort List](https://leetcode.com/problems/sort-list/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given the <code>head</code> of a linked list, return the list after sorting it in <strong>ascending order</strong> .</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg" style="width:450px;height:194px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [4,2,1,3]
Output: [1,2,3,4]
</code></pre></div><p><strong>Example 2:</strong><img alt="" src="https://assets.leetcode.com/uploads/2020/09/14/sort_list_2.jpg" style="width:550px;height:184px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = []
Output: []
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the list is in the range <code>[0, 5 * 10^4]</code>.</li><li><code>-10^5 &lt;= Node.val &lt;= 10^5</code></li></ul><p><strong>Follow up:</strong> Can you sort the linked list in <code>O(n logn)</code> time and <code>O(1)</code> memory (i.e. constant space)?</p><h2 id="💡-approach-merge-sort-bottom-up" tabindex="-1">💡 Approach: Merge Sort (Bottom-up) <a class="header-anchor" href="#💡-approach-merge-sort-bottom-up" aria-label="Permalink to &quot;💡 Approach: Merge Sort (Bottom-up)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>merge sort</strong> problem for linked lists. Since we need O(n log n) time and O(1) space, we use <strong>bottom-up merge sort</strong> instead of top-down recursion to avoid the O(log n) recursion stack space.</p><p><strong>Key Steps:</strong></p><ol><li><strong>Split</strong> the list into sublists of increasing sizes (1, 2, 4, 8, ...)</li><li><strong>Merge</strong> adjacent sublists in pairs</li><li><strong>Repeat</strong> until the entire list is sorted</li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Start with sublists of size 1</strong> (each node is already sorted)</li><li><strong>Double the size</strong> in each iteration</li><li><strong>Merge pairs</strong> of sorted sublists of current size</li><li><strong>Continue</strong> until size &gt;= total length</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use bottom-up approach to avoid recursion stack</li><li>Merge two sorted linked lists efficiently</li><li>Handle odd lengths and edge cases</li><li>Track the end of merged portion to continue processing</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-bLa0f" id="tab-6GoPMqG" checked><label data-title="Kotlin" for="tab-6GoPMqG">Kotlin</label><input type="radio" name="group-bLa0f" id="tab-nrIm3sT"><label data-title="TypeScript" for="tab-nrIm3sT">TypeScript</label><input type="radio" name="group-bLa0f" id="tab-LmZVvi7"><label data-title="Java" for="tab-LmZVvi7">Java</label><input type="radio" name="group-bLa0f" id="tab-QN7Ul-C"><label data-title="Python" for="tab-QN7Ul-C">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun sortList(head: ListNode?): ListNode? {
        if (head?.next == null) return head
        
        // Count total length
        var length = 0
        var node = head
        while (node != null) {
            length++
            node = node.next
        }
        
        val dummy = ListNode(0).apply { next = head }
        
        var size = 1
        while (size &lt; length) {
            var prev = dummy
            var current = dummy.next
            
            while (current != null) {
                val left = current
                val right = split(left, size)
                current = split(right, size)
                prev.next = merge(left, right)
                
                // Move prev to the end of merged portion
                while (prev.next != null) {
                    prev = prev.next!!
                }
            }
            
            size *= 2
        }
        
        return dummy.next
    }
    
    private fun split(head: ListNode?, n: Int): ListNode? {
        if (head == null) return null
        
        var count = 1
        var current = head
        while (count &lt; n &amp;&amp; current?.next != null) {
            current = current.next
            count++
        }
        
        val next = current?.next
        current?.next = null
        return next
    }
    
    private fun merge(left: ListNode?, right: ListNode?): ListNode? {
        val dummy = ListNode(0)
        var tail = dummy
        
        var l = left
        var r = right
        
        while (l != null &amp;&amp; r != null) {
            if (l.\`val\` &lt;= r.\`val\`) {
                tail.next = l
                l = l.next
            } else {
                tail.next = r
                r = r.next
            }
            tail = tail.next!!
        }
        
        tail.next = l ?: r
        return dummy.next
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function sortList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;
    
    // Count total length
    let length = 0;
    let node = head;
    while (node) {
        length++;
        node = node.next;
    }
    
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let size = 1;
    while (size &lt; length) {
        let prev = dummy;
        let current = dummy.next;
        
        while (current) {
            const left = current;
            const right = split(left, size);
            current = split(right, size);
            prev.next = merge(left, right);
            
            // Move prev to the end of merged portion
            while (prev.next) {
                prev = prev.next;
            }
        }
        
        size *= 2;
    }
    
    return dummy.next;
}

function split(head: ListNode | null, n: number): ListNode | null {
    if (!head) return null;
    
    let count = 1;
    let current = head;
    while (count &lt; n &amp;&amp; current.next) {
        current = current.next;
        count++;
    }
    
    const next = current.next;
    current.next = null;
    return next;
}

function merge(left: ListNode | null, right: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let tail = dummy;
    
    let l = left;
    let r = right;
    
    while (l &amp;&amp; r) {
        if (l.val &lt;= r.val) {
            tail.next = l;
            l = l.next;
        } else {
            tail.next = r;
            r = r.next;
        }
        tail = tail.next!;
    }
    
    tail.next = l || r;
    return dummy.next;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        
        // Count total length
        int length = 0;
        ListNode node = head;
        while (node != null) {
            length++;
            node = node.next;
        }
        
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        
        for (int size = 1; size &lt; length; size *= 2) {
            ListNode prev = dummy;
            ListNode current = dummy.next;
            
            while (current != null) {
                ListNode left = current;
                ListNode right = split(left, size);
                current = split(right, size);
                prev.next = merge(left, right);
                
                // Move prev to the end of merged portion
                while (prev.next != null) {
                    prev = prev.next;
                }
            }
        }
        
        return dummy.next;
    }
    
    private ListNode split(ListNode head, int n) {
        if (head == null) return null;
        
        int count = 1;
        ListNode current = head;
        while (count &lt; n &amp;&amp; current.next != null) {
            current = current.next;
            count++;
        }
        
        ListNode next = current.next;
        current.next = null;
        return next;
    }
    
    private ListNode merge(ListNode left, ListNode right) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        
        while (left != null &amp;&amp; right != null) {
            if (left.val &lt;= right.val) {
                tail.next = left;
                left = left.next;
            } else {
                tail.next = right;
                right = right.next;
            }
            tail = tail.next;
        }
        
        tail.next = (left != null) ? left : right;
        return dummy.next;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def sortList(self, head: Optional[ListNode]) -&gt; Optional[ListNode]:
        if not head or not head.next:
            return head
        
        # Count total length
        length = 0
        node = head
        while node:
            length += 1
            node = node.next
        
        dummy = ListNode(0)
        dummy.next = head
        
        size = 1
        while size &lt; length:
            prev = dummy
            current = dummy.next
            
            while current:
                left = current
                right = self._split(left, size)
                current = self._split(right, size)
                prev.next = self._merge(left, right)
                
                # Move prev to the end of merged portion
                while prev.next:
                    prev = prev.next
            
            size *= 2
        
        return dummy.next
    
    def _split(self, head: Optional[ListNode], n: int) -&gt; Optional[ListNode]:
        if not head:
            return None
        
        count = 1
        current = head
        while count &lt; n and current.next:
            current = current.next
            count += 1
        
        next_head = current.next
        current.next = None
        return next_head
    
    def _merge(self, left: Optional[ListNode], right: Optional[ListNode]) -&gt; Optional[ListNode]:
        dummy = ListNode(0)
        tail = dummy
        
        while left and right:
            if left.val &lt;= right.val:
                tail.next = left
                left = left.next
            else:
                tail.next = right
                right = right.next
            tail = tail.next
        
        tail.next = left or right
        return dummy.next
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n log n) - Merge sort divides the list in half each iteration and merges in linear time</li><li><strong>Space Complexity:</strong> O(1) - We use bottom-up approach to avoid recursion stack, only using constant extra space</li></ul>`,24)]))}const g=e(o,[["render",r]]);export{h as __pageData,g as default};
