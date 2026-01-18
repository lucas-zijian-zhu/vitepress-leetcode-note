# Android 笔记：Context、内存泄露、异步方式、Serializable vs Parcelable

[English](/reading-notes/android/android.en.md)

## 1）Context 的作用（它到底“代表”什么）

可以把 `Context` 理解为“**访问应用环境能力的入口**”，它提供：

- **资源访问**：`getResources()`、`getString()`、`getTheme()`
- **系统服务**：`getSystemService(...)`（如 `LayoutInflater`、`NotificationManager`、`ClipboardManager`）
- **组件能力**：`startActivity()`、`startService()`、`sendBroadcast()`
- **创建 UI 的语境**：主题（Theme）、样式属性解析（例如 Material 组件的 attribute）

一句话：**Context 决定了你在“哪个环境/语境”里做事**，尤其影响 UI 的主题与生命周期引用关系。

## 2）Activity Context vs Application Context：区别与选择

### 核心区别

- **Activity Context**（例如 `this` / `requireActivity()` / `view.context`）
  - 跟随 Activity 生命周期
  - 带 Activity 的主题（Theme），更适合 UI
  - 更容易因为“被长生命周期对象持有”而泄露 Activity

- **Application Context**（`applicationContext` / `getApplicationContext()`）
  - 生命周期与进程一致（几乎等同“常驻”）
  - **不带 Activity 的主题语境**（通常是 Application/默认主题）
  - 适合“与界面无关、需要长期存在”的逻辑（如单例、Repository、数据库、全局广播注册等）

### 常用选择建议（实战）

- **需要 UI 样式/主题/窗口能力**：优先 Activity Context
  - inflate View、创建 Dialog、PopupWindow、Material 组件等
- **需要跨页面、长期存在、不依赖主题**：用 Application Context
  - 数据库、网络层、缓存、全局通知、WorkManager 初始化等
- **Toast**：
  - 传统 `Toast.makeText(appContext, ...)` 常见；但如果你的 Toast/自定义 View 依赖主题样式，仍可能更适合用 Activity Context

## 3）如果在一个页面用 Application Context “画”了一个 View 会怎么样？

这里分两种常见情况：

### A. 仅仅“创建/Inflate” View（但最终加到 Activity 的 View 树里）

- **通常不会直接崩**：View 依然可以被加入 Activity 的布局中并正常渲染。
- 但可能出现 **样式不对/主题不生效**：
  - Application Context 没有 Activity 的 theme overlay（比如 Material3、夜间模式、动态颜色等）
  - 一些控件在读取 themed attributes 时，可能拿不到期望值 → 样式异常
  - 极端情况下，如果控件强依赖某些 theme attributes，可能会抛异常（取决于控件实现）

### B. 用 Application Context 去做“需要 Window 的 UI”（更容易出问题）

典型如：Dialog/PopupWindow/需要 `Window` token 的场景。

- 这类 UI 通常需要与某个 Activity 的窗口绑定
- 使用 Application Context 容易遇到：
  - **`BadTokenException`**（没有有效 window token）
  - 主题不对、动画不对

结论：**创建 View 本身不一定出问题，但 UI 相关（主题/窗口）强依赖 Activity Context**。  
所以“在页面里画 UI”，默认优先用 Activity Context；除非你非常确定不需要主题语境。

## 4）常见导致内存泄露（Memory Leak）的原因

一句话：**短生命周期对象（Activity/Fragment/View）被长生命周期对象持有**。

常见坑位：

- **静态变量/单例持有 Activity/Fragment/View**
  - 例如 `object Foo { var ctx: Context? }` 把 Activity context 塞进去
- **匿名内部类/非静态内部类持有外部类引用**
  - 例如 Activity 里的 `Handler`、`Runnable`、回调对象，默认持有 Activity 引用
- **Handler / Runnable 延迟任务**
  - `postDelayed` 还没执行完，Activity 已经销毁，但消息队列还持有 Runnable → 泄露
