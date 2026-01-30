import{_ as t,c as n,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"22. Generate Parentheses","description":"","frontmatter":{},"headers":[],"relativePath":"backtracking/22.md","filePath":"backtracking/22.md"}'),l={name:"backtracking/22.md"};function r(s,e,i,c,p,u){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="_22-generate-parentheses" tabindex="-1"><a href="https://leetcode.com/problems/generate-parentheses/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">22. Generate Parentheses</a> <a class="header-anchor" href="#_22-generate-parentheses" aria-label="Permalink to &quot;[22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given <code>n</code> pairs of parentheses, write a function to generate all combinations of well-formed parentheses.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 3
Output: [&quot;((()))&quot;,&quot;(()())&quot;,&quot;(())()&quot;,&quot;()(())&quot;,&quot;()()()&quot;]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 1
Output: [&quot;()&quot;]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= n &lt;= 8</code></li></ul><h2 id="💡-approach-backtracking" tabindex="-1">💡 Approach: Backtracking <a class="header-anchor" href="#💡-approach-backtracking" aria-label="Permalink to &quot;💡 Approach: Backtracking&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>backtracking</strong> problem where we need to generate all valid parentheses combinations. The key insight is to use backtracking to build valid parentheses strings while maintaining the balance constraint.</p><p><strong>Key Rules for valid parentheses:</strong></p><ul><li>At any point, <code>open_count &gt;= close_count</code></li><li>Total <code>open_count = close_count = n</code></li><li>We can add <code>(</code> if <code>open_count &lt; n</code></li><li>We can add <code>)</code> if <code>close_count &lt; open_count</code></li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Start with empty string</strong> and counts (open=0, close=0)</li><li><strong>For each step</strong>: <ul><li>Add <code>(</code> if we still have open brackets left</li><li>Add <code>)</code> if it won&#39;t make the string invalid (close &lt; open)</li><li>Recurse with updated counts and string</li><li>Backtrack to try the other option</li></ul></li><li><strong>When both counts reach n</strong>, we have a valid combination</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use backtracking with open/close count tracking</li><li>Prune invalid branches early (when close &gt; open)</li><li>Ensure we never have more closing than opening brackets anywhere</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-CFilK" id="tab-NzD5BI9" checked><label data-title="Kotlin" for="tab-NzD5BI9">Kotlin</label><input type="radio" name="group-CFilK" id="tab-Opcv5j1"><label data-title="TypeScript" for="tab-Opcv5j1">TypeScript</label><input type="radio" name="group-CFilK" id="tab-MXJG0Mx"><label data-title="Java" for="tab-MXJG0Mx">Java</label><input type="radio" name="group-CFilK" id="tab-BoWFRba"><label data-title="Python" for="tab-BoWFRba">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun generateParenthesis(n: Int): List&lt;String&gt; {
        val result = mutableListOf&lt;String&gt;()
        backtrack(&quot;&quot;, 0, 0, n, result)
        return result
    }
    
    private fun backtrack(
        current: String,
        open: Int,
        close: Int,
        n: Int,
        result: MutableList&lt;String&gt;
    ) {
        // Base case: we have used all brackets
        if (open == n &amp;&amp; close == n) {
            result.add(current)
            return
        }
        
        // Add opening bracket if we still have some left
        if (open &lt; n) {
            backtrack(current + &quot;(&quot;, open + 1, close, n, result)
        }
        
        // Add closing bracket if it won&#39;t make the string invalid
        if (close &lt; open) {
            backtrack(current + &quot;)&quot;, open, close + 1, n, result)
        }
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function generateParenthesis(n: number): string[] {
    const result: string[] = [];
    backtrack(&quot;&quot;, 0, 0, n, result);
    return result;
}

function backtrack(
    current: string,
    open: number,
    close: number,
    n: number,
    result: string[]
): void {
    // Base case: we have used all brackets
    if (open === n &amp;&amp; close === n) {
        result.push(current);
        return;
    }
    
    // Add opening bracket if we still have some left
    if (open &lt; n) {
        backtrack(current + &quot;(&quot;, open + 1, close, n, result);
    }
    
    // Add closing bracket if it won&#39;t make the string invalid
    if (close &lt; open) {
        backtrack(current + &quot;)&quot;, open, close + 1, n, result);
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public List&lt;String&gt; generateParenthesis(int n) {
        List&lt;String&gt; result = new ArrayList&lt;&gt;();
        backtrack(&quot;&quot;, 0, 0, n, result);
        return result;
    }
    
    private void backtrack(
        String current,
        int open,
        int close,
        int n,
        List&lt;String&gt; result
    ) {
        // Base case: we have used all brackets
        if (open == n &amp;&amp; close == n) {
            result.add(current);
            return;
        }
        
        // Add opening bracket if we still have some left
        if (open &lt; n) {
            backtrack(current + &quot;(&quot;, open + 1, close, n, result);
        }
        
        // Add closing bracket if it won&#39;t make the string invalid
        if (close &lt; open) {
            backtrack(current + &quot;)&quot;, open, close + 1, n, result);
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def generateParenthesis(self, n: int) -&gt; List[str]:
        result = []
        self.backtrack(&quot;&quot;, 0, 0, n, result)
        return result
    
    def backtrack(self, current: str, open_count: int, close_count: int, n: int, result: List[str]) -&gt; None:
        # Base case: we have used all brackets
        if open_count == n and close_count == n:
            result.append(current)
            return
        
        # Add opening bracket if we still have some left
        if open_count &lt; n:
            self.backtrack(current + &quot;(&quot;, open_count + 1, close_count, n, result)
        
        # Add closing bracket if it won&#39;t make the string invalid
        if close_count &lt; open_count:
            self.backtrack(current + &quot;)&quot;, open_count, close_count + 1, n, result)
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(C(n)) where C(n) is the nth Catalan number ≈ O(4^n / √n)</li><li><strong>Space Complexity:</strong> O(C(n)) for storing all valid combinations, plus O(n) for recursion stack</li></ul><p><strong>Note:</strong> C(n) is the nth Catalan number ≈ 4^n / (√π × n^(3/2)), which grows exponentially but slower than 4^n due to the √n factor.</p>`,22)]))}const h=t(l,[["render",r]]);export{g as __pageData,h as default};
