import{_ as n,C as i,c as o,o as r,j as a,ag as s,G as l,a as p}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"560. Subarray Sum Equals K","description":"","frontmatter":{},"headers":[],"relativePath":"hashmap/560.md","filePath":"hashmap/560.md"}'),u={name:"hashmap/560.md"},c={id:"_560-subarray-sum-equals-k",tabindex:"-1"};function m(d,e,h,g,f,x){const t=i("Badge");return r(),o("div",null,[a("h1",c,[e[0]||(e[0]=a("a",{href:"https://leetcode.com/problems/subarray-sum-equals-k/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"560. Subarray Sum Equals K",-1)),l(t,{type:"warning",text:"Medium"}),e[1]||(e[1]=p()),e[2]||(e[2]=a("a",{class:"header-anchor",href:"#_560-subarray-sum-equals-k","aria-label":'Permalink to "[560. Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=s(`<p>Given an array of integers <code>nums</code> and an integer <code>k</code>, return the total number of subarrays whose sum equals to <code>k</code>.</p><p>A subarray is a contiguous <strong>non-empty</strong> sequence of elements within an array.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,1,1], k = 2
Output: 2
Explanation: The subarrays with sum 2 are [1,1] and [1,1] (from indices 0-1 and 1-2).
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,2,3], k = 3
Output: 2
Explanation: The subarrays with sum 3 are [1,2] and [3].
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 2 * 10^4</code></li><li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li><li><code>-10^7 &lt;= k &lt;= 10^7</code></li></ul><h2 id="💡-approach-prefix-sum-with-hash-map" tabindex="-1">💡 Approach: Prefix Sum with Hash Map <a class="header-anchor" href="#💡-approach-prefix-sum-with-hash-map" aria-label="Permalink to &quot;💡 Approach: Prefix Sum with Hash Map&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>The key insight is to use <strong>prefix sums</strong> combined with a <strong>hash map</strong>:</p><ul><li>If <code>prefixSum[j] - prefixSum[i] == k</code>, then the subarray from <code>i+1</code> to <code>j</code> has sum <code>k</code></li><li>Equivalently: if <code>prefixSum[j] - k == prefixSum[i]</code>, we found a valid subarray</li><li>Use a hash map to store prefix sums and their frequencies as we iterate</li></ul><p><strong>Key Insight:</strong></p><ul><li>Prefix sum at index <code>i</code>: <code>sum[0...i]</code></li><li>Subarray sum from <code>i+1</code> to <code>j</code>: <code>prefixSum[j] - prefixSum[i] == k</code></li><li>We need <code>prefixSum[i] == prefixSum[j] - k</code></li><li>Count how many times we&#39;ve seen <code>prefixSum[j] - k</code> before</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Initialize</strong> a hash map with <code>{0: 1}</code> (prefix sum 0 appears once before we start)</li><li><strong>Initialize</strong> <code>prefixSum = 0</code> and <code>count = 0</code></li><li><strong>Iterate</strong> through the array: <ul><li>Update <code>prefixSum += nums[i]</code></li><li>Calculate <code>target = prefixSum - k</code></li><li>If <code>target</code> exists in map, add <code>map[target]</code> to count</li><li>Increment <code>map[prefixSum]</code> by 1</li></ul></li><li><strong>Return</strong> count</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Initialize map with <code>{0: 1}</code> to handle subarrays starting at index 0</li><li>Count frequencies of prefix sums, not just their existence</li><li>Time complexity: O(n) - single pass through array</li><li>Space complexity: O(n) - hash map can store up to n prefix sums</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-MtSex" id="tab-LU72Uki" checked><label data-title="Kotlin" for="tab-LU72Uki">Kotlin</label><input type="radio" name="group-MtSex" id="tab-2C81ZwY"><label data-title="TypeScript" for="tab-2C81ZwY">TypeScript</label><input type="radio" name="group-MtSex" id="tab-LvpaGNT"><label data-title="Java" for="tab-LvpaGNT">Java</label><input type="radio" name="group-MtSex" id="tab-vW9XwUT"><label data-title="Python" for="tab-vW9XwUT">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun subarraySum(nums: IntArray, k: Int): Int {
        val map = mutableMapOf&lt;Int, Int&gt;()
        map[0] = 1  // Initialize with prefix sum 0
        
        var prefixSum = 0
        var count = 0
        
        for (num in nums) {
            prefixSum += num
            val target = prefixSum - k
            
            count += map.getOrDefault(target, 0)
            map[prefixSum] = map.getOrDefault(prefixSum, 0) + 1
        }
        
        return count
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function subarraySum(nums: number[], k: number): number {
    const map = new Map&lt;number, number&gt;();
    map.set(0, 1);  // Initialize with prefix sum 0
    
    let prefixSum = 0;
    let count = 0;
    
    for (const num of nums) {
        prefixSum += num;
        const target = prefixSum - k;
        
        count += map.get(target) || 0;
        map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
    }
    
    return count;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">import java.util.HashMap;
import java.util.Map;

class Solution {
    public int subarraySum(int[] nums, int k) {
        Map&lt;Integer, Integer&gt; map = new HashMap&lt;&gt;();
        map.put(0, 1);  // Initialize with prefix sum 0
        
        int prefixSum = 0;
        int count = 0;
        
        for (int num : nums) {
            prefixSum += num;
            int target = prefixSum - k;
            
            count += map.getOrDefault(target, 0);
            map.put(prefixSum, map.getOrDefault(prefixSum, 0) + 1);
        }
        
        return count;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def subarraySum(self, nums: List[int], k: int) -&gt; int:
        map = {0: 1}  # Initialize with prefix sum 0
        prefix_sum = 0
        count = 0
        
        for num in nums:
            prefix_sum += num
            target = prefix_sum - k
            
            count += map.get(target, 0)
            map[prefix_sum] = map.get(prefix_sum, 0) + 1
        
        return count
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), where n is the length of the array. We iterate through the array once.</li><li><strong>Space Complexity:</strong> O(n), for the hash map storing prefix sums. In the worst case, all prefix sums are unique.</li></ul>`,22))])}const v=n(u,[["render",m]]);export{y as __pageData,v as default};
