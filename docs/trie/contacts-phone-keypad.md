# T9 Contacts / Phone Keypad Search (Custom — Trie + DFS)

<Badge type="warning" text="Medium" />

Given a list of contacts (lowercase strings) and a phone keypad mapping (2–9 → letters), implement:

1. **Prefix search**: Return all contacts that start with a given prefix.
2. **Digit search**: Given a sequence of digits (e.g. `"58"`), return all contacts that can be formed by the corresponding letters on the keypad (`5` = jkl, `8` = tuv → e.g. `"lu"`, `"lv"` → `luc`, `lucas`).

**Keypad mapping:**

| Digit | Letters |
|-------|---------|
| 2 | abc |
| 3 | def |
| 4 | ghi |
| 5 | jkl |
| 6 | mno |
| 7 | pqrs |
| 8 | tuv |
| 9 | wxyz |

**Example:**

```
Contacts: ['lucas', 'luc', 'zijian']
Prefix "lu" → ['luc', 'lucas']
Digits "58" → ['luc', 'lucas']  (5→l, 8→u → "lu" prefix)
```

## 💡 Approach: Trie + DFS

### Intuition

1. **Trie**: Store contacts for efficient prefix lookup.
2. **Prefix search**: Walk to the prefix node, then DFS to collect all words under that subtree.
3. **Digit search**: For each digit, try each possible letter; DFS into the Trie only when the child exists. When digits are exhausted, collect all words from the current node downward.

### Algorithm

1. **Build Trie** from contacts (26 children per node, `a`–`z`).
2. **getContactsWithPrefix**: Traverse to prefix; if path exists, DFS from that node, appending characters to `path`, and push when `isEnd` is true.
3. **searchContactsByDigits**: DFS with `(pos, node, path)`. When `pos === digits.length`, call `collectAllWords(node, path, result)`. Otherwise, for each letter of `keypad[digits[pos]]`, if `node.children[idx]` exists, recurse.

### Key Points

- Use `children[26]` indexed by `char - 'a'`.
- Digit search branches on multiple letters per digit; prune when Trie has no child.
- `collectAllWords` gathers all words in the subtree (for "58" we need luc, lucas, etc.).

## Code

::: code-group

```typescript [TypeScript]
class TrieNode {
    children: (TrieNode | null)[]
    isEnd: boolean

    constructor() {
        this.children = new Array(26).fill(null)
        this.isEnd = false
    }
}

class Trie {
    root: TrieNode
    constructor(root: TrieNode) {
        this.root = root
    }
}

const keypad: Record<string, string> = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
}

function generateTrie(contacts: string[], root: TrieNode): void {
    for (const contact of contacts) {
        let cur = root
        for (let i = 0; i < contact.length; i++) {
            const index = contact[i].charCodeAt(0) - 'a'.charCodeAt(0)
            if (!cur.children[index]) {
                cur.children[index] = new TrieNode()
            }
            cur = cur.children[index]!
        }
        cur.isEnd = true
    }
}

function getContactsWithPrefix(trie: Trie, prefix: string): string[] {
    let cur: TrieNode = trie.root
    for (const s of prefix) {
        const index = s.charCodeAt(0) - 'a'.charCodeAt(0)
        if (!cur.children[index]) return []
        cur = cur.children[index]!
    }
    const results: string[] = []
    const dfs = (node: TrieNode, path: string) => {
        if (node.isEnd) results.push(path)
        for (let i = 0; i < 26; i++) {
            if (node.children[i]) {
                dfs(node.children[i]!, path + String.fromCharCode(97 + i))
            }
        }
    }
    dfs(cur, prefix)
    return results
}

function collectAllWords(node: TrieNode, path: string, result: string[]): void {
    if (node.isEnd) result.push(path)
    for (let i = 0; i < 26; i++) {
        if (node.children[i]) {
            collectAllWords(
                node.children[i]!,
                path + String.fromCharCode(97 + i),
                result
            )
        }
    }
}

function searchContactsByDigits(digits: string, trie: Trie): string[] {
    const result: string[] = []
    const dfs = (pos: number, node: TrieNode, path: string) => {
        if (pos === digits.length) {
            collectAllWords(node, path, result)
            return
        }
        const letters = keypad[digits[pos]]
        if (!letters) return
        for (const ch of letters) {
            const idx = ch.charCodeAt(0) - 97
            const child = node.children[idx]
            if (child) {
                dfs(pos + 1, child, path + ch)
            }
        }
    }
    dfs(0, trie.root, '')
    return result
}

// Usage
// const contacts = ['lucas', 'luc', 'zijian']
// const trie = new Trie(new TrieNode())
// generateTrie(contacts, trie.root)
// getContactsWithPrefix(trie, 'lu')        // ['luc', 'lucas']
// searchContactsByDigits('58', trie)       // ['luc', 'lucas']
```

