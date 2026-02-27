# MVVM 完整示例：用户详情页（用户卡片 + 订单列表）

[English](/reading-notes/android/mvvm-example-user-orders.en.md)

本文给出一个完整的 **用户详情页** 示例：上方是**用户卡片**（基本信息），下方是**该用户的订单列表**。同一功能分别用 **XML** 和 **Jetpack Compose** 实现。

## 页面布局示意

```
┌─────────────────────────────────┐
│  [头像] 姓名  |  ID  |  邮箱     │  ← 用户卡片
│  注册时间 / 会员等级              │
├─────────────────────────────────┤
│  订单列表                        │
│  ┌───────────────────────────┐  │
│  │ 订单 #001  |  2024-01-15  │  │
│  │ ¥299.00   |  已发货       │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ 订单 #002  |  2024-01-20  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

## 1. 数据层：API、Room、Entity

### 1.1 DTO（网络层）

```kotlin
// api/dto/UserDto.kt
data class UserDto(
    val id: String,
    val name: String,
    val email: String,
    val avatarUrl: String?,
    val createdAt: String,
    val membershipLevel: String
)

// api/dto/OrderDto.kt
data class OrderDto(
    val id: String,
    val userId: String,
    val totalAmount: Double,
    val status: String,
    val createdAt: String
)
```

### 1.2 Retrofit API

```kotlin
// api/ApiService.kt
interface ApiService {
    @GET("users/{userId}")
    suspend fun getUser(@Path("userId") userId: String): UserDto

    @GET("users/{userId}/orders")
    suspend fun getOrders(@Path("userId") userId: String): List<OrderDto>
}
```

### 1.3 Room Entity & DAO

```kotlin
// db/entity/UserEntity.kt
@Entity(tableName = "user")
data class UserEntity(
    @PrimaryKey val id: String,
    val name: String,
    val email: String,
    val avatarUrl: String?,
    val createdAt: String,
    val membershipLevel: String,
    @ColumnInfo(name = "updated_at") val updatedAt: Long = System.currentTimeMillis()
)

// db/entity/OrderEntity.kt
@Entity(tableName = "orders", foreignKeys = [
    ForeignKey(entity = UserEntity::class, parentColumns = ["id"], childColumns = ["userId"])
])
data class OrderEntity(
    @PrimaryKey val id: String,
    val userId: String,
    val totalAmount: Double,
    val status: String,
    val createdAt: String,
    @ColumnInfo(name = "updated_at") val updatedAt: Long = System.currentTimeMillis()
)

// db/dao/UserDao.kt
@Dao
interface UserDao {
    @Query("SELECT * FROM user WHERE id = :id")
    fun observeUser(id: String): Flow<UserEntity?>

    @Query("SELECT * FROM user WHERE id = :id")
    suspend fun getUser(id: String): UserEntity?  // 一次性读取，用于缓存检查

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(entity: UserEntity)
}

// db/dao/OrderDao.kt
@Dao
interface OrderDao {
    @Query("SELECT * FROM orders WHERE userId = :userId ORDER BY createdAt DESC")
    fun observeOrdersByUser(userId: String): Flow<List<OrderEntity>>

    @Query("SELECT MAX(updated_at) FROM orders WHERE userId = :userId")
    suspend fun getLastOrderUpdatedAt(userId: String): Long?  // 用于缓存检查

    @Transaction
    suspend fun replaceOrdersForUser(userId: String, entities: List<OrderEntity>) {
        deleteByUser(userId)
        insertAll(entities)
    }

