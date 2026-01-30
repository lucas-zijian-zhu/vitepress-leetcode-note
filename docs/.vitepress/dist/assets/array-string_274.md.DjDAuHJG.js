import{_ as e,c as n,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"274. H-Index","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/274.md","filePath":"array-string/274.md"}'),i={name:"array-string/274.md"};function s(c,t,r,d,l,p){return a(),n("div",null,t[0]||(t[0]=[o(`<h1 id="_274-h-index" tabindex="-1"><a href="https://leetcode.com/problems/h-index/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">274. H-Index</a> <a class="header-anchor" href="#_274-h-index" aria-label="Permalink to &quot;[274. H-Index](https://leetcode.com/problems/h-index/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an array of integers <code>citations</code> where <code>citations[i]</code> is the number of citations a researcher received for their <code>i^th</code> paper, return the researcher&#39;s h-index.</p><p>According to the <a href="https://en.wikipedia.org/wiki/H-index" target="_blank">definition of h-index on Wikipedia</a>: The h-index is defined as the maximum value of <code>h</code> such that the given researcher has published at least <code>h</code> papers that have each been cited at least <code>h</code> times.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: citations = [3,0,6,1,5]
Output: 3
Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.
Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: citations = [1,3,1]
Output: 1
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>n == citations.length</code></li><li><code>1 &lt;= n &lt;= 5000</code></li><li><code>0 &lt;= citations[i] &lt;= 1000</code></li></ul><h2 id="📝-approach" tabindex="-1">📝 Approach <a class="header-anchor" href="#📝-approach" aria-label="Permalink to &quot;📝 Approach&quot;">​</a></h2><p>We want to find the largest integer <code>h</code> such that there are at least <code>h</code> papers with <strong>at least</strong> <code>h</code> citations each.<br> We can use a <strong>bucket sort idea</strong>, because citation counts beyond <code>n</code> (the number of papers) can all go into the same bucket at <code>n</code>.</p><h3 id="steps" tabindex="-1">Steps: <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps:&quot;">​</a></h3><p>1️⃣ Create an array <code>buckets</code> of size <code>n+1</code>, where <code>buckets[i]</code> counts the number of papers with exactly <code>i</code> citations.<br> 2️⃣ Iterate through <code>citations</code>, and increment <code>buckets[min(citation, n)]</code>.<br> 3️⃣ Iterate from <code>n</code> down to <code>0</code>, summing up the counts of papers.<br> 4️⃣ When the cumulative count ≥ <code>i</code>, return <code>i</code> as the H-Index.<br> 5️⃣ If no such <code>i</code> is found, return <code>0</code>.</p><p>This avoids sorting the array and runs in <strong>O(n)</strong> time and space.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-cY0vP" id="tab-UbzGtZS" checked><label data-title="Kotlin" for="tab-UbzGtZS">Kotlin</label><input type="radio" name="group-cY0vP" id="tab-WoUrugz"><label data-title="TypeScript" for="tab-WoUrugz">TypeScript</label><input type="radio" name="group-cY0vP" id="tab-QXokCid"><label data-title="Java" for="tab-QXokCid">Java</label><input type="radio" name="group-cY0vP" id="tab-sSMXS9S"><label data-title="Python" for="tab-sSMXS9S">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun hIndex(citations: IntArray): Int {
        val n = citations.size
        val buckets = IntArray(n + 1)

        for (c in citations) {
            buckets[minOf(c, n)]++
        }

        var total = 0
        for (i in n downTo 0) {
            total += buckets[i]
            if (total &gt;= i) return i
        }

        return 0
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function hIndex(citations: number[]): number {
    const n = citations.length;
    const buckets = new Array(n + 1).fill(0);

    for (const c of citations) {
        buckets[Math.min(c, n)]++;
    }

    let total = 0;
    for (let i = n; i &gt;= 0; i--) {
        total += buckets[i];
        if (total &gt;= i) return i;
    }

    return 0;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int hIndex(int[] citations) {
        int n = citations.length;
        int[] buckets = new int[n + 1];

        for (int c : citations) {
            buckets[Math.min(c, n)]++;
        }

        int total = 0;
        for (int i = n; i &gt;= 0; i--) {
            total += buckets[i];
            if (total &gt;= i) return i;
        }

        return 0;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def hIndex(self, citations: List[int]) -&gt; int:
        n = len(citations)
        buckets = [0] * (n + 1)

        for c in citations:
            buckets[min(c, n)] += 1

        total = 0
        for i in range(n, -1, -1):
            total += buckets[i]
            if total &gt;= i:
                return i

        return 0
</code></pre></div></div></div><h2 id="⏱️-complexity" tabindex="-1">⏱️ Complexity <a class="header-anchor" href="#⏱️-complexity" aria-label="Permalink to &quot;⏱️ Complexity&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Type</th><th>Complexity</th></tr></thead><tbody><tr><td>⏳ <strong>Time Complexity</strong></td><td>O(n)</td></tr><tr><td>🗂️ <strong>Space Complexity</strong></td><td>O(n)</td></tr></tbody></table><ul><li>We iterate through the citations array once: <strong>O(n)</strong></li><li>We iterate through the buckets once: <strong>O(n)</strong></li><li>We use an auxiliary array of size <strong>n+1</strong>: <strong>O(n)</strong></li></ul>`,20)]))}const g=e(i,[["render",s]]);export{u as __pageData,g as default};
