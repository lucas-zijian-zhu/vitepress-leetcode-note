import{_ as e,c as n,o as i,ag as a}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"17. Letter Combinations of a Phone Number","description":"","frontmatter":{},"headers":[],"relativePath":"backtracking/17.md","filePath":"backtracking/17.md"}'),o={name:"backtracking/17.md"};function r(s,t,l,c,d,u){return i(),n("div",null,t[0]||(t[0]=[a(`<h1 id="_17-letter-combinations-of-a-phone-number" tabindex="-1"><a href="https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">17. Letter Combinations of a Phone Number</a> <a class="header-anchor" href="#_17-letter-combinations-of-a-phone-number" aria-label="Permalink to &quot;[17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Given a string containing digits from <code>2-9</code> inclusive, return all possible letter combinations that the number could represent. Return the answer in <strong>any order</strong> .</p><p>A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters. <img alt="" src="https://assets.leetcode.com/uploads/2022/03/15/1200px-telephone-keypad2svg.png" style="width:300px;height:243px;"></p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: digits = &quot;23&quot;
Output: [&quot;ad&quot;,&quot;ae&quot;,&quot;af&quot;,&quot;bd&quot;,&quot;be&quot;,&quot;bf&quot;,&quot;cd&quot;,&quot;ce&quot;,&quot;cf&quot;]
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: digits = &quot;2&quot;
Output: [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= digits.length &lt;= 4</code></li><li><code>digits[i]</code> is a digit in the range <code>[&#39;2&#39;, &#39;9&#39;]</code>.</li></ul><h2 id="💡-approach-backtracking" tabindex="-1">💡 Approach: Backtracking <a class="header-anchor" href="#💡-approach-backtracking" aria-label="Permalink to &quot;💡 Approach: Backtracking&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>backtracking</strong> problem where we need to generate all possible letter combinations from a phone number. Each digit maps to multiple letters, and we need to explore all possible combinations.</p><p><strong>Key Points:</strong></p><ul><li>Each digit 2-9 maps to 3-4 letters (like old phone keypad)</li><li>We need to find all combinations by choosing one letter from each digit</li><li>Use backtracking to systematically explore all possibilities</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Create digit-to-letters mapping</strong> for phone keypad</li><li><strong>Use backtracking</strong> to build combinations: <ul><li>Start with empty combination</li><li>For each digit, try each possible letter mapping</li><li>Recurse to next digit with updated combination</li><li>Backtrack when exploring completes</li></ul></li><li><strong>When all digits processed</strong>, add combination to result</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Map each digit to its corresponding letters</li><li>Use backtracking to explore all combinations</li><li>Handle edge case when digits string is empty</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-nJo-D" id="tab-wef4hS4" checked><label data-title="Kotlin" for="tab-wef4hS4">Kotlin</label><input type="radio" name="group-nJo-D" id="tab-qTwGNJv"><label data-title="TypeScript" for="tab-qTwGNJv">TypeScript</label><input type="radio" name="group-nJo-D" id="tab-kA5jJvA"><label data-title="Java" for="tab-kA5jJvA">Java</label><input type="radio" name="group-nJo-D" id="tab-7uDSX9k"><label data-title="Python" for="tab-7uDSX9k">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    private val digitToLetters = mapOf(
        &#39;2&#39; to &quot;abc&quot;, &#39;3&#39; to &quot;def&quot;, &#39;4&#39; to &quot;ghi&quot;, &#39;5&#39; to &quot;jkl&quot;,
        &#39;6&#39; to &quot;mno&quot;, &#39;7&#39; to &quot;pqrs&quot;, &#39;8&#39; to &quot;tuv&quot;, &#39;9&#39; to &quot;wxyz&quot;
    )
    
    fun letterCombinations(digits: String): List&lt;String&gt; {
        if (digits.isEmpty()) return emptyList()
        
        val result = mutableListOf&lt;String&gt;()
        backtrack(digits, 0, StringBuilder(), result)
        return result
    }
    
    private fun backtrack(
        digits: String,
        index: Int,
        current: StringBuilder,
        result: MutableList&lt;String&gt;
    ) {
        // Base case: processed all digits
        if (index == digits.length) {
            result.add(current.toString())
            return
        }
        
        val digit = digits[index]
        val letters = digitToLetters[digit] ?: return
        
        // Try each possible letter for current digit
        for (letter in letters) {
            current.append(letter)
            backtrack(digits, index + 1, current, result)
            current.deleteCharAt(current.length - 1) // Backtrack
        }
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function letterCombinations(digits: string): string[] {
    if (digits.length === 0) return [];
    
    const digitToLetters: { [key: string]: string } = {
        &#39;2&#39;: &#39;abc&#39;, &#39;3&#39;: &#39;def&#39;, &#39;4&#39;: &#39;ghi&#39;, &#39;5&#39;: &#39;jkl&#39;,
        &#39;6&#39;: &#39;mno&#39;, &#39;7&#39;: &#39;pqrs&#39;, &#39;8&#39;: &#39;tuv&#39;, &#39;9&#39;: &#39;wxyz&#39;
    };
    
    const result: string[] = [];
    
    function backtrack(index: number, current: string): void {
        // Base case: processed all digits
        if (index === digits.length) {
            result.push(current);
            return;
        }
        
        const digit = digits[index];
        const letters = digitToLetters[digit] || &#39;&#39;;
        
        // Try each possible letter for current digit
        for (const letter of letters) {
            backtrack(index + 1, current + letter);
        }
    }
    
    backtrack(0, &#39;&#39;);
    return result;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    private static final Map&lt;Character, String&gt; digitToLetters = Map.of(
        &#39;2&#39;, &quot;abc&quot;, &#39;3&#39;, &quot;def&quot;, &#39;4&#39;, &quot;ghi&quot;, &#39;5&#39;, &quot;jkl&quot;,
        &#39;6&#39;, &quot;mno&quot;, &#39;7&#39;, &quot;pqrs&quot;, &#39;8&#39;, &quot;tuv&quot;, &#39;9&#39;, &quot;wxyz&quot;
    );
    
    public List&lt;String&gt; letterCombinations(String digits) {
        if (digits.isEmpty()) return new ArrayList&lt;&gt;();
        
        List&lt;String&gt; result = new ArrayList&lt;&gt;();
        backtrack(digits, 0, new StringBuilder(), result);
        return result;
    }
    
    private void backtrack(
        String digits,
        int index,
        StringBuilder current,
        List&lt;String&gt; result
    ) {
        // Base case: processed all digits
        if (index == digits.length()) {
            result.add(current.toString());
            return;
        }
        
        char digit = digits.charAt(index);
        String letters = digitToLetters.get(digit);
        if (letters == null) return;
        
        // Try each possible letter for current digit
        for (char letter : letters.toCharArray()) {
            current.append(letter);
            backtrack(digits, index + 1, current, result);
            current.deleteCharAt(current.length() - 1); // Backtrack
        }
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def letterCombinations(self, digits: str) -&gt; List[str]:
        if not digits:
            return []
        
        digit_to_letters = {
            &#39;2&#39;: &#39;abc&#39;, &#39;3&#39;: &#39;def&#39;, &#39;4&#39;: &#39;ghi&#39;, &#39;5&#39;: &#39;jkl&#39;,
            &#39;6&#39;: &#39;mno&#39;, &#39;7&#39;: &#39;pqrs&#39;, &#39;8&#39;: &#39;tuv&#39;, &#39;9&#39;: &#39;wxyz&#39;
        }
        
        result = []
        
        def backtrack(index: int, current: str) -&gt; None:
            # Base case: processed all digits
            if index == len(digits):
                result.append(current)
                return
            
            digit = digits[index]
            letters = digit_to_letters[digit]
            
            # Try each possible letter for current digit
            for letter in letters:
                backtrack(index + 1, current + letter)
        
        backtrack(0, &#39;&#39;)
        return result
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(4^n) where n is the length of digits. Each digit can map to up to 4 letters (digit 7 and 9), and we explore all possible combinations.</li><li><strong>Space Complexity:</strong> O(4^n) for storing all combinations, plus O(n) for recursion stack and current string building.</li></ul>`,22)]))}const b=e(o,[["render",r]]);export{g as __pageData,b as default};
