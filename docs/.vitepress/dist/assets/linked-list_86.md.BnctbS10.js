import{_ as e,c as n,o as l,ag as i}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"86. Partition List","description":"","frontmatter":{},"headers":[],"relativePath":"linked-list/86.md","filePath":"linked-list/86.md"}'),a={name:"linked-list/86.md"};function o(s,t,r,d,c,p){return l(),n("div",null,t[0]||(t[0]=[i(`<h1 id="_86-partition-list" tabindex="-1"><a href="https://leetcode.com/problems/partition-list/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">86. Partition List</a> <a class="header-anchor" href="#_86-partition-list" aria-label="Permalink to &quot;[86. Partition List](https://leetcode.com/problems/partition-list/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given the <code>head</code> of a linked list and a value <code>x</code>, partition it such that all nodes <strong>less than</strong> <code>x</code> come before nodes <strong>greater than or equal</strong> to <code>x</code>.</p><p>You should <strong>preserve</strong> the original relative order of the nodes in each of the two partitions.</p><p><strong>Example 1:</strong><img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/partition.jpg" style="width:662px;height:222px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: head = [2,1], x = 2
Output: [1,2]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The number of nodes in the list is in the range <code>[0, 200]</code>.</li><li><code>-100 &lt;= Node.val &lt;= 100</code></li><li><code>-200 &lt;= x &lt;= 200</code></li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>The key insight is to maintain <strong>two separate linked lists</strong>:</p><ol><li><strong>Left list</strong>: nodes with values less than <code>x</code></li><li><strong>Right list</strong>: nodes with values greater than or equal to <code>x</code></li></ol><p><strong>Algorithm:</strong></p><ol><li>Create two dummy heads for the left and right lists</li><li>Traverse the original list and partition nodes into left and right lists</li><li>Connect the left list to the right list</li><li>Set the end of the right list to null to avoid cycles</li><li>Return the head of the left list</li></ol><p>This approach preserves the original relative order within each partition.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-bmIru" id="tab-oEQ1T7X" checked><label data-title="Kotlin" for="tab-oEQ1T7X">Kotlin</label><input type="radio" name="group-bmIru" id="tab-N44WPH-"><label data-title="TypeScript" for="tab-N44WPH-">TypeScript</label><input type="radio" name="group-bmIru" id="tab-8JwoW-N"><label data-title="Java" for="tab-8JwoW-N">Java</label><input type="radio" name="group-bmIru" id="tab-p5iHoXj"><label data-title="Python" for="tab-p5iHoXj">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class ListNode(var \`val\`: Int) {
    var next: ListNode? = null
}

fun partition(head: ListNode?, x: Int): ListNode? {
    val leftDummy = ListNode(0)
    val rightDummy = ListNode(0)
    var left = leftDummy
    var right = rightDummy
    var current = head

    while (current != null) {
        if (current.\`val\` &lt; x) {
            left.next = current
            left = left.next!!
        } else {
            right.next = current
            right = right.next!!
        }
        current = current.next
    }

    // Connect left list to right list
    left.next = rightDummy.next
    // Set the end of right list to null
    right.next = null

    return leftDummy.next
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function partition(head: ListNode | null, x: number): ListNode | null {
    const leftDummy = new ListNode(0);
    const rightDummy = new ListNode(0);
    let left = leftDummy;
    let right = rightDummy;
    let current = head;

    while (current !== null) {
        if (current.val &lt; x) {
            left.next = current;
            left = left.next!;
        } else {
            right.next = current;
            right = right.next!;
        }
        current = current.next;
    }

    // Connect left list to right list
    left.next = rightDummy.next;
    // Set the end of right list to null
    right.next = null;

    return leftDummy.next;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">public class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode leftDummy = new ListNode(0);
        ListNode rightDummy = new ListNode(0);
        ListNode left = leftDummy;
        ListNode right = rightDummy;
        ListNode current = head;

        while (current != null) {
            if (current.val &lt; x) {
                left.next = current;
                left = left.next;
            } else {
                right.next = current;
                right = right.next;
            }
            current = current.next;
        }

        // Connect left list to right list
        left.next = rightDummy.next;
        // Set the end of right list to null
        right.next = null;

        return leftDummy.next;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def partition(self, head: Optional[ListNode], x: int) -&gt; Optional[ListNode]:
        left_dummy = ListNode(0)
        right_dummy = ListNode(0)
        left = left_dummy
        right = right_dummy
        current = head

        while current:
            if current.val &lt; x:
                left.next = current
                left = left.next
            else:
                right.next = current
                right = right.next
            current = current.next

        # Connect left list to right list
        left.next = right_dummy.next
        # Set the end of right list to None
        right.next = None

        return left_dummy.next
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the number of nodes in the linked list. We traverse the list once.</li><li><strong>Space Complexity:</strong> O(1), we only use a constant amount of extra space for the dummy nodes and pointers.</li></ul>`,19)]))}const g=e(a,[["render",o]]);export{h as __pageData,g as default};
