import{_ as a,C as r,c as l,o,j as t,ag as i,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"34. Find First and Last Position of Element in Sorted Array","description":"","frontmatter":{},"headers":[],"relativePath":"binary-search/34.md","filePath":"binary-search/34.md"}'),u={name:"binary-search/34.md"},p={id:"_34-find-first-and-last-position-of-element-in-sorted-array",tabindex:"-1"};function c(g,e,m,h,f,v){const n=r("Badge");return o(),l("div",null,[t("h1",p,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"34. Find First and Last Position of Element in Sorted Array",-1)),s(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_34-find-first-and-last-position-of-element-in-sorted-array","aria-label":'Permalink to "[34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>Given an array of integers <code>nums</code> sorted in non-decreasing order, find the starting and ending position of a given <code>target</code> value.</p><p>If <code>target</code> is not found in the array, return <code>[-1, -1]</code>.</p><p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [], target = 0
Output: [-1,-1]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>0 &lt;= nums.length &lt;= 10^5</code></li><li><code>-10^9&lt;= nums[i]&lt;= 10^9</code></li><li><code>nums</code> is a non-decreasing array.</li><li><code>-10^9&lt;= target&lt;= 10^9</code></li></ul><h2 id="💡-approach-two-binary-searches-lower-and-upper-bound" tabindex="-1">💡 Approach: Two Binary Searches (Lower and Upper Bound) <a class="header-anchor" href="#💡-approach-two-binary-searches-lower-and-upper-bound" aria-label="Permalink to &quot;💡 Approach: Two Binary Searches (Lower and Upper Bound)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>We need the first and last positions of <code>target</code>. In a sorted array, we can run binary search twice:</p><ul><li>One to find the first index where value &gt;= target (lower bound)</li><li>One to find the first index where value &gt; target, then minus one (upper bound)</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Lower bound (first position &gt;= target):</strong><ul><li>Standard binary search variant moving <code>right</code> when <code>nums[mid] &gt;= target</code></li></ul></li><li><strong>Upper bound (last position &lt;= target):</strong><ul><li>Find first index of value &gt; target, then subtract 1</li></ul></li><li><strong>Validate:</strong><ul><li>If lower bound is out of range or <code>nums[lower] != target</code>, return <code>[-1, -1]</code></li><li>Otherwise return <code>[lower, upper]</code></li></ul></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Works with duplicates due to bound-style searches</li><li>Overall O(log n) time, O(1) space</li><li>Check bounds to avoid index errors</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-kH2di" id="tab-65EPZ0h" checked><label data-title="Kotlin" for="tab-65EPZ0h">Kotlin</label><input type="radio" name="group-kH2di" id="tab-IlxEhyy"><label data-title="TypeScript" for="tab-IlxEhyy">TypeScript</label><input type="radio" name="group-kH2di" id="tab-gsA_y9U"><label data-title="Java" for="tab-gsA_y9U">Java</label><input type="radio" name="group-kH2di" id="tab-KEgLZt9"><label data-title="Python" for="tab-KEgLZt9">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun searchRange(nums: IntArray, target: Int): IntArray {
    fun lowerBound(): Int {
        var l = 0
        var r = nums.size
        while (l &lt; r) {
            val m = l + (r - l) / 2
            if (nums[m] &gt;= target) r = m else l = m + 1
        }
        return l
    }
    
    fun upperBound(): Int {
        var l = 0
        var r = nums.size
        while (l &lt; r) {
            val m = l + (r - l) / 2
            if (nums[m] &gt; target) r = m else l = m + 1
        }
        return l
    }

    val left = lowerBound()
    if (left == nums.size || (left &lt; nums.size &amp;&amp; nums[left] != target)) return intArrayOf(-1, -1)
    val right = upperBound() - 1
    return intArrayOf(left, right)
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function searchRange(nums: number[], target: number): number[] {
    const lowerBound = (): number =&gt; {
        let l = 0, r = nums.length;
        while (l &lt; r) {
            const m = l + Math.floor((r - l) / 2);
            if (nums[m] &gt;= target) r = m; else l = m + 1;
        }
        return l;
    };

    const upperBound = (): number =&gt; {
        let l = 0, r = nums.length;
        while (l &lt; r) {
            const m = l + Math.floor((r - l) / 2);
            if (nums[m] &gt; target) r = m; else l = m + 1;
        }
        return l;
    };

    const left = lowerBound();
    if (left === nums.length || nums[left] !== target) return [-1, -1];
    const right = upperBound() - 1;
    return [left, right];
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int[] searchRange(int[] nums, int target) {
        int left = lowerBound(nums, target);
        if (left == nums.length || nums[left] != target) return new int[]{-1, -1};
        int right = upperBound(nums, target) - 1;
        return new int[]{left, right};
    }

    private int lowerBound(int[] nums, int target) {
        int l = 0, r = nums.length;
        while (l &lt; r) {
            int m = l + (r - l) / 2;
            if (nums[m] &gt;= target) r = m; else l = m + 1;
        }
        return l;
    }

    private int upperBound(int[] nums, int target) {
        int l = 0, r = nums.length;
        while (l &lt; r) {
            int m = l + (r - l) / 2;
            if (nums[m] &gt; target) r = m; else l = m + 1;
        }
        return l;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def searchRange(self, nums: List[int], target: int) -&gt; List[int]:
        def lower_bound() -&gt; int:
            l, r = 0, len(nums)
            while l &lt; r:
                m = (l + r) // 2
                if nums[m] &gt;= target:
                    r = m
                else:
                    l = m + 1
            return l
        
        def upper_bound() -&gt; int:
            l, r = 0, len(nums)
            while l &lt; r:
                m = (l + r) // 2
                if nums[m] &gt; target:
                    r = m
                else:
                    l = m + 1
            return l
        
        left = lower_bound()
        if left == len(nums) or (left &lt; len(nums) and nums[left] != target):
            return [-1, -1]
        right = upper_bound() - 1
        return [left, right]
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(log n), two binary searches</li><li><strong>Space Complexity:</strong> O(1), constant extra space</li></ul>`,23))])}const w=a(u,[["render",c]]);export{y as __pageData,w as default};
