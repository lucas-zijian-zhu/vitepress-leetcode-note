# JS 多任务与多线程：浏览器 vs Node.js

[English](/reading-notes/web/js-multithreading.en.md)

这篇讲“JS 怎么做多任务处理”和“什么情况下才算多线程”。先分清：**异步 ≠ 多线程**。

## 先明确概念：异步、并发、并行

- **异步（async）**：发起操作后不阻塞当前执行，结果未来某个时刻回来
- **并发（concurrency）**：同一时间段推进多个任务（不等于同一时刻真的同时跑）
- **并行（parallelism）**：同一时刻在多个 CPU 核上同时执行（通常需要多线程/多进程）

## 浏览器：单线程主线程 + 事件循环

### 事件循环与任务队列

- JS 主线程执行同步代码
- **宏任务（task）**：`setTimeout`、`setInterval`、`postMessage`、`MessageChannel` 等
- **微任务（microtask）**：`Promise.then`、`queueMicrotask`、`MutationObserver`
- 常见执行顺序：执行一个宏任务 → 清空微任务队列 → 渲染（可能）→ 下一个宏任务

### 浏览器中的“多任务处理”手段

- **I/O 并发**：`fetch`、IndexedDB、WebSocket（底层由浏览器线程/进程实现，JS 侧是异步回调/Promise）
- **切片避免卡顿**：
  - `requestAnimationFrame`：每帧前执行（适合动画/视觉更新前准备）
  - `requestIdleCallback`：浏览器空闲时执行（适合低优先级任务）
  - `setTimeout(fn, 0)`：让出主线程（精度不保证）
- **真正多线程**：`Web Worker` / `Shared Worker`（另起线程跑 JS，不阻塞主线程）

## Node.js：事件循环 + libuv + 线程池

### Node 的“异步”来自哪里

- Node 仍然是单线程执行 JS（主线程）
- I/O 由 **libuv** 协调：
  - 一部分 I/O 走 OS 异步能力
  - 一部分（例如某些文件系统/加密/压缩等）走 **线程池**，完成后回调到事件循环

### Node 的“多线程/多进程”选择

- **多进程**：`child_process`、`cluster`
  - 隔离更强、稳定性好；进程间通信成本更高
- **多线程**：`worker_threads`
  - 适合 CPU 密集型（压缩、图像处理、大量计算）
  - 可配合 `SharedArrayBuffer` + `Atomics` 做更底层的共享内存同步

## 浏览器 vs Node：差异总结

- **目标不同**
  - 浏览器：UI 响应、渲染与安全隔离优先
  - Node：吞吐、I/O 并发与服务稳定优先
- **多线程方式不同**
  - 浏览器：Worker 家族（Web/Shared/Service）
  - Node：`worker_threads` / 多进程
- **Worker 能做的事不同**
  - 浏览器 Worker 受同源/能力限制（无 DOM）
  - Node worker 可访问 Node API（取决于设计），更适合后端计算任务

## 何时需要“多线程”

- **适合多线程/Worker**：CPU 密集、长时间计算、需要不阻塞 UI/主线程
- **不需要多线程**：主要是 I/O（网络请求、数据库、文件读写）——用异步并发即可

下一篇会专门把 Web Worker / Shared Worker / Service Worker 逐一讲透。
