import{_ as a,C as t,c as o,o as s,j as n,ag as l,G as r,a as d}from"./chunks/framework.Bw-5EFTY.js";const v=JSON.parse('{"title":"665. Non-decreasing Array","description":"","frontmatter":{},"headers":[],"relativePath":"array-string/665.md","filePath":"array-string/665.md"}'),u={name:"array-string/665.md"},c={id:"_665-non-decreasing-array",tabindex:"-1"};function p(m,e,g,h,f,y){const i=t("Badge");return s(),o("div",null,[n("h1",c,[e[0]||(e[0]=n("a",{href:"https://leetcode.com/problems/non-decreasing-array/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"665. Non-decreasing Array",-1)),r(i,{type:"warning",text:"Medium"}),e[1]||(e[1]=d()),e[2]||(e[2]=n("a",{class:"header-anchor",href:"#_665-non-decreasing-array","aria-label":'Permalink to "[665. Non-decreasing Array](https://leetcode.com/problems/non-decreasing-array/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="warning" text="Medium" />"'},"​",-1))]),e[3]||(e[3]=l(`<p>Given an array <code>nums</code> with <code>n</code> integers, your task is to check if it could become non-decreasing by modifying <strong>at most one element</strong>.</p><p>We define an array is non-decreasing if <code>nums[i] &lt;= nums[i + 1]</code> holds for every <code>i</code> (0-based) such that (<code>0 &lt;= i &lt;= n - 2</code>).</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [4,2,3]
Output: true
Explanation: You could modify the first 4 to 1 to get a non-decreasing array.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [4,2,1]
Output: false
Explanation: You can&#39;t get a non-decreasing array by modifying at most one element.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>n == nums.length</code></li><li><code>1 &lt;= n &lt;= 10^4</code></li><li><code>-10^5 &lt;= nums[i] &lt;= 10^5</code></li></ul><h2 id="💡-approach-greedy-with-one-pass" tabindex="-1">💡 Approach: Greedy with One Pass <a class="header-anchor" href="#💡-approach-greedy-with-one-pass" aria-label="Permalink to &quot;💡 Approach: Greedy with One Pass&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>When we encounter a violation (nums[i] &gt; nums[i+1]), we have two options:</p><ol><li>Lower nums[i] to nums[i+1]</li><li>Raise nums[i+1] to nums[i]</li></ol><p>We should choose the option that doesn&#39;t create a new violation. The key is to check if modifying nums[i] would break the relationship with nums[i-1].</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li>Track a count of modifications needed.</li><li>For each violation (nums[i] &gt; nums[i+1]): <ul><li>If we can lower nums[i] (i == 0 or nums[i-1] &lt;= nums[i+1]), do it.</li><li>Otherwise, raise nums[i+1] to nums[i].</li></ul></li><li>If count &gt; 1, return false.</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Prefer lowering nums[i] when possible (less impact on future elements)</li><li>Only raise nums[i+1] when lowering nums[i] would create a new violation</li><li>Early exit if we need more than one modification</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-6KjN5" id="tab-aI_ehzp" checked><label data-title="Kotlin" for="tab-aI_ehzp">Kotlin</label><input type="radio" name="group-6KjN5" id="tab-dafQnk1"><label data-title="TypeScript" for="tab-dafQnk1">TypeScript</label><input type="radio" name="group-6KjN5" id="tab-dnZR6Xq"><label data-title="Java" for="tab-dnZR6Xq">Java</label><input type="radio" name="group-6KjN5" id="tab-8f830sM"><label data-title="Python" for="tab-8f830sM">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun checkPossibility(nums: IntArray): Boolean {
        var modified = false
        
        for (i in 0 until nums.size - 1) {
            if (nums[i] &gt; nums[i + 1]) {
                if (modified) return false
                
                if (i == 0 || nums[i - 1] &lt;= nums[i + 1]) {
                    nums[i] = nums[i + 1]
                } else {
                    nums[i + 1] = nums[i]
                }
                modified = true
            }
        }
        
        return true
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function checkPossibility(nums: number[]): boolean {
    let modified = false;
    
    for (let i = 0; i &lt; nums.length - 1; i++) {
        if (nums[i] &gt; nums[i + 1]) {
            if (modified) return false;
            
            if (i === 0 || nums[i - 1] &lt;= nums[i + 1]) {
                nums[i] = nums[i + 1];
            } else {
                nums[i + 1] = nums[i];
            }
            modified = true;
        }
    }
    
    return true;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean checkPossibility(int[] nums) {
        boolean modified = false;
        
        for (int i = 0; i &lt; nums.length - 1; i++) {
            if (nums[i] &gt; nums[i + 1]) {
                if (modified) return false;
                
                if (i == 0 || nums[i - 1] &lt;= nums[i + 1]) {
                    nums[i] = nums[i + 1];
                } else {
                    nums[i + 1] = nums[i];
                }
                modified = true;
            }
        }
        
        return true;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def checkPossibility(self, nums: List[int]) -&gt; bool:
        modified = False
        
        for i in range(len(nums) - 1):
            if nums[i] &gt; nums[i + 1]:
                if modified:
                    return False
                
                if i == 0 or nums[i - 1] &lt;= nums[i + 1]:
                    nums[i] = nums[i + 1]
                else:
                    nums[i + 1] = nums[i]
                modified = True
        
        return True
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(n), single pass through the array.</li><li><strong>Space Complexity:</strong> O(1), only using a boolean flag.</li></ul>`,21))])}const k=a(u,[["render",p]]);export{v as __pageData,k as default};
