import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { EventEmitter } from 'events'

export type AgentStatus = 'idle' | 'working'

// Hooks 状态文件路径
const STATE_FILE = join(process.env.APPDATA || '', 'cursor-status-pet', 'state.json')
const IDLE_TIMEOUT_MS = 10000 // 10秒无活动视为空闲

export class AgentDetector extends EventEmitter {
  private status: AgentStatus = 'idle'
  private timer: NodeJS.Timeout | null = null
  private pollInterval = 500 // 更快轮询

  getStatus(): AgentStatus {
    return this.status
  }

  start(): void {
    this.poll()
    this.timer = setInterval(() => this.poll(), this.pollInterval)
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  private poll(): void {
    const newStatus = this.detectStatus()
    if (newStatus !== this.status) {
      this.status = newStatus
      this.emit('statusChange', this.status)
    }
  }

  private detectStatus(): AgentStatus {
    try {
      if (!existsSync(STATE_FILE)) return 'idle'

      const data = JSON.parse(readFileSync(STATE_FILE, 'utf-8'))
      const elapsed = Date.now() - data.timestamp

      // 如果状态文件标记为工作中且未超时
      if (data.working && elapsed < IDLE_TIMEOUT_MS) {
        return 'working'
      }

      return 'idle'
    } catch {
      return 'idle'
    }
  }
}
