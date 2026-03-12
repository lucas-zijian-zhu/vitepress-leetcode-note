# React 练习笔记（受控组件、计时器、Todo）

题目顺序与 [Vue 练习笔记](./vue-practice-notes.md)、[React Native 练习笔记](./react-native-practice-notes.md) **前 6 题对齐**：

**1 下拉 → 2 输入 → 3 正计时 → 3b 倒计时 → 4 Todo → 5 防抖 → 6 计数器 → 7 网格（Web 专用，RN 无对应可跳过）**

每题为**可直接运行的完整组件**；倒计时与正计时都用 **`useEffect` + `isRunning`**，cleanup 里 **`clearInterval`**；Todo 用 **`setState(prev => ...)`** 与稳定 **`key`**。

---

## 题目 1：受控下拉框（Select）

Amazon 类考题常见写法：`value` + `onChange`，占位 `disabled`，中文文案可照搬。

```tsx
import { useState } from 'react';

const options = ['苹果', '香蕉', '橘子'];

export default function FruitSelect() {
  const [selected, setSelected] = useState('');

  return (
    <div>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{ padding: '8px', border: '1px solid #aaa' }}
      >
        <option value="" disabled>
          请选择
        </option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {selected !== '' && <p>你选择了：{selected}</p>}
    </div>
  );
}
```

---

## 题目 2：受控输入与即时展示

Web 用 **`e.target.value`**；下方可始终展示一行，也可用 `value && <p>…` 按需显示。

```tsx
import { useState } from 'react';

export default function InputPreview() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: 20 }}>
      <input
        style={{
          height: 40,
          border: '1px solid gray',
          padding: '0 10px',
        }}
        placeholder="请输入内容"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p style={{ marginTop: 10 }}>当前输入内容：{value}</p>
    </div>
  );
}
```

---

## 题目 3：正计时（start / pause / reset）

与 3b 相同：**只在 `useEffect` 里 `setInterval`，用局部变量 `id`，cleanup 里 `clearInterval(id)`**，无需 `useRef`。

```tsx
import { useState, useEffect } from 'react';

function formatTime(totalSeconds: number): string {
  const hour = Math.floor(totalSeconds / 3600);
  const minute = Math.floor((totalSeconds / 60) % 60);
  const second = totalSeconds % 60;
  return `${hour.toString().padStart(2, '0')} : ${minute
    .toString()
    .padStart(2, '0')} : ${second.toString().padStart(2, '0')}`;
}

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  return (
    <div>
      <div>{formatTime(seconds)}</div>
      <div>
        <button type="button" onClick={() => setIsRunning(true)}>start</button>
        <button type="button" onClick={() => setIsRunning(false)}>pause</button>
        <button
          type="button"
          onClick={() => {
            setIsRunning(false);
            setSeconds(0);
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
}
```

---

## 题目 3b：倒计时（Start / Pause / Resume / Reset）

`isRunning` 驱动 `useEffect` 里 `setInterval`；**pause 时 effect 重跑，cleanup 会 `clearInterval`**，不必 `useRef`，用 **effect 内局部变量 `id`** 即可。`remainingTime` 用函数式更新；到 0 时 `setIsRunning(false)`。

```tsx
import { useState, useEffect, type CSSProperties } from 'react';

export default function CountdownTimer() {
  const [inputSeconds, setInputSeconds] = useState(60);
  const [totalTime, setTotalTime] = useState(60);
  const [remainingTime, setRemainingTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    if (isRunning || inputSeconds <= 0) return;
    setTotalTime(inputSeconds);
    setRemainingTime(inputSeconds);
    setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);

  const togglePauseResume = () => {
    if (remainingTime === 0) return;
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    pauseTimer();
    setRemainingTime(totalTime);
  };

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev > 0) return prev - 1;
        setIsRunning(false);
        return 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  const formattedTime = () => {
    const m = String(Math.floor(remainingTime / 60)).padStart(2, '0');
    const s = String(remainingTime % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div style={styles.container}>
      <h2>{formattedTime()}</h2>
      <div style={styles.inputContainer}>
        <label>Set time (seconds): </label>
        <input
          type="number"
          min={1}
          value={inputSeconds}
          onChange={(e) => setInputSeconds(Number(e.target.value))}
          style={styles.input}
        />
      </div>
      <div style={styles.buttons}>
        <button type="button" onClick={startTimer} disabled={isRunning || inputSeconds <= 0}>
          Start
        </button>
        <button type="button" onClick={togglePauseResume} disabled={remainingTime === 0}>
          {isRunning ? 'Pause' : remainingTime < totalTime ? 'Resume' : 'Pause'}
        </button>
        <button type="button" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

const styles: { [k: string]: CSSProperties } = {
  container: { textAlign: 'center', fontFamily: 'sans-serif', padding: 20 },
  inputContainer: { marginBottom: 15 },
  input: { width: 80, textAlign: 'center', padding: 4 },
  buttons: { display: 'flex', justifyContent: 'center', gap: 10 },
};
```

