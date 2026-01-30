import{_ as e,c as t,o as a,ag as i}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"209. Minimum Size Subarray Sum","description":"","frontmatter":{},"headers":[],"relativePath":"sliding-window/209.md","filePath":"sliding-window/209.md"}'),s={name:"sliding-window/209.md"};function o(l,n,r,p,d,u){return a(),t("div",null,n[0]||(n[0]=[i(`<h1 id="_209-minimum-size-subarray-sum" tabindex="-1"><a href="https://leetcode.com/problems/minimum-size-subarray-sum/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">209. Minimum Size Subarray Sum</a> <a class="header-anchor" href="#_209-minimum-size-subarray-sum" aria-label="Permalink to &quot;[209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an array of positive integers <code>nums</code> and a positive integer <code>target</code>, return the <strong>minimal length</strong> of a <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1b:" data-state="closed" class="">subarray</button> whose sum is greater than or equal to <code>target</code>. If there is no such subarray, return <code>0</code> instead.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: target = 4, nums = [1,4,4]
Output: 1
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= target &lt;= 10^9</code></li><li><code>1 &lt;= nums.length &lt;= 10^5</code></li><li><code>1 &lt;= nums[i] &lt;= 10^4</code></li></ul><p><strong>Follow up:</strong> If you have figured out the <code>O(n)</code> solution, try coding another solution of which the time complexity is <code>O(n log(n))</code>.</p><h2 id="✅-approach-sliding-window" tabindex="-1">✅ Approach: Sliding Window <a class="header-anchor" href="#✅-approach-sliding-window" aria-label="Permalink to &quot;✅ Approach: Sliding Window&quot;">​</a></h2><p>Since all numbers are <strong>positive</strong>, we can use a <strong>shrinking window</strong> approach:</p><ol><li>Start with both left and right pointers at index 0.</li><li>Expand the right pointer and add to the running sum.</li><li>When the sum becomes <code>&gt;= target</code>, update the minimum length.</li><li>Then try to <strong>shrink the window</strong> from the left while still <code>sum &gt;= target</code>.</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-y8Mn6" id="tab-75ieBzv" checked><label data-title="Kotlin" for="tab-75ieBzv">Kotlin</label><input type="radio" name="group-y8Mn6" id="tab-QaWQwGb"><label data-title="TypeScript" for="tab-QaWQwGb">TypeScript</label><input type="radio" name="group-y8Mn6" id="tab-T9A-FMq"><label data-title="Java" for="tab-T9A-FMq">Java</label><input type="radio" name="group-y8Mn6" id="tab-k1HnS6V"><label data-title="Python" for="tab-k1HnS6V">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun minSubArrayLen(target: Int, nums: IntArray): Int {
        var left = 0
        var sum = 0
        var minLen = Int.MAX_VALUE

        for (right in nums.indices) {
            sum += nums[right]

            while (sum &gt;= target) {
                minLen = minOf(minLen, right - left + 1)
                sum -= nums[left]
                left++
            }
        }

        return if (minLen == Int.MAX_VALUE) 0 else minLen
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function minSubArrayLen(target: number, nums: number[]): number {
    let left = 0;
    let sum = 0;
    let minLen = Number.MAX_SAFE_INTEGER;

    for (let right = 0; right &lt; nums.length; right++) {
        sum += nums[right];

        while (sum &gt;= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }

    return minLen === Number.MAX_SAFE_INTEGER ? 0 : minLen;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int sum = 0;
        int minLen = Integer.MAX_VALUE;

        for (int right = 0; right &lt; nums.length; right++) {
            sum += nums[right];

            while (sum &gt;= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }

        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -&gt; int:
        left = 0
        sum_val = 0
        min_len = float(&#39;inf&#39;)

        for right in range(len(nums)):
            sum_val += nums[right]

            while sum_val &gt;= target:
                min_len = min(min_len, right - left + 1)
                sum_val -= nums[left]
                left += 1

        return 0 if min_len == float(&#39;inf&#39;) else min_len
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><p><strong>Time Complexity:</strong> O(n)<br> Each element is visited at most twice — once by the right pointer and once by the left pointer. So the total number of operations is linear in the size of the array.</p></li><li><p><strong>Space Complexity:</strong> O(1)<br> We only use a constant number of variables (<code>left</code>, <code>sum</code>, <code>minLen</code>), regardless of the input size.</p></li></ul>`,18)]))}const g=e(s,[["render",o]]);export{m as __pageData,g as default};
