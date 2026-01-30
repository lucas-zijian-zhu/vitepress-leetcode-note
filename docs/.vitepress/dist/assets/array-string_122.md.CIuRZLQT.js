import{_ as t,c as a,o as i,ag as n}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"122. Best Time to Buy and Sell Stock II","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/122.md","filePath":"array-string/122.md"}'),o={name:"array-string/122.md"};function s(r,e,p,l,c,d){return i(),a("div",null,e[0]||(e[0]=[n(`<h1 id="_122-best-time-to-buy-and-sell-stock-ii" tabindex="-1"><a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">122. Best Time to Buy and Sell Stock II</a> <a class="header-anchor" href="#_122-best-time-to-buy-and-sell-stock-ii" aria-label="Permalink to &quot;[122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given an integer array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i^th</code> day.</p><p>On each day, you may decide to buy and/or sell the stock. You can only hold <strong>at most one</strong> share of the stock at any time. However, you can buy it then immediately sell it on the <strong>same day</strong> .</p><p>Find and return the <strong>maximum</strong> profit you can achieve.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Total profit is 4 + 3 = 7.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Total profit is 4.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: prices = [7,6,4,3,1]
Output: 0
Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= prices.length &lt;= 3 * 10^4</code></li><li><code>0 &lt;= prices[i] &lt;= 10^4</code></li></ul><h2 id="🚀-approach" tabindex="-1">🚀 Approach <a class="header-anchor" href="#🚀-approach" aria-label="Permalink to &quot;🚀 Approach&quot;">​</a></h2><ul><li>Since you can perform unlimited transactions, you can capture <strong>every upward price movement</strong>.</li><li>Iterate through the array.</li><li>If the current day&#39;s price is higher than the previous day&#39;s, you add the difference to your profit.</li><li>This is equivalent to buying at each local minima and selling at each local maxima, but we can simplify by summing up all positive differences.</li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-UBO5K" id="tab-iLYsdzI" checked><label data-title="Kotlin" for="tab-iLYsdzI">Kotlin</label><input type="radio" name="group-UBO5K" id="tab-ZvA7YHb"><label data-title="TypeScript" for="tab-ZvA7YHb">TypeScript</label><input type="radio" name="group-UBO5K" id="tab-RIeXD61"><label data-title="Java" for="tab-RIeXD61">Java</label><input type="radio" name="group-UBO5K" id="tab-Y2tLJ0I"><label data-title="Python" for="tab-Y2tLJ0I">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun maxProfit(prices: IntArray): Int {
    var maxProfit = 0

    for (i in 1 until prices.size) {
        if (prices[i] &gt; prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1]
        }
    }

    return maxProfit
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function maxProfit(prices: number[]): number {
    let maxProfit = 0;

    for (let i = 1; i &lt; prices.length; i++) {
        if (prices[i] &gt; prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1];
        }
    }

    return maxProfit;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0;

        for (int i = 1; i &lt; prices.length; i++) {
            if (prices[i] &gt; prices[i - 1]) {
                maxProfit += prices[i] - prices[i - 1];
            }
        }

        return maxProfit;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def maxProfit(self, prices: List[int]) -&gt; int:
        max_profit = 0

        for i in range(1, len(prices)):
            if prices[i] &gt; prices[i - 1]:
                max_profit += prices[i] - prices[i - 1]

        return max_profit
</code></pre></div></div></div><h2 id="⏱️-complexity" tabindex="-1">⏱️ Complexity <a class="header-anchor" href="#⏱️-complexity" aria-label="Permalink to &quot;⏱️ Complexity&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Metric</th><th>Complexity</th></tr></thead><tbody><tr><td>Time</td><td>O(n)</td></tr><tr><td>Space</td><td>O(1)</td></tr></tbody></table>`,19)]))}const y=t(o,[["render",s]]);export{m as __pageData,y as default};
