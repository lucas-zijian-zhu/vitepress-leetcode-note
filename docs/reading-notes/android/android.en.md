# Android Notes: Context, memory leaks, async options, Serializable vs Parcelable (English)

[中文](/reading-notes/android/android.md)

## 1) What `Context` is (what it “represents”)

Think of `Context` as the **entry point to “app environment capabilities”**, including:

- **Resources**: `getResources()`, `getString()`, `getTheme()`
- **System services**: `getSystemService(...)` (e.g. `LayoutInflater`, `NotificationManager`, `ClipboardManager`)
- **Component operations**: `startActivity()`, `startService()`, `sendBroadcast()`
- **UI “theme scope”**: theme + attribute resolution (e.g. Material theme attributes)

In short: **Context decides “which environment/scope you’re operating in”**, and it directly affects UI theming and lifecycle reference chains.

## 2) Activity Context vs Application Context

### Key differences

- **Activity Context** (e.g. `this`, `requireActivity()`, `view.context`)
  - tied to the Activity lifecycle
  - carries the Activity theme (better for UI)
  - easier to leak if captured by a long-lived object

- **Application Context** (`applicationContext` / `getApplicationContext()`)
  - tied to the process lifetime (effectively “long-lived”)
  - typically **does not carry Activity theme overlays**
  - good for non-UI, long-lived components (singletons, repositories, DB, global registrations)

### Practical selection

- **Needs UI theme/window**: prefer Activity Context
  - inflating views, Dialog/PopupWindow, Material widgets, etc.
- **Cross-screen / long-lived / theme-independent**: use Application Context
  - database, networking, cache, notifications, WorkManager initialization
- **Toast**
  - `Toast.makeText(appContext, ...)` is common; but for custom views/theme-sensitive styles, Activity Context can be more appropriate

## 3) What happens if you use Application Context to “draw” a View in a screen?

Two common cases:

### A. You only create/inflate the View (and later attach it to the Activity view tree)

- **Often works**: the View can still render once attached.
- But you may see **wrong styles / missing theme attributes**:
  - Application Context doesn’t have the Activity’s theme overlay (Material3, night mode overlays, dynamic color, etc.)
  - some widgets read themed attributes; values may differ → UI looks off
  - in edge cases, if a widget requires certain theme attrs, it may throw (depends on implementation)

### B. You use Application Context for “window-bound UI”

Examples: Dialog / PopupWindow / anything needing a `Window` token.

- These typically must attach to an Activity window
- Using Application Context may lead to:
  - **`BadTokenException`** (no valid window token)
  - wrong theme / animation behavior

Bottom line: **Creating a View might be fine, but UI that depends on theme/window should use Activity Context**.

## 4) Common causes of memory leaks

One-liner: **short-lived objects (Activity/Fragment/View) being held by long-lived objects**.

Typical pitfalls:

- **static/singleton holds Activity/Fragment/View**
- **anonymous / non-static inner classes** implicitly capture the outer Activity
  - Handler/Runnable/callbacks inside an Activity
- **Handler / delayed Runnables**
  - message queue keeps the Runnable after Activity is destroyed
- **listeners not unregistered**
  - sensors, location, BroadcastReceiver, EventBus, LiveData observers, Rx subscriptions, Flow collections
- **threads/coroutines with wrong scope**
  - background work outlives the UI but keeps references (e.g. GlobalScope touching Views)
- **WebView**
  - complex internal refs; follow best-practice destroy + detach patterns
- **Drawable/Bitmap reference chains**
  - image caches / drawable callbacks indirectly retaining Views/Activities

Quick practices:

- use Application Context for non-UI singletons
- unregister listeners in `onDestroy/onStop/onDestroyView`
- use `lifecycleScope` / `viewLifecycleOwner.lifecycleScope` for coroutines
- prefer lifecycle-aware patterns over raw Handler; avoid inner-class leaks

## 5) Common async options in Android (by scenario)

### 5.1 Run immediately (app is foreground / needs to happen now)

- **Kotlin Coroutines**
  - `Dispatchers.IO` / `Dispatchers.Default`
  - `lifecycleScope` / `viewModelScope`
- **Thread pools**
  - `ExecutorService`, `Executors.newFixedThreadPool(...)`
- **HandlerThread / Looper**
  - useful for single-thread serial work (e.g. file writes)

### 5.2 Deferrable + constrained + reliable execution (recommended)

- **WorkManager** (recommended)
  - constraints: network, battery, charging, idle, etc.
  - persisted tasks, retries, chaining
- **JobScheduler**
  - lower-level system job scheduling

### 5.3 Legacy (know it, avoid it)

- **AsyncTask** (deprecated)
- **IntentService** (deprecated; prefer WorkManager / ForegroundService depending on needs)

Selection:

- **foreground immediate**: coroutines / thread pool
- **must run in background + constraints/retry**: WorkManager
- **long-running ongoing work** (music, continuous location): Foreground Service (subject to platform restrictions)

## 6) Serializable vs Parcelable

### Serializable

- Java standard serialization (reflection-heavy)
- **easy to implement**: `class Foo : Serializable`
- **slower** on Android for frequent Bundle/IPC usage

### Parcelable

- Android-optimized for IPC/Bundle
- **typically faster**
- historically more verbose, but Kotlin **`@Parcelize`** makes it much easier

### When to use which (practical)

- **Intent/Bundle arguments (hot path)**: prefer **Parcelable**
  - Activity/Fragment args (`Intent` extras / `Bundle`)
  - `savedInstanceState` (process death restore)
  - Activity results
- **Cross-process (AIDL/Binder)**: typically **Parcelable**
  - Binder transactions have size limits; keep payloads small
- **Quick-and-dirty / low frequency**: `Serializable` can be acceptable
  - demos, experiments, tooling
  - avoid long-term use in performance-sensitive flows
- **Persistence / network**: usually neither
  - prefer Room/SQLite, JSON (Moshi/Gson/Kotlinx Serialization), protobuf, etc.

Avoid:

- putting huge graphs/lists/images into `Intent`/`Bundle` (Serializable or Parcelable)
- treating View/Context/Bitmap/Drawable as transferable data

