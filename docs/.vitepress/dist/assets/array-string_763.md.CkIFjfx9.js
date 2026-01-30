import{_ as n,C as s,c as i,o as r,j as e,ag as l,G as o,a as d}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"763. Partition Labels","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/763.md","filePath":"array-string/763.md"}'),c={name:"array-string/763.md"},p={id:"_763-partition-labels",tabindex:"-1"};function u(h,t,g,b,v,m){const a=s("Badge");return r(),i("div",null,[e("h1",p,[t[0]||(t[0]=e("a",{href:"https://leetcode.com/problems/partition-labels/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"763. Partition Labels",-1)),o(a,{type:"warning",text:"Medium"}),t[1]||(t[1]=d()),t[2]||(t[2]=e("a",{class:"header-anchor",href:"#_763-partition-labels","aria-label":'Permalink to "[763. Partition Labels](https://leetcode.com/problems/partition-labels/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),t[3]||(t[3]=l(`<p>You are given a string <code>s</code>. We want to partition the string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;ababcbacadefegdehijhklij&quot;
Output: [9,7,8]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;eccbbbbdec&quot;
Output: [10]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length &lt;= 500</code></li><li><code>s</code> consists of lowercase English letters.</li></ul><h2 id="💡-approach-greedy-with-last-occurrence" tabindex="-1">💡 Approach: Greedy with Last Occurrence <a class="header-anchor" href="#💡-approach-greedy-with-last-occurrence" aria-label="Permalink to &quot;💡 Approach: Greedy with Last Occurrence&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>If we know the last position of every character, we can expand the current partition to include all characters that appear within it. When the current index reaches the farthest last occurrence seen so far, we can close a partition.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li>Record the last index of each character.</li><li>Scan the string while tracking <code>end</code> = farthest last index of characters seen so far.</li><li>When <code>i == end</code>, close the partition and start a new one.</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Each partition is as small as possible while still containing all occurrences of its letters.</li><li>Greedy works because extending <code>end</code> only depends on characters already seen.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-fQzIp" id="tab-Sgl6dek" checked><label data-title="Kotlin" for="tab-Sgl6dek">Kotlin</label><input type="radio" name="group-fQzIp" id="tab-vhk3_yn"><label data-title="TypeScript" for="tab-vhk3_yn">TypeScript</label><input type="radio" name="group-fQzIp" id="tab-B9LaJZz"><label data-title="Java" for="tab-B9LaJZz">Java</label><input type="radio" name="group-fQzIp" id="tab-Ql595O8"><label data-title="Python" for="tab-Ql595O8">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun partitionLabels(s: String): List&lt;Int&gt; {
        val last = IntArray(26)
        for (i in s.indices) {
            last[s[i] - &#39;a&#39;] = i
        }

        val result = mutableListOf&lt;Int&gt;()
        var start = 0
        var end = 0

        for (i in s.indices) {
            end = maxOf(end, last[s[i] - &#39;a&#39;])
            if (i == end) {
                result.add(end - start + 1)
                start = i + 1
            }
        }

        return result
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function partitionLabels(s: string): number[] {
    const last = new Array(26).fill(0);
    for (let i = 0; i &lt; s.length; i++) {
        last[s.charCodeAt(i) - 97] = i;
    }

    const result: number[] = [];
    let start = 0;
    let end = 0;

    for (let i = 0; i &lt; s.length; i++) {
        end = Math.max(end, last[s.charCodeAt(i) - 97]);
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
        }
    }

    return result;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public List&lt;Integer&gt; partitionLabels(String s) {
        int[] last = new int[26];
        for (int i = 0; i &lt; s.length(); i++) {
            last[s.charAt(i) - &#39;a&#39;] = i;
        }

        List&lt;Integer&gt; result = new ArrayList&lt;&gt;();
        int start = 0;
        int end = 0;

        for (int i = 0; i &lt; s.length(); i++) {
            end = Math.max(end, last[s.charAt(i) - &#39;a&#39;]);
            if (i == end) {
                result.add(end - start + 1);
                start = i + 1;
            }
        }

        return result;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def partitionLabels(self, s: str) -&gt; List[int]:
        last = [0] * 26
        for i, ch in enumerate(s):
            last[ord(ch) - ord(&#39;a&#39;)] = i

        res = []
        start = 0
        end = 0
        for i, ch in enumerate(s):
            end = max(end, last[ord(ch) - ord(&#39;a&#39;)])
            if i == end:
                res.append(end - start + 1)
                start = i + 1

        return res
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), single pass with last occurrence lookup.</li><li><strong>Space Complexity:</strong> O(1), fixed-size array of 26 letters.</li></ul>`,18))])}const x=n(c,[["render",u]]);export{f as __pageData,x as default};
