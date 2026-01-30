import{_ as t,c as a,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"1. Two Sum","description":"","frontmatter":{},"headers":[],"relativePath":"hashmap/1.md","filePath":"hashmap/1.md"}'),s={name:"hashmap/1.md"};function i(l,e,p,r,c,d){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="_1-two-sum" tabindex="-1"><a href="https://leetcode.com/problems/two-sum/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">1. Two Sum</a> <a class="header-anchor" href="#_1-two-sum" aria-label="Permalink to &quot;[1. Two Sum](https://leetcode.com/problems/two-sum/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an array of integers <code>nums</code>and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p><p>You may assume that each input would have <strong>exactly one solution</strong> , and you may not use the same element twice.</p><p>You can return the answer in any order.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [3,2,4], target = 6
Output: [1,2]
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [3,3], target = 6
Output: [0,1]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>2 &lt;= nums.length &lt;= 10^4</code></li><li><code>-10^9 &lt;= nums[i] &lt;= 10^9</code></li><li><code>-10^9 &lt;= target &lt;= 10^9</code></li><li><strong>Only one valid answer exists.</strong></li></ul><p><strong>Follow-up:</strong> Can you come up with an algorithm that is less than <code>O(n^2)</code>time complexity?</p><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>We want to find two indices <code>i</code> and <code>j</code> such that <code>nums[i] + nums[j] == target</code>.<br> A brute-force approach would check all pairs, which costs <code>O(n^2)</code> time.<br> We can optimize with a <strong>hash map</strong> to store values we have seen and their indices.</p><p>Steps:</p><ol><li>Iterate through <code>nums</code>.</li><li>For each element <code>x = nums[i]</code>, compute <code>complement = target - x</code>.</li><li>If <code>complement</code> is already in the map, return indices <code>[map[complement], i]</code>.</li><li>Otherwise, add <code>(x -&gt; i)</code> into the map.</li></ol><p>This ensures each number is processed once.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-O-_De" id="tab-Fj1BgjG" checked><label data-title="Kotlin" for="tab-Fj1BgjG">Kotlin</label><input type="radio" name="group-O-_De" id="tab-yLb2Jwe"><label data-title="TypeScript" for="tab-yLb2Jwe">TypeScript</label><input type="radio" name="group-O-_De" id="tab-fH3jxbo"><label data-title="Java" for="tab-fH3jxbo">Java</label><input type="radio" name="group-O-_De" id="tab-gXDH4l5"><label data-title="Python" for="tab-gXDH4l5">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        val map = HashMap&lt;Int, Int&gt;()
        for (i in nums.indices) {
            val complement = target - nums[i]
            if (map.containsKey(complement)) {
                return intArrayOf(map[complement]!!, i)
            }
            map[nums[i]] = i
        }
        return intArrayOf() // Should never reach here if one solution guaranteed
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function twoSum(nums: number[], target: number): number[] {
    const map = new Map&lt;number, number&gt;();
    for (let i = 0; i &lt; nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    return []; // Should never reach here if one solution guaranteed
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map&lt;Integer, Integer&gt; map = new HashMap&lt;&gt;();
        for (int i = 0; i &lt; nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{}; // Should never reach here if one solution guaranteed
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def twoSum(self, nums: List[int], target: int) -&gt; List[int]:
        map_dict = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in map_dict:
                return [map_dict[complement], i]
            map_dict[num] = i
        return []  # Should never reach here if one solution guaranteed
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><p><strong>Time Complexity:</strong> O(n)<br> Each element in the array is visited once, and hash map operations (lookup/insert) are O(1) on average.</p></li><li><p><strong>Space Complexity:</strong> O(n)<br> In the worst case, we may store all n elements in the hash map.</p></li></ul>`,22)]))}const h=t(s,[["render",i]]);export{m as __pageData,h as default};
