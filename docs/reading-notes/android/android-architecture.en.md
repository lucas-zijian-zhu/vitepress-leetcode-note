# Android Architecture: Singletons, MVVM, Flow, Retrofit/Room, DI

[中文](/reading-notes/android/android-architecture.md)

Summary of Kotlin singletons, ViewModel + Flow, MVVM, Flow usage in Repository, Retrofit/Room with Flow, and Hilt dependency injection.

---

## 1) Kotlin Singleton Patterns

| Approach | Notes | When to use |
|----------|-------|-------------|
| **object** | Built-in singleton, thread-safe (eager init at class load) | Stateless utils, global config |
| **Double-check getInstance(context)** | Created on first call, needs params | Depends on Context, caller can provide each time |
| **companion object + by lazy** | Lazy init, created on first access | No params; or Context available in Application |

### 1.1 object Singleton

```kotlin
object ApiConfig {
    const val BASE_URL = "https://api.example.com"
    val timeout = 30
}

// Usage
ApiConfig.BASE_URL
```

- **Thread-safe**: JVM guarantees static init at class load is thread-safe.
- **Preferred** when there are no params and no dependencies.
- **Downside**: Initialized at class load; cannot defer.

### 1.2 Double-Check getInstance(context)

When the singleton depends on Context and the caller can pass it each time, use **getInstance** + **synchronized**:

```kotlin
class DatabaseHelper private constructor(context: Context) {
    companion object {
        @Volatile
        private var instance: DatabaseHelper? = null

        fun getInstance(context: Context): DatabaseHelper =
            instance ?: synchronized(this) {
                instance ?: DatabaseHelper(context.applicationContext).also { instance = it }
            }
    }
}
```

- Always use `applicationContext` to avoid leaking the Activity.

### 1.3 companion object + by lazy (Deferred Singleton)

**No params** — use `by lazy` for deferred init:

```kotlin
class Logger {
    companion object {
        val instance: Logger by lazy { Logger() }
    }
}
```

**Depends on Context** when Context is only available in Application:

```kotlin
class MyApplication : Application() {
    val databaseHelper: DatabaseHelper by lazy {
        DatabaseHelper(applicationContext)
    }
}
```

- `object` = eager init; `by lazy` = init on first access.
- **lazy is thread-safe by default** (`LazyThreadSafetyMode.SYNCHRONIZED`).

### 1.4 Relation to DI

Modern projects usually rely on **Hilt/Koin** for singletons instead of hand-written `object`, `by lazy`, or double-check:

```kotlin
@Singleton
@Provides
fun provideApiService(retrofit: Retrofit): ApiService = retrofit.create(ApiService::class.java)
```

- The container owns the lifecycle; easier to swap implementations in tests.
- Use `object` only for pure helpers or config with no dependencies.

---

## 2) ViewModel + Flow

### 2.1 Responsibilities

- **ViewModel**: Holds UI state, calls Repository, manages coroutines.
- **Flow**: Represents streams of data in Repo; ViewModel collects, transforms, and exposes to UI.

### 2.2 ViewModel Exposing Flow to UI

```kotlin
class UserViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {

    val userState: StateFlow<UserState> = userRepository
        .observeUser()
        .map { user -> UserState.Success(user) }
        .catch { e -> emit(UserState.Error(e.message)) }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = UserState.Loading
        )
}
```

Points:

- `stateIn`: Converts Flow to `StateFlow` for UI to subscribe.
- `viewModelScope`: Cancels when ViewModel is cleared.
- `SharingStarted.WhileSubscribed(5000)`: Stops upstream after 5 seconds with no subscribers.

### 2.3 UI Collecting StateFlow

```kotlin
@Composable
fun UserScreen(viewModel: UserViewModel = hiltViewModel()) {
    val state by viewModel.userState.collectAsStateWithLifecycle()

    when (val s = state) {
        is UserState.Loading -> Loading()
        is UserState.Success -> UserContent(s.user)
        is UserState.Error -> ErrorView(s.message)
    }
}

// Fragment
viewLifecycleOwner.lifecycleScope.launch {
    viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
        viewModel.userState.collect { state -> updateUI(state) }
    }
}
```

- Use `collectAsStateWithLifecycle` or `repeatOnLifecycle(STARTED)` so collection starts only when the screen is started, avoiding duplicate subscriptions and leaks.

---

## 3) MVVM Structure

```
UI (Activity/Fragment/Composable)
    ↑ StateFlow / LiveData
ViewModel
    ↑ calls
Repository
    ↑              ↑
Remote (Retrofit)  Local (Room)
```

### 3.1 Data Flow

1. **UI** → User actions call ViewModel methods.
2. **ViewModel** → Calls Repository for data.
3. **Repository** → Combines Remote and Local, returns Flow/LiveData.
4. **ViewModel** → Converts Flow to StateFlow for UI.
5. **UI** → Renders based on State.

### 3.2 Skeleton Example

```kotlin
interface UserRepository {
    fun observeUser(): Flow<User>
    suspend fun refreshUser()
}

class UserViewModel(repository: UserRepository) : ViewModel() {
    val state = repository.observeUser()
        .map { UserState.Success(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), UserState.Loading)
}

// UI only depends on ViewModel, not Repository directly
```

