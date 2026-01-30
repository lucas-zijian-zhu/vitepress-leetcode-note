import{_ as t,c as a,o as n,ag as i}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"11. Container With Most Water","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/11.md","filePath":"array-string/11.md"}'),r={name:"array-string/11.md"};function o(l,e,s,h,p,c){return n(),a("div",null,e[0]||(e[0]=[i(`<h1 id="_11-container-with-most-water" tabindex="-1"><a href="https://leetcode.com/problems/container-with-most-water/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">11. Container With Most Water</a> <a class="header-anchor" href="#_11-container-with-most-water" aria-label="Permalink to &quot;[11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i^th</code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p><p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p><p>Return the maximum amount of water a container can store.</p><p><strong>Notice</strong> that you may not slant the container.</p><p><strong>Example 1:</strong><img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg" style="width:600px;height:287px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: height = [1,1]
Output: 1
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>n == height.length</code></li><li><code>2 &lt;= n &lt;= 10^5</code></li><li><code>0 &lt;= height[i] &lt;= 10^4</code></li></ul><h2 id="approach-two-pointers-greedy" tabindex="-1">Approach: Two Pointers (Greedy) <a class="header-anchor" href="#approach-two-pointers-greedy" aria-label="Permalink to &quot;Approach: Two Pointers (Greedy)&quot;">​</a></h2><p>We use two pointers <code>left</code> and <code>right</code>, starting from the beginning and end of the array. At each step, we calculate the area between these two lines:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">area = (right - left) × min(height[left], height[right])
</code></pre></div><p>he height of the container is determined by the <strong>shorter</strong> of the two lines, and the width is the distance between the two indices.</p><p>To potentially increase the area:</p><ul><li>We move the pointer pointing to the <strong>shorter line</strong>, because moving the longer line can never increase the height, and the width always decreases.</li></ul><p>We repeat this process while <code>left &lt; right</code> and keep track of the maximum area found.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-vrMGU" id="tab-evSMzq8" checked><label data-title="Kotlin" for="tab-evSMzq8">Kotlin</label><input type="radio" name="group-vrMGU" id="tab-Wa0ZDF9"><label data-title="TypeScript" for="tab-Wa0ZDF9">TypeScript</label><input type="radio" name="group-vrMGU" id="tab-uJ-_rpB"><label data-title="Java" for="tab-uJ-_rpB">Java</label><input type="radio" name="group-vrMGU" id="tab-hIdmC0c"><label data-title="Python" for="tab-hIdmC0c">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun maxArea(height: IntArray): Int {
    var left = 0
    var right = height.lastIndex
    var maxArea = 0

    while (left &lt; right) {
        val h = minOf(height[left], height[right])
        val w = right - left
        val area = h * w
        maxArea = maxOf(maxArea, area)

        // Move the shorter line inward
        if (height[left] &lt; height[right]) {
            left++
        } else {
            right--
        }
    }

    return maxArea
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;

    while (left &lt; right) {
        const h = Math.min(height[left], height[right]);
        const w = right - left;
        const area = h * w;
        maxArea = Math.max(maxArea, area);

        // Move the shorter line inward
        if (height[left] &lt; height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int maxArea = 0;

        while (left &lt; right) {
            int h = Math.min(height[left], height[right]);
            int w = right - left;
            int area = h * w;
            maxArea = Math.max(maxArea, area);

            // Move the shorter line inward
            if (height[left] &lt; height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxArea;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def maxArea(self, height: List[int]) -&gt; int:
        left = 0
        right = len(height) - 1
        max_area = 0

        while left &lt; right:
            h = min(height[left], height[right])
            w = right - left
            area = h * w
            max_area = max(max_area, area)

            # Move the shorter line inward
            if height[left] &lt; height[right]:
                left += 1
            else:
                right -= 1

        return max_area
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><ul><li><p><strong>Time Complexity:</strong> O(n)<br> We scan the array once using two pointers, moving them toward each other.</p></li><li><p><strong>Space Complexity:</strong> O(1)<br> Only a few integer variables are used; no extra space is required proportional to input size.</p></li></ul>`,22)]))}const m=t(r,[["render",o]]);export{g as __pageData,m as default};
