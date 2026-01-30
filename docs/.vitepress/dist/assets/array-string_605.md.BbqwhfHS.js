import{_ as a,C as o,c as l,o as r,j as n,ag as i,G as d,a as s}from"./chunks/framework.Bw-5EFTY.js";const w=JSON.parse('{"title":"605. Can Place Flowers","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/605.md","filePath":"array-string/605.md"}'),c={name:"array-string/605.md"},p={id:"_605-can-place-flowers",tabindex:"-1"};function f(u,e,b,h,g,y){const t=o("Badge");return r(),l("div",null,[n("h1",p,[e[0]||(e[0]=n("a",{href:"https://leetcode.com/problems/can-place-flowers/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"605. Can Place Flowers",-1)),d(t,{type:"info",text:"Easy"}),e[1]||(e[1]=s()),e[2]||(e[2]=n("a",{class:"header-anchor",href:"#_605-can-place-flowers","aria-label":'Permalink to "[605. Can Place Flowers](https://leetcode.com/problems/can-place-flowers/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="info" text="Easy" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>You have a long flowerbed in which some plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.</p><p>Given an integer array <code>flowerbed</code> containing 0&#39;s and 1&#39;s, where 0 means empty and 1 means not empty, and an integer <code>n</code>, return <code>true</code> if <code>n</code> new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and <code>false</code> otherwise.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: flowerbed = [1,0,0,0,1], n = 1
Output: true
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: flowerbed = [1,0,0,0,1], n = 2
Output: false
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= flowerbed.length &lt;= 2 * 10^4</code></li><li><code>flowerbed[i]</code> is 0 or 1</li><li><code>1 &lt;= n &lt;= flowerbed.length</code></li></ul><h2 id="💡-approach-greedy-scan" tabindex="-1">💡 Approach: Greedy Scan <a class="header-anchor" href="#💡-approach-greedy-scan" aria-label="Permalink to &quot;💡 Approach: Greedy Scan&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>We only need to plant a flower when the current plot and its neighbors are empty. A greedy left-to-right scan is optimal because placing a flower earlier never reduces the total number of flowers we can place.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li>Iterate through each position <code>i</code>.</li><li>Check if <code>flowerbed[i] == 0</code>, and both neighbors (if exist) are also 0.</li><li>If so, place a flower (<code>flowerbed[i] = 1</code>) and decrement <code>n</code>.</li><li>If <code>n</code> reaches 0, return <code>true</code>.</li><li>If we finish the scan and still need flowers, return <code>false</code>.</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Treat out-of-bounds neighbors as 0.</li><li>Modifying the array in-place simplifies checks.</li><li>Early exit once <code>n == 0</code>.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Xhbyq" id="tab-neNf44w" checked><label data-title="Kotlin" for="tab-neNf44w">Kotlin</label><input type="radio" name="group-Xhbyq" id="tab-jwpD0jI"><label data-title="TypeScript" for="tab-jwpD0jI">TypeScript</label><input type="radio" name="group-Xhbyq" id="tab-AQkTqLS"><label data-title="Java" for="tab-AQkTqLS">Java</label><input type="radio" name="group-Xhbyq" id="tab-YUKghQZ"><label data-title="Python" for="tab-YUKghQZ">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun canPlaceFlowers(flowerbed: IntArray, n: Int): Boolean {
        if (n == 0) return true

        var need = n
        for (i in flowerbed.indices) {
            if (flowerbed[i] == 1) continue
            val leftEmpty = (i == 0) || flowerbed[i - 1] == 0
            val rightEmpty = (i == flowerbed.lastIndex) || flowerbed[i + 1] == 0
            if (leftEmpty &amp;&amp; rightEmpty) {
                flowerbed[i] = 1
                need--
                if (need == 0) return true
            }
        }

        return false
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    if (n === 0) return true;

    let need = n;
    for (let i = 0; i &lt; flowerbed.length; i++) {
        if (flowerbed[i] === 1) continue;
        const leftEmpty = i === 0 || flowerbed[i - 1] === 0;
        const rightEmpty = i === flowerbed.length - 1 || flowerbed[i + 1] === 0;
        if (leftEmpty &amp;&amp; rightEmpty) {
            flowerbed[i] = 1;
            need--;
            if (need === 0) return true;
        }
    }

    return false;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        if (n == 0) return true;

        int need = n;
        for (int i = 0; i &lt; flowerbed.length; i++) {
            if (flowerbed[i] == 1) continue;
            boolean leftEmpty = (i == 0) || flowerbed[i - 1] == 0;
            boolean rightEmpty = (i == flowerbed.length - 1) || flowerbed[i + 1] == 0;
            if (leftEmpty &amp;&amp; rightEmpty) {
                flowerbed[i] = 1;
                need--;
                if (need == 0) return true;
            }
        }

        return false;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -&gt; bool:
        if n == 0:
            return True

        need = n
        for i in range(len(flowerbed)):
            if flowerbed[i] == 1:
                continue
            left_empty = (i == 0) or flowerbed[i - 1] == 0
            right_empty = (i == len(flowerbed) - 1) or flowerbed[i + 1] == 0
            if left_empty and right_empty:
                flowerbed[i] = 1
                need -= 1
                if need == 0:
                    return True

        return False
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), single pass through the array.</li><li><strong>Space Complexity:</strong> O(1), in-place updates.</li></ul>`,19))])}const v=a(c,[["render",f]]);export{w as __pageData,v as default};
