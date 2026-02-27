# Nuclear Transformation (Custom — BFS Shortest Path)

<Badge type="warning" text="Medium" />

You are given an initial nuclear state `(protonsStart, neutronsStart)` and a target state `(protonsTarget, neutronsTarget)`. You can perform one of three operations:

1. **PROTON**: Add 1 proton — `(p, n) → (p + 1, n)`
2. **NEUTRON**: Add 1 neutron — `(p, n) → (p, n + 1)`
3. **ALPHA**: Emit an alpha particle (2 protons + 2 neutrons) — `(p, n) → (p - 2, n - 2)`

Some states are **unstable** and cannot be visited (obstacles). Find the **shortest sequence** of operations to reach the target from the start. Return the list of operation names; if impossible, return an empty list.

**Constraints:**

- `0 <= protons <= 29`, `0 <= neutrons <= 19`
- At most 1000 steps
- Start and target are valid (not unstable)

**Example 1:**

```
Input: protonsStart = 0, neutronsStart = 0, protonsTarget = 2, neutronsTarget = 1, unstableAtoms = []
Output: ["PROTON", "PROTON", "NEUTRON"]
Explanation: (0,0) → PROTON → (1,0) → PROTON → (2,0) → NEUTRON → (2,1)
```

**Example 2:**

```
Input: protonsStart = 2, neutronsStart = 2, protonsTarget = 4, neutronsTarget = 3, unstableAtoms = [[3,2]]
Output: ["NEUTRON", "PROTON", "PROTON"]
Explanation: (3,2) is unstable. Path: (2,2) → NEUTRON → (2,3) → PROTON → (3,3) → PROTON → (4,3)
```

## 💡 Approach: BFS (Shortest Path)

### Intuition

This is a **shortest path** problem in an implicit graph:

- **Nodes**: valid states `(protons, neutrons)` in bounds and not in `unstableAtoms`
- **Edges**: one operation (PROTON / NEUTRON / ALPHA) between adjacent states
- **Goal**: minimum number of operations from start to target

BFS is the right choice because each move has cost 1; BFS guarantees the first time we reach the target is the shortest path.

### Algorithm

1. Use a **queue** of `(protons, neutrons, path)`.
2. **Visited** set/matrix to avoid cycles.
3. For each state, try all 3 moves; if the new state is valid and unvisited, enqueue with extended path.
4. If path length exceeds 1000, skip.
5. Return path when target is reached; return `[]` if queue empties.

### Key Points

- Unstable atoms = obstacles; check before enqueueing.
- Keep `visited` to avoid infinite loops.
- BFS ensures shortest path for unweighted graph.

## Code

::: code-group

```typescript [TypeScript]
function solve(
    protonsStart: number,
    neutronsStart: number,
    protonsTarget: number,
    neutronsTarget: number,
    unstableAtoms: number[][]
): string[] {
    const walls = new Set(unstableAtoms.map(([p, n]) => `${p},${n}`));
    const visited = Array.from({ length: 30 }, () => Array(20).fill(false));
    const queue: [number, number, string[]][] = [];

    queue.push([protonsStart, neutronsStart, []]);
    visited[protonsStart][neutronsStart] = true;

    while (queue.length > 0) {
        const [p, n, path] = queue.shift()!;

        if (p === protonsTarget && n === neutronsTarget) {
            return path;
        }

        const moves: [number, number, string][] = [
            [p + 1, n, "PROTON"],
            [p, n + 1, "NEUTRON"],
            [p - 2, n - 2, "ALPHA"],
        ];

        for (const [np, nn, action] of moves) {
            if (np < 0 || np >= 30 || nn < 0 || nn >= 20) continue;
            if (walls.has(`${np},${nn}`)) continue;
            if (visited[np][nn]) continue;

            const newPath = [...path, action];
            if (newPath.length > 1000) continue;

            visited[np][nn] = true;
            queue.push([np, nn, newPath]);
        }
    }

    return [];
}
```

```kotlin [Kotlin]
fun solve(
    protonsStart: Int,
    neutronsStart: Int,
    protonsTarget: Int,
    neutronsTarget: Int,
    unstableAtoms: List<List<Int>>
): List<String> {
    val walls = unstableAtoms.map { Pair(it[0], it[1]) }.toHashSet()
    val visited = Array(30) { BooleanArray(20) }
    val queue: ArrayDeque<Triple<Int, Int, List<String>>> = ArrayDeque()

    queue.add(Triple(protonsStart, neutronsStart, emptyList()))
    visited[protonsStart][neutronsStart] = true

    while (queue.isNotEmpty()) {
        val (p, n, path) = queue.removeFirst()

        if (p == protonsTarget && n == neutronsTarget) {
            return path
        }

        val moves = listOf(
            Triple(p + 1, n, "PROTON"),
            Triple(p, n + 1, "NEUTRON"),
            Triple(p - 2, n - 2, "ALPHA")
        )

        for ((np, nn, action) in moves) {
            if (np !in 0 until 30 || nn !in 0 until 20) continue
            if (Pair(np, nn) in walls) continue
            if (visited[np][nn]) continue

            val newPath = path + action
            if (newPath.size > 1000) continue

            visited[np][nn] = true
            queue.add(Triple(np, nn, newPath))
        }
    }

    return emptyList()
}
```

