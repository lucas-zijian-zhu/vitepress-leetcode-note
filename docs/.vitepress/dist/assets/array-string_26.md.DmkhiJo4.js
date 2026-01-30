import{_ as t,c as n,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"26. Remove Duplicates from Sorted Array","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/26.md","filePath":"array-string/26.md"}'),s={name:"array-string/26.md"};function r(i,e,l,d,c,p){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="_26-remove-duplicates-from-sorted-array" tabindex="-1"><a href="https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">26. Remove Duplicates from Sorted Array</a> <a class="header-anchor" href="#_26-remove-duplicates-from-sorted-array" aria-label="Permalink to &quot;[26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an integer array <code>nums</code> sorted in <strong>non-decreasing order</strong> , remove the duplicates <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>in-place</strong></a> such that each unique element appears only <strong>once</strong> . The <strong>relative order</strong> of the elements should be kept the <strong>same</strong> . Then return the number of unique elements in <code>nums</code>.</p><p>Consider the number of unique elements of <code>nums</code> to be <code>k</code>, to get accepted, you need to do the following things:</p><ul><li>Change the array <code>nums</code> such that the first <code>k</code> elements of <code>nums</code> contain the unique elements in the order they were present in <code>nums</code> initially. The remaining elements of <code>nums</code> are not important as well as the size of <code>nums</code>.</li><li>Return <code>k</code>.</li></ul><p><strong>Custom Judge:</strong></p><p>The judge will test your solution with the following code:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i &lt; k; i++) {
    assert nums[i] == expectedNums[i];
}
</code></pre></div><p>If all assertions pass, then your solution will be <strong>accepted</strong> .</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 3 * 10^4</code></li><li><code>-100 &lt;= nums[i] &lt;= 100</code></li><li><code>nums</code> is sorted in <strong>non-decreasing</strong> order.</li></ul><h2 id="💡-approach" tabindex="-1">💡 Approach <a class="header-anchor" href="#💡-approach" aria-label="Permalink to &quot;💡 Approach&quot;">​</a></h2><p>✅ Since the array is already sorted, duplicates will be next to each other.<br> ✅ Use a pointer <code>index</code> to record the position of the next unique element.<br> ✅ Iterate over the array, and whenever a new unique element is found, move it to <code>nums[index]</code> and increment <code>index</code>.<br> ✅ After the loop, <code>index</code> represents the number of unique elements.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-SxxcD" id="tab-Z6J4Eeg" checked><label data-title="Kotlin" for="tab-Z6J4Eeg">Kotlin</label><input type="radio" name="group-SxxcD" id="tab-E3z9Vlg"><label data-title="TypeScript" for="tab-E3z9Vlg">TypeScript</label><input type="radio" name="group-SxxcD" id="tab-C1lwQ5n"><label data-title="Java" for="tab-C1lwQ5n">Java</label><input type="radio" name="group-SxxcD" id="tab-zWWHQMJ"><label data-title="Python" for="tab-zWWHQMJ">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        if (nums.isEmpty()) return 0

        var index = 1
        for (i in 1 until nums.size) {
            if (nums[i] != nums[index - 1]) {
                nums[index++] = nums[i]
            }
        }
        return index
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;

    let index = 1;
    for (let i = 1; i &lt; nums.length; i++) {
        if (nums[i] !== nums[index - 1]) {
            nums[index++] = nums[i];
        }
    }
    return index;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int index = 1;
        for (int i = 1; i &lt; nums.length; i++) {
            if (nums[i] != nums[index - 1]) {
                nums[index++] = nums[i];
            }
        }
        return index;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def removeDuplicates(self, nums: List[int]) -&gt; int:
        if not nums:
            return 0

        index = 1
        for i in range(1, len(nums)):
            if nums[i] != nums[index - 1]:
                nums[index] = nums[i]
                index += 1
        return index
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Metric</th><th>Complexity</th></tr></thead><tbody><tr><td>⏳ <strong>Time Complexity</strong></td><td><code>O(n)</code> — We iterate through the entire array once.</td></tr><tr><td>🪄 <strong>Space Complexity</strong></td><td><code>O(1)</code> — We modify the array in-place without using any extra space.</td></tr></tbody></table>`,21)]))}const h=t(s,[["render",r]]);export{m as __pageData,h as default};
