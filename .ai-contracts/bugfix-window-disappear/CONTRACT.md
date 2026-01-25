# BUGFIX: 窗口消失

## CHANGELOG
- v1: 初始契约

## 目标
修复应用启动后主窗口不可见的问题，使窗口正常显示。

## 现象
- DevTools 窗口出现并保持
- 主窗口不可见
- 进程未退出

## 根因分析
DevTools 正常说明 webContents 加载成功，问题在窗口本身：
1. `transparent: true` 配合空内容可能导致窗口不可见
2. 缺少 `show: false` + `ready-to-show` 的标准窗口显示模式
3. 窗口可能在内容准备好前就尝试显示

## 范围
- 涉及：`src/main/index.ts` 窗口创建逻辑
- 不涉及：状态检测、UI 组件

## 修复方案
1. 使用 `show: false` 创建窗口
2. 监听 `ready-to-show` 事件后调用 `show()`
3. 添加窗口事件监听（closed/hide）辅助诊断

## 验收标准
- GIVEN 用户运行 `npm run dev`
- WHEN 应用启动完成
- THEN 主窗口可见，显示方案 A 的灰色圆形指示灯

## 代码引用
- `src/main/index.ts:10-34` createWindow 函数
