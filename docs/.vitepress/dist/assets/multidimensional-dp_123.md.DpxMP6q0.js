import{_ as t,c as a,o as n,ag as l}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"123. Best Time to Buy and Sell Stock III","description":"","frontmatter":{},"headers":[],"relativePath":"multidimensional-dp/123.md","filePath":"multidimensional-dp/123.md"}'),o={name:"multidimensional-dp/123.md"};function i(s,e,c,p,r,d){return n(),a("div",null,e[0]||(e[0]=[l(`<h1 id="_123-best-time-to-buy-and-sell-stock-iii" tabindex="-1"><a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">123. Best Time to Buy and Sell Stock III</a> <a class="header-anchor" href="#_123-best-time-to-buy-and-sell-stock-iii" aria-label="Permalink to &quot;[123. Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i^th</code> day.</p><p>Find the maximum profit you can achieve. You may complete <strong>at most two transactions</strong> .</p><p><strong>Note:</strong> You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= prices.length &lt;= 10^5</code></li><li><code>0 &lt;= prices[i] &lt;= 10^5</code></li></ul><h2 id="🚀-approach" tabindex="-1">🚀 Approach <a class="header-anchor" href="#🚀-approach" aria-label="Permalink to &quot;🚀 Approach&quot;">​</a></h2><p>This is an extension of the single transaction problem (LeetCode 121).<br> We want to maximize the profit from <strong>at most two transactions</strong>.<br> We can track 4 states:</p><ul><li><code>buy1</code>: The maximum cash you have after buying the first stock (minimize the cost).</li><li><code>sell1</code>: The maximum cash you have after selling the first stock.</li><li><code>buy2</code>: The maximum cash you have after buying the second stock (considering the profit from the first transaction).</li><li><code>sell2</code>: The maximum cash you have after selling the second stock.</li></ul><p>For each price:</p><ul><li><code>buy1 = max(buy1, -price)</code></li><li><code>sell1 = max(sell1, buy1 + price)</code></li><li><code>buy2 = max(buy2, sell1 - price)</code></li><li><code>sell2 = max(sell2, buy2 + price)</code></li></ul><p>We initialize <code>buy1</code> and <code>buy2</code> to negative infinity and <code>sell1</code> and <code>sell2</code> to 0.<br> At the end, <code>sell2</code> contains the maximum profit with at most two transactions.</p><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-eDlln" id="tab-SM7X7-N" checked><label data-title="Kotlin" for="tab-SM7X7-N">Kotlin</label><input type="radio" name="group-eDlln" id="tab-Kgfr-oo"><label data-title="TypeScript" for="tab-Kgfr-oo">TypeScript</label><input type="radio" name="group-eDlln" id="tab-b1AdmZQ"><label data-title="Java" for="tab-b1AdmZQ">Java</label><input type="radio" name="group-eDlln" id="tab-K5VcKgp"><label data-title="Python" for="tab-K5VcKgp">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun maxProfit(prices: IntArray): Int {
    var buy1 = Int.MIN_VALUE
    var sell1 = 0
    var buy2 = Int.MIN_VALUE
    var sell2 = 0

    for (price in prices) {
        buy1 = maxOf(buy1, -price)
        sell1 = maxOf(sell1, buy1 + price)
        buy2 = maxOf(buy2, sell1 - price)
        sell2 = maxOf(sell2, buy2 + price)
    }

    return sell2
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function maxProfit(prices: number[]): number {
    let buy1 = Number.MIN_SAFE_INTEGER;
    let sell1 = 0;
    let buy2 = Number.MIN_SAFE_INTEGER;
    let sell2 = 0;

    for (const price of prices) {
        buy1 = Math.max(buy1, -price);
        sell1 = Math.max(sell1, buy1 + price);
        buy2 = Math.max(buy2, sell1 - price);
        sell2 = Math.max(sell2, buy2 + price);
    }

    return sell2;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int maxProfit(int[] prices) {
        int buy1 = Integer.MIN_VALUE;
        int sell1 = 0;
        int buy2 = Integer.MIN_VALUE;
        int sell2 = 0;

        for (int price : prices) {
            buy1 = Math.max(buy1, -price);
            sell1 = Math.max(sell1, buy1 + price);
            buy2 = Math.max(buy2, sell1 - price);
            sell2 = Math.max(sell2, buy2 + price);
        }

        return sell2;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def maxProfit(self, prices: List[int]) -&gt; int:
        buy1 = float(&#39;-inf&#39;)
        sell1 = 0
        buy2 = float(&#39;-inf&#39;)
        sell2 = 0

        for price in prices:
            buy1 = max(buy1, -price)
            sell1 = max(sell1, buy1 + price)
            buy2 = max(buy2, sell1 - price)
            sell2 = max(sell2, buy2 + price)

        return sell2
</code></pre></div></div></div><h2 id="⏱️-complexity" tabindex="-1">⏱️ Complexity <a class="header-anchor" href="#⏱️-complexity" aria-label="Permalink to &quot;⏱️ Complexity&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Metric</th><th>Complexity</th></tr></thead><tbody><tr><td>Time</td><td>O(n)</td></tr><tr><td>Space</td><td>O(1)</td></tr></tbody></table>`,23)]))}const y=t(o,[["render",i]]);export{m as __pageData,y as default};
