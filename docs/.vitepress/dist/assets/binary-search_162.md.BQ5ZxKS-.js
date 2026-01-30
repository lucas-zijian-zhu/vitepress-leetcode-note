import{_ as a,C as i,c as l,o,j as t,ag as r,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const v=JSON.parse('{"title":"162. Find Peak Element","description":"","frontmatter":{},"headers":[],"relativePath":"binary-search/162.md","filePath":"binary-search/162.md"}'),c={name:"binary-search/162.md"},p={id:"_162-find-peak-element",tabindex:"-1"};function m(u,e,h,g,f,y){const n=i("Badge");return o(),l("div",null,[t("h1",p,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/find-peak-element/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"162. Find Peak Element",-1)),s(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_162-find-peak-element","aria-label":'Permalink to "[162. Find Peak Element](https://leetcode.com/problems/find-peak-element/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=r(`<p>A peak element is an element that is strictly greater than its neighbors.</p><p>Given a <strong>0-indexed</strong> integer array <code>nums</code>, find a peak element, and return its index. If the array contains multiple peaks, return the index to <strong>any of the peaks</strong>.</p><p>You may imagine that <code>nums[-1] = nums[n] = -∞</code>. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.</p><p>You must write an algorithm that runs in <code>O(log n)</code> time.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 1000</code></li><li><code>-2^31 &lt;= nums[i] &lt;= 2^31 - 1</code></li><li><code>nums[i] != nums[i + 1]</code> for all valid <code>i</code>.</li></ul><h2 id="💡-approach-binary-search-for-peak" tabindex="-1">💡 Approach: Binary Search for Peak <a class="header-anchor" href="#💡-approach-binary-search-for-peak" aria-label="Permalink to &quot;💡 Approach: Binary Search for Peak&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>Since we need O(log n) time complexity, we must use binary search. The key insight is that we can always find a peak by moving towards the &quot;uphill&quot; direction.</p><p><strong>Key Observations:</strong></p><ol><li>Array boundaries are considered as -∞</li><li>Adjacent elements are never equal</li><li>We only need to find <strong>any</strong> peak, not necessarily the global maximum</li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Initialize pointers:</strong> <code>left = 0</code>, <code>right = nums.length - 1</code></li><li><strong>Binary search loop:</strong><ul><li>Calculate <code>mid = (left + right) / 2</code></li><li>Compare <code>nums[mid]</code> with <code>nums[mid + 1]</code>: <ul><li>If <code>nums[mid] &lt; nums[mid + 1]</code>: peak is on the right side, move <code>left = mid + 1</code></li><li>If <code>nums[mid] &gt; nums[mid + 1]</code>: peak is on the left side or current element, move <code>right = mid</code></li></ul></li></ul></li><li><strong>When <code>left == right</code>:</strong> we found a peak at index <code>left</code></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Always move towards the &quot;uphill&quot; direction</li><li>Boundary elements are treated as -∞</li><li>No need to check both neighbors, only compare with right neighbor</li><li>Loop condition is <code>left &lt; right</code> (not <code>left &lt;= right</code>)</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-c8_pD" id="tab-ZzIz-xr" checked><label data-title="Kotlin" for="tab-ZzIz-xr">Kotlin</label><input type="radio" name="group-c8_pD" id="tab-J2HYBNM"><label data-title="TypeScript" for="tab-J2HYBNM">TypeScript</label><input type="radio" name="group-c8_pD" id="tab-b0sG5iG"><label data-title="Java" for="tab-b0sG5iG">Java</label><input type="radio" name="group-c8_pD" id="tab-SUyMWRn"><label data-title="Python" for="tab-SUyMWRn">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun findPeakElement(nums: IntArray): Int {
    var left = 0
    var right = nums.size - 1
    
    while (left &lt; right) {
        val mid = left + (right - left) / 2
        
        if (nums[mid] &lt; nums[mid + 1]) {
            left = mid + 1
        } else {
            right = mid
        }
    }
    
    return left
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function findPeakElement(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left &lt; right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] &lt; nums[mid + 1]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int findPeakElement(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left &lt; right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] &lt; nums[mid + 1]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def findPeakElement(self, nums: List[int]) -&gt; int:
        left, right = 0, len(nums) - 1
        
        while left &lt; right:
            mid = (left + right) // 2
            
            if nums[mid] &lt; nums[mid + 1]:
                left = mid + 1
            else:
                right = mid
        
        return left
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(log n), binary search reduces search space by half each iteration</li><li><strong>Space Complexity:</strong> O(1), constant extra space used</li></ul>`,23))])}const k=a(c,[["render",m]]);export{v as __pageData,k as default};
