# Vue 练习笔记（受控表单、计时器、Todo）

题目顺序与 [React 练习笔记](./react-practice-notes.md) 对齐：**1 下拉 → 2 输入 → 3 正计时 → 3b 倒计时 → 4 Todo → 5 防抖 → 6 计数器 → 7 网格**。RN 无网格题可跳过题目 7。

每题一段**可直接运行的完整单文件组件**（Vue 3 + `<script setup>`）。**正计时**用 `watch` + `onCleanup`；**倒计时**用 `onUnmounted` + `clearTimer`；Todo 用 `trim`、id、稳定 `key`。

---

## 题目 1：受控下拉框（Select）

```vue
<template>
  <div>
    <select v-model="selected">
      <option value="" disabled>Please select</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <p v-if="selected">What you selected is {{ selected }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const options = ['Banana', 'Apple', 'Orange'];
const selected = ref('');
</script>
```

---

## 题目 2：受控输入与即时展示

```vue
<template>
  <div>
    <input v-model="myText" placeholder="Please input" />
    <p v-if="myText">What you input is {{ myText }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const myText = ref('');
</script>
```

---

## 题目 3：计时器（start / pause / reset）

用 `watch(isRunning, …, onCleanup)`：`isRunning` 为 true 时 `setInterval`，**每次重新执行或卸载前** `onCleanup` 里 `clearInterval`，避免暂停后仍累加或内存泄漏。

```vue
<template>
  <div>
    <div>{{ timeString }}</div>
    <div class="row">
      <button type="button" @click="isRunning = true">start</button>
      <button type="button" @click="isRunning = false">pause</button>
      <button type="button" @click="reset">reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const timer = ref(0);
const isRunning = ref(false);

watch(
  isRunning,
  (running, _prev, onCleanup) => {
    if (!running) return;
    const id = setInterval(() => {
      timer.value += 1;
    }, 1000);
    onCleanup(() => clearInterval(id));
  }
);

function reset() {
  isRunning.value = false;
  timer.value = 0;
}

const timeString = computed(() => {
  const s = timer.value % 60;
  const m = Math.floor((timer.value / 60) % 60);
  const h = Math.floor(timer.value / 3600);
  return `${String(h).padStart(2, '0')} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
});
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
</style>
```

---

## 题目 3b：倒计时器（Start / Pause / Resume / Reset）

与**正计时**对照：用 `remainingTime` 递减；`input` 用 **`v-model.number`** 绑定数字。定时器用 **`let timer` + `clearInterval`** 时，**Resume 前必须先 `clearInterval`**，避免重复 `setInterval`；**`onUnmounted`** 再清一次，防止离开页面后仍跑。

```vue
<template>
  <div class="timer">
    <h2>{{ formattedTime }}</h2>
    <div class="input">
      <label>Set time (seconds): </label>
      <input v-model.number="inputSeconds" type="number" min="1" />
    </div>
    <div class="controls">
      <button
        type="button"
        :disabled="isRunning || inputSeconds <= 0"
        @click="startTimer"
      >
        Start
      </button>
      <button
        type="button"
        :disabled="remainingTime === 0"
        @click="togglePauseResume"
      >
        {{ isRunning ? 'Pause' : (remainingTime < totalTime ? 'Resume' : 'Pause') }}
      </button>
      <button type="button" @click="resetTimer">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';

const inputSeconds = ref(60);
const totalTime = ref(60);
const remainingTime = ref(60);
const isRunning = ref(false);
let timer = null;

function clearTimer() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

function startTimer() {
  if (isRunning.value || inputSeconds.value <= 0) return;
  clearTimer();
  totalTime.value = inputSeconds.value;
  remainingTime.value = totalTime.value;
  isRunning.value = true;
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      pauseTimer();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning.value = false;
  clearTimer();
}

function togglePauseResume() {
  if (remainingTime.value === 0) return;
  if (isRunning.value) {
    pauseTimer();
  } else {
    isRunning.value = true;
    clearTimer(); // 防止重复 interval
    timer = setInterval(() => {
      if (remainingTime.value > 0) {
        remainingTime.value--;
      } else {
        pauseTimer();
      }
    }, 1000);
  }
}

function resetTimer() {
  pauseTimer();
  remainingTime.value = totalTime.value;
}

