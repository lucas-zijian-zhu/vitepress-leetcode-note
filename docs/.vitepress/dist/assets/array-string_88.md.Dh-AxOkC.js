import{_ as n,c as t,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"88. Merge Sorted Array","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/88.md","filePath":"array-string/88.md"}'),s={name:"array-string/88.md"};function r(d,e,i,l,c,p){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="_88-merge-sorted-array" tabindex="-1"><a href="https://leetcode.com/problems/merge-sorted-array/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">88. Merge Sorted Array</a> <a class="header-anchor" href="#_88-merge-sorted-array" aria-label="Permalink to &quot;[88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given two integer arrays <code>nums1</code> and <code>nums2</code>, sorted in <strong>non-decreasing order</strong> , and two integers <code>m</code> and <code>n</code>, representing the number of elements in <code>nums1</code> and <code>nums2</code> respectively.</p><p><strong>Merge</strong> <code>nums1</code> and <code>nums2</code> into a single array sorted in <strong>non-decreasing order</strong> .</p><p>The final sorted array should not be returned by the function, but instead be stored inside the array <code>nums1</code>. To accommodate this, <code>nums1</code> has a length of <code>m + n</code>, where the first <code>m</code> elements denote the elements that should be merged, and the last <code>n</code> elements are set to <code>0</code> and should be ignored. <code>nums2</code> has a length of <code>n</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>nums1.length == m + n</code></li><li><code>nums2.length == n</code></li><li><code>0 &lt;= m, n &lt;= 200</code></li><li><code>1 &lt;= m + n &lt;= 200</code></li><li><code>-10^9 &lt;= nums1[i], nums2[j] &lt;= 10^9</code></li></ul><p>**Follow up: ** Can you come up with an algorithm that runs in <code>O(m + n)</code> time?</p><h2 id="💡-approach" tabindex="-1">💡 Approach <a class="header-anchor" href="#💡-approach" aria-label="Permalink to &quot;💡 Approach&quot;">​</a></h2><p>✅ Use <strong>two pointers</strong>, starting from the end of both arrays.<br> ✅ Compare elements and fill from the end of <code>nums1</code> backwards.<br> ✅ If <code>nums2</code> still has elements left after <code>nums1</code> runs out, copy the remaining <code>nums2</code> elements.<br> ✅ Loop only needs to check <code>j &gt;= 0</code> because we only care about finishing copying <code>nums2</code>.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-I6GX5" id="tab-uQxWPwK" checked><label data-title="Kotlin" for="tab-uQxWPwK">Kotlin</label><input type="radio" name="group-I6GX5" id="tab-n2v3q9I"><label data-title="TypeScript" for="tab-n2v3q9I">TypeScript</label><input type="radio" name="group-I6GX5" id="tab-K1Mzzcs"><label data-title="Java" for="tab-K1Mzzcs">Java</label><input type="radio" name="group-I6GX5" id="tab-EiMrKaN"><label data-title="Python" for="tab-EiMrKaN">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun merge(nums1: IntArray, m: Int, nums2: IntArray, n: Int) {
        var i = m - 1
        var j = n - 1
        var k = m + n - 1

        while (j &gt;= 0) {
            if (i &gt;= 0 &amp;&amp; nums1[i] &gt; nums2[j]) {
                nums1[k--] = nums1[i--]
            } else {
                nums1[k--] = nums2[j--]
            }
        }
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

    while (j &gt;= 0) {
        if (i &gt;= 0 &amp;&amp; nums1[i] &gt; nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int i = m - 1;
        int j = n - 1;
        int k = m + n - 1;

        while (j &gt;= 0) {
            if (i &gt;= 0 &amp;&amp; nums1[i] &gt; nums2[j]) {
                nums1[k--] = nums1[i--];
            } else {
                nums1[k--] = nums2[j--];
            }
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -&gt; None:
        i = m - 1
        j = n - 1
        k = m + n - 1

        while j &gt;= 0:
            if i &gt;= 0 and nums1[i] &gt; nums2[j]:
                nums1[k] = nums1[i]
                i -= 1
            else:
                nums1[k] = nums2[j]
                j -= 1
            k -= 1
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Metric</th><th>Complexity</th></tr></thead><tbody><tr><td>⏳ <strong>Time Complexity</strong></td><td><code>O(m + n)</code> — We iterate through at most all <code>m + n</code> elements once, comparing and moving each element at most once.</td></tr><tr><td>🪄 <strong>Space Complexity</strong></td><td><code>O(1)</code> — We do the merge in-place using the extra space already provided in <code>nums1</code>.</td></tr></tbody></table>`,20)]))}const g=n(s,[["render",r]]);export{u as __pageData,g as default};
