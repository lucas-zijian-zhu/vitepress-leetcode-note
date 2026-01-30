import{_ as n,c as t,o,ag as r}from"./chunks/framework.Bw-5EFTY.js";const g=JSON.parse('{"title":"127. Word Ladder","description":"","frontmatter":{},"headers":[],"relativePath":"graph-general/127.md","filePath":"graph-general/127.md"}'),i={name:"graph-general/127.md"};function a(d,e,s,l,c,u){return o(),t("div",null,e[0]||(e[0]=[r(`<h1 id="_127-word-ladder" tabindex="-1"><a href="https://leetcode.com/problems/word-ladder/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">127. Word Ladder</a> <a class="header-anchor" href="#_127-word-ladder" aria-label="Permalink to &quot;[127. Word Ladder](https://leetcode.com/problems/word-ladder/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>A <strong>transformation sequence</strong> from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence of words <code>beginWord -&gt; s<sub>1</sub> -&gt; s<sub>2</sub> -&gt; ... -&gt; s<sub>k</sub></code> such that:</p><ul><li>Every adjacent pair of words differs by a single letter.</li><li>Every <code>s<sub>i</sub></code> for <code>1 &lt;= i &lt;= k</code> is in <code>wordList</code>. Note that <code>beginWord</code> does not need to be in <code>wordList</code>.</li><li><code>s<sub>k</sub> == endWord</code></li></ul><p>Given two words, <code>beginWord</code> and <code>endWord</code>, and a dictionary <code>wordList</code>, return the <strong>number of words</strong> in the <strong>shortest transformation sequence</strong> from <code>beginWord</code> to <code>endWord</code>, or <code>0</code> if no such sequence exists.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;,&quot;cog&quot;]
Output: 5
Explanation: One shortest transformation sequence is &quot;hit&quot; -&gt; &quot;hot&quot; -&gt; &quot;dot&quot; -&gt; &quot;dog&quot; -&gt; cog&quot;, which is 5 words long.
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: beginWord = &quot;hit&quot;, endWord = &quot;cog&quot;, wordList = [&quot;hot&quot;,&quot;dot&quot;,&quot;dog&quot;,&quot;lot&quot;,&quot;log&quot;]
Output: 0
Explanation: The endWord &quot;cog&quot; is not in wordList, therefore there is no valid transformation sequence.
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= beginWord.length &lt;= 10</code></li><li><code>endWord.length == beginWord.length</code></li><li><code>1 &lt;= wordList.length &lt;= 5000</code></li><li><code>wordList[i].length == beginWord.length</code></li><li><code>beginWord</code>, <code>endWord</code>, and <code>wordList[i]</code> consist of lowercase English letters.</li><li><code>beginWord != endWord</code></li><li>All the words in <code>wordList</code> are <strong>unique</strong> .</li></ul><h2 id="💡-approach-bfs-breadth-first-search" tabindex="-1">💡 Approach: BFS (Breadth-First Search) <a class="header-anchor" href="#💡-approach-bfs-breadth-first-search" aria-label="Permalink to &quot;💡 Approach: BFS (Breadth-First Search)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>shortest path</strong> problem in an implicit graph. We can model this as:</p><ul><li>Each word is a node</li><li>An edge exists between two words if they differ by exactly one character</li><li>We want to find the shortest transformation sequence from <code>beginWord</code> to <code>endWord</code></li></ul><p>Since we need the <strong>minimum number of words</strong> (shortest path), <strong>BFS</strong> is the optimal choice because:</p><ul><li>BFS explores nodes level by level, ensuring the first time we reach <code>endWord</code>, we&#39;ve found the shortest path</li><li>We avoid unnecessary longer paths by marking visited words</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Check edge cases</strong>: If <code>beginWord == endWord</code>, return 0. If <code>endWord</code> not in wordList, return 0</li><li><strong>Build the word set</strong> for O(1) lookup</li><li><strong>Use BFS</strong> with a queue to explore all possible transformations</li><li><strong>For each current word</strong>, try changing each position to each possible character (a-z)</li><li><strong>If the new word</strong> is valid (in wordList) and not visited, add it to queue</li><li><strong>When we reach endWord</strong>, return the number of words in the sequence</li><li><strong>If queue is empty</strong> without finding endWord, return 0</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use BFS for shortest path guarantee</li><li>Only consider words in the wordList (valid words)</li><li>Avoid revisiting the same word (cycle detection)</li><li>Generate all possible 1-character changes efficiently</li><li>Return the <strong>length</strong> of the transformation sequence, not the number of steps</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-telzG" id="tab-QLcN43J" checked><label data-title="Kotlin" for="tab-QLcN43J">Kotlin</label><input type="radio" name="group-telzG" id="tab-0gYMCmY"><label data-title="TypeScript" for="tab-0gYMCmY">TypeScript</label><input type="radio" name="group-telzG" id="tab-6FwucRl"><label data-title="Java" for="tab-6FwucRl">Java</label><input type="radio" name="group-telzG" id="tab-wX0iBLG"><label data-title="Python" for="tab-wX0iBLG">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun ladderLength(beginWord: String, endWord: String, wordList: List&lt;String&gt;): Int {
        if (endWord !in wordList) return 0
        if (beginWord == endWord) return 1
        
        val wordSet = wordList.toSet()
        val queue = ArrayDeque&lt;String&gt;()
        val visited = mutableSetOf&lt;String&gt;()
        
        queue.offer(beginWord)
        visited.add(beginWord)
        var length = 1
        
        while (queue.isNotEmpty()) {
            val size = queue.size
            
            for (i in 0 until size) {
                val current = queue.poll()
                
                if (current == endWord) {
                    return length
                }
                
                // Try all possible single character changes
                val chars = current.toCharArray()
                for (j in chars.indices) {
                    val originalChar = chars[j]
                    
                    for (c in &#39;a&#39;..&#39;z&#39;) {
                        if (c != originalChar) {
                            chars[j] = c
                            val newWord = String(chars)
                            
                            if (newWord in wordSet &amp;&amp; newWord !in visited) {
                                visited.add(newWord)
                                queue.offer(newWord)
                            }
                        }
                    }
                    
                    chars[j] = originalChar // Reset for next iteration
                }
            }
            
            length++
        }
        
        return 0
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    if (!wordList.includes(endWord)) return 0;
    if (beginWord === endWord) return 1;
    
    const wordSet = new Set(wordList);
    const queue: string[] = [beginWord];
    const visited = new Set&lt;string&gt;([beginWord]);
    let length = 1;
    
    while (queue.length &gt; 0) {
        const size = queue.length;
        
        for (let i = 0; i &lt; size; i++) {
            const current = queue.shift()!;
            
            if (current === endWord) {
                return length;
            }
            
            // Try all possible single character changes
            const chars = current.split(&#39;&#39;);
            for (let j = 0; j &lt; chars.length; j++) {
                const originalChar = chars[j];
                
                for (let c = 97; c &lt;= 122; c++) {
                    const char = String.fromCharCode(c);
                    if (char !== originalChar) {
                        chars[j] = char;
                        const newWord = chars.join(&#39;&#39;);
                        
                        if (wordSet.has(newWord) &amp;&amp; !visited.has(newWord)) {
                            visited.add(newWord);
                            queue.push(newWord);
                        }
                    }
                }
                
                chars[j] = originalChar; // Reset
            }
        }
        
        length++;
    }
    
    return 0;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int ladderLength(String beginWord, String endWord, List&lt;String&gt; wordList) {
        if (!wordList.contains(endWord)) return 0;
        if (beginWord.equals(endWord)) return 1;
        
        Set&lt;String&gt; wordSet = new HashSet&lt;&gt;(wordList);
        Queue&lt;String&gt; queue = new LinkedList&lt;&gt;();
        Set&lt;String&gt; visited = new HashSet&lt;&gt;();
        
        queue.offer(beginWord);
        visited.add(beginWord);
        int length = 1;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            
            for (int i = 0; i &lt; size; i++) {
                String current = queue.poll();
                
                if (current.equals(endWord)) {
                    return length;
                }
                
                // Try all possible single character changes
                char[] chars = current.toCharArray();
                for (int j = 0; j &lt; chars.length; j++) {
                    char originalChar = chars[j];
                    
                    for (char c = &#39;a&#39;; c &lt;= &#39;z&#39;; c++) {
                        if (c != originalChar) {
                            chars[j] = c;
                            String newWord = new String(chars);
                            
                            if (wordSet.contains(newWord) &amp;&amp; !visited.contains(newWord)) {
                                visited.add(newWord);
                                queue.offer(newWord);
                            }
                        }
                    }
                    
                    chars[j] = originalChar; // Reset
                }
            }
            
            length++;
        }
        
        return 0;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -&gt; int:
        if endWord not in wordList:
            return 0
        if beginWord == endWord:
            return 1
        
        word_set = set(wordList)
        queue = deque([beginWord])
        visited = {beginWord}
        length = 1
        
        while queue:
            size = len(queue)
            
            for _ in range(size):
                current = queue.popleft()
                
                if current == endWord:
                    return length
                
                # Try all possible single character changes
                chars = list(current)
                for i in range(len(chars)):
                    original_char = chars[i]
                    
                    for c in &#39;abcdefghijklmnopqrstuvwxyz&#39;:
                        if c != original_char:
                            chars[i] = c
                            new_word = &#39;&#39;.join(chars)
                            
                            if new_word in word_set and new_word not in visited:
                                visited.add(new_word)
                                queue.append(new_word)
                    
                    chars[i] = original_char  # Reset
        
            length += 1
        
        return 0
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(M² × N), where M is the length of each word and N is the number of words in the wordList. For each word, we try all M positions and for each position, we try all 26 characters, and each string operation takes O(M) time.</li><li><strong>Space Complexity:</strong> O(M × N) for the word set, queue, and visited set.</li></ul>`,24)]))}const p=n(i,[["render",a]]);export{g as __pageData,p as default};
