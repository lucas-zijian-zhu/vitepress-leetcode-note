# Promise：用法、组合、异常处理与并发控制（中文）

[English](/reading-notes/web/promise.en.md)

## 0. Promise 是什么（先建立正确心智）

- **Promise 是一个“未来结果”的容器**：可能成功（fulfilled）或失败（rejected）
- **Promise 本身不等于并行**：并发来自你同时启动了多个异步操作（I/O），而不是 Promise “开了线程”
- 状态只能从 `pending` → `fulfilled/rejected`，一旦决议不可逆

## 1. `new Promise((resolve, reject) => {})`

### 1.1 基本用法

```ts
const p = new Promise<number>((resolve, reject) => {
  setTimeout(() => resolve(42), 100);
  // reject(new Error("boom"));
});

p.then((v) => console.log("value:", v)).catch((e) => console.error("err:", e));
```

### 1.2 约定：reject 用 `Error`

```ts
Promise.reject(new Error("network failed"))
  .catch((e) => {
    console.log(e instanceof Error); // true
    console.log(e.message); // "network failed"
  });
```

## 2. `Promise.resolve` / `Promise.reject`

### 2.1 `Promise.resolve(x)`：把值“Promise 化”

```ts
Promise.resolve(123).then((v) => console.log(v)); // 123
```

### 2.2 “吸收（adopt）”已有 Promise 的状态

```ts
const inner = new Promise<string>((resolve) => setTimeout(() => resolve("ok"), 50));
Promise.resolve(inner).then((v) => console.log(v)); // "ok"
```

### 2.3 `Promise.reject(e)`：直接创建 rejected

```ts
Promise.reject("bad").catch((e) => console.log("caught:", e)); // "bad"
```

> 实战中更推荐 `Promise.reject(new Error("bad"))`，便于堆栈与定位。

## 3. `then`：链式组合的核心

### 3.1 `then` 会返回一个“新的 Promise”

```ts
Promise.resolve(1)
  .then((v) => v + 1)
  .then((v) => v * 10)
  .then((v) => console.log(v)); // 20
```

### 3.2 `then` 的回调里 **return Promise** 会被“展开”

```ts
Promise.resolve("A")
  .then((v) => Promise.resolve(v + "B"))
  .then((v) => console.log(v)); // "AB"
```

### 3.3 `then` 里抛异常，会变成 rejected

```ts
Promise.resolve(1)
  .then(() => {
    throw new Error("oops");
  })
  .catch((e) => console.log("caught:", e.message)); // "oops"
```

### 3.4 `then(onFulfilled, onRejected)`：不推荐的“二参写法”

```ts
Promise.reject(new Error("fail"))
  .then(
    () => "never",
    (e) => "recovered: " + e.message
  )
  .then((v) => console.log(v)); // "recovered: fail"
```

> 更推荐 `.catch(...)`，可读性更好且不容易漏掉后续链路的异常。

## 4. `catch`：失败分支（也是恢复点）

### 4.1 等价：`catch(fn)` ≈ `then(undefined, fn)`

```ts
Promise.reject("x")
  .catch((e) => {
    console.log("catch:", e);
    return "recover";
  })
  .then((v) => console.log("after:", v)); // "recover"
```

### 4.2 catch 里再抛出，会继续 rejected

```ts
Promise.reject("x")
  .catch(() => {
    throw new Error("still bad");
  })
  .catch((e) => console.log(e.message)); // "still bad"
```

## 5. `finally`：清理资源（不改结果，除非你在 finally 里出错）

### 5.1 finally 不改变 value / error

```ts
Promise.resolve("ok")
  .finally(() => console.log("cleanup"))
  .then((v) => console.log("value:", v));
```

### 5.2 finally 自己抛错/返回 rejected，会覆盖原结果

```ts
Promise.resolve("ok")
  .finally(() => {
    throw new Error("cleanup failed");
  })
  .then(console.log)
  .catch((e) => console.log(e.message)); // "cleanup failed"
```

