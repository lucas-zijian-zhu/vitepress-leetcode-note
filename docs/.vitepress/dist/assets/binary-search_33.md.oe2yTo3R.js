import{_ as a,C as i,c as s,o as l,j as t,ag as r,G as o,a as d}from"./chunks/framework.Bw-5EFTY.js";const v=JSON.parse('{"title":"33. Search in Rotated Sorted Array","description":"","frontmatter":{},"headers":[],"relativePath":"binary-search/33.md","filePath":"binary-search/33.md"}'),c={name:"binary-search/33.md"},m={id:"_33-search-in-rotated-sorted-array",tabindex:"-1"};function h(p,e,u,g,f,y){const n=i("Badge");return l(),s("div",null,[t("h1",m,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/search-in-rotated-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"33. Search in Rotated Sorted Array",-1)),o(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_33-search-in-rotated-sorted-array","aria-label":'Permalink to "[33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=r(`<p>There is an integer array <code>nums</code> sorted in ascending order (with <strong>distinct</strong> values).</p><p>Prior to being passed to your function, <code>nums</code> is <strong>possibly left rotated</strong> at an unknown index <code>k</code> (<code>1 &lt;= k &lt; nums.length</code>) such that the resulting array is <code>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code> (<strong>0-indexed</strong>). For example, <code>[0,1,2,4,5,6,7]</code> might be left rotated by <code>3</code> indices and become <code>[4,5,6,7,0,1,2]</code>.</p><p>Given the array <code>nums</code> <strong>after</strong> the possible rotation and an integer <code>target</code>, return the index of <code>target</code> if it is in <code>nums</code>, or <code>-1</code> if it is not in <code>nums</code>.</p><p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1], target = 0
Output: -1
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 5000</code></li><li><code>-10^4 &lt;= nums[i] &lt;= 10^4</code></li><li>All values of <code>nums</code> are <strong>unique</strong>.</li><li><code>nums</code> is an ascending array that is possibly rotated.</li><li><code>-10^4 &lt;= target &lt;= 10^4</code></li></ul><h2 id="💡-approach-binary-search-on-rotated-array" tabindex="-1">💡 Approach: Binary Search on Rotated Array <a class="header-anchor" href="#💡-approach-binary-search-on-rotated-array" aria-label="Permalink to &quot;💡 Approach: Binary Search on Rotated Array&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>The key insight is that in a rotated sorted array, at least one half is always sorted. We can use this property to determine which half to search.</p><p><strong>Key Observations:</strong></p><ol><li>At least one half of the array is always sorted</li><li>We can determine which half is sorted by comparing <code>nums[left]</code> with <code>nums[mid]</code></li><li>If we know which half is sorted, we can check if target lies in that range</li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Initialize pointers:</strong> <code>left = 0</code>, <code>right = nums.length - 1</code></li><li><strong>Binary search loop:</strong><ul><li>Calculate <code>mid = (left + right) / 2</code></li><li>If <code>nums[mid] == target</code>, return <code>mid</code></li><li><strong>Determine which half is sorted:</strong><ul><li>If <code>nums[left] &lt;= nums[mid]</code>: left half is sorted <ul><li>If <code>nums[left] &lt;= target &lt; nums[mid]</code>: search left half</li><li>Else: search right half</li></ul></li><li>Else: right half is sorted <ul><li>If <code>nums[mid] &lt; target &lt;= nums[right]</code>: search right half</li><li>Else: search left half</li></ul></li></ul></li></ul></li><li><strong>If not found:</strong> return <code>-1</code></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Always check which half is sorted first</li><li>Use sorted half to determine search direction</li><li>Handle edge cases (single element, target not found)</li><li>Maintain O(log n) time complexity</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-tEfms" id="tab-m0ZbmZa" checked><label data-title="Kotlin" for="tab-m0ZbmZa">Kotlin</label><input type="radio" name="group-tEfms" id="tab-WHjZRS3"><label data-title="TypeScript" for="tab-WHjZRS3">TypeScript</label><input type="radio" name="group-tEfms" id="tab-YelrXc0"><label data-title="Java" for="tab-YelrXc0">Java</label><input type="radio" name="group-tEfms" id="tab-veDZ5q3"><label data-title="Python" for="tab-veDZ5q3">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun search(nums: IntArray, target: Int): Int {
    var left = 0
    var right = nums.size - 1
    
    while (left &lt;= right) {
        val mid = left + (right - left) / 2
        
        if (nums[mid] == target) {
            return mid
        }
        
        // Check which half is sorted
        if (nums[left] &lt;= nums[mid]) {
            // Left half is sorted
            if (nums[left] &lt;= target &amp;&amp; target &lt; nums[mid]) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        } else {
            // Right half is sorted
            if (nums[mid] &lt; target &amp;&amp; target &lt;= nums[right]) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
    }
    
    return -1
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left &lt;= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] === target) {
            return mid;
        }
        
        // Check which half is sorted
        if (nums[left] &lt;= nums[mid]) {
            // Left half is sorted
            if (nums[left] &lt;= target &amp;&amp; target &lt; nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (nums[mid] &lt; target &amp;&amp; target &lt;= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left &lt;= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            }
            
            // Check which half is sorted
            if (nums[left] &lt;= nums[mid]) {
                // Left half is sorted
                if (nums[left] &lt;= target &amp;&amp; target &lt; nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (nums[mid] &lt; target &amp;&amp; target &lt;= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        
        return -1;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def search(self, nums: List[int], target: int) -&gt; int:
        left, right = 0, len(nums) - 1
        
        while left &lt;= right:
            mid = (left + right) // 2
            
            if nums[mid] == target:
                return mid
            
            # Check which half is sorted
            if nums[left] &lt;= nums[mid]:
                # Left half is sorted
                if nums[left] &lt;= target &lt; nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                # Right half is sorted
                if nums[mid] &lt; target &lt;= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        
        return -1
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(log n), binary search reduces search space by half each iteration</li><li><strong>Space Complexity:</strong> O(1), constant extra space used</li></ul>`,25))])}const k=a(c,[["render",h]]);export{v as __pageData,k as default};
