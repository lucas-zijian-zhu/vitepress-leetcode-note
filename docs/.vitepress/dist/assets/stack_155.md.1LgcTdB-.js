import{_ as e,c as n,o as a,ag as o}from"./chunks/framework.Bw-5EFTY.js";const m=JSON.parse('{"title":"155. Min Stack","description":"","frontmatter":{},"headers":[],"relativePath":"stack/155.md","filePath":"stack/155.md"}'),i={name:"stack/155.md"};function s(c,t,l,p,d,r){return a(),n("div",null,t[0]||(t[0]=[o(`<h1 id="_155-min-stack" tabindex="-1"><a href="https://leetcode.com/problems/min-stack/description/?envType=study-plan-v2&amp;envId=top-interview-150" target="_blank" rel="noreferrer">155. Min Stack</a> <a class="header-anchor" href="#_155-min-stack" aria-label="Permalink to &quot;[155. Min Stack](https://leetcode.com/problems/min-stack/description/?envType=study-plan-v2&amp;envId=top-interview-150)&quot;">​</a></h1><p>Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.</p><p>Implement the <code>MinStack</code> class:</p><ul><li><code>MinStack()</code> initializes the stack object.</li><li><code>void push(int val)</code> pushes the element <code>val</code> onto the stack.</li><li><code>void pop()</code> removes the element on the top of the stack.</li><li><code>int top()</code> gets the top element of the stack.</li><li><code>int getMin()</code> retrieves the minimum element in the stack.</li></ul><p>You must implement a solution with <code>O(1)</code> time complexity for each function.</p><p><strong>Example 1:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="vp-code"><code class="">Input

[&quot;MinStack&quot;,&quot;push&quot;,&quot;push&quot;,&quot;push&quot;,&quot;getMin&quot;,&quot;pop&quot;,&quot;top&quot;,&quot;getMin&quot;]
[[],[-2],[0],[-3],[],[],[],[]]

Output

[null,null,null,null,-3,null,0,-2]

Explanation

MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
</code></pre></div><p><strong>Constraints:</strong></p><ul><li><code>-2^31 &lt;= val &lt;= 2^31 - 1</code></li><li>Methods <code>pop</code>, <code>top</code> and <code>getMin</code> operations will always be called on <strong>non-empty</strong> stacks.</li><li>At most <code>3 * 10^4</code> calls will be made to <code>push</code>, <code>pop</code>, <code>top</code>, and <code>getMin</code>.</li></ul><h2 id="approach" tabindex="-1">Approach <a class="header-anchor" href="#approach" aria-label="Permalink to &quot;Approach&quot;">​</a></h2><p>To implement a stack that supports <code>push</code>, <code>pop</code>, <code>top</code>, and <code>getMin</code> in <strong>O(1)</strong> time complexity, we can use <strong>two stacks</strong>:</p><ol><li><strong>Main Stack (<code>stack</code>)</strong>: Stores all the elements.</li><li><strong>Min Stack (<code>minStack</code>)</strong>: Stores the minimum value corresponding to each element in the main stack.</li></ol><p>Operations:</p><ul><li><strong>push(x)</strong>: Push <code>x</code> onto the main stack. For <code>minStack</code>, push the smaller of <code>x</code> and the current top of <code>minStack</code>.</li><li><strong>pop()</strong>: Pop from both stacks.</li><li><strong>top()</strong>: Return the top element of the main stack.</li><li><strong>getMin()</strong>: Return the top element of <code>minStack</code>.</li></ul><p>This ensures <code>getMin()</code> always works in O(1) time.</p><h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-wHfaG" id="tab-Uc1ktfO" checked><label data-title="Kotlin" for="tab-Uc1ktfO">Kotlin</label><input type="radio" name="group-wHfaG" id="tab-jptRNeK"><label data-title="TypeScript" for="tab-jptRNeK">TypeScript</label><input type="radio" name="group-wHfaG" id="tab-WWUe_7i"><label data-title="Java" for="tab-WWUe_7i">Java</label><input type="radio" name="group-wHfaG" id="tab-D58gc3p"><label data-title="Python" for="tab-D58gc3p">Python</label></div><div class="blocks"><div class="language-kotlin vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="vp-code"><code class="language-kotlin">class MinStack() {

    private val stack = mutableListOf&lt;Int&gt;()
    private val minStack = mutableListOf&lt;Int&gt;()

    fun push(x: Int) {
        stack.add(x)
        if (minStack.isEmpty() || x &lt;= minStack.last()) {
            minStack.add(x)
        } else {
            minStack.add(minStack.last())
        }
    }

    fun pop() {
        if (stack.isNotEmpty()) {
            stack.removeAt(stack.size - 1)
            minStack.removeAt(minStack.size - 1)
        }
    }

    fun top(): Int {
        return stack.last()
    }

    fun getMin(): Int {
        return minStack.last()
    }
}
</code></pre></div><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="vp-code"><code class="language-typescript">class MinStack {
    private stack: number[] = [];
    private minStack: number[] = [];

    push(val: number): void {
        this.stack.push(val);
        if (this.minStack.length === 0 || val &lt;= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        } else {
            this.minStack.push(this.minStack[this.minStack.length - 1]);
        }
    }

    pop(): void {
        if (this.stack.length &gt; 0) {
            this.stack.pop();
            this.minStack.pop();
        }
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}
</code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="vp-code"><code class="language-java">class MinStack {
    private Stack&lt;Integer&gt; stack;
    private Stack&lt;Integer&gt; minStack;

    public MinStack() {
        stack = new Stack&lt;&gt;();
        minStack = new Stack&lt;&gt;();
    }

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val &lt;= minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }

    public void pop() {
        if (!stack.isEmpty()) {
            stack.pop();
            minStack.pop();
        }
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}
</code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="vp-code"><code class="language-python">class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -&gt; None:
        self.stack.append(val)
        if not self.min_stack or val &lt;= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -&gt; None:
        if self.stack:
            self.stack.pop()
            self.min_stack.pop()

    def top(self) -&gt; int:
        return self.stack[-1]

    def getMin(self) -&gt; int:
        return self.min_stack[-1]
</code></pre></div></div></div><h2 id="complexity" tabindex="-1">Complexity <a class="header-anchor" href="#complexity" aria-label="Permalink to &quot;Complexity&quot;">​</a></h2><ul><li><strong>Time Complexity</strong>: <ul><li><code>push</code> / <code>pop</code> / <code>top</code> / <code>getMin</code> all take O(1)</li></ul></li><li><strong>Space Complexity</strong>: <ul><li>O(n), because of the extra <code>minStack</code> storing minimum values</li></ul></li></ul>`,19)]))}const k=e(i,[["render",s]]);export{m as __pageData,k as default};
