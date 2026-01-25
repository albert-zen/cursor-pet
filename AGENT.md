# Agent 指引

## 项目结构

- `spec.md` - 项目契约
- `design.md` - 架构设计
- `plan.md` - 开发计划
- `src/main/` - Electron 主进程
- `src/preload/` - 预加载脚本
- `src/renderer/` - React 渲染进程
- `.ai-contracts/` - 功能契约目录

## 开发规范

- 使用 TypeScript
- 遵循 ESLint 配置
- 功能开发前先在 `.ai-contracts/<feature>/` 建立 CONTRACT.md