---

## 4) Flow in Repository

Repository acts as the single source of truth, exposes Flow, and composes network + local data internally.

### 4.1 Read-Only Stream (Observe)

```kotlin
class UserRepositoryImpl @Inject constructor(
    private val userDao: UserDao,
    private val api: ApiService
) : UserRepository {

    override fun observeUser(): Flow<User> = userDao
        .observeUser()
        .map { it.toDomain() }
}
```

- When local is the primary source, forward Room’s Flow and optionally map to domain models.

### 4.2 Network Then Cache

```kotlin
override fun observeUser(): Flow<User> = flow {
    val remote = api.getUser()
    userDao.insert(remote.toEntity())
    emitAll(userDao.observeUser().map { it.toDomain() })
}.catch { e ->
    emitAll(userDao.observeUser().map { it.toDomain() })
}
```

- Fetch from network, save to local, then observe local Flow.
- In `catch`, fall back to local when network fails.

### 4.3 Refresh Entry Point

```kotlin
override suspend fun refreshUser() {
    val user = api.getUser()
    userDao.insert(user.toEntity())
}
```

- ViewModel calls this on pull-to-refresh or startup.

---

## 5) Retrofit + Flow

### 5.1 Wrap suspend in Flow

Retrofit uses suspend; wrap in `flow` when you need a stream:

```kotlin
interface ApiService {
    @GET("user")
    suspend fun getUser(): UserDto
}

fun fetchUserFlow(): Flow<User> = flow {
    emit(api.getUser().toDomain())
}.flowOn(Dispatchers.IO)
```

### 5.2 Error Handling and Retry

```kotlin
fun fetchUserFlow(): Flow<Result<User>> = flow {
    emit(Result.success(api.getUser().toDomain()))
}.catch { e ->
    emit(Result.failure(e))
}.retry(2) { cause -> cause is IOException }
```

---

## 6) Room + Flow

### 6.1 DAO Returning Flow

Room supports `Flow<T>`; it re-emits whenever data changes:

```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM user WHERE id = :id")
    fun observeUser(id: String): Flow<UserEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(user: UserEntity)

    @Query("DELETE FROM user")
    suspend fun deleteAll()
}
```

- Any change to the queried table triggers a new emission.
- Good for lists and details that need live updates.

### 6.2 Multi-Table

```kotlin
@Query("""
    SELECT * FROM user u
    LEFT JOIN order o ON u.id = o.userId
    WHERE u.id = :id
""")
fun observeUserWithOrders(id: String): Flow<UserWithOrders>
```

### 6.3 Dependencies

```kotlin
implementation("androidx.room:room-ktx:2.6.0")
ksp("androidx.room:room-compiler:2.6.0")
```

---

## 7) Hilt DI Integration

### 7.1 Module Structure

|  Layer    | Scope       | Purpose                  |
|-----------|-------------|--------------------------|
| ApiService | @Singleton | Retrofit interface       |
| Dao       | @Singleton | Room DAO                 |
| Repository | @Singleton | Injects Dao, ApiService  |
| ViewModel  | N/A        | Injected via @HiltViewModel |

### 7.2 Providing Dependencies

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Singleton
    @Provides
    fun provideRetrofit(): Retrofit = Retrofit.Builder()
        .baseUrl("https://api.example.com")
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    @Singleton
    @Provides
    fun provideApiService(retrofit: Retrofit): ApiService =
        retrofit.create(ApiService::class.java)

    @Singleton
    @Provides
    fun provideDatabase(@ApplicationContext app: Context): AppDatabase =
        Room.databaseBuilder(app, AppDatabase::class.java, "app_db").build()

    @Singleton
    @Provides
    fun provideUserDao(db: AppDatabase): UserDao = db.userDao()

    @Singleton
    @Provides
    fun provideUserRepository(dao: UserDao, api: ApiService): UserRepository =
        UserRepositoryImpl(dao, api)
}
```

### 7.3 ViewModel Injection

```kotlin
@HiltViewModel
class UserViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() { /* ... */ }

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    private val viewModel: UserViewModel by viewModels()
}
```

### 7.4 End-to-End Chain

```
Hilt injects AppDatabase, UserDao, ApiService
    → UserRepositoryImpl(dao, api)
    → UserViewModel(repository)
    → UI gets ViewModel via hiltViewModel() / by viewModels()
```

---

## 8) Summary

| Layer   | Data Type      | Typical usage                                    |
|---------|----------------|--------------------------------------------------|
| Room    | Flow\<Entity\> | DAO returns Flow; emits on table changes         |
| Retrofit| suspend        | suspend API; wrap in `flow { emit(...) }` in Repo |
| Repo    | Flow\<Domain\> | Compose Room + network; map and handle errors    |
| ViewModel | StateFlow    | `stateIn` converts Flow for UI subscription       |
| UI      | collect        | `collectAsStateWithLifecycle` / `repeatOnLifecycle` |
| Singleton | object / DI  | Config with object; business singletons via Hilt  |
