import{_ as n,c as e,o as t,ag as r}from"./chunks/framework.Bw-5EFTY.js";const p=JSON.parse('{"title":"918. Maximum Sum Circular Subarray","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/918.md","filePath":"array-string/918.md"}'),s={name:"array-string/918.md"};function i(m,a,u,o,l,c){return t(),e("div",null,a[0]||(a[0]=[r(`<h1 id="_918-maximum-sum-circular-subarray" tabindex="-1"><a href="https://leetcode.com/problems/maximum-sum-circular-subarray/description/" target="_blank" rel="noreferrer">918. Maximum Sum Circular Subarray</a> <a class="header-anchor" href="#_918-maximum-sum-circular-subarray" aria-label="Permalink to &quot;[918. Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/description/)&quot;">​</a></h1><p>Given a <strong>circular integer array</strong> <code>nums</code> of length <code>n</code>, return <em>the maximum possible sum of a non-empty <strong>subarray</strong> of</em> <code>nums</code>.</p><p>A <strong>circular array</strong> means the end of the array connects to the beginning of the array. Formally, the next element of <code>nums[i]</code> is <code>nums[(i + 1) % n]</code> and the previous element of <code>nums[i]</code> is <code>nums[(i - 1 + n) % n]</code>.</p><p>A <strong>subarray</strong> may only include each element of the fixed buffer <code>nums</code> at most once. Formally, for a subarray <code>nums[i], nums[i + 1], ..., nums[j]</code>, there does not exist <code>i &lt;= k1, k2 &lt;= j</code> with <code>k1 % n == k2 % n</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,-2,3,-2]
Output: 3
Explanation: Subarray [3] has maximum sum 3.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [5,-3,5]
Output: 10
Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [-3,-2,-3]
Output: -2
Explanation: Subarray [-2] has maximum sum -2.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>n == nums.length</code></li><li><code>1 &lt;= n &lt;= 3 * 10^4</code></li><li><code>-3 * 10^4 &lt;= nums[i] &lt;= 3 * 10^4</code></li></ul><h2 id="💡-approach-kadane-s-algorithm-with-circular-array-handling" tabindex="-1">💡 Approach: Kadane&#39;s Algorithm with Circular Array Handling <a class="header-anchor" href="#💡-approach-kadane-s-algorithm-with-circular-array-handling" aria-label="Permalink to &quot;💡 Approach: Kadane&#39;s Algorithm with Circular Array Handling&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is an extension of the <strong>Maximum Subarray</strong> problem (LeetCode 53) but with a <strong>circular array</strong>. The key insight is that the maximum sum can occur in two cases:</p><ol><li><strong>Normal case</strong>: Maximum subarray doesn&#39;t wrap around (same as regular Kadane&#39;s)</li><li><strong>Circular case</strong>: Maximum subarray wraps around the array</li></ol><h3 id="strategy" tabindex="-1">Strategy <a class="header-anchor" href="#strategy" aria-label="Permalink to &quot;Strategy&quot;">​</a></h3><p>For the circular case, we can use a clever observation:</p><ul><li><strong>Maximum circular sum</strong> = <strong>Total sum</strong> - <strong>Minimum subarray sum</strong></li><li>This works because if we remove the minimum subarray, we get the maximum circular subarray</li></ul><h3 id="algorithm-steps" tabindex="-1">Algorithm Steps <a class="header-anchor" href="#algorithm-steps" aria-label="Permalink to &quot;Algorithm Steps&quot;">​</a></h3><ol><li><strong>Find maximum subarray sum</strong> using Kadane&#39;s algorithm (normal case)</li><li><strong>Find minimum subarray sum</strong> using modified Kadane&#39;s algorithm</li><li><strong>Calculate total sum</strong> of the array</li><li><strong>Return</strong> <code>max(maxSum, totalSum - minSum)</code> with edge case handling</li></ol><p><strong>Edge case</strong>: If all elements are negative, return the maximum single element.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-WBwes" id="tab-gCMAHCa" checked><label data-title="Kotlin" for="tab-gCMAHCa">Kotlin</label><input type="radio" name="group-WBwes" id="tab-ky3ACne"><label data-title="TypeScript" for="tab-ky3ACne">TypeScript</label><input type="radio" name="group-WBwes" id="tab-0pSWzd2"><label data-title="Java" for="tab-0pSWzd2">Java</label><input type="radio" name="group-WBwes" id="tab-EwZAIMS"><label data-title="Python" for="tab-EwZAIMS">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun maxSubarraySumCircular(nums: IntArray): Int {
        var maxSum = nums[0]
        var minSum = nums[0]
        var currentMax = nums[0]
        var currentMin = nums[0]
        var totalSum = nums[0]
        
        for (i in 1 until nums.size) {
            // Kadane&#39;s algorithm for maximum subarray
            currentMax = maxOf(nums[i], currentMax + nums[i])
            maxSum = maxOf(maxSum, currentMax)
            
            // Modified Kadane&#39;s for minimum subarray
            currentMin = minOf(nums[i], currentMin + nums[i])
            minSum = minOf(minSum, currentMin)
            
            totalSum += nums[i]
        }
        
        // Edge case: all negative numbers
        return if (maxSum &lt; 0) maxSum else maxOf(maxSum, totalSum - minSum)
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function maxSubarraySumCircular(nums: number[]): number {
    let maxSum = nums[0];
    let minSum = nums[0];
    let currentMax = nums[0];
    let currentMin = nums[0];
    let totalSum = nums[0];
    
    for (let i = 1; i &lt; nums.length; i++) {
        // Kadane&#39;s algorithm for maximum subarray
        currentMax = Math.max(nums[i], currentMax + nums[i]);
        maxSum = Math.max(maxSum, currentMax);
        
        // Modified Kadane&#39;s for minimum subarray
        currentMin = Math.min(nums[i], currentMin + nums[i]);
        minSum = Math.min(minSum, currentMin);
        
        totalSum += nums[i];
    }
    
    // Edge case: all negative numbers
    return maxSum &lt; 0 ? maxSum : Math.max(maxSum, totalSum - minSum);
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int maxSum = nums[0];
        int minSum = nums[0];
        int currentMax = nums[0];
        int currentMin = nums[0];
        int totalSum = nums[0];
        
        for (int i = 1; i &lt; nums.length; i++) {
            // Kadane&#39;s algorithm for maximum subarray
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSum = Math.max(maxSum, currentMax);
            
            // Modified Kadane&#39;s for minimum subarray
            currentMin = Math.min(nums[i], currentMin + nums[i]);
            minSum = Math.min(minSum, currentMin);
            
            totalSum += nums[i];
        }
        
        // Edge case: all negative numbers
        return maxSum &lt; 0 ? maxSum : Math.max(maxSum, totalSum - minSum);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -&gt; int:
        max_sum = nums[0]
        min_sum = nums[0]
        current_max = nums[0]
        current_min = nums[0]
        total_sum = nums[0]
        
        for i in range(1, len(nums)):
            # Kadane&#39;s algorithm for maximum subarray
            current_max = max(nums[i], current_max + nums[i])
            max_sum = max(max_sum, current_max)
            
            # Modified Kadane&#39;s for minimum subarray
            current_min = min(nums[i], current_min + nums[i])
            min_sum = min(min_sum, current_min)
            
            total_sum += nums[i]
        
        # Edge case: all negative numbers
        return max_sum if max_sum &lt; 0 else max(max_sum, total_sum - min_sum)
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(N) where N is the length of the array</li><li><strong>Space Complexity:</strong> O(1) using only constant extra space</li></ul>`,26)]))}const g=n(s,[["render",i]]);export{p as __pageData,g as default};
