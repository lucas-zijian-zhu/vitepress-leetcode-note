import{_ as e,c as a,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"58. Length of Last Word","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/58.md","filePath":"array-string/58.md"}'),s={name:"array-string/58.md"};function l(i,t,r,p,d,c){return n(),a("div",null,t[0]||(t[0]=[o(`<h1 id="_58-length-of-last-word" tabindex="-1"><a href="https://leetcode.com/problems/length-of-last-word/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">58. Length of Last Word</a> <a class="header-anchor" href="#_58-length-of-last-word" aria-label="Permalink to &quot;[58. Length of Last Word](https://leetcode.com/problems/length-of-last-word/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a string <code>s</code> consisting of words and spaces, return the length of the <strong>last</strong> word in the string.</p><p>A <strong>word</strong> is a maximal <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rs:" data-state="closed" class="">substring</button> consisting of non-space characters only.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;Hello World&quot;
Output: 5
Explanation: The last word is &quot;World&quot; with length 5.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;   fly me   to   the moon  &quot;
Output: 4
Explanation: The last word is &quot;moon&quot; with length 4.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;luffy is still joyboy&quot;
Output: 6
Explanation: The last word is &quot;joyboy&quot; with length 6.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length &lt;= 10^4</code></li><li><code>s</code> consists of only English letters and spaces <code>&#39; &#39;</code>.</li><li>There will be at least one word in <code>s</code>.</li></ul><h2 id="📝-approach" tabindex="-1">📝 Approach <a class="header-anchor" href="#📝-approach" aria-label="Permalink to &quot;📝 Approach&quot;">​</a></h2><p>We traverse the string from the end:</p><ul><li>Skip all the trailing spaces at the end of the string.</li><li>Then count the number of consecutive non-space characters — this is the length of the last word.</li><li>Once a space is encountered after counting starts, we stop.</li></ul><p>This approach avoids creating extra arrays or trimming strings.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-TEd8m" id="tab--psEwRj" checked><label data-title="Kotlin" for="tab--psEwRj">Kotlin</label><input type="radio" name="group-TEd8m" id="tab-9mvn5ip"><label data-title="TypeScript" for="tab-9mvn5ip">TypeScript</label><input type="radio" name="group-TEd8m" id="tab-iWL3VYI"><label data-title="Java" for="tab-iWL3VYI">Java</label><input type="radio" name="group-TEd8m" id="tab-H4FXxlb"><label data-title="Python" for="tab-H4FXxlb">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun lengthOfLastWord(s: String): Int {
        var length = 0
        var i = s.length - 1

        // Skip trailing spaces
        while (i &gt;= 0 &amp;&amp; s[i] == &#39; &#39;) {
            i--
        }

        // Count the length of the last word
        while (i &gt;= 0 &amp;&amp; s[i] != &#39; &#39;) {
            length++
            i--
        }

        return length
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function lengthOfLastWord(s: string): number {
    let length = 0;
    let i = s.length - 1;

    // Skip trailing spaces
    while (i &gt;= 0 &amp;&amp; s[i] === &#39; &#39;) {
        i--;
    }

    // Count the length of the last word
    while (i &gt;= 0 &amp;&amp; s[i] !== &#39; &#39;) {
        length++;
        i--;
    }

    return length;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int lengthOfLastWord(String s) {
        int length = 0;
        int i = s.length() - 1;

        // Skip trailing spaces
        while (i &gt;= 0 &amp;&amp; s.charAt(i) == &#39; &#39;) {
            i--;
        }

        // Count the length of the last word
        while (i &gt;= 0 &amp;&amp; s.charAt(i) != &#39; &#39;) {
            length++;
            i--;
        }

        return length;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def lengthOfLastWord(self, s: str) -&gt; int:
        length = 0
        i = len(s) - 1

        # Skip trailing spaces
        while i &gt;= 0 and s[i] == &#39; &#39;:
            i -= 1

        # Count the length of the last word
        while i &gt;= 0 and s[i] != &#39; &#39;:
            length += 1
            i -= 1

        return length
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><h3 id="time-complexity" tabindex="-1">Time Complexity <a class="header-anchor" href="#time-complexity" aria-label="Permalink to &quot;Time Complexity&quot;">​</a></h3><ul><li>We traverse the string <strong>once</strong> from the end to the beginning.</li><li>For each character, we perform a constant-time check.</li><li>Therefore:</li></ul><p><strong>O(n)</strong> — where <em>n</em> is the length of the string.</p><hr><h3 id="space-complexity" tabindex="-1">Space Complexity <a class="header-anchor" href="#space-complexity" aria-label="Permalink to &quot;Space Complexity&quot;">​</a></h3><ul><li>We use only a few integer variables (<code>i</code>, <code>length</code>) and do not create any additional data structures.</li><li>Therefore:</li></ul><p><strong>O(1)</strong> — constant extra space.</p><hr><table tabindex="0"><thead><tr><th>Type</th><th>Complexity</th></tr></thead><tbody><tr><td>⌛ Time</td><td><strong>O(n)</strong></td></tr><tr><td>📦 Space</td><td><strong>O(1)</strong></td></tr></tbody></table>`,28)]))}const u=e(s,[["render",l]]);export{g as __pageData,u as default};
