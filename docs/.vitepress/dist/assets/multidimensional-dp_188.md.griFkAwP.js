import{_ as t,c as n,o as a,ag as i}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"188. Best Time to Buy and Sell Stock IV","description":"","frontmatter":{},"headers":[],"relativePath":"multidimensional-dp/188.md","filePath":"multidimensional-dp/188.md"}'),s={name:"multidimensional-dp/188.md"};function o(l,e,r,c,p,d){return a(),n("div",null,e[0]||(e[0]=[i(`<h1 id="_188-best-time-to-buy-and-sell-stock-iv" tabindex="-1"><a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">188. Best Time to Buy and Sell Stock IV</a> <a class="header-anchor" href="#_188-best-time-to-buy-and-sell-stock-iv" aria-label="Permalink to &quot;[188. Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>You are given an integer array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i^th</code> day, and an integer <code>k</code>.</p><p>Find the maximum profit you can achieve. You may complete at most <code>k</code> transactions: i.e. you may buy at most <code>k</code> times and sell at most <code>k</code> times.</p><p><strong>Note:</strong> You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= k &lt;= 100</code></li><li><code>1 &lt;= prices.length &lt;= 1000</code></li><li><code>0 &lt;= prices[i] &lt;= 1000</code></li></ul><h2 id="🚀-approach" tabindex="-1">🚀 Approach <a class="header-anchor" href="#🚀-approach" aria-label="Permalink to &quot;🚀 Approach&quot;">​</a></h2><h3 id="case-1️⃣-—-when-k-n-2" tabindex="-1">Case 1️⃣ — When <code>k &gt;= n/2</code>: <a class="header-anchor" href="#case-1️⃣-—-when-k-n-2" aria-label="Permalink to &quot;Case 1️⃣ — When \`k &gt;= n/2\`:&quot;">​</a></h3><ul><li>Each transaction consists of at least two days (buy + sell), so the maximum number of transactions is at most <code>n/2</code>.</li><li>If <code>k &gt;= n/2</code>, we can trade as many times as we want — i.e., capture every upward price movement.</li><li>Use <strong>greedy</strong>: sum up all positive differences.</li></ul><h3 id="case-2️⃣-—-when-k-n-2" tabindex="-1">Case 2️⃣ — When <code>k &lt; n/2</code>: <a class="header-anchor" href="#case-2️⃣-—-when-k-n-2" aria-label="Permalink to &quot;Case 2️⃣ — When \`k &lt; n/2\`:&quot;">​</a></h3><ul><li>Transactions are limited.</li><li>Use <strong>Dynamic Programming</strong>: <ul><li>Maintain two arrays: <ul><li><code>buys[j]</code>: the maximum profit after <code>j+1</code>-th buy.</li><li><code>sells[j]</code>: the maximum profit after <code>j+1</code>-th sell.</li></ul></li><li>Iterate over <code>prices</code>, and for each price and each transaction count <code>j</code>, update: <ul><li><code>buys[j] = max(buys[j], (sells[j-1] if j&gt;0 else 0) - price)</code></li><li><code>sells[j] = max(sells[j], buys[j] + price)</code></li></ul></li></ul></li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Lt1yC" id="tab-XmO9npc" checked><label data-title="Kotlin" for="tab-XmO9npc">Kotlin</label><input type="radio" name="group-Lt1yC" id="tab-3s8_yHu"><label data-title="TypeScript" for="tab-3s8_yHu">TypeScript</label><input type="radio" name="group-Lt1yC" id="tab-WOS6xLm"><label data-title="Java" for="tab-WOS6xLm">Java</label><input type="radio" name="group-Lt1yC" id="tab-gREG5Mr"><label data-title="Python" for="tab-gREG5Mr">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun maxProfit(k: Int, prices: IntArray): Int {
        val n = prices.size
        if (n == 0 || k == 0) return 0

        // Case 1: unlimited transactions
        if (k &gt;= n / 2) {
            var profit = 0
            for (i in 1 until n) {
                if (prices[i] &gt; prices[i - 1]) {
                    profit += prices[i] - prices[i - 1]
                }
            }
            return profit
        }

        // Case 2: limited transactions
        val buys = IntArray(k) { Int.MIN_VALUE }
        val sells = IntArray(k)

        for (price in prices) {
            for (j in 0 until k) {
                val prevSell = if (j == 0) 0 else sells[j - 1]
                buys[j] = maxOf(buys[j], prevSell - price)
                sells[j] = maxOf(sells[j], buys[j] + price)
            }
        }

        return sells[k - 1]
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class Solution {
    maxProfit(k: number, prices: number[]): number {
        const n = prices.length;
        if (n === 0 || k === 0) return 0;

        // Case 1: unlimited transactions
        if (k &gt;= n / 2) {
            let profit = 0;
            for (let i = 1; i &lt; n; i++) {
                if (prices[i] &gt; prices[i - 1]) {
                    profit += prices[i] - prices[i - 1];
                }
            }
            return profit;
        }

        // Case 2: limited transactions
        const buys = new Array(k).fill(Number.MIN_SAFE_INTEGER);
        const sells = new Array(k).fill(0);

        for (const price of prices) {
            for (let j = 0; j &lt; k; j++) {
                const prevSell = j === 0 ? 0 : sells[j - 1];
                buys[j] = Math.max(buys[j], prevSell - price);
                sells[j] = Math.max(sells[j], buys[j] + price);
            }
        }

        return sells[k - 1];
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int maxProfit(int k, int[] prices) {
        int n = prices.length;
        if (n == 0 || k == 0) return 0;

        // Case 1: unlimited transactions
        if (k &gt;= n / 2) {
            int profit = 0;
            for (int i = 1; i &lt; n; i++) {
                if (prices[i] &gt; prices[i - 1]) {
                    profit += prices[i] - prices[i - 1];
                }
            }
            return profit;
        }

        // Case 2: limited transactions
        int[] buys = new int[k];
        int[] sells = new int[k];
        Arrays.fill(buys, Integer.MIN_VALUE);

        for (int price : prices) {
            for (int j = 0; j &lt; k; j++) {
                int prevSell = j == 0 ? 0 : sells[j - 1];
                buys[j] = Math.max(buys[j], prevSell - price);
                sells[j] = Math.max(sells[j], buys[j] + price);
            }
        }

        return sells[k - 1];
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def maxProfit(self, k: int, prices: List[int]) -&gt; int:
        n = len(prices)
        if n == 0 or k == 0:
            return 0

        # Case 1: unlimited transactions
        if k &gt;= n // 2:
            profit = 0
            for i in range(1, n):
                if prices[i] &gt; prices[i - 1]:
                    profit += prices[i] - prices[i - 1]
            return profit

        # Case 2: limited transactions
        buys = [float(&#39;-inf&#39;)] * k
        sells = [0] * k

        for price in prices:
            for j in range(k):
                prev_sell = 0 if j == 0 else sells[j - 1]
                buys[j] = max(buys[j], prev_sell - price)
                sells[j] = max(sells[j], buys[j] + price)

        return sells[k - 1]
</code></pre></div></div></div><h2 id="⏱️-complexity" tabindex="-1">⏱️ Complexity <a class="header-anchor" href="#⏱️-complexity" aria-label="Permalink to &quot;⏱️ Complexity&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Metric</th><th>Complexity</th></tr></thead><tbody><tr><td>Time</td><td>O(n * k)</td></tr><tr><td>Space</td><td>O(k)</td></tr></tbody></table><h3 id="explanation" tabindex="-1">Explanation <a class="header-anchor" href="#explanation" aria-label="Permalink to &quot;Explanation&quot;">​</a></h3><ul><li><p><strong>Time Complexity:</strong></p><ul><li>Outer loop runs for each price → <code>O(n)</code></li><li>Inner loop runs up to <code>k</code> times → <code>O(k)</code></li><li>Total → <code>O(n * k)</code></li><li>If <code>k &gt;= n/2</code>, the algorithm switches to greedy, which is <code>O(n)</code>.</li></ul></li><li><p><strong>Space Complexity:</strong></p><ul><li>We use two arrays of size <code>k</code> (<code>buys</code> and <code>sells</code>).</li><li>Total → <code>O(k)</code></li></ul></li></ul><h3 id="best-case" tabindex="-1">Best Case <a class="header-anchor" href="#best-case" aria-label="Permalink to &quot;Best Case&quot;">​</a></h3><ul><li>When <code>k &gt;= n/2</code>, the problem becomes unlimited transactions → greedy → <strong>O(n)</strong> time and <strong>O(1)</strong> space.</li></ul><h3 id="worst-case" tabindex="-1">Worst Case <a class="header-anchor" href="#worst-case" aria-label="Permalink to &quot;Worst Case&quot;">​</a></h3><ul><li>When <code>k &lt; n/2</code>, the DP solution is required → <strong>O(n * k)</strong> time and <strong>O(k)</strong> space.</li></ul>`,26)]))}const h=t(s,[["render",o]]);export{m as __pageData,h as default};
