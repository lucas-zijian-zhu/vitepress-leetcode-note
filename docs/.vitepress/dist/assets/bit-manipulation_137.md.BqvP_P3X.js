import{_ as a,C as o,c as i,o as s,j as t,ag as l,G as r,a as c}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"137. Single Number II","description":"","frontmatter":{},"headers":[],"relativePath":"bit-manipulation/137.md","filePath":"bit-manipulation/137.md"}'),p={name:"bit-manipulation/137.md"},u={id:"_137-single-number-ii",tabindex:"-1"};function d(m,e,h,g,b,v){const n=o("Badge");return s(),i("div",null,[t("h1",u,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/single-number-ii/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"137. Single Number II",-1)),r(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=c()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_137-single-number-ii","aria-label":'Permalink to "[137. Single Number II](https://leetcode.com/problems/single-number-ii/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=l(`<p>Given an integer array <code>nums</code> where every element appears <strong>three times</strong> except for one, which appears <strong>exactly once</strong>. Find the single element and return it.</p><p>You must implement a solution with linear runtime complexity and use only constant extra space.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [2,2,3,2]
Output: 3
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [0,1,0,1,0,1,99]
Output: 99
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 3 * 10^4</code></li><li><code>-2^31 &lt;= nums[i] &lt;= 2^31 - 1</code></li><li>Each element in <code>nums</code> appears exactly <strong>three times</strong> except for one element which appears <strong>once</strong>.</li></ul><h2 id="💡-approach-bit-counting-mod-3" tabindex="-1">💡 Approach: Bit Counting Mod 3 <a class="header-anchor" href="#💡-approach-bit-counting-mod-3" aria-label="Permalink to &quot;💡 Approach: Bit Counting Mod 3&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>If we count how many times each bit (0..31) is set across all numbers, multiples of three belong to the triplicates. The leftover bit counts (modulo 3) belong to the unique number.</p><p><strong>Key Insight:</strong> For each bit position, the total count of set bits modulo 3 equals that bit in the single number.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li>Initialize <code>result = 0</code>.</li><li>For each bit position <code>i</code> from 0 to 31: <ul><li>Count how many numbers have bit <code>i</code> set.</li><li>If count % 3 != 0, set bit <code>i</code> in <code>result</code>.</li></ul></li><li>Handle sign bit (if bit 31 is set, convert to negative using two&#39;s complement).</li></ol><h3 id="alternative-bitmask-state-machine" tabindex="-1">Alternative: Bitmask State Machine <a class="header-anchor" href="#alternative-bitmask-state-machine" aria-label="Permalink to &quot;Alternative: Bitmask State Machine&quot;">​</a></h3><p>Track bits that have appeared once (<code>ones</code>) and twice (<code>twos</code>). For each number:</p><ul><li>Update <code>ones</code> with bits seen once but not twice: <code>ones = (ones ^ num) &amp; ~twos</code></li><li>Update <code>twos</code> with bits seen twice but not once: <code>twos = (twos ^ num) &amp; ~ones</code></li></ul><p>After processing all numbers, <code>ones</code> holds the single number.</p><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Both methods run in O(n) time and O(1) extra space.</li><li>The bit counting method is straightforward; the state machine avoids looping over bits.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-6sgyQ" id="tab-WS_oRSn" checked><label data-title="Kotlin - Bit Counting" for="tab-WS_oRSn">Kotlin - Bit Counting</label><input type="radio" name="group-6sgyQ" id="tab-j1372XC"><label data-title="Kotlin - Bitmask State Machine" for="tab-j1372XC">Kotlin - Bitmask State Machine</label><input type="radio" name="group-6sgyQ" id="tab-Xa95j9t"><label data-title="TypeScript - Bitmask State Machine" for="tab-Xa95j9t">TypeScript - Bitmask State Machine</label><input type="radio" name="group-6sgyQ" id="tab-VzFS8j7"><label data-title="Java - Bitmask State Machine" for="tab-VzFS8j7">Java - Bitmask State Machine</label><input type="radio" name="group-6sgyQ" id="tab-EigPhPb"><label data-title="Python - Bitmask State Machine" for="tab-EigPhPb">Python - Bitmask State Machine</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun singleNumber(nums: IntArray): Int {
        var result = 0
        for (i in 0 until 32) {
            var count = 0
            for (num in nums) {
                if ((num shr i) and 1 == 1) count++
            }
            if (count % 3 != 0) {
                result = result or (1 shl i)
            }
        }
        return result
    }
}
</code></pre></div><div class="language-kotlin vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun singleNumber(nums: IntArray): Int {
        var ones = 0
        var twos = 0
        for (num in nums) {
            ones = (ones xor num) and twos.inv()
            twos = (twos xor num) and ones.inv()
        }
        return ones
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function singleNumber(nums: number[]): number {
    let ones = 0
    let twos = 0
    for (const num of nums) {
        ones = (ones ^ num) &amp; ~twos
        twos = (twos ^ num) &amp; ~ones
    }
    return ones
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int singleNumber(int[] nums) {
        int ones = 0, twos = 0;
        for (int num : nums) {
            ones = (ones ^ num) &amp; ~twos;
            twos = (twos ^ num) &amp; ~ones;
        }
        return ones;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def singleNumber(self, nums: List[int]) -&gt; int:
        ones = 0
        twos = 0
        for num in nums:
            ones = (ones ^ num) &amp; ~twos
            twos = (twos ^ num) &amp; ~ones
        return ones
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), single pass through the array (plus 32 * n for bit counting variant).</li><li><strong>Space Complexity:</strong> O(1), constant extra space.</li></ul>`,24))])}const w=a(p,[["render",d]]);export{f as __pageData,w as default};