    @Query("DELETE FROM orders WHERE userId = :userId")
    suspend fun deleteByUser(userId: String)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(entities: List<OrderEntity>)
}
```

### 1.4 Database

```kotlin
@Database(entities = [UserEntity::class, OrderEntity::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
    abstract fun orderDao(): OrderDao
}
```

### 1.5 Domain Model

```kotlin
// domain/User.kt
data class User(
    val id: String,
    val name: String,
    val email: String,
    val avatarUrl: String?,
    val createdAt: String,
    val membershipLevel: String
)

// domain/Order.kt
data class Order(
    val id: String,
    val userId: String,
    val totalAmount: Double,
    val status: String,
    val createdAt: String
)
```

---

## 2. 参数驱动数据流 + 缓存策略

### 2.1 参数驱动

**核心**：数据流由**参数**（如 `userId`）驱动，UI 只传入参数并 collect，不调用 `loadUser()` / `initialRefresh()`。

```
userId → ViewModel ─┬→ observeUser(id)     [纯 Flow，只读 DB]
                    ├→ init { refreshIfNeeded(id) }  [显式刷新，SWR]
                    └→ onRefresh { forceRefresh(id) } [下拉刷新]
```

- **语义清晰**：`observe*` 纯读 DB；`refreshIfNeeded`、`forceRefresh` 显式调用，不用 onStart 伪装。

### 2.2 缓存策略（用户与订单分开）

```kotlin
// cache/CachePolicy.kt
enum class CacheStrategy {
    /** 有缓存且未过期则直接用，不请求网络 */
    CACHE_FIRST,
    /** 先展示缓存，若过期则在后台请求网络并更新（Stale-While-Revalidate） */
    STALE_WHILE_REVALIDATE,
    /** 优先网络；失败则用缓存 */
    NETWORK_FIRST
}

data class CachePolicy(
    val strategy: CacheStrategy = CacheStrategy.STALE_WHILE_REVALIDATE,
    val maxAgeMs: Long
) {
    fun isStale(updatedAt: Long): Boolean = System.currentTimeMillis() - updatedAt > maxAgeMs
}

val userCachePolicy = CachePolicy(strategy = CacheStrategy.STALE_WHILE_REVALIDATE, maxAgeMs = 30 * 60 * 1000L)
val orderCachePolicy = CachePolicy(strategy = CacheStrategy.STALE_WHILE_REVALIDATE, maxAgeMs = 5 * 60 * 1000L)
```

### 2.3 Repository 实现（User / Order 拆分）

遵循单一职责，User 与 Order 各自一个 Repository。

```kotlin
// repository/UserRepository.kt
class UserRepository @Inject constructor(
    private val userDao: UserDao,
    private val api: ApiService
) {
    private val mutex = Mutex()
    private val defaultPolicy = CachePolicy(CacheStrategy.STALE_WHILE_REVALIDATE, 30 * 60 * 1000L)

    fun observeUser(userId: String): Flow<User?> = userDao
        .observeUser(userId)
        .map { it?.toDomain() }

    suspend fun refreshIfNeeded(userId: String) {
        refreshIfNeeded(userId, defaultPolicy)
    }

    suspend fun forceRefresh(userId: String) {
        val remote = api.getUser(userId)
        mutex.withLock { userDao.insert(remote.toEntity()) }
    }

    private suspend fun refreshIfNeeded(userId: String, policy: CachePolicy) {
        val user = userDao.getUser(userId)
        if (!shouldFetch(user, policy)) return
        mutex.withLock {
            val u = userDao.getUser(userId)
            if (!shouldFetch(u, policy)) return@withLock
            val remote = api.getUser(userId)
            userDao.insert(remote.toEntity())
        }
    }

    private fun shouldFetch(user: UserEntity?, policy: CachePolicy) = when (policy.strategy) {
        CacheStrategy.NETWORK_FIRST -> true
        else -> user == null || policy.isStale(user.updatedAt)
    }
}

// repository/OrderRepository.kt
class OrderRepository @Inject constructor(
    private val orderDao: OrderDao,
    private val api: ApiService
) {
    private val mutex = Mutex()
    private val defaultPolicy = CachePolicy(CacheStrategy.STALE_WHILE_REVALIDATE, 5 * 60 * 1000L)

    fun observeOrders(userId: String): Flow<List<Order>> = orderDao
        .observeOrdersByUser(userId)
        .map { list -> list.map { it.toDomain() } }

    suspend fun refreshIfNeeded(userId: String) {
        refreshIfNeeded(userId, defaultPolicy)
    }

    suspend fun forceRefresh(userId: String) {
        val orders = api.getOrders(userId)
        mutex.withLock {
            orderDao.replaceOrdersForUser(userId, orders.map { it.toEntity() })
        }
    }

    private suspend fun refreshIfNeeded(userId: String, policy: CachePolicy) {
        val lastAt = orderDao.getLastOrderUpdatedAt(userId) ?: 0L
        if (!shouldFetch(lastAt, policy)) return
        mutex.withLock {
            val at = orderDao.getLastOrderUpdatedAt(userId) ?: 0L
            if (!shouldFetch(at, policy)) return@withLock
            val orders = api.getOrders(userId)
            orderDao.replaceOrdersForUser(userId, orders.map { it.toEntity() })
        }
    }

    private fun shouldFetch(lastAt: Long, policy: CachePolicy) = when (policy.strategy) {
        CacheStrategy.NETWORK_FIRST -> true
        else -> lastAt == 0L || policy.isStale(lastAt)
    }
}
```

| 要点 | 说明 |
|------|------|
| 直接用 Room Flow | 不桥接，保留 `mapLatest`、`retry`、`distinctUntilChanged`、`shareIn` 等 |
| observe 纯读 | `observe*` 只 emit DB，无副作用 |
| SWR | ViewModel 的 init 里 `launch { refreshIfNeeded(id) }`，语义清晰 |
| 双判防重复 | 锁外先判 + 锁内 double-check |
| 不桥接 | 避免用 callbackFlow 包装已有 Flow，保留 operator 链 |

### 2.4 Hilt 注入

```kotlin
@Singleton @Provides
fun provideUserRepository(userDao: UserDao, api: ApiService) =
    UserRepository(userDao, api)

@Singleton @Provides
fun provideOrderRepository(orderDao: OrderDao, api: ApiService) =
    OrderRepository(orderDao, api)
```

### 2.5 Mapper

```kotlin
// mapper/UserMapper.kt
fun UserDto.toEntity() = UserEntity(
    id = id, name = name, email = email, avatarUrl = avatarUrl,
    createdAt = createdAt, membershipLevel = membershipLevel
)

fun UserEntity.toDomain() = User(
    id = id, name = name, email = email, avatarUrl = avatarUrl,
    createdAt = createdAt, membershipLevel = membershipLevel
)

// mapper/OrderMapper.kt
fun OrderDto.toEntity() = OrderEntity(
    id = id, userId = userId, totalAmount = totalAmount,
    status = status, createdAt = createdAt
)

fun OrderEntity.toDomain() = Order(
    id = id, userId = userId, totalAmount = totalAmount,
    status = status, createdAt = createdAt
)
```

---

## 3. ViewModel

### 3.1 泛型 UI State

```kotlin
// ui/UiState.kt
sealed class UiState<out T> {
    data object Loading : UiState<Nothing>()
    data class Success<T>(val data: T) : UiState<T>()
    data class Error(val message: String?) : UiState<Nothing>()
}
```

### 3.2 参数驱动 ViewModel

ViewModel 通过 **SavedStateHandle** 获取 `userId`（由 Nav 路由参数传入），数据流由该参数驱动，无需 UI 调用 `loadUser()` 或 `initialRefresh()`。

```kotlin
// viewmodel/UserDetailViewModel.kt
@HiltViewModel
class UserDetailViewModel @Inject constructor(
    private val userRepository: UserRepository,
    private val orderRepository: OrderRepository,
    savedStateHandle: SavedStateHandle
) : ViewModel() {

    private val userId = savedStateHandle.getStateFlow("userId", "")
        .filter { it.isNotEmpty() }
        .distinctUntilChanged()

    init {
        viewModelScope.launch {
            userId.collectLatest { id ->
                coroutineScope {
                    launch { userRepository.refreshIfNeeded(id) }
                    launch { orderRepository.refreshIfNeeded(id) }
                }
            }
        }
    }

    val userState: StateFlow<UiState<User?>> = userId
        .flatMapLatest { id ->
            userRepository.observeUser(id)
                .map { user -> UiState.Success(user) }
                .catch { emit(UiState.Error(it.message)) }
        }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), UiState.Loading)

    val ordersState: StateFlow<UiState<List<Order>>> = userId
        .flatMapLatest { id ->
            orderRepository.observeOrders(id)
                .map { UiState.Success(it) }
                .catch { emit(UiState.Error(it.message)) }
        }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), UiState.Loading)

    val refreshState = MutableStateFlow(RefreshStatus.Idle)

    fun onRefresh() {
        viewModelScope.launch {
            val id = userId.first()
            refreshState.value = RefreshStatus.Refreshing
            try {
                coroutineScope {
                    awaitAll(
                        async { userRepository.forceRefresh(id) },
                        async { orderRepository.forceRefresh(id) }
                    )
                }
            } finally {
                refreshState.value = RefreshStatus.Idle
            }
        }
    }
}

