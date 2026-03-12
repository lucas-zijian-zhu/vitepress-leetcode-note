# React Native 练习笔记

与 Web 对齐的前 6 题：**1 下拉 → 2 输入 → 3 正计时 → 4 Todo → 5 防抖 → 6 计数器**。Web 另有 **3b 倒计时**、**题目 7 网格**（DOM 专用）；RN 用 **题目 3 正计时** 即可，倒计时可对照 Vue 3b 自行改写；**题目 7 起**（Tabs / Modal / 网络等）为 RN 扩展。

每题为**完整可运行组件**（Expo / RN CLI 均可）。`useEffect` 里定时器必须在 cleanup 里 `clear`；列表用稳定 `key`（id）；`TextInput` 用 `value` + `onChangeText`。

---

## 题目 1：下拉选择（对应 Web 受控 Select）

RN 无原生 `<select>`，用 **TouchableOpacity + Modal + FlatList** 实现同类交互。

```jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

const options = ['苹果', '香蕉', '橘子'];

export default function Dropdown() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('请选择');

  return (
    <View>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.trigger}
      >
        <Text>{selected}</Text>
      </TouchableOpacity>
      {selected !== '请选择' && (
        <Text style={{ marginTop: 8 }}>What you selected is {selected}</Text>
      )}

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.sheet} onStartShouldSetResponder={() => true}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelected(item);
                    setVisible(false);
                  }}
                  style={styles.item}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: { padding: 10, borderWidth: 1 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  sheet: { backgroundColor: 'white', marginHorizontal: 50 },
  item: { padding: 15, borderBottomWidth: 1 },
});
```

---

## 题目 2：受控输入与即时展示

**考点：** `useState`、受控组件；RN 用 `onChangeText`，没有 `e.target.value`。

```jsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function InputPreview() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Please input"
        value={value}
        onChangeText={setValue}
      />
      {value !== '' && (
        <Text style={styles.label}>What you input is {value}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  label: { marginTop: 10 },
});
```

---

## 题目 3：计时器（start / pause / reset）

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec / 60) % 60);
    const s = sec % 60;
    return `${String(h).padStart(2, '0')} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      <View style={styles.buttonRow}>
        <Button title="Start" onPress={() => setIsRunning(true)} />
        <Button title="Pause" onPress={() => setIsRunning(false)} />
        <Button
          title="Reset"
          onPress={() => {
            setIsRunning(false);
            setSeconds(0);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timerText: { fontSize: 36, marginBottom: 20 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', width: '80%' },
});
```

---

## 题目 4：Todo 列表（增删 + 完成切换）

**考点：** `trim`、`id` + `keyExtractor`、函数式 `setTodos`。

```jsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function TodoList() {
  const idRef = useRef(0);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    const id = ++idRef.current;
    setTodos((prev) => [...prev, { id, text, done: false }]);
    setInput('');
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Add a new task"
        style={styles.input}
      />
      <Button title="Add" onPress={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)} style={{ flex: 1 }}>
              <Text style={item.done ? styles.done : null}>{item.text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeTodo(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, marginVertical: 10, padding: 5 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  done: { textDecorationLine: 'line-through', color: '#999' },
  delete: { color: 'red' },
});
```

---

## 题目 5：防抖搜索（500ms）

与 React / Vue 笔记同一套路：`useEffect` + `setTimeout`，cleanup 里 `clearTimeout`。

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      console.log('触发搜索:', debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="输入搜索内容"
        value={query}
        onChangeText={setQuery}
      />
      <Text>实时输入：{query}</Text>
      <Text>防抖后：{debouncedQuery}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
});
```

---

## 题目 6：计数器（+ / -）

```jsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counter: {count}</Text>
      <Button title="-" onPress={() => setCount((c) => c - 1)} />
      <View style={{ height: 10 }} />
      <Button title="+" onPress={() => setCount((c) => c + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  text: { fontSize: 24, marginBottom: 10 },
});
```

---

## 题目 7：Tab 切换

```jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const tabs = ['Home', 'Profile', 'Settings'];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab ? styles.tabActive : styles.tabInactive,
            ]}
          >
            <Text style={{ color: activeTab === tab ? '#fff' : '#000' }}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'Home' && <Text>🏠 Welcome to Home Page</Text>}
      {activeTab === 'Profile' && <Text>👤 Here is your Profile</Text>}
      {activeTab === 'Settings' && <Text>⚙️ Adjust your Settings here</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  tabRow: { flexDirection: 'row', marginBottom: 20 },
  tab: { padding: 10, marginHorizontal: 5, borderRadius: 4 },
  tabActive: { backgroundColor: '#1890ff' },
  tabInactive: { backgroundColor: '#eee' },
});
```

---

## 题目 8：Modal 弹窗（遮罩关闭 + Android 返回键）

```jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function ModalExample() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.openBtn}>
        <Text style={{ color: '#fff' }}>Open Modal</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalRoot}>
          <Pressable style={styles.overlay} onPress={() => setVisible(false)} />
          <View style={styles.modalCenter} pointerEvents="box-none">
            <View style={styles.modalContent}>
              <Text style={styles.title}>Modal Title</Text>
              <Text>This is the modal content.</Text>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles.closeBtn}
              >
                <Text style={{ color: '#fff' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  openBtn: {
    backgroundColor: '#1890ff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  modalRoot: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCenter: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    minWidth: 280,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  closeBtn: {
    marginTop: 16,
    backgroundColor: '#1890ff',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
});
```

---

## 题目 9：REST API 拉取列表

**考点：** `useEffect`、`fetch`、loading / error、`cancelled`。

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = await res.json();
        if (!cancelled) setUsers(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Text style={styles.item}>{item.name} — {item.email}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  error: { padding: 20, color: 'red' },
});
```

---

## 题目 10：分页（每页 10 条）

```jsx
import React, { useState, useMemo } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const PAGE_SIZE = 10;
const allData = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
}));

export default function PaginatedList() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(allData.length / PAGE_SIZE);
  const pageData = useMemo(() => {
    const start = page * PAGE_SIZE;
    return allData.slice(start, start + PAGE_SIZE);
  }, [page]);

  return (
    <View style={styles.container}>
      <FlatList
        data={pageData}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
      <View style={styles.row}>
        <Button
          title="Prev"
          disabled={page === 0}
          onPress={() => setPage((p) => Math.max(0, p - 1))}
        />
        <Text>
          {page + 1} / {totalPages}
        </Text>
        <Button
          title="Next"
          disabled={page >= totalPages - 1}
          onPress={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 10, borderBottomWidth: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
```

---

## 题目 11：自定义 Hook useWindowSize（Dimensions）

```jsx
import { useState, useEffect } from 'react';
import { Dimensions, View, Text } from 'react-native';

export function useWindowSize() {
  const [size, setSize] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setSize({ width: window.width, height: window.height });
    });
    return () => sub?.remove?.();
  }, []);

  return size;
}

export function WindowSizeDemo() {
  const { width, height } = useWindowSize();
  return (
    <View style={{ padding: 20 }}>
      <Text>width: {width}</Text>
      <Text>height: {height}</Text>
    </View>
  );
}
```

---

## 延伸阅读

- [React 练习笔记](./react-practice-notes.md)
- [Vue 练习笔记](./vue-practice-notes.md)
