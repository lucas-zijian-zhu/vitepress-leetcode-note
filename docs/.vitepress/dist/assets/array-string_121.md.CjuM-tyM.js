import{_ as t,c as a,o as i,ag as n}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"121. Best Time to Buy and Sell Stock","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/121.md","filePath":"array-string/121.md"}'),o={name:"array-string/121.md"};function r(c,e,p,l,s,d){return i(),a("div",null,e[0]||(e[0]=[n(`<h1 id="_121-best-time-to-buy-and-sell-stock" tabindex="-1"><a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">121. Best Time to Buy and Sell Stock</a> <a class="header-anchor" href="#_121-best-time-to-buy-and-sell-stock" aria-label="Permalink to &quot;[121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i^th</code> day.</p><p>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p><p>Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return <code>0</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= prices.length &lt;= 10^5</code></li><li><code>0 &lt;= prices[i] &lt;= 10^4</code></li></ul><h2 id="🚀-approach" tabindex="-1">🚀 Approach <a class="header-anchor" href="#🚀-approach" aria-label="Permalink to &quot;🚀 Approach&quot;">​</a></h2><ul><li>Iterate through the array from left to right.</li><li>Keep track of the smallest price seen so far: <code>minPrice</code>.</li><li>At each step, calculate the profit if you sold today: <code>price - minPrice</code>.</li><li>Keep track of the maximum profit: <code>maxProfit</code>.</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-TU-2b" id="tab-e2BB1tj" checked><label data-title="Kotlin" for="tab-e2BB1tj">Kotlin</label><input type="radio" name="group-TU-2b" id="tab-4Wk25x_"><label data-title="TypeScript" for="tab-4Wk25x_">TypeScript</label><input type="radio" name="group-TU-2b" id="tab-7QYrn3L"><label data-title="Java" for="tab-7QYrn3L">Java</label><input type="radio" name="group-TU-2b" id="tab-lTaQTbV"><label data-title="Python" for="tab-lTaQTbV">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun maxProfit(prices: IntArray): Int {
    var minPrice = Int.MAX_VALUE
    var maxProfit = 0

    for (price in prices) {
        if (price &lt; minPrice) {
            minPrice = price
        } else if (price - minPrice &gt; maxProfit) {
            maxProfit = price - minPrice
        }
    }

    return maxProfit
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function maxProfit(prices: number[]): number {
    let minPrice = Number.MAX_VALUE;
    let maxProfit = 0;

    for (const price of prices) {
        if (price &lt; minPrice) {
            minPrice = price;
        } else if (price - minPrice &gt; maxProfit) {
            maxProfit = price - minPrice;
        }
    }

    return maxProfit;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            if (price &lt; minPrice) {
                minPrice = price;
            } else if (price - minPrice &gt; maxProfit) {
                maxProfit = price - minPrice;
            }
        }

        return maxProfit;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def maxProfit(self, prices: List[int]) -&gt; int:
        min_price = float(&#39;inf&#39;)
        max_profit = 0

        for price in prices:
            if price &lt; min_price:
                min_price = price
            elif price - min_price &gt; max_profit:
                max_profit = price - min_price

        return max_profit
</code></pre></div></div></div><h2 id="⏱️-complexity" tabindex="-1">⏱️ Complexity <a class="header-anchor" href="#⏱️-complexity" aria-label="Permalink to &quot;⏱️ Complexity&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Metric</th><th>Complexity</th></tr></thead><tbody><tr><td>Time</td><td>O(n)</td></tr><tr><td>Space</td><td>O(1)</td></tr></tbody></table>`,16)]))}const f=t(o,[["render",r]]);export{u as __pageData,f as default};