enum class RefreshStatus { Idle, Refreshing }
```

| 要点 | 说明 |
|------|------|
| userId 前置过滤 | `filter` + `distinctUntilChanged` 统一处理，flatMapLatest 不再判空 |
| collectLatest | userId 切换时取消旧刷新，立即启动新 id 的 refreshIfNeeded |
| 并发刷新 | `coroutineScope { launch + launch }` 用户与订单并行 |
| Success\<User?\> | 无数据时 emit Success(null)，UI 用 placeholder，减少 Loading 分支 |
| awaitAll | 显式等待两个 forceRefresh 完成，语义清晰 |

> **参数注入**：Nav 路由（如 `userDetail/{userId}`）会在进入页面时把 `userId` 写入 SavedStateHandle；若用 Activity + Intent，需通过自定义 ViewModelFactory 将 `intent.getStringExtra("userId")` 放入 `defaultArgs` 的 Bundle。  
> **导入**：`awaitAll` 来自 `kotlinx.coroutines`。

---

## 4. 实现一：XML 布局

### 4.1 Fragment + Nav（参数驱动）

使用 Nav 路由 `userDetail/{userId}`，进入时 `userId` 自动进入 SavedStateHandle，ViewModel 无需 `loadUser()`。

```kotlin
@AndroidEntryPoint
class UserDetailFragment : Fragment() {

