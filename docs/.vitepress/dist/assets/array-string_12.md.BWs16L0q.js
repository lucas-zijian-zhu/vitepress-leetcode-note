import{_ as e,c as o,o as a,ag as n}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"12. Integer to Roman","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/12.md","filePath":"array-string/12.md"}'),l={name:"array-string/12.md"};function s(r,t,u,i,d,p){return a(),o("div",null,t[0]||(t[0]=[n(`<h1 id="_12-integer-to-roman" tabindex="-1"><a href="https://leetcode.com/problems/integer-to-roman/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">12. Integer to Roman</a> <a class="header-anchor" href="#_12-integer-to-roman" aria-label="Permalink to &quot;[12. Integer to Roman](https://leetcode.com/problems/integer-to-roman/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Seven different symbols represent Roman numerals with the following values:</p><table><thead><tr><th>Symbol</th><th>Value</th></tr></thead><tbody><tr><td>I</td><td>1</td></tr><tr><td>V</td><td>5</td></tr><tr><td>X</td><td>10</td></tr><tr><td>L</td><td>50</td></tr><tr><td>C</td><td>100</td></tr><tr><td>D</td><td>500</td></tr><tr><td>M</td><td>1000</td></tr></tbody></table><p>Roman numerals are formed by appendingthe conversions ofdecimal place valuesfrom highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:</p><ul><li>If the value does not start with 4 or9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.</li><li>If the value starts with 4 or 9 use the<strong>subtractive form</strong> representingone symbol subtracted from the following symbol, for example,4 is 1 (<code>I</code>) less than 5 (<code>V</code>): <code>IV</code>and 9 is 1 (<code>I</code>) less than 10 (<code>X</code>): <code>IX</code>.Only the following subtractive forms are used: 4 (<code>IV</code>), 9 (<code>IX</code>),40 (<code>XL</code>), 90 (<code>XC</code>), 400 (<code>CD</code>) and 900 (<code>CM</code>).</li><li>Only powers of 10 (<code>I</code>, <code>X</code>, <code>C</code>, <code>M</code>) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5(<code>V</code>), 50 (<code>L</code>), or 500 (<code>D</code>) multiple times. If you need to append a symbol4 timesuse the <strong>subtractive form</strong> .</li></ul><p>Given an integer, convert it to a Roman numeral.</p><p><strong>Example 1:</strong></p><p>Input: num = 3749</p><p>Output: &quot;MMMDCCXLIX&quot;</p><p>Explanation:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC as 500 (D) + 100 (C) + 100 (C)
  40 = XL as 10 (X) less of 50 (L)
   9 = IX as 1 (I) less of 10 (X)
Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places
</code></pre></div><p><strong>Example 2:</strong></p><p>Input: num = 58</p><p>Output: &quot;LVIII&quot;</p><p>Explanation:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">50 = L
 8 = VIII
