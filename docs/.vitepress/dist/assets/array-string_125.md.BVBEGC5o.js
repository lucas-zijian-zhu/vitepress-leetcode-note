import{_ as t,c as a,o as n,ag as i}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"125. Valid Palindrome","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/125.md","filePath":"array-string/125.md"}'),r={name:"array-string/125.md"};function l(o,e,s,p,c,d){return n(),a("div",null,e[0]||(e[0]=[i(`<h1 id="_125-valid-palindrome" tabindex="-1"><a href="https://leetcode.com/problems/valid-palindrome/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">125. Valid Palindrome</a> <a class="header-anchor" href="#_125-valid-palindrome" aria-label="Permalink to &quot;[125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>A phrase is a <strong>palindrome</strong> if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.</p><p>Given a string <code>s</code>, return <code>true</code> if it is a <strong>palindrome</strong> , or <code>false</code> otherwise.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;A man, a plan, a canal: Panama&quot;
Output: true
Explanation: &quot;amanaplanacanalpanama&quot; is a palindrome.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;race a car&quot;
Output: false
Explanation: &quot;raceacar&quot; is not a palindrome.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot; &quot;
Output: true
Explanation: s is an empty string &quot;&quot; after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length &lt;= 2 * 10^5</code></li><li><code>s</code> consists only of printable ASCII characters.</li></ul><h2 id="approach-two-pointers-with-character-filtering" tabindex="-1">Approach: Two Pointers with Character Filtering <a class="header-anchor" href="#approach-two-pointers-with-character-filtering" aria-label="Permalink to &quot;Approach: Two Pointers with Character Filtering&quot;">​</a></h2><p>The idea is to use two pointers, one starting at the beginning of the string and the other at the end. We move both pointers toward the center, skipping any characters that are not alphanumeric. For each pair of valid characters, we compare them in a case-insensitive way.</p><h3 id="steps" tabindex="-1">Steps: <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps:&quot;">​</a></h3><ol><li>Initialize two pointers <code>left = 0</code> and <code>right = s.length - 1</code>.</li><li>While <code>left &lt; right</code>: <ul><li>Move <code>left</code> forward until it points to an alphanumeric character.</li><li>Move <code>right</code> backward until it points to an alphanumeric character.</li><li>If the characters at <code>left</code> and <code>right</code> are not equal (case-insensitive), return <code>false</code>.</li><li>Otherwise, move both pointers inward.</li></ul></li><li>If all characters matched properly, return <code>true</code>.</li></ol><p>This method ensures that we validate the string in a single pass without creating any additional strings or using regular expressions, making it efficient in both time and space.</p><p>✅ This approach avoids using extra space for cleaning the string and works directly on the original input.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-2f-eh" id="tab-eUfDXoI" checked><label data-title="Kotlin" for="tab-eUfDXoI">Kotlin</label><input type="radio" name="group-2f-eh" id="tab-UAWwqC2"><label data-title="TypeScript" for="tab-UAWwqC2">TypeScript</label><input type="radio" name="group-2f-eh" id="tab-Es-DEbi"><label data-title="Java" for="tab-Es-DEbi">Java</label><input type="radio" name="group-2f-eh" id="tab-iGGR1c3"><label data-title="Python" for="tab-iGGR1c3">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun isPalindrome(s: String): Boolean {
        var left = 0
        var right = s.length - 1

        while (left &lt; right) {
            while (left &lt; right &amp;&amp; !s[left].isLetterOrDigit()) left++
            while (left &lt; right &amp;&amp; !s[right].isLetterOrDigit()) right--

            if (s[left].lowercaseChar() != s[right].lowercaseChar()) {
                return false
            }

            left++
            right--
        }

        return true
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function isPalindrome(s: string): boolean {
    let left = 0, right = s.length - 1;

    while (left &lt; right) {
        while (left &lt; right &amp;&amp; !/[a-z0-9]/i.test(s[left])) left++;
        while (left &lt; right &amp;&amp; !/[a-z0-9]/i.test(s[right])) right--;

        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;

        while (left &lt; right) {
            while (left &lt; right &amp;&amp; !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left &lt; right &amp;&amp; !Character.isLetterOrDigit(s.charAt(right))) right--;

            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def isPalindrome(self, s: str) -&gt; bool:
        left, right = 0, len(s) - 1

        while left &lt; right:
            while left &lt; right and not s[left].isalnum():
                left += 1
            while left &lt; right and not s[right].isalnum():
                right -= 1

            if s[left].lower() != s[right].lower():
                return False

            left += 1
            right -= 1

        return True
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n)</li><li><strong>Space Complexity:</strong> O(1) (if we don’t count the input string and only use pointers)</li></ul>`,21)]))}const u=t(r,[["render",l]]);export{g as __pageData,u as default};