    private val viewModel: UserDetailViewModel by viewModels()
    private var _binding: FragmentUserDetailBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?) =
        FragmentUserDetailBinding.inflate(inflater, container, false).also { _binding = it }.root

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        // userId 由 Nav args 注入 SavedStateHandle，数据流自动驱动
        setupSwipeRefresh()
        observeUser()
        observeOrders()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun setupSwipeRefresh() {
        binding.swipeRefresh.setOnRefreshListener { viewModel.onRefresh() }
        viewLifecycleOwner.lifecycleScope.launch {
            viewModel.refreshState.collect { status ->
                binding.swipeRefresh.isRefreshing = (status == RefreshStatus.Refreshing)
            }
        }
    }

    private fun observeUser() {
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.userState.collect { state ->
                    when (state) {
                        is UiState.Loading -> showUserLoading()
                        is UiState.Success -> state.data?.let { showUser(it) } ?: showUserLoading()
                        is UiState.Error -> showUserError(state.message)
                    }
                }
            }
        }
    }

    private fun observeOrders() {
        viewLifecycleOwner.lifecycleScope.launch {
            viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                viewModel.ordersState.collect { state ->
                    when (state) {
                        is UiState.Loading -> showOrdersLoading()
                        is UiState.Success -> showOrders(state.data)
                        is UiState.Error -> showOrdersError(state.message)
                    }
                }
            }
        }
    }

    private fun showUser(user: User) {
        binding.tvUserName.text = user.name
        binding.tvUserEmail.text = user.email
        binding.tvUserLevel.text = user.membershipLevel
        user.avatarUrl?.let { Glide.with(this).load(it).into(binding.ivAvatar) }
    }

    private fun showOrders(orders: List<Order>) {
        (binding.recyclerOrders.adapter as OrderAdapter).submitList(orders)
    }
}
```

### 4.2 Nav 路由

```kotlin
// NavGraph 中：userDetail/{userId} → UserDetailFragment
NavHostController.navigate("userDetail/${userId}")
```

### 4.3 XML 布局

```xml
<!-- res/layout/fragment_user_detail.xml -->
<androidx.swiperefreshlayout.widget.SwipeRefreshLayout
    android:id="@+id/swipeRefresh"
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.coordinatorlayout.widget.CoordinatorLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical">

            <!-- 用户卡片 -->
            <androidx.cardview.widget.CardView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_margin="16dp"
                app:cardCornerRadius="12dp"
                app:cardElevation="4dp">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:orientation="horizontal"
                    android:padding="16dp">

                    <ImageView
                        android:id="@+id/ivAvatar"
                        android:layout_width="56dp"
                        android:layout_height="56dp"
                        android:contentDescription="头像"
                        android:scaleType="centerCrop"/>

                    <LinearLayout
                        android:layout_width="0dp"
                        android:layout_height="wrap_content"
                        android:layout_weight="1"
                        android:layout_marginStart="16dp"
                        android:orientation="vertical">

                        <TextView
                            android:id="@+id/tvUserName"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:textSize="18sp"
                            android:textStyle="bold"/>
                        <TextView
                            android:id="@+id/tvUserEmail"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:textSize="14sp"/>
                        <TextView
                            android:id="@+id/tvUserLevel"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:textSize="12sp"/>
                    </LinearLayout>
                </LinearLayout>
            </androidx.cardview.widget.CardView>

            <!-- 订单列表 -->
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginHorizontal="16dp"
                android:text="订单列表"
                android:textSize="16sp"
                android:textStyle="bold"/>

            <androidx.recyclerview.widget.RecyclerView
                android:id="@+id/recyclerOrders"
                android:layout_width="match_parent"
                android:layout_height="0dp"
                android:layout_weight="1"
                android:layout_marginTop="8dp"
                app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
                tools:listitem="@layout/item_order"/>
        </LinearLayout>
    </androidx.coordinatorlayout.widget.CoordinatorLayout>
