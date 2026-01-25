import React from 'react'

interface Props {
  status: 'idle' | 'working'
}

export default function SchemeA({ status }: Props) {
  const isWorking = status === 'working'

  return (
    <div
      style={{
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitAppRegion: 'drag',
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: isWorking ? '#4ade80' : '#6b7280',
          boxShadow: isWorking ? '0 0 20px #4ade80' : 'none',
          animation: isWorking ? 'pulse 1s infinite' : 'none',
        }}
      />
    </div>
  )
}
