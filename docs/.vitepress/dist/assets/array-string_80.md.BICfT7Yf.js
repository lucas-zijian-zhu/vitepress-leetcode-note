import{_ as t,c as n,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"80. Remove Duplicates from Sorted Array II","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/80.md","filePath":"array-string/80.md"}'),s={name:"array-string/80.md"};function i(r,e,l,d,p,c){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="_80-remove-duplicates-from-sorted-array-ii" tabindex="-1"><a href="https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">80. Remove Duplicates from Sorted Array II</a> <a class="header-anchor" href="#_80-remove-duplicates-from-sorted-array-ii" aria-label="Permalink to &quot;[80. Remove Duplicates from Sorted Array II](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an integer array <code>nums</code> sorted in <strong>non-decreasing order</strong> , remove some duplicates <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>in-place</strong></a> such that each unique element appears <strong>at most twice</strong> . The <strong>relative order</strong> of the elements should be kept the <strong>same</strong> .</p><p>Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the <strong>first part</strong> of the array <code>nums</code>. More formally, if there are <code>k</code> elements after removing the duplicates, then the first <code>k</code> elements of <code>nums</code>should hold the final result. It does not matter what you leave beyond the first<code>k</code>elements.</p><p>Return <code>k</code> after placing the final result in the first <code>k</code> slots of <code>nums</code>.</p><p>Do <strong>not</strong> allocate extra space for another array. You must do this by <strong>modifying the input array <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank">in-place</a></strong> with O(1) extra memory.</p><p><strong>Custom Judge:</strong></p><p>The judge will test your solution with the following code:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i &lt; k; i++) {
    assert nums[i] == expectedNums[i];
}
</code></pre></div><p>If all assertions pass, then your solution will be <strong>accepted</strong> .</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 3 * 10^4</code></li><li><code>-10^4 &lt;= nums[i] &lt;= 10^4</code></li><li><code>nums</code> is sorted in <strong>non-decreasing</strong> order.</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><ul><li>Since the array is sorted, duplicates are adjacent.</li><li>We want to keep <strong>at most two occurrences</strong> of each number.</li><li>Use a pointer <code>index</code> to track the position to write the next valid element.</li><li>Iterate from the third element onward and compare it with the element at <code>index - 2</code>. <ul><li>If <code>nums[i] != nums[index-2]</code>, then it is valid to keep this number.</li></ul></li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-selI-" id="tab-QDu6Hv2" checked><label data-title="Kotlin" for="tab-QDu6Hv2">Kotlin</label><input type="radio" name="group-selI-" id="tab-I28HhtI"><label data-title="TypeScript" for="tab-I28HhtI">TypeScript</label><input type="radio" name="group-selI-" id="tab-qNVbGiN"><label data-title="Java" for="tab-qNVbGiN">Java</label><input type="radio" name="group-selI-" id="tab-Ucj8-kI"><label data-title="Python" for="tab-Ucj8-kI">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        if (nums.size &lt;= 2) return nums.size

        var index = 2

        for (i in 2 until nums.size) {
            if (nums[i] != nums[index - 2]) {
                nums[index] = nums[i]
                index++
            }
        }

        return index
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function removeDuplicates(nums: number[]): number {
    if (nums.length &lt;= 2) return nums.length;

    let index = 2;

    for (let i = 2; i &lt; nums.length; i++) {
        if (nums[i] !== nums[index - 2]) {
            nums[index] = nums[i];
            index++;
        }
    }

    return index;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length &lt;= 2) return nums.length;

        int index = 2;

        for (int i = 2; i &lt; nums.length; i++) {
            if (nums[i] != nums[index - 2]) {
                nums[index] = nums[i];
                index++;
            }
        }

        return index;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def removeDuplicates(self, nums: List[int]) -&gt; int:
        if len(nums) &lt;= 2:
            return len(nums)

        index = 2

        for i in range(2, len(nums)):
            if nums[i] != nums[index - 2]:
                nums[index] = nums[i]
                index += 1

        return index
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Type</th><th>Complexity</th></tr></thead><tbody><tr><td><strong>Time Complexity</strong></td><td><code>O(n)</code></td></tr><tr><td><strong>Space Complexity</strong></td><td><code>O(1)</code></td></tr></tbody></table><h3 id="explanation" tabindex="-1">Explanation: <a class="header-anchor" href="#explanation" aria-label="Permalink to &quot;Explanation:&quot;">​</a></h3><ul><li><p><strong>Time Complexity:</strong><br> We iterate through the array exactly once, performing constant work for each element → linear time, <strong>O(n)</strong>.</p></li><li><p><strong>Space Complexity:</strong><br> We only use a few pointers (<code>index</code>, <code>i</code>), and modify the array in place without any extra data structures → constant space, <strong>O(1)</strong>.</p></li></ul>`,24)]))}const h=t(s,[["render",i]]);export{m as __pageData,h as default};
