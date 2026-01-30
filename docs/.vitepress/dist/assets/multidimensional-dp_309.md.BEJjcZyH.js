import{_ as t,c as a,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const h=JSON.parse('{"title":"309. Best Time to Buy and Sell Stock with Cooldown","description":"","frontmatter":{},"headers":[],"relativePath":"multidimensional-dp/309.md","filePath":"multidimensional-dp/309.md"}'),i={name:"multidimensional-dp/309.md"};function s(d,e,l,p,c,r){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="_309-best-time-to-buy-and-sell-stock-with-cooldown" tabindex="-1"><a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/" target="_blank" rel="noreferrer">309. Best Time to Buy and Sell Stock with Cooldown</a> <a class="header-anchor" href="#_309-best-time-to-buy-and-sell-stock-with-cooldown" aria-label="Permalink to &quot;[309. Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/)&quot;">​</a></h1><p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i^th</code> day.</p><p>Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:</p><ul><li>After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).</li></ul><p><strong>Note:</strong> You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: prices = [1]
Output: 0
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= prices.length &lt;= 5000</code></li><li><code>0 &lt;= prices[i] &lt;= 1000</code></li></ul><h2 id="approach-dynamic-programming-dp-table" tabindex="-1">Approach: Dynamic Programming (DP Table) <a class="header-anchor" href="#approach-dynamic-programming-dp-table" aria-label="Permalink to &quot;Approach: Dynamic Programming (DP Table)&quot;">​</a></h2><p>We define three states for each day <code>i</code>:</p><table tabindex="0"><thead><tr><th>State</th><th>Meaning</th></tr></thead><tbody><tr><td><code>dp[i][0]</code></td><td>Maximum profit on day <code>i</code>, <strong>holding</strong> a stock</td></tr><tr><td><code>dp[i][1]</code></td><td>Maximum profit on day <code>i</code>, <strong>just sold</strong> (cooldown)</td></tr><tr><td><code>dp[i][2]</code></td><td>Maximum profit on day <code>i</code>, <strong>resting without stock</strong></td></tr></tbody></table><p>On each day, we update these three states based on previous states.</p><hr><h2 id="state-transitions" tabindex="-1">State Transitions <a class="header-anchor" href="#state-transitions" aria-label="Permalink to &quot;State Transitions&quot;">​</a></h2><h3 id="holding-a-stock" tabindex="-1">Holding a stock <a class="header-anchor" href="#holding-a-stock" aria-label="Permalink to &quot;Holding a stock&quot;">​</a></h3><p>We can either:</p><ul><li>Keep holding the stock from yesterday: <code>dp[i-1][0]</code></li><li>Buy today (must have been resting yesterday): <code>dp[i-1][2] - prices[i]</code></li></ul><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="vp-code"><code class="language-text">dp[i][0] = max(dp[i-1][0], dp[i-1][2] - prices[i])
</code></pre></div><h3 id="just-sold-cooldown" tabindex="-1">Just Sold (Cooldown) <a class="header-anchor" href="#just-sold-cooldown" aria-label="Permalink to &quot;Just Sold (Cooldown)&quot;">​</a></h3><p>Only possible by selling today:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="vp-code"><code class="language-text">dp[i][1] = dp[i-1][0] + prices[i]
// held yesterday → sell today
</code></pre></div><h3 id="resting-no-stock-not-cooldown" tabindex="-1">Resting (No Stock &amp; Not Cooldown) <a class="header-anchor" href="#resting-no-stock-not-cooldown" aria-label="Permalink to &quot;Resting (No Stock &amp; Not Cooldown)&quot;">​</a></h3><p>Two ways to rest:</p><ul><li>Continue resting from yesterday.</li><li>Finish cooldown from yesterday’s sell.</li></ul><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="vp-code"><code class="language-text">dp[i][2] = max( dp[i-1][1], dp[i-1][2] )
// cooldown finished or kept resting
</code></pre></div><h3 id="base-case" tabindex="-1">Base Case <a class="header-anchor" href="#base-case" aria-label="Permalink to &quot;Base Case&quot;">​</a></h3><p>On day 0:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="vp-code"><code class="language-text">dp[0][0] = -prices[0] // bought stock
dp[0][1] = 0      // cannot sell yet
dp[0][2] = 0      // resting
</code></pre></div><h3 id="final-answer" tabindex="-1">Final Answer <a class="header-anchor" href="#final-answer" aria-label="Permalink to &quot;Final Answer&quot;">​</a></h3><p>On the last day, you cannot end while holding stock. Answer is:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="vp-code"><code class="language-text">max( dp[n-1][1], dp[n-1][2] )
</code></pre></div><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Ttun0" id="tab-uznR2KO" checked><label data-title="Kotlin" for="tab-uznR2KO">Kotlin</label><input type="radio" name="group-Ttun0" id="tab-vimvmrX"><label data-title="TypeScript" for="tab-vimvmrX">TypeScript</label><input type="radio" name="group-Ttun0" id="tab-zAmVRej"><label data-title="Java" for="tab-zAmVRej">Java</label><input type="radio" name="group-Ttun0" id="tab-isAeB9g"><label data-title="Python" for="tab-isAeB9g">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun maxProfit(prices: IntArray): Int {
        val n = prices.size
        if (n == 0) return 0

        val dp = Array(n) { IntArray(3) }

        // Base case
        dp[0][0] = -prices[0]
        dp[0][1] = 0
        dp[0][2] = 0

        for (i in 1 until n) {
            // Holding stock
            dp[i][0] = maxOf(dp[i-1][0], dp[i-1][2] - prices[i])

            // Just sold (cooldown)
            dp[i][1] = dp[i-1][0] + prices[i]

            // Resting
            dp[i][2] = maxOf(dp[i-1][1], dp[i-1][2])
        }

        return maxOf(dp[n-1][1], dp[n-1][2])
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    maxProfit(prices: number[]): number {
        const n = prices.length;
        if (n === 0) return 0;

        const dp = Array(n).fill(null).map(() =&gt; Array(3).fill(0));

        // Base case
        dp[0][0] = -prices[0];
        dp[0][1] = 0;
        dp[0][2] = 0;

        for (let i = 1; i &lt; n; i++) {
            // Holding stock
            dp[i][0] = Math.max(dp[i-1][0], dp[i-1][2] - prices[i]);

            // Just sold (cooldown)
            dp[i][1] = dp[i-1][0] + prices[i];

            // Resting
            dp[i][2] = Math.max(dp[i-1][1], dp[i-1][2]);
        }

        return Math.max(dp[n-1][1], dp[n-1][2]);
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        if (n == 0) return 0;

        int[][] dp = new int[n][3];

        // Base case
        dp[0][0] = -prices[0];
        dp[0][1] = 0;
        dp[0][2] = 0;

        for (int i = 1; i &lt; n; i++) {
            // Holding stock
            dp[i][0] = Math.max(dp[i-1][0], dp[i-1][2] - prices[i]);

            // Just sold (cooldown)
            dp[i][1] = dp[i-1][0] + prices[i];

            // Resting
            dp[i][2] = Math.max(dp[i-1][1], dp[i-1][2]);
        }

        return Math.max(dp[n-1][1], dp[n-1][2]);
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def maxProfit(self, prices: List[int]) -&gt; int:
        n = len(prices)
        if n == 0:
            return 0

        dp = [[0] * 3 for _ in range(n)]

        # Base case
        dp[0][0] = -prices[0]
        dp[0][1] = 0
        dp[0][2] = 0

        for i in range(1, n):
            # Holding stock
            dp[i][0] = max(dp[i-1][0], dp[i-1][2] - prices[i])

            # Just sold (cooldown)
            dp[i][1] = dp[i-1][0] + prices[i]

            # Resting
            dp[i][2] = max(dp[i-1][1], dp[i-1][2])

        return max(dp[n-1][1], dp[n-1][2])
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody><tr><td><strong>Time</strong></td><td>O(n) — we iterate over the <code>prices</code> array once, updating three states each day</td></tr><tr><td><strong>Space</strong></td><td>O(n) — for the <code>dp</code> table. (Can be optimized to O(1) since each day only depends on the previous day)</td></tr></tbody></table>`,38)]))}const g=t(i,[["render",s]]);export{h as __pageData,g as default};
