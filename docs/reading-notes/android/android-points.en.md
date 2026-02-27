# Android + Kotlin Knowledge Points

[中文](/reading-notes/android/android-points.md)

Knowledge points reference, grouped by Android basics, advanced Android, and Kotlin.

---

## Android Basics

### Gestures & Touch

| Topic | Answer |
|-------|--------|
| Double-tap | `GestureDetector` + `SimpleOnGestureListener.onDoubleTap()`; avoid manual time-interval checks |
| Pointer count | `event.getPointerCount()` |

### Lifecycle & Visibility

| Topic | Answer |
|-------|--------|
| Activity becomes invisible | `onStop()` |
| Distinction | `onPause()` = loses focus but may still be visible |

### Storage & Resources

| Topic | Answer |
|-------|--------|
| SharedPreferences write | Sync: `commit()`; async: `apply()` |
| Locale resources | e.g. French: `res/values-fr/strings.xml` |
| Launcher icon dir | `mipmap` |

### UI & Click

| Topic | Answer |
|-------|--------|
| android:onClick method missing | Direct crash → `IllegalStateException` (reflection cannot find method) |
| Video playback View | `VideoView` (not MediaPlayer / SurfaceView) |

### Sensors

| Topic | Answer |
|-------|--------|
| Angular velocity | `Sensor.TYPE_GYROSCOPE` |
| Ambient temperature | `Sensor.TYPE_AMBIENT_TEMPERATURE` |

### Launch & Process

| Topic | Answer |
|-------|--------|
| Boot complete broadcast | `android.intent.action.BOOT_COMPLETED`; needs `RECEIVE_BOOT_COMPLETED` permission |
| FLAG_ACTIVITY_SINGLE_TOP | If Activity is already on top, no new instance; triggers `onNewIntent()` |
| Highest process priority | Foreground process (killed last) |

---

## Android Advanced

### Window Features

| Topic | Answer |
|-------|--------|
| requestWindowFeature valid | `FEATURE_NO_TITLE`, `FEATURE_LEFT_ICON`, `FEATURE_RIGHT_ICON` |
| Invalid constants | `FEATURE_TOP_ICON`, `FEATURE_NO_ICON` |

### Touch & Clipboard

| Topic | Answer |
|-------|--------|
| MotionEvent multi-touch | `ACTION_POINTER_DOWN` / `ACTION_POINTER_UP` |
| Clipboard | `ClipboardManager` |
| Drag listener | `View.OnDragListener` |

### Camera & Exceptions

| Topic | Answer |
|-------|--------|
| Camera in use | `openCamera` → `CameraAccessException` |

### Threading & Async

| Topic | Answer |
|-------|--------|
| Thread helpers | `ThreadPoolExecutor`, `HandlerThread`, `AsyncTask` (deprecated), `AsyncTaskLoader` |
| Background download survives rotation | Service (typically foreground) |

### Other

| Topic | Answer |
|-------|--------|
| RenderScript | High-performance compute (image/GPU); deprecated |

---

## Kotlin

### Numeric Literals

| Topic | Answer |
|-------|--------|
| Supported bases | Decimal, Binary, Hex; **not** Octal |

### Visibility

| Topic | Answer |
|-------|--------|
| Modifiers (default public) | `public`, `internal`, `protected`, `private` |

### Equality

| Topic | Answer |
|-------|--------|
| == vs === | `==` structural equality (equals); `===` referential equality |

### Sequence

| Topic | Answer |
|-------|--------|
| Sequence behavior | Lazy evaluation, no intermediate collections, stateless/stateful operations |

### Compiler Arguments

| Topic | Answer |
|-------|--------|
| Valid | `-progressive`, `-Werror`, `-g` |
| Invalid | `-ver` |
