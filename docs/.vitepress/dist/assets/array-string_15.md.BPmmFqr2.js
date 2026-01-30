import{_ as n,c as e,o as s,ag as i}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"15. 3Sum","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/15.md","filePath":"array-string/15.md"}'),a={name:"array-string/15.md"};function l(o,t,r,u,p,d){return s(),e("div",null,t[0]||(t[0]=[i(`<h1 id="_15-3sum" tabindex="-1"><a href="https://leetcode.com/problems/3sum/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">15. 3Sum</a> <a class="header-anchor" href="#_15-3sum" aria-label="Permalink to &quot;[15. 3Sum](https://leetcode.com/problems/3sum/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p><p>Notice that the solution set must not contain duplicate triplets.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>3 &lt;= nums.length &lt;= 3000</code></li><li><code>-10^5 &lt;= nums[i] &lt;= 10^5</code></li></ul><h2 id="approach-sort-two-pointers" tabindex="-1">Approach: Sort + Two Pointers <a class="header-anchor" href="#approach-sort-two-pointers" aria-label="Permalink to &quot;Approach: Sort + Two Pointers&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>To find all unique triplets that sum to zero, we sort the array first. For each element <code>nums[i]</code>, we use two pointers <code>left</code> and <code>right</code> to find pairs <code>nums[j]</code> and <code>nums[k]</code> such that:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">nums[i] + nums[left] + nums[right] == 0
</code></pre></div><h3 id="steps" tabindex="-1">Steps <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps&quot;">​</a></h3><ol><li><strong>Sort</strong> the array.</li><li>Loop through <code>nums[i]</code> from index <code>0</code> to <code>n - 3</code>: <ul><li>Skip duplicates (<code>if nums[i] == nums[i-1]</code>)</li><li>Use two pointers: <code>left = i + 1</code>, <code>right = n - 1</code></li><li>Move pointers inward based on the sum: <ul><li>If sum == 0 → add triplet, move both pointers, skip duplicates</li><li>If sum &lt; 0 → move left++</li><li>If sum &gt; 0 → move right--</li></ul></li></ul></li><li>Store results in a list and return.</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-hUNTe" id="tab-_EVU2Pd" checked><label data-title="Kotlin" for="tab-_EVU2Pd">Kotlin</label><input type="radio" name="group-hUNTe" id="tab-jmu8uon"><label data-title="TypeScript" for="tab-jmu8uon">TypeScript</label><input type="radio" name="group-hUNTe" id="tab-Z5bDZN9"><label data-title="Java" for="tab-Z5bDZN9">Java</label><input type="radio" name="group-hUNTe" id="tab-lo_Bnja"><label data-title="Python" for="tab-lo_Bnja">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun threeSum(nums: IntArray): List&lt;List&lt;Int&gt;&gt; {
    val res = mutableListOf&lt;List&lt;Int&gt;&gt;()
    nums.sort()

    for (i in 0 until nums.size - 2) {
        if (i &gt; 0 &amp;&amp; nums[i] == nums[i - 1]) continue  // Skip duplicate i

        var left = i + 1
        var right = nums.lastIndex

        while (left &lt; right) {
            val sum = nums[i] + nums[left] + nums[right]

            when {
                sum == 0 -&gt; {
                    res.add(listOf(nums[i], nums[left], nums[right]))
                    left++
                    right--
                    while (left &lt; right &amp;&amp; nums[left] == nums[left - 1]) left++  // Skip duplicates
                    while (left &lt; right &amp;&amp; nums[right] == nums[right + 1]) right--  // Skip duplicates
                }
                sum &lt; 0 -&gt; left++
                else -&gt; right--
            }
        }
    }

    return res
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function threeSum(nums: number[]): number[][] {
    const res: number[][] = [];
    nums.sort((a, b) =&gt; a - b);

    for (let i = 0; i &lt; nums.length - 2; i++) {
        if (i &gt; 0 &amp;&amp; nums[i] === nums[i - 1]) continue; // Skip duplicate i

        let left = i + 1;
        let right = nums.length - 1;

        while (left &lt; right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                res.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
                while (left &lt; right &amp;&amp; nums[left] === nums[left - 1]) left++; // Skip duplicates
                while (left &lt; right &amp;&amp; nums[right] === nums[right + 1]) right--; // Skip duplicates
            } else if (sum &lt; 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return res;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public List&lt;List&lt;Integer&gt;&gt; threeSum(int[] nums) {
        List&lt;List&lt;Integer&gt;&gt; res = new ArrayList&lt;&gt;();
        Arrays.sort(nums);

        for (int i = 0; i &lt; nums.length - 2; i++) {
            if (i &gt; 0 &amp;&amp; nums[i] == nums[i - 1]) continue; // Skip duplicate i

            int left = i + 1;
            int right = nums.length - 1;

            while (left &lt; right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    left++;
                    right--;
                    while (left &lt; right &amp;&amp; nums[left] == nums[left - 1]) left++; // Skip duplicates
                    while (left &lt; right &amp;&amp; nums[right] == nums[right + 1]) right--; // Skip duplicates
                } else if (sum &lt; 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return res;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def threeSum(self, nums: List[int]) -&gt; List[List[int]]:
        res = []
        nums.sort()

        for i in range(len(nums) - 2):
            if i &gt; 0 and nums[i] == nums[i - 1]:
                continue  # Skip duplicate i

            left = i + 1
            right = len(nums) - 1

            while left &lt; right:
                sum_val = nums[i] + nums[left] + nums[right]

                if sum_val == 0:
                    res.append([nums[i], nums[left], nums[right]])
                    left += 1
                    right -= 1
                    while left &lt; right and nums[left] == nums[left - 1]:
                        left += 1  # Skip duplicates
                    while left &lt; right and nums[right] == nums[right + 1]:
                        right -= 1  # Skip duplicates
                elif sum_val &lt; 0:
                    left += 1
                else:
                    right -= 1

        return res
</code></pre></div></div></div><h2 id="⏱️-complexity-analysis" tabindex="-1">⏱️ Complexity Analysis <a class="header-anchor" href="#⏱️-complexity-analysis" aria-label="Permalink to &quot;⏱️ Complexity Analysis&quot;">​</a></h2><ul><li><p><strong>Time Complexity:</strong> O(n²)<br> After sorting (O(n log n)), we use a nested loop where the outer loop runs in O(n) and the inner two-pointer scan runs in O(n), leading to an overall complexity of O(n²).</p></li><li><p><strong>Space Complexity:</strong> O(1) (excluding the output)<br> We use constant extra space beyond the input and output. Sorting is done in-place. The result list is not counted as extra space under LeetCode&#39;s convention.</p></li></ul>`,21)]))}const h=n(a,[["render",l]]);export{m as __pageData,h as default};
