import React from 'react'

interface Props {
  status: 'idle' | 'working'
}

export default function SchemeCyberpunk({ status }: Props) {
  const isWorking = status === 'working'

  return (
    <div style={{
      width: 160,
      height: 60,
      background: '#050505',
      border: `2px solid ${isWorking ? '#ff00ff' : '#00ffff'}`,
      boxShadow: `0 0 15px ${isWorking ? '#ff00ff' : '#00ffff'}, inset 0 0 10px ${isWorking ? 'rgba(255,0,255,0.3)' : 'rgba(0,255,255,0.3)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Consolas", "Monaco", monospace',
      color: isWorking ? '#ff00ff' : '#00ffff',
      position: 'relative',
      overflow: 'hidden',
      WebkitAppRegion: 'drag',
      clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
      transition: 'all 0.3s ease'
    }}>
      {/* 扫描线背景 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 2px, 3px 100%',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      
      {/* 动态扫描条 */}
      {isWorking && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: '#ff00ff',
          boxShadow: '0 0 10px #ff00ff',
          animation: 'scan 2s linear infinite',
          opacity: 0.7,
          zIndex: 2
        }} />
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 3
      }}>
        <span style={{ 
          textShadow: `0 0 5px ${isWorking ? '#ff00ff' : '#00ffff'}`,
          letterSpacing: 2,
          fontWeight: 'bold',
          fontSize: 16
        }}>
          {isWorking ? 'WARNING' : 'SYSTEM'}
        </span>
        <span style={{ 
          fontSize: 10, 
          opacity: 0.8,
          letterSpacing: 1
        }}>
          {isWorking ? 'AI_ACTIVE' : 'STANDBY'}
        </span>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