```kotlin [Kotlin]
class TrieNode {
    val children = arrayOfNulls<TrieNode>(26)
    var isEnd = false
}

class Trie(val root: TrieNode)

val keypad = mapOf(
    '2' to "abc", '3' to "def", '4' to "ghi", '5' to "jkl",
    '6' to "mno", '7' to "pqrs", '8' to "tuv", '9' to "wxyz"
)

fun generateTrie(contacts: List<String>, root: TrieNode) {
    for (contact in contacts) {
        var cur = root
        for (c in contact) {
            val idx = c - 'a'
            if (cur.children[idx] == null) {
                cur.children[idx] = TrieNode()
            }
            cur = cur.children[idx]!!
        }
        cur.isEnd = true
    }
}

fun getContactsWithPrefix(trie: Trie, prefix: String): List<String> {
    var cur = trie.root
    for (c in prefix) {
        val idx = c - 'a'
        if (cur.children[idx] == null) return emptyList()
        cur = cur.children[idx]!!
    }
    val results = mutableListOf<String>()
    fun dfs(node: TrieNode, path: String) {
        if (node.isEnd) results.add(path)
        for (i in 0 until 26) {
            node.children[i]?.let { dfs(it, path + ('a' + i)) }
        }
    }
    dfs(cur, prefix)
    return results
}

fun collectAllWords(node: TrieNode, path: String, result: MutableList<String>) {
    if (node.isEnd) result.add(path)
    for (i in 0 until 26) {
        node.children[i]?.let {
            collectAllWords(it, path + ('a' + i), result)
        }
    }
}

fun searchContactsByDigits(digits: String, trie: Trie): List<String> {
    val result = mutableListOf<String>()
    fun dfs(pos: Int, node: TrieNode, path: String) {
        if (pos == digits.length) {
            collectAllWords(node, path, result)
            return
        }
        val letters = keypad[digits[pos]] ?: return
        for (ch in letters) {
            val idx = ch - 'a'
            val child = node.children[idx]
            if (child != null) {
                dfs(pos + 1, child, path + ch)
            }
        }
    }
    dfs(0, trie.root, "")
    return result
}
```

