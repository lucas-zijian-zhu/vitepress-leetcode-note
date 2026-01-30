import{_ as n,c as e,o as t,ag as i}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"135. Candy","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/135.md","filePath":"array-string/135.md"}'),s={name:"array-string/135.md"};function o(r,a,l,d,c,p){return t(),e("div",null,a[0]||(a[0]=[i(`<h1 id="_135-candy" tabindex="-1"><a href="https://leetcode.com/problems/candy/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">135. Candy</a> <a class="header-anchor" href="#_135-candy" aria-label="Permalink to &quot;[135. Candy](https://leetcode.com/problems/candy/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>There are <code>n</code> children standing in a line. Each child is assigned a rating value given in the integer array <code>ratings</code>.</p><p>You are giving candies to these children subjected to the following requirements:</p><ul><li>Each child must have at least one candy.</li><li>Children with a higher rating get more candies than their neighbors.</li></ul><p>Return the minimum number of candies you need to have to distribute the candies to the children.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>n == ratings.length</code></li><li><code>1 &lt;= n &lt;= 2 * 10^4</code></li><li><code>0 &lt;= ratings[i] &lt;= 2 * 10^4</code></li></ul><h2 id="📋-approach" tabindex="-1">📋 Approach <a class="header-anchor" href="#📋-approach" aria-label="Permalink to &quot;📋 Approach&quot;">​</a></h2><p>We need to distribute candies to children standing in a line such that:</p><ul><li>Each child gets at least 1 candy.</li><li>If a child has a higher rating than their immediate neighbor, they get more candies than that neighbor.</li></ul><h3 id="key-idea" tabindex="-1">Key Idea: <a class="header-anchor" href="#key-idea" aria-label="Permalink to &quot;Key Idea:&quot;">​</a></h3><p>✅ Use a <strong>greedy two-pass scan</strong> because each child needs to satisfy constraints with both their left and right neighbors.<br> ✅ The constraints from the left and right are <strong>independent</strong>, so we can solve them separately and take the maximum of both.</p><h3 id="steps" tabindex="-1">Steps: <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps:&quot;">​</a></h3><p>1️⃣ Initialize an array <code>candies</code> with all elements set to <code>1</code>.<br> 2️⃣ Left-to-right pass:</p><ul><li>If <code>ratings[i] &gt; ratings[i-1]</code>, set <code>candies[i] = candies[i-1] + 1</code>. 3️⃣ Right-to-left pass:</li><li>If <code>ratings[i] &gt; ratings[i+1]</code>, set <code>candies[i] = max(candies[i], candies[i+1] + 1)</code>. 4️⃣ Sum up all values in <code>candies</code> as the result.</li></ul><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-qwN4h" id="tab-097jEas" checked><label data-title="Kotlin" for="tab-097jEas">Kotlin</label><input type="radio" name="group-qwN4h" id="tab-5pbuMTq"><label data-title="TypeScript" for="tab-5pbuMTq">TypeScript</label><input type="radio" name="group-qwN4h" id="tab-1f9HDrh"><label data-title="Java" for="tab-1f9HDrh">Java</label><input type="radio" name="group-qwN4h" id="tab-fE-uE0H"><label data-title="Python" for="tab-fE-uE0H">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun candy(ratings: IntArray): Int {
    val n = ratings.size
    val candies = IntArray(n) { 1 }

    // Left-to-right pass
    for (i in 1 until n) {
        if (ratings[i] &gt; ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1
        }
    }

    // Right-to-left pass
    for (i in n - 2 downTo 0) {
        if (ratings[i] &gt; ratings[i + 1]) {
            candies[i] = maxOf(candies[i], candies[i + 1] + 1)
        }
    }

    return candies.sum()
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function candy(ratings: number[]): number {
    const n = ratings.length;
    const candies = new Array(n).fill(1);

    // Left-to-right pass
    for (let i = 1; i &lt; n; i++) {
        if (ratings[i] &gt; ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // Right-to-left pass
    for (let i = n - 2; i &gt;= 0; i--) {
        if (ratings[i] &gt; ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }

    return candies.reduce((sum, candy) =&gt; sum + candy, 0);
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] candies = new int[n];
        Arrays.fill(candies, 1);

        // Left-to-right pass
        for (int i = 1; i &lt; n; i++) {
            if (ratings[i] &gt; ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }

        // Right-to-left pass
        for (int i = n - 2; i &gt;= 0; i--) {
            if (ratings[i] &gt; ratings[i + 1]) {
                candies[i] = Math.max(candies[i], candies[i + 1] + 1);
            }
        }

        int total = 0;
        for (int candy : candies) {
            total += candy;
        }
        return total;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def candy(self, ratings: List[int]) -&gt; int:
        n = len(ratings)
        candies = [1] * n

        # Left-to-right pass
        for i in range(1, n):
            if ratings[i] &gt; ratings[i - 1]:
                candies[i] = candies[i - 1] + 1

        # Right-to-left pass
        for i in range(n - 2, -1, -1):
            if ratings[i] &gt; ratings[i + 1]:
                candies[i] = max(candies[i], candies[i + 1] + 1)

        return sum(candies)
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><ul><li><p><strong>Time Complexity:</strong><br> (O(n)) — We iterate over the array twice (left-to-right and right-to-left), each in linear time.</p></li><li><p><strong>Space Complexity:</strong><br> (O(n)) — We use an auxiliary array <code>candies</code> of size (n) to store the candy counts.</p></li></ul>`,24)]))}const u=n(s,[["render",o]]);export{g as __pageData,u as default};
