# MVVM Complete Example: User Detail Screen (User Card + Order List)

[中文](/reading-notes/android/mvvm-example-user-orders.md)

This article provides a complete **user detail screen** example: a **user card** (basic info) at the top and an **order list** for that user below. The same feature is implemented in both **XML** and **Jetpack Compose**.

## Layout Sketch

```
┌─────────────────────────────────┐
│  [Avatar] Name  |  ID  |  Email │  ← User card
│  Created At / Membership Level  │
├─────────────────────────────────┤
│  Order List                      │
│  ┌───────────────────────────┐  │
│  │ Order #001  |  2024-01-15 │  │
│  │ ¥299.00     |  Shipped    │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ Order #002  |  2024-01-20 │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

## 1. Data Layer: API, Room, Entity

### 1.1 DTO (Network Layer)

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
    suspend fun getUser(id: String): UserEntity?  // One-shot read for cache check

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(entity: UserEntity)
}

// db/dao/OrderDao.kt
@Dao
interface OrderDao {
    @Query("SELECT * FROM orders WHERE userId = :userId ORDER BY createdAt DESC")
    fun observeOrdersByUser(userId: String): Flow<List<OrderEntity>>

    @Query("SELECT MAX(updated_at) FROM orders WHERE userId = :userId")
    suspend fun getLastOrderUpdatedAt(userId: String): Long?  // For cache check

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

## 2. Parameter-Driven Data Flow + Cache Strategy

### 2.1 Parameter-Driven

**Core idea**: Data flow is driven by **parameters** (e.g. `userId`). The UI only passes parameters and collects; it does not call `loadUser()` or `initialRefresh()`.

```
userId → ViewModel ─┬→ observeUser(id)     [Pure Flow, read DB only]
                    ├→ init { refreshIfNeeded(id) }  [Explicit refresh, SWR]
                    └→ onRefresh { forceRefresh(id) } [Pull-to-refresh]
```

- **Clear semantics**: `observe*` reads DB only; `refreshIfNeeded`, `forceRefresh` are called explicitly, no `onStart` disguise.

### 2.2 Cache Strategy (User and Orders Separate)

```kotlin
// cache/CachePolicy.kt
enum class CacheStrategy {
    /** Use cache if valid, no network request */
    CACHE_FIRST,
    /** Show cache first, revalidate in background if stale (Stale-While-Revalidate) */
    STALE_WHILE_REVALIDATE,
    /** Prefer network; fallback to cache on failure */
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

### 2.3 Repository Implementation (User / Order Split)

Single responsibility: separate User and Order repositories.

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

| Point | Description |
|-------|--------------|
| Use Room Flow directly | No bridging; keep `mapLatest`, `retry`, `distinctUntilChanged`, `shareIn` etc. |
| observe is read-only | `observe*` only emits from DB, no side effects |
| SWR | ViewModel init: `launch { refreshIfNeeded(id) }`, clear semantics |
| Double-check to avoid duplicates | Check outside lock + double-check inside lock |
| No bridging | Avoid wrapping Flow with callbackFlow; keep operator chain |

### 2.4 Hilt Injection

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

### 3.1 Generic UI State

```kotlin
// ui/UiState.kt
sealed class UiState<out T> {
    data object Loading : UiState<Nothing>()
    data class Success<T>(val data: T) : UiState<T>()
    data class Error(val message: String?) : UiState<Nothing>()
}
```

### 3.2 Parameter-Driven ViewModel

The ViewModel gets `userId` via **SavedStateHandle** (from Nav route params). Data flow is driven by this parameter; the UI does not call `loadUser()` or `initialRefresh()`.

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

| Point | Description |
|-------|--------------|
| userId pre-filter | `filter` + `distinctUntilChanged` for unified handling; flatMapLatest no longer checks empty |
| collectLatest | When userId changes, cancel old refresh and start refreshIfNeeded for new id |
| Concurrent refresh | `coroutineScope { launch + launch }` for user and orders in parallel |
| Success\<User?\> | Emit Success(null) when no data; UI shows placeholder, fewer Loading branches |
| awaitAll | Explicitly wait for both forceRefresh to complete, clear semantics |

> **Parameter injection**: Nav route (e.g. `userDetail/{userId}`) writes `userId` into SavedStateHandle when entering the screen. With Activity + Intent, use a custom ViewModelFactory to put `intent.getStringExtra("userId")` into the Bundle's `defaultArgs`.  
> **Import**: `awaitAll` from `kotlinx.coroutines`.

---

## 4. Implementation 1: XML Layout

### 4.1 Fragment + Nav (Parameter-Driven)

Using Nav route `userDetail/{userId}`; `userId` is automatically in SavedStateHandle on entry. ViewModel does not need `loadUser()`.

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
        // userId from Nav args → SavedStateHandle; data flow auto-driven
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

### 4.2 Nav Route

```kotlin
// In NavGraph: userDetail/{userId} → UserDetailFragment
NavHostController.navigate("userDetail/${userId}")
```

### 4.3 XML Layout

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

            <!-- User card -->
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
                        android:contentDescription="Avatar"
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

            <!-- Order list -->
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginHorizontal="16dp"
                android:text="Order List"
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
            binding.tvOrderId.text = "Order #${order.id.takeLast(4)}"
            binding.tvOrderAmount.text = "¥%.2f".format(order.totalAmount)
            binding.tvOrderStatus.text = order.status
            binding.tvOrderDate.text = order.createdAt
        }
    }
}
```

---

## 5. Implementation 2: Jetpack Compose

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
    // userId from Nav route userDetail/{userId} → SavedStateHandle; data flow auto-driven

    val userState by viewModel.userState.collectAsStateWithLifecycle()
    val ordersState by viewModel.ordersState.collectAsStateWithLifecycle()
    val isRefreshing by viewModel.refreshState.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("User Detail") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
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
                        "Order List",
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

### 5.2 User Card Composable

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
                contentDescription = "Avatar",
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
        text = message ?: "Load failed",
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
                Text("Order #${order.id.takeLast(4)}", fontWeight = FontWeight.Medium)
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

### 5.3 Dependencies

```kotlin
// build.gradle - SwipeRefresh from accompanist or Material3
implementation("com.google.accompanist:accompanist-swiperefresh:0.32.0")
// or Material3 1.2+
implementation("androidx.compose.material3:material3:1.2.0")
```

---

## 6. Data Flow and Cache Summary

### 6.1 Parameter-Driven + SWR

| Compare | Blocking (implicit network-first) | SWR |
|---------|-----------------------------------|-----|
| First frame | Wait for network before emit | Emit cache first, refresh in background |
| observe | flow { refresh(); emitAll } | dao.onStart { launch { refresh } }.map |

### 6.2 Cache Policy and Responsibility

| Repository | Suggested maxAgeMs | Notes |
|------------|--------------------|-------|
| UserRepository | 30 min | Less frequent changes, independent cache |
| OrderRepository | 5 min | More frequent changes, independent cache |

### 6.3 Key Points

- **User / Order split**: One repository each, single responsibility.
- **SWR**: `onStart { launch { refresh } }` show cache first, then update in background; defaultPolicy in Repository, can override.
- **Pull-to-refresh**: Call `userRepository.forceRefresh` and `orderRepository.forceRefresh` in parallel.
