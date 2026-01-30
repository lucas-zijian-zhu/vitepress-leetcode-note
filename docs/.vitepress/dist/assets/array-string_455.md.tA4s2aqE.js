import{_ as n,C as i,c as a,o as s,j as t,ag as l,G as r,a as c}from"./chunks/framework.Bw-5EFTY.js";const v=JSON.parse('{"title":"455. Assign Cookies","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/455.md","filePath":"array-string/455.md"}'),d={name:"array-string/455.md"},p={id:"_455-assign-cookies",tabindex:"-1"};function h(g,e,u,m,y,f){const o=i("Badge");return s(),a("div",null,[t("h1",p,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/assign-cookies/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"455. Assign Cookies",-1)),r(o,{type:"info",text:"Easy"}),e[1]||(e[1]=c()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_455-assign-cookies","aria-label":'Permalink to "[455. Assign Cookies](https://leetcode.com/problems/assign-cookies/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="info" text="Easy" />"'},"​",-1))]),e[3]||(e[3]=l(`<p>Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.</p><p>Each child <code>i</code> has a greed factor <code>g[i]</code>, which is the minimum size of a cookie that the child will be content with; and each cookie <code>j</code> has a size <code>s[j]</code>. If <code>s[j] &gt;= g[i]</code>, we can assign the cookie <code>j</code> to the child <code>i</code>, and the child <code>i</code> will be content. Your goal is to maximize the number of your content children and output the maximum number.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
You need to output 1.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: g = [1,2], s = [1,2,3]
Output: 2
Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. 
You have 3 cookies and their sizes are big enough to gratify all of the children, 
You need to output 2.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= g.length &lt;= 3 * 10^4</code></li><li><code>0 &lt;= s.length &lt;= 3 * 10^4</code></li><li><code>1 &lt;= g[i], s[j] &lt;= 2^31 - 1</code></li></ul><h2 id="💡-approach-greedy-algorithm" tabindex="-1">💡 Approach: Greedy Algorithm <a class="header-anchor" href="#💡-approach-greedy-algorithm" aria-label="Permalink to &quot;💡 Approach: Greedy Algorithm&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>greedy algorithm</strong> problem. The key insight is to:</p><ol><li>Sort both arrays in ascending order</li><li>Try to satisfy the least greedy child first with the smallest cookie that can satisfy them</li><li>This maximizes the number of satisfied children</li></ol><p><strong>Key Insight:</strong></p><ul><li>If we satisfy a child with a larger greed factor first, we might waste a large cookie that could satisfy multiple smaller children</li><li>By satisfying smaller greed factors first, we maximize the number of children we can satisfy</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Sort</strong> both arrays: <code>g</code> (greed factors) and <code>s</code> (cookie sizes) in ascending order</li><li><strong>Initialize two pointers:</strong> <code>i = 0</code> for children, <code>j = 0</code> for cookies</li><li><strong>While both pointers are valid:</strong><ul><li>If <code>s[j] &gt;= g[i]</code>: assign cookie <code>j</code> to child <code>i</code>, increment both pointers and count</li><li>Else: move to next cookie (increment <code>j</code>)</li></ul></li><li><strong>Return</strong> the count of satisfied children</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Greedy approach: always try to satisfy the least greedy child first</li><li>Sorting allows us to process in order and make optimal choices</li><li>Time complexity: O(n log n + m log m) for sorting, O(n + m) for matching</li><li>Space complexity: O(1) if we don&#39;t count the sorting space</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-XLKBb" id="tab-ptMLWxk" checked><label data-title="Kotlin" for="tab-ptMLWxk">Kotlin</label><input type="radio" name="group-XLKBb" id="tab-bmJTqNp"><label data-title="TypeScript" for="tab-bmJTqNp">TypeScript</label><input type="radio" name="group-XLKBb" id="tab-L13mfRX"><label data-title="Java" for="tab-L13mfRX">Java</label><input type="radio" name="group-XLKBb" id="tab-_vRpRam"><label data-title="Python" for="tab-_vRpRam">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun findContentChildren(g: IntArray, s: IntArray): Int {
        g.sort()
        s.sort()
        
        var i = 0  // pointer for children
        var j = 0  // pointer for cookies
        var count = 0
        
        while (i &lt; g.size &amp;&amp; j &lt; s.size) {
            if (s[j] &gt;= g[i]) {
                count++
                i++
            }
            j++
        }
        
        return count
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function findContentChildren(g: number[], s: number[]): number {
    g.sort((a, b) =&gt; a - b);
    s.sort((a, b) =&gt; a - b);
    
    let i = 0;  // pointer for children
    let j = 0;  // pointer for cookies
    let count = 0;
    
    while (i &lt; g.length &amp;&amp; j &lt; s.length) {
        if (s[j] &gt;= g[i]) {
            count++;
            i++;
        }
        j++;
    }
    
    return count;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">import java.util.Arrays;

class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);
        
        int i = 0;  // pointer for children
        int j = 0;  // pointer for cookies
        int count = 0;
        
        while (i &lt; g.length &amp;&amp; j &lt; s.length) {
            if (s[j] &gt;= g[i]) {
                count++;
                i++;
            }
            j++;
        }
        
        return count;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -&gt; int:
        g.sort()
        s.sort()
        
        i = 0  # pointer for children
        j = 0  # pointer for cookies
        count = 0
        
        while i &lt; len(g) and j &lt; len(s):
            if s[j] &gt;= g[i]:
                count += 1
                i += 1
            j += 1
        
        return count
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n log n + m log m), where n is the length of <code>g</code> and m is the length of <code>s</code>. This is due to sorting both arrays. The matching process is O(n + m).</li><li><strong>Space Complexity:</strong> O(1), excluding the space used for sorting (which is typically O(log n) for the sorting algorithm&#39;s recursion stack or O(1) for iterative sorting).</li></ul>`,22))])}const k=n(d,[["render",h]]);export{v as __pageData,k as default};
