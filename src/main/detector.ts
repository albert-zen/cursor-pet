import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { EventEmitter } from 'events'

export type AgentStatus = 'idle' | 'working'

const CURSOR_LOGS_DIR = join(
  process.env.APPDATA || '',
  'Cursor',
  'logs'
)
const ACTIVE_THRESHOLD_MS = 30000 // 30秒内有更新视为工作中

export class AgentDetector extends EventEmitter {
  private status: AgentStatus = 'idle'
  private timer: NodeJS.Timeout | null = null
  private pollInterval = 2000

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
      const logFile = this.findLatestAgentLog()
      if (!logFile) return 'idle'

      const stat = statSync(logFile)
      const elapsed = Date.now() - stat.mtimeMs
      return elapsed < ACTIVE_THRESHOLD_MS ? 'working' : 'idle'
    } catch {
      return 'idle'
    }
  }

  private findLatestAgentLog(): string | null {
    try {
      // 找最新的日志目录
      const logDirs = readdirSync(CURSOR_LOGS_DIR)
        .filter((d) => /^\d{8}T\d{6}$/.test(d))
        .sort()
        .reverse()

      if (logDirs.length === 0) return null

      const latestDir = join(CURSOR_LOGS_DIR, logDirs[0])
      const extHostDir = join(latestDir, 'window1', 'exthost')

      // 找 output_logging_* 目录
      const outputDirs = readdirSync(extHostDir)
        .filter((d) => d.startsWith('output_logging_'))
        .sort()
        .reverse()

      if (outputDirs.length === 0) return null

      return join(extHostDir, outputDirs[0], '1-Cursor Agent.log')
    } catch {
      return null
    }
  }
}
