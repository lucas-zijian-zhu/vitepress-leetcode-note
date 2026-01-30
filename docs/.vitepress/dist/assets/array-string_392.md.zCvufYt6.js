import{_ as t,c as o,o as a,ag as n}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"392. Is Subsequence","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/392.md","filePath":"array-string/392.md"}'),s={name:"array-string/392.md"};function i(l,e,c,r,d,p){return a(),o("div",null,e[0]||(e[0]=[n(`<h1 id="_392-is-subsequence" tabindex="-1"><a href="https://leetcode.com/problems/is-subsequence/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">392. Is Subsequence</a> <a class="header-anchor" href="#_392-is-subsequence" aria-label="Permalink to &quot;[392. Is Subsequence](https://leetcode.com/problems/is-subsequence/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given two strings <code>s</code> and <code>t</code>, return <code>true</code> if <code>s</code> is a <strong>subsequence</strong> of <code>t</code>, or <code>false</code> otherwise.</p><p>A <strong>subsequence</strong> of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., <code>&quot;ace&quot;</code> is a subsequence of <code>&quot;abcde&quot;</code> while <code>&quot;aec&quot;</code> is not).</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;abc&quot;, t = &quot;ahbgdc&quot;
Output: true
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;axc&quot;, t = &quot;ahbgdc&quot;
Output: false
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>0 &lt;= s.length &lt;= 100</code></li><li><code>0 &lt;= t.length &lt;= 10^4</code></li><li><code>s</code> and <code>t</code> consist only of lowercase English letters.</li></ul><p><strong>Follow up:</strong> Suppose there are lots of incoming <code>s</code>, say <code>s<sub>1</sub>, s<sub>2</sub>, ..., s<sub>k</sub></code> where <code>k &gt;= 10^9</code>, and you want to check one by one to see if <code>t</code> has its subsequence. In this scenario, how would you change your code?</p><h3 id="💡-approach" tabindex="-1">💡 Approach <a class="header-anchor" href="#💡-approach" aria-label="Permalink to &quot;💡 Approach&quot;">​</a></h3><p>We use a two-pointer technique:</p><ul><li>Pointer <code>i</code> for string <code>s</code></li><li>Pointer <code>j</code> for string <code>t</code></li><li>Traverse <code>t</code>, whenever <code>s[i] == t[j]</code>, move <code>i</code> forward.</li><li>Always move <code>j</code> forward.</li><li>If we reach the end of <code>s</code>, that means all characters were found in order in <code>t</code>.</li></ul><p>Edge case:</p><ul><li>If <code>s</code> is an empty string, return <code>true</code>.</li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Xe1hL" id="tab-Ng7bbe5" checked><label data-title="Kotlin" for="tab-Ng7bbe5">Kotlin</label><input type="radio" name="group-Xe1hL" id="tab-irbGsl-"><label data-title="TypeScript" for="tab-irbGsl-">TypeScript</label><input type="radio" name="group-Xe1hL" id="tab-Tu8zLQC"><label data-title="Java" for="tab-Tu8zLQC">Java</label><input type="radio" name="group-Xe1hL" id="tab-z5DSASd"><label data-title="Python" for="tab-z5DSASd">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun isSubsequence(s: String, t: String): Boolean {
        var i = 0
        var j = 0
        while (i &lt; s.length &amp;&amp; j &lt; t.length) {
            if (s[i] == t[j]) {
                i++
            }
            j++
        }
        return i == s.length
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function isSubsequence(s: string, t: string): boolean {
    let i = 0;
    let j = 0;
    
    while (i &lt; s.length &amp;&amp; j &lt; t.length) {
        if (s[i] === t[j]) {
            i++;
        }
        j++;
    }
    
    return i === s.length;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0;
        int j = 0;
        
        while (i &lt; s.length() &amp;&amp; j &lt; t.length()) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
            }
            j++;
        }
        
        return i == s.length();
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def isSubsequence(self, s: str, t: str) -&gt; bool:
        i = 0
        j = 0
        
        while i &lt; len(s) and j &lt; len(t):
            if s[i] == t[j]:
                i += 1
            j += 1
        
        return i == len(s)
</code></pre></div></div></div><h2 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h2><ul><li><p><strong>Time Complexity</strong>: O(n)</p><ul><li>Where <code>n</code> is the length of string <code>t</code>.</li><li>We traverse <code>t</code> at most once with a single pass.</li></ul></li><li><p><strong>Space Complexity</strong>: O(1)</p><ul><li>No extra space is used aside from a few integer pointers.</li></ul></li></ul>`,20)]))}const h=t(s,[["render",i]]);export{g as __pageData,h as default};
