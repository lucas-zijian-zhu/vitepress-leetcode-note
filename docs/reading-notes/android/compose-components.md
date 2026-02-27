# Jetpack Compose 常用组件速查

[English](/reading-notes/android/compose-components.en.md)

列出常用 Compose 组件及示例，便于快速查阅。

---

## 1. 布局

### Column / Row / Box

```kotlin
@Composable
fun LayoutDemo() {
    Column(
        modifier = Modifier.fillMaxWidth().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("Column: 垂直排列")
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Row: 水平")
            Icon(Icons.Default.Star, contentDescription = null)
        }
        Box(
            modifier = Modifier.size(100.dp).background(Color.LightGray),
            contentAlignment = Alignment.Center
        ) {
            Text("Box: 堆叠")
        }
    }
}
```

### Modifier 常用

```kotlin
Modifier
    .fillMaxWidth()           // 占满宽度
    .fillMaxHeight(0.5f)     // 占 50% 高度
    .padding(16.dp)          // 内边距
    .padding(horizontal = 8.dp, vertical = 4.dp)
    .size(100.dp)            // 固定尺寸
    .widthIn(min = 48.dp)     // 最小宽度
    .clickable { }           // 点击
    .background(Color.Gray)  // 背景
    .clip(RoundedCornerShape(8.dp))  // 圆角裁剪
```

---

## 2. 文本与按钮

### Text

```kotlin
Text(
    text = "Hello Compose",
    style = MaterialTheme.typography.headlineMedium,
    color = MaterialTheme.colorScheme.primary,
    fontWeight = FontWeight.Bold,
    textAlign = TextAlign.Center,
    maxLines = 2,
    overflow = TextOverflow.Ellipsis
)
```

### Button / TextButton / OutlinedButton

```kotlin
Button(
    onClick = { },
    enabled = true,
    modifier = Modifier.fillMaxWidth()
) {
    Text("Primary Button")
}

TextButton(onClick = { }) {
    Text("Text Button")
}

OutlinedButton(onClick = { }) {
    Icon(Icons.Default.Add, contentDescription = null)
    Spacer(Modifier.width(8.dp))
    Text("Outlined")
}
```

### IconButton / FAB

```kotlin
IconButton(onClick = { }) {
    Icon(Icons.Default.Menu, contentDescription = "Menu")
}

FloatingActionButton(onClick = { }) {
    Icon(Icons.Default.Add, contentDescription = "Add")
}
```

---

## 3. 输入

### TextField / OutlinedTextField

```kotlin
var text by remember { mutableStateOf("") }

OutlinedTextField(
    value = text,
    onValueChange = { text = it },
    label = { Text("Label") },
    placeholder = { Text("Placeholder") },
    leadingIcon = { Icon(Icons.Default.Search, null) },
    trailingIcon = {
        IconButton(onClick = { text = "" }) {
            Icon(Icons.Default.Clear, null)
        }
    },
    singleLine = true,
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
    modifier = Modifier.fillMaxWidth()
)
```

---

## 4. 图片与图标

### Image

```kotlin
Image(
    painter = painterResource(R.drawable.ic_launcher),
    contentDescription = "App icon",
    modifier = Modifier.size(64.dp),
    contentScale = ContentScale.Crop
)

// 网络图片（需 Coil 等库）
AsyncImage(
    model = "https://example.com/image.png",
    contentDescription = null,
    modifier = Modifier.fillMaxWidth()
)
```

### Icon

```kotlin
Icon(
    imageVector = Icons.Default.Home,
    contentDescription = "Home",
    tint = MaterialTheme.colorScheme.primary
)
```

---

## 5. 列表

### LazyColumn / LazyRow

```kotlin
LazyColumn(
    modifier = Modifier.fillMaxSize(),
    verticalArrangement = Arrangement.spacedBy(8.dp),
    contentPadding = PaddingValues(16.dp)
) {
    items(100) { index ->
        Text("Item $index")
    }
    item { Spacer(Modifier.height(16.dp)) }
}

LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    items(listOf("A", "B", "C")) { s ->
        Card { Text(s) }
    }
}
```

### items / itemsIndexed

