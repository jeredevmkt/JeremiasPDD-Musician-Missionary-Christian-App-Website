'use client'

import { useState, useEffect, useRef } from 'react'
// Importamos los logos de las plataformas que ya tienes en react-icons
import { SiSpotify, SiApplemusic, SiYoutubemusic } from 'react-icons/si'
import dynamic from 'next/dynamic';
import i18next from 'i18next';
import '../../lib/i18n';
import { getPlaybacksAction } from '../../lib/actions'
interface Playback {
  id: string
  title: string
  genre: string
  audio_url: string
  spotify_url?: string // Campos opcionales por si alguna canción no está en todas las plataformas
  apple_url?: string
  youtube_url?: string
}

function Playbacks() {
  const [playbacks, setPlaybacks] = useState<Playback[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Verificamos si i18next está inicializado de verdad
    if (i18next.isInitialized) {
      setIsReady(true);
    } else {
      // Si no lo está, escuchamos su evento nativo de inicialización
      const handleInitialized = () => {
        setIsReady(true);
      };
      i18next.on('initialized', handleInitialized);

      // Como salvavidas, si tarda demasiado, forzamos el encendido a los 100ms
      const backupTimer = setTimeout(() => {
        setIsReady(true);
      }, 100);

      return () => {
        i18next.off('initialized', handleInitialized);
        clearTimeout(backupTimer);
      };
    }
  }, []);

  // Si i18next no ha cargado los diccionarios en memoria, congelamos el renderizado
  if (!isReady) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center text-white">
        <p className="text-lg">Loading translations...</p>
      </div>
    );
  }

  // Fetch backing tracks from the database
  useEffect(() => {
    async function fetchPlaybacks() {
      // Llamamos a la acción segura del servidor
      const result = await getPlaybacksAction()

      if (result.success) {
        setPlaybacks(result.data as Playback[])
      } else {
        setPlaybacks([])
      }
      setLoading(false)
    }

    fetchPlaybacks()
  }, [])


  // Audio lifecycle management
  useEffect(() => {
    if (currentIndex === null) return
    const pb = playbacks[currentIndex]
    if (!pb?.audio_url) return

    if (audioRef.current) {
      audioRef.current.pause()
    }

    const audio = new Audio(pb.audio_url)
    audioRef.current = audio

    audio.addEventListener('timeupdate', () => setProgress(audio.currentTime))
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('ended', () => {
      if (currentIndex < playbacks.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setIsPlaying(false)
        setCurrentIndex(null)
      }
    })

    audio.play()
    setIsPlaying(true)

    return () => audio.pause()
  }, [currentIndex, playbacks])

  const togglePlay = (index: number) => {
    if (currentIndex === index) {
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false)
      } else {
        audioRef.current?.play()
        setIsPlaying(true)
      }
    } else {
      setCurrentIndex(index)
    }
  }

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-[#0f0f1e]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
          <span className="text-[#FF4B6E]">Discography</span>
        </h1>
        <p className="text-gray-400 text-center mb-16 text-sm md:text-base">Listen to my latest tracks and streams</p>

        {loading ? (
          <p className="text-center text-gray-400 text-sm">Loading tracks...</p>
        ) : playbacks.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">No tracks available yet</p>
        ) : (
          <div className="space-y-4">
            {playbacks.map((pb, index) => (
              <div
                key={pb.id}
                onClick={() => togglePlay(index)}
                className={`bg-white/5 border rounded-2xl p-5 transition flex flex-col cursor-pointer ${currentIndex === index ? 'border-[#FF4B6E]/70 bg-white/10' : 'border-white/10 hover:border-[#FF4B6E]/30'
                  }`}
              >
                {/* Top Row: Play button, Details, and Streaming Icons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">

                  <div className="flex items-center gap-4 flex-1">
                    {/* Botón Circular de Play */}
                    <button
                      onClick={(e) => { e.stopPropagation(); togglePlay(index); }}
                      className="w-11 h-11 rounded-full bg-[#FF4B6E] flex items-center justify-center hover:bg-[#e03d5f] transition-all duration-300 text-white shrink-0 shadow-lg"
                    >
                      {currentIndex === index && isPlaying ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">{pb.title}</h3>
                      <p className="text-gray-400 text-xs mt-1">
                        {pb.genre && `${pb.genre}`}
                      </p>
                    </div>
                  </div>

                  {/* NUEVA SECCIÓN: Botones directos a Plataformas Musicales */}
                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center" onClick={e => e.stopPropagation()}>

                    {pb.spotify_url && (
                      <a href={pb.spotify_url} target="_blank" rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-[#1DB954]/10 border border-[#1DB954]/20 flex items-center justify-center text-[#1DB954] hover:bg-[#1DB954] hover:text-white transition duration-300" title="Listen on Spotify">
                        <SiSpotify className="text-sm" />
                      </a>
                    )}

                    {pb.apple_url && (
                      <a href={pb.apple_url} target="_blank" rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-[#FC3C44]/10 border border-[#FC3C44]/20 flex items-center justify-center text-[#FC3C44] hover:bg-[#FC3C44] hover:text-white transition duration-300" title="Listen on Apple Music">
                        <SiApplemusic className="text-sm" />
                      </a>
                    )}

                    {pb.youtube_url && (
                      <a href={pb.youtube_url} target="_blank" rel="noreferrer"
                        className="w-8 h-8 rounded-lg bg-[#FF0000]/10 border border-[#FF0000]/20 flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white transition duration-300" title="Watch on YouTube Music">
                        <SiYoutubemusic className="text-sm" />
                      </a>
                    )}

                  </div>
                </div>

                {/* Barra de progreso interactiva al reproducir */}
                {currentIndex === index && (
                  <div
                    className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 w-full"
                    onClick={e => e.stopPropagation()}
                  >
                    <span className="text-gray-400 text-[10px] w-8 text-left select-none">{formatTime(progress)}</span>
                    <div
                      className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer relative group"
                      onClick={e => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const ratio = (e.clientX - rect.left) / rect.width
                        if (audioRef.current) {
                          audioRef.current.currentTime = Math.max(0, Math.min(1, ratio)) * duration
                        }
                      }}
                    >
                      <div
                        className="h-full bg-[#FF4B6E] rounded-full absolute left-0 top-0"
                        style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-[10px] w-8 select-none text-right">{formatTime(duration)}</span>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Playbacks), {
  ssr: false
});
