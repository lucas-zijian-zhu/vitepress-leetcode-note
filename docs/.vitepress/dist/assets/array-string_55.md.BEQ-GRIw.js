import{_ as t,c as a,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"55. Jump Game","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/55.md","filePath":"array-string/55.md"}'),s={name:"array-string/55.md"};function r(i,e,l,p,c,d){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="_55-jump-game" tabindex="-1"><a href="https://leetcode.com/problems/jump-game/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">55. Jump Game</a> <a class="header-anchor" href="#_55-jump-game" aria-label="Permalink to &quot;[55. Jump Game](https://leetcode.com/problems/jump-game/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given an integer array <code>nums</code>. You are initially positioned at the array&#39;s <strong>first index</strong> , and each element in the array represents your maximum jump length at that position.</p><p>Return <code>true</code> if you can reach the last index, or <code>false</code> otherwise.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 10^4</code></li><li><code>0 &lt;= nums[i] &lt;= 10^5</code></li></ul><h2 id="🚀-approach" tabindex="-1">🚀 Approach <a class="header-anchor" href="#🚀-approach" aria-label="Permalink to &quot;🚀 Approach&quot;">​</a></h2><p>We use a <strong>greedy algorithm</strong>:</p><ul><li>Track the farthest position you can reach so far (<code>farthest</code>).</li><li>Iterate through each index: <ul><li>If the current index <code>i</code> is greater than <code>farthest</code>, it means you cannot reach this position, so return <code>false</code>.</li><li>Otherwise, update <code>farthest = max(farthest, i + nums[i])</code>.</li></ul></li><li>If we can reach or pass the last index, return <code>true</code>.</li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-a-WNU" id="tab-25Pb1yf" checked><label data-title="Kotlin" for="tab-25Pb1yf">Kotlin</label><input type="radio" name="group-a-WNU" id="tab-LMVkgyc"><label data-title="TypeScript" for="tab-LMVkgyc">TypeScript</label><input type="radio" name="group-a-WNU" id="tab-HXm0NWC"><label data-title="Java" for="tab-HXm0NWC">Java</label><input type="radio" name="group-a-WNU" id="tab-tWMyBUe"><label data-title="Python" for="tab-tWMyBUe">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun canJump(nums: IntArray): Boolean {
        var farthest = 0
        for (i in nums.indices) {
            if (i &gt; farthest) {
                return false
            }
            farthest = maxOf(farthest, i + nums[i])
        }
        return true
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function canJump(nums: number[]): boolean {
    let farthest = 0;
    
    for (let i = 0; i &lt; nums.length; i++) {
        if (i &gt; farthest) {
            return false;
        }
        farthest = Math.max(farthest, i + nums[i]);
    }
    
    return true;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean canJump(int[] nums) {
        int farthest = 0;
        
        for (int i = 0; i &lt; nums.length; i++) {
            if (i &gt; farthest) {
                return false;
            }
            farthest = Math.max(farthest, i + nums[i]);
        }
        
        return true;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def canJump(self, nums: List[int]) -&gt; bool:
        farthest = 0
        
        for i in range(len(nums)):
            if i &gt; farthest:
                return False
            farthest = max(farthest, i + nums[i])
        
        return True
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Complexity</th><th>Value</th></tr></thead><tbody><tr><td>⏱ Time</td><td><strong>O(n)</strong> — We iterate through the array once.</td></tr><tr><td>🧠 Space</td><td><strong>O(1)</strong> — We only use a single integer <code>farthest</code> for tracking.</td></tr></tbody></table>`,17)]))}const m=t(s,[["render",r]]);export{h as __pageData,m as default};
