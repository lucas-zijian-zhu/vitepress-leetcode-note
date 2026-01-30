import{_ as t,c as n,o as a,ag as r}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"189. Rotate Array","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/189.md","filePath":"array-string/189.md"}'),s={name:"array-string/189.md"};function o(i,e,l,p,d,c){return a(),n("div",null,e[0]||(e[0]=[r(`<h1 id="_189-rotate-array" tabindex="-1"><a href="https://leetcode.com/problems/rotate-array/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">189. Rotate Array</a> <a class="header-anchor" href="#_189-rotate-array" aria-label="Permalink to &quot;[189. Rotate Array](https://leetcode.com/problems/rotate-array/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an integer array <code>nums</code>, rotate the array to the right by <code>k</code> steps, where <code>k</code> is non-negative.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 10^5</code></li><li><code>-2^31 &lt;= nums[i] &lt;= 2^31 - 1</code></li><li><code>0 &lt;= k &lt;= 10^5</code></li></ul><p><strong>Follow up:</strong></p><ul><li>Try to come up with as many solutions as you can. There are at least <strong>three</strong> different ways to solve this problem.</li><li>Could you do it in-place with <code>O(1)</code> extra space?</li></ul><h1 id="📋-approach-reverse-method-in-kotlin" tabindex="-1">📋 Approach: Reverse Method in Kotlin <a class="header-anchor" href="#📋-approach-reverse-method-in-kotlin" aria-label="Permalink to &quot;📋 Approach: Reverse Method in Kotlin&quot;">​</a></h1><p>We want to rotate an array of integers to the right by <code>k</code> steps.<br> The reverse method allows us to do this <strong>in-place</strong>, with O(1) space.</p><hr><h2 id="🚀-idea" tabindex="-1">🚀 Idea <a class="header-anchor" href="#🚀-idea" aria-label="Permalink to &quot;🚀 Idea&quot;">​</a></h2><p>1️⃣ Reverse the entire array.<br> 2️⃣ Reverse the first <code>k</code> elements.<br> 3️⃣ Reverse the remaining <code>n-k</code> elements.</p><p>This effectively moves the last <code>k</code> elements to the front while preserving order.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-22fXe" id="tab-1cbcGP5" checked><label data-title="Kotlin" for="tab-1cbcGP5">Kotlin</label><input type="radio" name="group-22fXe" id="tab-oVVaXo1"><label data-title="TypeScript" for="tab-oVVaXo1">TypeScript</label><input type="radio" name="group-22fXe" id="tab-fkptjyj"><label data-title="Java" for="tab-fkptjyj">Java</label><input type="radio" name="group-22fXe" id="tab-7bW-Tbk"><label data-title="Python" for="tab-7bW-Tbk">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun rotate(nums: IntArray, k: Int) {
        val n = nums.size
        val steps = k % n

        // Helper function to reverse a subarray
        fun reverse(start: Int, end: Int) {
            var i = start
            var j = end
            while (i &lt; j) {
                val tmp = nums[i]
                nums[i] = nums[j]
                nums[j] = tmp
                i++
                j--
            }
        }

        reverse(0, n - 1)
        reverse(0, steps - 1)
        reverse(steps, n - 1)
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function rotate(nums: number[], k: number): void {
    const n = nums.length;
    const steps = k % n;

    // Helper function to reverse a subarray
    const reverse = (start: number, end: number): void =&gt; {
        let i = start;
        let j = end;
        while (i &lt; j) {
            const tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
            i++;
            j--;
        }
    };

    reverse(0, n - 1);
    reverse(0, steps - 1);
    reverse(steps, n - 1);
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        int steps = k % n;

        // Helper function to reverse a subarray
        reverse(nums, 0, n - 1);
        reverse(nums, 0, steps - 1);
        reverse(nums, steps, n - 1);
    }

    private void reverse(int[] nums, int start, int end) {
        while (start &lt; end) {
            int tmp = nums[start];
            nums[start] = nums[end];
            nums[end] = tmp;
            start++;
            end--;
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def rotate(self, nums: List[int], k: int) -&gt; None:
        n = len(nums)
        steps = k % n

        # Helper function to reverse a subarray
        def reverse(start: int, end: int) -&gt; None:
            while start &lt; end:
                nums[start], nums[end] = nums[end], nums[start]
                start += 1
                end -= 1

        reverse(0, n - 1)
        reverse(0, steps - 1)
        reverse(steps, n - 1)
</code></pre></div></div></div><h2 id="⏱️-complexity" tabindex="-1">⏱️ Complexity <a class="header-anchor" href="#⏱️-complexity" aria-label="Permalink to &quot;⏱️ Complexity&quot;">​</a></h2><hr><h2 id="time-complexity" tabindex="-1">Time Complexity <a class="header-anchor" href="#time-complexity" aria-label="Permalink to &quot;Time Complexity&quot;">​</a></h2><ul><li><strong>O(n)</strong></li><li>We reverse the entire array once → O(n)</li><li>We reverse the first <code>k</code> elements → O(k)</li><li>We reverse the remaining <code>n-k</code> elements → O(n-k)</li><li>Total: O(n) + O(k) + O(n-k) = <strong>O(n)</strong></li></ul><hr><h2 id="space-complexity" tabindex="-1">Space Complexity <a class="header-anchor" href="#space-complexity" aria-label="Permalink to &quot;Space Complexity&quot;">​</a></h2><ul><li><strong>O(1)</strong></li><li>All operations are done <strong>in-place</strong>.</li><li>No additional arrays or data structures are used.</li></ul><hr><table tabindex="0"><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody><tr><td>Time Complexity</td><td>O(n)</td></tr><tr><td>Space Complexity</td><td>O(1)</td></tr></tbody></table>`,28)]))}const m=t(s,[["render",o]]);export{h as __pageData,m as default};
