import{_ as o,C as a,c as s,o as r,j as n,ag as i,G as l,a as p}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"452. Minimum Number of Arrows to Burst Balloons","description":"","frontmatter":{},"headers":[],"relativePath":"intervals/452.md","filePath":"intervals/452.md"}'),d={name:"intervals/452.md"},c={id:"_452-minimum-number-of-arrows-to-burst-balloons",tabindex:"-1"};function u(b,t,h,g,m,v){const e=a("Badge");return r(),s("div",null,[n("h1",c,[t[0]||(t[0]=n("a",{href:"https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"452. Minimum Number of Arrows to Burst Balloons",-1)),l(e,{type:"warning",text:"Medium"}),t[1]||(t[1]=p()),t[2]||(t[2]=n("a",{class:"header-anchor",href:"#_452-minimum-number-of-arrows-to-burst-balloons","aria-label":'Permalink to "[452. Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),t[3]||(t[3]=i(`<p>There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array <code>points</code> where <code>points[i] = [x<sub>start</sub>, x<sub>end</sub>]</code> denotes a balloon whose <strong>horizontal diameter</strong> stretches between <code>x<sub>start</sub></code> and <code>x<sub>end</sub></code>. You do not know the exact y-coordinates of the balloons.</p><p>Arrows can be shot up <strong>directly vertically</strong> (in the positive y-direction) from different points along the x-axis. A balloon with <code>x<sub>start</sub></code> and <code>x<sub>end</sub></code> is <strong>burst</strong> by an arrow shot at <code>x</code> if <code>x<sub>start</sub> &lt;= x &lt;= x<sub>end</sub></code>. There is <strong>no limit</strong> to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.</p><p>Given the array <code>points</code>, return the <strong>minimum</strong> number of arrows that must be shot to burst all balloons.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
Explanation: One arrow needs to be shot for each balloon for a total of 4 arrows.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].
- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= points.length &lt;= 10^5</code></li><li><code>points[i].length == 2</code></li><li><code>-2^31 &lt;= x<sub>start</sub> &lt; x<sub>end</sub> &lt;= 2^31 - 1</code></li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>This is an interval covering greedy problem. Each arrow is shot vertically at some x and bursts all intervals that contain x. To minimize the number of arrows, we want each arrow to cover as many intervals as possible.</p><p>Algorithm:</p><ul><li>Sort the intervals by their right endpoint (x_end) in ascending order.</li><li>Maintain the current arrow position curEnd as the right endpoint of the last chosen interval (initialize to the first interval&#39;s right endpoint). Iterate the remaining intervals: <ul><li>If the current interval&#39;s left endpoint x_start &lt;= curEnd, the current arrow can burst it (no new arrow needed).</li><li>Otherwise, shoot a new arrow (increment count) and set curEnd to this interval&#39;s right endpoint.</li></ul></li></ul><p>Choosing the earliest finishing interval&#39;s right endpoint is optimal because it maximizes overlap with subsequent intervals.</p><p>Edge cases: if points is empty return 0; if only one interval return 1.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-MuJVT" id="tab-SWCN6Wt" checked><label data-title="Kotlin" for="tab-SWCN6Wt">Kotlin</label><input type="radio" name="group-MuJVT" id="tab-uRbdCZK"><label data-title="TypeScript" for="tab-uRbdCZK">TypeScript</label><input type="radio" name="group-MuJVT" id="tab-WR4wpfO"><label data-title="Java" for="tab-WR4wpfO">Java</label><input type="radio" name="group-MuJVT" id="tab-RDZ7RUF"><label data-title="Python" for="tab-RDZ7RUF">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun findMinArrowShots(points: Array&lt;IntArray&gt;): Int {
        if (points.isEmpty()) return 0

        // sort by right endpoint
        points.sortWith(compareBy { it[1] })

        var arrows = 1
        var curEnd = points[0][1]

        for (i in 1 until points.size) {
            val start = points[i][0]
            val end = points[i][1]
            if (start &gt; curEnd) {
                arrows++
                curEnd = end
            }
        }

        return arrows
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    findMinArrowShots(points: number[][]): number {
        if (points.length === 0) return 0;

        // sort by right endpoint
        points.sort((a, b) =&gt; a[1] - b[1]);

        let arrows = 1;
        let curEnd = points[0][1];

        for (let i = 1; i &lt; points.length; i++) {
            const start = points[i][0];
            const end = points[i][1];
            if (start &gt; curEnd) {
                arrows++;
                curEnd = end;
            }
        }

        return arrows;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int findMinArrowShots(int[][] points) {
        if (points.length == 0) return 0;

        // sort by right endpoint
        Arrays.sort(points, (a, b) -&gt; Integer.compare(a[1], b[1]));

        int arrows = 1;
        int curEnd = points[0][1];

        for (int i = 1; i &lt; points.length; i++) {
            int start = points[i][0];
            int end = points[i][1];
            if (start &gt; curEnd) {
                arrows++;
                curEnd = end;
            }
        }

        return arrows;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -&gt; int:
        if not points:
            return 0

        # sort by right endpoint
        points.sort(key=lambda x: x[1])

        arrows = 1
        cur_end = points[0][1]

        for i in range(1, len(points)):
            start = points[i][0]
            end = points[i][1]
            if start &gt; cur_end:
                arrows += 1
                cur_end = end

        return arrows
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li>Time complexity: O(n log n) due to sorting n intervals; the sweep is O(n).</li><li>Space complexity: O(1) extra space (not counting input); sorting may use O(n) temporary space depending on the implementation.</li></ul>`,21))])}const w=o(d,[["render",u]]);export{f as __pageData,w as default};
