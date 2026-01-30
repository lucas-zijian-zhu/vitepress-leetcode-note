import{_ as n,c as t,o as a,ag as i}from"./chunks/framework.Bw-5EFTY.js";const p=JSON.parse('{"title":"433. Minimum Genetic Mutation","description":"","frontmatter":{},"headers":[],"relativePath":"graph-general/433.md","filePath":"graph-general/433.md"}'),o={name:"graph-general/433.md"};function r(s,e,l,c,d,u){return a(),t("div",null,e[0]||(e[0]=[i(`<h1 id="_433-minimum-genetic-mutation" tabindex="-1"><a href="https://leetcode.com/problems/minimum-genetic-mutation/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">433. Minimum Genetic Mutation</a> <a class="header-anchor" href="#_433-minimum-genetic-mutation" aria-label="Permalink to &quot;[433. Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>A gene string can be represented by an 8-character long string, with choices from <code>&#39;A&#39;</code>, <code>&#39;C&#39;</code>, <code>&#39;G&#39;</code>, and <code>&#39;T&#39;</code>.</p><p>Suppose we need to investigate a mutation from a gene string <code>startGene</code> to a gene string <code>endGene</code> where one mutation is defined as one single character changed in the gene string.</p><ul><li>For example, <code>&quot;AACCGGTT&quot; --&gt; &quot;AACCGGTA&quot;</code> is one mutation.</li></ul><p>There is also a gene bank <code>bank</code> that records all the valid gene mutations. A gene must be in <code>bank</code> to make it a valid gene string.</p><p>Given the two gene strings <code>startGene</code> and <code>endGene</code> and the gene bank <code>bank</code>, return the minimum number of mutations needed to mutate from <code>startGene</code> to <code>endGene</code>. If there is no such a mutation, return <code>-1</code>.</p><p>Note that the starting point is assumed to be valid, so it might not be included in the bank.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: startGene = &quot;AACCGGTT&quot;, endGene = &quot;AACCGGTA&quot;, bank = [&quot;AACCGGTA&quot;]
Output: 1
</code></pre></div><p><strong>Example 2:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input: startGene = &quot;AACCGGTT&quot;, endGene = &quot;AAACGGTA&quot;, bank = [&quot;AACCGGTA&quot;,&quot;AACCGCTA&quot;,&quot;AAACGGTA&quot;]
Output: 2
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>0 &lt;= bank.length &lt;= 10</code></li><li><code>startGene.length == endGene.length == bank[i].length == 8</code></li><li><code>startGene</code>, <code>endGene</code>, and <code>bank[i]</code> consist of only the characters <code>[&#39;A&#39;, &#39;C&#39;, &#39;G&#39;, &#39;T&#39;]</code>.</li></ul><h2 id="💡-approach-bfs-breadth-first-search" tabindex="-1">💡 Approach: BFS (Breadth-First Search) <a class="header-anchor" href="#💡-approach-bfs-breadth-first-search" aria-label="Permalink to &quot;💡 Approach: BFS (Breadth-First Search)&quot;">​</a></h2><h3 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-label="Permalink to &quot;Intuition&quot;">​</a></h3><p>This is a classic <strong>shortest path</strong> problem in an implicit graph. We can model this as:</p><ul><li>Each valid gene string is a node</li><li>An edge exists between two nodes if they differ by exactly one character</li><li>We want to find the shortest path from <code>startGene</code> to <code>endGene</code></li></ul><p>Since we need the <strong>minimum number of mutations</strong> (shortest path), <strong>BFS</strong> is the optimal choice because:</p><ul><li>BFS explores nodes level by level, ensuring the first time we reach <code>endGene</code>, we&#39;ve found the shortest path</li><li>We avoid unnecessary longer paths by marking visited nodes</li></ul><h3 id="algorithm" tabindex="-1">Algorithm <a class="header-anchor" href="#algorithm" aria-label="Permalink to &quot;Algorithm&quot;">​</a></h3><ol><li><strong>Check edge cases</strong>: If <code>startGene == endGene</code>, return 0</li><li><strong>Build the gene bank set</strong> for O(1) lookup</li><li><strong>Use BFS</strong> with a queue to explore all possible mutations</li><li><strong>For each current gene</strong>, try changing each position to each valid character (A, C, G, T)</li><li><strong>If the new gene</strong> is valid (in bank) and not visited, add it to queue</li><li><strong>When we reach endGene</strong>, return the number of mutations</li><li><strong>If queue is empty</strong> without finding endGene, return -1</li></ol><h3 id="key-points" tabindex="-1">Key Points <a class="header-anchor" href="#key-points" aria-label="Permalink to &quot;Key Points&quot;">​</a></h3><ul><li>Use BFS for shortest path guarantee</li><li>Only consider genes in the bank (valid genes)</li><li>Avoid revisiting the same gene (cycle detection)</li><li>Generate all possible 1-character mutations efficiently</li></ul><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-5emvE" id="tab-QbNDct0" checked><label data-title="Kotlin" for="tab-QbNDct0">Kotlin</label><input type="radio" name="group-5emvE" id="tab-vCaw4P2"><label data-title="TypeScript" for="tab-vCaw4P2">TypeScript</label><input type="radio" name="group-5emvE" id="tab-5koLY-S"><label data-title="Java" for="tab-5koLY-S">Java</label><input type="radio" name="group-5emvE" id="tab-GfIk8t3"><label data-title="Python" for="tab-GfIk8t3">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class Solution {
    fun minMutation(startGene: String, endGene: String, bank: Array&lt;String&gt;): Int {
        if (startGene == endGene) return 0
        
        val bankSet = bank.toSet()
        if (endGene !in bankSet) return -1
        
        val queue = ArrayDeque&lt;String&gt;()
        val visited = mutableSetOf&lt;String&gt;()
        val directions = charArrayOf(&#39;A&#39;, &#39;C&#39;, &#39;G&#39;, &#39;T&#39;)
        
        queue.offer(startGene)
        visited.add(startGene)
        var mutations = 0
        
        while (queue.isNotEmpty()) {
            val size = queue.size
            
            for (i in 0 until size) {
                val current = queue.poll()
                
                if (current == endGene) {
                    return mutations
                }
                
                // Try all possible mutations (change each position)
                val chars = current.toCharArray()
                for (j in chars.indices) {
                    val originalChar = chars[j]
                    
                    for (direction in directions) {
                        if (direction != originalChar) {
                            chars[j] = direction
                            val mutated = String(chars)
                            
                            if (mutated in bankSet &amp;&amp; mutated !in visited) {
                                visited.add(mutated)
                                queue.offer(mutated)
                            }
                        }
                    }
                    
                    chars[j] = originalChar // Reset for next iteration
                }
            }
            
            mutations++
        }
        
        return -1
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">function minMutation(startGene: string, endGene: string, bank: string[]): number {
    if (startGene === endGene) return 0;
    
    const bankSet = new Set(bank);
    if (!bankSet.has(endGene)) return -1;
    
    const queue: string[] = [startGene];
    const visited = new Set&lt;string&gt;([startGene]);
    const directions = [&#39;A&#39;, &#39;C&#39;, &#39;G&#39;, &#39;T&#39;];
    let mutations = 0;
    
    while (queue.length &gt; 0) {
        const size = queue.length;
        
        for (let i = 0; i &lt; size; i++) {
            const current = queue.shift()!;
            
            if (current === endGene) {
                return mutations;
            }
            
            // Try all possible mutations
            const chars = current.split(&#39;&#39;);
            for (let j = 0; j &lt; chars.length; j++) {
                const originalChar = chars[j];
                
                for (const direction of directions) {
                    if (direction !== originalChar) {
                        chars[j] = direction;
                        const mutated = chars.join(&#39;&#39;);
                        
                        if (bankSet.has(mutated) &amp;&amp; !visited.has(mutated)) {
                            visited.add(mutated);
                            queue.push(mutated);
                        }
                    }
                }
                
                chars[j] = originalChar; // Reset
            }
        }
        
        mutations++;
    }
    
    return -1;
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class Solution {
    public int minMutation(String startGene, String endGene, String[] bank) {
        if (startGene.equals(endGene)) return 0;
        
        Set&lt;String&gt; bankSet = new HashSet&lt;&gt;(Arrays.asList(bank));
        if (!bankSet.contains(endGene)) return -1;
        
        Queue&lt;String&gt; queue = new LinkedList&lt;&gt;();
        Set&lt;String&gt; visited = new HashSet&lt;&gt;();
        char[] directions = {&#39;A&#39;, &#39;C&#39;, &#39;G&#39;, &#39;T&#39;};
        
        queue.offer(startGene);
        visited.add(startGene);
        int mutations = 0;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            
            for (int i = 0; i &lt; size; i++) {
                String current = queue.poll();
                
                if (current.equals(endGene)) {
                    return mutations;
                }
                
                // Try all possible mutations
                char[] chars = current.toCharArray();
                for (int j = 0; j &lt; chars.length; j++) {
                    char originalChar = chars[j];
                    
                    for (char direction : directions) {
                        if (direction != originalChar) {
                            chars[j] = direction;
                            String mutated = new String(chars);
                            
                            if (bankSet.contains(mutated) &amp;&amp; !visited.contains(mutated)) {
                                visited.add(mutated);
                                queue.offer(mutated);
                            }
                        }
                    }
                    
                    chars[j] = originalChar; // Reset
                }
            }
            
            mutations++;
        }
        
        return -1;
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -&gt; int:
        if startGene == endGene:
            return 0
        
        bank_set = set(bank)
        if endGene not in bank_set:
            return -1
        
        queue = deque([startGene])
        visited = {startGene}
        directions = [&#39;A&#39;, &#39;C&#39;, &#39;G&#39;, &#39;T&#39;]
        mutations = 0
        
        while queue:
            size = len(queue)
            
            for _ in range(size):
                current = queue.popleft()
                
                if current == endGene:
                    return mutations
                
                # Try all possible mutations
                chars = list(current)
                for i in range(len(chars)):
                    original_char = chars[i]
                    
                    for direction in directions:
                        if direction != original_char:
                            chars[i] = direction
                            mutated = &#39;&#39;.join(chars)
                            
                            if mutated in bank_set and mutated not in visited:
                                visited.add(mutated)
                                queue.append(mutated)
                    
                    chars[i] = original_char  # Reset
        
            mutations += 1
        
        return -1
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity:</strong> O(B × 8 × 4) = O(B), where B is the size of the bank. We visit each valid gene at most once, and for each gene we check 8 positions × 4 possible characters.</li><li><strong>Space Complexity:</strong> O(B) for the bank set, queue, and visited set.</li></ul>`,27)]))}const g=n(o,[["render",r]]);export{p as __pageData,g as default};