```java [Java]
class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class Trie {
    TrieNode root;
    Trie(TrieNode root) { this.root = root; }
}

class Solution {
    private static final String[] KEYPAD = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    void generateTrie(String[] contacts, TrieNode root) {
        for (String contact : contacts) {
            TrieNode cur = root;
            for (char c : contact.toCharArray()) {
                int idx = c - 'a';
                if (cur.children[idx] == null) {
                    cur.children[idx] = new TrieNode();
                }
                cur = cur.children[idx];
            }
            cur.isEnd = true;
        }
    }

    List<String> getContactsWithPrefix(Trie trie, String prefix) {
        TrieNode cur = trie.root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (cur.children[idx] == null) return List.of();
            cur = cur.children[idx];
        }
        List<String> results = new ArrayList<>();
        dfsCollect(cur, prefix, results);
        return results;
    }

    private void dfsCollect(TrieNode node, String path, List<String> results) {
        if (node.isEnd) results.add(path);
        for (int i = 0; i < 26; i++) {
            if (node.children[i] != null) {
                dfsCollect(node.children[i], path + (char) ('a' + i), results);
            }
        }
    }

    private void collectAllWords(TrieNode node, String path, List<String> result) {
        if (node.isEnd) result.add(path);
        for (int i = 0; i < 26; i++) {
            if (node.children[i] != null) {
                collectAllWords(node.children[i], path + (char) ('a' + i), result);
            }
        }
    }

    List<String> searchContactsByDigits(String digits, Trie trie) {
        List<String> result = new ArrayList<>();
        dfsDigits(0, trie.root, "", digits, result);
        return result;
    }

    private void dfsDigits(int pos, TrieNode node, String path, String digits, List<String> result) {
        if (pos == digits.length) {
            collectAllWords(node, path, result);
            return;
        }
        String letters = KEYPAD[digits.charAt(pos) - '0'];
        if (letters == null || letters.isEmpty()) return;
        for (char ch : letters.toCharArray()) {
            int idx = ch - 'a';
            if (node.children[idx] != null) {
                dfsDigits(pos + 1, node.children[idx], path + ch, digits, result);
            }
        }
    }
}
```

```swift [Swift]
class TrieNode {
    var children: [TrieNode?] = Array(repeating: nil, count: 26)
    var isEnd = false
}

class Trie {
    let root: TrieNode
    init(_ root: TrieNode) { self.root = root }
}

let keypad: [Character: String] = [
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
]

func generateTrie(_ contacts: [String], _ root: TrieNode) {
    for contact in contacts {
        var cur = root
        for c in contact {
            let idx = Int(c.asciiValue! - Character("a").asciiValue!)
            if cur.children[idx] == nil {
                cur.children[idx] = TrieNode()
            }
            cur = cur.children[idx]!
        }
        cur.isEnd = true
    }
}

func getContactsWithPrefix(_ trie: Trie, _ prefix: String) -> [String] {
    var cur = trie.root
    for c in prefix {
        let idx = Int(c.asciiValue! - Character("a").asciiValue!)
        guard let node = cur.children[idx] else { return [] }
        cur = node
    }
    var results: [String] = []
    func dfs(_ node: TrieNode, _ path: String) {
        if node.isEnd { results.append(path) }
        for i in 0..<26 {
            if let child = node.children[i] {
                dfs(child, path + String(UnicodeScalar(UInt32(97 + i))!))
            }
        }
    }
    dfs(cur, prefix)
    return results
}

func collectAllWords(_ node: TrieNode, _ path: String, _ result: inout [String]) {
    if node.isEnd { result.append(path) }
    for i in 0..<26 {
        if let child = node.children[i] {
            collectAllWords(child, path + String(UnicodeScalar(UInt32(97 + i))!), &result)
        }
    }
}

func searchContactsByDigits(_ digits: String, _ trie: Trie) -> [String] {
    var result: [String] = []
    func dfs(pos: Int, node: TrieNode, path: String) {
        if pos == digits.count {
            collectAllWords(node, path, &result)
            return
        }
        let d = digits[digits.index(digits.startIndex, offsetBy: pos)]
        guard let letters = keypad[d] else { return }
        for ch in letters {
            let idx = Int(ch.asciiValue! - Character("a").asciiValue!)
            if let child = node.children[idx] {
                dfs(pos: pos + 1, node: child, path: path + String(ch))
            }
        }
    }
    dfs(pos: 0, node: trie.root, path: "")
    return result
}
```

