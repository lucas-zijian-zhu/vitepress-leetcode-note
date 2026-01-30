import{_ as t,c as a,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"45. Jump Game II","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/45.md","filePath":"array-string/45.md"}'),s={name:"array-string/45.md"};function i(r,e,l,d,p,c){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="_45-jump-game-ii" tabindex="-1"><a href="https://leetcode.com/problems/jump-game-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">45. Jump Game II</a> <a class="header-anchor" href="#_45-jump-game-ii" aria-label="Permalink to &quot;[45. Jump Game II](https://leetcode.com/problems/jump-game-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given a <strong>0-indexed</strong> array of integers <code>nums</code> of length <code>n</code>. You are initially positioned at <code>nums[0]</code>.</p><p>Each element <code>nums[i]</code> represents the maximum length of a forward jump from index <code>i</code>. In other words, if you are at <code>nums[i]</code>, you can jump to any <code>nums[i + j]</code> where:</p><ul><li><code>0 &lt;= j &lt;= nums[i]</code> and</li><li><code>i + j &lt; n</code></li></ul><p>Return the minimum number of jumps to reach <code>nums[n - 1]</code>. The test cases are generated such that you can reach <code>nums[n - 1]</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [2,3,0,1,4]
Output: 2
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 10^4</code></li><li><code>0 &lt;= nums[i] &lt;= 1000</code></li><li>It&#39;s guaranteed that you can reach <code>nums[n - 1]</code>.</li></ul><h2 id="📋-approach" tabindex="-1">📋 Approach <a class="header-anchor" href="#📋-approach" aria-label="Permalink to &quot;📋 Approach&quot;">​</a></h2><p>We solve this problem using a <strong>greedy algorithm</strong>:</p><ul><li>Track <code>farthest</code>, which is the farthest index we can reach at the current step.</li><li>Track <code>end</code>, which is the end of the current jump range.</li><li>Track <code>step</code>, which is the number of jumps taken so far.</li></ul><p>We iterate from <code>0</code> to <code>n-2</code> (since we don’t need to jump from the last position).<br> Whenever <code>i == end</code>, we’ve reached the end of the current jump range, so we:</p><ul><li>Increment <code>step</code></li><li>Move <code>end</code> to <code>farthest</code></li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-QDI9J" id="tab-WIWV6rG" checked><label data-title="Kotlin" for="tab-WIWV6rG">Kotlin</label><input type="radio" name="group-QDI9J" id="tab-40mq7Zq"><label data-title="TypeScript" for="tab-40mq7Zq">TypeScript</label><input type="radio" name="group-QDI9J" id="tab-5Ld0qEC"><label data-title="Java" for="tab-5Ld0qEC">Java</label><input type="radio" name="group-QDI9J" id="tab-zMLvCvU"><label data-title="Python" for="tab-zMLvCvU">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun jump(nums: IntArray): Int {
        var farthest = 0
        var end = 0
        var step = 0

        for (i in 0 until nums.size - 1) {
            farthest = maxOf(farthest, i + nums[i])
            if (i == end) {
                end = farthest
                step++
            }
        }

        return step
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function jump(nums: number[]): number {
    let farthest = 0;
    let end = 0;
    let step = 0;

    for (let i = 0; i &lt; nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === end) {
            end = farthest;
            step++;
        }
    }

    return step;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int jump(int[] nums) {
        int farthest = 0;
        int end = 0;
        int step = 0;

        for (int i = 0; i &lt; nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == end) {
                end = farthest;
                step++;
            }
        }

        return step;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def jump(self, nums: List[int]) -&gt; int:
        farthest = 0
        end = 0
        step = 0

        for i in range(len(nums) - 1):
            farthest = max(farthest, i + nums[i])
            if i == end:
                end = farthest
                step += 1

        return step
</code></pre></div></div></div><h2 id="⏳-complexity" tabindex="-1">⏳ Complexity <a class="header-anchor" href="#⏳-complexity" aria-label="Permalink to &quot;⏳ Complexity&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Complexity Type</th><th>Value</th></tr></thead><tbody><tr><td><strong>Time Complexity</strong></td><td>O(n)</td></tr><tr><td><strong>Space Complexity</strong></td><td>O(1)</td></tr></tbody></table><ul><li><strong>Time:</strong> We iterate through the array exactly once, so the time complexity is linear with respect to the size of the input array.</li><li><strong>Space:</strong> We only use a few integer variables (<code>farthest</code>, <code>end</code>, <code>step</code>), which takes constant space.</li></ul>`,22)]))}const h=t(s,[["render",i]]);export{m as __pageData,h as default};
