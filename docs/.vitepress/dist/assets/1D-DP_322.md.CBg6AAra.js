import{_ as e,c as t,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"322. Coin Change","description":"","frontmatter":{},"headers":[],"relativePath":"1D-DP/322.md","filePath":"1D-DP/322.md"}'),i={name:"1D-DP/322.md"};function c(d,n,p,r,s,l){return a(),t("div",null,n[0]||(n[0]=[o(`<h1 id="_322-coin-change" tabindex="-1"><a href="https://leetcode.com/problems/coin-change/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">322. Coin Change</a> <a class="header-anchor" href="#_322-coin-change" aria-label="Permalink to &quot;[322. Coin Change](https://leetcode.com/problems/coin-change/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code> representing a total amount of money.</p><p>Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return <code>-1</code>.</p><p>You may assume that you have an infinite number of each kind of coin.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: coins = [2], amount = 3
Output: -1
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: coins = [1], amount = 0
Output: 0
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= coins.length &lt;= 12</code></li><li><code>1 &lt;= coins[i] &lt;= 2^31 - 1</code></li><li><code>0 &lt;= amount &lt;= 10^4</code></li></ul><h2 id="💡-approach-dynamic-programming-bottom-up" tabindex="-1">💡 Approach: Dynamic Programming (Bottom-Up) <a class="header-anchor" href="#💡-approach-dynamic-programming-bottom-up" aria-label="Permalink to &quot;💡 Approach: Dynamic Programming (Bottom-Up)&quot;">​</a></h2><p>We use a 1D <code>dp</code> array where:</p><ul><li><code>dp[i]</code> represents the <strong>minimum number of coins</strong> required to make up amount <code>i</code>.</li><li>Initialize <code>dp[0] = 0</code> and the rest as a large number (<code>Int.MAX_VALUE</code>).</li><li>For every coin and every sub-amount <code>i</code>, we check if <code>i - coin</code> is reachable. If yes, update <code>dp[i]</code>.</li></ul><h3 id="🧠-transition-formula" tabindex="-1">🧠 Transition Formula: <a class="header-anchor" href="#🧠-transition-formula" aria-label="Permalink to &quot;🧠 Transition Formula:&quot;">​</a></h3><ul><li>dp[i] = min(dp[i], dp[i - coin] + 1) if dp[i - coin] != MAX</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group--gvq7" id="tab-bwKKQ4r" checked><label data-title="Kotlin" for="tab-bwKKQ4r">Kotlin</label><input type="radio" name="group--gvq7" id="tab-PjX6vR4"><label data-title="TypeScript" for="tab-PjX6vR4">TypeScript</label><input type="radio" name="group--gvq7" id="tab-vrgRXxn"><label data-title="Java" for="tab-vrgRXxn">Java</label><input type="radio" name="group--gvq7" id="tab-9miBIFg"><label data-title="Python" for="tab-9miBIFg">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun coinChange(coins: IntArray, amount: Int): Int {
        val dp = IntArray(amount + 1) { Int.MAX_VALUE }
        dp[0] = 0

        for (coin in coins) {
            for (i in coin..amount) {
                if (dp[i - coin] != Int.MAX_VALUE) {
                    dp[i] = minOf(dp[i], dp[i - coin] + 1)
                }
            }
        }

        return if (dp[amount] == Int.MAX_VALUE) -1 else dp[amount]
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function coinChange(coins: number[], amount: number): number {
    const dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;

    for (const coin of coins) {
        for (let i = coin; i &lt;= amount; i++) {
            if (dp[i - coin] !== Number.MAX_SAFE_INTEGER) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int coin : coins) {
            for (int i = coin; i &lt;= amount; i++) {
                if (dp[i - coin] != Integer.MAX_VALUE) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def coinChange(self, coins: List[int], amount: int) -&gt; int:
        dp = [float(&#39;inf&#39;)] * (amount + 1)
        dp[0] = 0

        for coin in coins:
            for i in range(coin, amount + 1):
                if dp[i - coin] != float(&#39;inf&#39;):
                    dp[i] = min(dp[i], dp[i - coin] + 1)

        return -1 if dp[amount] == float(&#39;inf&#39;) else dp[amount]
</code></pre></div></div></div><h3 id="⏱️-time-and-space-complexity" tabindex="-1">⏱️ Time and Space Complexity <a class="header-anchor" href="#⏱️-time-and-space-complexity" aria-label="Permalink to &quot;⏱️ Time and Space Complexity&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Complexity Type</th><th>Value</th><th>Explanation</th></tr></thead><tbody><tr><td><strong>Time Complexity</strong></td><td><code>O(n * amount)</code></td><td><code>n</code> is the number of coin types. For each coin, we iterate through all sub-amounts from <code>coin</code> to <code>amount</code>.</td></tr><tr><td><strong>Space Complexity</strong></td><td><code>O(amount)</code></td><td>We use a one-dimensional DP array of size <code>amount + 1</code> to store the minimum coins needed for each amount.</td></tr></tbody></table>`,21)]))}const g=e(i,[["render",c]]);export{m as __pageData,g as default};