```python [Python]
class TrieNode:
    def __init__(self):
        self.children = [None] * 26
        self.is_end = False

class Trie:
    def __init__(self, root: TrieNode):
        self.root = root

KEYPAD = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
}

def generate_trie(contacts: list[str], root: TrieNode) -> None:
    for contact in contacts:
        cur = root
        for c in contact:
            idx = ord(c) - ord('a')
            if cur.children[idx] is None:
                cur.children[idx] = TrieNode()
            cur = cur.children[idx]
        cur.is_end = True

def get_contacts_with_prefix(trie: Trie, prefix: str) -> list[str]:
    cur = trie.root
    for c in prefix:
        idx = ord(c) - ord('a')
        if cur.children[idx] is None:
            return []
        cur = cur.children[idx]

    results: list[str] = []

    def dfs(node: TrieNode, path: str) -> None:
        if node.is_end:
            results.append(path)
        for i in range(26):
            if node.children[i]:
                dfs(node.children[i], path + chr(97 + i))

    dfs(cur, prefix)
    return results

def collect_all_words(node: TrieNode, path: str, result: list[str]) -> None:
    if node.is_end:
        result.append(path)
    for i in range(26):
        if node.children[i]:
            collect_all_words(node.children[i], path + chr(97 + i), result)

def search_contacts_by_digits(digits: str, trie: Trie) -> list[str]:
    result: list[str] = []

    def dfs(pos: int, node: TrieNode, path: str) -> None:
        if pos == len(digits):
            collect_all_words(node, path, result)
            return
        letters = KEYPAD.get(digits[pos], "")
        for ch in letters:
            idx = ord(ch) - ord('a')
            if node.children[idx]:
                dfs(pos + 1, node.children[idx], path + ch)

    dfs(0, trie.root, "")
    return result
```

::::

## HashMap (Map) Trie Variant (Multi-language)

:::: code-group

```typescript [TypeScript]
class TrieNodeMap {
    children: Map<string, TrieNodeMap>
    isEnd: boolean

    constructor() {
        this.children = new Map()
        this.isEnd = false
    }
}

class TrieMap {
    root: TrieNodeMap
    constructor() {
        this.root = new TrieNodeMap()
    }
}

const keypadMap: Record<string, string> = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
}

function generateTrieMap(contacts: string[], trie: TrieMap): void {
    for (const contact of contacts) {
        let cur = trie.root
        for (const ch of contact) {
            if (!cur.children.has(ch)) cur.children.set(ch, new TrieNodeMap())
            cur = cur.children.get(ch)!
        }
        cur.isEnd = true
    }
}

function getContactsWithPrefixMap(trie: TrieMap, prefix: string): string[] {
    let cur = trie.root
    for (const ch of prefix) {
        const next = cur.children.get(ch)
        if (!next) return []
        cur = next
    }
    const results: string[] = []
    const dfs = (node: TrieNodeMap, path: string): void => {
        if (node.isEnd) results.push(path)
        const keys = Array.from(node.children.keys()).sort()
        for (const ch of keys) dfs(node.children.get(ch)!, path + ch)
    }
    dfs(cur, prefix)
    return results
}

function collectAllWordsMap(node: TrieNodeMap, path: string, result: string[]): void {
    if (node.isEnd) result.push(path)
    const keys = Array.from(node.children.keys()).sort()
    for (const ch of keys) collectAllWordsMap(node.children.get(ch)!, path + ch, result)
}

function searchContactsByDigitsMap(digits: string, trie: TrieMap): string[] {
    const result: string[] = []
    const dfs = (pos: number, node: TrieNodeMap, path: string): void => {
        if (pos === digits.length) {
            collectAllWordsMap(node, path, result)
            return
        }
        const letters = keypadMap[digits[pos]]
        if (!letters) return
        for (const ch of letters) {
            const child = node.children.get(ch)
            if (child) dfs(pos + 1, child, path + ch)
        }
    }
    dfs(0, trie.root, '')
    return result
}
```

