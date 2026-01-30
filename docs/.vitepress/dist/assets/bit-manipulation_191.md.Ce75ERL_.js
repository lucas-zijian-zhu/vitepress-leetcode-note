import{_ as a,C as i,c as o,o as l,j as n,ag as s,G as r,a as p}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"191. Number of 1 Bits","description":"","frontmatter":{},"headers":[],"relativePath":"bit-manipulation/191.md","filePath":"bit-manipulation/191.md"}'),c={name:"bit-manipulation/191.md"},d={id:"_191-number-of-1-bits",tabindex:"-1"};function u(h,t,m,g,b,v){const e=i("Badge");return l(),o("div",null,[n("h1",d,[t[0]||(t[0]=n("a",{href:"https://leetcode.com/problems/number-of-1-bits/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"191. Number of 1 Bits",-1)),r(e,{type:"info",text:"Easy"}),t[1]||(t[1]=p()),t[2]||(t[2]=n("a",{class:"header-anchor",href:"#_191-number-of-1-bits","aria-label":'Permalink to "[191. Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="info" text="Easy" />"'},"​",-1))]),t[3]||(t[3]=s(`<p>Write a function that takes the binary representation of a positive integer and returns the number of <strong>set bits</strong> it has (also known as the <a href="http://en.wikipedia.org/wiki/Hamming_weight" target="_blank" rel="noreferrer">Hamming weight</a>).</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 11
Output: 3
Explanation: The input binary string &quot;1011&quot; has a total of three set bits.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 128
Output: 1
Explanation: The input binary string &quot;10000000&quot; has a total of one set bit.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 2147483645
Output: 30
Explanation: The input binary string &quot;1111111111111111111111111111101&quot; has a total of thirty set bits.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= n &lt;= 2^31 - 1</code></li></ul><p><strong>Follow up:</strong> If this function is called many times, how would you optimize it?</p><h2 id="💡-approach-bit-manipulation" tabindex="-1">💡 Approach: Bit Manipulation <a class="header-anchor" href="#💡-approach-bit-manipulation" aria-label="Permalink to &quot;💡 Approach: Bit Manipulation&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>We need to count the number of 1s in the binary representation of a number. There are several approaches:</p><p><strong>Method 1: Loop and Shift</strong></p><ul><li>Iterate through each bit</li><li>Count how many bits are set to 1</li></ul><p><strong>Method 2: Brian Kernighan&#39;s Algorithm (Optimized)</strong></p><ul><li>Use <code>n &amp; (n - 1)</code> to flip the rightmost set bit</li><li>Count how many times we can do this until n becomes 0</li><li>This is more efficient as it only iterates over set bits</li></ul><p><strong>Key Insight:</strong></p><ul><li><code>n &amp; (n - 1)</code> removes the rightmost set bit</li><li>Each iteration removes exactly one set bit</li><li>Number of iterations = number of set bits</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><p><strong>Method 1: Loop and Shift</strong></p><ol><li>Initialize count = 0</li><li>While n &gt; 0: <ul><li>If <code>n &amp; 1 == 1</code>, increment count</li><li>Right shift n by 1: <code>n &gt;&gt;= 1</code></li></ul></li><li>Return count</li></ol><p><strong>Method 2: Brian Kernighan&#39;s Algorithm (Recommended)</strong></p><ol><li>Initialize count = 0</li><li>While n &gt; 0: <ul><li><code>n = n &amp; (n - 1)</code> (removes rightmost set bit)</li><li>Increment count</li></ul></li><li>Return count</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Method 1: O(32) = O(1) time, always checks all 32 bits</li><li>Method 2: O(k) time where k is the number of set bits (more efficient when few bits are set)</li><li>Both methods use O(1) space</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-dmhjv" id="tab-NUamJNn" checked><label data-title="Kotlin - Method 1" for="tab-NUamJNn">Kotlin - Method 1</label><input type="radio" name="group-dmhjv" id="tab-ZsTw9JR"><label data-title="Kotlin - Method 2: Brian Kernighan" for="tab-ZsTw9JR">Kotlin - Method 2: Brian Kernighan</label><input type="radio" name="group-dmhjv" id="tab-mbJVdW3"><label data-title="TypeScript - Method 1" for="tab-mbJVdW3">TypeScript - Method 1</label><input type="radio" name="group-dmhjv" id="tab-znz1l5y"><label data-title="TypeScript - Method 2: Brian Kernighan" for="tab-znz1l5y">TypeScript - Method 2: Brian Kernighan</label><input type="radio" name="group-dmhjv" id="tab-ysKFRpM"><label data-title="Java - Method 1" for="tab-ysKFRpM">Java - Method 1</label><input type="radio" name="group-dmhjv" id="tab-73ZgQiw"><label data-title="Java - Method 2: Brian Kernighan" for="tab-73ZgQiw">Java - Method 2: Brian Kernighan</label><input type="radio" name="group-dmhjv" id="tab-0Q0EVcR"><label data-title="Python - Method 1" for="tab-0Q0EVcR">Python - Method 1</label><input type="radio" name="group-dmhjv" id="tab-cQqW2Ih"><label data-title="Python - Method 2: Brian Kernighan" for="tab-cQqW2Ih">Python - Method 2: Brian Kernighan</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun hammingWeight(n: Int): Int {
        var num = n
        var count = 0
        
        while (num != 0) {
            if (num and 1 == 1) {
                count++
            }
            num = num ushr 1  // Unsigned right shift
        }
        
        return count
    }
}
</code></pre></div><div class="language-kotlin vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun hammingWeight(n: Int): Int {
        var num = n
        var count = 0
        
        while (num != 0) {
            num = num and (num - 1)  // Remove rightmost set bit
            count++
        }
        
        return count
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function hammingWeight(n: number): number {
    let count = 0;
    
    while (n !== 0) {
        if ((n &amp; 1) === 1) {
            count++;
        }
        n = n &gt;&gt;&gt; 1;  // Unsigned right shift
    }
    
    return count;
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function hammingWeight(n: number): number {
    let count = 0;
    
    while (n !== 0) {
        n = n &amp; (n - 1);  // Remove rightmost set bit
        count++;
    }
    
    return count;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">public class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        
        while (n != 0) {
            if ((n &amp; 1) == 1) {
                count++;
            }
            n = n &gt;&gt;&gt; 1;  // Unsigned right shift
        }
        
        return count;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">public class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        
        while (n != 0) {
            n = n &amp; (n - 1);  // Remove rightmost set bit
            count++;
        }
        
        return count;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def hammingWeight(self, n: int) -&gt; int:
        count = 0
        
        while n:
            if n &amp; 1:
                count += 1
            n = n &gt;&gt; 1
        
        return count
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def hammingWeight(self, n: int) -&gt; int:
        count = 0
        
        while n:
            n = n &amp; (n - 1)  # Remove rightmost set bit
            count += 1
        
        return count
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><h3 id="method-1-loop-and-shift" tabindex="-1">Method 1: Loop and Shift <a class="header-anchor" href="#method-1-loop-and-shift" aria-label="Permalink to &quot;Method 1: Loop and Shift&quot;">​</a></h3><ul><li><strong>Time Complexity:</strong> O(32) = O(1), always checks all 32 bits</li><li><strong>Space Complexity:</strong> O(1)</li></ul><h3 id="method-2-brian-kernighan-s-algorithm" tabindex="-1">Method 2: Brian Kernighan&#39;s Algorithm <a class="header-anchor" href="#method-2-brian-kernighan-s-algorithm" aria-label="Permalink to &quot;Method 2: Brian Kernighan&#39;s Algorithm&quot;">​</a></h3><ul><li><strong>Time Complexity:</strong> O(k), where k is the number of set bits (more efficient)</li><li><strong>Space Complexity:</strong> O(1)</li></ul><h2 id="follow-up-optimization" tabindex="-1">Follow-up Optimization <a class="header-anchor" href="#follow-up-optimization" aria-label="Permalink to &quot;Follow-up Optimization&quot;">​</a></h2><p>If this function is called many times, we can optimize further:</p><ol><li><p><strong>Lookup Table:</strong> Pre-compute Hamming weight for all 8-bit values (0-255), then process 32-bit number in 4 chunks</p><ul><li>Time: O(1) with O(256) space</li><li>Example: <code>count = table[n &amp; 0xFF] + table[(n &gt;&gt; 8) &amp; 0xFF] + table[(n &gt;&gt; 16) &amp; 0xFF] + table[(n &gt;&gt; 24) &amp; 0xFF]</code></li></ul></li><li><p><strong>Built-in Functions:</strong> Many languages have built-in functions:</p><ul><li>Python: <code>bin(n).count(&#39;1&#39;)</code> or <code>n.bit_count()</code></li><li>Java: <code>Integer.bitCount(n)</code></li><li>Kotlin: <code>n.countOneBits()</code></li></ul></li></ol>`,36))])}const k=a(c,[["render",u]]);export{f as __pageData,k as default};
