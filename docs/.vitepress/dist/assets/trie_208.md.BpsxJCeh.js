import{_ as r,c as n,o as t,ag as i}from"./chunks/framework.Bw-5EFTY.js";const p=JSON.parse('{"title":"208. Implement Trie (Prefix Tree)","description":"","frontmatter":{},"headers":[],"relativePath":"trie/208.md","filePath":"trie/208.md"}'),o={name:"trie/208.md"};function a(l,e,s,d,c,u){return t(),n("div",null,e[0]||(e[0]=[i(`<h1 id="_208-implement-trie-prefix-tree" tabindex="-1"><a href="https://leetcode.com/problems/implement-trie-prefix-tree/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">208. Implement Trie (Prefix Tree)</a> <a class="header-anchor" href="#_208-implement-trie-prefix-tree" aria-label="Permalink to &quot;[208. Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>A <strong>trie</strong> (pronounced as &quot;try&quot;) or <strong>prefix tree</strong> is a tree data structure used to efficiently store and search strings in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.</p><p>Implement the Trie class:</p><ul><li><code>Trie()</code> Initializes the trie object.</li><li><code>void insert(String word)</code> Inserts the string word into the trie.</li><li><code>boolean search(String word)</code> Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.</li><li><code>boolean startsWith(String prefix)</code> Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.</li></ul><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input
[&quot;Trie&quot;, &quot;insert&quot;, &quot;search&quot;, &quot;search&quot;, &quot;startsWith&quot;, &quot;insert&quot;, &quot;search&quot;]
[[], [&quot;apple&quot;], [&quot;apple&quot;], [&quot;app&quot;], [&quot;app&quot;], [&quot;app&quot;], [&quot;app&quot;]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert(&quot;apple&quot;);
trie.search(&quot;apple&quot;);   // return True
trie.search(&quot;app&quot;);     // return False
trie.startsWith(&quot;app&quot;); // return True
trie.insert(&quot;app&quot;);
trie.search(&quot;app&quot;);     // return True
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>1 &lt;= word.length, prefix.length &lt;= 2000</code></li><li><code>word</code> and <code>prefix</code> consist only of lowercase English letters.</li><li>At most <code>3 * 10^4</code> calls in total will be made to <code>insert</code>, <code>search</code>, and <code>startsWith</code>.</li></ul><h2 id="💡-approach-trie-data-structure" tabindex="-1">💡 Approach: Trie Data Structure <a class="header-anchor" href="#💡-approach-trie-data-structure" aria-label="Permalink to &quot;💡 Approach: Trie Data Structure&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>A <strong>Trie</strong> (Prefix Tree) is a tree-like data structure that stores strings. Each node represents a character, and the path from the root to a node represents a string. This makes it very efficient for:</p><ul><li><strong>Prefix searching</strong> (startsWith)</li><li><strong>Word searching</strong> (search)</li><li><strong>Word insertion</strong> (insert)</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><p><strong>Create a TrieNode class</strong> with:</p><ul><li><code>children</code>: Array/map to store child nodes (one for each letter a-z)</li><li><code>isEndOfWord</code>: Boolean flag to mark if this node represents the end of a word</li></ul></li><li><p><strong>Insert operation</strong>:</p><ul><li>Traverse the trie character by character</li><li>Create new nodes if they don&#39;t exist</li><li>Mark the last node as end of word</li></ul></li><li><p><strong>Search operation</strong>:</p><ul><li>Traverse the trie character by character</li><li>Return false if any character&#39;s node doesn&#39;t exist</li><li>Return true only if we reach the end and the node is marked as end of word</li></ul></li><li><p><strong>StartsWith operation</strong>:</p><ul><li>Similar to search but only check if we can traverse to the end</li><li>Don&#39;t need to check isEndOfWord flag</li></ul></li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use array of size 26 for children (for lowercase English letters)</li><li>Always check bounds and null nodes</li><li>Distinguish between complete words and prefixes</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-kAUks" id="tab-_B_hWpY" checked><label data-title="Kotlin" for="tab-_B_hWpY">Kotlin</label><input type="radio" name="group-kAUks" id="tab-llIV7Jt"><label data-title="TypeScript" for="tab-llIV7Jt">TypeScript</label><input type="radio" name="group-kAUks" id="tab-rETQ7xJ"><label data-title="Java" for="tab-rETQ7xJ">Java</label><input type="radio" name="group-kAUks" id="tab-RS9JFeX"><label data-title="Python" for="tab-RS9JFeX">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class TrieNode {
    val children = Array&lt;TrieNode?&gt;(26) { null }
    var isEndOfWord = false
}

class Trie {
    private val root = TrieNode()

    fun insert(word: String) {
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
        var current = root
        for (char in word) {
            val index = char - &#39;a&#39;
            if (current.children[index] == null) {
                return false
            }
            current = current.children[index]!!
        }
        return current.isEndOfWord
    }

    fun startsWith(prefix: String): Boolean {
        var current = root
        for (char in prefix) {
            val index = char - &#39;a&#39;
            if (current.children[index] == null) {
                return false
            }
            current = current.children[index]!!
        }
        return true
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class TrieNode {
    children: (TrieNode | null)[] = new Array(26).fill(null);
    isEndOfWord: boolean = false;
}

class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
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
        let current = this.root;
        for (const char of word) {
            const index = char.charCodeAt(0) - &#39;a&#39;.charCodeAt(0);
            if (current.children[index] === null) {
                return false;
            }
            current = current.children[index]!;
        }
        return current.isEndOfWord;
    }

    startsWith(prefix: string): boolean {
        let current = this.root;
        for (const char of prefix) {
            const index = char.charCodeAt(0) - &#39;a&#39;.charCodeAt(0);
            if (current.children[index] === null) {
                return false;
            }
            current = current.children[index]!;
        }
        return true;
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

class Trie {
    private TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
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
        TrieNode current = root;
        for (char c : word.toCharArray()) {
            int index = c - &#39;a&#39;;
            if (current.children[index] == null) {
                return false;
            }
            current = current.children[index];
        }
        return current.isEndOfWord;
    }
    
    public boolean startsWith(String prefix) {
        TrieNode current = root;
        for (char c : prefix.toCharArray()) {
            int index = c - &#39;a&#39;;
            if (current.children[index] == null) {
                return false;
            }
            current = current.children[index];
        }
        return true;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class TrieNode:
    def __init__(self):
        self.children = [None] * 26
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -&gt; None:
        current = self.root
        for char in word:
            index = ord(char) - ord(&#39;a&#39;)
            if current.children[index] is None:
                current.children[index] = TrieNode()
            current = current.children[index]
        current.is_end_of_word = True

    def search(self, word: str) -&gt; bool:
        current = self.root
        for char in word:
            index = ord(char) - ord(&#39;a&#39;)
            if current.children[index] is None:
                return False
            current = current.children[index]
        return current.is_end_of_word

    def startsWith(self, prefix: str) -&gt; bool:
        current = self.root
        for char in prefix:
            index = ord(char) - ord(&#39;a&#39;)
            if current.children[index] is None:
                return False
            current = current.children[index]
        return True
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong><ul><li><code>insert</code>: O(M) where M is the length of the word</li><li><code>search</code>: O(M) where M is the length of the word</li><li><code>startsWith</code>: O(M) where M is the length of the prefix</li></ul></li><li><strong>Space Complexity:</strong> O(ALPHABET_SIZE * M * N) where M is the average length of words and N is the number of words. In the worst case, there&#39;s no sharing of nodes between words.</li></ul>`,20)]))}const f=r(o,[["render",a]]);export{p as __pageData,f as default};