```kotlin [Kotlin]
class TrieNodeMap {
    val children = HashMap<Char, TrieNodeMap>()
    var isEnd = false
}

class TrieMap(val root: TrieNodeMap = TrieNodeMap())

val keypadMap = mapOf(
    '2' to "abc", '3' to "def", '4' to "ghi", '5' to "jkl",
    '6' to "mno", '7' to "pqrs", '8' to "tuv", '9' to "wxyz"
)

fun generateTrieMap(contacts: List<String>, trie: TrieMap) {
    for (contact in contacts) {
        var cur = trie.root
        for (ch in contact) {
            cur = cur.children.getOrPut(ch) { TrieNodeMap() }
        }
        cur.isEnd = true
    }
}

fun getContactsWithPrefixMap(trie: TrieMap, prefix: String): List<String> {
    var cur = trie.root
    for (ch in prefix) {
        cur = cur.children[ch] ?: return emptyList()
    }
    val results = mutableListOf<String>()
    fun dfs(node: TrieNodeMap, path: String) {
        if (node.isEnd) results.add(path)
        for (ch in node.children.keys.sorted()) {
            dfs(node.children[ch]!!, path + ch)
        }
    }
    dfs(cur, prefix)
    return results
}

fun collectAllWordsMap(node: TrieNodeMap, path: String, result: MutableList<String>) {
    if (node.isEnd) result.add(path)
    for (ch in node.children.keys.sorted()) {
        collectAllWordsMap(node.children[ch]!!, path + ch, result)
    }
}

fun searchContactsByDigitsMap(digits: String, trie: TrieMap): List<String> {
    val result = mutableListOf<String>()
    fun dfs(pos: Int, node: TrieNodeMap, path: String) {
        if (pos == digits.length) {
            collectAllWordsMap(node, path, result)
            return
        }
        val letters = keypadMap[digits[pos]] ?: return
        for (ch in letters) {
            val child = node.children[ch] ?: continue
            dfs(pos + 1, child, path + ch)
        }
    }
    dfs(0, trie.root, "")
    return result
}
```

```java [Java]
import java.util.*;

class TrieNodeMap {
    Map<Character, TrieNodeMap> children = new HashMap<>();
    boolean isEnd = false;
}

class TrieMap {
    TrieNodeMap root = new TrieNodeMap();
}

class SolutionMap {
    private static final String[] KEYPAD = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    void generateTrieMap(String[] contacts, TrieMap trie) {
        for (String contact : contacts) {
            TrieNodeMap cur = trie.root;
            for (char ch : contact.toCharArray()) {
                cur.children.putIfAbsent(ch, new TrieNodeMap());
                cur = cur.children.get(ch);
            }
            cur.isEnd = true;
        }
    }

    List<String> getContactsWithPrefixMap(TrieMap trie, String prefix) {
        TrieNodeMap cur = trie.root;
        for (char ch : prefix.toCharArray()) {
            cur = cur.children.get(ch);
            if (cur == null) return List.of();
        }
        List<String> results = new ArrayList<>();
        dfsCollect(cur, prefix, results);
        return results;
    }

    private void dfsCollect(TrieNodeMap node, String path, List<String> results) {
        if (node.isEnd) results.add(path);
        List<Character> keys = new ArrayList<>(node.children.keySet());
        Collections.sort(keys);
        for (char ch : keys) {
            dfsCollect(node.children.get(ch), path + ch, results);
        }
    }

    private void collectAllWordsMap(TrieNodeMap node, String path, List<String> result) {
        if (node.isEnd) result.add(path);
        List<Character> keys = new ArrayList<>(node.children.keySet());
        Collections.sort(keys);
        for (char ch : keys) {
            collectAllWordsMap(node.children.get(ch), path + ch, result);
        }
    }

    List<String> searchContactsByDigitsMap(String digits, TrieMap trie) {
        List<String> result = new ArrayList<>();
        dfsDigits(0, trie.root, "", digits, result);
        return result;
    }

    private void dfsDigits(int pos, TrieNodeMap node, String path, String digits, List<String> result) {
        if (pos == digits.length()) {
            collectAllWordsMap(node, path, result);
            return;
        }
        String letters = KEYPAD[digits.charAt(pos) - '0'];
        if (letters == null || letters.isEmpty()) return;
        for (char ch : letters.toCharArray()) {
            TrieNodeMap child = node.children.get(ch);
            if (child != null) dfsDigits(pos + 1, child, path + ch, digits, result);
        }
    }
}
```

