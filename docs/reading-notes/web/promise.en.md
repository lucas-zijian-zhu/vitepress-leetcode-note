# Promise: APIs, patterns, error handling, and concurrency limit (English)

[中文](/reading-notes/web/promise.md)

## 0. The right mental model

- A Promise is a container for a **future value**: fulfilled or rejected.
- A Promise is **not** “parallelism”. Concurrency comes from starting multiple async operations (often I/O), not from Promise creating threads.
- State is one-way: `pending` → `fulfilled` / `rejected`.

## 1. `new Promise((resolve, reject) => {})`

### 1.1 Basic usage

```ts
const p = new Promise<number>((resolve, reject) => {
  setTimeout(() => resolve(42), 100);
  // reject(new Error("boom"));
});

p.then((v) => console.log("value:", v)).catch((e) => console.error("err:", e));
```

### 1.2 Prefer rejecting with `Error`

```ts
Promise.reject(new Error("network failed"))
  .catch((e) => {
    console.log(e instanceof Error); // true
    console.log(e.message); // "network failed"
  });
```

## 2. `Promise.resolve` / `Promise.reject`

### 2.1 `Promise.resolve(x)` turns a value into a fulfilled Promise

```ts
Promise.resolve(123).then((v) => console.log(v)); // 123
```

### 2.2 Promise “adoption”: it follows an existing Promise

```ts
const inner = new Promise<string>((resolve) => setTimeout(() => resolve("ok"), 50));
Promise.resolve(inner).then((v) => console.log(v)); // "ok"
```

### 2.3 `Promise.reject(e)` creates a rejected Promise

```ts
Promise.reject("bad").catch((e) => console.log("caught:", e)); // "bad"
```

## 3. `then`: chaining and composition

### 3.1 `then` returns a new Promise

```ts
Promise.resolve(1)
  .then((v) => v + 1)
  .then((v) => v * 10)
  .then((v) => console.log(v)); // 20
```

### 3.2 Returning a Promise is automatically unwrapped

```ts
Promise.resolve("A")
  .then((v) => Promise.resolve(v + "B"))
  .then((v) => console.log(v)); // "AB"
```

### 3.3 Throwing inside `then` turns the chain into rejected

```ts
Promise.resolve(1)
  .then(() => {
    throw new Error("oops");
  })
  .catch((e) => console.log("caught:", e.message)); // "oops"
```

## 4. `catch`: error branch (also a recovery point)

```ts
Promise.reject("x")
  .catch((e) => {
    console.log("catch:", e);
    return "recover";
  })
  .then((v) => console.log("after:", v)); // "recover"
```

## 5. `finally`: cleanup (doesn’t change outcome unless it fails)

```ts
Promise.resolve("ok")
  .finally(() => console.log("cleanup"))
  .then((v) => console.log("value:", v));
```

If `finally` throws, it overrides the original result:

```ts
Promise.resolve("ok")
  .finally(() => {
    throw new Error("cleanup failed");
  })
  .then(console.log)
  .catch((e) => console.log(e.message)); // "cleanup failed"
```

## 6. `async/await`

Rejected Promises throw at `await`:

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

Concurrency: avoid writing parallel work as serial:

```ts
async function parallel() {
  const pa = fetch("/a");
  const pb = fetch("/b");
  return await Promise.all([pa, pb]);
}
```

### 6.3 When to use `.then()` vs `async/await`

Rule of thumb: use **`async/await` for control flow**, and **`.then()` for pipelines/composition**.

Prefer `async/await` when:

- **Multi-step sequential logic** with lots of branching / early returns
- You want **`try/catch/finally`** to read like normal synchronous code
- You need to **`await` inside loops** (for true parallelism, still use `Promise.all`)

Prefer `.then()` when:

- It’s a **small one- or two-step transformation** and you don’t want to wrap another `async` function
- You like a **pipeline style**: “input → output” transformations
- You’re writing a **utility/library** that naturally returns a Promise chain (callers decide how to handle errors)

Same logic, two styles:

