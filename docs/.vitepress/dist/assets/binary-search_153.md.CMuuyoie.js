import{_ as a,C as i,c as o,o as l,j as t,ag as r,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const b=JSON.parse('{"title":"153. Find Minimum in Rotated Sorted Array","description":"","frontmatter":{},"headers":[],"relativePath":"binary-search/153.md","filePath":"binary-search/153.md"}'),c={name:"binary-search/153.md"},p={id:"_153-find-minimum-in-rotated-sorted-array",tabindex:"-1"};function m(u,e,h,g,f,v){const n=i("Badge");return l(),o("div",null,[t("h1",p,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"153. Find Minimum in Rotated Sorted Array",-1)),s(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_153-find-minimum-in-rotated-sorted-array","aria-label":'Permalink to "[153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=r(`<p>Suppose an array of length <code>n</code> sorted in ascending order is <strong>rotated</strong> between <code>1</code> and <code>n</code> times. For example, the array <code>nums = [0,1,2,4,5,6,7]</code> might become:</p><ul><li><code>[4,5,6,7,0,1,2]</code> if it was rotated <code>4</code> times.</li><li><code>[0,1,2,4,5,6,7]</code> if it was rotated <code>7</code> times.</li></ul><p>Notice that <strong>rotating</strong> an array <code>[a[0], a[1], a[2], ..., a[n-1]]</code> 1 time results in the array <code>[a[n-1], a[0], a[1], a[2], ..., a[n-2]]</code>.</p><p>Given the sorted rotated array <code>nums</code> of <strong>unique</strong> elements, return the minimum element of this array.</p><p>You must write an algorithm that runs in<code>O(log n) time</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>n == nums.length</code></li><li><code>1 &lt;= n &lt;= 5000</code></li><li><code>-5000 &lt;= nums[i] &lt;= 5000</code></li><li>All the integers of <code>nums</code> are <strong>unique</strong> .</li><li><code>nums</code> is sorted and rotated between <code>1</code> and <code>n</code> times.</li></ul><h2 id="💡-approach-binary-search-for-rotation-pivot" tabindex="-1">💡 Approach: Binary Search for Rotation Pivot <a class="header-anchor" href="#💡-approach-binary-search-for-rotation-pivot" aria-label="Permalink to &quot;💡 Approach: Binary Search for Rotation Pivot&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>In a rotated sorted array with unique elements, the minimum element is the rotation pivot. The array remains piecewise sorted. Compare <code>nums[mid]</code> with <code>nums[right]</code> to locate the side containing the minimum:</p><ul><li>If <code>nums[mid] &gt; nums[right]</code>, the minimum is strictly to the right of <code>mid</code>.</li><li>Otherwise, the minimum is at <code>mid</code> or to its left.</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li>Initialize <code>left = 0</code>, <code>right = n - 1</code>.</li><li>While <code>left &lt; right</code>: <ul><li><code>mid = left + (right - left) / 2</code></li><li>If <code>nums[mid] &gt; nums[right]</code>: <code>left = mid + 1</code></li><li>Else: <code>right = mid</code></li></ul></li><li>Return <code>nums[left]</code>.</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Maintains invariant that the minimum lies within <code>[left, right]</code>.</li><li>O(log n) time, O(1) space.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-A7qw1" id="tab-dV-G5EH" checked><label data-title="Kotlin" for="tab-dV-G5EH">Kotlin</label><input type="radio" name="group-A7qw1" id="tab-8zr8a9Y"><label data-title="TypeScript" for="tab-8zr8a9Y">TypeScript</label><input type="radio" name="group-A7qw1" id="tab-ulZPEOf"><label data-title="Java" for="tab-ulZPEOf">Java</label><input type="radio" name="group-A7qw1" id="tab-VWNLd7Z"><label data-title="Python" for="tab-VWNLd7Z">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun findMin(nums: IntArray): Int {
    var left = 0
    var right = nums.size - 1

    while (left &lt; right) {
        val mid = left + (right - left) / 2
        if (nums[mid] &gt; nums[right]) {
            left = mid + 1
        } else {
            right = mid
        }
    }
    return nums[left]
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function findMin(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    while (left &lt; right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] &gt; nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left &lt; right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] &gt; nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def findMin(self, nums: List[int]) -&gt; int:
        left, right = 0, len(nums) - 1
        while left &lt; right:
            mid = (left + right) // 2
            if nums[mid] &gt; nums[right]:
                left = mid + 1
            else:
                right = mid
        return nums[left]
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(log n)</li><li><strong>Space Complexity:</strong> O(1)</li></ul>`,25))])}const w=a(c,[["render",m]]);export{b as __pageData,w as default};
