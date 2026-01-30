import{_ as t,c as n,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"27. Remove Element","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/27.md","filePath":"array-string/27.md"}'),l={name:"array-string/27.md"};function s(i,e,r,d,c,p){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="_27-remove-element" tabindex="-1"><a href="https://leetcode.com/problems/remove-element/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">27. Remove Element</a> <a class="header-anchor" href="#_27-remove-element" aria-label="Permalink to &quot;[27. Remove Element](https://leetcode.com/problems/remove-element/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an integer array <code>nums</code> and an integer <code>val</code>, remove all occurrences of <code>val</code> in <code>nums</code> <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>in-place</strong></a>. The order of the elements may be changed. Then return the number of elements in <code>nums</code> which are not equal to <code>val</code>.</p><p>Consider the number of elements in <code>nums</code> which are not equal to <code>val</code> be <code>k</code>, to get accepted, you need to do the following things:</p><ul><li>Change the array <code>nums</code> such that the first <code>k</code> elements of <code>nums</code> contain the elements which are not equal to <code>val</code>. The remaining elements of <code>nums</code> are not important as well as the size of <code>nums</code>.</li><li>Return <code>k</code>.</li></ul><p><strong>Custom Judge:</strong></p><p>The judge will test your solution with the following code:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">int[] nums = [...]; // Input array
int val = ...; // Value to remove
int[] expectedNums = [...]; // The expected answer with correct length.
                            // It is sorted with no values equaling val.

int k = removeElement(nums, val); // Calls your implementation

assert k == expectedNums.length;
sort(nums, 0, k); // Sort the first k elements of nums
for (int i = 0; i &lt; actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
</code></pre></div><p>If all assertions pass, then your solution will be <strong>accepted</strong> .</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>0 &lt;= nums.length &lt;= 100</code></li><li><code>0 &lt;= nums[i] &lt;= 50</code></li><li><code>0 &lt;= val &lt;= 100</code></li></ul><h2 id="💡-approach" tabindex="-1">💡 Approach <a class="header-anchor" href="#💡-approach" aria-label="Permalink to &quot;💡 Approach&quot;">​</a></h2><p>✅ Use a pointer <code>index</code> to track the next position to write a number that is not equal to <code>val</code>.<br> ✅ Iterate over the array, and for each element not equal to <code>val</code>, write it to <code>nums[index]</code> and increment <code>index</code>.<br> ✅ After the loop, <code>index</code> represents the new length of the array with <code>val</code> removed.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-radB8" id="tab-6C2aZze" checked><label data-title="Kotlin" for="tab-6C2aZze">Kotlin</label><input type="radio" name="group-radB8" id="tab-ICR4-9m"><label data-title="TypeScript" for="tab-ICR4-9m">TypeScript</label><input type="radio" name="group-radB8" id="tab-31o0z_l"><label data-title="Java" for="tab-31o0z_l">Java</label><input type="radio" name="group-radB8" id="tab-m51UO6w"><label data-title="Python" for="tab-m51UO6w">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun removeElement(nums: IntArray, \`val\`: Int): Int {
        var index = 0
        for (i in 0 until nums.size) {
            if (nums[i] != \`val\`) {
                nums[index++] = nums[i]
            }
        }
        return index
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function removeElement(nums: number[], val: number): number {
    let index = 0;
    for (let i = 0; i &lt; nums.length; i++) {
        if (nums[i] !== val) {
            nums[index++] = nums[i];
        }
    }
    return index;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int removeElement(int[] nums, int val) {
        int index = 0;
        for (int i = 0; i &lt; nums.length; i++) {
            if (nums[i] != val) {
                nums[index++] = nums[i];
            }
        }
        return index;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def removeElement(self, nums: List[int], val: int) -&gt; int:
        index = 0
        for i in range(len(nums)):
            if nums[i] != val:
                nums[index] = nums[i]
                index += 1
        return index
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Metric</th><th>Complexity</th></tr></thead><tbody><tr><td>⏳ <strong>Time Complexity</strong></td><td><code>O(n)</code> — We iterate through the entire array once.</td></tr><tr><td>🪄 <strong>Space Complexity</strong></td><td><code>O(1)</code> — We modify the array in-place without using extra space.</td></tr></tbody></table>`,21)]))}const h=t(l,[["render",s]]);export{m as __pageData,h as default};
