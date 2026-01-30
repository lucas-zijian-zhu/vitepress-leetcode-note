import{_ as a,c as t,o as n,ag as o}from"./chunks/framework.Bw-5EFTY.js";const v=JSON.parse('{"title":"219. Contains Duplicate II","description":"","frontmatter":{},"headers":[],"relativePath":"hashmap/219.md","filePath":"hashmap/219.md"}'),s={name:"hashmap/219.md"};function l(i,e,p,c,r,d){return n(),t("div",null,e[0]||(e[0]=[o(`<h1 id="_219-contains-duplicate-ii" tabindex="-1"><a href="https://leetcode.com/problems/contains-duplicate-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">219. Contains Duplicate II</a> <a class="header-anchor" href="#_219-contains-duplicate-ii" aria-label="Permalink to &quot;[219. Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <code>true</code> if there are two <strong>distinct indices</strong> <code>i</code> and <code>j</code> in the array such that <code>nums[i] == nums[j]</code> and <code>abs(i - j) &lt;= k</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,2,3,1], k = 3
Output: true
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,0,1,1], k = 1
Output: true
</code></pre></div><p><strong>Example 3:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums = [1,2,3,1,2,3], k = 2
Output: false
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= nums.length &lt;= 10^5</code></li><li><code>-10^9 &lt;= nums[i] &lt;= 10^9</code></li><li><code>0 &lt;= k &lt;= 10^5</code></li></ul><h2 id="approach-hashmap-last-seen-index" tabindex="-1">Approach (HashMap: last seen index) <a class="header-anchor" href="#approach-hashmap-last-seen-index" aria-label="Permalink to &quot;Approach (HashMap: last seen index)&quot;">​</a></h2><p>We scan the array once and keep a map from value → its <strong>last seen index</strong>.<br> For each index <code>i</code>:</p><ul><li>If <code>nums[i]</code> has appeared before at index <code>j</code>, check if <code>i - j &lt;= k</code>. <ul><li>If yes, we’ve found a valid pair → return <code>true</code>.</li></ul></li><li>Update the last seen index of <code>nums[i]</code> to <code>i</code>.</li></ul><p>This ensures we only keep the most recent index for each value and check distance in O(1).</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-oTLyd" id="tab-jqLEU9R" checked><label data-title="Kotlin" for="tab-jqLEU9R">Kotlin</label><input type="radio" name="group-oTLyd" id="tab-NowABFi"><label data-title="TypeScript" for="tab-NowABFi">TypeScript</label><input type="radio" name="group-oTLyd" id="tab-kMz1l0D"><label data-title="Java" for="tab-kMz1l0D">Java</label><input type="radio" name="group-oTLyd" id="tab-aeYcjHr"><label data-title="Python" for="tab-aeYcjHr">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun containsNearbyDuplicate(nums: IntArray, k: Int): Boolean {
        val last = HashMap&lt;Int, Int&gt;() // value -&gt; last index
        for (i in nums.indices) {
            val v = nums[i]
            val prev = last[v]
            if (prev != null &amp;&amp; i - prev &lt;= k) return true
            last[v] = i
        }
        return false
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function containsNearbyDuplicate(nums: number[], k: number): boolean {
    const last = new Map&lt;number, number&gt;(); // value -&gt; last index
    
    for (let i = 0; i &lt; nums.length; i++) {
        const v = nums[i];
        const prev = last.get(v);
        if (prev !== undefined &amp;&amp; i - prev &lt;= k) return true;
        last.set(v, i);
    }
    
    return false;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Map&lt;Integer, Integer&gt; last = new HashMap&lt;&gt;(); // value -&gt; last index
        
        for (int i = 0; i &lt; nums.length; i++) {
            int v = nums[i];
            Integer prev = last.get(v);
            if (prev != null &amp;&amp; i - prev &lt;= k) return true;
            last.put(v, i);
        }
        
        return false;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -&gt; bool:
        last = {}  # value -&gt; last index
        
        for i in range(len(nums)):
            v = nums[i]
            prev = last.get(v)
            if prev is not None and i - prev &lt;= k:
                return True
            last[v] = i
        
        return False
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><p><strong>Time Complexity:</strong> <code>O(n)</code><br> We traverse the array once, and each lookup/update in the HashMap/HashSet is <code>O(1)</code> on average.</p></li><li><p><strong>Space Complexity:</strong> <code>O(min(n, k))</code><br> At most, the HashMap/HashSet will store <code>k</code> elements (sliding window of size <code>k</code>).</p></li></ul>`,18)]))}const m=a(s,[["render",l]]);export{v as __pageData,m as default};
