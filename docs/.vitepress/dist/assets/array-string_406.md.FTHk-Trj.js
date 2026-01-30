import{_ as o,C as a,c as r,o as s,j as t,ag as i,G as l,a as p}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"406. Queue Reconstruction by Height","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/406.md","filePath":"array-string/406.md"}'),c={name:"array-string/406.md"},u={id:"_406-queue-reconstruction-by-height",tabindex:"-1"};function h(d,e,g,b,y,m){const n=a("Badge");return s(),r("div",null,[t("h1",u,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/queue-reconstruction-by-height/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"406. Queue Reconstruction by Height",-1)),l(n,{type:"warning",text:"Medium"}),e[1]||(e[1]=p()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_406-queue-reconstruction-by-height","aria-label":'Permalink to "[406. Queue Reconstruction by Height](https://leetcode.com/problems/queue-reconstruction-by-height/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=i(`<p>You are given an array of people, <code>people</code>, which are the attributes of some people in a queue (not necessarily in order). Each <code>people[i] = [h<sub>i</sub>, k<sub>i</sub>]</code> represents the <code>i<sup>th</sup></code> person of height <code>h<sub>i</sub></code> with exactly <code>k<sub>i</sub></code> other people in front who have a height greater than or equal to <code>h<sub>i</sub></code>.</p><p>Reconstruct and return the queue that is represented by the input array <code>people</code>. The returned queue should be formatted as an array <code>queue</code>, where <code>queue[j] = [h<sub>j</sub>, k<sub>j</sub>]</code> is the attributes of the <code>j<sup>th</sup></code> person in the queue (<code>queue[0]</code> is the person at the front of the queue).</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
Explanation:
Person 0 has height 5 with no one taller or the same height in front.
Person 1 has height 7 with no one taller or the same height in front.
Person 2 has height 5 with two persons taller or the same height in front, which is person 0 and 1.
Person 3 has height 6 with one person taller or the same height in front, which is person 1.
Person 4 has height 4 with four people taller or the same height in front, which are persons 0, 1, 2, and 3.
Person 5 has height 7 with one person taller or the same height in front, which is person 1.
Hence [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] is the reconstructed queue.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
Output: [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= people.length &lt;= 2000</code></li><li><code>0 &lt;= h<sub>i</sub> &lt;= 10<sup>6</sup></code></li><li><code>0 &lt;= k<sub>i</sub> &lt; people.length</code></li><li>It is guaranteed that the queue can be reconstructed.</li></ul><h2 id="💡-approach-greedy-with-sorting" tabindex="-1">💡 Approach: Greedy with Sorting <a class="header-anchor" href="#💡-approach-greedy-with-sorting" aria-label="Permalink to &quot;💡 Approach: Greedy with Sorting&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>Sort people by height in descending order, and for people with the same height, sort by k in ascending order. Then insert each person at position k in the result list.</p><p><strong>Key Insight:</strong></p><ul><li>Taller people don&#39;t care about shorter people in front of them</li><li>By processing taller people first, we can insert shorter people at the correct position (their k value) without affecting taller people&#39;s positions</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Sort</strong> people: descending by height, ascending by k for same height</li><li><strong>Insert</strong> each person at index <code>k</code> in the result list</li><li>The insertion automatically maintains the correct order because taller people are already placed</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Processing taller people first ensures shorter people can be inserted at their k position without affecting taller people</li><li>Using list insertion (like <code>list.add(index, element)</code>) maintains the relative order</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-nVien" id="tab-wRLb7Hs" checked><label data-title="Kotlin" for="tab-wRLb7Hs">Kotlin</label><input type="radio" name="group-nVien" id="tab-S70VQOO"><label data-title="TypeScript" for="tab-S70VQOO">TypeScript</label><input type="radio" name="group-nVien" id="tab-8QbHwrs"><label data-title="Java" for="tab-8QbHwrs">Java</label><input type="radio" name="group-nVien" id="tab-vO9EMy2"><label data-title="Python" for="tab-vO9EMy2">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun reconstructQueue(people: Array&lt;IntArray&gt;): Array&lt;IntArray&gt; {
        people.sortWith(compareBy&lt;IntArray&gt; { -it[0] }.thenBy { it[1] })
        
        val result = mutableListOf&lt;IntArray&gt;()
        for (person in people) {
            result.add(person[1], person)
        }
        
        return result.toTypedArray()
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function reconstructQueue(people: number[][]): number[][] {
    people.sort((a, b) =&gt; {
        if (a[0] !== b[0]) {
            return b[0] - a[0]; // descending by height
        }
        return a[1] - b[1]; // ascending by k
    });
    
    const result: number[][] = [];
    for (const person of people) {
        result.splice(person[1], 0, person);
    }
    
    return result;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">import java.util.*;

class Solution {
    public int[][] reconstructQueue(int[][] people) {
        Arrays.sort(people, (a, b) -&gt; {
            if (a[0] != b[0]) {
                return Integer.compare(b[0], a[0]); // descending by height
            }
            return Integer.compare(a[1], b[1]); // ascending by k
        });
        
        List&lt;int[]&gt; result = new ArrayList&lt;&gt;();
        for (int[] person : people) {
            result.add(person[1], person);
        }
        
        return result.toArray(new int[result.size()][]);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def reconstructQueue(self, people: List[List[int]]) -&gt; List[List[int]]:
        people.sort(key=lambda x: (-x[0], x[1]))
        
        result = []
        for person in people:
            result.insert(person[1], person)
        
        return result
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n²), where n is the number of people. Sorting is O(n log n), but each insertion can be O(n) in worst case.</li><li><strong>Space Complexity:</strong> O(n) for the result array.</li></ul>`,21))])}const w=o(c,[["render",h]]);export{f as __pageData,w as default};
