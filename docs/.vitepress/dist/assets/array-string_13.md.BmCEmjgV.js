import{_ as t,c as a,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"13. Roman to Integer","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/13.md","filePath":"array-string/13.md"}'),l={name:"array-string/13.md"};function r(s,e,i,c,p,d){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="_13-roman-to-integer" tabindex="-1"><a href="https://leetcode.com/problems/roman-to-integer/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">13. Roman to Integer</a> <a class="header-anchor" href="#_13-roman-to-integer" aria-label="Permalink to &quot;[13. Roman to Integer](https://leetcode.com/problems/roman-to-integer/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Roman numerals are represented by seven different symbols:<code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">**Symbol**        **Value** 
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
</code></pre></div><p>For example,<code>2</code> is written as <code>II</code>in Roman numeral, just two ones added together. <code>12</code> is written as<code>XII</code>, which is simply <code>X + II</code>. The number <code>27</code> is written as <code>XXVII</code>, which is <code>XX + V + II</code>.</p><p>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not <code>IIII</code>. Instead, the number four is written as <code>IV</code>. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as <code>IX</code>. There are six instances where subtraction is used:</p><ul><li><code>I</code> can be placed before <code>V</code> (5) and <code>X</code> (10) to make 4 and 9.</li><li><code>X</code> can be placed before <code>L</code> (50) and <code>C</code> (100) to make 40 and 90.</li><li><code>C</code> can be placed before <code>D</code> (500) and <code>M</code> (1000) to make 400 and 900.</li></ul><p>Given a roman numeral, convert it to an integer.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;III&quot;
Output: 3
Explanation: III = 3.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;LVIII&quot;
Output: 58
Explanation: L = 50, V= 5, III = 3.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;MCMXCIV&quot;
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length &lt;= 15</code></li><li><code>s</code> contains onlythe characters <code>(&#39;I&#39;, &#39;V&#39;, &#39;X&#39;, &#39;L&#39;, &#39;C&#39;, &#39;D&#39;, &#39;M&#39;)</code>.</li><li>It is <strong>guaranteed</strong> that <code>s</code> is a valid roman numeral in the range <code>[1, 3999]</code>.</li></ul><h2 id="📝-approach" tabindex="-1">📝 Approach <a class="header-anchor" href="#📝-approach" aria-label="Permalink to &quot;📝 Approach&quot;">​</a></h2><p>We use the following rules of Roman numerals:</p><ul><li>If a smaller numeral appears before a larger one, it means <strong>subtraction</strong> (e.g., IV = 4).</li><li>Otherwise, it simply means <strong>addition</strong> (e.g., VI = 6).</li></ul><h3 id="algorithm" tabindex="-1">Algorithm: <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm:&quot;">​</a></h3><p>✅ Create a map of Roman numeral symbols and their integer values.<br> ✅ Iterate through the string from <strong>right to left</strong>:</p><ul><li>If the current numeral is <strong>less than</strong> the previous numeral (to the right), subtract its value.</li><li>Otherwise, add its value. ✅ This works because subtraction only occurs when a smaller numeral precedes a larger one.</li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-GjVtN" id="tab-cSWH5d8" checked><label data-title="Kotlin" for="tab-cSWH5d8">Kotlin</label><input type="radio" name="group-GjVtN" id="tab--gf7vYq"><label data-title="TypeScript" for="tab--gf7vYq">TypeScript</label><input type="radio" name="group-GjVtN" id="tab-mRZaz_4"><label data-title="Java" for="tab-mRZaz_4">Java</label><input type="radio" name="group-GjVtN" id="tab-C7eM_in"><label data-title="Python" for="tab-C7eM_in">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun romanToInt(s: String): Int {
        val map = mapOf(
            &#39;I&#39; to 1,
            &#39;V&#39; to 5,
            &#39;X&#39; to 10,
            &#39;L&#39; to 50,
            &#39;C&#39; to 100,
            &#39;D&#39; to 500,
            &#39;M&#39; to 1000
        )

        var total = 0
        var prev = 0

        for (c in s.reversed()) {
            val value = map[c]!!
            if (value &lt; prev) {
                total -= value
            } else {
                total += value
            }
            prev = value
        }

        return total
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function romanToInt(s: string): number {
    const map: { [key: string]: number } = {
        &#39;I&#39;: 1,
        &#39;V&#39;: 5,
        &#39;X&#39;: 10,
        &#39;L&#39;: 50,
        &#39;C&#39;: 100,
        &#39;D&#39;: 500,
        &#39;M&#39;: 1000
    };

    let total = 0;
    let prev = 0;

    for (let i = s.length - 1; i &gt;= 0; i--) {
        const value = map[s[i]];
        if (value &lt; prev) {
            total -= value;
        } else {
            total += value;
        }
        prev = value;
    }

    return total;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int romanToInt(String s) {
        Map&lt;Character, Integer&gt; map = new HashMap&lt;&gt;();
        map.put(&#39;I&#39;, 1);
        map.put(&#39;V&#39;, 5);
        map.put(&#39;X&#39;, 10);
        map.put(&#39;L&#39;, 50);
        map.put(&#39;C&#39;, 100);
        map.put(&#39;D&#39;, 500);
        map.put(&#39;M&#39;, 1000);

        int total = 0;
        int prev = 0;

        for (int i = s.length() - 1; i &gt;= 0; i--) {
            int value = map.get(s.charAt(i));
            if (value &lt; prev) {
                total -= value;
            } else {
                total += value;
            }
            prev = value;
        }

        return total;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def romanToInt(self, s: str) -&gt; int:
        map_dict = {
            &#39;I&#39;: 1,
            &#39;V&#39;: 5,
            &#39;X&#39;: 10,
            &#39;L&#39;: 50,
            &#39;C&#39;: 100,
            &#39;D&#39;: 500,
            &#39;M&#39;: 1000
        }

        total = 0
        prev = 0

        for char in reversed(s):
            value = map_dict[char]
            if value &lt; prev:
                total -= value
            else:
                total += value
            prev = value

        return total
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><h3 id="time-complexity" tabindex="-1">Time Complexity <a class="header-anchor" href="#time-complexity" aria-label="Permalink to &quot;Time Complexity&quot;">​</a></h3><ul><li>We iterate through the input string <strong>once</strong>, and for each character, we perform constant-time operations (lookup and comparison).</li><li>Therefore:</li></ul><p><strong>O(n)</strong> — where <em>n</em> is the length of the string.</p><hr><h3 id="space-complexity" tabindex="-1">Space Complexity <a class="header-anchor" href="#space-complexity" aria-label="Permalink to &quot;Space Complexity&quot;">​</a></h3><ul><li>We use: <ul><li>A fixed-size map of Roman numeral symbols → constant space.</li><li>A few integer variables → constant space.</li></ul></li><li>Therefore:</li></ul><p><strong>O(1)</strong> — constant space.</p><hr><table tabindex="0"><thead><tr><th>Type</th><th>Complexity</th></tr></thead><tbody><tr><td>⌛ Time</td><td><strong>O(n)</strong></td></tr><tr><td>📦 Space</td><td><strong>O(1)</strong></td></tr></tbody></table>`,34)]))}const h=t(l,[["render",r]]);export{m as __pageData,h as default};
