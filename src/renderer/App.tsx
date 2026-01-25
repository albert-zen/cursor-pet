import React, { useEffect, useState } from 'react'
import SchemeA from './SchemeA'
import SchemeB from './SchemeB'

type Status = 'idle' | 'working'
type Scheme = 'A' | 'B'

export default function App() {
  const [status, setStatus] = useState<Status>('idle')
  const [scheme, setScheme] = useState<Scheme>('A')

  useEffect(() => {
    window.api.getAgentStatus().then(setStatus)
    window.api.onAgentStatus(setStatus)
    window.api.onSchemeChange(setScheme)
  }, [])

  return (
    <>
      {scheme === 'A' ? <SchemeA status={status} /> : <SchemeB status={status} />}
      <style>{`
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
    </>
  )
}
