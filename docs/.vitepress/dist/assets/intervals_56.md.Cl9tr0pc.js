import{_ as a,C as r,c as l,o as i,j as t,ag as o,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"56. Merge Intervals","description":"","frontmatter":{},"headers":[],"relativePath":"intervals/56.md","filePath":"intervals/56.md"}'),p={name:"intervals/56.md"},g={id:"_56-merge-intervals",tabindex:"-1"};function c(v,e,m,u,h,y){const n=r("Badge");return i(),l("div",null,[t("h1",g,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/merge-intervals/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"56. Merge Intervals",-1)),s(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_56-merge-intervals","aria-label":'Permalink to "[56. Merge Intervals](https://leetcode.com/problems/merge-intervals/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=o(`<p>Given an arrayof <code>intervals</code>where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= intervals.length &lt;= 10^4</code></li><li><code>intervals[i].length == 2</code></li><li><code>0 &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10^4</code></li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><ol><li><p><strong>Sort the intervals</strong></p><ul><li>Sort all intervals by their starting point.</li><li>This ensures that we can handle them in the correct order for merging.</li></ul></li><li><p><strong>Merge overlapping intervals</strong></p><ul><li>Initialize an empty list <code>merged</code>.</li><li>Iterate through each interval: <ul><li>If <code>merged</code> is empty, or the current interval does not overlap with the last one in <code>merged</code>, add it directly.</li><li>Otherwise, update the <code>end</code> of the last interval in <code>merged</code> with the maximum end value between the two.</li></ul></li></ul></li><li><p><strong>Return the merged result</strong></p><ul><li>After iteration, <code>merged</code> contains the final merged intervals.</li></ul></li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-ORGw7" id="tab-wV1NdcC" checked><label data-title="Kotlin" for="tab-wV1NdcC">Kotlin</label><input type="radio" name="group-ORGw7" id="tab-JNQyf2M"><label data-title="TypeScript" for="tab-JNQyf2M">TypeScript</label><input type="radio" name="group-ORGw7" id="tab-4n2UhjY"><label data-title="Java" for="tab-4n2UhjY">Java</label><input type="radio" name="group-ORGw7" id="tab-iPj5N2H"><label data-title="Python" for="tab-iPj5N2H">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun merge(intervals: Array&lt;IntArray&gt;): Array&lt;IntArray&gt; {
        if (intervals.isEmpty()) return arrayOf()

        // Step 1: Sort by the start value
        intervals.sortBy { it[0] }

        val merged = mutableListOf&lt;IntArray&gt;()

        for (interval in intervals) {
            if (merged.isEmpty() || merged.last()[1] &lt; interval[0]) {
                // No overlap, add the interval
                merged.add(interval)
            } else {
                // Overlap exists, merge with the last interval
                merged.last()[1] = maxOf(merged.last()[1], interval[1])
            }
        }

        return merged.toTypedArray()
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function merge(intervals: number[][]): number[][] {
    if (intervals.length === 0) return [];

    // Step 1: Sort by the start value
    intervals.sort((a, b) =&gt; a[0] - b[0]);

    const merged: number[][] = [];

    for (const interval of intervals) {
        if (merged.length === 0 || merged[merged.length - 1][1] &lt; interval[0]) {
            // No overlap, add the interval
            merged.push(interval);
        } else {
            // Overlap exists, merge with the last interval
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
        }
    }

    return merged;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length == 0) return new int[0][];

        // Step 1: Sort by the start value
        Arrays.sort(intervals, (a, b) -&gt; Integer.compare(a[0], b[0]));

        List&lt;int[]&gt; merged = new ArrayList&lt;&gt;();

        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] &lt; interval[0]) {
                // No overlap, add the interval
                merged.add(interval);
            } else {
                // Overlap exists, merge with the last interval
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
            }
        }

        return merged.toArray(new int[merged.size()][]);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def merge(self, intervals: List[List[int]]) -&gt; List[List[int]]:
        if not intervals:
            return []

        # Step 1: Sort by the start value
        intervals.sort(key=lambda x: x[0])

        merged = []

        for interval in intervals:
            if not merged or merged[-1][1] &lt; interval[0]:
                # No overlap, add the interval
                merged.append(interval)
            else:
                # Overlap exists, merge with the last interval
                merged[-1][1] = max(merged[-1][1], interval[1])

        return merged
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Sorting</strong>: <code>O(n log n)</code></li><li><strong>Merging</strong>: <code>O(n)</code></li><li><strong>Total Time Complexity</strong>: <strong><code>O(n log n)</code></strong></li><li><strong>Space Complexity</strong>: <ul><li>Sorting requires <code>O(log n)</code> space (depending on the sorting algorithm).</li><li>The result list holds at most <code>n</code> intervals.</li><li><strong>Overall: O(n)</strong></li></ul></li></ul>`,13))])}const x=a(p,[["render",c]]);export{f as __pageData,x as default};
