import{_ as i,C as a,c as s,o,j as e,ag as l,G as r,a as p}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"190. Reverse Bits","description":"","frontmatter":{},"headers":[],"relativePath":"bit-manipulation/190.md","filePath":"bit-manipulation/190.md"}'),u={name:"bit-manipulation/190.md"},d={id:"_190-reverse-bits",tabindex:"-1"};function c(g,t,h,b,m,v){const n=a("Badge");return o(),s("div",null,[e("h1",d,[t[0]||(t[0]=e("a",{href:"https://leetcode.com/problems/reverse-bits/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"190. Reverse Bits",-1)),r(n,{type:"info",text:"Easy"}),t[1]||(t[1]=p()),t[2]||(t[2]=e("a",{class:"header-anchor",href:"#_190-reverse-bits","aria-label":'Permalink to "[190. Reverse Bits](https://leetcode.com/problems/reverse-bits/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="info" text="Easy" />"'},"​",-1))]),t[3]||(t[3]=l(`<p>Reverse bits of a given 32 bits unsigned integer.</p><p><strong>Note:</strong></p><ul><li>Note that in some languages, such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer&#39;s internal binary representation is the same, whether it is signed or unsigned.</li><li>In Java, the compiler represents the signed integers using <a href="https://en.wikipedia.org/wiki/Two%27s_complement" target="_blank" rel="noreferrer">2&#39;s complement notation</a>. Therefore, in <strong>Example 2</strong> above, the input represents the signed integer <code>-3</code> and the output represents the signed integer <code>-1073741825</code>.</li></ul><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 00000010100101000001111010011100
Output:    00111001011110000010100101000000
Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 11111111111111111111111111111101
Output:    10111111111111111111111111111111
Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li>The input must be a <strong>binary string</strong> of length <code>32</code></li></ul><p><strong>Follow up:</strong> If this function is called many times, how would you optimize it?</p><h2 id="💡-approach-bit-manipulation" tabindex="-1">💡 Approach: Bit Manipulation <a class="header-anchor" href="#💡-approach-bit-manipulation" aria-label="Permalink to &quot;💡 Approach: Bit Manipulation&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>To reverse the bits of a 32-bit unsigned integer, we need to:</p><ol><li>Extract each bit from the right (least significant bit) of the input</li><li>Build the result by placing each extracted bit from left to right (most significant bit first)</li><li>Process all 32 bits</li></ol><p><strong>Key Insight:</strong></p><ul><li>Extract bit: <code>n &amp; 1</code> gives the rightmost bit</li><li>Add to result: Shift result left, then OR with the extracted bit</li><li>Move to next: Right shift input by 1</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Initialize result</strong> = 0</li><li><strong>For 32 iterations:</strong><ul><li>Extract rightmost bit: <code>bit = n &amp; 1</code></li><li>Shift result left: <code>result &lt;&lt;= 1</code></li><li>Add bit to result: <code>result |= bit</code></li><li>Shift input right: <code>n &gt;&gt;= 1</code></li></ul></li><li><strong>Return result</strong></li></ol><p><strong>Alternative approach (more intuitive):</strong></p><ul><li>Build result by extracting bits from right to left and placing them from left to right</li></ul><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Process exactly 32 bits (even if input has leading zeros)</li><li>Use unsigned right shift (<code>&gt;&gt;&gt;</code> in Java) to handle sign extension correctly</li><li>Can optimize with lookup table if called many times (follow-up)</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-TvuAK" id="tab-Kqij82S" checked><label data-title="Kotlin" for="tab-Kqij82S">Kotlin</label><input type="radio" name="group-TvuAK" id="tab-LBPqMYr"><label data-title="TypeScript" for="tab-LBPqMYr">TypeScript</label><input type="radio" name="group-TvuAK" id="tab-eLyXKJ5"><label data-title="Java" for="tab-eLyXKJ5">Java</label><input type="radio" name="group-TvuAK" id="tab-M2bBJMc"><label data-title="Python" for="tab-M2bBJMc">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun reverseBits(n: Int): Int {
        var num = n
        var result = 0
        
        for (i in 0 until 32) {
            result = result shl 1  // Shift result left
            result = result or (num and 1)  // Add the rightmost bit
            num = num ushr 1  // Shift input right (unsigned)
        }
        
        return result
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function reverseBits(n: number): number {
    let num = n;
    let result = 0;
    
    for (let i = 0; i &lt; 32; i++) {
        result = result &lt;&lt; 1;  // Shift result left
        result = result | (num &amp; 1);  // Add the rightmost bit
        num = num &gt;&gt;&gt; 1;  // Shift input right (unsigned)
    }
    
    return result &gt;&gt;&gt; 0;  // Convert to unsigned 32-bit integer
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">public class Solution {
    public int reverseBits(int n) {
        int result = 0;
        
        for (int i = 0; i &lt; 32; i++) {
            result = result &lt;&lt; 1;  // Shift result left
            result = result | (n &amp; 1);  // Add the rightmost bit
            n = n &gt;&gt;&gt; 1;  // Shift input right (unsigned right shift)
        }
        
        return result;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def reverseBits(self, n: int) -&gt; int:
        result = 0
        
        for i in range(32):
            result = result &lt;&lt; 1  # Shift result left
            result = result | (n &amp; 1)  # Add the rightmost bit
            n = n &gt;&gt; 1  # Shift input right
        
        return result
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(1), we always process exactly 32 bits</li><li><strong>Space Complexity:</strong> O(1), only using constant extra space</li></ul><h2 id="follow-up-optimization" tabindex="-1">Follow-up Optimization <a class="header-anchor" href="#follow-up-optimization" aria-label="Permalink to &quot;Follow-up Optimization&quot;">​</a></h2><p>If this function is called many times, we can use a <strong>lookup table</strong> to cache results for byte reversals (8 bits at a time), then combine them. This reduces the number of operations:</p><div class="language-kotlin vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">// Example: Reverse bytes and combine
val byte0 = reverseByte((n &gt;&gt;&gt; 0) and 0xFF)
val byte1 = reverseByte((n &gt;&gt;&gt; 8) and 0xFF)
val byte2 = reverseByte((n &gt;&gt;&gt; 16) and 0xFF)
val byte3 = reverseByte((n &gt;&gt;&gt; 24) and 0xFF)
return (byte0 shl 24) or (byte1 shl 16) or (byte2 shl 8) or byte3
</code></pre></div><p>This approach uses O(256) space for the lookup table but reduces time complexity when called repeatedly.</p>`,30))])}const x=i(u,[["render",c]]);export{f as __pageData,x as default};
