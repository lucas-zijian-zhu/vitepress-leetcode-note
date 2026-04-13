# Remaining Leaves After Wind (Custom — Matrix + Prefix Bounds) <Badge type="warning" text="Medium" />

You are given a grid of size <code>height × width</code>. Each cell <code>leaves[r][c]</code> holds a non-negative integer: how many leaf piles sit on that cell.

A list <code>winds</code> describes global shifts. Each character moves **every** pile on the grid by one step in that direction at that moment:

- <code>'U'</code>: row <code>-1</code>
- <code>'D'</code>: row <code>+1</code>
- <code>'L'</code>: col <code>-1</code>
- <code>'R'</code>: col <code>+1</code>

A pile that **ever** leaves the rectangle <code>[0, height - 1] × [0, width - 1]</code> is blown away and contributes nothing to the answer.

Return the **total number of leaves** that remain after all winds, i.e. the sum of <code>leaves[r][c]</code> over all cells <code>(r, c)</code> such that a pile starting at <code>(r, c)</code> would stay inside the grid for **every** prefix of the wind sequence.

**Example 1:**

```
height = 3, width = 3
leaves = [[1,0,0],[0,2,0],[0,0,1]]
winds = ["R", "D"]
Output: 3
Explanation: Cumulative offsets are (0,0), (0,1), (1,1).
Valid starts: rows [0,1], cols [0,1] (maxDc = 1).
Sum leaves in the 2 by 2 rectangle = 1 + 0 + 0 + 2 = 3.
```

**Constraints:**

- <code>1 ≤ height, width ≤ 500</code>
- <code>0 ≤ leaves[r][c]</code>
- <code>winds</code> length ≤ 10<sup>5</sup>

## Approach: Simulation + Min/Max Prefix Displacement

### Intuition

- Let <code>(dr, dc)</code> be the **cumulative** displacement after processing winds from the start.
- After each wind, update <code>dr, dc</code> and track:
  - <code>minDr, maxDr</code> — smallest and largest row offset seen so far
  - <code>minDc, maxDc</code> — same for columns
- A start cell <code>(r, c)</code> stays valid iff for **every** moment, <code>r + dr'</code> and <code>c + dc'</code> are in bounds. That is equivalent to:
  - <code>r + minDr ≥ 0</code> and <code>r + maxDr ≤ height - 1</code>
  - <code>c + minDc ≥ 0</code> and <code>c + maxDc ≤ width - 1</code>
- So valid <code>r</code> lie in <code>[max(0, -minDr), min(height - 1, height - 1 - maxDr)]</code>, and similarly for <code>c</code>.
- If the interval is empty, return <code>0</code>; else sum <code>leaves[r][c]</code> over the rectangle.

### Complexity

- **Time:** <code>O(|winds| + height × width)</code> for the nested loops; can be reduced to <code>O(|winds| + height + width)</code> with a **2D prefix sum** on <code>leaves</code> for the final rectangle sum.
- **Space:** <code>O(1)</code> extra (excluding input).

### Related Ideas

