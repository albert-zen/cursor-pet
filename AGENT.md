# Agent 指引

## 项目概况

Windows 桌面应用，显示 Cursor Agent 工作状态。基于 Cursor Hooks API 检测状态，通过轮询 `%APPDATA%/cursor-status-pet/state.json`。

技术栈：Electron 28 + TypeScript + React 18 + electron-vite

## 当前状态

- 窗口/托盘功能正常（bugfix-window-disappear 分支已修复）
- 状态检测模块就绪，但依赖 Cursor Hooks 写入 state.json
- **Hooks 未验证**：需配置 `~/.cursor/hooks.json` 并重启 Cursor

## 关键文件

- `src/main/index.ts` - 主进程，窗口+托盘+IPC
- `src/main/detector.ts` - 状态检测，轮询 state.json（500ms）
- `src/renderer/App.tsx` - 渲染入口
- `src/renderer/SchemeA.tsx` - 方案A 圆形指示灯（灰空闲/绿工作）
- `src/renderer/SchemeB.tsx` - 方案B 桌面宠物（😴/🤖）

## 状态检测机制

```
Cursor Hooks → hook.js → state.json → detector.ts → IPC → UI
```

state.json 格式：`{ "working": boolean, "timestamp": number }`
超过 10 秒无更新视为空闲

## 开发命令

- `npm run dev` - 开发模式
- `npm run build` - 构建
- `npm run lint` - ESLint

## 开发规范

- TypeScript + ESLint + Prettier
- 功能契约放 `.ai-contracts/<feature>/CONTRACT.md`
