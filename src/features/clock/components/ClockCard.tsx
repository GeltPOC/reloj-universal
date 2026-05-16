'use client'
import { useClock } from '../hooks/useClock'
import { AnalogClock } from './AnalogClock'
import type { TimezoneEntry } from '../data/timezones'

interface Props {
  entry: TimezoneEntry
  onRemove: () => void
}

export function ClockCard({ entry, onRemove }: Props) {
  const info = useClock(entry)

  const bgGradient = info.isDay
    ? 'from-blue-900/40 to-indigo-900/30'
    : 'from-gray-900/60 to-slate-900/50'

  const accentColor = info.isDay ? 'text-blue-400' : 'text-indigo-400'

  return (
    <div className={`relative bg-gradient-to-br ${bgGradient} border border-white/10 rounded-2xl p-5 flex flex-col gap-3 group hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/30`}>
      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-400 bg-black/40 rounded-full w-6 h-6 flex items-center justify-center text-xs"
        aria-label="Eliminar reloj"
      >
        ✕
      </button>

      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-3xl">{entry.flag}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-base leading-tight truncate">{entry.city}</h3>
          <p className="text-gray-400 text-xs truncate">{entry.country}</p>
          <span className={`text-xs font-mono ${accentColor}`}>{info.utcOffset}</span>
        </div>
        <span className="text-lg">{info.isDay ? '☀️' : '🌙'}</span>
      </div>

      {/* Clocks row */}
      <div className="flex items-center gap-4">
        <AnalogClock info={info} size={100} />
        <div className="flex flex-col gap-1">
          <div className="font-mono text-2xl font-bold text-white tracking-wider">
            {info.time}
          </div>
          <div className="text-gray-400 text-xs leading-snug capitalize">
            {info.date}
          </div>
          <div className="mt-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
              {entry.region}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
