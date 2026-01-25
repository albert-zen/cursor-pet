# FEAT-001: Agent 状态检测

## 检测方案

使用 Cursor 官方 Hooks API（https://cursor.com/cn/docs/agent/hooks）：
- 配置：`~/.cursor/hooks.json`
- Hook 事件：`sessionStart`、`preToolUse` → working；`sessionEnd`、`stop` → idle
- 状态文件：`%APPDATA%/cursor-status-pet/state.json`

## 接口

```typescript
type AgentStatus = 'idle' | 'working'

interface AgentDetector {
  getStatus(): AgentStatus
  onStatusChange(callback: (status: AgentStatus) => void): void
  start(): void
  stop(): void
}
```

## 验收标准

- [ ] 能检测到 Agent 开始工作
- [ ] 能检测到 Agent 停止工作
- [ ] 状态变化时触发回调
