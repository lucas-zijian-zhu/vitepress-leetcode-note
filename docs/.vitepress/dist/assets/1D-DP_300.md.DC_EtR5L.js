import{_ as n,c as t,o as a,ag as l}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"300. Longest Increasing Subsequence","description":"","frontmatter":{},"headers":[],"relativePath":"1D-DP/300.md","filePath":"1D-DP/300.md"}'),s={name:"1D-DP/300.md"};function o(i,e,r,c,d,p){return a(),t("div",null,e[0]||(e[0]=[l(`<h1 id="_300-longest-increasing-subsequence" tabindex="-1"><a href="https://leetcode.com/problems/longest-increasing-subsequence/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">300. Longest Increasing Subsequence</a> <a class="header-anchor" href="#_300-longest-increasing-subsequence" aria-label="Permalink to &quot;[300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an integer array <code>nums</code>, return the length of the longest **strictly increasing ** <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rs:" data-state="closed" class=""><strong>subsequence</strong></button>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [0,1,0,3,2,3]
Output: 4
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [7,7,7,7,7,7,7]
Output: 1
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 2500</code></li><li><code>-10^4 &lt;= nums[i] &lt;= 10^4</code></li></ul><p><b>Follow up:</b>Can you come up with an algorithm that runs in<code>O(n log(n))</code> time complexity?</p><h2 id="💡-approach-greedy-binary-search-o-n-log-n" tabindex="-1">💡 Approach: Greedy + Binary Search (<code>O(n log n)</code>) <a class="header-anchor" href="#💡-approach-greedy-binary-search-o-n-log-n" aria-label="Permalink to &quot;💡 Approach: Greedy + Binary Search (\`O(n log n)\`)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>Maintain an auxiliary array <strong><code>tails</code></strong> where<br><code>tails[k]</code> = the <strong>smallest possible tail value</strong> of any increasing subsequence of length <code>k + 1</code>.<br> While scanning <code>nums</code>, for every element <code>x</code>:</p><ol><li>Use binary search in <code>tails</code> to find the first index <code>idx</code> where <code>tails[idx] ≥ x</code>.</li><li>If <code>idx == tails.size</code>, append <code>x</code> (we found a longer LIS);<br> otherwise replace <code>tails[idx] = x</code> (keep the tail as small as possible).</li></ol><p>The <strong>length of <code>tails</code></strong> after processing all numbers is exactly the LIS length.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-ZRkZq" id="tab-Laojl56" checked><label data-title="Kotlin" for="tab-Laojl56">Kotlin</label><input type="radio" name="group-ZRkZq" id="tab-qQVclcf"><label data-title="TypeScript" for="tab-qQVclcf">TypeScript</label><input type="radio" name="group-ZRkZq" id="tab-Hcx1AnW"><label data-title="Java" for="tab-Hcx1AnW">Java</label><input type="radio" name="group-ZRkZq" id="tab-u_1Qtm2"><label data-title="Python" for="tab-u_1Qtm2">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun lengthOfLIS(nums: IntArray): Int {
        val tails = IntArray(nums.size)           // tails[0..len-1] is valid
        var len = 0                               // current LIS length

        for (x in nums) {
            // binary search for first tails[idx] &gt;= x
            var l = 0
            var r = len                           // [l, r)
            while (l &lt; r) {
                val m = (l + r) ushr 1
                if (tails[m] &gt;= x) r = m
                else l = m + 1
            }
            tails[l] = x                          // overwrite or append
            if (l == len) len++                   // found a longer subsequence
        }
        return len
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function lengthOfLIS(nums: number[]): number {
    const tails: number[] = new Array(nums.length);
    let len = 0;

    for (const x of nums) {
        // Binary search for first tails[idx] &gt;= x
        let l = 0;
        let r = len;
        while (l &lt; r) {
            const m = Math.floor((l + r) / 2);
            if (tails[m] &gt;= x) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        tails[l] = x; // Overwrite or append
        if (l === len) len++; // Found a longer subsequence
    }
    
    return len;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int len = 0;

        for (int x : nums) {
            // Binary search for first tails[idx] &gt;= x
            int l = 0, r = len;
            while (l &lt; r) {
                int m = (l + r) / 2;
                if (tails[m] &gt;= x) {
                    r = m;
                } else {
                    l = m + 1;
                }
            }
            tails[l] = x; // Overwrite or append
            if (l == len) len++; // Found a longer subsequence
        }
        
        return len;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def lengthOfLIS(self, nums: List[int]) -&gt; int:
        tails = [0] * len(nums)
        length = 0

        for x in nums:
            # Binary search for first tails[idx] &gt;= x
            l, r = 0, length
            while l &lt; r:
                m = (l + r) // 2
                if tails[m] &gt;= x:
                    r = m
                else:
                    l = m + 1
            tails[l] = x  # Overwrite or append
            if l == length:
                length += 1  # Found a longer subsequence
        
        return length
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Complexity Type</th><th>Big-O</th><th>Reasoning</th></tr></thead><tbody><tr><td><strong>Time</strong></td><td><code>O(n log n)</code></td><td>For each of the <code>n</code> elements we perform a binary search (<code>log n</code>) inside the <code>tails</code> array.</td></tr><tr><td><strong>Space</strong></td><td><code>O(n)</code></td><td>The auxiliary array <code>tails</code> stores at most <code>n</code> integers.</td></tr></tbody></table>`,21)]))}const h=n(s,[["render",o]]);export{g as __pageData,h as default};
