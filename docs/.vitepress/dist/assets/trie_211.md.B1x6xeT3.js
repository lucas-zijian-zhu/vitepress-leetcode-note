import{_ as n,c as r,o,ag as d}from"./chunks/framework.Bw-5EFTY.js";const p=JSON.parse('{"title":"211. Design Add and Search Words Data Structure","description":"","frontmatter":{},"headers":[],"relativePath":"trie/211.md","filePath":"trie/211.md"}'),t={name:"trie/211.md"};function a(i,e,l,c,s,h){return o(),r("div",null,e[0]||(e[0]=[d(`<h1 id="_211-design-add-and-search-words-data-structure" tabindex="-1"><a href="https://leetcode.com/problems/design-add-and-search-words-data-structure/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">211. Design Add and Search Words Data Structure</a> <a class="header-anchor" href="#_211-design-add-and-search-words-data-structure" aria-label="Permalink to &quot;[211. Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Design a data structure that supports adding new words and finding if a string matches any previously added string.</p><p>Implement the <code>WordDictionary</code> class:</p><ul><li><code>WordDictionary()</code> Initializes the object.</li><li><code>void addWord(word)</code> Adds <code>word</code> to the data structure, it can be matched later.</li><li><code>bool search(word)</code> Returns <code>true</code> if there is any string in the data structure that matches <code>word</code> or <code>false</code> otherwise. <code>word</code> may contain dots <code>&#39;.&#39;</code> where dots can be matched with any letter.</li></ul><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input
[&quot;WordDictionary&quot;,&quot;addWord&quot;,&quot;addWord&quot;,&quot;addWord&quot;,&quot;search&quot;,&quot;search&quot;,&quot;search&quot;,&quot;search&quot;]
[[],[&quot;bad&quot;],[&quot;dad&quot;],[&quot;mad&quot;],[&quot;pad&quot;],[&quot;bad&quot;],[&quot;.ad&quot;],[&quot;b..&quot;]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord(&quot;bad&quot;);
wordDictionary.addWord(&quot;dad&quot;);
wordDictionary.addWord(&quot;mad&quot;);
wordDictionary.search(&quot;pad&quot;); // return False
wordDictionary.search(&quot;bad&quot;); // return True
wordDictionary.search(&quot;.ad&quot;); // return True
wordDictionary.search(&quot;b..&quot;); // return True
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= word.length &lt;= 25</code></li><li><code>word</code> in <code>addWord</code> consists of lowercase English letters.</li><li><code>word</code> in <code>search</code> consist of <code>&#39;.&#39;</code> or lowercase English letters.</li><li>There will be at most <code>2 * 10^4</code> calls to <code>addWord</code> and <code>search</code>.</li></ul><h2 id="💡-approach-trie-with-dfs-for-wildcard-search" tabindex="-1">💡 Approach: Trie with DFS for Wildcard Search <a class="header-anchor" href="#💡-approach-trie-with-dfs-for-wildcard-search" aria-label="Permalink to &quot;💡 Approach: Trie with DFS for Wildcard Search&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a variation of the Trie problem where we need to handle <strong>wildcard characters</strong> (<code>.</code>). The key challenge is that when we encounter a <code>.</code>, we need to search <strong>all possible children</strong> at that level.</p><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Use Trie structure</strong> similar to problem 208</li><li><strong>Add operation</strong>: Same as regular trie insert</li><li><strong>Search operation</strong>: <ul><li>For regular characters: traverse normally</li><li>For <code>.</code> (wildcard): use <strong>DFS</strong> to check all possible children</li><li>Use recursive helper function for wildcard handling</li></ul></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>When encountering <code>.</code>, we need to search all 26 possible children</li><li>Use DFS/recursion to handle the wildcard search</li><li>Ensure we handle the end-of-word check correctly for wildcards</li><li>The recursive search should return early when a match is found</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-dwBjq" id="tab-02Km1ld" checked><label data-title="Kotlin" for="tab-02Km1ld">Kotlin</label><input type="radio" name="group-dwBjq" id="tab-2_2AEg8"><label data-title="TypeScript" for="tab-2_2AEg8">TypeScript</label><input type="radio" name="group-dwBjq" id="tab-XeXRz1N"><label data-title="Java" for="tab-XeXRz1N">Java</label><input type="radio" name="group-dwBjq" id="tab-SmrnYcT"><label data-title="Python" for="tab-SmrnYcT">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TrieNode {
    val children = Array&lt;TrieNode?&gt;(26) { null }
    var isEndOfWord = false
}

class WordDictionary {
    private val root = TrieNode()

    fun addWord(word: String) {
        var current = root
        for (char in word) {
            val index = char - &#39;a&#39;
            if (current.children[index] == null) {
                current.children[index] = TrieNode()
            }
            current = current.children[index]!!
        }
        current.isEndOfWord = true
    }

    fun search(word: String): Boolean {
        return searchHelper(word, 0, root)
    }

    private fun searchHelper(word: String, index: Int, node: TrieNode): Boolean {
        if (index == word.length) {
            return node.isEndOfWord
        }

        val char = word[index]
        
        if (char == &#39;.&#39;) {
            // Check all possible children for wildcard
            for (child in node.children) {
                if (child != null &amp;&amp; searchHelper(word, index + 1, child)) {
                    return true
                }
            }
        } else {
            val childIndex = char - &#39;a&#39;
            val child = node.children[childIndex]
            if (child != null) {
                return searchHelper(word, index + 1, child)
            }
        }
        
        return false
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class TrieNode {
    children: (TrieNode | null)[] = new Array(26).fill(null);
    isEndOfWord: boolean = false;
}

class WordDictionary {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string): void {
        let current = this.root;
        for (const char of word) {
            const index = char.charCodeAt(0) - &#39;a&#39;.charCodeAt(0);
            if (current.children[index] === null) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index]!;
        }
        current.isEndOfWord = true;
    }

    search(word: string): boolean {
        return this.searchHelper(word, 0, this.root);
    }

    private searchHelper(word: string, index: number, node: TrieNode): boolean {
        if (index === word.length) {
            return node.isEndOfWord;
        }

        const char = word[index];
        
        if (char === &#39;.&#39;) {
            // Check all possible children for wildcard
            for (const child of node.children) {
                if (child !== null &amp;&amp; this.searchHelper(word, index + 1, child)) {
                    return true;
                }
            }
        } else {
            const childIndex = char.charCodeAt(0) - &#39;a&#39;.charCodeAt(0);
            const child = node.children[childIndex];
            if (child !== null) {
                return this.searchHelper(word, index + 1, child);
            }
        }
        
        return false;
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class TrieNode {
    TrieNode[] children;
    boolean isEndOfWord;
    
    public TrieNode() {
        children = new TrieNode[26];
        isEndOfWord = false;
    }
}

class WordDictionary {
    private TrieNode root;
    
    public WordDictionary() {
        root = new TrieNode();
    }
    
    public void addWord(String word) {
        TrieNode current = root;
        for (char c : word.toCharArray()) {
            int index = c - &#39;a&#39;;
            if (current.children[index] == null) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        current.isEndOfWord = true;
    }
    
    public boolean search(String word) {
        return searchHelper(word, 0, root);
    }
    
    private boolean searchHelper(String word, int index, TrieNode node) {
        if (index == word.length()) {
            return node.isEndOfWord;
        }
        
        char c = word.charAt(index);
        
        if (c == &#39;.&#39;) {
            // Check all possible children for wildcard
            for (TrieNode child : node.children) {
                if (child != null &amp;&amp; searchHelper(word, index + 1, child)) {
                    return true;
                }
            }
        } else {
            int childIndex = c - &#39;a&#39;;
            if (node.children[childIndex] != null) {
                return searchHelper(word, index + 1, node.children[childIndex]);
            }
        }
        
        return false;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TrieNode:
    def __init__(self):
        self.children = [None] * 26
        self.is_end_of_word = False

class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -&gt; None:
        current = self.root
        for char in word:
            index = ord(char) - ord(&#39;a&#39;)
            if current.children[index] is None:
                current.children[index] = TrieNode()
            current = current.children[index]
        current.is_end_of_word = True

    def search(self, word: str) -&gt; bool:
        return self._search_helper(word, 0, self.root)

    def _search_helper(self, word: str, index: int, node: TrieNode) -&gt; bool:
        if index == len(word):
            return node.is_end_of_word

        char = word[index]
        
        if char == &#39;.&#39;:
            # Check all possible children for wildcard
            for child in node.children:
                if child is not None and self._search_helper(word, index + 1, child):
                    return True
        else:
            child_index = ord(char) - ord(&#39;a&#39;)
            child = node.children[child_index]
            if child is not None:
                return self._search_helper(word, index + 1, child)
        
        return False
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong><ul><li><code>addWord</code>: O(M) where M is the length of the word</li><li><code>search</code>: O(N × 26^K) where N is the number of words in the dictionary and K is the number of dots in the search word. In the worst case, we might need to check all combinations.</li></ul></li><li><strong>Space Complexity:</strong> O(ALPHABET_SIZE * M * N) where M is the average length of words and N is the number of words stored in the dictionary.</li></ul>`,19)]))}const f=n(t,[["render",a]]);export{p as __pageData,f as default};
