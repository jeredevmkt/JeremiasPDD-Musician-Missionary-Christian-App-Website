'use client'

import { useState, useEffect } from 'react'
import { getPerformancesAction } from '../../lib/actions'
export interface Performance {
  id: string
  title: string
  date: string
  hebrew_date: string | null
  location: string
  ticket_url: string
}

function formatGregorianDate(dateStr: string) {
  const d = new Date(dateStr)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${dd}.${mm}.${d.getFullYear()}`
}

function formatWeekday(dateStr: string) {
  // Cambiado de 'he-IL' a 'en-US' para formatear los días de la semana en inglés
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' })
}

export default function Performances() {
  const [performances, setPerformances] = useState<Performance[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch show data from the database
  useEffect(() => {
    async function fetchData() {
      // Llamamos a la acción segura en Neon
      const result = await getPerformancesAction()

      if (result.success) {
        setPerformances(result.data) // TypeScript lo procesará correctamente
      } else {
        setPerformances([])
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-[#0f0f1e]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
          <span className="text-[#FF4B6E]">Shows & Performances</span>
        </h1>
        <p className="text-gray-400 text-center mb-12">Upcoming Live Dates & Events</p>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : performances.length === 0 ? (
          <p className="text-center text-gray-400">No upcoming shows scheduled at the moment</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performances.map((p) => (
              <div
                key={p.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-[#FF4B6E]/40 transition flex flex-col items-center text-center gap-3"
              >
                <div>
                  <h3 className="text-lg font-bold mb-1">
                    {p.title}
                    {p.location && ` - ${p.location}`}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {/* Se removió p.hebrew_date del renderizado para adaptar el string a audiencias internacionales */}
                    {[formatWeekday(p.date), formatGregorianDate(p.date)]
                      .filter(Boolean)
                      .join(' | ')}
                  </p>
                </div>
                {p.ticket_url ? (
                  <a
                    href={p.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl text-white font-semibold text-sm transition hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #FF4B6E, #FFB347)' }}
                  >
                    Get Tickets
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}