# 数据结构：RingBuffer 与 LRU 实现（中文）

环形缓冲区（Ring Buffer）和 LRU 缓存是面试与工程中常见的数据结构，本文记录其核心实现思路与多语言代码。

---

## 1. Ring Buffer（环形缓冲区）

### 概念

- **固定大小**的循环数组，读写指针在数组内循环移动。
- 满时覆盖最旧数据，常用于**生产者-消费者**、日志缓冲、音视频流等。
- 操作均为 O(1)。

### 实现要点

1. 用 `head`（写指针）和 `tail`（读指针）或单一 `writeIndex` + `count` 表示状态。
2. 索引取模：`(index + 1) % capacity` 实现循环。
3. 满：`count === capacity`；空：`count === 0`。

### 代码

::: code-group

```typescript [TypeScript]
class RingBuffer<T> {
    private buf: (T | undefined)[];
    private head = 0;  // 写位置
    private tail = 0;  // 读位置
    private count = 0;

    constructor(private capacity: number) {
        this.buf = new Array(capacity);
    }

    push(val: T): void {
        this.buf[this.head] = val;
        this.head = (this.head + 1) % this.capacity;
        if (this.count < this.capacity) this.count++;
        else this.tail = (this.tail + 1) % this.capacity;  // 满时移动读指针
    }

    pop(): T | undefined {
        if (this.count === 0) return undefined;
        const val = this.buf[this.tail];
        this.tail = (this.tail + 1) % this.capacity;
        this.count--;
        return val;
    }

    get size(): number { return this.count; }
    get empty(): boolean { return this.count === 0; }
}
```

```kotlin [Kotlin]
class RingBuffer<T>(private val capacity: Int) {
    private val buf = arrayOfNulls<Any?>(capacity)
    private var head = 0
    private var tail = 0
    private var count = 0

    fun push(value: T) {
        buf[head] = value
        head = (head + 1) % capacity
        if (count < capacity) count++
        else tail = (tail + 1) % capacity
    }

    fun pop(): T? {
        if (count == 0) return null
        @Suppress("UNCHECKED_CAST")
        val value = buf[tail] as T
        tail = (tail + 1) % capacity
        count--
        return value
    }

    val size: Int get() = count
    val empty: Boolean get() = count == 0
}
```

```java [Java]
class RingBuffer<T> {
    private final Object[] buf;
    private int head = 0;
    private int tail = 0;
    private int count = 0;
    private final int capacity;

    public RingBuffer(int capacity) {
        this.capacity = capacity;
        this.buf = new Object[capacity];
    }

    public void push(T val) {
        buf[head] = val;
        head = (head + 1) % capacity;
        if (count < capacity) count++;
        else tail = (tail + 1) % capacity;
    }

    @SuppressWarnings("unchecked")
    public T pop() {
        if (count == 0) return null;
        T val = (T) buf[tail];
        tail = (tail + 1) % capacity;
        count--;
        return val;
    }

    public int size() { return count; }
    public boolean isEmpty() { return count == 0; }
}
```

```swift [Swift]
class RingBuffer<T> {
    private var buf: [T?]
    private var head = 0
    private var tail = 0
    private var count = 0
    private let capacity: Int

    init(capacity: Int) {
        self.capacity = capacity
        self.buf = Array(repeating: nil, count: capacity)
    }

    func push(_ value: T) {
        buf[head] = value
        head = (head + 1) % capacity
        if count < capacity { count += 1 }
        else { tail = (tail + 1) % capacity }
    }

    func pop() -> T? {
        guard count > 0 else { return nil }
        let value = buf[tail]
        tail = (tail + 1) % capacity
        count -= 1
        return value
    }

    var size: Int { count }
    var isEmpty: Bool { count == 0 }
}
```

```python [Python]
class RingBuffer:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.buf: list = [None] * capacity
        self.head = 0
        self.tail = 0
        self.count = 0

    def push(self, val) -> None:
        self.buf[self.head] = val
        self.head = (self.head + 1) % self.capacity
        if self.count < self.capacity:
            self.count += 1
        else:
            self.tail = (self.tail + 1) % self.capacity

    def pop(self):
        if self.count == 0:
            return None
        val = self.buf[self.tail]
        self.tail = (self.tail + 1) % self.capacity
        self.count -= 1
        return val

    @property
    def size(self) -> int:
        return self.count

    @property
    def empty(self) -> bool:
        return self.count == 0
```

