import{_ as e,c as n,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"238. Product of Array Except Self","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/238.md","filePath":"array-string/238.md"}'),r={name:"array-string/238.md"};function l(s,t,i,p,c,d){return a(),n("div",null,t[0]||(t[0]=[o(`<h1 id="_238-product-of-array-except-self" tabindex="-1"><a href="https://leetcode.com/problems/product-of-array-except-self/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">238. Product of Array Except Self</a> <a class="header-anchor" href="#_238-product-of-array-except-self" aria-label="Permalink to &quot;[238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all the elements of <code>nums</code> except <code>nums[i]</code>.</p><p>The product of any prefix or suffix of <code>nums</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</p><p>You must write an algorithm that runs in<code>O(n)</code>time and without using the division operation.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,2,3,4]
Output: [24,12,8,6]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>2 &lt;= nums.length &lt;= 10^5</code></li><li><code>-30 &lt;= nums[i] &lt;= 30</code></li><li>The input is generated such that <code>answer[i]</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</li></ul><p><strong>Follow up:</strong> Can you solve the problem in <code>O(1)</code>extraspace complexity? (The output array <strong>does not</strong> count as extra space for space complexity analysis.)</p><h2 id="📋-approach" tabindex="-1">📋 Approach <a class="header-anchor" href="#📋-approach" aria-label="Permalink to &quot;📋 Approach&quot;">​</a></h2><p>We want to compute an output array where each element at index <code>i</code> is the product of all the elements in the array <strong>except</strong> <code>nums[i]</code>.</p><h3 id="plan" tabindex="-1">Plan <a class="header-anchor" href="#plan" aria-label="Permalink to &quot;Plan&quot;">​</a></h3><ol><li><p>Iterate from left to right:<br> Store the product of all elements to the <strong>left</strong> of each index into the result array.</p></li><li><p>Iterate from right to left:<br> Multiply each element in the result array by the product of all elements to the <strong>right</strong> of each index.</p></li></ol><p>At any index <code>i</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">result[i] = product of elements to the left of i × product of elements to the right of i
</code></pre></div><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-As5bY" id="tab-ehrsOjd" checked><label data-title="Kotlin" for="tab-ehrsOjd">Kotlin</label><input type="radio" name="group-As5bY" id="tab-tfFp3fr"><label data-title="TypeScript" for="tab-tfFp3fr">TypeScript</label><input type="radio" name="group-As5bY" id="tab-goIGlL2"><label data-title="Java" for="tab-goIGlL2">Java</label><input type="radio" name="group-As5bY" id="tab-V0HMiwy"><label data-title="Python" for="tab-V0HMiwy">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun productExceptSelf(nums: IntArray): IntArray {
    val n = nums.size
    val result = IntArray(n) { 1 }

    var left = 1
    for (i in 0 until n) {
        result[i] = left
        left *= nums[i]
    }

    var right = 1
    for (i in n - 1 downTo 0) {
        result[i] *= right
        right *= nums[i]
    }

    return result
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const result = new Array(n).fill(1);

    let left = 1;
    for (let i = 0; i &lt; n; i++) {
        result[i] = left;
        left *= nums[i];
    }

    let right = 1;
    for (let i = n - 1; i &gt;= 0; i--) {
        result[i] *= right;
        right *= nums[i];
    }

    return result;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Arrays.fill(result, 1);

        int left = 1;
        for (int i = 0; i &lt; n; i++) {
            result[i] = left;
            left *= nums[i];
        }

        int right = 1;
        for (int i = n - 1; i &gt;= 0; i--) {
            result[i] *= right;
            right *= nums[i];
        }

        return result;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def productExceptSelf(self, nums: List[int]) -&gt; List[int]:
        n = len(nums)
        result = [1] * n

        left = 1
        for i in range(n):
            result[i] = left
            left *= nums[i]

        right = 1
        for i in range(n - 1, -1, -1):
            result[i] *= right
            right *= nums[i]

        return result
</code></pre></div></div></div><h2 id="⏱️-complexity" tabindex="-1">⏱️ Complexity <a class="header-anchor" href="#⏱️-complexity" aria-label="Permalink to &quot;⏱️ Complexity&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Metric</th><th>Complexity</th></tr></thead><tbody><tr><td><strong>Time Complexity</strong></td><td>(O(n)) — We traverse the array twice.</td></tr><tr><td><strong>Space Complexity</strong></td><td>(O(1)) — Ignoring the output array, we only use two scalar variables (<code>left</code>, <code>right</code>).</td></tr></tbody></table>`,21)]))}const g=e(r,[["render",l]]);export{h as __pageData,g as default};