## 6. `async/await`：Promise 的语法糖

### 6.1 `await` 到 rejected 会抛异常

```ts
async function main() {
  try {
    await Promise.reject(new Error("boom"));
  } catch (e) {
    console.log("caught");
  }
}
main();
```

### 6.2 并发：不要把并发写成串行

```ts
// 串行（慢）：等 A 完成才开始 B
async function serial() {
  const a = await fetch("/a"); // 例子：浏览器里
  const b = await fetch("/b");
  return [a, b];
}

// 并发（快）：先同时发出去，再一起 await
async function parallel() {
  const pa = fetch("/a");
  const pb = fetch("/b");
  return await Promise.all([pa, pb]);
}
```

### 6.3 什么时候用 `.then()`，什么时候用 `async/await`

经验法则：**写“控制流”用 `async/await`，写“流水线/组合”用 `.then()`**。

更适合用 `async/await` 的场景：

- **多步顺序逻辑**：中间要 `return/continue/break`、条件分支很多
- **需要 `try/catch/finally`**：错误处理、资源清理更直观
- **循环里要 await**：比如按顺序重试、分页拉取（注意并发场景要用 `Promise.all`）

更适合用 `.then()` 的场景：

- **简单的一两步转换**：不想为了 `await` 再包一层 `async function`
- **函数式/管道式组合**：`then` 链清晰表达“输入 → 输出”的变换
- **库/工具函数返回 Promise 链**：避免在内部引入 `try/catch` 风格（由调用方决定怎么处理）

对照例子（同样的语义，两种写法都可以）：

```ts
// then：更像“流水线”
function loadUserThen(id: string) {
  return fetch(`/users/${id}`)
    .then((r) => {
      if (!r.ok) throw new Error("bad response");
      return r.json() as Promise<{ name: string }>;
    })
    .then((u) => u.name);
}

// async/await：更像“控制流”
async function loadUserAwait(id: string) {
  const r = await fetch(`/users/${id}`);
  if (!r.ok) throw new Error("bad response");
  const u = (await r.json()) as { name: string };
  return u.name;
}
```

## 7. 组合方法（all / allSettled / race / any）

为了让示例可运行，先定义一个工具函数：

```ts
function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
```

### 7.1 `Promise.all`：全成功才成功（遇到失败会短路）

```ts
async function demoAll() {
  const p1 = sleep(50).then(() => "A");
  const p2 = sleep(80).then(() => "B");
  const out = await Promise.all([p1, p2]);
  console.log(out); // ["A", "B"]
}

demoAll();
```

失败短路：

```ts
Promise.all([Promise.resolve(1), Promise.reject("x"), Promise.resolve(3)])
  .then(console.log)
  .catch((e) => console.log("all failed:", e)); // "x"
```

> 注意：短路只是让 `Promise.all` 自己失败；其它 Promise 可能仍在执行（比如请求已经发出）。

### 7.2 `Promise.allSettled`：全完成再汇总（不短路）

```ts
Promise.allSettled([Promise.resolve("ok"), Promise.reject("bad")]).then(
  (res) => console.log(res)
  // [
  //   { status: "fulfilled", value: "ok" },
  //   { status: "rejected", reason: "bad" }
  // ]
);
```

### 7.3 `Promise.race`：谁先完成就用谁（成功/失败都算）

```ts
Promise.race([sleep(30).then(() => "fast"), sleep(100).then(() => "slow")]).then(
  console.log
); // "fast"
```

### 7.4 `Promise.any`：谁先成功就用谁（全失败才失败）

```ts
Promise.any([Promise.reject("a"), sleep(50).then(() => "ok")]).then(console.log); // "ok"

Promise.any([Promise.reject("a"), Promise.reject("b")])
  .then(console.log)
  .catch((e) => {
    console.log(e.name); // "AggregateError"
    console.log(e.errors); // ["a", "b"] (实现可能略有差异)
  });
```

## 8. 常见模式：超时控制（race + timeout）

