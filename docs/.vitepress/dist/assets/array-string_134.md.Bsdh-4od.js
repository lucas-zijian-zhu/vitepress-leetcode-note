import{_ as a,c as n,o as e,ag as o}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"134. Gas Station","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/134.md","filePath":"array-string/134.md"}'),i={name:"array-string/134.md"};function s(r,t,l,c,d,p){return e(),n("div",null,t[0]||(t[0]=[o(`<h1 id="_134-gas-station" tabindex="-1"><a href="https://leetcode.com/problems/gas-station/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">134. Gas Station</a> <a class="header-anchor" href="#_134-gas-station" aria-label="Permalink to &quot;[134. Gas Station](https://leetcode.com/problems/gas-station/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>There are <code>n</code> gas stations along a circular route, where the amount of gas at the <code>i^th</code> station is <code>gas[i]</code>.</p><p>You have a car with an unlimited gas tank and it costs <code>cost[i]</code> of gas to travel from the <code>i^th</code> station to its next <code>(i + 1)^th</code> station. You begin the journey with an empty tank at one of the gas stations.</p><p>Given two integer arrays <code>gas</code> and <code>cost</code>, return the starting gas station&#39;s index if you can travel around the circuit once in the clockwise direction, otherwise return <code>-1</code>. If there exists a solution, it is <strong>guaranteed</strong> to be <strong>unique</strong> .</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation:
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
Explanation:
You can&#39;t start at station 0 or 1, as there is not enough gas to travel to the next station.
Let&#39;s start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
Therefore, you can&#39;t travel around the circuit once no matter where you start.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>n == gas.length == cost.length</code></li><li><code>1 &lt;= n &lt;= 10^5</code></li><li><code>0 &lt;= gas[i], cost[i] &lt;= 10^4</code></li><li>The input is generated such that the answer is unique.</li></ul><h2 id="📋-approach" tabindex="-1">📋 Approach <a class="header-anchor" href="#📋-approach" aria-label="Permalink to &quot;📋 Approach&quot;">​</a></h2><ul><li>If the total amount of gas in the circle is less than the total cost, there is no solution. Return <code>-1</code>.</li><li>Otherwise, iterate through the array once: <ul><li>Assume the starting point is <code>0</code>.</li><li>Use <code>tank</code> to keep track of the remaining gas from the current <code>start</code> to the current position.</li><li>If at some position <code>tank &lt; 0</code>, it means we cannot reach this point starting from <code>start</code>.<br> So update <code>start</code> to the next station (<code>i+1</code>) and reset <code>tank = 0</code>.</li></ul></li><li>After finishing the loop: <ul><li>If the total gas ≥ total cost, the final <code>start</code> is the answer.</li><li>Otherwise, return <code>-1</code>.</li></ul></li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-hMLnb" id="tab-9xJUusP" checked><label data-title="Kotlin" for="tab-9xJUusP">Kotlin</label><input type="radio" name="group-hMLnb" id="tab-nl427Ms"><label data-title="TypeScript" for="tab-nl427Ms">TypeScript</label><input type="radio" name="group-hMLnb" id="tab-E9OYBw1"><label data-title="Java" for="tab-E9OYBw1">Java</label><input type="radio" name="group-hMLnb" id="tab-u2fURuW"><label data-title="Python" for="tab-u2fURuW">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun canCompleteCircuit(gas: IntArray, cost: IntArray): Int {
    var total = 0      // Total remaining gas
    var tank = 0       // Remaining gas from current start to i
    var start = 0      // Current assumed starting point

    for (i in gas.indices) {
        val diff = gas[i] - cost[i]
        total += diff
        tank += diff

        // If tank &lt; 0, current start is invalid
        if (tank &lt; 0) {
            start = i + 1
            tank = 0
        }
    }

    return if (total &gt;= 0) start else -1
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function canCompleteCircuit(gas: number[], cost: number[]): number {
    let total = 0;      // Total remaining gas
    let tank = 0;       // Remaining gas from current start to i
    let start = 0;      // Current assumed starting point

    for (let i = 0; i &lt; gas.length; i++) {
        const diff = gas[i] - cost[i];
        total += diff;
        tank += diff;

        // If tank &lt; 0, current start is invalid
        if (tank &lt; 0) {
            start = i + 1;
            tank = 0;
        }
    }

    return total &gt;= 0 ? start : -1;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int total = 0;      // Total remaining gas
        int tank = 0;       // Remaining gas from current start to i
        int start = 0;      // Current assumed starting point

        for (int i = 0; i &lt; gas.length; i++) {
            int diff = gas[i] - cost[i];
            total += diff;
            tank += diff;

            // If tank &lt; 0, current start is invalid
            if (tank &lt; 0) {
                start = i + 1;
                tank = 0;
            }
        }

        return total &gt;= 0 ? start : -1;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -&gt; int:
        total = 0      # Total remaining gas
        tank = 0       # Remaining gas from current start to i
        start = 0      # Current assumed starting point

        for i in range(len(gas)):
            diff = gas[i] - cost[i]
            total += diff
            tank += diff

            # If tank &lt; 0, current start is invalid
            if tank &lt; 0:
                start = i + 1
                tank = 0

        return start if total &gt;= 0 else -1
</code></pre></div></div></div><h2 id="⏱️-complexity" tabindex="-1">⏱️ Complexity <a class="header-anchor" href="#⏱️-complexity" aria-label="Permalink to &quot;⏱️ Complexity&quot;">​</a></h2><ul><li><p><strong>Time Complexity:</strong><br> O(n) — We iterate through the <code>gas</code> and <code>cost</code> arrays exactly once.</p></li><li><p><strong>Space Complexity:</strong><br> O(1) — Only a few integer variables are used; no extra data structures.</p></li></ul>`,17)]))}const h=a(i,[["render",s]]);export{g as __pageData,h as default};
