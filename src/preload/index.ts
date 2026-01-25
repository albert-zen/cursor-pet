import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
  // 后续添加状态检测 API
})
