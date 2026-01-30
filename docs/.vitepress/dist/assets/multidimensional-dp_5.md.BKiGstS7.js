import{_ as e,c as t,o as a,ag as r}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"5. Longest Palindromic Substring","description":"","frontmatter":{},"headers":[],"relativePath":"multidimensional-dp/5.md","filePath":"multidimensional-dp/5.md"}'),l={name:"multidimensional-dp/5.md"};function s(i,n,o,d,p,c){return a(),t("div",null,n[0]||(n[0]=[r(`<h1 id="_5-longest-palindromic-substring" tabindex="-1"><a href="https://leetcode.com/problems/longest-palindromic-substring/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">5. Longest Palindromic Substring</a> <a class="header-anchor" href="#_5-longest-palindromic-substring" aria-label="Permalink to &quot;[5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a string <code>s</code>, return the longest <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1b:" data-state="closed" class="">palindromic</button> <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1c:" data-state="closed" class="">substring</button> in <code>s</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;babad&quot;
Output: &quot;bab&quot;
Explanation: &quot;aba&quot; is also a valid answer.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;cbbd&quot;
Output: &quot;bb&quot;
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length &lt;= 1000</code></li><li><code>s</code> consist of only digits and English letters.</li></ul><h2 id="🚀-approach-expand-around-center" tabindex="-1">🚀 Approach: Expand Around Center <a class="header-anchor" href="#🚀-approach-expand-around-center" aria-label="Permalink to &quot;🚀 Approach: Expand Around Center&quot;">​</a></h2><p>We want to find the <strong>longest palindromic substring</strong> in the given string <code>s</code>.</p><h3 id="key-idea" tabindex="-1">Key Idea <a class="header-anchor" href="#key-idea" aria-label="Permalink to &quot;Key Idea&quot;">​</a></h3><ul><li>A palindrome mirrors around its center.</li><li>Therefore, the center of a palindrome can be a single character (odd-length) or a pair of characters (even-length).</li><li>For each possible center, expand outward as long as the substring remains a palindrome.</li></ul><hr><h3 id="steps" tabindex="-1">Steps <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps&quot;">​</a></h3><p>1️⃣ Iterate over each character in the string.<br> 2️⃣ For each position <code>i</code>, consider two cases:</p><ul><li><strong>Odd-length palindrome</strong>: center at <code>i</code></li><li><strong>Even-length palindrome</strong>: center between <code>i</code> and <code>i+1</code> 3️⃣ For each center, expand outwards while <code>s[left] == s[right]</code> to find the maximum length. 4️⃣ Keep track of the maximum palindrome found and its start/end indices. 5️⃣ Finally, return the substring from <code>start</code> to <code>end</code>.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-bNwms" id="tab-8k4vMse" checked><label data-title="Kotlin" for="tab-8k4vMse">Kotlin</label><input type="radio" name="group-bNwms" id="tab-H51QPM7"><label data-title="TypeScript" for="tab-H51QPM7">TypeScript</label><input type="radio" name="group-bNwms" id="tab-UPu_Dc3"><label data-title="Java" for="tab-UPu_Dc3">Java</label><input type="radio" name="group-bNwms" id="tab-NLFCDcB"><label data-title="Python" for="tab-NLFCDcB">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun longestPalindrome(s: String): String {
        if (s.isEmpty()) return &quot;&quot;
        var start = 0
        var end = 0

        for (i in s.indices) {
            val len1 = expandAroundCenter(s, i, i)       // Odd length
            val len2 = expandAroundCenter(s, i, i + 1)   // Even length
            val len = maxOf(len1, len2)

            if (len &gt; end - start) {
                start = i - (len - 1) / 2
                end = i + len / 2
            }
        }

        return s.substring(start, end + 1)
    }

    private fun expandAroundCenter(s: String, left: Int, right: Int): Int {
        var l = left
        var r = right
        while (l &gt;= 0 &amp;&amp; r &lt; s.length &amp;&amp; s[l] == s[r]) {
            l--
            r++
        }
        return r - l - 1
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    longestPalindrome(s: string): string {
        if (s.length === 0) return &quot;&quot;;
        let start = 0;
        let end = 0;

        for (let i = 0; i &lt; s.length; i++) {
            const len1 = this.expandAroundCenter(s, i, i);       // Odd length
            const len2 = this.expandAroundCenter(s, i, i + 1);   // Even length
            const len = Math.max(len1, len2);

            if (len &gt; end - start) {
                start = i - Math.floor((len - 1) / 2);
                end = i + Math.floor(len / 2);
            }
        }

        return s.substring(start, end + 1);
    }

    private expandAroundCenter(s: string, left: number, right: number): number {
        let l = left;
        let r = right;
        while (l &gt;= 0 &amp;&amp; r &lt; s.length &amp;&amp; s[l] === s[r]) {
            l--;
            r++;
        }
        return r - l - 1;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public String longestPalindrome(String s) {
        if (s.isEmpty()) return &quot;&quot;;
        int start = 0;
        int end = 0;

        for (int i = 0; i &lt; s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);       // Odd length
            int len2 = expandAroundCenter(s, i, i + 1);   // Even length
            int len = Math.max(len1, len2);

            if (len &gt; end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }

        return s.substring(start, end + 1);
    }

    private int expandAroundCenter(String s, int left, int right) {
        int l = left;
        int r = right;
        while (l &gt;= 0 &amp;&amp; r &lt; s.length() &amp;&amp; s.charAt(l) == s.charAt(r)) {
            l--;
            r++;
        }
        return r - l - 1;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def longestPalindrome(self, s: str) -&gt; str:
        if not s:
            return &quot;&quot;
        start = 0
        end = 0

        for i in range(len(s)):
            len1 = self.expand_around_center(s, i, i)       # Odd length
            len2 = self.expand_around_center(s, i, i + 1)   # Even length
            length = max(len1, len2)

            if length &gt; end - start:
                start = i - (length - 1) // 2
                end = i + length // 2

        return s[start:end + 1]

    def expand_around_center(self, s: str, left: int, right: int) -&gt; int:
        l = left
        r = right
        while l &gt;= 0 and r &lt; len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return r - l - 1
</code></pre></div></div></div><h3 id="time-and-space-complexity" tabindex="-1">Time and Space Complexity <a class="header-anchor" href="#time-and-space-complexity" aria-label="Permalink to &quot;Time and Space Complexity&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Metric</th><th>Complexity</th></tr></thead><tbody><tr><td>🕒 <strong>Time Complexity</strong></td><td>O(n^2)</td></tr><tr><td>💾 <strong>Space Complexity</strong></td><td>O(1)</td></tr></tbody></table><ul><li>Time: There are ( O(n) ) centers and expanding around each center takes ( O(n) ) in the worst case.</li><li>Space: We only need variables to track indices — no extra arrays.</li></ul>`,21)]))}const h=e(l,[["render",s]]);export{g as __pageData,h as default};
