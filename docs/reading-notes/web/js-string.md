# JavaScript 字符串：常用方法与操作整理（中文）

[English](/reading-notes/web/js-string.en.md)

本篇整理 JS 字符串的常规用法、操作方法，以及一道综合题（句首大写 + 名字替换）。

## 0. 先建立正确心智

- **字符串是不可变的**：所有“修改”操作都返回新字符串，不改变原串。
- **索引从 0 开始**：`str[0]`、`str.charAt(0)` 取第一个字符；负索引在部分方法里表示“从末尾数”（如 `slice(-1)`）。
- **常用场景**：截取、分割、替换、大小写、与正则配合做匹配/替换。

## 1. 属性与基础

### 1.1 `length`、索引

```js
const s = "hello";
s.length;        // 5
s[0];            // "h"
s.charAt(0);     // "h"
s[s.length - 1]; // "o"
```

### 1.2 遍历

```js
for (const c of "hi") console.log(c); // "h", "i"
[..."hi"];  // ["h", "i"]
```

## 2. 常用方法速览

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `slice(start, end?)` | 截取子串，支持负索引 | `"abc".slice(1, -1)` → `"b"` |
| `substring(start, end?)` | 截取，负值当 0 | `"abc".substring(1, 2)` → `"b"` |
| `split(sep?, limit?)` | 按分隔符拆成数组 | `"a,b,c".split(",")` → `["a","b","c"]` |
| `trim()` / `trimStart()` / `trimEnd()` | 去首尾空白 | `"  hi  ".trim()` → `"hi"` |
| `toUpperCase()` / `toLowerCase()` | 全串大小写 | `"Hi".toLowerCase()` → `"hi"` |
| `charAt(i)` | 取第 i 个字符 | `"hi".charAt(1)` → `"i"` |
| `concat(...strs)` | 拼接（多用 `+` 或模板字符串） | `"a".concat("b")` → `"ab"` |
| `includes(sub)` / `startsWith(sub)` / `endsWith(sub)` | 是否包含/开头/结尾 | `"hello".includes("ell")` → `true` |
| `indexOf(sub, from?)` / `lastIndexOf(sub, from?)` | 子串首次/末次下标 | `"abca".indexOf("a", 1)` → `3` |
| `repeat(n)` | 重复 n 次 | `"ab".repeat(2)` → `"abab"` |
| `padStart(len, pad)` / `padEnd(len, pad)` | 补足长度 | `"5".padStart(3, "0")` → `"005"` |

## 3. 替换与查找

### 3.1 `replace(searchValue, replacement)`

- **只替换第一个匹配**（除非 `searchValue` 是带 `g` 的正则）。
- `replacement` 可以是字符串或函数：`(match, ...groups) => string`。

```js
"a1b2".replace(/\d/, "x");     // "axb2"
"a1b2".replace(/\d/g, "x");    // "axbx"
"hello".replace("l", "L");     // "heLlo"
"hello".replace(/l/g, "L");   // "heLLo"
```

### 3.2 `replace` 用函数做“按匹配替换”

```js
"abc-123".replace(/([a-z]+)-(\d+)/, (_, letters, digits) => digits + "-" + letters);
// "123-abc"
```

### 3.3 `search(regexp)`、`match(regexp)`、`matchAll(regexp)`

- `search`：返回第一个匹配的索引，没有则 `-1`。
- `match`：无 `g` 时返回第一个匹配及分组；有 `g` 时返回所有匹配组成的数组（无分组）。
- `matchAll`：返回匹配的迭代器，每个元素含分组。

```js
"hi 123".search(/\d/);           // 3
"a1b2".match(/\d/g);            // ["1", "2"]
"a1b2".match(/(\d)/g);         // ["1", "2"]
[..."x1y2".matchAll(/(\d)/g)]; // [["1","1"],["2","2"]]
```

## 4. 与正则配合的 split

- `split` 可以传正则，**若正则里带捕获组，分隔符也会出现在结果数组中**。
- 利用这一点可以“按句号/问号/感叹号分句，但保留标点”。

```js
"a.b.c".split(/\./);              // ["a", "b", "c"]
"a. b. c".split(/(\.)\s*/);       // ["a", ".", "b", ".", "c"]
"Hi. Bye! Ok?".split(/([.!?]\s*)/);
// ["Hi", ". ", "Bye", "! ", "Ok", "? ", ""]
// 用空串 join 即可还原标点和空格，再按“每两块为一组”可得到 [句子, 分隔符] 对
```

更常见的“按句分割且保留分隔符”写法：

```js
"First. Second! Third?".split(/([.!?]\s*)/);
// ["First", ". ", "Second", "! ", "Third", "? ", ""]
// 奇数下标是分隔符，偶数下标（及末尾空）是句子内容，可 map 处理每句再 join("")
```

## 5. 实践：句首大写 + 名字规范化（formatText）

**需求**：

1. 每句首字母大写，保留前导空格（不把空格 trim 掉）。
2. 给定名字列表，在文本中忽略大小写匹配整词，并统一替换成“首字母大写、其余小写”。

**思路**：

- 用 `split(/([.!?]\s*)/)` 按句号/问号/感叹号分句并保留分隔符，然后对每一段找第一个字母并大写。
- 用 `RegExp("\\b" + name + "\\b", "gi")` 做整词、忽略大小写匹配，再 `replace` 成规范格式。

**实现**：

```js
function formatText(str, names) {
  if (!str) return str;

  // 1. 每句首字母大写，但保留前导空格
  let formatted = str
    .split(/([.!?]\s*)/) // 保留分隔符
    .map(sentence => {
      if (sentence.trim().length === 0) return sentence; // 全是空格/空的话直接返回

      // 找到第一个字母字符的位置
      let firstLetterIndex = sentence.search(/[a-zA-Z]/);
      if (firstLetterIndex === -1) return sentence; // 如果没有字母，原样返回

      return (
        sentence.slice(0, firstLetterIndex) +
        sentence.charAt(firstLetterIndex).toUpperCase() +
        sentence.slice(firstLetterIndex + 1)
      );
    })
    .join("");

  // 2. 名字替换（忽略大小写，替换成首字母大写）
  names.forEach(name => {
    let regex = new RegExp(`\\b${name}\\b`, "gi");
    formatted = formatted.replace(regex, () => {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    });
  });

  return formatted;
}
```

**用到的点**：

- `split(/([.!?]\s*)/)`：按句分割并保留 `.!?` 及后跟空白。
- `sentence.search(/[a-zA-Z]/)`：找到第一个字母下标。
- `slice` + `charAt(...).toUpperCase()` + `slice`：只把首字母变大写，前导空格保留。
- `new RegExp("\\b" + name + "\\b", "gi")`：整词、忽略大小写；`replace(regex, fn)` 统一成首字母大写。

**测试**：

```js
const input =
  "  today lucas and joshua go to the grocery store.did they buy any good stuff?  Nobody knows!Only lUcas know it.  Am I right?";
const names = ["lucas", "joshua"];

console.log(formatText(input, names));
// "  Today Lucas and Joshua go to the grocery store.Did they buy any good stuff?  Nobody knows!Only Lucas know it.  Am I right?"
```

- 句首（Today, Did, Nobody, Only, Am）大写，前导空格保留。
- 文中 `lucas` / `lUcas`、`joshua` 均被规范为 `Lucas`、`Joshua`。

---

小结：字符串处理 = 截取（`slice`）、分割（`split`）、替换（`replace`）、大小写（`toUpperCase`/`toLowerCase`）、查找（`search`/`indexOf`），再配合正则做整词/多匹配/保留分隔符等，即可覆盖大部分业务场景。
