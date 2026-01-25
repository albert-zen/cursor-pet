import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getAgentStatus: () => ipcRenderer.invoke('get-agent-status'),
  onAgentStatus: (callback: (status: string) => void) => {
    ipcRenderer.on('agent-status', (_e, status) => callback(status))
  },
  onSchemeChange: (callback: (scheme: string) => void) => {
    ipcRenderer.on('scheme-change', (_e, scheme) => callback(scheme))
  },
})
