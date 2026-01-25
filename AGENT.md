# Agent 指引

## 项目概况

Windows 桌面应用，显示 Cursor Agent 工作状态。基于 Cursor Hooks API 检测状态，通过轮询 `%APPDATA%/cursor-status-pet/state.json`。

## 当前问题

**窗口消失**：应用启动后窗口立即消失，原因待查（透明窗口/window-all-closed/GPU）

## 关键文件

- `src/main/index.ts` - 主进程，窗口+托盘
- `src/main/detector.ts` - 状态检测，轮询 state.json
- `src/renderer/App.tsx` - 渲染入口，SchemeA/B 切换
- `~/.cursor/hooks.json` - Cursor Hooks 配置（需重启 Cursor 生效）

## 临时调试代码（需清理）

- `main/index.ts:30` - openDevTools
- `App.tsx:19` - 半透明背景

## 开发规范

- TypeScript + ESLint
- 功能契约放 `.ai-contracts/<feature>/CONTRACT.md`
