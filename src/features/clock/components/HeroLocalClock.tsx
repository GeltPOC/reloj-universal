'use client'
import { useLocalClock } from '../hooks/useClock'
import { useEffect, useState } from 'react'

export function HeroLocalClock() {
  const now = useLocalClock()
  const [localTz, setLocalTz] = useState('')

  useEffect(() => {
    setLocalTz(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  const timeStr = now.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const dateStr = now.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const cx = 70
  const cy = 70
  const r = 62

  const hourDeg = (hours % 12) * 30 + minutes * 0.5
  const minuteDeg = minutes * 6 + seconds * 0.1
  const secondDeg = seconds * 6

  const handX = (deg: number, len: number) => cx + len * Math.sin((deg * Math.PI) / 180)
  const handY = (deg: number, len: number) => cy - len * Math.cos((deg * Math.PI) / 180)

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const angle = i * 6
    const rad = (angle * Math.PI) / 180
    const outer = r
    const inner = i % 5 === 0 ? r - 10 : r - 5
    return { x1: cx + outer * Math.sin(rad), y1: cy - outer * Math.cos(rad), x2: cx + inner * Math.sin(rad), y2: cy - inner * Math.cos(rad), major: i % 5 === 0 }
  })

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Analog */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl" />
          <svg width="140" height="140" viewBox="0 0 140 140" className="relative drop-shadow-2xl">
            <circle cx={cx} cy={cy} r={r} fill="#0f172a" stroke="url(#grad)" strokeWidth="3" />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            {ticks.map((t, i) => (
              <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                stroke={t.major ? '#64748b' : '#1e293b'}
                strokeWidth={t.major ? 2 : 1} strokeLinecap="round" />
            ))}
            {/* Hour */}
            <line x1={cx} y1={cy} x2={handX(hourDeg, r * 0.5)} y2={handY(hourDeg, r * 0.5)}
              stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
            {/* Minute */}
            <line x1={cx} y1={cy} x2={handX(minuteDeg, r * 0.7)} y2={handY(minuteDeg, r * 0.7)}
              stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            {/* Second */}
            <line x1={cx} y1={cy} x2={handX(secondDeg, r * 0.85)} y2={handY(secondDeg, r * 0.85)}
              stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r={4} fill="#f97316" />
          </svg>
        </div>

        {/* Digital */}
        <div className="text-center sm:text-left">
          <div className="font-mono text-6xl font-black text-white tracking-widest tabular-nums">
            {timeStr}
          </div>
          <div className="text-gray-400 text-sm mt-1 capitalize">{dateStr}</div>
          {localTz && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
              <span>🌐</span>
              <span>{localTz}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
