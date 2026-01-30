import{_ as n,c as t,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"202. Happy Number","description":"","frontmatter":{},"headers":[],"relativePath":"hashmap/202.md","filePath":"hashmap/202.md"}'),s={name:"hashmap/202.md"};function i(l,e,r,d,p,c){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="_202-happy-number" tabindex="-1"><a href="https://leetcode.com/problems/happy-number/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">202. Happy Number</a> <a class="header-anchor" href="#_202-happy-number" aria-label="Permalink to &quot;[202. Happy Number](https://leetcode.com/problems/happy-number/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Write an algorithm to determine if a number <code>n</code> is happy.</p><p>A <strong>happy number</strong> is a number defined by the following process:</p><ul><li>Starting with any positive integer, replace the number by the sum of the squares of its digits.</li><li>Repeat the process until the number equals 1 (where it will stay), or it <strong>loops endlessly in a cycle</strong> which does not include 1.</li><li>Those numbers for which this process <strong>ends in 1</strong> are happy.</li></ul><p>Return <code>true</code> if <code>n</code> is a happy number, and <code>false</code> if not.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 19
Output: true
Explanation:
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 2
Output: false
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= n &lt;= 2^31 - 1</code></li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>We need to repeatedly replace the number by the <strong>sum of the squares of its digits</strong>.</p><ul><li>If the result becomes <code>1</code>, the number is happy.</li><li>If the process loops (e.g., <code>4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 ...</code>), then it will never reach <code>1</code> and is not happy.</li></ul><p>There are two main ways to detect cycles:</p><h3 id="a-using-a-hashset" tabindex="-1">A) Using a HashSet <a class="header-anchor" href="#a-using-a-hashset" aria-label="Permalink to &quot;A) Using a HashSet&quot;">​</a></h3><ul><li>Store every seen number in a set.</li><li>If we reach <code>1</code>, return <code>true</code>.</li><li>If we see a number already in the set, a cycle is detected → return <code>false</code>.</li></ul><h3 id="b-floyd-s-cycle-detection-two-pointers" tabindex="-1">B) Floyd’s Cycle Detection (Two Pointers) <a class="header-anchor" href="#b-floyd-s-cycle-detection-two-pointers" aria-label="Permalink to &quot;B) Floyd’s Cycle Detection (Two Pointers)&quot;">​</a></h3><ul><li>Treat the transformation as a linked list where <code>next(x)</code> is the sum of squares.</li><li>Use two pointers: <code>slow</code> moves one step, <code>fast</code> moves two steps.</li><li>If <code>fast</code> becomes <code>1</code>, return <code>true</code>.</li><li>If <code>slow == fast</code> (but not <code>1</code>), we found a cycle → return <code>false</code>.</li></ul><p>Floyd’s method uses <strong>O(1)</strong> space, while HashSet is more intuitive.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Kxw8g" id="tab-_xGd-7L" checked><label data-title="Kotlin" for="tab-_xGd-7L">Kotlin</label><input type="radio" name="group-Kxw8g" id="tab-sj3c4D6"><label data-title="TypeScript" for="tab-sj3c4D6">TypeScript</label><input type="radio" name="group-Kxw8g" id="tab-K3uSNra"><label data-title="Java" for="tab-K3uSNra">Java</label><input type="radio" name="group-Kxw8g" id="tab-ITo8fQI"><label data-title="Python" for="tab-ITo8fQI">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun isHappy(n: Int): Boolean {
        var x = n
        val seen = HashSet&lt;Int&gt;()
        while (x != 1 &amp;&amp; x !in seen) {
            seen.add(x)
            x = sumOfSquares(x)
        }
        return x == 1
    }

    private fun sumOfSquares(num: Int): Int {
        var v = num
        var sum = 0
        while (v &gt; 0) {
            val d = v % 10
            sum += d * d
            v /= 10
        }
        return sum
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function isHappy(n: number): boolean {
    let x = n;
    const seen = new Set&lt;number&gt;();
    while (x !== 1 &amp;&amp; !seen.has(x)) {
        seen.add(x);
        x = sumOfSquares(x);
    }
    return x === 1;
}

function sumOfSquares(num: number): number {
    let sum = 0;
    while (num &gt; 0) {
        const digit = num % 10;
        sum += digit * digit;
        num = Math.floor(num / 10);
    }
    return sum;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean isHappy(int n) {
        int x = n;
        Set&lt;Integer&gt; seen = new HashSet&lt;&gt;();
        while (x != 1 &amp;&amp; !seen.contains(x)) {
            seen.add(x);
            x = sumOfSquares(x);
        }
        return x == 1;
    }

    private int sumOfSquares(int num) {
        int sum = 0;
        while (num &gt; 0) {
            int digit = num % 10;
            sum += digit * digit;
            num /= 10;
        }
        return sum;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def isHappy(self, n: int) -&gt; bool:
        seen = set()
        while n != 1 and n not in seen:
            seen.add(n)
            n = self.sum_of_squares(n)
        return n == 1

    def sum_of_squares(self, num: int) -&gt; int:
        total = 0
        while num &gt; 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time:</strong> <code>O(k)</code> where <code>k</code> is the number of iterations before reaching <code>1</code> or a cycle (bounded for 32-bit integers).</li><li><strong>Space:</strong><ul><li>HashSet: <code>O(k)</code></li><li>Floyd&#39;s algorithm: <code>O(1)</code></li></ul></li></ul>`,24)]))}const m=n(s,[["render",i]]);export{h as __pageData,m as default};
