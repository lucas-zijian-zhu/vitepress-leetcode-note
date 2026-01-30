import{_ as t,c as n,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"169. Majority Element","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/169.md","filePath":"array-string/169.md"}'),i={name:"array-string/169.md"};function l(r,e,s,d,c,p){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="_169-majority-element" tabindex="-1"><a href="https://leetcode.com/problems/majority-element/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">169. Majority Element</a> <a class="header-anchor" href="#_169-majority-element" aria-label="Permalink to &quot;[169. Majority Element](https://leetcode.com/problems/majority-element/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an array <code>nums</code> of size <code>n</code>, return the majority element.</p><p>The majority element is the element that appears more than <code>⌊n / 2⌋</code> times. You may assume that the majority element always exists in the array.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [3,2,3]
Output: 3
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [2,2,1,1,1,2,2]
Output: 2
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>n == nums.length</code></li><li><code>1 &lt;= n &lt;= 5 * 10^4</code></li><li><code>-10^9 &lt;= nums[i] &lt;= 10^9</code></li></ul><p><strong>Follow-up:</strong> Could you solve the problem in linear time and in <code>O(1)</code> space?</p><h2 id="approach-—-boyer-moore-voting-algorithm" tabindex="-1">Approach — Boyer-Moore Voting Algorithm <a class="header-anchor" href="#approach-—-boyer-moore-voting-algorithm" aria-label="Permalink to &quot;Approach — Boyer-Moore Voting Algorithm&quot;">​</a></h2><ul><li>The array is traversed only once.</li><li>Maintain: <ul><li>A candidate for the majority element.</li><li>A counter for the candidate.</li></ul></li><li>Initially, the counter is <code>0</code>.</li><li>For each number in the array: <ul><li>If the counter is <code>0</code>, set the current number as the candidate.</li><li>If the current number equals the candidate, increment the counter.</li><li>Otherwise, decrement the counter.</li></ul></li><li>After one pass, the candidate is guaranteed to be the majority element.</li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-2M9TH" id="tab-hry49kW" checked><label data-title="Kotlin" for="tab-hry49kW">Kotlin</label><input type="radio" name="group-2M9TH" id="tab-ydZu23b"><label data-title="TypeScript" for="tab-ydZu23b">TypeScript</label><input type="radio" name="group-2M9TH" id="tab-zKzgrJ7"><label data-title="Java" for="tab-zKzgrJ7">Java</label><input type="radio" name="group-2M9TH" id="tab-i6VhSFf"><label data-title="Python" for="tab-i6VhSFf">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun majorityElement(nums: IntArray): Int {
        var count = 0
        var candidate = 0

        for (num in nums) {
            if (count == 0) {
                candidate = num
            }

            if (num == candidate) {
                count++
            } else {
                count--
            }
        }

        return candidate
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function majorityElement(nums: number[]): number {
    let count = 0;
    let candidate = 0;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }

        if (num === candidate) {
            count++;
        } else {
            count--;
        }
    }

    return candidate;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int majorityElement(int[] nums) {
        int count = 0;
        int candidate = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }

            if (num == candidate) {
                count++;
            } else {
                count--;
            }
        }

        return candidate;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def majorityElement(self, nums: List[int]) -&gt; int:
        count = 0
        candidate = 0

        for num in nums:
            if count == 0:
                candidate = num

            if num == candidate:
                count += 1
            else:
                count -= 1

        return candidate
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Type</th><th>Complexity</th></tr></thead><tbody><tr><td><strong>Time Complexity</strong></td><td><code>O(n)</code></td></tr><tr><td><strong>Space Complexity</strong></td><td><code>O(1)</code></td></tr></tbody></table><h3 id="explanation" tabindex="-1">Explanation: <a class="header-anchor" href="#explanation" aria-label="Permalink to &quot;Explanation:&quot;">​</a></h3><ul><li><p><strong>Time Complexity:</strong><br> We iterate through the entire array exactly once to determine the majority element → linear time, <code>O(n)</code>.</p></li><li><p><strong>Space Complexity:</strong><br> We only use two extra variables (<code>count</code> and <code>candidate</code>) regardless of input size → constant space, <code>O(1)</code>.</p></li></ul>`,19)]))}const h=t(i,[["render",l]]);export{m as __pageData,h as default};
