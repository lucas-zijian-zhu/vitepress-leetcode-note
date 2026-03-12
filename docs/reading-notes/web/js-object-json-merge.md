# JSON 合并、统计与批量上报

本篇都是**整合 / 统计 / 上报**相关的前端题：

1. **合并**：按 diff 深度合并对象（`null` 删 key，嵌套对象递归 patch）。
2. **统计**：解析后的 Map 递归数「数据点」个数（`getDataPoints`）。
3. **上报**：内存队列攒事件，满条数或定时 flush，批量 POST。

---

## 题目 1：按 diff 合并两个 Map（mergeMaps）

**要做什么**  
在「原始对象」上应用「增量对象」，得到更新后的对象（类似 patch）。

**输入**  
`original`、`diff`；`diff` 里值为 `null` 表示删除该 key；双方同 key 均为纯对象则递归合并，否则覆盖。

**输出**  
合并后的新对象。

**示例**

```text
original = { name: "Lucas", age: 35, location: "Vancouver" }
diff     = { age: null, location: "Burnaby", newField: "value" }
输出     = { name: "Lucas", location: "Burnaby", newField: "value" }
```

::: code-group

```js [JavaScript]
function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function mergeMaps(original, diff) {
  const result = { ...original };
  for (const key of Object.keys(diff)) {
    const diffValue = diff[key];
    if (diffValue === null) {
      delete result[key];
    } else if (isPlainObject(diffValue) && isPlainObject(result[key])) {
      result[key] = mergeMaps(result[key], diffValue);
    } else {
      result[key] = diffValue;
    }
  }
  return result;
}

const original = { name: 'Lucas', age: 35, location: 'Vancouver' };
const diff = { age: null, location: 'Burnaby', newField: 'value' };
console.log(JSON.stringify(mergeMaps(original, diff)));
```

```kotlin [Kotlin]
fun mergeMaps(originalMap: Map<String, Any?>, diffMap: Map<String, Any?>): Map<String, Any?> {
    val result = originalMap.toMutableMap()
    for ((key, diffValue) in diffMap) {
        when {
            diffValue == null -> result.remove(key)
            result[key] is Map<*, *> && diffValue is Map<*, *> ->
                result[key] = mergeMaps(
                    result[key] as Map<String, Any?>,
                    diffValue as Map<String, Any?>
                )
            else -> result[key] = diffValue
        }
    }
    return result
}
```

:::

---

## 题目 2：统计嵌套结构里的「数据点」个数（getDataPoints）

**要做什么**  
JSON 解析成 `Map<String, Any?>` 后，按约定递归统计，返回整数。

**约定**  
value 是 Map → 递归；是 List 且首元素是 Map → 只递归首元素；其余叶子计 1；不满足的 List 该 key 不计。

**扩展**：List 里每个 Map 都统计则改为遍历累加。

::: code-group

```js [JavaScript]
function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function getDataPoints(userMap) {
  let count = 0;
  for (const value of Object.values(userMap)) {
    if (isPlainObject(value)) {
      count += getDataPoints(value);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      isPlainObject(value[0])
    ) {
      count += getDataPoints(value[0]);
    } else if (!Array.isArray(value)) {
      count += 1;
    }
  }
  return count;
}
```

```kotlin [Kotlin]
import com.google.gson.Gson

fun getDataPoints(userMap: Map<String, Any?>): Int {
    var count = 0
    for ((_, value) in userMap) {
        when (value) {
            is Map<*, *> -> {
                @Suppress("UNCHECKED_CAST")
                count += getDataPoints(value as Map<String, Any?>)
            }
            is List<*> -> {
                if (value.isNotEmpty() && value[0] is Map<*, *>) {
                    @Suppress("UNCHECKED_CAST")
                    count += getDataPoints(value[0] as Map<String, Any?>)
                }
            }
            else -> count++
        }
    }
    return count
}

// val userResponse = gson.fromJson(jsonString, Map::class.java) as Map<String, Any?>
// println(getDataPoints(userResponse))
```

:::

---

## 题目 3：事件队列 + 定时 flush 批量上报

**要做什么**  
`track(event)` 入队；**队列达到条数**或**定时**批量 POST；`setupSDK` 配置、`cleanup` 清定时器并 flush 剩余。

**输入 / 行为**

- `setupSDK(apiKey, flushQueueSize?, flushIntervalMillis?)`：重复调用时先 `clearInterval` 再设新定时器。
- `track(event)`：入队；满则 push 后立刻 `flush`。
- `cleanup()`：`clearInterval` + 发送剩余队列。

**输出**  
`{ api_key, events: [...] }` POST `https://api2.amplitude.com/2/httpapi`。

**要点**  
flush 时先拷贝再清空；异步 send 失败若未重试则事件已丢，可在 catch 里回灌队列或死信。

```js
let apiKey;
let flushQueueSize = 10;
let flushIntervalMillis = 10000;
let eventsQueue = [];
let flushTimer = null;

export function setupSDK(_apiKey, _flushQueueSize = 10, _flushIntervalMillis = 10000) {
  apiKey = _apiKey;
  flushQueueSize = _flushQueueSize;
  flushIntervalMillis = _flushIntervalMillis;
  if (flushTimer) clearInterval(flushTimer);
  flushTimer = setInterval(() => {
    if (eventsQueue.length > 0) flushEvents();
  }, flushIntervalMillis);
}

export function track(event) {
  if (eventsQueue.length < flushQueueSize - 1) {
    eventsQueue.push(event);
  } else {
    eventsQueue.push(event);
    flushEvents();
  }
}

function flushEvents() {
  if (eventsQueue.length === 0) return;
  const eventsToSend = [...eventsQueue];
  eventsQueue.length = 0;
  sendAmplitudeEvent(eventsToSend);
}

async function sendAmplitudeEvent(_events) {
  const events = _events.map((eventType) => ({
    user_id: '203201202',
    device_id: 'C8F9E604-F01A-4BD9-95C6-8E5357DF265D',
    event_type: eventType,
  }));
  const payload = { api_key: apiKey, events };
  try {
    const response = await fetch('https://api2.amplitude.com/2/httpapi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
    console.log('Events sent:', await response.json());
  } catch (e) {
    console.error('Failed to send:', e);
  }
}

export function cleanup() {
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
  if (eventsQueue.length > 0) flushEvents();
}
```

---

## 延伸阅读

- [Promise](./promise.md)
- [JS 练习笔记（函数、数组、异步）](./js-practice-notes.md)
