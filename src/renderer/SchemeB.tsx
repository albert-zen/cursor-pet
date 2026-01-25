import React from 'react'

interface Props {
  status: 'idle' | 'working'
}

export default function SchemeB({ status }: Props) {
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
          fontSize: 48,
          animation: isWorking ? 'bounce 0.5s infinite' : 'idle 2s infinite',
        }}
      >
        {isWorking ? '🤖' : '😴'}
      </div>
    </div>
  )
}
