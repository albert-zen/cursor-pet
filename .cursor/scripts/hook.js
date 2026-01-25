const http = require('http')

const PORT = 19527
const event = process.argv[2]
const working = event === 'beforeSubmitPrompt' || event === 'preToolUse'

// 立即发送 HTTP 请求
const req = http.request({
  hostname: '127.0.0.1',
  port: PORT,
  path: '/status',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, () => {})
req.on('error', () => {})
req.write(JSON.stringify({ event, working, timestamp: Date.now() }))
req.end()

// 消费 stdin 并返回
process.stdin.resume()
process.stdin.on('end', () => {
  console.log(event === 'beforeSubmitPrompt' ? '{"continue":true}' : '{}')
})