</androidx.swiperefreshlayout.widget.SwipeRefreshLayout>
```

### 4.4 RecyclerView Adapter

```kotlin
class OrderAdapter : ListAdapter<Order, OrderAdapter.VH>(OrderDiffCallback()) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
        VH(ItemOrderBinding.inflate(LayoutInflater.from(parent.context), parent, false))

    override fun onBindViewHolder(holder: VH, position: Int) {
        holder.bind(getItem(position))
    }

    class VH(private val binding: ItemOrderBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(order: Order) {
            binding.tvOrderId.text = "订单 #${order.id.takeLast(4)}"
            binding.tvOrderAmount.text = "¥%.2f".format(order.totalAmount)
            binding.tvOrderStatus.text = order.status
            binding.tvOrderDate.text = order.createdAt
        }
    }
}
```

---

## 5. 实现二：Jetpack Compose

### 5.1 Composable Screen

```kotlin
import com.google.accompanist.swiperefresh.SwipeRefresh
import com.google.accompanist.swiperefresh.rememberSwipeRefreshState

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UserDetailScreen(
    viewModel: UserDetailViewModel = hiltViewModel(),
    onBack: () -> Unit
) {
    // userId 由 Nav 路由 userDetail/{userId} 注入 SavedStateHandle，数据流自动驱动

    val userState by viewModel.userState.collectAsStateWithLifecycle()
    val ordersState by viewModel.ordersState.collectAsStateWithLifecycle()
    val isRefreshing by viewModel.refreshState.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("用户详情") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "返回")
                    }
                }
            )
        }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            SwipeRefresh(
                state = rememberSwipeRefreshState(isRefreshing == RefreshStatus.Refreshing),
                onRefresh = { viewModel.onRefresh() }
            ) {
                LazyColumn(modifier = Modifier.fillMaxSize()) {
                item {
                    when (val s = userState) {
                        is UiState.Loading -> UserCardPlaceholder()
                        is UiState.Success -> s.data?.let { UserCard(user = it) } ?: UserCardPlaceholder()
                        is UiState.Error -> ErrorContent(s.message)
                    }
                }
                item {
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        "订单列表",
                        modifier = Modifier.padding(horizontal = 16.dp),
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                }
                when (val s = ordersState) {
                    is UiState.Loading -> item { CircularProgressIndicator(Modifier.padding(32.dp)) }
                    is UiState.Success -> items(s.data) { OrderItem(order = it) }
                    is UiState.Error -> item { ErrorContent(s.message) }
                }
                }
            }
        }
    }
}
```

### 5.2 用户卡片 Composable

```kotlin
@Composable
fun UserCard(user: User) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = RoundedCornerShape(12.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            AsyncImage(
                model = user.avatarUrl,
                contentDescription = "头像",
                modifier = Modifier
                    .size(56.dp)
                    .clip(CircleShape)
            )
            Column(modifier = Modifier.padding(start = 16.dp)) {
                Text(user.name, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                Text(user.email, style = MaterialTheme.typography.bodyMedium)
                Text(user.membershipLevel, style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}

@Composable
fun ErrorContent(message: String?) {
    Text(
        text = message ?: "加载失败",
        modifier = Modifier.padding(16.dp),
        color = MaterialTheme.colorScheme.error
    )
}

@Composable
fun UserCardPlaceholder() {
    Card(modifier = Modifier.padding(16.dp)) {
        Box(modifier = Modifier.size(88.dp).padding(16.dp)) {
            CircularProgressIndicator()
        }
    }
}

@Composable
fun OrderItem(order: Order) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
        shape = RoundedCornerShape(8.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column {
                Text("订单 #${order.id.takeLast(4)}", fontWeight = FontWeight.Medium)
                Text(order.createdAt, style = MaterialTheme.typography.bodySmall)
            }
            Column(horizontalAlignment = Alignment.End) {
                Text("¥%.2f".format(order.totalAmount), fontWeight = FontWeight.Bold)
                Text(order.status, style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
```

### 5.3 依赖

```kotlin
// build.gradle - SwipeRefresh 来自 accompanist 或 Material3
implementation("com.google.accompanist:accompanist-swiperefresh:0.32.0")
// 或 Material3 1.2+
implementation("androidx.compose.material3:material3:1.2.0")
```

---

## 6. 数据流与缓存汇总

### 6.1 参数驱动 + SWR

| 对比 | 阻塞版（隐式 network-first） | SWR 版 |
|------|------------------------------|--------|
| 首帧 | 等网络完成才 emit | 先 emit 缓存，后台刷新 |
| observe | flow { refresh(); emitAll } | dao.onStart { launch { refresh } }.map |

### 6.2 缓存策略与职责

| Repository | 建议 maxAgeMs | 说明 |
|------------|---------------|------|
| UserRepository | 30 分钟 | 变更少，独立缓存 |
| OrderRepository | 5 分钟 | 变更多，独立缓存 |

### 6.3 要点

- **User / Order 拆分**：各一个 Repository，单一职责。
- **SWR**：`onStart { launch { refresh } }` 先展示缓存，再后台更新；Repository 内 defaultPolicy，可 override。
- **下拉刷新**：并行调用 `userRepository.forceRefresh`、`orderRepository.forceRefresh`。
