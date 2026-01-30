import{_ as t,c as o,o as a,ag as n}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"139. Word Break","description":"","frontmatter":{},"headers":[],"relativePath":"1D-DP/139.md","filePath":"1D-DP/139.md"}'),i={name:"1D-DP/139.md"};function d(r,e,s,l,c,p){return a(),o("div",null,e[0]||(e[0]=[n(`<h1 id="_139-word-break" tabindex="-1"><a href="https://leetcode.com/problems/word-break/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">139. Word Break</a> <a class="header-anchor" href="#_139-word-break" aria-label="Permalink to &quot;[139. Word Break](https://leetcode.com/problems/word-break/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.</p><p><strong>Note</strong> that the same word in the dictionary may be reused multiple times in the segmentation.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;leetcode&quot;, wordDict = [&quot;leet&quot;,&quot;code&quot;]
Output: true
Explanation: Return true because &quot;leetcode&quot; can be segmented as &quot;leet code&quot;.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;applepenapple&quot;, wordDict = [&quot;apple&quot;,&quot;pen&quot;]
Output: true
Explanation: Return true because &quot;applepenapple&quot; can be segmented as &quot;apple pen apple&quot;.
Note that you are allowed to reuse a dictionary word.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: s = &quot;catsandog&quot;, wordDict = [&quot;cats&quot;,&quot;dog&quot;,&quot;sand&quot;,&quot;and&quot;,&quot;cat&quot;]
Output: false
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= s.length &lt;= 300</code></li><li><code>1 &lt;= wordDict.length &lt;= 1000</code></li><li><code>1 &lt;= wordDict[i].length &lt;= 20</code></li><li><code>s</code> and <code>wordDict[i]</code> consist of only lowercase English letters.</li><li>All the strings of <code>wordDict</code> are <strong>unique</strong> .</li></ul><h2 id="💡-approach-dynamic-programming-dp" tabindex="-1">💡 Approach: Dynamic Programming (DP) <a class="header-anchor" href="#💡-approach-dynamic-programming-dp" aria-label="Permalink to &quot;💡 Approach: Dynamic Programming (DP)&quot;">​</a></h2><p>The key idea is to determine whether the string <code>s</code> can be <strong>built incrementally</strong> using valid dictionary words.</p><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><ul><li>We define a boolean array <code>dp</code> of size <code>s.length + 1</code>.</li><li><code>dp[i]</code> is <code>true</code> if <code>s[0:i]</code> can be segmented into valid dictionary words.</li><li>Initialize <code>dp[0] = true</code>, since an empty string is considered valid.</li><li>For each position <code>i</code>, we check every <code>j</code> from <code>0</code> to <code>i</code>: <ul><li>If <code>dp[j] == true</code> and <code>s[j:i]</code> is in the dictionary, then <code>dp[i] = true</code>.</li></ul></li></ul><h3 id="transition-formula" tabindex="-1">Transition Formula <a class="header-anchor" href="#transition-formula" aria-label="Permalink to &quot;Transition Formula&quot;">​</a></h3><ul><li>dp[i] = true, if there exists j &lt; i such that:</li><li>dp[j] == true &amp;&amp; s[j:i] in wordDict</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-QUzjS" id="tab-53YaXPY" checked><label data-title="Kotlin" for="tab-53YaXPY">Kotlin</label><input type="radio" name="group-QUzjS" id="tab-BB0TIjP"><label data-title="TypeScript" for="tab-BB0TIjP">TypeScript</label><input type="radio" name="group-QUzjS" id="tab-cCw0B4L"><label data-title="Java" for="tab-cCw0B4L">Java</label><input type="radio" name="group-QUzjS" id="tab-g6Ac0Eu"><label data-title="Python" for="tab-g6Ac0Eu">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun wordBreak(s: String, wordDict: List&lt;String&gt;): Boolean {
    val wordSet = wordDict.toSet()
    val dp = BooleanArray(s.length + 1)
    dp[0] = true

    for (i in 1..s.length) {
        for (j in 0 until i) {
            if (dp[j] &amp;&amp; s.substring(j, i) in wordSet) {
                dp[i] = true
                break
            }
        }
    }

    return dp[s.length]
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function wordBreak(s: string, wordDict: string[]): boolean {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i &lt;= s.length; i++) {
        for (let j = 0; j &lt; i; j++) {
            if (dp[j] &amp;&amp; wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length];
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean wordBreak(String s, List&lt;String&gt; wordDict) {
        Set&lt;String&gt; wordSet = new HashSet&lt;&gt;(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;

        for (int i = 1; i &lt;= s.length(); i++) {
            for (int j = 0; j &lt; i; j++) {
                if (dp[j] &amp;&amp; wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[s.length()];
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -&gt; bool:
        word_set = set(wordDict)
        dp = [False] * (len(s) + 1)
        dp[0] = True

        for i in range(1, len(s) + 1):
            for j in range(i):
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break

        return dp[len(s)]
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Complexity Type</th><th>Value</th><th>Explanation</th></tr></thead><tbody><tr><td><strong>Time Complexity</strong></td><td><code>O(n^2)</code></td><td>For each index <code>i</code> in <code>s</code>, we loop over all previous positions <code>j</code> to check if <code>dp[j]</code> is <code>true</code> and <code>s[j:i]</code> is in the word set. <code>substring(j, i)</code> runs in <code>O(i - j)</code>, but often treated as <code>O(1)</code> in interviews for simplicity.</td></tr><tr><td><strong>Space Complexity</strong></td><td><code>O(n + k)</code></td><td><code>O(n)</code> for the <code>dp</code> array, <code>O(k)</code> for the dictionary converted to a set, where <code>k</code> is the total length of all words in <code>wordDict</code>.</td></tr></tbody></table>`,21)]))}const h=t(i,[["render",d]]);export{g as __pageData,h as default};