const formattedTime = computed(() => {
  const m = String(Math.floor(remainingTime.value / 60)).padStart(2, '0');
  const s = String(remainingTime.value % 60).padStart(2, '0');
  return `${m}:${s}`;
});

onUnmounted(() => clearTimer());
</script>

<style scoped>
.timer { text-align: center; padding: 20px; }
.input { margin-bottom: 15px; }
.controls button { margin: 0 8px; padding: 6px 12px; }
</style>
```

---

## 题目 4：Todo 列表（增删）

```vue
<template>
  <div>
    <div class="row">
      <input
        v-model="todo"
        placeholder="Add todo"
        @keydown.enter="addTodo"
      />
      <button type="button" @click="addTodo">Add</button>
    </div>
    <ul>
      <li v-for="item in todoList" :key="item.id" class="row">
        <span>{{ item.text }}</span>
        <button type="button" @click="removeTodo(item.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let nextId = 0;
const todo = ref('');
const todoList = ref([]);

function addTodo() {
  const text = todo.value.trim();
  if (!text) return;
  todoList.value = [...todoList.value, { id: ++nextId, text }];
  todo.value = '';
}

function removeTodo(id) {
  todoList.value = todoList.value.filter((t) => t.id !== id);
}
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}
</style>
```

---

## 题目 5：防抖搜索（500ms）

`watch(query)` 里 `setTimeout`，`onCleanup` 里 `clearTimeout`；防抖后的值再 `watch` 一次去请求接口。

```vue
<template>
  <div class="wrap">
    <input
      v-model="query"
      placeholder="输入搜索内容"
      class="input"
    />
    <p>实时输入：{{ query }}</p>
    <p>防抖后：{{ debouncedQuery }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const query = ref('');
const debouncedQuery = ref('');

watch(
  query,
  (_q, _prev, onCleanup) => {
    const id = setTimeout(() => {
      debouncedQuery.value = query.value;
    }, 500);
    onCleanup(() => clearTimeout(id));
  }
);

watch(debouncedQuery, (q) => {
  if (q) console.log('触发搜索:', q);
});
</script>

<style scoped>
.wrap { padding: 20px; }
.input { display: block; margin-bottom: 8px; padding: 8px; width: 280px; }
</style>
```

Todo 里 **`@keydown.enter` / `@keyup.enter`** 均可；列表删除建议用 **id + filter**（见上），避免 `:key="index"` + `splice` 在重复文案时错位。

---

## 题目 6：计数器（+ / -）

模板里可直接写 `count++` / `count--`（ref 在模板自动解包）。与 [React Native 题目 6](./react-native-practice-notes.md) 对齐。

```vue
<template>
  <div class="wrap">
    <h2>Counter: {{ count }}</h2>
    <button type="button" @click="count--">-</button>
    <span class="gap" />
    <button type="button" @click="count++">+</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>

<style scoped>
.wrap { padding: 20px; text-align: center; }
.gap { display: inline-block; width: 10px; }
</style>
```

---

## 题目 7：二维网格 + 列状态（柱状图点击）

**考点：** 嵌套 `v-for`、`row/col` 索引、用**一维数组表示每列高度**，点击列递增；`getStyle` 根据列高度算是否涂色。

```vue
<template>
  <div class="board">
    <div v-for="row in rows" :key="row" class="row">
      <div
        v-for="col in cols"
        :key="col"
        class="cell"
        :style="getStyle(row - 1, col - 1)"
        @click="handleClick(col - 1)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const rows = 10;
const cols = 10;
// 每列已点亮的格数（从底往上）
const colCounts = ref(Array(cols).fill(0));

function handleClick(colIndex) {
  if (colCounts.value[colIndex] < rows) {
    colCounts.value[colIndex]++;
  }
}

function getStyle(row, col) {
  const blueCount = colCounts.value[col];
  const isBlue = row >= rows - blueCount;
  return {
    width: '30px',
    height: '30px',
    border: '1px solid #aaa',
    backgroundColor: isBlue ? 'steelblue' : '#fff',
    cursor: 'pointer',
  };
}
</script>

<style scoped>
.board { display: inline-block; border: 1px solid #ccc; }
.row { display: flex; }
</style>
```

---

## 延伸阅读

- [React 练习笔记（受控组件、计时器、Todo）](./react-practice-notes.md)
- [JS 练习笔记（函数、数组、异步）](./js-practice-notes.md)
