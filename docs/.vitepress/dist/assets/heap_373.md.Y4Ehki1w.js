import{_ as a,C as i,c as s,o as l,j as t,ag as o,G as r,a as p}from"./chunks/framework.Bw-5EFTY.js";const v=JSON.parse('{"title":"373. Find K Pairs with Smallest Sums","description":"","frontmatter":{},"headers":[],"relativePath":"heap/373.md","filePath":"heap/373.md"}'),u={name:"heap/373.md"},d={id:"_373-find-k-pairs-with-smallest-sums",tabindex:"-1"};function c(m,e,h,g,f,b){const n=i("Badge");return l(),s("div",null,[t("h1",d,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/find-k-pairs-with-smallest-sums/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"373. Find K Pairs with Smallest Sums",-1)),r(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=p()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_373-find-k-pairs-with-smallest-sums","aria-label":'Permalink to "[373. Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=o(`<p>You are given two integer arrays <code>nums1</code> and <code>nums2</code> sorted in <strong>non-decreasingorder</strong> and an integer <code>k</code>.</p><p>Define a pair <code>(u, v)</code> which consists of one element from the first array and one element from the second array.</p><p>Return the <code>k</code> pairs <code>(u<sub>1</sub>, v<sub>1</sub>), (u<sub>2</sub>, v<sub>2</sub>), ..., (u<sub>k</sub>, v<sub>k</sub>)</code> with the smallest sums.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [[1,1],[1,1]]
Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums1.length, nums2.length &lt;= 10^5</code></li><li><code>-10^9 &lt;= nums1[i], nums2[i] &lt;= 10^9</code></li><li><code>nums1</code> and <code>nums2</code> both are sorted in <strong>non-decreasing order</strong> .</li><li><code>1 &lt;= k &lt;= 10^4</code></li><li><code>k &lt;=nums1.length *nums2.length</code></li></ul><h2 id="💡-approach-min-heap-priority-queue" tabindex="-1">💡 Approach: Min Heap (Priority Queue) <a class="header-anchor" href="#💡-approach-min-heap-priority-queue" aria-label="Permalink to &quot;💡 Approach: Min Heap (Priority Queue)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>Since both arrays are sorted, we can use a <strong>min heap</strong> to efficiently find the k pairs with smallest sums. The key insight is to process pairs incrementally:</p><ol><li>Start with pairs of <code>nums1[0]</code> with all elements of <code>nums2</code></li><li>Use a min heap to always get the pair with the smallest sum</li><li>When we extract a pair <code>(i, j)</code>, add the next potential pair <code>(i+1, j)</code> to the heap</li><li>Repeat k times</li></ol><p><strong>Key Insight:</strong></p><ul><li>We don&#39;t need to generate all pairs upfront (would be O(m*n))</li><li>Instead, we generate pairs on-demand using a heap</li><li>This reduces time complexity significantly</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Initialize a min heap</strong> with pairs <code>(sum, i, j)</code> where <code>i</code> is index in <code>nums1</code> and <code>j</code> is index in <code>nums2</code></li><li><strong>Start with all pairs</strong> of <code>nums1[0]</code> with elements from <code>nums2</code>: <code>(nums1[0] + nums2[j], 0, j)</code> for all <code>j</code></li><li><strong>Extract k times:</strong><ul><li>Pop the smallest sum pair from heap</li><li>Add to result</li><li>If <code>i+1 &lt; nums1.length</code>, push <code>(nums1[i+1] + nums2[j], i+1, j)</code> to heap</li></ul></li><li><strong>Return the result</strong></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use min heap to always get the smallest sum pair</li><li>Only process pairs incrementally, not all at once</li><li>Avoid duplicates by tracking indices carefully</li><li>Time complexity: O(k log k) if k is small compared to m*n</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-gkFIc" id="tab-Disw5OE" checked><label data-title="Kotlin" for="tab-Disw5OE">Kotlin</label><input type="radio" name="group-gkFIc" id="tab-y39CQg1"><label data-title="TypeScript" for="tab-y39CQg1">TypeScript</label><input type="radio" name="group-gkFIc" id="tab-XTPo40Y"><label data-title="Java" for="tab-XTPo40Y">Java</label><input type="radio" name="group-gkFIc" id="tab-HxWOadX"><label data-title="Python" for="tab-HxWOadX">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">import java.util.PriorityQueue

class Solution {
    fun kSmallestPairs(nums1: IntArray, nums2: IntArray, k: Int): List&lt;List&lt;Int&gt;&gt; {
        val result = mutableListOf&lt;List&lt;Int&gt;&gt;()
        val heap = PriorityQueue&lt;IntArray&gt; { a, b -&gt; a[0] - b[0] }
        
        // Initialize: add all pairs with nums1[0]
        for (j in nums2.indices) {
            heap.offer(intArrayOf(nums1[0] + nums2[j], 0, j))
        }
        
        // Extract k smallest pairs
        repeat(k) {
            if (heap.isEmpty()) return@repeat
            
            val current = heap.poll()
            val i = current[1]
            val j = current[2]
            
            result.add(listOf(nums1[i], nums2[j]))
            
            // Add next pair from nums1 if available
            if (i + 1 &lt; nums1.size) {
                heap.offer(intArrayOf(nums1[i + 1] + nums2[j], i + 1, j))
            }
        }
        
        return result
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
    const result: number[][] = [];
    const heap = new MinPriorityQueue({ priority: (pair: [number, number, number]) =&gt; pair[0] });
    
    // Initialize: add all pairs with nums1[0]
    for (let j = 0; j &lt; nums2.length; j++) {
        heap.enqueue([nums1[0] + nums2[j], 0, j]);
    }
    
    // Extract k smallest pairs
    for (let count = 0; count &lt; k &amp;&amp; !heap.isEmpty(); count++) {
        const [sum, i, j] = heap.dequeue().element;
        result.push([nums1[i], nums2[j]]);
        
        // Add next pair from nums1 if available
        if (i + 1 &lt; nums1.length) {
            heap.enqueue([nums1[i + 1] + nums2[j], i + 1, j]);
        }
    }
    
    return result;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">import java.util.*;

class Solution {
    public List&lt;List&lt;Integer&gt;&gt; kSmallestPairs(int[] nums1, int[] nums2, int k) {
        List&lt;List&lt;Integer&gt;&gt; result = new ArrayList&lt;&gt;();
        PriorityQueue&lt;int[]&gt; heap = new PriorityQueue&lt;&gt;((a, b) -&gt; a[0] - b[0]);
        
        // Initialize: add all pairs with nums1[0]
        for (int j = 0; j &lt; nums2.length; j++) {
            heap.offer(new int[]{nums1[0] + nums2[j], 0, j});
        }
        
        // Extract k smallest pairs
        for (int count = 0; count &lt; k &amp;&amp; !heap.isEmpty(); count++) {
            int[] current = heap.poll();
            int i = current[1];
            int j = current[2];
            
            result.add(Arrays.asList(nums1[i], nums2[j]));
            
            // Add next pair from nums1 if available
            if (i + 1 &lt; nums1.length) {
                heap.offer(new int[]{nums1[i + 1] + nums2[j], i + 1, j});
            }
        }
        
        return result;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">import heapq

class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -&gt; List[List[int]]:
        result = []
        heap = []
        
        # Initialize: add all pairs with nums1[0]
        for j in range(len(nums2)):
            heapq.heappush(heap, (nums1[0] + nums2[j], 0, j))
        
        # Extract k smallest pairs
        for _ in range(k):
            if not heap:
                break
            
            sum_val, i, j = heapq.heappop(heap)
            result.append([nums1[i], nums2[j]])
            
            # Add next pair from nums1 if available
            if i + 1 &lt; len(nums1):
                heapq.heappush(heap, (nums1[i + 1] + nums2[j], i + 1, j))
        
        return result
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(k log k), where k is the number of pairs we need and k ≤ m*n. We process k pairs, each heap operation is O(log k).</li><li><strong>Space Complexity:</strong> O(k), for the heap storing at most k elements</li></ul>`,23))])}const k=a(u,[["render",c]]);export{v as __pageData,k as default};
