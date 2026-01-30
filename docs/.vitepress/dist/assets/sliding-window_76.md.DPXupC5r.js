import{_ as t,c as e,o as i,ag as o}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"76. Minimum Window Substring","description":"","frontmatter":{},"headers":[],"relativePath":"sliding-window/76.md","filePath":"sliding-window/76.md"}'),a={name:"sliding-window/76.md"};function s(d,n,l,r,c,p){return i(),e("div",null,n[0]||(n[0]=[o(`<h1 id="_76-minimum-window-substring" tabindex="-1"><a href="https://leetcode.com/problems/minimum-window-substring/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">76. Minimum Window Substring</a> <a class="header-anchor" href="#_76-minimum-window-substring" aria-label="Permalink to &quot;[76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given two strings <code>s</code> and <code>t</code> of lengths <code>m</code> and <code>n</code> respectively, return the <strong>minimum window</strong> <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1b:" data-state="closed" class=""><strong>substring</strong></button> of <code>s</code> such that every character in <code>t</code> (<strong>including duplicates</strong> ) is included in the window. If there is no such substring, return the empty string <code>&quot;&quot;</code>.</p><p>The testcases will be generated such that the answer is <strong>unique</strong> .</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;ADOBECODEBANC&quot;, t = &quot;ABC&quot;
Output: &quot;BANC&quot;
Explanation: The minimum window substring &quot;BANC&quot; includes &#39;A&#39;, &#39;B&#39;, and &#39;C&#39; from string t.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;a&quot;, t = &quot;a&quot;
Output: &quot;a&quot;
Explanation: The entire string s is the minimum window.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;a&quot;, t = &quot;aa&quot;
Output: &quot;&quot;
Explanation: Both &#39;a&#39;s from t must be included in the window.
Since the largest window of s only has one &#39;a&#39;, return empty string.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>m == s.length</code></li><li><code>n == t.length</code></li><li><code>1 &lt;= m, n &lt;= 10^5</code></li><li><code>s</code> and <code>t</code> consist of uppercase and lowercase English letters.</li></ul><p><strong>Follow up:</strong> Could you find an algorithm that runs in <code>O(m + n)</code> time?</p><h2 id="✅-approach-sliding-window-two-hashmaps" tabindex="-1">✅ Approach: Sliding Window + Two HashMaps <a class="header-anchor" href="#✅-approach-sliding-window-two-hashmaps" aria-label="Permalink to &quot;✅ Approach: Sliding Window + Two HashMaps&quot;">​</a></h2><p>We use a sliding window with two pointers <code>left</code> and <code>right</code> to expand and contract the window:</p><ol><li>Use a <code>Map</code> (<code>need</code>) to count the frequency of each character in <code>t</code>.</li><li>Traverse <code>s</code> with <code>right</code> pointer, adding characters into the <code>window</code> map.</li><li>Once all required characters are covered with correct frequencies, try to <strong>shrink the window</strong> from the left to minimize its size.</li><li>Keep track of the minimum window seen so far using <code>(start, length)</code>.</li></ol><p>This is an advanced variation of sliding window where <strong>character frequencies matter</strong>.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-M-vfJ" id="tab-zZ6SXOP" checked><label data-title="Kotlin" for="tab-zZ6SXOP">Kotlin</label><input type="radio" name="group-M-vfJ" id="tab-7aC4PFi"><label data-title="TypeScript" for="tab-7aC4PFi">TypeScript</label><input type="radio" name="group-M-vfJ" id="tab-RFnkf96"><label data-title="Java" for="tab-RFnkf96">Java</label><input type="radio" name="group-M-vfJ" id="tab-odf9p7f"><label data-title="Python" for="tab-odf9p7f">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun minWindow(s: String, t: String): String {
        if (t.length &gt; s.length) return &quot;&quot;

        val need = mutableMapOf&lt;Char, Int&gt;()
        val window = mutableMapOf&lt;Char, Int&gt;()

        // Build need map
        for (c in t) {
            need[c] = need.getOrDefault(c, 0) + 1
        }

        var left = 0
        var right = 0
        var valid = 0
        var start = 0
        var minLen = Int.MAX_VALUE

        while (right &lt; s.length) {
            val c = s[right]
            right++

            if (c in need) {
                window[c] = window.getOrDefault(c, 0) + 1
                if (window[c] == need[c]) {
                    valid++
                }
            }

            // Try to shrink window
            while (valid == need.size) {
                if (right - left &lt; minLen) {
                    start = left
                    minLen = right - left
                }

                val d = s[left]
                left++

                if (d in need) {
                    if (window[d] == need[d]) {
                        valid--
                    }
                    window[d] = window[d]!! - 1
                }
            }
        }

        return if (minLen == Int.MAX_VALUE) &quot;&quot; else s.substring(start, start + minLen)
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function minWindow(s: string, t: string): string {
    if (t.length &gt; s.length) return &quot;&quot;;

    const need = new Map&lt;string, number&gt;();
    const window = new Map&lt;string, number&gt;();

    // Build need map
    for (const c of t) {
        need.set(c, (need.get(c) || 0) + 1);
    }

    let left = 0;
    let right = 0;
    let valid = 0;
    let start = 0;
    let minLen = Number.MAX_VALUE;

    while (right &lt; s.length) {
        const c = s[right];
        right++;

        if (need.has(c)) {
            window.set(c, (window.get(c) || 0) + 1);
            if (window.get(c) === need.get(c)) {
                valid++;
            }
        }

        // Try to shrink window
        while (valid === need.size) {
            if (right - left &lt; minLen) {
                start = left;
                minLen = right - left;
            }

            const d = s[left];
            left++;

            if (need.has(d)) {
                if (window.get(d) === need.get(d)) {
                    valid--;
                }
                window.set(d, window.get(d)! - 1);
            }
        }
    }

    return minLen === Number.MAX_VALUE ? &quot;&quot; : s.substring(start, start + minLen);
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public String minWindow(String s, String t) {
        if (t.length() &gt; s.length()) return &quot;&quot;;

        Map&lt;Character, Integer&gt; need = new HashMap&lt;&gt;();
        Map&lt;Character, Integer&gt; window = new HashMap&lt;&gt;();

        // Build need map
        for (char c : t.toCharArray()) {
            need.put(c, need.getOrDefault(c, 0) + 1);
        }

        int left = 0, right = 0;
        int valid = 0;
        int start = 0, minLen = Integer.MAX_VALUE;

        while (right &lt; s.length()) {
            char c = s.charAt(right);
            right++;

            if (need.containsKey(c)) {
                window.put(c, window.getOrDefault(c, 0) + 1);
                if (window.get(c).equals(need.get(c))) {
                    valid++;
                }
            }

            // Try to shrink window
            while (valid == need.size()) {
                if (right - left &lt; minLen) {
                    start = left;
                    minLen = right - left;
                }

                char d = s.charAt(left);
                left++;

                if (need.containsKey(d)) {
                    if (window.get(d).equals(need.get(d))) {
                        valid--;
                    }
                    window.put(d, window.get(d) - 1);
                }
            }
        }

        return minLen == Integer.MAX_VALUE ? &quot;&quot; : s.substring(start, start + minLen);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def minWindow(self, s: str, t: str) -&gt; str:
        if len(t) &gt; len(s):
            return &quot;&quot;

        need = {}
        window = {}

        # Build need map
        for c in t:
            need[c] = need.get(c, 0) + 1

        left = right = 0
        valid = 0
        start = 0
        min_len = float(&#39;inf&#39;)

        while right &lt; len(s):
            c = s[right]
            right += 1

            if c in need:
                window[c] = window.get(c, 0) + 1
                if window[c] == need[c]:
                    valid += 1

            # Try to shrink window
            while valid == len(need):
                if right - left &lt; min_len:
                    start = left
                    min_len = right - left

                d = s[left]
                left += 1

                if d in need:
                    if window[d] == need[d]:
                        valid -= 1
                    window[d] -= 1

        return &quot;&quot; if min_len == float(&#39;inf&#39;) else s[start:start + min_len]
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><p><strong>Time Complexity:</strong> O(n + m)</p><ul><li><code>n</code> is the length of string <code>s</code>, and <code>m</code> is the length of string <code>t</code>.</li><li>Each character in <code>s</code> is visited at most twice — once when expanding the window and once when contracting it.</li><li>Building the frequency map for <code>t</code> takes O(m).</li></ul></li><li><p><strong>Space Complexity:</strong> O(m)</p><ul><li>We use two hash maps: one to store the character counts in <code>t</code> (<code>need</code>) and another to track the counts in the current window (<code>window</code>).</li><li>The space complexity depends on the number of unique characters in <code>t</code>, which is at most O(m).</li></ul></li></ul>`,20)]))}const h=t(a,[["render",s]]);export{g as __pageData,h as default};
