import{_ as t,c as n,o as a,ag as r}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"167. Two Sum II - Input Array Is Sorted","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/167.md","filePath":"array-string/167.md"}'),s={name:"array-string/167.md"};function o(i,e,l,u,d,p){return a(),n("div",null,e[0]||(e[0]=[r(`<h1 id="_167-two-sum-ii-input-array-is-sorted" tabindex="-1"><a href="https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">167. Two Sum II - Input Array Is Sorted</a> <a class="header-anchor" href="#_167-two-sum-ii-input-array-is-sorted" aria-label="Permalink to &quot;[167. Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a <strong>1-indexed</strong> array of integers <code>numbers</code> that is already <strong>sorted in non-decreasing order</strong> , find two numbers such that they add up to a specific <code>target</code> number. Let these two numbers be <code>numbers[index<sub>1</sub>]</code> and <code>numbers[index<sub>2</sub>]</code> where <code>1 &lt;= index<sub>1</sub> &lt; index<sub>2</sub> &lt;= numbers.length</code>.</p><p>Return the indices of the two numbers, <code>index<sub>1</sub></code> and <code>index<sub>2</sub></code>, <strong>added by one</strong> as an integer array <code>[index<sub>1</sub>, index<sub>2</sub>]</code> of length 2.</p><p>The tests are generated such that there is <strong>exactly one solution</strong> . You <strong>may not</strong> use the same element twice.</p><p>Your solution must use only constant extra space.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index&lt;sub&gt;1&lt;/sub&gt; = 1, index&lt;sub&gt;2&lt;/sub&gt; = 2. We return [1, 2].
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index&lt;sub&gt;1&lt;/sub&gt; = 1, index&lt;sub&gt;2&lt;/sub&gt; = 3. We return [1, 3].
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index&lt;sub&gt;1&lt;/sub&gt; = 1, index&lt;sub&gt;2&lt;/sub&gt; = 2. We return [1, 2].
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>2 &lt;= numbers.length &lt;= 3 * 10^4</code></li><li><code>-1000 &lt;= numbers[i] &lt;= 1000</code></li><li><code>numbers</code> is sorted in <strong>non-decreasing order</strong> .</li><li><code>-1000 &lt;= target &lt;= 1000</code></li><li>The tests are generated such that there is <strong>exactly one solution</strong> .</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>Given that the input array is <strong>sorted in non-decreasing order</strong>, we can use the <strong>two-pointer technique</strong>:</p><ol><li><p>Initialize two pointers:</p><ul><li><code>left</code> at the beginning (index 0)</li><li><code>right</code> at the end (index n - 1)</li></ul></li><li><p>Compute the sum of elements at <code>left</code> and <code>right</code>:</p><ul><li>If the sum is equal to the target, return their (1-based) indices.</li><li>If the sum is less than the target, move <code>left</code> forward.</li><li>If the sum is greater than the target, move <code>right</code> backward.</li></ul></li></ol><p>This approach works efficiently due to the sorted nature of the array.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-TlJoF" id="tab-26zQfur" checked><label data-title="Kotlin" for="tab-26zQfur">Kotlin</label><input type="radio" name="group-TlJoF" id="tab-yPcY7pZ"><label data-title="TypeScript" for="tab-yPcY7pZ">TypeScript</label><input type="radio" name="group-TlJoF" id="tab-idF3sh8"><label data-title="Java" for="tab-idF3sh8">Java</label><input type="radio" name="group-TlJoF" id="tab-RUr6gt7"><label data-title="Python" for="tab-RUr6gt7">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun twoSum(numbers: IntArray, target: Int): IntArray {
        var left = 0
        var right = numbers.size - 1

        while (left &lt; right) {
            val sum = numbers[left] + numbers[right]
            when {
                sum == target -&gt; return intArrayOf(left + 1, right + 1)
                sum &lt; target -&gt; left++
                else -&gt; right--
            }
        }

        return intArrayOf() // Should not reach here as per problem guarantees
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;

    while (left &lt; right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) {
            return [left + 1, right + 1];
        } else if (sum &lt; target) {
            left++;
        } else {
            right--;
        }
    }

    return []; // Should not reach here as per problem guarantees
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;

        while (left &lt; right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1};
            } else if (sum &lt; target) {
                left++;
            } else {
                right--;
            }
        }

        return new int[]{}; // Should not reach here as per problem guarantees
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def twoSum(self, numbers: List[int], target: int) -&gt; List[int]:
        left = 0
        right = len(numbers) - 1

        while left &lt; right:
            sum_val = numbers[left] + numbers[right]
            if sum_val == target:
                return [left + 1, right + 1]
            elif sum_val &lt; target:
                left += 1
            else:
                right -= 1

        return []  # Should not reach here as per problem guarantees
</code></pre></div></div></div><h2 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h2><ul><li><p><strong>Time Complexity</strong>: O(n)<br> We use a two-pointer approach that makes a single pass through the array.<br> Each element is visited at most once, so the total runtime is linear.</p></li><li><p><strong>Space Complexity</strong>: O(1)<br> The algorithm only uses a constant amount of extra space (two pointers and a return array of size 2).</p></li></ul>`,22)]))}const h=t(s,[["render",o]]);export{g as __pageData,h as default};
