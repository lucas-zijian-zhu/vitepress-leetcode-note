import{_ as t,c as n,o as a,ag as r}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"46. Permutations","description":"","frontmatter":{},"headers":[],"relativePath":"backtracking/46.md","filePath":"backtracking/46.md"}'),s={name:"backtracking/46.md"};function i(l,e,o,u,c,p){return a(),n("div",null,e[0]||(e[0]=[r(`<h1 id="_46-permutations" tabindex="-1"><a href="https://leetcode.com/problems/permutations/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">46. Permutations</a> <a class="header-anchor" href="#_46-permutations" aria-label="Permalink to &quot;[46. Permutations](https://leetcode.com/problems/permutations/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an array <code>nums</code> of distinct integers, return all the possible <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1n:" data-state="closed" class="">permutations</button>. You can return the answer in <strong>any order</strong> .</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [0,1]
Output: [[0,1],[1,0]]
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1]
Output: [[1]]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 6</code></li><li><code>-10 &lt;= nums[i] &lt;= 10</code></li><li>All the integers of <code>nums</code> are <strong>unique</strong> .</li></ul><h2 id="💡-approach-backtracking" tabindex="-1">💡 Approach: Backtracking <a class="header-anchor" href="#💡-approach-backtracking" aria-label="Permalink to &quot;💡 Approach: Backtracking&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>backtracking</strong> problem where we need to generate all possible permutations of the given array. Since we need to generate all permutations, we use backtracking to systematically explore all possible arrangements.</p><p><strong>Key Points:</strong></p><ul><li>Use a <code>used</code> array or set to track which elements are already included in current permutation</li><li>For each position, try all unused elements</li><li>Backtrack when we need to explore other possibilities</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Start with empty permutation</strong> and empty used set</li><li><strong>For each position in the permutation</strong>: <ul><li>Try each unused element from nums</li><li>Add to current permutation and mark as used</li><li>Recurse to fill next position</li><li>Backtrack: remove from permutation and mark as unused</li></ul></li><li><strong>When permutation is complete</strong>, add to result</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use backtracking with visited tracking to avoid using same element twice</li><li>Ensure we explore all possible arrangements</li><li>The number of permutations is n! for n distinct elements</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-RBzmA" id="tab-6JqK9lr" checked><label data-title="Kotlin" for="tab-6JqK9lr">Kotlin</label><input type="radio" name="group-RBzmA" id="tab-shRCEav"><label data-title="TypeScript" for="tab-shRCEav">TypeScript</label><input type="radio" name="group-RBzmA" id="tab-bnmiSNa"><label data-title="Java" for="tab-bnmiSNa">Java</label><input type="radio" name="group-RBzmA" id="tab-fKYSqzO"><label data-title="Python" for="tab-fKYSqzO">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun permute(nums: IntArray): List&lt;List&lt;Int&gt;&gt; {
        val result = mutableListOf&lt;List&lt;Int&gt;&gt;()
        val current = mutableListOf&lt;Int&gt;()
        val used = BooleanArray(nums.size)
        backtrack(nums, current, used, result)
        return result
    }
    
    private fun backtrack(
        nums: IntArray,
        current: MutableList&lt;Int&gt;,
        used: BooleanArray,
        result: MutableList&lt;List&lt;Int&gt;&gt;
    ) {
        // Base case: current permutation is complete
        if (current.size == nums.size) {
            result.add(ArrayList(current))
            return
        }
        
        for (i in nums.indices) {
            if (!used[i]) {
                // Choose
                current.add(nums[i])
                used[i] = true
                
                // Explore
                backtrack(nums, current, used, result)
                
                // Backtrack
                current.removeAt(current.size - 1)
                used[i] = false
            }
        }
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function permute(nums: number[]): number[][] {
    const result: number[][] = [];
    const current: number[] = [];
    const used: boolean[] = new Array(nums.length).fill(false);
    
    backtrack(nums, current, used, result);
    return result;
}

function backtrack(
    nums: number[],
    current: number[],
    used: boolean[],
    result: number[][]
): void {
    // Base case: current permutation is complete
    if (current.length === nums.length) {
        result.push([...current]);
        return;
    }
    
    for (let i = 0; i &lt; nums.length; i++) {
        if (!used[i]) {
            // Choose
            current.push(nums[i]);
            used[i] = true;
            
            // Explore
            backtrack(nums, current, used, result);
            
            // Backtrack
            current.pop();
            used[i] = false;
        }
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public List&lt;List&lt;Integer&gt;&gt; permute(int[] nums) {
        List&lt;List&lt;Integer&gt;&gt; result = new ArrayList&lt;&gt;();
        List&lt;Integer&gt; current = new ArrayList&lt;&gt;();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, current, used, result);
        return result;
    }
    
    private void backtrack(
        int[] nums,
        List&lt;Integer&gt; current,
        boolean[] used,
        List&lt;List&lt;Integer&gt;&gt; result
    ) {
        // Base case: current permutation is complete
        if (current.size() == nums.length) {
            result.add(new ArrayList&lt;&gt;(current));
            return;
        }
        
        for (int i = 0; i &lt; nums.length; i++) {
            if (!used[i]) {
                // Choose
                current.add(nums[i]);
                used[i] = true;
                
                // Explore
                backtrack(nums, current, used, result);
                
                // Backtrack
                current.remove(current.size() - 1);
                used[i] = false;
            }
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def permute(self, nums: List[int]) -&gt; List[List[int]]:
        result = []
        current = []
        used = [False] * len(nums)
        self.backtrack(nums, current, used, result)
        return result
    
    def backtrack(self, nums: List[int], current: List[int], used: List[bool], result: List[List[int]]) -&gt; None:
        # Base case: current permutation is complete
        if len(current) == len(nums):
            result.append(current[:])
            return
        
        for i in range(len(nums)):
            if not used[i]:
                # Choose
                current.append(nums[i])
                used[i] = True
                
                # Explore
                self.backtrack(nums, current, used, result)
                
                # Backtrack
                current.pop()
                used[i] = False
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n! × n) where n is the number of elements. There are n! permutations and each takes O(n) time to copy to result</li><li><strong>Space Complexity:</strong> O(n! × n) for storing all permutations, plus O(n) for recursion stack and tracking arrays</li></ul>`,23)]))}const g=t(s,[["render",i]]);export{m as __pageData,g as default};