```java [Java]
class Solution {
    public List<String> solve(
        int protonsStart, int neutronsStart,
        int protonsTarget, int neutronsTarget,
        List<List<Integer>> unstableAtoms
    ) {
        Set<String> walls = new HashSet<>();
        for (List<Integer> a : unstableAtoms) {
            walls.add(a.get(0) + "," + a.get(1));
        }
        boolean[][] visited = new boolean[30][20];
        Queue<State> queue = new ArrayDeque<>();
        queue.offer(new State(protonsStart, neutronsStart, new ArrayList<>()));
        visited[protonsStart][neutronsStart] = true;

        int[][] deltas = {{1, 0}, {0, 1}, {-2, -2}};
        String[] actions = {"PROTON", "NEUTRON", "ALPHA"};

        while (!queue.isEmpty()) {
            State cur = queue.poll();
            int p = cur.p, n = cur.n;
            List<String> path = cur.path;

            if (p == protonsTarget && n == neutronsTarget) {
                return path;
            }

            for (int i = 0; i < 3; i++) {
                int np = p + deltas[i][0], nn = n + deltas[i][1];
                if (np < 0 || np >= 30 || nn < 0 || nn >= 20) continue;
                if (walls.contains(np + "," + nn)) continue;
                if (visited[np][nn]) continue;

                List<String> newPath = new ArrayList<>(path);
                newPath.add(actions[i]);
                if (newPath.size() > 1000) continue;

                visited[np][nn] = true;
                queue.offer(new State(np, nn, newPath));
            }
        }
        return new ArrayList<>();
    }

    private static class State {
        int p, n;
        List<String> path;
        State(int p, int n, List<String> path) {
            this.p = p;
            this.n = n;
            this.path = path;
        }
    }
}
```

```swift [Swift]
func solve(
    protonsStart: Int,
    neutronsStart: Int,
    protonsTarget: Int,
    neutronsTarget: Int,
    unstableAtoms: [[Int]]
) -> [String] {
    let walls = Set(unstableAtoms.map { "\($0[0]),\($0[1])" })
    var visited = [[Bool]](repeating: [Bool](repeating: false, count: 20), count: 30)
    var queue: [(Int, Int, [String])] = []
    queue.append((protonsStart, neutronsStart, []))
    visited[protonsStart][neutronsStart] = true

    while !queue.isEmpty {
        let (p, n, path) = queue.removeFirst()

        if p == protonsTarget && n == neutronsTarget {
            return path
        }

        let moves: [(Int, Int, String)] = [
            (p + 1, n, "PROTON"),
            (p, n + 1, "NEUTRON"),
            (p - 2, n - 2, "ALPHA"),
        ]

        for (np, nn, action) in moves {
            if np < 0 || np >= 30 || nn < 0 || nn >= 20 { continue }
            if walls.contains("\(np),\(nn)") { continue }
            if visited[np][nn] { continue }

            var newPath = path + [action]
            if newPath.count > 1000 { continue }

            visited[np][nn] = true
            queue.append((np, nn, newPath))
        }
    }

    return []
}
```

```python [Python]
def solve(
    protons_start: int,
    neutrons_start: int,
    protons_target: int,
    neutrons_target: int,
    unstable_atoms: list[list[int]],
) -> list[str]:
    walls = {(a[0], a[1]) for a in unstable_atoms}
    visited = [[False] * 20 for _ in range(30)]
    from collections import deque

    queue = deque([(protons_start, neutrons_start, [])])
    visited[protons_start][neutrons_start] = True

    while queue:
        p, n, path = queue.popleft()

        if p == protons_target and n == neutrons_target:
            return path

        for np, nn, action in [
            (p + 1, n, "PROTON"),
            (p, n + 1, "NEUTRON"),
            (p - 2, n - 2, "ALPHA"),
        ]:
            if np < 0 or np >= 30 or nn < 0 or nn >= 20:
                continue
            if (np, nn) in walls:
                continue
            if visited[np][nn]:
                continue

            new_path = path + [action]
            if len(new_path) > 1000:
                continue

            visited[np][nn] = True
            queue.append((np, nn, new_path))

    return []
```

:::

## Complexity

- **Time:** O(30 × 20) = O(600) — each state visited at most once
- **Space:** O(600) for visited + queue
