import{_ as n,c as t,o as a,ag as s}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"224. Basic Calculator","description":"","frontmatter":{},"headers":[],"relativePath":"stack/224.md","filePath":"stack/224.md"}'),i={name:"stack/224.md"};function l(o,e,c,r,p,u){return a(),t("div",null,e[0]||(e[0]=[s(`<h1 id="_224-basic-calculator" tabindex="-1"><a href="https://leetcode.com/problems/basic-calculator/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">224. Basic Calculator</a> <a class="header-anchor" href="#_224-basic-calculator" aria-label="Permalink to &quot;[224. Basic Calculator](https://leetcode.com/problems/basic-calculator/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a string <code>s</code> representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.</p><p><strong>Note:</strong> You are <strong>not</strong> allowed to use any built-in function which evaluates strings as mathematical expressions, such as <code>eval()</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;1 + 1&quot;
Output: 2
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot; 2-1 + 2 &quot;
Output: 3
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;(1+(4+5+2)-3)+(6+8)&quot;
Output: 23
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length &lt;= 3 * 10^5</code></li><li><code>s</code> consists of digits, <code>&#39;+&#39;</code>, <code>&#39;-&#39;</code>, <code>&#39;(&#39;</code>, <code>&#39;)&#39;</code>, and <code>&#39; &#39;</code>.</li><li><code>s</code> represents a valid expression.</li><li><code>&#39;+&#39;</code> is <strong>not</strong> used as a unary operation (i.e., <code>&quot;+1&quot;</code> and <code>&quot;+(2 + 3)&quot;</code> is invalid).</li><li><code>&#39;-&#39;</code> could be used as a unary operation (i.e., <code>&quot;-1&quot;</code> and <code>&quot;-(2 + 3)&quot;</code> is valid).</li><li>There will be no two consecutive operators in the input.</li><li>Every number and running calculation will fit in a signed 32-bit integer.</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><ol><li><strong>Use a Stack for signs:</strong><ul><li>Traverse the string character by character.</li><li>Keep a running total <code>result</code> and a <code>sign</code> (1 or -1) for the current number.</li><li>When encountering <code>&#39;(&#39;</code>, push the current <code>result</code> and <code>sign</code> onto a stack and reset <code>result</code> and <code>sign</code>.</li><li>When encountering <code>&#39;)&#39;</code>, pop the previous <code>sign</code> and <code>result</code> from the stack, and combine them with the current <code>result</code>.</li></ul></li><li><strong>Parse numbers:</strong><ul><li>When encountering a digit, build the number until the end of the consecutive digits.</li></ul></li><li><strong>Update result:</strong><ul><li>When encountering <code>&#39;+&#39;</code> or <code>&#39;-&#39;</code>, update the current <code>sign</code>.</li></ul></li><li><strong>Ignore spaces.</strong></li></ol><p><strong>Key idea:</strong> The stack keeps track of the cumulative result and the sign before each parenthesis, allowing you to handle nested expressions efficiently.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-D4tee" id="tab-94-4DrT" checked><label data-title="Kotlin" for="tab-94-4DrT">Kotlin</label><input type="radio" name="group-D4tee" id="tab-c9dV7g6"><label data-title="TypeScript" for="tab-c9dV7g6">TypeScript</label><input type="radio" name="group-D4tee" id="tab-kPjH4JY"><label data-title="Java" for="tab-kPjH4JY">Java</label><input type="radio" name="group-D4tee" id="tab-k4SS51t"><label data-title="Python" for="tab-k4SS51t">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun calculate(s: String): Int {
        var result = 0
        var number = 0
        var sign = 1
        val stack = mutableListOf&lt;Int&gt;()

        var i = 0
        while (i &lt; s.length) {
            when (val c = s[i]) {
                in &#39;0&#39;..&#39;9&#39; -&gt; {
                    number = 0
                    while (i &lt; s.length &amp;&amp; s[i].isDigit()) {
                        number = number * 10 + (s[i] - &#39;0&#39;)
                        i++
                    }
                    result += sign * number
                    continue
                }
                &#39;+&#39; -&gt; sign = 1
                &#39;-&#39; -&gt; sign = -1
                &#39;(&#39; -&gt; {
                    stack.add(result)
                    stack.add(sign)
                    result = 0
                    sign = 1
                }
                &#39;)&#39; -&gt; {
                    val prevSign = stack.removeAt(stack.size - 1)
                    val prevResult = stack.removeAt(stack.size - 1)
                    result = prevResult + prevSign * result
                }
            }
            i++
        }
        return result
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function calculate(s: string): number {
    let result = 0;
    let number = 0;
    let sign = 1;
    const stack: number[] = [];

    let i = 0;
    while (i &lt; s.length) {
        const c = s[i];
        if (c &gt;= &#39;0&#39; &amp;&amp; c &lt;= &#39;9&#39;) {
            number = 0;
            while (i &lt; s.length &amp;&amp; s[i] &gt;= &#39;0&#39; &amp;&amp; s[i] &lt;= &#39;9&#39;) {
                number = number * 10 + (s[i].charCodeAt(0) - &#39;0&#39;.charCodeAt(0));
                i++;
            }
            result += sign * number;
            continue;
        } else if (c === &#39;+&#39;) {
            sign = 1;
        } else if (c === &#39;-&#39;) {
            sign = -1;
        } else if (c === &#39;(&#39;) {
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
        } else if (c === &#39;)&#39;) {
            const prevSign = stack.pop()!;
            const prevResult = stack.pop()!;
            result = prevResult + prevSign * result;
        }
        i++;
    }
    
    return result;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int calculate(String s) {
        int result = 0;
        int number = 0;
        int sign = 1;
        Stack&lt;Integer&gt; stack = new Stack&lt;&gt;();

        int i = 0;
        while (i &lt; s.length()) {
            char c = s.charAt(i);
            if (c &gt;= &#39;0&#39; &amp;&amp; c &lt;= &#39;9&#39;) {
                number = 0;
                while (i &lt; s.length() &amp;&amp; Character.isDigit(s.charAt(i))) {
                    number = number * 10 + (s.charAt(i) - &#39;0&#39;);
                    i++;
                }
                result += sign * number;
                continue;
            } else if (c == &#39;+&#39;) {
                sign = 1;
            } else if (c == &#39;-&#39;) {
                sign = -1;
            } else if (c == &#39;(&#39;) {
                stack.push(result);
                stack.push(sign);
                result = 0;
                sign = 1;
            } else if (c == &#39;)&#39;) {
                int prevSign = stack.pop();
                int prevResult = stack.pop();
                result = prevResult + prevSign * result;
            }
            i++;
        }
        
        return result;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def calculate(self, s: str) -&gt; int:
        result = 0
        number = 0
        sign = 1
        stack = []

        i = 0
        while i &lt; len(s):
            c = s[i]
            if c.isdigit():
                number = 0
                while i &lt; len(s) and s[i].isdigit():
                    number = number * 10 + int(s[i])
                    i += 1
                result += sign * number
                continue
            elif c == &#39;+&#39;:
                sign = 1
            elif c == &#39;-&#39;:
                sign = -1
            elif c == &#39;(&#39;:
                stack.append(result)
                stack.append(sign)
                result = 0
                sign = 1
            elif c == &#39;)&#39;:
                prev_sign = stack.pop()
                prev_result = stack.pop()
                result = prev_result + prev_sign * result
            i += 1

        return result
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time complexity:</strong> <code>O(n)</code> — each character is processed once.</li><li><strong>Space complexity:</strong> <code>O(n)</code> — for the stack in case of nested parentheses.</li></ul>`,18)]))}const h=n(i,[["render",l]]);export{g as __pageData,h as default};
