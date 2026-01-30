import{_ as e,c as n,o as a,ag as s}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"3. Longest Substring Without Repeating Characters","description":"","frontmatter":{},"headers":[],"relativePath":"sliding-window/3.md","filePath":"sliding-window/3.md"}'),i={name:"sliding-window/3.md"};function o(l,t,r,c,p,d){return a(),n("div",null,t[0]||(t[0]=[s(`<h1 id="_3-longest-substring-without-repeating-characters" tabindex="-1"><a href="https://leetcode.com/problems/longest-substring-without-repeating-characters/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">3. Longest Substring Without Repeating Characters</a> <a class="header-anchor" href="#_3-longest-substring-without-repeating-characters" aria-label="Permalink to &quot;[3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a string <code>s</code>, find the length of the <strong>longest</strong> <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1b:" data-state="closed" class=""><strong>substring</strong></button> without duplicate characters.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;abcabcbb&quot;
Output: 3
Explanation: The answer is &quot;abc&quot;, with the length of 3.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;bbbbb&quot;
Output: 1
Explanation: The answer is &quot;b&quot;, with the length of 1.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;pwwkew&quot;
Output: 3
Explanation: The answer is &quot;wke&quot;, with the length of 3.
Notice that the answer must be a substring, &quot;pwke&quot; is a subsequence and not a substring.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>0 &lt;= s.length &lt;= 5 * 10^4</code></li><li><code>s</code> consists of English letters, digits, symbols and spaces.</li></ul><h2 id="approach-sliding-window-hashset" tabindex="-1">Approach: Sliding Window + HashSet <a class="header-anchor" href="#approach-sliding-window-hashset" aria-label="Permalink to &quot;Approach: Sliding Window + HashSet&quot;">​</a></h2><p>We use the <strong>sliding window</strong> technique to maintain a dynamic window of characters that are <strong>non-repeating</strong>.</p><ul><li>A <code>Set&lt;Char&gt;</code> is used to track which characters are currently in the window.</li><li>Two pointers <code>left</code> and <code>right</code> define the window boundaries.</li><li>If <code>s[right]</code> is not in the set, we add it and expand the window.</li><li>If it <strong>is</strong> in the set, we shrink the window from the left until the duplicate is removed.</li></ul><p>This guarantees that the window always contains unique characters.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-gPZeR" id="tab-_04HwXD" checked><label data-title="Kotlin" for="tab-_04HwXD">Kotlin</label><input type="radio" name="group-gPZeR" id="tab-M8bFkXo"><label data-title="TypeScript" for="tab-M8bFkXo">TypeScript</label><input type="radio" name="group-gPZeR" id="tab-arB7d6o"><label data-title="Java" for="tab-arB7d6o">Java</label><input type="radio" name="group-gPZeR" id="tab-_lEQLDn"><label data-title="Python" for="tab-_lEQLDn">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun lengthOfLongestSubstring(s: String): Int {
        var left = 0
        val seen = mutableSetOf&lt;Char&gt;()
        var maxLen = 0

        for (right in s.indices) {
            while (s[right] in seen) {
                seen.remove(s[left])
                left++
            }
            seen.add(s[right])
            maxLen = maxOf(maxLen, right - left + 1)
        }

        return maxLen
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function lengthOfLongestSubstring(s: string): number {
    let left = 0;
    const seen = new Set&lt;string&gt;();
    let maxLen = 0;

    for (let right = 0; right &lt; s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int lengthOfLongestSubstring(String s) {
        int left = 0;
        Set&lt;Character&gt; seen = new HashSet&lt;&gt;();
        int maxLen = 0;

        for (int right = 0; right &lt; s.length(); right++) {
            while (seen.contains(s.charAt(right))) {
                seen.remove(s.charAt(left));
                left++;
            }
            seen.add(s.charAt(right));
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def lengthOfLongestSubstring(self, s: str) -&gt; int:
        left = 0
        seen = set()
        max_len = 0

        for right in range(len(s)):
            while s[right] in seen:
                seen.remove(s[left])
                left += 1
            seen.add(s[right])
            max_len = max(max_len, right - left + 1)

        return max_len
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><p><strong>Time Complexity:</strong> O(n)<br> Each character is visited at most twice — once by the right pointer, and once by the left pointer. So the total time complexity is linear in the size of the input string.</p></li><li><p><strong>Space Complexity:</strong> O(min(n, m))<br> Where <code>n</code> is the length of the input string and <code>m</code> is the size of the character set (e.g. 128 for ASCII).<br> We use a set to store at most <code>m</code> characters.</p></li></ul>`,18)]))}const u=e(i,[["render",o]]);export{g as __pageData,u as default};
