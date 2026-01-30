import{_ as n,C as l,c as o,o as s,j as t,ag as i,G as r,a as p}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"136. Single Number","description":"","frontmatter":{},"headers":[],"relativePath":"bit-manipulation/136.md","filePath":"bit-manipulation/136.md"}'),c={name:"bit-manipulation/136.md"},u={id:"_136-single-number",tabindex:"-1"};function d(m,e,g,h,b,v){const a=l("Badge");return s(),o("div",null,[t("h1",u,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/single-number/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"136. Single Number",-1)),r(a,{type:"info",text:"Easy"}),e[1]||(e[1]=p()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_136-single-number","aria-label":'Permalink to "[136. Single Number](https://leetcode.com/problems/single-number/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="info" text="Easy" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>Given a <strong>non-empty</strong> array of integers <code>nums</code>, every element appears twice except for one. Find that single one.</p><p>You must implement a solution with linear runtime complexity and use only constant extra space.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [2,2,1]
Output: 1
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [4,1,2,1,2]
Output: 4
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1]
Output: 1
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 3 * 10^4</code></li><li><code>-3 * 10^4 &lt;= nums[i] &lt;= 3 * 10^4</code></li><li>Each element in the array appears twice except for one element which appears only once.</li></ul><h2 id="💡-approach-xor-to-cancel-duplicates" tabindex="-1">💡 Approach: XOR to Cancel Duplicates <a class="header-anchor" href="#💡-approach-xor-to-cancel-duplicates" aria-label="Permalink to &quot;💡 Approach: XOR to Cancel Duplicates&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>XOR has two useful properties:</p><ul><li><code>a ^ a = 0</code>: a number XOR itself cancels out.</li><li><code>a ^ 0 = a</code>: a number XOR 0 remains unchanged.</li></ul><p>Since all numbers except one appear exactly twice, XORing all numbers will cancel out the duplicates and leave the single number.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li>Initialize <code>result = 0</code>.</li><li>Iterate through each number <code>num</code> in <code>nums</code>: <ul><li>Update <code>result = result ^ num</code>.</li></ul></li><li>Return <code>result</code>.</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>XOR is commutative and associative, so order does not matter.</li><li>Works in O(n) time and O(1) space.</li><li>No need for extra data structures like hash sets.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-XNTfo" id="tab-F6LaCrN" checked><label data-title="Kotlin" for="tab-F6LaCrN">Kotlin</label><input type="radio" name="group-XNTfo" id="tab-9E1mlkm"><label data-title="TypeScript" for="tab-9E1mlkm">TypeScript</label><input type="radio" name="group-XNTfo" id="tab-BmlIMQL"><label data-title="Java" for="tab-BmlIMQL">Java</label><input type="radio" name="group-XNTfo" id="tab-vaiAp52"><label data-title="Python" for="tab-vaiAp52">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun singleNumber(nums: IntArray): Int {
        var result = 0
        for (num in nums) {
            result = result xor num
        }
        return result
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function singleNumber(nums: number[]): number {
    let result = 0
    for (const num of nums) {
        result ^= num
    }
    return result
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num;
        }
        return result;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def singleNumber(self, nums: List[int]) -&gt; int:
        result = 0
        for num in nums:
            result ^= num
        return result
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), single pass through the array.</li><li><strong>Space Complexity:</strong> O(1), constant extra space.</li></ul>`,23))])}const x=n(c,[["render",d]]);export{f as __pageData,x as default};
