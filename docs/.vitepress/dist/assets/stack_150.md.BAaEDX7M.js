import{_ as e,c as a,o,ag as n}from"./chunks/framework.Bw-5EFTY.js";const k=JSON.parse('{"title":"150. Evaluate Reverse Polish Notation","description":"","frontmatter":{},"headers":[],"relativePath":"stack/150.md","filePath":"stack/150.md"}'),s={name:"stack/150.md"};function c(p,t,i,l,r,u){return o(),a("div",null,t[0]||(t[0]=[n(`<h1 id="_150-evaluate-reverse-polish-notation" tabindex="-1"><a href="https://leetcode.com/problems/evaluate-reverse-polish-notation/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">150. Evaluate Reverse Polish Notation</a> <a class="header-anchor" href="#_150-evaluate-reverse-polish-notation" aria-label="Permalink to &quot;[150. Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given an array of strings <code>tokens</code> that represents an arithmetic expression in a <a href="http://en.wikipedia.org/wiki/Reverse_Polish_notation" target="_blank">Reverse Polish Notation</a>.</p><p>Evaluate the expression. Return an integer that represents the value of the expression.</p><p><strong>Note</strong> that:</p><ul><li>The valid operators are <code>&#39;+&#39;</code>, <code>&#39;-&#39;</code>, <code>&#39;*&#39;</code>, and <code>&#39;/&#39;</code>.</li><li>Each operand may be an integer or another expression.</li><li>The division between two integers always <strong>truncates toward zero</strong> .</li><li>There will not be any division by zero.</li><li>The input represents a valid arithmetic expression in a reverse polish notation.</li><li>The answer and all the intermediate calculations can be represented in a <strong>32-bit</strong> integer.</li></ul><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: tokens = [&quot;2&quot;,&quot;1&quot;,&quot;+&quot;,&quot;3&quot;,&quot;*&quot;]
Output: 9
Explanation: ((2 + 1) * 3) = 9
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: tokens = [&quot;4&quot;,&quot;13&quot;,&quot;5&quot;,&quot;/&quot;,&quot;+&quot;]
Output: 6
Explanation: (4 + (13 / 5)) = 6
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: tokens = [&quot;10&quot;,&quot;6&quot;,&quot;9&quot;,&quot;3&quot;,&quot;+&quot;,&quot;-11&quot;,&quot;*&quot;,&quot;/&quot;,&quot;*&quot;,&quot;17&quot;,&quot;+&quot;,&quot;5&quot;,&quot;+&quot;]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= tokens.length &lt;= 10^4</code></li><li><code>tokens[i]</code> is either an operator: <code>&quot;+&quot;</code>, <code>&quot;-&quot;</code>, <code>&quot;*&quot;</code>, or <code>&quot;/&quot;</code>, or an integer in the range <code>[-200, 200]</code>.</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>We can use a <strong>stack</strong> to solve this problem:</p><ol><li>Initialize an empty stack.</li><li>Iterate through each token in <code>tokens</code>: <ul><li>If the token is a <strong>number</strong>, push it onto the stack.</li><li>If the token is an <strong>operator</strong> (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>): <ul><li>Pop the top two numbers from the stack (second operand first, then first operand).</li><li>Apply the operation and push the result back onto the stack.</li></ul></li></ul></li><li>After processing all tokens, the stack will have exactly one element, which is the result.</li></ol><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-F4TqG" id="tab-IeAxkhs" checked><label data-title="Kotlin" for="tab-IeAxkhs">Kotlin</label><input type="radio" name="group-F4TqG" id="tab-TNH1AoU"><label data-title="TypeScript" for="tab-TNH1AoU">TypeScript</label><input type="radio" name="group-F4TqG" id="tab-hujD-aR"><label data-title="Java" for="tab-hujD-aR">Java</label><input type="radio" name="group-F4TqG" id="tab-QQurkVw"><label data-title="Python" for="tab-QQurkVw">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun evalRPN(tokens: Array&lt;String&gt;): Int {
    val stack = mutableListOf&lt;Int&gt;()
    
    for (token in tokens) {
        when (token) {
            &quot;+&quot; -&gt; {
                val b = stack.removeAt(stack.size - 1)
                val a = stack.removeAt(stack.size - 1)
                stack.add(a + b)
            }
            &quot;-&quot; -&gt; {
                val b = stack.removeAt(stack.size - 1)
                val a = stack.removeAt(stack.size - 1)
                stack.add(a - b)
            }
            &quot;*&quot; -&gt; {
                val b = stack.removeAt(stack.size - 1)
                val a = stack.removeAt(stack.size - 1)
                stack.add(a * b)
            }
            &quot;/&quot; -&gt; {
                val b = stack.removeAt(stack.size - 1)
                val a = stack.removeAt(stack.size - 1)
                stack.add(a / b)
            }
            else -&gt; stack.add(token.toInt())
        }
    }
    
    return stack[0]
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function evalRPN(tokens: string[]): number {
    const stack: number[] = [];
    
    for (const token of tokens) {
        switch (token) {
            case &quot;+&quot;: {
                const b = stack.pop()!;
                const a = stack.pop()!;
                stack.push(a + b);
                break;
            }
            case &quot;-&quot;: {
                const b = stack.pop()!;
                const a = stack.pop()!;
                stack.push(a - b);
                break;
            }
            case &quot;*&quot;: {
                const b = stack.pop()!;
                const a = stack.pop()!;
                stack.push(a * b);
                break;
            }
            case &quot;/&quot;: {
                const b = stack.pop()!;
                const a = stack.pop()!;
                stack.push(Math.trunc(a / b));
                break;
            }
            default:
                stack.push(parseInt(token));
        }
    }
    
    return stack[0];
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int evalRPN(String[] tokens) {
        Stack&lt;Integer&gt; stack = new Stack&lt;&gt;();
        
        for (String token : tokens) {
            switch (token) {
                case &quot;+&quot;: {
                    int b = stack.pop();
                    int a = stack.pop();
                    stack.push(a + b);
                    break;
                }
                case &quot;-&quot;: {
                    int b = stack.pop();
                    int a = stack.pop();
                    stack.push(a - b);
                    break;
                }
                case &quot;*&quot;: {
                    int b = stack.pop();
                    int a = stack.pop();
                    stack.push(a * b);
                    break;
                }
                case &quot;/&quot;: {
                    int b = stack.pop();
                    int a = stack.pop();
                    stack.push(a / b);
                    break;
                }
                default:
                    stack.push(Integer.parseInt(token));
            }
        }
        
        return stack.peek();
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def evalRPN(self, tokens: List[str]) -&gt; int:
        stack = []
        
        for token in tokens:
            if token == &quot;+&quot;:
                b = stack.pop()
                a = stack.pop()
                stack.append(a + b)
            elif token == &quot;-&quot;:
                b = stack.pop()
                a = stack.pop()
                stack.append(a - b)
            elif token == &quot;*&quot;:
                b = stack.pop()
                a = stack.pop()
                stack.append(a * b)
            elif token == &quot;/&quot;:
                b = stack.pop()
                a = stack.pop()
                stack.append(int(a / b))  # Truncate towards zero
            else:
                stack.append(int(token))
        
        return stack[0]
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> <code>O(n)</code>, where <code>n</code> is the number of tokens. Each token is processed once.</li><li><strong>Space Complexity:</strong> <code>O(n)</code>, for the stack to hold intermediate numbers.</li></ul>`,20)]))}const h=e(s,[["render",c]]);export{k as __pageData,h as default};
