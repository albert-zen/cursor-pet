# FEAT-001: Agent 状态检测

## 检测方案

监控 Cursor Agent 日志文件活跃度：
- 路径：`%APPDATA%\Cursor\logs\{最新时间戳}\window1\exthost\output_logging_{时间戳}\1-Cursor Agent.log`
- 判断：文件最近 30 秒内有更新 = 工作中

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
