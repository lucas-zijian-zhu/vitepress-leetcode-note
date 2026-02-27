# JavaScript 练习笔记：函数、数组、异步

本篇整理 JS 中常见模式：柯里化、数组变换、对象聚合、以及 async/await + Promise.all 的用法。

---

## 1. 函数：柯里化与可变参数

### 1.1 普通二元函数

```js
function sum(x, y) {
  return x + y;
}
sum(1, 2); // 3
```

### 1.2 柯里化（Currying）

返回一个接收剩余参数的函数，实现「分步传参」：

```js
function altSum(x) {
  return function (y) {
    return sum(x, y);
  };
}
altSum(1)(2); // 3
```

### 1.3 可变参数：rest + reduce

```js
function nSum(...arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}
nSum(1, 2, 3, 4); // 10
```

| 要点 | 说明 |
|------|------|
| `...arr` | rest 参数，将多余实参收集为数组 |
| `reduce((acc, curr) => ..., init)` | 从左到右聚合，`init` 为初始值 |

---

## 2. 数组：map 与字符串拼接

### 2.1 提取作者全名

```js
// authors = [{ firstName, lastName, nationality }, ...]
function authorNames() {
  return authors.map((obj) => `${obj.firstName} ${obj.lastName}`);
}
// ['Robert Frost', 'Philip Dick', ...]
```

### 2.2 列表句：最后一项加 "and ... are authors."

```js
function authorsAreAuthors() {
  const results = authors.map((obj, index) => {
    if (index !== authors.length - 1) {
      return `${obj.firstName} ${obj.lastName}`;
    } else {
      return `and ${obj.firstName} ${obj.lastName} are authors.`;
    }
  });
  return results.join(", ");
}
// "Robert Frost, Philip Dick, and Emily Dickinson are authors."
```

### 2.3 过滤 + 拼接：美国作者

```js
function americanAuthors() {
  const americans = authors.filter((a) => a.nationality === "American");
  const names = americans.map((a) => `${a.firstName} ${a.lastName}`);
  if (names.length === 0) return "";
  if (names.length === 1) return `${names[0]} is an American author.`;
  const last = names.pop();
  return `${names.join(", ")}, and ${last} are American authors.`;
}
```

| 方法 | 作用 |
|------|------|
| `map(fn)` | 每个元素映射为新值 |
| `filter(pred)` | 保留满足条件的元素 |
| `join(sep)` | 数组元素用分隔符拼接成字符串 |

---

## 3. 对象聚合：按国籍分组

目标结构：

```js
{
  French: { authors: ['Albert Camus'], count: 1 },
  American: { authors: ['Robert Frost', ...], count: 3 },
  ...
}
```

```js
function authorNationality() {
  const result = {};
  for (const author of authors) {
    if (!result[author.nationality]) {
      result[author.nationality] = { authors: [], count: 0 };
    }
    result[author.nationality].authors.push(
      `${author.firstName} ${author.lastName}`
    );
    result[author.nationality].count += 1;
  }
  return result;
}
```

或用 `reduce` 实现：

```js
function authorNationality() {
  return authors.reduce((acc, author) => {
    const key = author.nationality;
    if (!acc[key]) acc[key] = { authors: [], count: 0 };
    acc[key].authors.push(`${author.firstName} ${author.lastName}`);
    acc[key].count += 1;
    return acc;
  }, {});
}
```

---

## 4. 异步：fetch + Promise.all

### 4.1 获取列表

```js
async function getPokemon() {
  const r = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
  const data = await r.json();
  return data.results; // [{ name, url }, ...]
}
```

### 4.2 并发请求详情

对每个 Pokemon 再请求详情，用 `Promise.all` 并行：

```js
async function displayPokemon() {
  const pokemons = await getPokemon();
  const results = await Promise.all(
    pokemons.map((p) =>
      fetch(p.url)
        .then((res) => res.json())
        .then((att) => ({
          name: p.name,
          height: att.height,
          weight: att.weight,
          img: att.sprites.front_default,
        }))
    )
  );
  return results;
}
```

等价写法（async/await）：

```js
async function displayPokemon() {
  const pokemons = await getPokemon();
  const results = await Promise.all(
    pokemons.map(async (p) => {
      const res = await fetch(p.url);
      const att = await res.json();
      return {
        name: p.name,
        height: att.height,
        weight: att.weight,
        img: att.sprites.front_default,
      };
    })
  );
  return results;
}
```

| 要点 | 说明 |
|------|------|
| `Promise.all(arr)` | 等待所有 Promise 完成，返回结果数组；任一失败则整体失败 |
| `map` 返回 Promise 数组 | `pokemons.map(async (p) => ...)` 得到 `Promise<T>[]` |
| `fetch().then(r => r.json())` | 先拿 Response，再解析 JSON |

---

## 5. 小结

| 主题 | 常用 API |
|------|----------|
| 柯里化 | 返回 `(y) => f(x, y)` |
| 数组变换 | `map`、`filter`、`reduce` |
| 字符串 | 模板字符串、`join` |
| 对象聚合 | `for...of` + 判空初始化，或 `reduce` |
| 异步并发 | `async/await` + `Promise.all` |