:::

---

## 2. LRU Cache（Least Recently Used 缓存）

### 概念

- 容量有限，超出时**淘汰最久未使用**的项。
- `get`、`put` 均需 O(1)，常用 **HashMap + 双向链表** 实现。
- 链表维护访问顺序：最近使用的在头，最久未使用的在尾。

### 实现要点

1. **HashMap**：`key -> Node`，实现 O(1) 查找。
2. **双向链表**：维护访问顺序，头为最近使用，尾为最久未使用。
3. `get(key)`：若存在则移到链表头，返回 value；否则返回 `undefined`/`null`。
4. `put(key, value)`：若存在则更新并移到头；否则插入到头，若超容则删尾。
5. 使用泛型 `LRUCache<K, V>` 支持任意 key 与 value 类型（K 需可哈希）。

### 代码

::: code-group

```typescript [TypeScript]
class LRUCache<K, V> {
    private map = new Map<K, DNode<K, V>>();
    private head: DNode<K, V>;
    private tail: DNode<K, V>;

    constructor(private capacity: number) {
        this.head = new DNode<K, V>(null as any, null as any);
        this.tail = new DNode<K, V>(null as any, null as any);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: K): V | undefined {
        const node = this.map.get(key);
        if (!node) return undefined;
        this.moveToHead(node);
        return node.val;
    }

    put(key: K, value: V): void {
        const node = this.map.get(key);
        if (node) {
            node.val = value;
            this.moveToHead(node);
            return;
        }
        const newNode = new DNode(key, value);
        this.map.set(key, newNode);
        this.addToHead(newNode);
        if (this.map.size > this.capacity) {
            const removed = this.removeTail();
            this.map.delete(removed.key!);
        }
    }

    private moveToHead(node: DNode<K, V>): void {
        this.removeNode(node);
        this.addToHead(node);
    }

    private addToHead(node: DNode<K, V>): void {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next!.prev = node;
        this.head.next = node;
    }

    private removeNode(node: DNode<K, V>): void {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }

    private removeTail(): DNode<K, V> {
        const node = this.tail.prev!;
        this.removeNode(node);
        return node;
    }
}

class DNode<K, V> {
    key: K | null;
    val: V;
    prev: DNode<K, V> | null = null;
    next: DNode<K, V> | null = null;
    constructor(k: K | null, v: V) { this.key = k; this.val = v; }
}
```

```kotlin [Kotlin]
class LRUCache<K, V>(private val capacity: Int) {
    private val map = mutableMapOf<K, DNode<K, V>>()
    private val head = DNode<K, V>(null, null)
    private val tail = DNode<K, V>(null, null)

    init {
        head.next = tail
        tail.prev = head
    }

    fun get(key: K): V? {
        val node = map[key] ?: return null
        moveToHead(node)
        return node.`val`
    }

    fun put(key: K, value: V) {
        val node = map[key]
        if (node != null) {
            node.`val` = value
            moveToHead(node)
            return
        }
        val newNode = DNode(key, value)
        map[key] = newNode
        addToHead(newNode)
        if (map.size > capacity) {
            val removed = removeTail()
            removed.key?.let { map.remove(it) }
        }
    }

    private fun moveToHead(node: DNode<K, V>) {
        removeNode(node)
        addToHead(node)
    }

    private fun addToHead(node: DNode<K, V>) {
        node.next = head.next
        node.prev = head
        head.next!!.prev = node
        head.next = node
    }

    private fun removeNode(node: DNode<K, V>) {
        node.prev!!.next = node.next
        node.next!!.prev = node.prev
    }

    private fun removeTail(): DNode<K, V> {
        val node = tail.prev!!
        removeNode(node)
        return node
    }
}

class DNode<K, V>(val key: K?, var `val`: V) {
    var prev: DNode<K, V>? = null
    var next: DNode<K, V>? = null
}
```

