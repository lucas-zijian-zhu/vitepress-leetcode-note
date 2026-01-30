import{_ as e,c as n,o as s,ag as i}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"23. Merge k Sorted Lists","description":"","frontmatter":{},"headers":[],"relativePath":"linked-list/23.md","filePath":"linked-list/23.md"}'),l={name:"linked-list/23.md"};function a(r,t,o,d,p,g){return s(),n("div",null,t[0]||(t[0]=[i(`<h1 id="_23-merge-k-sorted-lists" tabindex="-1"><a href="https://leetcode.com/problems/merge-k-sorted-lists/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">23. Merge k Sorted Lists</a> <a class="header-anchor" href="#_23-merge-k-sorted-lists" aria-label="Permalink to &quot;[23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given an array of <code>k</code> linked-lists <code>lists</code>, each linked-list is sorted in ascending order.</p><p>Merge all the linked-lists into one sorted linked-list and return it.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1-&gt;4-&gt;5,
  1-&gt;3-&gt;4,
  2-&gt;6
]
merging them into one sorted linked list:
1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: lists = []
Output: []
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: lists = [[]]
Output: []
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>k == lists.length</code></li><li><code>0 &lt;= k &lt;= 10^4</code></li><li><code>0 &lt;= lists[i].length &lt;= 500</code></li><li><code>-10^4 &lt;= lists[i][j] &lt;= 10^4</code></li><li><code>lists[i]</code> is sorted in <strong>ascending order</strong> .</li><li>The sum of <code>lists[i].length</code> will not exceed <code>10^4</code>.</li></ul><h2 id="💡-approach-divide-and-conquer-recommended" tabindex="-1">💡 Approach: Divide and Conquer (Recommended) <a class="header-anchor" href="#💡-approach-divide-and-conquer-recommended" aria-label="Permalink to &quot;💡 Approach: Divide and Conquer (Recommended)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>We need to merge k sorted linked lists efficiently. The simplest approach would be to merge them one by one, but that&#39;s inefficient with O(N × k) time complexity.</p><p><strong>Better approach</strong>: Use <strong>divide and conquer</strong> to merge pairs of lists recursively, reducing the time complexity to O(N log k).</p><h3 id="strategy" tabindex="-1">Strategy <a class="header-anchor" href="#strategy" aria-label="Permalink to &quot;Strategy&quot;">​</a></h3><p>Think of this as building a <strong>merge tree</strong>:</p><ul><li><strong>Level 1</strong>: Merge pairs of original lists → k/2 merged lists</li><li><strong>Level 2</strong>: Merge pairs of level-1 results → k/4 merged lists</li><li><strong>Level 3</strong>: Continue until only 1 final merged list remains</li></ul><h3 id="algorithm-steps" tabindex="-1">Algorithm Steps <a class="header-anchor" href="#algorithm-steps" aria-label="Permalink to &quot;Algorithm Steps&quot;">​</a></h3><ol><li><strong>Base case</strong>: If 0 or 1 lists, return immediately</li><li><strong>Divide</strong>: Split the k lists into two halves</li><li><strong>Conquer</strong>: Recursively merge each half</li><li><strong>Combine</strong>: Merge the two results using standard &quot;merge two sorted lists&quot;</li></ol><p>This is essentially the same pattern as <strong>merge sort</strong> but working with linked list references instead of array indices.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Kal3N" id="tab-PEAU4pH" checked><label data-title="Kotlin" for="tab-PEAU4pH">Kotlin</label><input type="radio" name="group-Kal3N" id="tab-4uUGNLn"><label data-title="TypeScript" for="tab-4uUGNLn">TypeScript</label><input type="radio" name="group-Kal3N" id="tab-j3Ff5CA"><label data-title="Java" for="tab-j3Ff5CA">Java</label><input type="radio" name="group-Kal3N" id="tab-yQtXUpc"><label data-title="Python" for="tab-yQtXUpc">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun mergeKLists(lists: Array&lt;ListNode?&gt;): ListNode? {
        if (lists.isEmpty()) return null
        return mergeKLists(lists, 0, lists.size - 1)
    }
    
    // Recursively merge lists from start to end index
    private fun mergeKLists(lists: Array&lt;ListNode?&gt;, start: Int, end: Int): ListNode? {
        // Base case: single list
        if (start == end) return lists[start]
        if (start &gt; end) return null
        
        // Divide: split into two halves
        val mid = (start + end) / 2
        val left = mergeKLists(lists, start, mid)
        val right = mergeKLists(lists, mid + 1, end)
        
        // Conquer: merge the two results
        return mergeTwoLists(left, right)
    }
    
    // Helper: merge two sorted linked lists
    private fun mergeTwoLists(list1: ListNode?, list2: ListNode?): ListNode? {
        val dummy = ListNode(0)
        var tail = dummy
        var l1 = list1
        var l2 = list2
        
        // Compare and merge nodes
        while (l1 != null &amp;&amp; l2 != null) {
            if (l1.\`val\` &lt;= l2.\`val\`) {
                tail.next = l1
                l1 = l1.next
            } else {
                tail.next = l2
                l2 = l2.next
            }
            tail = tail.next!!
        }
        
        // Attach remaining nodes
        tail.next = l1 ?: l2
        return dummy.next
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function mergeKLists(lists: Array&lt;ListNode | null&gt;): ListNode | null {
    if (lists.length === 0) return null;
    
    return mergeKListsHelper(lists, 0, lists.length - 1);
}

function mergeKListsHelper(lists: Array&lt;ListNode | null&gt;, start: number, end: number): ListNode | null {
    // Base case: single list
    if (start === end) return lists[start];
    if (start &gt; end) return null;
    
    // Divide: split into two halves
    const mid = Math.floor((start + end) / 2);
    const left = mergeKListsHelper(lists, start, mid);
    const right = mergeKListsHelper(lists, mid + 1, end);
    
    // Combine: merge the two results
    return mergeTwoLists(left, right);
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let tail = dummy;
    let l1 = list1;
    let l2 = list2;
    
    // Compare and merge nodes
    while (l1 &amp;&amp; l2) {
        if (l1.val &lt;= l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next!;
    }
    
    // Attach remaining nodes
    tail.next = l1 || l2;
    return dummy.next;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists.length == 0) return null;
        return mergeKLists(lists, 0, lists.length - 1);
    }
    
    // Recursively merge lists from start to end index
    private ListNode mergeKLists(ListNode[] lists, int start, int end) {
        // Base case: single list
        if (start == end) return lists[start];
        if (start &gt; end) return null;
        
        // Divide: split into two halves
        int mid = (start + end) / 2;
        ListNode left = mergeKLists(lists, start, mid);
        ListNode right = mergeKLists(lists, mid + 1, end);
        
        // Combine: merge the two results
        return mergeTwoLists(left, right);
    }
    
    // Helper: merge two sorted linked lists
    private ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        
        // Compare and merge nodes
        while (list1 != null &amp;&amp; list2 != null) {
            if (list1.val &lt;= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        
        // Attach remaining nodes
        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -&gt; Optional[ListNode]:
        if not lists:
            return None
        
        return self._mergeKLists(lists, 0, len(lists) - 1)
    
    # Recursively merge lists from start to end index
    def _mergeKLists(self, lists: List[Optional[ListNode]], start: int, end: int) -&gt; Optional[ListNode]:
        # Base case: single list
        if start == end:
            return lists[start]
        if start &gt; end:
            return None
        
        # Divide: split into two halves
        mid = (start + end) // 2
        left = self._mergeKLists(lists, start, mid)
        right = self._mergeKLists(lists, mid + 1, end)
        
        # Combine: merge the two results
        return self._mergeTwoLists(left, right)
    
    # Helper: merge two sorted linked lists
    def _mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -&gt; Optional[ListNode]:
        dummy = ListNode(0)
        tail = dummy
        
        # Compare and merge nodes
        while list1 and list2:
            if list1.val &lt;= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        
        # Attach remaining nodes
        tail.next = list1 or list2
        return dummy.next
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(N log k) where N is the total number of nodes across all lists, and k is the number of linked lists</li><li><strong>Space Complexity:</strong> O(log k) for the recursion stack</li></ul>`,25)]))}const u=e(l,[["render",a]]);export{m as __pageData,u as default};
