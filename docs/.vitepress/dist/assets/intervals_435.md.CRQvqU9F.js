import{_ as a,C as r,c as l,o as s,j as n,ag as o,G as i,a as p}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"435. Non-overlapping Intervals","description":"","frontmatter":{},"headers":[],"relativePath":"intervals/435.md","filePath":"intervals/435.md"}'),d={name:"intervals/435.md"},c={id:"_435-non-overlapping-intervals",tabindex:"-1"};function v(u,e,g,m,b,h){const t=r("Badge");return s(),l("div",null,[n("h1",c,[e[0]||(e[0]=n("a",{href:"https://leetcode.com/problems/non-overlapping-intervals/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"435. Non-overlapping Intervals",-1)),i(t,{type:"warning",text:"Medium"}),e[1]||(e[1]=p()),e[2]||(e[2]=n("a",{class:"header-anchor",href:"#_435-non-overlapping-intervals","aria-label":'Permalink to "[435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=o(`<p>Given an array of intervals <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: Remove [1,3] and the rest are non-overlapping.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: Remove two intervals so only one remains.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: intervals = [[1,2],[2,3]]
Output: 0
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= intervals.length &lt;= 10^5</code></li><li><code>intervals[i].length == 2</code></li><li><code>-5 * 10^4 &lt;= start<sub>i</sub> &lt; end<sub>i</sub> &lt;= 5 * 10^4</code></li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>We want to keep as many non-overlapping intervals as possible, which is the classic interval scheduling problem:</p><ol><li><strong>Sort by end time</strong><ul><li>Always pick the interval that ends earliest.</li></ul></li><li><strong>Greedy selection</strong><ul><li>Keep the first interval, then for each next interval: <ul><li>If it overlaps (start &lt; currentEnd), we must remove it.</li><li>Otherwise, keep it and update <code>currentEnd</code>.</li></ul></li></ul></li></ol><p>The answer is the number of removed intervals.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-STYOG" id="tab-1cCOgzu" checked><label data-title="Kotlin" for="tab-1cCOgzu">Kotlin</label><input type="radio" name="group-STYOG" id="tab-pzNciFm"><label data-title="TypeScript" for="tab-pzNciFm">TypeScript</label><input type="radio" name="group-STYOG" id="tab-XaAlK8J"><label data-title="Java" for="tab-XaAlK8J">Java</label><input type="radio" name="group-STYOG" id="tab-ncEj1XF"><label data-title="Python" for="tab-ncEj1XF">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun eraseOverlapIntervals(intervals: Array&lt;IntArray&gt;): Int {
        if (intervals.isEmpty()) return 0

        intervals.sortBy { it[1] } // sort by end time
        var removed = 0
        var currentEnd = intervals[0][1]

        for (i in 1 until intervals.size) {
            val start = intervals[i][0]
            val end = intervals[i][1]
            if (start &lt; currentEnd) {
                removed++
            } else {
                currentEnd = end
            }
        }

        return removed
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function eraseOverlapIntervals(intervals: number[][]): number {
    if (intervals.length === 0) return 0;

    intervals.sort((a, b) =&gt; a[1] - b[1]); // sort by end time
    let removed = 0;
    let currentEnd = intervals[0][1];

    for (let i = 1; i &lt; intervals.length; i++) {
        const [start, end] = intervals[i];
        if (start &lt; currentEnd) {
            removed++;
        } else {
            currentEnd = end;
        }
    }

    return removed;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;

        Arrays.sort(intervals, (a, b) -&gt; Integer.compare(a[1], b[1]));
        int removed = 0;
        int currentEnd = intervals[0][1];

        for (int i = 1; i &lt; intervals.length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start &lt; currentEnd) {
                removed++;
            } else {
                currentEnd = end;
            }
        }

        return removed;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -&gt; int:
        if not intervals:
            return 0

        intervals.sort(key=lambda x: x[1])  # sort by end time
        removed = 0
        current_end = intervals[0][1]

        for start, end in intervals[1:]:
            if start &lt; current_end:
                removed += 1
            else:
                current_end = end

        return removed
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Sorting</strong>: <code>O(n log n)</code></li><li><strong>Greedy scan</strong>: <code>O(n)</code></li><li><strong>Total Time Complexity</strong>: <strong><code>O(n log n)</code></strong></li><li><strong>Space Complexity</strong>: <strong><code>O(1)</code></strong> (ignoring sorting overhead)</li></ul>`,17))])}const C=a(d,[["render",v]]);export{f as __pageData,C as default};
