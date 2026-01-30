# JavaScript Strings: Common Methods and Operations (English)

[中文](/reading-notes/web/js-string.md)

This note summarizes common JS string APIs, operations, and one practice task: sentence-capitalization plus name normalization.

## 0. The right mental model

- **Strings are immutable**: every “mutating” method returns a new string; the original is never changed.
- **Zero-based indexing**: `str[0]` and `str.charAt(0)` are the first character; negative indices in some methods mean “from the end” (e.g. `slice(-1)`).
- **Typical use cases**: slice, split, replace, case conversion, and regex-based match/replace.

## 1. Properties and basics

### 1.1 `length` and indexing

```js
const s = "hello";
s.length;        // 5
s[0];            // "h"
s.charAt(0);     // "h"
s[s.length - 1]; // "o"
```

### 1.2 Iteration

```js
for (const c of "hi") console.log(c); // "h", "i"
[..."hi"];  // ["h", "i"]
```

## 2. Common methods at a glance

| Method | Purpose | Example |
| --- | --- | --- |
| `slice(start, end?)` | Extract substring; supports negative indices | `"abc".slice(1, -1)` → `"b"` |
| `substring(start, end?)` | Extract; negative values treated as 0 | `"abc".substring(1, 2)` → `"b"` |
| `split(sep?, limit?)` | Split by separator into array | `"a,b,c".split(",")` → `["a","b","c"]` |
| `trim()` / `trimStart()` / `trimEnd()` | Remove leading/trailing whitespace | `"  hi  ".trim()` → `"hi"` |
| `toUpperCase()` / `toLowerCase()` | Case conversion for whole string | `"Hi".toLowerCase()` → `"hi"` |
| `charAt(i)` | Character at index i | `"hi".charAt(1)` → `"i"` |
| `concat(...strs)` | Concatenate (often use `+` or template literals) | `"a".concat("b")` → `"ab"` |
| `includes(sub)` / `startsWith(sub)` / `endsWith(sub)` | Contains / starts with / ends with | `"hello".includes("ell")` → `true` |
| `indexOf(sub, from?)` / `lastIndexOf(sub, from?)` | First / last index of substring | `"abca".indexOf("a", 1)` → `3` |
| `repeat(n)` | Repeat string n times | `"ab".repeat(2)` → `"abab"` |
| `padStart(len, pad)` / `padEnd(len, pad)` | Pad to length | `"5".padStart(3, "0")` → `"005"` |

## 3. Replace and search

### 3.1 `replace(searchValue, replacement)`

- **Replaces only the first match** unless `searchValue` is a regex with `g`.
- `replacement` can be a string or a function: `(match, ...groups) => string`.

```js
"a1b2".replace(/\d/, "x");     // "axb2"
"a1b2".replace(/\d/g, "x");    // "axbx"
"hello".replace("l", "L");     // "heLlo"
"hello".replace(/l/g, "L");   // "heLLo"
```

### 3.2 Using a function in `replace` for per-match replacement

```js
"abc-123".replace(/([a-z]+)-(\d+)/, (_, letters, digits) => digits + "-" + letters);
// "123-abc"
```

### 3.3 `search(regexp)`, `match(regexp)`, `matchAll(regexp)`

- `search`: index of first match, or `-1`.
- `match`: without `g`, first match and groups; with `g`, array of all matches (no groups).
- `matchAll`: iterator of matches, each with groups.

```js
"hi 123".search(/\d/);           // 3
"a1b2".match(/\d/g);            // ["1", "2"]
"a1b2".match(/(\d)/g);         // ["1", "2"]
[..."x1y2".matchAll(/(\d)/g)]; // [["1","1"],["2","2"]]
```

## 4. `split` with regex

- `split` can take a regex; **if the regex has capturing groups, the separators appear in the result array**.
- Use this to “split on sentence-ending punctuation but keep the punctuation”.

```js
"a.b.c".split(/\./);              // ["a", "b", "c"]
"a. b. c".split(/(\.)\s*/);       // ["a", ".", "b", ".", "c"]
"Hi. Bye! Ok?".split(/([.!?]\s*)/);
// ["Hi", ". ", "Bye", "! ", "Ok", "? ", ""]
// join with "" to restore punctuation and spaces; pairs of [sentence, separator] follow.
```

Common pattern: split by sentence and keep delimiters:

```js
"First. Second! Third?".split(/([.!?]\s*)/);
// ["First", ". ", "Second", "! ", "Third", "? ", ""]
// odd indices are delimiters; even indices (and trailing "") are sentence content; map then join("")
```

## 5. Practice: sentence-capitalization + name normalization (formatText)

**Requirements**:

1. Capitalize the first letter of each sentence; keep leading spaces (do not trim).
2. Given a list of names, match whole words case-insensitively and normalize to “first letter uppercase, rest lowercase”.

**Approach**:

- Use `split(/([.!?]\s*)/)` to split on sentence-ending punctuation while keeping delimiters; for each segment, find the first letter and uppercase it.
- Use `RegExp("\\b" + name + "\\b", "gi")` for whole-word, case-insensitive match, then `replace` to the normalized form.

**Implementation**:

```js
function formatText(str, names) {
  if (!str) return str;

  // 1. Capitalize first letter of each sentence, keep leading spaces
  let formatted = str
    .split(/([.!?]\s*)/) // keep delimiters
    .map(sentence => {
      if (sentence.trim().length === 0) return sentence; // all spaces/empty: return as-is

      let firstLetterIndex = sentence.search(/[a-zA-Z]/);
      if (firstLetterIndex === -1) return sentence; // no letter: return as-is

      return (
        sentence.slice(0, firstLetterIndex) +
        sentence.charAt(firstLetterIndex).toUpperCase() +
        sentence.slice(firstLetterIndex + 1)
      );
    })
    .join("");

  // 2. Name replacement (case-insensitive → title case)
  names.forEach(name => {
    let regex = new RegExp(`\\b${name}\\b`, "gi");
    formatted = formatted.replace(regex, () => {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    });
  });

  return formatted;
}
```

**Concepts used**:

- `split(/([.!?]\s*)/)`: split by sentence and keep `.!?` and following whitespace.
- `sentence.search(/[a-zA-Z]/)`: index of first letter.
- `slice` + `charAt(...).toUpperCase()` + `slice`: capitalize only the first letter, keep leading spaces.
- `new RegExp("\\b" + name + "\\b", "gi")`: whole-word, case-insensitive; `replace(regex, fn)` to normalize to title case.

**Test**:

```js
const input =
  "  today lucas and joshua go to the grocery store.did they buy any good stuff?  Nobody knows!Only lUcas know it.  Am I right?";
const names = ["lucas", "joshua"];

console.log(formatText(input, names));
// "  Today Lucas and Joshua go to the grocery store.Did they buy any good stuff?  Nobody knows!Only Lucas know it.  Am I right?"
```

- Sentence starts (Today, Did, Nobody, Only, Am) are capitalized; leading spaces kept.
- All occurrences of `lucas` / `lUcas` and `joshua` are normalized to `Lucas` and `Joshua`.

---

**Summary**: String handling = slice, split, replace, toUpperCase/toLowerCase, search/indexOf, plus regex for whole-word / global / keep-delimiter behavior—covers most day-to-day needs.
