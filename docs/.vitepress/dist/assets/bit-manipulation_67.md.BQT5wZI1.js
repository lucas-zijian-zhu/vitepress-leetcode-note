import{_ as a,C as n,c as r,o,j as e,ag as l,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"67. Add Binary","description":"","frontmatter":{},"headers":[],"relativePath":"bit-manipulation/67.md","filePath":"bit-manipulation/67.md"}'),c={name:"bit-manipulation/67.md"},p={id:"_67-add-binary",tabindex:"-1"};function g(u,t,h,b,y,m){const i=n("Badge");return o(),r("div",null,[e("h1",p,[t[0]||(t[0]=e("a",{href:"https://leetcode.com/problems/add-binary/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"67. Add Binary",-1)),s(i,{type:"info",text:"Easy"}),t[1]||(t[1]=d()),t[2]||(t[2]=e("a",{class:"header-anchor",href:"#_67-add-binary","aria-label":'Permalink to "[67. Add Binary](https://leetcode.com/problems/add-binary/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="info" text="Easy" />"'},"​",-1))]),t[3]||(t[3]=l(`<p>Given two binary strings <code>a</code> and <code>b</code>, return their sum as a binary string.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: a = &quot;11&quot;, b = &quot;1&quot;
Output: &quot;100&quot;
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: a = &quot;1010&quot;, b = &quot;1011&quot;
Output: &quot;10101&quot;
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= a.length, b.length &lt;= 10^4</code></li><li><code>a</code> and <code>b</code> consist only of <code>&#39;0&#39;</code> or <code>&#39;1&#39;</code> characters.</li><li>Each string does not contain leading zeros except for the zero itself.</li></ul><h2 id="💡-approach-string-manipulation-with-carry" tabindex="-1">💡 Approach: String Manipulation with Carry <a class="header-anchor" href="#💡-approach-string-manipulation-with-carry" aria-label="Permalink to &quot;💡 Approach: String Manipulation with Carry&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This problem is similar to adding two numbers, but we&#39;re working with binary strings. We need to:</p><ol><li>Process both strings from right to left (least significant bit first)</li><li>Add corresponding bits along with any carry from the previous position</li><li>Handle different string lengths</li><li>Reverse the result at the end since we built it backwards</li></ol><p><strong>Key Insight:</strong></p><ul><li>Binary addition: <code>sum = a + b + carry</code>, result bit = <code>sum % 2</code>, new carry = <code>sum / 2</code></li><li>Similar to decimal addition but with base 2 instead of base 10</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Initialize pointers</strong> at the end of both strings: <code>i = a.length - 1</code>, <code>j = b.length - 1</code></li><li><strong>Initialize carry</strong> = 0 and result string builder</li><li><strong>While there are digits or carry:</strong><ul><li>Get digit from <code>a</code> at position <code>i</code> (or 0 if out of bounds)</li><li>Get digit from <code>b</code> at position <code>j</code> (or 0 if out of bounds)</li><li>Calculate <code>sum = digitA + digitB + carry</code></li><li>Append <code>sum % 2</code> to result</li><li>Update <code>carry = sum / 2</code></li><li>Decrement <code>i</code> and <code>j</code></li></ul></li><li><strong>Reverse the result</strong> and return</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Process strings from right to left (least significant bit first)</li><li>Handle different string lengths by treating out-of-bounds as 0</li><li>Don&#39;t forget to reverse the result at the end</li><li>Handle edge case where final carry is 1</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-i_DPT" id="tab-DDe6EGE" checked><label data-title="Kotlin" for="tab-DDe6EGE">Kotlin</label><input type="radio" name="group-i_DPT" id="tab-ZkPve1t"><label data-title="TypeScript" for="tab-ZkPve1t">TypeScript</label><input type="radio" name="group-i_DPT" id="tab-FpyfLKH"><label data-title="Java" for="tab-FpyfLKH">Java</label><input type="radio" name="group-i_DPT" id="tab-Ozr0iDO"><label data-title="Python" for="tab-Ozr0iDO">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun addBinary(a: String, b: String): String {
        val result = StringBuilder()
        var i = a.length - 1
        var j = b.length - 1
        var carry = 0
        
        while (i &gt;= 0 || j &gt;= 0 || carry &gt; 0) {
            val digitA = if (i &gt;= 0) a[i] - &#39;0&#39; else 0
            val digitB = if (j &gt;= 0) b[j] - &#39;0&#39; else 0
            
            val sum = digitA + digitB + carry
            result.append(sum % 2)
            carry = sum / 2
            
            i--
            j--
        }
        
        return result.reverse().toString()
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function addBinary(a: string, b: string): string {
    const result: string[] = [];
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;
    
    while (i &gt;= 0 || j &gt;= 0 || carry &gt; 0) {
        const digitA = i &gt;= 0 ? parseInt(a[i]) : 0;
        const digitB = j &gt;= 0 ? parseInt(b[j]) : 0;
        
        const sum = digitA + digitB + carry;
        result.push((sum % 2).toString());
        carry = Math.floor(sum / 2);
        
        i--;
        j--;
    }
    
    return result.reverse().join(&#39;&#39;);
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public String addBinary(String a, String b) {
        StringBuilder result = new StringBuilder();
        int i = a.length() - 1;
        int j = b.length() - 1;
        int carry = 0;
        
        while (i &gt;= 0 || j &gt;= 0 || carry &gt; 0) {
            int digitA = (i &gt;= 0) ? a.charAt(i) - &#39;0&#39; : 0;
            int digitB = (j &gt;= 0) ? b.charAt(j) - &#39;0&#39; : 0;
            
            int sum = digitA + digitB + carry;
            result.append(sum % 2);
            carry = sum / 2;
            
            i--;
            j--;
        }
        
        return result.reverse().toString();
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def addBinary(self, a: str, b: str) -&gt; str:
        result = []
        i, j = len(a) - 1, len(b) - 1
        carry = 0
        
        while i &gt;= 0 or j &gt;= 0 or carry:
            digit_a = int(a[i]) if i &gt;= 0 else 0
            digit_b = int(b[j]) if j &gt;= 0 else 0
            
            total = digit_a + digit_b + carry
            result.append(str(total % 2))
            carry = total // 2
            
            i -= 1
            j -= 1
        
        return &#39;&#39;.join(reversed(result))
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(max(m, n)), where m and n are the lengths of strings a and b. We process each character once.</li><li><strong>Space Complexity:</strong> O(max(m, n)), for the result string</li></ul>`,21))])}const _=a(c,[["render",g]]);export{f as __pageData,_ as default};
