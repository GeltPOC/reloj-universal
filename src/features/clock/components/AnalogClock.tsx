'use client'
import type { ClockInfo } from '../hooks/useClock'

interface Props {
  info: ClockInfo
  size?: number
}

export function AnalogClock({ info, size = 120 }: Props) {
  const { hours, minutes, seconds } = info
  const hourDeg = (hours % 12) * 30 + minutes * 0.5
  const minuteDeg = minutes * 6 + seconds * 0.1
  const secondDeg = seconds * 6

  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 4

  const handX = (deg: number, len: number) =>
    cx + len * Math.sin((deg * Math.PI) / 180)
  const handY = (deg: number, len: number) =>
    cy - len * Math.cos((deg * Math.PI) / 180)

  const tickMarks = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30
    const rad = (angle * Math.PI) / 180
    const outer = r
    const inner = i % 3 === 0 ? r - 10 : r - 6
    return {
      x1: cx + outer * Math.sin(rad),
      y1: cy - outer * Math.cos(rad),
      x2: cx + inner * Math.sin(rad),
      y2: cy - inner * Math.cos(rad),
      major: i % 3 === 0,
    }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Face */}
      <circle cx={cx} cy={cy} r={r} fill="#1e293b" stroke="#334155" strokeWidth="2" />

      {/* Tick marks */}
      {tickMarks.map((t, i) => (
        <line
          key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.major ? '#94a3b8' : '#475569'}
          strokeWidth={t.major ? 2 : 1}
          strokeLinecap="round"
        />
      ))}

      {/* Hour hand */}
      <line
        x1={cx} y1={cy}
        x2={handX(hourDeg, r * 0.5)}
        y2={handY(hourDeg, r * 0.5)}
        stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round"
      />

      {/* Minute hand */}
      <line
        x1={cx} y1={cy}
        x2={handX(minuteDeg, r * 0.7)}
        y2={handY(minuteDeg, r * 0.7)}
        stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"
      />

      {/* Second hand */}
      <line
        x1={cx} y1={cy}
        x2={handX(secondDeg, r * 0.8)}
        y2={handY(secondDeg, r * 0.8)}
        stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={3} fill="#f97316" />
    </svg>
  )
}
