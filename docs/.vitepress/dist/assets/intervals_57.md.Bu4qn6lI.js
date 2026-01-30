import{_ as a,C as r,c as l,o as i,j as t,ag as s,G as o,a as d}from"./chunks/framework.Bw-5EFTY.js";const y=JSON.parse('{"title":"57. Insert Interval","description":"","frontmatter":{},"headers":[],"relativePath":"intervals/57.md","filePath":"intervals/57.md"}'),p={name:"intervals/57.md"},v={id:"_57-insert-interval",tabindex:"-1"};function c(m,e,g,h,u,I){const n=r("Badge");return i(),l("div",null,[t("h1",v,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/insert-interval/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"57. Insert Interval",-1)),o(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_57-insert-interval","aria-label":'Permalink to "[57. Insert Interval](https://leetcode.com/problems/insert-interval/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=s(`<p>You are given an array of non-overlapping intervals <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> represent the start and the end of the <code>i^th</code> interval and <code>intervals</code> is sorted in ascending order by <code>start<sub>i</sub></code>. You are also given an interval <code>newInterval = [start, end]</code> that represents the start and end of another interval.</p><p>Insert <code>newInterval</code> into <code>intervals</code> such that <code>intervals</code> is still sorted in ascending order by <code>start<sub>i</sub></code> and <code>intervals</code> still does not have any overlapping intervals (merge overlapping intervals if necessary).</p><p>Return <code>intervals</code> after the insertion.</p><p><strong>Note</strong> that you don&#39;t need to modify <code>intervals</code> in-place. You can make a new array and return it.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>0 &lt;= intervals.length &lt;= 10^4</code></li><li><code>intervals[i].length == 2</code></li><li><code>0 &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10^5</code></li><li><code>intervals</code> is sorted by <code>start<sub>i</sub></code> in <strong>ascending</strong> order.</li><li><code>newInterval.length == 2</code></li><li><code>0 &lt;= start &lt;= end &lt;= 10^5</code></li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>The key is to find the correct position for the <code>newInterval</code> and then merge it with any overlapping intervals. We can iterate through the existing intervals and handle three distinct cases:</p><ol><li><strong>Non-overlapping intervals before <code>newInterval</code>:</strong><ul><li>If the current interval ends before <code>newInterval</code> starts, it means there&#39;s no overlap. Add the current interval to the result list directly.</li></ul></li><li><strong>Overlapping intervals:</strong><ul><li>If the current interval overlaps with <code>newInterval</code> (i.e., they intersect), we need to merge them. Update the <code>newInterval</code>&#39;s start to the minimum of the two starts, and its end to the maximum of the two ends. We don&#39;t add anything to the result list yet.</li></ul></li><li><strong>Non-overlapping intervals after <code>newInterval</code>:</strong><ul><li>If the current interval starts after the <code>newInterval</code> ends, it means we have finished merging. Add the (potentially merged) <code>newInterval</code> to the result list, then add all remaining intervals from the original list.</li></ul></li></ol><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-0OmN2" id="tab-Vsr7I3-" checked><label data-title="Kotlin" for="tab-Vsr7I3-">Kotlin</label><input type="radio" name="group-0OmN2" id="tab-_YQ06hj"><label data-title="TypeScript" for="tab-_YQ06hj">TypeScript</label><input type="radio" name="group-0OmN2" id="tab-rZW0XNQ"><label data-title="Java" for="tab-rZW0XNQ">Java</label><input type="radio" name="group-0OmN2" id="tab-zt12g9h"><label data-title="Python" for="tab-zt12g9h">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun insert(intervals: Array&lt;IntArray&gt;, newInterval: IntArray): Array&lt;IntArray&gt; {
        val merged = mutableListOf&lt;IntArray&gt;()
        var i = 0
        val n = intervals.size

        // Case 1: Add all intervals that end before the newInterval starts
        while (i &lt; n &amp;&amp; intervals[i][1] &lt; newInterval[0]) {
            merged.add(intervals[i])
            i++
        }

        // Case 2: Merge overlapping intervals
        var tempInterval = newInterval
        while (i &lt; n &amp;&amp; intervals[i][0] &lt;= tempInterval[1]) {
            tempInterval[0] = minOf(tempInterval[0], intervals[i][0])
            tempInterval[1] = maxOf(tempInterval[1], intervals[i][1])
            i++
        }
        merged.add(tempInterval)

        // Case 3: Add all remaining intervals
        while (i &lt; n) {
            merged.add(intervals[i])
            i++
        }

        return merged.toTypedArray()
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    insert(intervals: number[][], newInterval: number[]): number[][] {
        const merged: number[][] = [];
        let i = 0;
        const n = intervals.length;

        // Case 1: Add all intervals that end before the newInterval starts
        while (i &lt; n &amp;&amp; intervals[i][1] &lt; newInterval[0]) {
            merged.push(intervals[i]);
            i++;
        }

        // Case 2: Merge overlapping intervals
        let tempInterval = [...newInterval];
        while (i &lt; n &amp;&amp; intervals[i][0] &lt;= tempInterval[1]) {
            tempInterval[0] = Math.min(tempInterval[0], intervals[i][0]);
            tempInterval[1] = Math.max(tempInterval[1], intervals[i][1]);
            i++;
        }
        merged.push(tempInterval);

        // Case 3: Add all remaining intervals
        while (i &lt; n) {
            merged.push(intervals[i]);
            i++;
        }

        return merged;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List&lt;int[]&gt; merged = new ArrayList&lt;&gt;();
        int i = 0;
        int n = intervals.length;

        // Case 1: Add all intervals that end before the newInterval starts
        while (i &lt; n &amp;&amp; intervals[i][1] &lt; newInterval[0]) {
            merged.add(intervals[i]);
            i++;
        }

        // Case 2: Merge overlapping intervals
        int[] tempInterval = newInterval.clone();
        while (i &lt; n &amp;&amp; intervals[i][0] &lt;= tempInterval[1]) {
            tempInterval[0] = Math.min(tempInterval[0], intervals[i][0]);
            tempInterval[1] = Math.max(tempInterval[1], intervals[i][1]);
            i++;
        }
        merged.add(tempInterval);

        // Case 3: Add all remaining intervals
        while (i &lt; n) {
            merged.add(intervals[i]);
            i++;
        }

        return merged.toArray(new int[merged.size()][]);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -&gt; List[List[int]]:
        merged = []
        i = 0
        n = len(intervals)

        # Case 1: Add all intervals that end before the newInterval starts
        while i &lt; n and intervals[i][1] &lt; newInterval[0]:
            merged.append(intervals[i])
            i += 1

        # Case 2: Merge overlapping intervals
        temp_interval = newInterval[:]
        while i &lt; n and intervals[i][0] &lt;= temp_interval[1]:
            temp_interval[0] = min(temp_interval[0], intervals[i][0])
            temp_interval[1] = max(temp_interval[1], intervals[i][1])
            i += 1
        merged.append(temp_interval)

        # Case 3: Add all remaining intervals
        while i &lt; n:
            merged.append(intervals[i])
            i += 1

        return merged
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity</strong>: <strong><code>O(n)</code></strong>. We iterate through the list of intervals only once. The time complexity is linear with respect to the number of intervals.</li><li><strong>Space Complexity</strong>: <strong><code>O(n)</code></strong>. The space used is for storing the result list, which in the worst-case scenario (no overlaps) can contain up to <code>n + 1</code> intervals.</li></ul>`,18))])}const w=a(p,[["render",c]]);export{y as __pageData,w as default};
