import React, { useEffect, useState } from 'react'
import SchemeA from './SchemeA'
import SchemeB from './SchemeB'
import SchemeCyberpunk from './SchemeCyberpunk'
import SchemePixelCat from './SchemePixelCat'

type Status = 'idle' | 'working'
type Scheme = 'A' | 'B' | 'Cyberpunk' | 'PixelCat'

export default function App() {
  const [status, setStatus] = useState<Status>('idle')
  const [scheme, setScheme] = useState<Scheme>('A')

  useEffect(() => {
    window.api.getAgentStatus().then(setStatus)
    window.api.onAgentStatus(setStatus)
    window.api.onSchemeChange((newScheme: string) => setScheme(newScheme as Scheme))
  }, [])

  const renderScheme = () => {
    switch (scheme) {
      case 'A': return <SchemeA status={status} />
      case 'B': return <SchemeB status={status} />
      case 'Cyberpunk': return <SchemeCyberpunk status={status} />
      case 'PixelCat': return <SchemePixelCat status={status} />
      default: return <SchemeA status={status} />
    }
  }

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {renderScheme()}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: transparent; overflow: hidden; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes idle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}
