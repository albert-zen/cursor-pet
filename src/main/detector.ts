import { createServer, Server } from 'http'
import { EventEmitter } from 'events'

export type AgentStatus = 'idle' | 'working'

const PORT = 19527

export class AgentDetector extends EventEmitter {
  private status: AgentStatus = 'idle'
  private server: Server | null = null

  getStatus(): AgentStatus {
    return this.status
  }

  start(): void {
    this.server = createServer((req, res) => {
      if (req.method === 'POST' && req.url === '/status') {
        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {
          try {
            const data = JSON.parse(body)
            const newStatus: AgentStatus = data.working ? 'working' : 'idle'
            if (newStatus !== this.status) {
              this.status = newStatus
              this.emit('statusChange', this.status)
            }
            res.writeHead(200)
            res.end('ok')
          } catch {
            res.writeHead(400)
            res.end('bad request')
          }
        })
      } else {
        res.writeHead(404)
        res.end()
      }
    })

    this.server.listen(PORT, '127.0.0.1', () => {
      console.log(`Detector listening on http://127.0.0.1:${PORT}`)
    })
  }

  stop(): void {
    this.server?.close()
    this.server = null
  }
}