```java [Java]
class LRUCache<K, V> {
    private final Map<K, DNode<K, V>> map = new HashMap<>();
    private final DNode<K, V> head = new DNode<>(null, null);
    private final DNode<K, V> tail = new DNode<>(null, null);
    private final int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public V get(K key) {
        DNode<K, V> node = map.get(key);
        if (node == null) return null;
        moveToHead(node);
        return node.val;
    }

    public void put(K key, V value) {
        DNode<K, V> node = map.get(key);
        if (node != null) {
            node.val = value;
            moveToHead(node);
            return;
        }
        DNode<K, V> newNode = new DNode<>(key, value);
        map.put(key, newNode);
        addToHead(newNode);
        if (map.size() > capacity) {
            DNode<K, V> removed = removeTail();
            if (removed.key != null) map.remove(removed.key);
        }
    }

    private void moveToHead(DNode<K, V> node) {
        removeNode(node);
        addToHead(node);
    }

    private void addToHead(DNode<K, V> node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(DNode<K, V> node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private DNode<K, V> removeTail() {
        DNode<K, V> node = tail.prev;
        removeNode(node);
        return node;
    }
}

class DNode<K, V> {
    K key;
    V val;
    DNode<K, V> prev, next;
    DNode(K k, V v) { key = k; val = v; }
}
```

```swift [Swift]
class LRUCache<K: Hashable, V> {
    private var map: [K: DNode<K, V>] = [:]
    private let head = DNode<K, V>(key: nil, val: nil)
    private let tail = DNode<K, V>(key: nil, val: nil)
    private let capacity: Int

    init(_ capacity: Int) {
        self.capacity = capacity
        head.next = tail
        tail.prev = head
    }

    func get(_ key: K) -> V? {
        guard let node = map[key] else { return nil }
        moveToHead(node)
        return node.val
    }

    func put(_ key: K, _ value: V) {
        if let node = map[key] {
            node.val = value
            moveToHead(node)
            return
        }
        let newNode = DNode(key: key, val: value)
        map[key] = newNode
        addToHead(newNode)
        if map.count > capacity {
            let removed = removeTail()
            if let k = removed.key { map.removeValue(forKey: k) }
        }
    }

    private func moveToHead(_ node: DNode<K, V>) {
        removeNode(node)
        addToHead(node)
    }

    private func addToHead(_ node: DNode<K, V>) {
        node.next = head.next
        node.prev = head
        head.next?.prev = node
        head.next = node
    }

    private func removeNode(_ node: DNode<K, V>) {
        node.prev?.next = node.next
        node.next?.prev = node.prev
    }

    private func removeTail() -> DNode<K, V> {
        let node = tail.prev!
        removeNode(node)
        return node
    }
}

class DNode<K, V> {
    let key: K?
    var val: V?
    weak var prev: DNode<K, V>?
    var next: DNode<K, V>?
    init(key: K?, val: V?) { self.key = key; self.val = val }
}
```

```python [Python]
from typing import TypeVar, Optional, Generic

K = TypeVar("K")
V = TypeVar("V")


class DNode(Generic[K, V]):
    def __init__(self, key: Optional[K], val: Optional[V]):
        self.key = key
        self.val = val
        self.prev: Optional["DNode[K, V]"] = None
        self.next: Optional["DNode[K, V]"] = None


class LRUCache(Generic[K, V]):
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.map: dict[K, DNode[K, V]] = {}
        self.head = DNode(None, None)
        self.tail = DNode(None, None)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: K) -> Optional[V]:
        node = self.map.get(key)
        if not node:
            return None
        self._move_to_head(node)
        return node.val

    def put(self, key: K, value: V) -> None:
        node = self.map.get(key)
        if node:
            node.val = value
            self._move_to_head(node)
            return
        newNode = DNode(key, value)
        self.map[key] = newNode
        self._add_to_head(newNode)
        if len(self.map) > self.capacity:
            removed = self._remove_tail()
            if removed.key is not None:
                del self.map[removed.key]

    def _move_to_head(self, node: DNode[K, V]) -> None:
        self._remove_node(node)
        self._add_to_head(node)

    def _add_to_head(self, node: DNode[K, V]) -> None:
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node: DNode[K, V]) -> None:
        node.prev.next = node.next
        node.next.prev = node.prev

    def _remove_tail(self) -> DNode[K, V]:
        node = self.tail.prev
        self._remove_node(node)
        return node
```

:::

---

## Complexity

- **Ring Buffer:** 所有操作 O(1)，空间 O(capacity)
- **LRU Cache:** get/put 均 O(1)，空间 O(capacity)