- **监听器未解绑**
  - 传感器、位置、BroadcastReceiver、EventBus、LiveData observer、Rx subscription、Flow collect 等
- **线程/协程作用域不当**
  - 开了线程一直跑、协程跑在不该跑的 scope，导致引用链保留
  - 例如在 Activity 里启动全局 scope 的协程去引用 View
- **WebView**
  - WebView 相关的 Context/内部引用复杂，容易泄露；要按规范销毁并移除父容器引用
- **Drawable/Bitmap 引用链**
  - 大图缓存、ImageView 的 drawable callback 等导致 View/Activity 被间接引用

实践建议（简版）：

- 能用 Application Context 的“非 UI 全局对象”就别用 Activity Context
- 所有 listener/observer/subscription 在 `onDestroy/onStop/onDestroyView` 及时解绑
- 用 `lifecycleScope` / `viewLifecycleOwner.lifecycleScope` 管理协程
- Handler 用静态内部类 + 弱引用，或尽量用 lifecycle-aware 的方式

## 5）Android 常见异步实现方式（按场景归类）

### 5.1 立即后台执行（应用在前台/需要立刻做）

- **Kotlin Coroutines**
  - `Dispatchers.IO` / `Dispatchers.Default`
  - `lifecycleScope` / `viewModelScope`
- **Java/Kotlin 线程池**
  - `ExecutorService`、`Executors.newFixedThreadPool(...)`
- **HandlerThread / Looper**
  - 有“单线程串行执行”需求时好用（比如串行写文件）

### 5.2 可延迟、可约束、要保证执行（更推荐）

- **WorkManager**（推荐）
  - 支持约束：网络、电量、充电、空闲等
  - 支持持久化任务、重试、链式任务
- **JobScheduler**
  - 系统级作业调度（更底层）

### 5.3 旧方案（了解即可）

- **AsyncTask**（已废弃）
- **IntentService**（已废弃，更多用 WorkManager / ForegroundService）

选择建议：

- **前台立即执行**：协程/线程池
- **后台必须执行、支持约束/重试**：WorkManager
- **长时间持续任务（如音乐播放/定位）**：Foreground Service（需合规与系统限制）

## 6）Serializable vs Parcelable（你这里的 “personalized” 我理解为 Parcelable）

### Serializable

- Java 标准序列化（反射为主）
- **实现简单**：`class Foo : Serializable`
- **性能相对差**：Android 进程间/Bundle 频繁传输时开销更大

### Parcelable

- Android 体系为 IPC/Bundle 优化的序列化方式
- **性能更好**（通常）
- **实现更繁琐**（但 Kotlin `@Parcelize` 已大幅简化）

### 什么时候用哪个

- **Intent/Bundle/组件间传参（高频路径）**：优先 **Parcelable**
  - Activity/Fragment 参数（`Intent` extras / `Bundle`）
  - `savedInstanceState`（进程被杀后恢复时需要序列化）
  - `Result`/`ActivityResult` 数据
  - 配合 Kotlin `@Parcelize`，实现成本已经很低
- **跨进程（AIDL / Binder）传输**：通常也更偏向 **Parcelable**
  - Binder 事务有大小限制；尽量传“小而必要”的数据，避免大对象/大列表
- **临时图省事 / 调试 / 低频**：`Serializable` 可以用
  - 例如 demo、小工具、一次性实验代码
  - 但不建议在主链路/高频传参中长期依赖它
- **本地持久化 / 网络传输**：通常不用这俩
  - 用 Room/SQLite、JSON（Moshi/Gson/Kotlinx Serialization）、protobuf 等更合适

不建议：

- 把超大对象（大列表/大图片/大树）塞进 `Intent`/`Bundle`（无论 Serializable 还是 Parcelable）
- 把 View/Context/Bitmap/Drawable 等“带资源引用”的对象当作可传输数据