```ts
function withTimeout<T>(p: Promise<T>, ms: number) {
  const timeout = new Promise<T>((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });
  return Promise.race([p, timeout]);
}

withTimeout(sleep(200).then(() => "ok"), 100).then(console.log).catch((e) => {
  console.log(e.message); // Timeout after 100ms
});
```

## 9. 未捕获错误的排查（unhandledrejection）

### 9.1 浏览器

```ts
window.addEventListener("unhandledrejection", (event) => {
  console.log("unhandledrejection:", event.reason);
});

Promise.reject("oops"); // 没有 catch，会触发
```

### 9.2 Node.js

```ts
process.on("unhandledRejection", (reason) => {
  console.log("unhandledRejection:", reason);
});

Promise.reject("oops");
```

## 并发控制：任务池（最多同时执行 limit 个）

核心思路：维护一个 `queue`（待执行任务）和一个 `running`（当前运行数）。

- 只要 `running < limit` 就从队列里取任务启动
- **谁先结束，谁触发补位**（在 `finally` 里 `running--` 然后 `runNext()`）
- 关键点：传入 **任务函数** `() => Promise`，不要传已经启动的 `Promise`

```js
function runPool(tasks, limit = 4) {
  let running = 0;
  let queue = [...tasks];

  return new Promise((resolve) => {
    function runNext() {
      if (queue.length === 0 && running === 0) {
        resolve();
        return;
      }

      while (running < limit && queue.length > 0) {
        const task = queue.shift();
        running++;

        Promise.resolve()
          .then(task) // 统一同步/异步：同步 throw 也会变成 rejected
          .catch(() => {}) // 避免未处理 rejected（可改成错误收集/上报）
          .finally(() => {
            running--;
            runNext(); // ⭐ 谁先结束，谁触发补位
          });
      }
    }

    runNext();
  });
}
```

注意：

- 这个版本的 `runPool` **只 resolve，不 reject**：某个 task 失败不会让 `runPool` 自己失败（任务失败需要你在 task 内部自行处理/上报）。
- 如果你希望 “一旦某个 task 失败就让整体失败 / 或汇总 allSettled 结果”，可以在这个骨架上加 `reject` 或结果收集（会稍微复杂一点）。
- 这个版本适合“一次性提交一个任务列表”；如果你要“运行过程中继续追加任务”，需要一个长期存在的全局队列（并提供 close/onIdle 之类信号），实现会更复杂。

### 可动态追加任务的版本：`TaskPool`（`add` / `close` / `done`）

如果你要“不断追加任务”，可以把队列做成一个长期存活的对象：

```js
class TaskPool {
  constructor(limit = 4) {
    this.limit = limit;
    this.running = 0;
    this.queue = [];
    this.closed = false;

    this._resolve = null;
    this.done = new Promise((res) => (this._resolve = res));
  }

  add(task) {
    if (this.closed) {
      throw new Error("TaskPool is closed");
    }

    this.queue.push(task);
    this._runNext(); // ⭐ 关键：追加时立刻尝试调度
  }

  _runNext() {
    while (this.running < this.limit && this.queue.length > 0) {
      const task = this.queue.shift();
      this.running++;

      Promise.resolve()
        .then(task)
        .catch(() => {}) // 可改成错误收集
        .finally(() => {
          this.running--;
          this._runNext();

          // 👇 只有明确 close 后，才允许完成
          if (this.closed && this.running === 0 && this.queue.length === 0) {
            this._resolve();
          }
        });
    }
  }

  close() {
    this.closed = true;

    // 如果此刻已经空了，立即完成
    if (this.running === 0 && this.queue.length === 0) {
      this._resolve();
    }
  }
}
```

## 结论：什么时候用 Promise（什么时候别用）

- **I/O 编排**：Promise 非常适合（请求、读写、定时器、事件）
- **CPU 密集**：Promise 不能解决卡顿，需要 Worker/多线程（见 `workers.md` / `js-multithreading.md`）
