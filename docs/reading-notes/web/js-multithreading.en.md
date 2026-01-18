# JS Concurrency and Multithreading: Browser vs Node.js (English)

[中文](/reading-notes/web/js-multithreading.md)

This note clarifies what “multitasking” means in JavaScript, and when you actually need multiple threads. Key point: **async ≠ multithreading**.

## Terms: async, concurrency, parallelism

- **Async**: start work without blocking; get the result later.
- **Concurrency**: making progress on multiple tasks in the same time window.
- **Parallelism**: tasks truly run at the same time on different CPU cores (threads/processes).

## Browser: single main thread + event loop

### Tasks and microtasks

- JS runs on the main thread.
- **Tasks (macrotasks)**: `setTimeout`, `setInterval`, `postMessage`, `MessageChannel`, etc.
- **Microtasks**: `Promise.then`, `queueMicrotask`, `MutationObserver`.
- Typical order: one task → drain microtasks → (maybe render) → next task.

### “Multitasking” techniques in the browser

- **I/O concurrency**: `fetch`, IndexedDB, WebSocket (handled by browser internals; JS side is Promise/callbacks).
- **Time slicing to keep UI responsive**:
  - `requestAnimationFrame` for frame-aligned work
  - `requestIdleCallback` for low-priority work
  - `setTimeout(fn, 0)` to yield (timing not guaranteed)
- **Real multithreading**: `Web Worker` / `Shared Worker` (separate JS execution context; no DOM access)

## Node.js: event loop + libuv + thread pool

### Where Node’s “async” comes from

- JS still runs on a single thread (the main thread).
- I/O is coordinated by **libuv**:
  - some operations use OS async capabilities
  - some run on a **thread pool** (then callback into the event loop)

### Multithreading vs multiprocessing in Node

- **Multiprocessing**: `child_process`, `cluster`
  - stronger isolation; IPC overhead
- **Multithreading**: `worker_threads`
  - best for CPU-heavy work
  - can use `SharedArrayBuffer` + `Atomics` for shared-memory patterns

## Browser vs Node (summary)

- **Goals**
  - Browser: UI responsiveness, rendering, security isolation
  - Node: throughput, I/O concurrency, stability
- **How to get “threads”**
  - Browser: Worker family (Web/Shared/Service)
  - Node: `worker_threads` / processes
- **What workers can do**
  - Browser workers: no DOM; strict capabilities
  - Node workers: can leverage Node APIs depending on design

## When do you actually need multithreading?

- Use Workers/threads for **CPU-bound** / long-running computations.
- For mostly I/O work, async concurrency is usually enough.
