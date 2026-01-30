import{_ as a,C as i,c as o,o as r,j as t,ag as l,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const b=JSON.parse('{"title":"35. Search Insert Position","description":"","frontmatter":{},"headers":[],"relativePath":"binary-search/35.md","filePath":"binary-search/35.md"}'),c={name:"binary-search/35.md"},p={id:"_35-search-insert-position",tabindex:"-1"};function u(g,e,h,m,f,v){const n=i("Badge");return r(),o("div",null,[t("h1",p,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/search-insert-position/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"35. Search Insert Position",-1)),s(n,{type:"warning",text:"Easy"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_35-search-insert-position","aria-label":'Permalink to "[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Easy" />"'},"​",-1))]),e[3]||(e[3]=l(`<p>Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.</p><p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,3,5,6], target = 5
Output: 2
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,3,5,6], target = 2
Output: 1
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,3,5,6], target = 7
Output: 4
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 10^4</code></li><li><code>-10^4 &lt;= nums[i] &lt;= 10^4</code></li><li><code>nums</code> contains <strong>distinct</strong> values sorted in <strong>ascending</strong> order.</li><li><code>-10^4 &lt;= target &lt;= 10^4</code></li></ul><h2 id="💡-approach-binary-search" tabindex="-1">💡 Approach: Binary Search <a class="header-anchor" href="#💡-approach-binary-search" aria-label="Permalink to &quot;💡 Approach: Binary Search&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic binary search problem. Since the array is sorted, we can use binary search to find the target value&#39;s position.</p><p><strong>Core Idea:</strong></p><ol><li>Use binary search to find the target value in the sorted array</li><li>If found, return its index</li><li>If not found, return the insertion position</li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Initialize pointers:</strong> <code>left = 0</code>, <code>right = nums.length - 1</code></li><li><strong>Calculate middle:</strong> <code>mid = (left + right) / 2</code></li><li><strong>Compare values:</strong><ul><li>If <code>nums[mid] == target</code>, return <code>mid</code></li><li>If <code>nums[mid] &lt; target</code>, search right half: <code>left = mid + 1</code></li><li>If <code>nums[mid] &gt; target</code>, search left half: <code>right = mid - 1</code></li></ul></li><li><strong>When loop ends:</strong> <code>left</code> is the insertion position</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Binary search on sorted array</li><li>When target not found, <code>left</code> pointer indicates insertion position</li><li>Handle edge cases (target larger than all elements)</li><li>Avoid integer overflow in mid calculation</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-9NxNu" id="tab-OsQmiA_" checked><label data-title="Kotlin" for="tab-OsQmiA_">Kotlin</label><input type="radio" name="group-9NxNu" id="tab-Rpkzc8U"><label data-title="TypeScript" for="tab-Rpkzc8U">TypeScript</label><input type="radio" name="group-9NxNu" id="tab-ZIk1hu4"><label data-title="Java" for="tab-ZIk1hu4">Java</label><input type="radio" name="group-9NxNu" id="tab-r9C_SUK"><label data-title="Python" for="tab-r9C_SUK">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun searchInsert(nums: IntArray, target: Int): Int {
    var left = 0
    var right = nums.size - 1
    
    while (left &lt;= right) {
        val mid = left + (right - left) / 2
        
        when {
            nums[mid] == target -&gt; return mid
            nums[mid] &lt; target -&gt; left = mid + 1
            else -&gt; right = mid - 1
        }
    }
    
    return left
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function searchInsert(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    
    while (left &lt;= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] &lt; target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        
        while (left &lt;= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] &lt; target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return left;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def searchInsert(self, nums: List[int], target: int) -&gt; int:
        left, right = 0, len(nums) - 1
        
        while left &lt;= right:
            mid = (left + right) // 2
            
            if nums[mid] == target:
                return mid
            elif nums[mid] &lt; target:
                left = mid + 1
            else:
                right = mid - 1
        
        return left
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(log n), binary search time complexity</li><li><strong>Space Complexity:</strong> O(1), constant extra space used</li></ul>`,23))])}const x=a(c,[["render",u]]);export{b as __pageData,x as default};
