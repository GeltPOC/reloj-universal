'use client'
import { useState, useRef, useEffect } from 'react'
import { TIMEZONES } from '../data/timezones'
import type { TimezoneEntry } from '../data/timezones'

interface Props {
  onAdd: (entry: TimezoneEntry) => void
  existing: TimezoneEntry[]
}

export function SearchBar({ onAdd, existing }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const existingKeys = new Set(existing.map(e => `${e.city}|${e.timezone}`))

  const results = query.trim().length < 1
    ? []
    : TIMEZONES.filter(tz => {
        const q = query.toLowerCase()
        return (
          tz.city.toLowerCase().includes(q) ||
          tz.country.toLowerCase().includes(q) ||
          tz.region.toLowerCase().includes(q) ||
          tz.timezone.toLowerCase().includes(q)
        )
      }).slice(0, 12)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (entry: TimezoneEntry) => {
    onAdd(entry)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative w-full max-w-lg">
      <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:border-blue-400/60 focus-within:bg-white/15 transition-all">
        <span className="text-gray-400 text-lg">🔍</span>
        <input
          type="text"
          placeholder="Buscar ciudad, país o región..."
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false) }}
            className="text-gray-500 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-gray-900 border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
          {results.map((tz, i) => {
            const key = `${tz.city}|${tz.timezone}`
            const already = existingKeys.has(key)
            return (
              <button
                key={`${key}-${i}`}
                onClick={() => !already && handleSelect(tz)}
                disabled={already}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-white/5 last:border-0 ${
                  already
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-white/10 cursor-pointer'
                }`}
              >
                <span className="text-xl">{tz.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">{tz.city}</div>
                  <div className="text-gray-400 text-xs truncate">{tz.country} · {tz.region}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-gray-500 text-xs font-mono">{tz.timezone.split('/').pop()?.replace('_', ' ')}</div>
                  {already && <div className="text-green-500 text-xs">Añadido</div>}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {open && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-gray-900 border border-white/20 rounded-xl shadow-2xl p-4 text-center text-gray-500 text-sm z-50">
          No se encontraron resultados para &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}
