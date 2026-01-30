import{_ as e,c as n,o as t,ag as r}from"./chunks/framework.Bw-5EFTY.js";const c=JSON.parse('{"title":"53. Maximum Subarray","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/53.md","filePath":"array-string/53.md"}'),o={name:"array-string/53.md"};function i(s,a,l,m,d,p){return t(),n("div",null,a[0]||(a[0]=[r(`<h1 id="_53-maximum-subarray" tabindex="-1"><a href="https://leetcode.com/problems/maximum-subarray/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">53. Maximum Subarray</a> <a class="header-anchor" href="#_53-maximum-subarray" aria-label="Permalink to &quot;[53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an integer array <code>nums</code>, find the <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1n:" data-state="closed" class="">subarray</button> with the largest sum, and return its sum.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 10^5</code></li><li><code>-10^4 &lt;= nums[i] &lt;= 10^4</code></li></ul><p><strong>Follow up:</strong> If you have figured out the <code>O(n)</code> solution, try coding another solution using the <strong>divide and conquer</strong> approach, which is more subtle.</p><h2 id="💡-approach-kadane-s-algorithm-dynamic-programming" tabindex="-1">💡 Approach: Kadane&#39;s Algorithm (Dynamic Programming) <a class="header-anchor" href="#💡-approach-kadane-s-algorithm-dynamic-programming" aria-label="Permalink to &quot;💡 Approach: Kadane&#39;s Algorithm (Dynamic Programming)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>dynamic programming</strong> problem. The key insight is that at each position, we need to decide whether to:</p><ol><li><strong>Start a new subarray</strong> from the current element</li><li><strong>Extend the existing subarray</strong> by including the current element</li></ol><h3 id="strategy" tabindex="-1">Strategy <a class="header-anchor" href="#strategy" aria-label="Permalink to &quot;Strategy&quot;">​</a></h3><p>Use <strong>Kadane&#39;s Algorithm</strong>:</p><ul><li>Keep track of the <strong>maximum sum ending at current position</strong></li><li>Keep track of the <strong>global maximum sum</strong> seen so far</li><li>At each element, decide whether to start fresh or extend the previous subarray</li></ul><h3 id="algorithm-steps" tabindex="-1">Algorithm Steps <a class="header-anchor" href="#algorithm-steps" aria-label="Permalink to &quot;Algorithm Steps&quot;">​</a></h3><ol><li><strong>Initialize</strong>: <code>maxSoFar = nums[0]</code>, <code>maxEndingHere = nums[0]</code></li><li><strong>For each element</strong> from index 1: <ul><li><code>maxEndingHere = max(nums[i], maxEndingHere + nums[i])</code></li><li><code>maxSoFar = max(maxSoFar, maxEndingHere)</code></li></ul></li><li><strong>Return</strong> <code>maxSoFar</code></li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-RR9bB" id="tab-mmXwc4i" checked><label data-title="Kotlin" for="tab-mmXwc4i">Kotlin</label><input type="radio" name="group-RR9bB" id="tab-3Brn__P"><label data-title="TypeScript" for="tab-3Brn__P">TypeScript</label><input type="radio" name="group-RR9bB" id="tab-UB2_CRT"><label data-title="Java" for="tab-UB2_CRT">Java</label><input type="radio" name="group-RR9bB" id="tab-Q4WIqTK"><label data-title="Python" for="tab-Q4WIqTK">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun maxSubArray(nums: IntArray): Int {
        var maxSoFar = nums[0]
        var maxEndingHere = nums[0]
        
        for (i in 1 until nums.size) {
            // Either start new subarray or extend existing one
            maxEndingHere = maxOf(nums[i], maxEndingHere + nums[i])
            // Update global maximum
            maxSoFar = maxOf(maxSoFar, maxEndingHere)
        }
        
        return maxSoFar
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function maxSubArray(nums: number[]): number {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    
    for (let i = 1; i &lt; nums.length; i++) {
        // Either start new subarray or extend existing one
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        // Update global maximum
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        
        for (int i = 1; i &lt; nums.length; i++) {
            // Either start new subarray or extend existing one
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            // Update global maximum
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        
        return maxSoFar;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def maxSubArray(self, nums: List[int]) -&gt; int:
        max_so_far = nums[0]
        max_ending_here = nums[0]
        
        for i in range(1, len(nums)):
            # Either start new subarray or extend existing one
            max_ending_here = max(nums[i], max_ending_here + nums[i])
            # Update global maximum
            max_so_far = max(max_so_far, max_ending_here)
        
        return max_so_far
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(N) where N is the length of the array</li><li><strong>Space Complexity:</strong> O(1) using only constant extra space</li></ul>`,24)]))}const g=e(o,[["render",i]]);export{c as __pageData,g as default};