```ts
// then: pipeline style
function loadUserThen(id: string) {
  return fetch(`/users/${id}`)
    .then((r) => {
      if (!r.ok) throw new Error("bad response");
      return r.json() as Promise<{ name: string }>;
    })
    .then((u) => u.name);
}

// async/await: control-flow style
async function loadUserAwait(id: string) {
  const r = await fetch(`/users/${id}`);
  if (!r.ok) throw new Error("bad response");
  const u = (await r.json()) as { name: string };
  return u.name;
}
```

## 7. Combinators: `all / allSettled / race / any`

Helper:

```ts
function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
```

### 7.1 `Promise.all`

```ts
async function demoAll() {
  const p1 = sleep(50).then(() => "A");
  const p2 = sleep(80).then(() => "B");
  const out = await Promise.all([p1, p2]);
  console.log(out); // ["A", "B"]
}
demoAll();
```

Short-circuit on failure:

```ts
Promise.all([Promise.resolve(1), Promise.reject("x"), Promise.resolve(3)])
  .then(console.log)
  .catch((e) => console.log("all failed:", e)); // "x"
```

### 7.2 `Promise.allSettled`

```ts
Promise.allSettled([Promise.resolve("ok"), Promise.reject("bad")]).then(
  (res) => console.log(res)
);
```

### 7.3 `Promise.race`

```ts
Promise.race([sleep(30).then(() => "fast"), sleep(100).then(() => "slow")]).then(
  console.log
); // "fast"
```

### 7.4 `Promise.any`

```ts
Promise.any([Promise.reject("a"), sleep(50).then(() => "ok")]).then(console.log); // "ok"
```

All fail:

```ts
Promise.any([Promise.reject("a"), Promise.reject("b")])
  .then(console.log)
  .catch((e) => {
    console.log(e.name); // "AggregateError"
    console.log(e.errors); // ["a", "b"] (implementation may vary)
  });
```

## 8. Pattern: timeout (`race + timeout`)

```ts
function withTimeout<T>(p: Promise<T>, ms: number) {
  const timeout = new Promise<T>((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });
  return Promise.race([p, timeout]);
}

withTimeout(sleep(200).then(() => "ok"), 100).catch((e) => console.log(e.message));
```

## 9. Debugging: `unhandledrejection`

Browser:

```ts
window.addEventListener("unhandledrejection", (event) => {
  console.log("unhandledrejection:", event.reason);
});
Promise.reject("oops");
```

Node:

```ts
process.on("unhandledRejection", (reason) => {
  console.log("unhandledRejection:", reason);
});
Promise.reject("oops");
```

## Concurrency control: a simple task pool (max `limit` concurrent)

Core idea: maintain a `queue` of pending tasks and a `running` counter.

- Start tasks while `running < limit`
- When any task finishes, it frees a slot and triggers a refill (`finally` → `running--` → `runNext()`)
- Key point: pass **task functions** `() => Promise`, not already-started Promises

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
          .then(task) // normalize sync/async: sync throws become rejected
          .catch(() => {}) // avoid unhandled rejections (or collect/report errors)
          .finally(() => {
            running--;
            runNext(); // ⭐ whoever finishes first refills the pool
          });
      }
    }

    runNext();
  });
}
```

Notes:

- This version **only resolves and never rejects**: a failed task won’t fail `runPool` itself (handle/report failures inside each task).
- If you need “fail fast” or “allSettled-style results”, you can extend this skeleton with `reject` / result collection (a bit more code).
- This version is best for submitting a fixed list of tasks. If you need to keep appending tasks while running, you’ll need a long-lived global queue (with an explicit close/onIdle signal), which is more involved.

### Dynamic version: `TaskPool` (`add` / `close` / `done`)

If tasks keep arriving over time, make the queue a long-lived object:

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
    this._runNext(); // ⭐ key: schedule immediately on add
  }

  _runNext() {
    while (this.running < this.limit && this.queue.length > 0) {
      const task = this.queue.shift();
      this.running++;

      Promise.resolve()
        .then(task)
        .catch(() => {}) // can be replaced with error collection
        .finally(() => {
          this.running--;
          this._runNext();

          // Only resolve after an explicit close
          if (this.closed && this.running === 0 && this.queue.length === 0) {
            this._resolve();
          }
        });
    }
  }

  close() {
    this.closed = true;

    // If already empty, resolve immediately
    if (this.running === 0 && this.queue.length === 0) {
      this._resolve();
    }
  }
}
```