```kotlin
val list = remember { listOf("Apple", "Banana", "Cherry") }

LazyColumn {
    items(list, key = { it }) { item ->
        Text(item)
    }
}

LazyColumn {
    itemsIndexed(list) { index, item ->
        Text("$index: $item")
    }
}
```

---

## 6. 卡片与表面

### Card

```kotlin
Card(
    modifier = Modifier.fillMaxWidth().clickable { },
    shape = RoundedCornerShape(12.dp),
    elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
) {
    Column(Modifier.padding(16.dp)) {
        Text("Card Title", style = MaterialTheme.typography.titleMedium)
        Text("Card content")
    }
}
```

### Surface

```kotlin
Surface(
    modifier = Modifier.padding(8.dp),
    shape = RoundedCornerShape(8.dp),
    color = MaterialTheme.colorScheme.surfaceVariant,
    tonalElevation = 2.dp
) {
    Text("Surface content", Modifier.padding(16.dp))
}
```

---

## 7. 脚手架与导航

### Scaffold + TopAppBar

```kotlin
Scaffold(
    topBar = {
        TopAppBar(
            title = { Text("App Title") },
            navigationIcon = {
                IconButton(onClick = { }) {
                    Icon(Icons.Default.Menu, null)
                }
            },
            actions = {
                IconButton(onClick = { }) {
                    Icon(Icons.Default.Search, null)
                }
            }
        )
    },
    floatingActionButton = {
        FloatingActionButton(onClick = { }) {
            Icon(Icons.Default.Add, null)
        }
    }
) { paddingValues ->
    LazyColumn(
        modifier = Modifier.padding(paddingValues).fillMaxSize()
    ) {
        items(20) { Text("Item $it") }
    }
}
```

### BottomNavigationBar

```kotlin
var selectedIndex by remember { mutableIntStateOf(0) }

Scaffold(
    bottomBar = {
        NavigationBar {
            listOf("Home", "Search", "Profile").forEachIndexed { i, label ->
                NavigationBarItem(
                    selected = selectedIndex == i,
                    onClick = { selectedIndex = i },
                    icon = { Icon(Icons.Default.Home, null) },
                    label = { Text(label) }
                )
            }
        }
    }
) { paddingValues ->
    // content
}
```

---

## 8. 其他常用

### SwipeRefresh

```kotlin
val isRefreshing by viewModel.refreshState.collectAsState()

SwipeRefresh(
    state = rememberSwipeRefreshState(isRefreshing == RefreshStatus.Refreshing),
    onRefresh = { viewModel.onRefresh() }
) {
    LazyColumn { /* ... */ }
}
```

### Slider / Checkbox / Switch

```kotlin
var value by remember { mutableFloatStateOf(0.5f) }
Slider(
    value = value,
    onValueChange = { value = it },
    valueRange = 0f..1f
)

var checked by remember { mutableStateOf(false) }
Checkbox(checked = checked, onCheckedChange = { checked = it })
Switch(checked = checked, onCheckedChange = { checked = it })
```

### Divider / Spacer

```kotlin
Divider(modifier = Modifier.padding(vertical = 8.dp))
Spacer(Modifier.height(16.dp))
Spacer(Modifier.weight(1f))  // 在 Row/Column 中占满剩余空间
```

### CircularProgressIndicator / LinearProgressIndicator

```kotlin
CircularProgressIndicator()
LinearProgressIndicator(progress = { 0.5f })
```

---

## 9. 依赖

```kotlin
// build.gradle.kts
dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
}
```

---

## 10. 速查表

| 组件 | 用途 |
|------|------|
| Column / Row / Box | 布局 |
| Text / Button / IconButton | 文本与按钮 |
| TextField / OutlinedTextField | 输入 |
| Image / Icon | 图片与图标 |
| LazyColumn / LazyRow | 列表 |
| Card / Surface | 卡片与表面 |
| Scaffold / TopAppBar / NavigationBar | 脚手架与导航 |
| SwipeRefresh | 下拉刷新 |
| Slider / Checkbox / Switch | 选择控件 |
| Modifier | 修饰符（padding、clickable 等） |
