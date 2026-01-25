import React, { useEffect, useState } from 'react'

interface Props {
  status: 'idle' | 'working'
}

export default function SchemePixelCat({ status }: Props) {
  const isWorking = status === 'working'
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 2)
    }, isWorking ? 150 : 1000)
    return () => clearInterval(interval)
  }, [isWorking])

  return (
    <div style={{
      width: 120,
      height: 120,
      imageRendering: 'pixelated',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      WebkitAppRegion: 'drag',
      filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.2))'
    }}>
      {/* 像素气泡 */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 10,
        background: '#fff',
        border: '2px solid #000',
        padding: '2px 6px',
        borderRadius: 4,
        fontSize: 12,
        opacity: isWorking ? 1 : 0,
        transition: 'opacity 0.2s',
        transform: `translateY(${frame === 0 ? 0 : -2}px)`
      }}>
        {frame === 0 ? 'TAP' : 'CLACK'}
      </div>

      <div style={{
        fontSize: 64,
        lineHeight: 1,
        transform: isWorking && frame === 0 ? 'translateY(2px)' : 'none',
        transition: 'transform 0.05s'
      }}>
        {isWorking ? (frame === 0 ? '🐱‍💻' : '👨‍💻') : (frame === 0 ? '💤' : '🐱')}
      </div>
      
      <div style={{
        background: '#fff',
        padding: '4px 8px',
        border: '2px solid #000',
        borderRadius: 0,
        fontSize: 10,
        fontFamily: 'monospace',
        marginTop: 10,
        fontWeight: 'bold',
        boxShadow: '2px 2px 0 #000',
        display: 'flex',
        gap: 4
      }}>
        <span style={{ 
          width: 8, 
          height: 8, 
          background: isWorking ? '#4ade80' : '#9ca3af',
          display: 'inline-block',
          border: '1px solid #000'
        }} />
        {isWorking ? 'BUSY' : 'IDLE'}
      </div>
    </div>
  )
}
