# Android + Kotlin 知识点

[English](/reading-notes/android/android-points.en.md)

知识点速查，按 Android 基础、进阶与 Kotlin 分类。

---

## Android 基础

### 手势与触控

| 考点 | 答案 |
|------|------|
| 双击手势 | `GestureDetector` + `SimpleOnGestureListener.onDoubleTap()`；不要手写时间间隔判断 |
| 多指数量判断 | `event.getPointerCount()` |

### 生命周期与可见性

| 考点 | 答案 |
|------|------|
| Activity 不可见时回调 | `onStop()` |
| 区分 | `onPause()` = 失去焦点但可能仍可见 |

### 存储与资源

| 考点 | 答案 |
|------|------|
| SharedPreferences 保存 | 同步：`commit()`；异步：`apply()` |
| 多语言资源目录 | 如法语：`res/values-fr/strings.xml` |
| Launcher 图标目录 | `mipmap` |

### UI 与点击

| 考点 | 答案 |
|------|------|
| android:onClick 方法不存在 | 直接 crash → `IllegalStateException`（反射找不到方法） |
| 播放视频的 View | `VideoView`（不是 MediaPlayer / SurfaceView） |

### 传感器

| 考点 | 答案 |
|------|------|
| 角速度 | `Sensor.TYPE_GYROSCOPE` |
| 空气温度 | `Sensor.TYPE_AMBIENT_TEMPERATURE` |

### 启动与进程

| 考点 | 答案 |
|------|------|
| 开机启动广播 | `android.intent.action.BOOT_COMPLETED`，需权限 `RECEIVE_BOOT_COMPLETED` |
| FLAG_ACTIVITY_SINGLE_TOP | Activity 已在栈顶时不创建新实例，走 `onNewIntent()` |
| 进程优先级最高 | Foreground process（最后被杀） |

---

## Android 进阶

### 窗口特性

| 考点 | 答案 |
|------|------|
| requestWindowFeature 有效常量 | `FEATURE_NO_TITLE`、`FEATURE_LEFT_ICON`、`FEATURE_RIGHT_ICON` |
| 无效常量 | `FEATURE_TOP_ICON`、`FEATURE_NO_ICON` |

### 触控与剪贴板

| 考点 | 答案 |
|------|------|
| MotionEvent 多点触控 | `ACTION_POINTER_DOWN` / `ACTION_POINTER_UP` |
| 剪贴板 | `ClipboardManager` |
| 拖拽接口 | `View.OnDragListener` |

### 相机与异常

| 考点 | 答案 |
|------|------|
| Camera 被占用 | `openCamera` → `CameraAccessException` |

### 线程与异步

| 考点 | 答案 |
|------|------|
| 线程辅助类 | `ThreadPoolExecutor`、`HandlerThread`、`AsyncTask`（deprecated）、`AsyncTaskLoader` |
| 后台下载且旋转屏幕不终止 | Service（通常前台服务） |

### 其他

| 考点 | 答案 |
|------|------|
| RenderScript | 高性能计算框架（图像/GPU），已废弃 |

---

## Kotlin

### 数字与字面量

| 考点 | 答案 |
|------|------|
| 数字常量 | 支持 Decimal、Binary、Hex；**不支持** Octal |

### 可见性修饰符

| 考点 | 答案 |
|------|------|
| 可见性（默认 public） | `public`、`internal`、`protected`、`private` |

### 相等性

| 考点 | 答案 |
|------|------|
| == vs === | `==` 内容相等（equals）；`===` 引用相等 |

### Sequence

| 考点 | 答案 |
|------|------|
| Sequence 特点 | 惰性计算（lazy）、无中间集合、支持 stateless/stateful operations |

### 编译器参数

| 考点 | 答案 |
|------|------|
| 有效参数 | `-progressive`、`-Werror`、`-g` |
| 无效参数 | `-ver` |
