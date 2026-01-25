interface Window {
  api: {
    getAgentStatus: () => Promise<'idle' | 'working'>
    onAgentStatus: (callback: (status: 'idle' | 'working') => void) => void
    onSchemeChange: (callback: (scheme: 'A' | 'B') => void) => void
  }
}
