# Cursor Status Pet

Windows 桌面应用，实时显示 Cursor Agent 工作状态。

## 功能

- 4 种 UI 风格：圆形指示灯、桌面宠物、赛博朋克、像素猫
- 透明悬浮窗，始终置顶
- 系统托盘，右键切换风格

## 安装

```bash
npm install
```

## 配置 Cursor Hooks

复制 `.cursor` 文件夹到 Cursor 工作区根目录，或将 `hooks.json` 内容合并到现有配置。

## 运行

```bash
npm run dev
```

## 原理

```
Cursor Hooks → hook.js --HTTP--> detector (localhost:19527) → UI
```

Hook 触发时发送 HTTP 请求，detector 接收后更新 UI 状态。