</code></pre></div><p><strong>Example 3:</strong></p><p>Input: num = 1994</p><p>Output: &quot;MCMXCIV&quot;</p><p>Explanation:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">1000 = M
 900 = CM
  90 = XC
   4 = IV
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= num &lt;= 3999</code></li></ul><h2 id="📝-approach" tabindex="-1">📝 Approach <a class="header-anchor" href="#📝-approach" aria-label="Permalink to &quot;📝 Approach&quot;">​</a></h2><p>We use a <strong>greedy algorithm</strong>:</p><p>✅ Create two arrays:</p><ul><li><code>values</code>: the Roman numeral values in descending order.</li><li><code>symbols</code>: the corresponding Roman numeral symbols.</li></ul><p>✅ Iterate through <code>values</code> from largest to smallest:</p><ul><li>While the current value can fit into <code>num</code>, subtract it and append the corresponding symbol to the result.</li><li>Continue until <code>num</code> becomes 0.</li></ul><p>Why does greedy work?<br> Because Roman numerals are additive/subtractive in a fixed order, so subtracting the largest possible symbol each time always leads to the correct minimal representation.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-apRh2" id="tab-OJ5Jrf6" checked><label data-title="Kotlin" for="tab-OJ5Jrf6">Kotlin</label><input type="radio" name="group-apRh2" id="tab-cE_modG"><label data-title="TypeScript" for="tab-cE_modG">TypeScript</label><input type="radio" name="group-apRh2" id="tab-Tw9XZWM"><label data-title="Java" for="tab-Tw9XZWM">Java</label><input type="radio" name="group-apRh2" id="tab-PzmfFOD"><label data-title="Python" for="tab-PzmfFOD">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun intToRoman(num: Int): String {
        val values = intArrayOf(
            1000, 900, 500, 400,
            100, 90, 50, 40,
            10, 9, 5, 4, 1
        )
        val symbols = arrayOf(
            &quot;M&quot;, &quot;CM&quot;, &quot;D&quot;, &quot;CD&quot;,
            &quot;C&quot;, &quot;XC&quot;, &quot;L&quot;, &quot;XL&quot;,
            &quot;X&quot;, &quot;IX&quot;, &quot;V&quot;, &quot;IV&quot;, &quot;I&quot;
        )

        var n = num
        val sb = StringBuilder()

        for (i in values.indices) {
            while (n &gt;= values[i]) {
                n -= values[i]
                sb.append(symbols[i])
            }
        }
        return sb.toString()
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function intToRoman(num: number): string {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = [&quot;M&quot;, &quot;CM&quot;, &quot;D&quot;, &quot;CD&quot;, &quot;C&quot;, &quot;XC&quot;, &quot;L&quot;, &quot;XL&quot;, &quot;X&quot;, &quot;IX&quot;, &quot;V&quot;, &quot;IV&quot;, &quot;I&quot;];

    let result = &quot;&quot;;
    let n = num;

    for (let i = 0; i &lt; values.length; i++) {
        while (n &gt;= values[i]) {
            n -= values[i];
            result += symbols[i];
        }
    }
    return result;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public String intToRoman(int num) {
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] symbols = {&quot;M&quot;, &quot;CM&quot;, &quot;D&quot;, &quot;CD&quot;, &quot;C&quot;, &quot;XC&quot;, &quot;L&quot;, &quot;XL&quot;, &quot;X&quot;, &quot;IX&quot;, &quot;V&quot;, &quot;IV&quot;, &quot;I&quot;};

        StringBuilder sb = new StringBuilder();
        int n = num;

        for (int i = 0; i &lt; values.length; i++) {
            while (n &gt;= values[i]) {
                n -= values[i];
                sb.append(symbols[i]);
            }
        }
        return sb.toString();
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def intToRoman(self, num: int) -&gt; str:
        values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
        symbols = [&quot;M&quot;, &quot;CM&quot;, &quot;D&quot;, &quot;CD&quot;, &quot;C&quot;, &quot;XC&quot;, &quot;L&quot;, &quot;XL&quot;, &quot;X&quot;, &quot;IX&quot;, &quot;V&quot;, &quot;IV&quot;, &quot;I&quot;]

        result = &quot;&quot;
        n = num

        for i in range(len(values)):
            while n &gt;= values[i]:
                n -= values[i]
                result += symbols[i]

        return result
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><h3 id="time-complexity" tabindex="-1">Time Complexity <a class="header-anchor" href="#time-complexity" aria-label="Permalink to &quot;Time Complexity&quot;">​</a></h3><ul><li>The algorithm iterates over the fixed list of Roman numeral values (length = 13) and, in the worst case, repeatedly subtracts the smallest value (<code>1</code>) from <code>num</code>.</li><li>However, since <code>num</code> is bounded (≤ 3999), the number of operations is also bounded.</li><li>Therefore, the time complexity is:</li></ul><p><strong>O(1)</strong> — constant time.</p><hr><h3 id="space-complexity" tabindex="-1">Space Complexity <a class="header-anchor" href="#space-complexity" aria-label="Permalink to &quot;Space Complexity&quot;">​</a></h3><ul><li>We only use: <ul><li>Two fixed arrays (<code>values</code>, <code>symbols</code>) of length 13.</li><li>A <code>StringBuilder</code> to construct the result.</li></ul></li><li>These do not depend on the input size.</li></ul><p><strong>O(1)</strong> — constant space.</p><hr><table tabindex="0"><thead><tr><th>Type</th><th>Complexity</th></tr></thead><tbody><tr><td>⌛ Time</td><td><strong>O(1)</strong></td></tr><tr><td>📦 Space</td><td><strong>O(1)</strong></td></tr></tbody></table>`,43)]))}const h=e(l,[["render",s]]);export{m as __pageData,h as default};
