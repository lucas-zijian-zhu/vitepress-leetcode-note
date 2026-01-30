import{_ as n,c as e,o as a,ag as r}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"77. Combinations","description":"","frontmatter":{},"headers":[],"relativePath":"backtracking/77.md","filePath":"backtracking/77.md"}'),i={name:"backtracking/77.md"};function o(s,t,l,c,u,p){return a(),e("div",null,t[0]||(t[0]=[r(`<h1 id="_77-combinations" tabindex="-1"><a href="https://leetcode.com/problems/combinations/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">77. Combinations</a> <a class="header-anchor" href="#_77-combinations" aria-label="Permalink to &quot;[77. Combinations](https://leetcode.com/problems/combinations/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given two integers <code>n</code> and <code>k</code>, return all possible combinations of <code>k</code> numbers chosen from the range <code>[1, n]</code>.</p><p>You may return the answer in <strong>any order</strong> .</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Explanation: There are 4 choose 2 = 6 total combinations.
Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: n = 1, k = 1
Output: [[1]]
Explanation: There is 1 choose 1 = 1 total combination.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= n &lt;= 20</code></li><li><code>1 &lt;= k &lt;= n</code></li></ul><h2 id="💡-approach-backtracking" tabindex="-1">💡 Approach: Backtracking <a class="header-anchor" href="#💡-approach-backtracking" aria-label="Permalink to &quot;💡 Approach: Backtracking&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>backtracking</strong> problem where we need to generate all possible combinations of k numbers from the range [1, n]. Since we need combinations (not permutations), order doesn&#39;t matter, so we can avoid duplicates by ensuring we always choose numbers in ascending order.</p><p><strong>Key Points:</strong></p><ul><li>Use backtracking to build combinations one element at a time</li><li>Start from current index to avoid duplicates (only consider numbers &gt;= current choice)</li><li>Stop when we have selected k elements</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Start with empty combination</strong> and current number = 1</li><li><strong>For each position</strong>: <ul><li>Try each number from current to n</li><li>Add to current combination</li><li>Recurse to build next element (starting from next number)</li><li>Backtrack: remove current number and try next</li></ul></li><li><strong>When combination has k elements</strong>, add to result</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use index parameter to ensure ascending order (avoid duplicates)</li><li>Prune early when remaining numbers cannot complete the combination</li><li>Backtrack properly to explore all possibilities</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-AHM6C" id="tab-luE7nqw" checked><label data-title="Kotlin" for="tab-luE7nqw">Kotlin</label><input type="radio" name="group-AHM6C" id="tab-FYMdzTO"><label data-title="TypeScript" for="tab-FYMdzTO">TypeScript</label><input type="radio" name="group-AHM6C" id="tab--jWAZVv"><label data-title="Java" for="tab--jWAZVv">Java</label><input type="radio" name="group-AHM6C" id="tab-zOg6qwU"><label data-title="Python" for="tab-zOg6qwU">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun combine(n: Int, k: Int): List&lt;List&lt;Int&gt;&gt; {
        val result = mutableListOf&lt;List&lt;Int&gt;&gt;()
        val current = mutableListOf&lt;Int&gt;()
        backtrack(n, k, 1, current, result)
        return result
    }
    
    private fun backtrack(
        n: Int,
        k: Int,
        start: Int,
        current: MutableList&lt;Int&gt;,
        result: MutableList&lt;List&lt;Int&gt;&gt;
    ) {
        // Base case: we have k elements in our combination
        if (current.size == k) {
            result.add(ArrayList(current))
            return
        }
        
        // Try each number from start to n
        for (i in start..n) {
            // Pruning: if we can&#39;t complete the combination with remaining numbers
            if (current.size + (n - i + 1) &lt; k) break
            
            current.add(i)
            backtrack(n, k, i + 1, current, result) // Use i + 1 to avoid duplicates
            current.removeAt(current.size - 1) // Backtrack
        }
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function combine(n: number, k: number): number[][] {
    const result: number[][] = [];
    const current: number[] = [];
    backtrack(n, k, 1, current, result);
    return result;
}

function backtrack(
    n: number,
    k: number,
    start: number,
    current: number[],
    result: number[][]
): void {
    // Base case: we have k elements in our combination
    if (current.length === k) {
        result.push([...current]);
        return;
    }
    
    // Try each number from start to n
    for (let i = start; i &lt;= n; i++) {
        // Pruning: if we can&#39;t complete the combination with remaining numbers
        if (current.length + (n - i + 1) &lt; k) break;
        
        current.push(i);
        backtrack(n, k, i + 1, current, result); // Use i + 1 to avoid duplicates
        current.pop(); // Backtrack
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public List&lt;List&lt;Integer&gt;&gt; combine(int n, int k) {
        List&lt;List&lt;Integer&gt;&gt; result = new ArrayList&lt;&gt;();
        List&lt;Integer&gt; current = new ArrayList&lt;&gt;();
        backtrack(n, k, 1, current, result);
        return result;
    }
    
    private void backtrack(
        int n,
        int k,
        int start,
        List&lt;Integer&gt; current,
        List&lt;List&lt;Integer&gt;&gt; result
    ) {
        // Base case: we have k elements in our combination
        if (current.size() == k) {
            result.add(new ArrayList&lt;&gt;(current));
            return;
        }
        
        // Try each number from start to n
        for (int i = start; i &lt;= n; i++) {
            // Pruning: if we can&#39;t complete the combination with remaining numbers
            if (current.size() + (n - i + 1) &lt; k) break;
            
            current.add(i);
            backtrack(n, k, i + 1, current, result); // Use i + 1 to avoid duplicates
            current.remove(current.size() - 1); // Backtrack
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def combine(self, n: int, k: int) -&gt; List[List[int]]:
        result = []
        current = []
        self.backtrack(n, k, 1, current, result)
        return result
    
    def backtrack(self, n: int, k: int, start: int, current: List[int], result: List[List[int]]) -&gt; None:
        # Base case: we have k elements in our combination
        if len(current) == k:
            result.append(current[:])
            return
        
        # Try each number from start to n
        for i in range(start, n + 1):
            # Pruning: if we can&#39;t complete the combination with remaining numbers
            if len(current) + (n - i + 1) &lt; k:
                break
            
            current.append(i)
            self.backtrack(n, k, i + 1, current, result)  # Use i + 1 to avoid duplicates
            current.pop()  # Backtrack
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(C(n, k) × k) where C(n, k) is the binomial coefficient &quot;n choose k&quot;. There are C(n, k) combinations and each takes O(k) time to copy to result</li><li><strong>Space Complexity:</strong> O(C(n, k) × k) for storing all combinations, plus O(k) for recursion stack</li></ul>`,22)]))}const b=n(i,[["render",o]]);export{m as __pageData,b as default};
