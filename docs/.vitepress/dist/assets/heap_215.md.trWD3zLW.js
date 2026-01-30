import{_ as i,C as a,c as o,o as s,j as t,ag as l,G as r,a as p}from"./chunks/framework.Bw-5EFTY.js";const b=JSON.parse('{"title":"215. Kth Largest Element in an Array","description":"","frontmatter":{},"headers":[],"relativePath":"heap/215.md","filePath":"heap/215.md"}'),u={name:"heap/215.md"},c={id:"_215-kth-largest-element-in-an-array",tabindex:"-1"};function m(d,e,h,g,v,f){const n=a("Badge");return s(),o("div",null,[t("h1",c,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/kth-largest-element-in-an-array/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"215. Kth Largest Element in an Array",-1)),r(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=p()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_215-kth-largest-element-in-an-array","aria-label":'Permalink to "[215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=l(`<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k^th</code> largest element in the array.</p><p>Note that it is the <code>k^th</code> largest element in the sorted order, not the <code>k^th</code> distinct element.</p><p>Can you solve it without sorting?</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= k &lt;= nums.length &lt;= 10^5</code></li><li><code>-10^4 &lt;= nums[i] &lt;= 10^4</code></li></ul><h2 id="🚀-approach-min-heap-priority-queue" tabindex="-1">🚀 Approach: Min Heap (Priority Queue) <a class="header-anchor" href="#🚀-approach-min-heap-priority-queue" aria-label="Permalink to &quot;🚀 Approach: Min Heap (Priority Queue)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This problem can be solved efficiently using a <strong>Min Heap</strong> (Priority Queue). The key insight is to maintain a heap of size <code>k</code> that contains the k largest elements seen so far.</p><p><strong>Key Insight:</strong></p><ul><li>Use a min heap of size <code>k</code></li><li>The root of the heap will always be the kth largest element</li><li>When heap size &gt; k, remove the smallest element</li><li>After processing all elements, the root contains the kth largest element</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Create a min heap</strong> with capacity <code>k</code></li><li><strong>Iterate through the array</strong>: <ul><li>Add current element to heap</li><li>If heap size &gt; k, remove the minimum element</li></ul></li><li><strong>Return the root</strong> of the heap (kth largest element)</li></ol><p><strong>Alternative Approach - Quick Select:</strong></p><ul><li>Uses partitioning logic from Quick Sort</li><li>Average O(n) time complexity, but O(n²) worst case</li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><h3 id="method-1-min-heap-recommended" tabindex="-1">Method 1: Min Heap (Recommended) <a class="header-anchor" href="#method-1-min-heap-recommended" aria-label="Permalink to &quot;Method 1: Min Heap (Recommended)&quot;">​</a></h3><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-kri6t" id="tab-PEzu9uE" checked><label data-title="Kotlin" for="tab-PEzu9uE">Kotlin</label><input type="radio" name="group-kri6t" id="tab--i7lo1O"><label data-title="TypeScript" for="tab--i7lo1O">TypeScript</label><input type="radio" name="group-kri6t" id="tab-DKiBc9Y"><label data-title="Java" for="tab-DKiBc9Y">Java</label><input type="radio" name="group-kri6t" id="tab-qSGGkPZ"><label data-title="Python" for="tab-qSGGkPZ">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">import java.util.PriorityQueue

class Solution {
    fun findKthLargest(nums: IntArray, k: Int): Int {
        val minHeap = PriorityQueue&lt;Int&gt;()
        
        for (num in nums) {
            minHeap.offer(num)
            if (minHeap.size &gt; k) {
                minHeap.poll() // Remove the smallest element
            }
        }
        
        return minHeap.peek() // The root is the kth largest
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function findKthLargest(nums: number[], k: number): number {
    const minHeap = new MinPriorityQueue();
    
    for (const num of nums) {
        minHeap.enqueue(num);
        if (minHeap.size() &gt; k) {
            minHeap.dequeue(); // Remove the smallest element
        }
    }
    
    return minHeap.front().element; // The root is the kth largest
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">import java.util.PriorityQueue;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue&lt;Integer&gt; minHeap = new PriorityQueue&lt;&gt;();
        
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() &gt; k) {
                minHeap.poll(); // Remove the smallest element
            }
        }
        
        return minHeap.peek(); // The root is the kth largest
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">import heapq

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -&gt; int:
        min_heap = []
        
        for num in nums:
            heapq.heappush(min_heap, num)
            if len(min_heap) &gt; k:
                heapq.heappop(min_heap)  # Remove the smallest element
        
        return min_heap[0]  # The root is the kth largest
</code></pre></div></div></div><h3 id="method-2-quick-select-alternative" tabindex="-1">Method 2: Quick Select (Alternative) <a class="header-anchor" href="#method-2-quick-select-alternative" aria-label="Permalink to &quot;Method 2: Quick Select (Alternative)&quot;">​</a></h3><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-ouIjG" id="tab-oOcYgmq" checked><label data-title="Kotlin" for="tab-oOcYgmq">Kotlin</label><input type="radio" name="group-ouIjG" id="tab-2sP18dL"><label data-title="TypeScript" for="tab-2sP18dL">TypeScript</label><input type="radio" name="group-ouIjG" id="tab-7ibcqAv"><label data-title="Java" for="tab-7ibcqAv">Java</label><input type="radio" name="group-ouIjG" id="tab-KsqmRq-"><label data-title="Python" for="tab-KsqmRq-">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun findKthLargest(nums: IntArray, k: Int): Int {
        return quickSelect(nums, 0, nums.size - 1, k)
    }
    
    private fun quickSelect(nums: IntArray, left: Int, right: Int, k: Int): Int {
        if (left == right) return nums[left]
        
        val pivotIndex = partition(nums, left, right)
        
        return when {
            pivotIndex == k - 1 -&gt; nums[pivotIndex]
            pivotIndex &lt; k - 1 -&gt; quickSelect(nums, pivotIndex + 1, right, k)
            else -&gt; quickSelect(nums, left, pivotIndex - 1, k)
        }
    }
    
    private fun partition(nums: IntArray, left: Int, right: Int): Int {
        val pivot = nums[right]
        var i = left
        
        for (j in left until right) {
            if (nums[j] &gt;= pivot) {
                swap(nums, i, j)
                i++
            }
        }
        swap(nums, i, right)
        return i
    }
    
    private fun swap(nums: IntArray, i: Int, j: Int) {
        val temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function findKthLargest(nums: number[], k: number): number {
    return quickSelect(nums, 0, nums.length - 1, k);
}

function quickSelect(nums: number[], left: number, right: number, k: number): number {
    if (left === right) return nums[left];
    
    const pivotIndex = partition(nums, left, right);
    
    if (pivotIndex === k - 1) {
        return nums[pivotIndex];
    } else if (pivotIndex &lt; k - 1) {
        return quickSelect(nums, pivotIndex + 1, right, k);
    } else {
        return quickSelect(nums, left, pivotIndex - 1, k);
    }
}

function partition(nums: number[], left: number, right: number): number {
    const pivot = nums[right];
    let i = left;
    
    for (let j = left; j &lt; right; j++) {
        if (nums[j] &gt;= pivot) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
        }
    }
    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int findKthLargest(int[] nums, int k) {
        return quickSelect(nums, 0, nums.length - 1, k);
    }
    
    private int quickSelect(int[] nums, int left, int right, int k) {
        if (left == right) return nums[left];
        
        int pivotIndex = partition(nums, left, right);
        
        if (pivotIndex == k - 1) {
            return nums[pivotIndex];
        } else if (pivotIndex &lt; k - 1) {
            return quickSelect(nums, pivotIndex + 1, right, k);
        } else {
            return quickSelect(nums, left, pivotIndex - 1, k);
        }
    }
    
    private int partition(int[] nums, int left, int right) {
        int pivot = nums[right];
        int i = left;
        
        for (int j = left; j &lt; right; j++) {
            if (nums[j] &gt;= pivot) {
                swap(nums, i, j);
                i++;
            }
        }
        swap(nums, i, right);
        return i;
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def findKthLargest(self, nums: List[int], k: int) -&gt; int:
        return self.quick_select(nums, 0, len(nums) - 1, k)
    
    def quick_select(self, nums: List[int], left: int, right: int, k: int) -&gt; int:
        if left == right:
            return nums[left]
        
        pivot_index = self.partition(nums, left, right)
        
        if pivot_index == k - 1:
            return nums[pivot_index]
        elif pivot_index &lt; k - 1:
            return self.quick_select(nums, pivot_index + 1, right, k)
        else:
            return self.quick_select(nums, left, pivot_index - 1, k)
    
    def partition(self, nums: List[int], left: int, right: int) -&gt; int:
        pivot = nums[right]
        i = left
        
        for j in range(left, right):
            if nums[j] &gt;= pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
        
        nums[i], nums[right] = nums[right], nums[i]
        return i
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><h3 id="method-1-min-heap" tabindex="-1">Method 1: Min Heap <a class="header-anchor" href="#method-1-min-heap" aria-label="Permalink to &quot;Method 1: Min Heap&quot;">​</a></h3><ul><li><strong>Time Complexity:</strong> O(n log k), where n is the array size and k is the kth largest position</li><li><strong>Space Complexity:</strong> O(k) for the heap</li></ul><h3 id="method-2-quick-select" tabindex="-1">Method 2: Quick Select <a class="header-anchor" href="#method-2-quick-select" aria-label="Permalink to &quot;Method 2: Quick Select&quot;">​</a></h3><ul><li><strong>Time Complexity:</strong> O(n) average case, O(n²) worst case</li><li><strong>Space Complexity:</strong> O(log n) for the recursion stack in average case, O(n) in worst case</li></ul>`,29))])}const y=i(u,[["render",m]]);export{b as __pageData,y as default};