---

## 题目 4：Todo 列表（增删）

用 **`setTodoList(prev => ...)`** 与 **`key={id}`**；`onKeyDown` Enter 提交。

```tsx
import { useState, useRef } from 'react';

type TodoItem = { id: number; text: string };

export default function TodoList() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const idRef = useRef(0);

  function addTodo() {
    const text = newTodo.trim();
    if (text === '') return;
    const id = ++idRef.current;
    setTodoList((prev) => [...prev, { id, text }]);
    setNewTodo('');
  }

  function removeTodo(id: number) {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Todo List</h2>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Add a new task"
        style={{ border: '1px solid #ccc', padding: 5 }}
      />
      <button type="button" onClick={addTodo} style={{ marginLeft: 5 }}>Add</button>
      <ul style={{ marginTop: 10, padding: 0, listStyle: 'none' }}>
        {todoList.map((item) => (
          <li
            key={item.id}
            style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}
          >
            <span>{item.text}</span>
            <button type="button" onClick={() => removeTodo(item.id)} style={{ color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 题目 5：防抖搜索（500ms）

```tsx
import { useState, useEffect } from 'react';

export default function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) console.log('触发搜索:', debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div style={{ padding: 20 }}>
      <input
        placeholder="输入搜索内容"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ display: 'block', marginBottom: 8, padding: 8, width: 280 }}
      />
      <p>实时输入：{query}</p>
      <p>防抖后：{debouncedQuery}</p>
    </div>
  );
}
```

---

## 题目 6：计数器（+ / -）

与 Vue / RN **题目 6** 对齐。

```tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Counter: {count}</h2>
      <button type="button" onClick={() => setCount((c) => c - 1)}>-</button>
      <span style={{ margin: '0 10px' }} />
      <button type="button" onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}
```

---

## 题目 7：二维网格柱状（Remitly 类题）

**考点：** `colCounts` 一维数组表示每列「已点亮」格数；**`setColCounts(prev => ...)`** 函数式更新，避免闭包陈旧；从底部向上蓝：`row >= ROWS - blueCount`。

```tsx
import { useState } from 'react';

const ROWS = 10;
const COLS = 10;

export default function Grid() {
  const [colCounts, setColCounts] = useState(() => Array(COLS).fill(0));

  const handleClick = (colIndex: number) => {
    setColCounts((prev) => {
      const next = [...prev];
      if (next[colIndex] < ROWS) next[colIndex] += 1;
      return next;
    });
  };

  return (
    <div style={{ display: 'inline-block', border: '1px solid #ccc' }}>
      {Array.from({ length: ROWS }).map((_, row) => (
        <div key={row} style={{ display: 'flex' }}>
          {Array.from({ length: COLS }).map((_, col) => {
            const blueCount = colCounts[col];
            const isBlue = row >= ROWS - blueCount;
            return (
              <div
                key={col}
                role="button"
                tabIndex={0}
                onClick={() => handleClick(col)}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(col)}
                style={{
                  width: 30,
                  height: 30,
                  border: '1px solid #aaa',
                  backgroundColor: isBlue ? 'blue' : 'white',
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
```

---

## 延伸阅读

- [Vue 练习笔记](./vue-practice-notes.md)
- [React Native 练习笔记](./react-native-practice-notes.md)
- [JS 练习笔记（函数、数组、异步）](./js-practice-notes.md)
- [Promise](./promise.md)
