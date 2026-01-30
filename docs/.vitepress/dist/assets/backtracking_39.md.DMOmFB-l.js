import{_ as a,C as r,c as i,o as s,j as e,ag as o,G as l,a as c}from"./chunks/framework.Bw-5EFTY.js";const f=JSON.parse('{"title":"39. Combination Sum","description":"","frontmatter":{},"headers":[],"relativePath":"backtracking/39.md","filePath":"backtracking/39.md"}'),d={name:"backtracking/39.md"},u={id:"_39-combination-sum",tabindex:"-1"};function p(g,t,m,b,h,v){const n=r("Badge");return s(),i("div",null,[e("h1",u,[t[0]||(t[0]=e("a",{href:"https://leetcode.com/problems/combination-sum/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"39. Combination Sum",-1)),l(n,{type:"warning",text:"Medium"}),t[1]||(t[1]=c()),t[2]||(t[2]=e("a",{class:"header-anchor",href:"#_39-combination-sum","aria-label":'Permalink to "[39. Combination Sum](https://leetcode.com/problems/combination-sum/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),t[3]||(t[3]=o(`<p>Given an array of <strong>distinct</strong> integers <code>candidates</code> and a target integer <code>target</code>, return a list of all <strong>unique combinations</strong> of <code>candidates</code> where the chosen numbers sum to <code>target</code>. You may return the combinations in <strong>any order</strong> .</p><p>The <strong>same</strong> number may be chosen from <code>candidates</code> an <strong>unlimited number of times</strong> . Two combinations are unique if the <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1n:" data-state="closed" class="">frequency</button> of at least one of the chosen numbers is different.</p><p>The test cases are generated such that the number of unique combinations that sum up to <code>target</code> is less than <code>150</code> combinations for the given input.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: candidates = [2], target = 1
Output: []
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= candidates.length &lt;= 30</code></li><li><code>2 &lt;= candidates[i] &lt;= 40</code></li><li>All elements of <code>candidates</code> are <strong>distinct</strong> .</li><li><code>1 &lt;= target &lt;= 40</code></li></ul><h2 id="🚀-approach-backtracking" tabindex="-1">🚀 Approach: Backtracking <a class="header-anchor" href="#🚀-approach-backtracking" aria-label="Permalink to &quot;🚀 Approach: Backtracking&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>backtracking</strong> problem where we need to explore all possible combinations that sum to the target. The key insight is that we can reuse the same number multiple times.</p><p><strong>Key Points:</strong></p><ol><li><strong>Backtracking</strong> - Try adding each candidate, recurse, then backtrack</li><li><strong>Reuse allowed</strong> - Same number can be used unlimited times</li><li><strong>Avoid duplicates</strong> - Start from current index to avoid permutations</li><li><strong>Pruning</strong> - Stop early if current sum exceeds target</li></ol><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Start with empty combination</strong> and sum = 0</li><li><strong>For each candidate</strong> (from current index): <ul><li>Add candidate to current combination</li><li>Recursively explore with updated sum</li><li>If sum equals target, add to result</li><li>If sum exceeds target, stop (pruning)</li><li>Backtrack: remove candidate</li></ul></li><li><strong>Return all valid combinations</strong></li></ol><hr><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-9jLY1" id="tab-qvfF2gM" checked><label data-title="Kotlin" for="tab-qvfF2gM">Kotlin</label><input type="radio" name="group-9jLY1" id="tab-m8ozxh7"><label data-title="TypeScript" for="tab-m8ozxh7">TypeScript</label><input type="radio" name="group-9jLY1" id="tab-I6WQj50"><label data-title="Java" for="tab-I6WQj50">Java</label><input type="radio" name="group-9jLY1" id="tab-cHekpL1"><label data-title="Python" for="tab-cHekpL1">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun combinationSum(candidates: IntArray, target: Int): List&lt;List&lt;Int&gt;&gt; {
        val result = mutableListOf&lt;List&lt;Int&gt;&gt;()
        val current = mutableListOf&lt;Int&gt;()
        backtrack(candidates, target, 0, 0, current, result)
        return result
    }
    
    private fun backtrack(
        candidates: IntArray,
        target: Int,
        start: Int,
        sum: Int,
        current: MutableList&lt;Int&gt;,
        result: MutableList&lt;List&lt;Int&gt;&gt;
    ) {
        if (sum == target) {
            result.add(ArrayList(current))
            return
        }
        
        if (sum &gt; target) return // Pruning
        
        for (i in start until candidates.size) {
            current.add(candidates[i])
            // Can reuse same element, so pass i (not i+1)
            backtrack(candidates, target, i, sum + candidates[i], current, result)
            current.removeAt(current.size - 1) // Backtrack
        }
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];
    const current: number[] = [];
    backtrack(candidates, target, 0, 0, current, result);
    return result;
}

function backtrack(
    candidates: number[],
    target: number,
    start: number,
    sum: number,
    current: number[],
    result: number[][]
): void {
    if (sum === target) {
        result.push([...current]);
        return;
    }
    
    if (sum &gt; target) return; // Pruning
    
    for (let i = start; i &lt; candidates.length; i++) {
        current.push(candidates[i]);
        // Can reuse same element, so pass i (not i+1)
        backtrack(candidates, target, i, sum + candidates[i], current, result);
        current.pop(); // Backtrack
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public List&lt;List&lt;Integer&gt;&gt; combinationSum(int[] candidates, int target) {
        List&lt;List&lt;Integer&gt;&gt; result = new ArrayList&lt;&gt;();
        List&lt;Integer&gt; current = new ArrayList&lt;&gt;();
        backtrack(candidates, target, 0, 0, current, result);
        return result;
    }
    
    private void backtrack(
        int[] candidates,
        int target,
        int start,
        int sum,
        List&lt;Integer&gt; current,
        List&lt;List&lt;Integer&gt;&gt; result
    ) {
        if (sum == target) {
            result.add(new ArrayList&lt;&gt;(current));
            return;
        }
        
        if (sum &gt; target) return; // Pruning
        
        for (int i = start; i &lt; candidates.length; i++) {
            current.add(candidates[i]);
            // Can reuse same element, so pass i (not i+1)
            backtrack(candidates, target, i, sum + candidates[i], current, result);
            current.remove(current.size() - 1); // Backtrack
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def combinationSum(self, candidates: List[int], target: int) -&gt; List[List[int]]:
        result = []
        current = []
        self.backtrack(candidates, target, 0, 0, current, result)
        return result
    
    def backtrack(self, candidates: List[int], target: int, start: int, current_sum: int, current: List[int], result: List[List[int]]) -&gt; None:
        if current_sum == target:
            result.append(current[:])
            return
        
        if current_sum &gt; target:
            return  # Pruning
        
        for i in range(start, len(candidates)):
            current.append(candidates[i])
            # Can reuse same element, so pass i (not i+1)
            self.backtrack(candidates, target, i, current_sum + candidates[i], current, result)
            current.pop()  # Backtrack
</code></pre></div></div></div><h2 id="complexity-analysis" tabindex="-1">Complexity Analysis <a class="header-anchor" href="#complexity-analysis" aria-label="Permalink to &quot;Complexity Analysis&quot;">​</a></h2><p><strong>Notation:</strong></p><ul><li><p><strong>n</strong> = Length of candidates array</p></li><li><p><strong>t</strong> = Target value</p></li><li><p><strong>m</strong> = Minimum value in candidates</p></li><li><p><strong>Time Complexity:</strong> O(n^(t/m))</p><ul><li>In worst case, we explore a tree of depth t/m</li><li>At each level, we have n choices</li><li>Exponential complexity due to exploring all combinations</li></ul></li><li><p><strong>Space Complexity:</strong> O(t/m)</p><ul><li>Recursion depth: O(t/m) - maximum depth of recursion tree</li><li>Current combination: O(t/m) - maximum length of a valid combination</li></ul></li></ul>`,24))])}const y=a(d,[["render",p]]);export{f as __pageData,y as default};