```swift [Swift]
class TrieNodeMap {
    var children: [Character: TrieNodeMap] = [:]
    var isEnd = false
}

class TrieMap {
    let root = TrieNodeMap()
}

let keypadMap: [Character: String] = [
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"
]

func generateTrieMap(_ contacts: [String], _ trie: TrieMap) {
    for contact in contacts {
        var cur = trie.root
        for ch in contact {
            if cur.children[ch] == nil {
                cur.children[ch] = TrieNodeMap()
            }
            cur = cur.children[ch]!
        }
        cur.isEnd = true
    }
}

func getContactsWithPrefixMap(_ trie: TrieMap, _ prefix: String) -> [String] {
    var cur = trie.root
    for ch in prefix {
        guard let next = cur.children[ch] else { return [] }
        cur = next
    }
    var results: [String] = []
    func dfs(_ node: TrieNodeMap, _ path: String) {
        if node.isEnd { results.append(path) }
        for ch in node.children.keys.sorted() {
            dfs(node.children[ch]!, path + String(ch))
        }
    }
    dfs(cur, prefix)
    return results
}

func collectAllWordsMap(_ node: TrieNodeMap, _ path: String, _ result: inout [String]) {
    if node.isEnd { result.append(path) }
    for ch in node.children.keys.sorted() {
        collectAllWordsMap(node.children[ch]!, path + String(ch), &result)
    }
}

func searchContactsByDigitsMap(_ digits: String, _ trie: TrieMap) -> [String] {
    var result: [String] = []
    let chars = Array(digits)
    func dfs(_ pos: Int, _ node: TrieNodeMap, _ path: String) {
        if pos == chars.count {
            collectAllWordsMap(node, path, &result)
            return
        }
        guard let letters = keypadMap[chars[pos]] else { return }
        for ch in letters {
            if let child = node.children[ch] {
                dfs(pos + 1, child, path + String(ch))
            }
        }
    }
    dfs(0, trie.root, "")
    return result
}
```

```python [Python]
class TrieNodeMap:
    def __init__(self):
        self.children: dict[str, "TrieNodeMap"] = {}
        self.is_end = False

class TrieMap:
    def __init__(self):
        self.root = TrieNodeMap()

KEYPAD_MAP = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
}

def generate_trie_map(contacts: list[str], trie: TrieMap) -> None:
    for contact in contacts:
        cur = trie.root
        for ch in contact:
            if ch not in cur.children:
                cur.children[ch] = TrieNodeMap()
            cur = cur.children[ch]
        cur.is_end = True

def get_contacts_with_prefix_map(trie: TrieMap, prefix: str) -> list[str]:
    cur = trie.root
    for ch in prefix:
        if ch not in cur.children:
            return []
        cur = cur.children[ch]
    results: list[str] = []
    def dfs(node: TrieNodeMap, path: str) -> None:
        if node.is_end:
            results.append(path)
        for ch in sorted(node.children.keys()):
            dfs(node.children[ch], path + ch)
    dfs(cur, prefix)
    return results

def collect_all_words_map(node: TrieNodeMap, path: str, result: list[str]) -> None:
    if node.is_end:
        result.append(path)
    for ch in sorted(node.children.keys()):
        collect_all_words_map(node.children[ch], path + ch, result)

def search_contacts_by_digits_map(digits: str, trie: TrieMap) -> list[str]:
    result: list[str] = []
    def dfs(pos: int, node: TrieNodeMap, path: str) -> None:
        if pos == len(digits):
            collect_all_words_map(node, path, result)
            return
        letters = KEYPAD_MAP.get(digits[pos], "")
        for ch in letters:
            if ch in node.children:
                dfs(pos + 1, node.children[ch], path + ch)
    dfs(0, trie.root, "")
    return result
```

::::
