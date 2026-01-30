import{_ as i,C as a,c as l,o,j as t,ag as r,G as s,a as d}from"./chunks/framework.Bw-5EFTY.js";const A=JSON.parse('{"title":"4. Median of Two Sorted Arrays","description":"","frontmatter":{},"headers":[],"relativePath":"binary-search/4.md","filePath":"binary-search/4.md"}'),c={name:"binary-search/4.md"},m={id:"_4-median-of-two-sorted-arrays",tabindex:"-1"};function h(p,e,f,u,g,y){const n=a("Badge");return o(),l("div",null,[t("h1",m,[e[0]||(e[0]=t("a",{href:"https://leetcode.com/problems/median-of-two-sorted-arrays/description/?envType=study-plan-v2&envId=top-interview-150",target:"_blank",rel:"noreferrer"},"4. Median of Two Sorted Arrays",-1)),s(n,{type:"danger",text:"Hard"}),e[1]||(e[1]=d()),e[2]||(e[2]=t("a",{class:"header-anchor",href:"#_4-median-of-two-sorted-arrays","aria-label":'Permalink to "[4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/description/?envType=study-plan-v2&envId=top-interview-150)<Badge type="danger" text="Hard" />"'},"​",-1))]),e[3]||(e[3]=r(`<p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p><p>The overall run time complexity should be <code>O(log (m+n))</code>.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>nums1.length == m</code></li><li><code>nums2.length == n</code></li><li><code>0 &lt;= m &lt;= 1000</code></li><li><code>0 &lt;= n &lt;= 1000</code></li><li><code>1 &lt;= m + n &lt;= 2000</code></li><li><code>-10^6 &lt;= nums1[i], nums2[i] &lt;= 10^6</code></li></ul><h2 id="💡-approach-binary-search-on-partitions" tabindex="-1">💡 Approach: Binary Search on Partitions <a class="header-anchor" href="#💡-approach-binary-search-on-partitions" aria-label="Permalink to &quot;💡 Approach: Binary Search on Partitions&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>We want the median of the merged arrays without actually merging. Think of a partition that splits the combined sorted array into left and right halves such that:</p><ul><li>All elements in the left half are less than or equal to all elements in the right half</li><li>Left half size equals right half size (for even total) or exceeds by one (for odd total)</li></ul><p>Binary search the partition index on the smaller array <code>nums1</code> so that the partition boundary across <code>nums1</code> and <code>nums2</code> meets the above condition.</p><p>Define:</p><ul><li><code>i</code> = cut position in <code>nums1</code> (0..m)</li><li><code>j</code> = halfLen - i, where <code>halfLen = (m + n + 1) // 2</code></li></ul><p>Check the validity of the cut by comparing border elements:</p><ul><li><code>nums1Left = nums1[i-1]</code> if <code>i &gt; 0</code> else <code>-∞</code></li><li><code>nums1Right = nums1[i]</code> if <code>i &lt; m</code> else <code>+∞</code></li><li><code>nums2Left = nums2[j-1]</code> if <code>j &gt; 0</code> else <code>-∞</code></li><li><code>nums2Right = nums2[j]</code> if <code>j &lt; n</code> else <code>+∞</code></li></ul><p>Valid partition when <code>nums1Left &lt;= nums2Right</code> and <code>nums2Left &lt;= nums1Right</code>.</p><p>If partition is invalid:</p><ul><li>If <code>nums1Left &gt; nums2Right</code>, move <code>i</code> left</li><li>Else move <code>i</code> right</li></ul><p>Finally, compute the median from the max of left and min of right sides, depending on parity of <code>m + n</code>.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li>Ensure <code>nums1</code> is the shorter array; swap if necessary</li><li>Set <code>left = 0</code>, <code>right = m</code>, <code>halfLen = (m + n + 1) // 2</code></li><li>While <code>left &lt;= right</code>: <ul><li><code>i = (left + right) // 2</code>, <code>j = halfLen - i</code></li><li>Adjust <code>left/right</code> based on border comparisons</li><li>When valid, compute median: <ul><li>If total is odd: <code>max(nums1Left, nums2Left)</code></li><li>Else: <code>(max(nums1Left, nums2Left) + min(nums1Right, nums2Right)) / 2</code></li></ul></li></ul></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Binary search on the smaller array only</li><li>Careful with boundaries (use sentinels <code>±∞</code>)</li><li>Works in O(log(min(m, n))) time and O(1) space</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-qyp6i" id="tab-CvdediN" checked><label data-title="Kotlin" for="tab-CvdediN">Kotlin</label><input type="radio" name="group-qyp6i" id="tab-vMW4Mdd"><label data-title="TypeScript" for="tab-vMW4Mdd">TypeScript</label><input type="radio" name="group-qyp6i" id="tab-2MLdGr9"><label data-title="Java" for="tab-2MLdGr9">Java</label><input type="radio" name="group-qyp6i" id="tab-XwnyNJO"><label data-title="Python" for="tab-XwnyNJO">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {
    var A = nums1
    var B = nums2
    if (A.size &gt; B.size) {
        val tmp = A
        A = B
        B = tmp
    }
    val m = A.size
    val n = B.size
    var left = 0
    var right = m
    val halfLen = (m + n + 1) / 2

    while (left &lt;= right) {
        val i = (left + right) / 2
        val j = halfLen - i

        val Aleft = if (i &gt; 0) A[i - 1] else Int.MIN_VALUE
        val Aright = if (i &lt; m) A[i] else Int.MAX_VALUE
        val Bleft = if (j &gt; 0) B[j - 1] else Int.MIN_VALUE
        val Bright = if (j &lt; n) B[j] else Int.MAX_VALUE

        if (Aleft &lt;= Bright &amp;&amp; Bleft &lt;= Aright) {
            val maxLeft = maxOf(Aleft, Bleft)
            if ((m + n) % 2 == 1) return maxLeft.toDouble()
            val minRight = minOf(Aright, Bright)
            return (maxLeft + minRight) / 2.0
        } else if (Aleft &gt; Bright) {
            right = i - 1
        } else {
            left = i + 1
        }
    }
    return 0.0
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let A = nums1, B = nums2;
  if (A.length &gt; B.length) [A, B] = [B, A];
  const m = A.length, n = B.length;
  let left = 0, right = m;
  const halfLen = Math.floor((m + n + 1) / 2);

  while (left &lt;= right) {
    const i = Math.floor((left + right) / 2);
    const j = halfLen - i;

    const Aleft = i &gt; 0 ? A[i - 1] : -Infinity;
    const Aright = i &lt; m ? A[i] : Infinity;
    const Bleft = j &gt; 0 ? B[j - 1] : -Infinity;
    const Bright = j &lt; n ? B[j] : Infinity;

    if (Aleft &lt;= Bright &amp;&amp; Bleft &lt;= Aright) {
      const maxLeft = Math.max(Aleft, Bleft);
      if ((m + n) % 2 === 1) return maxLeft;
      const minRight = Math.min(Aright, Bright);
      return (maxLeft + minRight) / 2;
    } else if (Aleft &gt; Bright) {
      right = i - 1;
    } else {
      left = i + 1;
    }
  }
  return 0;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int[] A = nums1, B = nums2;
        if (A.length &gt; B.length) {
            int[] t = A; A = B; B = t;
        }
        int m = A.length, n = B.length;
        int left = 0, right = m;
        int halfLen = (m + n + 1) / 2;

        while (left &lt;= right) {
            int i = (left + right) / 2;
            int j = halfLen - i;

            int Aleft = (i &gt; 0) ? A[i - 1] : Integer.MIN_VALUE;
            int Aright = (i &lt; m) ? A[i] : Integer.MAX_VALUE;
            int Bleft = (j &gt; 0) ? B[j - 1] : Integer.MIN_VALUE;
            int Bright = (j &lt; n) ? B[j] : Integer.MAX_VALUE;

            if (Aleft &lt;= Bright &amp;&amp; Bleft &lt;= Aright) {
                int maxLeft = Math.max(Aleft, Bleft);
                if (((m + n) % 2) == 1) return maxLeft;
                int minRight = Math.min(Aright, Bright);
                return (maxLeft + minRight) / 2.0;
            } else if (Aleft &gt; Bright) {
                right = i - 1;
            } else {
                left = i + 1;
            }
        }
        return 0.0;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -&gt; float:
        A, B = nums1, nums2
        if len(A) &gt; len(B):
            A, B = B, A
        m, n = len(A), len(B)
        left, right = 0, m
        halfLen = (m + n + 1) // 2

        while left &lt;= right:
            i = (left + right) // 2
            j = halfLen - i

            Aleft = A[i - 1] if i &gt; 0 else float(&#39;-inf&#39;)
            Aright = A[i] if i &lt; m else float(&#39;inf&#39;)
            Bleft = B[j - 1] if j &gt; 0 else float(&#39;-inf&#39;)
            Bright = B[j] if j &lt; n else float(&#39;inf&#39;)

            if Aleft &lt;= Bright and Bleft &lt;= Aright:
                maxLeft = max(Aleft, Bleft)
                if (m + n) % 2 == 1:
                    return float(maxLeft)
                minRight = min(Aright, Bright)
                return (maxLeft + minRight) / 2.0
            elif Aleft &gt; Bright:
                right = i - 1
            else:
                left = i + 1

        return 0.0
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(log(min(m, n)))</li><li><strong>Space Complexity:</strong> O(1)</li></ul>`,29))])}const b=i(c,[["render",h]]);export{A as __pageData,b as default};