- Same “prefix min/max of position” trick as staying inside a bounded grid while executing moves (cf. [2120. Execution of All Suffix Instructions Staying in a Grid](https://leetcode.com/problems/execution-of-all-suffix-instructions-staying-in-a-grid/description/) — different query, similar displacement reasoning).
- Category: **matrix**, **simulation**, **prefix bounds**.

## Code

::: code-group

```typescript [TypeScript]
function remainingLeaves(
    width: number,
    height: number,
    leaves: number[][],
    winds: string[]
): number {
    let dr = 0,
        dc = 0;
    let minDr = 0,
        maxDr = 0;
    let minDc = 0,
        maxDc = 0;

    for (const w of winds) {
        if (w === "U") dr--;
        else if (w === "D") dr++;
        else if (w === "L") dc--;
        else if (w === "R") dc++;

        minDr = Math.min(minDr, dr);
        maxDr = Math.max(maxDr, dr);
        minDc = Math.min(minDc, dc);
        maxDc = Math.max(maxDc, dc);
    }

    const rowStart = Math.max(0, -minDr);
    const rowEnd = Math.min(height - 1, height - 1 - maxDr);
    const colStart = Math.max(0, -minDc);
    const colEnd = Math.min(width - 1, width - 1 - maxDc);

    if (rowStart > rowEnd || colStart > colEnd) {
        return 0;
    }

    let count = 0;
    for (let r = rowStart; r <= rowEnd; r++) {
        for (let c = colStart; c <= colEnd; c++) {
            count += leaves[r][c];
        }
    }

    return count;
}
```

```kotlin [Kotlin]
fun remainingLeaves(
    width: Int,
    height: Int,
    leaves: Array<IntArray>,
    winds: List<Char>
): Int {
    var dr = 0
    var dc = 0
    var minDr = 0
    var maxDr = 0
    var minDc = 0
    var maxDc = 0

    for (w in winds) {
        when (w) {
            'U' -> dr--
            'D' -> dr++
            'L' -> dc--
            'R' -> dc++
        }
        minDr = minOf(minDr, dr)
        maxDr = maxOf(maxDr, dr)
        minDc = minOf(minDc, dc)
        maxDc = maxOf(maxDc, dc)
    }

    val rowStart = maxOf(0, -minDr)
    val rowEnd = minOf(height - 1, height - 1 - maxDr)
    val colStart = maxOf(0, -minDc)
    val colEnd = minOf(width - 1, width - 1 - maxDc)

    if (rowStart > rowEnd || colStart > colEnd) return 0

    var count = 0
    for (r in rowStart..rowEnd) {
        for (c in colStart..colEnd) {
            count += leaves[r][c]
        }
    }
    return count
}
```

```java [Java]
class Solution {
    public int remainingLeaves(int width, int height, int[][] leaves, char[] winds) {
        int dr = 0, dc = 0;
        int minDr = 0, maxDr = 0;
        int minDc = 0, maxDc = 0;

        for (char w : winds) {
            if (w == 'U') dr--;
            else if (w == 'D') dr++;
            else if (w == 'L') dc--;
            else if (w == 'R') dc++;

            minDr = Math.min(minDr, dr);
            maxDr = Math.max(maxDr, dr);
            minDc = Math.min(minDc, dc);
            maxDc = Math.max(maxDc, dc);
        }

        int rowStart = Math.max(0, -minDr);
        int rowEnd = Math.min(height - 1, height - 1 - maxDr);
        int colStart = Math.max(0, -minDc);
        int colEnd = Math.min(width - 1, width - 1 - maxDc);

        if (rowStart > rowEnd || colStart > colEnd) return 0;

        int count = 0;
        for (int r = rowStart; r <= rowEnd; r++) {
            for (int c = colStart; c <= colEnd; c++) {
                count += leaves[r][c];
            }
        }
        return count;
    }
}
```

```swift [Swift]
func remainingLeaves(
    _ width: Int,
    _ height: Int,
    _ leaves: [[Int]],
    _ winds: [Character]
) -> Int {
    var dr = 0, dc = 0
    var minDr = 0, maxDr = 0
    var minDc = 0, maxDc = 0

    for w in winds {
        switch w {
        case "U": dr -= 1
        case "D": dr += 1
        case "L": dc -= 1
        case "R": dc += 1
        default: break
        }
        minDr = min(minDr, dr)
        maxDr = max(maxDr, dr)
        minDc = min(minDc, dc)
        maxDc = max(maxDc, dc)
    }

    let rowStart = max(0, -minDr)
    let rowEnd = min(height - 1, height - 1 - maxDr)
    let colStart = max(0, -minDc)
    let colEnd = min(width - 1, width - 1 - maxDc)

    if rowStart > rowEnd || colStart > colEnd { return 0 }

    var count = 0
    for r in rowStart...rowEnd {
        for c in colStart...colEnd {
            count += leaves[r][c]
        }
    }
    return count
}
```

```python [Python]
def remaining_leaves(width: int, height: int, leaves: list[list[int]], winds: list[str]) -> int:
    dr = dc = 0
    min_dr = max_dr = min_dc = max_dc = 0

    for w in winds:
        if w == "U":
            dr -= 1
        elif w == "D":
            dr += 1
        elif w == "L":
            dc -= 1
        elif w == "R":
            dc += 1
        min_dr = min(min_dr, dr)
        max_dr = max(max_dr, dr)
        min_dc = min(min_dc, dc)
        max_dc = max(max_dc, dc)

    row_start = max(0, -min_dr)
    row_end = min(height - 1, height - 1 - max_dr)
    col_start = max(0, -min_dc)
    col_end = min(width - 1, width - 1 - max_dc)

    if row_start > row_end or col_start > col_end:
        return 0

    total = 0
    for r in range(row_start, row_end + 1):
        for c in range(col_start, col_end + 1):
            total += leaves[r][c]
    return total
```

:::

### Time and Space Complexity

| Type | Value | Notes |
|------|--------|--------|
| **Time** | `O(\|winds\| + height × width)` | Linear scan of winds; rectangle sum over valid cells. |
| **Space** | `O(1)` | Only a few scalars besides input. |
