import{_ as a,c as e,o as n,ag as l}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"42. Trapping Rain Water","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/42.md","filePath":"array-string/42.md"}'),o={name:"array-string/42.md"};function r(i,t,s,p,d,c){return n(),e("div",null,t[0]||(t[0]=[l(`<h1 id="_42-trapping-rain-water" tabindex="-1"><a href="https://leetcode.com/problems/trapping-rain-water/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">42. Trapping Rain Water</a> <a class="header-anchor" href="#_42-trapping-rain-water" aria-label="Permalink to &quot;[42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p><p><strong>Example 1:</strong><img src="https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png" style="width:412px;height:161px;"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: height = [4,2,0,3,2,5]
Output: 9
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>n == height.length</code></li><li><code>1 &lt;= n &lt;= 2 * 10^4</code></li><li><code>0 &lt;= height[i] &lt;= 10^5</code></li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>We need to compute how much water can be trapped between the bars in an elevation map.<br> At each position, the amount of water it can trap is determined by the minimum of the highest bar to its left and the highest bar to its right, minus its own height:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">water[i] = min(max_left[i], max_right[i]) - height[i]
</code></pre></div><h3 id="key-idea" tabindex="-1">Key Idea: <a class="header-anchor" href="#key-idea" aria-label="Permalink to &quot;Key Idea:&quot;">​</a></h3><p>✅ Use two pointers (<code>l</code> and <code>r</code>) to scan from both ends toward the center.<br> ✅ Maintain <code>lmax</code> (highest to the left of <code>l</code>) and <code>rmax</code> (highest to the right of <code>r</code>) dynamically.<br> ✅ At each step, move the pointer whose maximum is smaller because that side limits the water level.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-uW3LA" id="tab-RjrHNSU" checked><label data-title="Kotlin" for="tab-RjrHNSU">Kotlin</label><input type="radio" name="group-uW3LA" id="tab-1E341gp"><label data-title="TypeScript" for="tab-1E341gp">TypeScript</label><input type="radio" name="group-uW3LA" id="tab-3l7moy0"><label data-title="Java" for="tab-3l7moy0">Java</label><input type="radio" name="group-uW3LA" id="tab-DaBaABC"><label data-title="Python" for="tab-DaBaABC">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun trap(height: IntArray): Int {
        var l = 0
        var r = height.size - 1
        var lmax = 0
        var rmax = 0
        var total = 0

        while (l &lt; r) {
            lmax = maxOf(lmax, height[l])
            rmax = maxOf(rmax, height[r])

            if (lmax &lt; rmax) {
                total += lmax - height[l]
                l++
            } else {
                total += rmax - height[r]
                r--
            }
        }

        return total
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function trap(height: number[]): number {
    let l = 0;
    let r = height.length - 1;
    let lmax = 0;
    let rmax = 0;
    let total = 0;

    while (l &lt; r) {
        lmax = Math.max(lmax, height[l]);
        rmax = Math.max(rmax, height[r]);

        if (lmax &lt; rmax) {
            total += lmax - height[l];
            l++;
        } else {
            total += rmax - height[r];
            r--;
        }
    }

    return total;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int trap(int[] height) {
        int l = 0;
        int r = height.length - 1;
        int lmax = 0;
        int rmax = 0;
        int total = 0;

        while (l &lt; r) {
            lmax = Math.max(lmax, height[l]);
            rmax = Math.max(rmax, height[r]);

            if (lmax &lt; rmax) {
                total += lmax - height[l];
                l++;
            } else {
                total += rmax - height[r];
                r--;
            }
        }

        return total;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def trap(self, height: List[int]) -&gt; int:
        l = 0
        r = len(height) - 1
        lmax = rmax = total = 0

        while l &lt; r:
            lmax = max(lmax, height[l])
            rmax = max(rmax, height[r])

            if lmax &lt; rmax:
                total += lmax - height[l]
                l += 1
            else:
                total += rmax - height[r]
                r -= 1

        return total
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Type</th><th>Complexity</th></tr></thead><tbody><tr><td><strong>Time Complexity</strong></td><td><strong>O(n)</strong> — The array is traversed once with two pointers moving toward each other.</td></tr><tr><td><strong>Space Complexity</strong></td><td><strong>O(1)</strong> — Only a few variables (<code>l</code>, <code>r</code>, <code>lmax</code>, <code>rmax</code>, <code>total</code>) are used, no extra arrays.</td></tr></tbody></table>`,17)]))}const g=a(o,[["render",r]]);export{m as __pageData,g as default};
