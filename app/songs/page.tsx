'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { SiSpotify, SiApplemusic } from 'react-icons/si'
import { useTranslation } from 'react-i18next'

interface Song {
  id: string
  title: string
  artist: string
  album?: string
  youtube_url?: string // Contiene el enlace de YouTube Music
  spotify_url?: string
  apple_url?: string
}

// Función auxiliar para extraer el ID de la canción de YouTube Music
const obtenerYoutubeMusicId = (url: string | undefined): string | null => {
  if (!url) return null;
  // Soporta formatos estándar, compartidos y de ://youtube.com
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|list=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function Songs() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  // Cargar lanzamientos desde la base de datos de Supabase
  useEffect(() => {
    async function fetchSongs() {
      const { data } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false })
      setSongs(data || [])
      setLoading(false)
    }
    fetchSongs()
  }, [])

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 bg-[#0f0f1e]">
      <div className="max-w-7xl mx-auto"> {/* Ampliado el ancho máximo a 7xl para dar más espacio horizontal */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
          <span className="text-[#FF4B6E]"> {t('songs.title')}</span>
        </h1>
        <p className="text-gray-400 text-center mb-16 text-sm md:text-base">
          {t('songs.p')}
        </p>

        {loading ? (
          <p className="text-center text-gray-400 text-sm">{t('songs.loading')}</p>
        ) : songs.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">{t('songs.noTracks')}</p>
        ) : (
          /* SOLUCIÓN HORIZONTAL: 'lg:grid-cols-3' obliga a renderizar exactamente 3 canciones por fila en PC */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map((song) => {
              const musicId = obtenerYoutubeMusicId(song.youtube_url);

              return (
                <div
                  key={song.id}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between p-4 shadow-xl"
                >
                  <div className="space-y-4">

                    {/* REPRODUCTOR OFICIAL DE YOUTUBE CON ESCALA AMPLIADA */}
                    {musicId ? (
                      /* SOLUCIÓN MINIATURA: 'aspect-video' da el tamaño rectangular perfecto para que Google active las portadas y botones nativos */
                      <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/5 shadow-inner bg-black">
                        <iframe
                          width="100%"
                          height="100%"
                          // Eliminamos 'app=music' para asegurar que levante la miniatura y controles globales de la pista
                          src={`https://youtube.com/embed/${musicId}?controls=1&modestbranding=1&hl=es&rel=0`}
                          title={song.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full block"
                          style={{ colorScheme: 'dark' }}
                        ></iframe>
                      </div>
                    ) : (
                      /* Respaldo si no hay enlace en la fila */
                      <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-[#FF4B6E]/10 to-[#6B5B95]/10 flex items-center justify-center border border-white/5">
                        <span className="text-xl opacity-30">🎵 {t('songs.missing')}</span>
                      </div>
                    )}

                    {/* Detalles informativos de la canción */}
                    <div className="px-1 pt-1">
                      <h3 className="text-base font-bold text-white truncate leading-tight">{song.title}</h3>
                      <p className="text-gray-400 text-[11px] mt-1 truncate">
                        {song.artist}{song.album && ` • ${song.album}`}
                      </p>
                    </div>
                  </div>

                  {/* ENLACES A PLATAFORMAS COMPLEMENTARIAS */}
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-start gap-2.5">
                    {song.spotify_url && (
                      <a href={song.spotify_url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1DB954]/10 border border-[#1DB954]/20 text-[#1DB954] hover:bg-[#1DB954] hover:text-white transition duration-300 text-[10px] font-bold tracking-wide uppercase" title="Listen on Spotify">
                        <SiSpotify className="text-xs" />
                        <span>Spotify</span>
                      </a>
                    )}

                    {song.apple_url && (
                      <a href={song.apple_url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FC3C44]/10 border border-[#FC3C44]/20 text-[#FC3C44] hover:bg-[#FC3C44] hover:text-white transition duration-300 text-[10px] font-bold tracking-wide uppercase" title="Listen on Apple Music">
                        <SiApplemusic className="text-xs" />
                        <span>Apple</span>
                      </a>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  )
}

// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { supabase } from '@/lib/supabase'

// interface Song {
//   id: string
//   title: string
//   artist: string
//   album: string
//   audio_url: string
//   cover_url: string
// }

// export default function Albums() {
//   const [songs, setSongs] = useState<Song[]>([])
//   const [loading, setLoading] = useState(true)
//   const [currentIndex, setCurrentIndex] = useState<number | null>(null)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [progress, setProgress] = useState(0)
//   const [duration, setDuration] = useState(0)
//   const audioRef = useRef<HTMLAudioElement | null>(null)

//   useEffect(() => {
//     async function fetchSongs() {
//       const { data } = await supabase
//         .from('songs')
//         .select('*')
//         .order('created_at', { ascending: false })
//       setSongs(data || [])
//       setLoading(false)
//     }
//     fetchSongs()
//   }, [])

//   useEffect(() => {
//     if (currentIndex === null) return
//     const song = songs[currentIndex]
//     if (!song?.audio_url) return

//     if (audioRef.current) {
//       audioRef.current.pause()
//     }

//     const audio = new Audio(song.audio_url)
//     audioRef.current = audio

//     audio.addEventListener('timeupdate', () => {
//       setProgress(audio.currentTime)
//     })
//     audio.addEventListener('loadedmetadata', () => {
//       setDuration(audio.duration)
//     })
//     audio.addEventListener('ended', () => {
//       // Advance to the next song
//       if (currentIndex < songs.length - 1) {
//         setCurrentIndex(currentIndex + 1)
//       } else {
//         setIsPlaying(false)
//         setCurrentIndex(null)
//       }
//     })

//     audio.play()
//     setIsPlaying(true)

//     return () => {
//       audio.pause()
//     }
//   }, [currentIndex])

//   const togglePlay = (index: number) => {
//     if (currentIndex === index) {
//       if (isPlaying) {
//         audioRef.current?.pause()
//         setIsPlaying(false)
//       } else {
//         audioRef.current?.play()
//         setIsPlaying(true)
//       }
//     } else {
//       setCurrentIndex(index)
//     }
//   }

//   const playNext = () => {
//     if (currentIndex !== null && currentIndex < songs.length - 1) {
//       setCurrentIndex(currentIndex + 1)
//     }
//   }

//   const playPrev = () => {
//     if (currentIndex !== null && currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1)
//     }
//   }

//   const formatTime = (t: number) => {
//     const m = Math.floor(t / 60)
//     const s = Math.floor(t % 60)
//     return `${m}:${s.toString().padStart(2, '0')}`
//   }

//   const currentSong = currentIndex !== null ? songs[currentIndex] : null

//   return (
//     <main className="min-h-screen pt-24 pb-36 px-4 bg-[#0f0f1e]">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
//           <span className="text-[#FF4B6E]">Songs & Tracks</span>
//         </h1>
//         <p className="text-gray-400 text-center mb-16">All music releases by JeremiasPDD</p>

//         {loading ? (
//           <p className="text-center text-gray-400">Loading...</p>
//         ) : songs.length === 0 ? (
//           <p className="text-center text-gray-400">No tracks available yet</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {songs.map((song, index) => (
//               <div key={song.id}
//                 className={`bg-white/5 border rounded-2xl overflow-hidden transition cursor-pointer ${currentIndex === index ? 'border-[#FF4B6E]/70' : 'border-white/10 hover:border-[#FF4B6E]/40'
//                   }`}
//                 onClick={() => togglePlay(index)}>

//                 {/* Cover Image + Play Button overlay */}
//                 <div className="h-48 bg-gradient-to-br from-[#FF4B6E]/30 to-[#6B5B95]/30 flex items-center justify-center relative">
//                   {song.cover_url ? (
//                     <img src={song.cover_url} alt={song.title} className="w-full h-full object-cover" />
//                   ) : (
//                     <span className="text-6xl">♪</span>
//                   )}
//                   <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
//                     <div className="w-14 h-14 rounded-full bg-[#FF4B6E] flex items-center justify-center">
//                       {currentIndex === index && isPlaying
//                         ? <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
//                         : <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
//                       }
//                     </div>
//                   </div>
//                   {currentIndex === index && isPlaying && (
//                     <div className="absolute bottom-2 left-2 flex gap-1">
//                       {[1, 2, 3].map(i => (
//                         <div key={i} className="w-1 bg-[#FF4B6E] rounded-full animate-bounce"
//                           style={{ height: '12px', animationDelay: `${i * 0.1}s` }} />
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Track Details */}
//                 <div className="p-5">
//                   <h3 className="text-lg font-bold mb-1">{song.title}</h3>
//                   <p className="text-gray-400 text-sm">
//                     {song.artist}{song.album && ` • ${song.album}`}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>


//       {/* Bottom Player */}
//       {
//         currentSong && (
//           <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f1e]/95 backdrop-blur border-t border-white/10 px-4 py-3 z-50">
//             <div className="max-w-6xl mx-auto flex flex-col gap-2">

//               {/* Top Row: Cover + Title + Controls */}
//               <div className="flex items-center justify-between">

//                 {/* Cover + Title */}
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#FF4B6E]/20 flex items-center justify-center flex-shrink-0">
//                     {currentSong.cover_url
//                       ? <img src={currentSong.cover_url} alt={currentSong.title} className="w-full h-full object-cover" />
//                       : <span>♪</span>}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-sm truncate max-w-[120px] md:max-w-xs">{currentSong.title}</p>
//                     <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
//                   </div>
//                 </div>

//                 {/* Control Buttons */}
//                 <div className="flex items-center gap-3">
//                   <button onClick={playPrev} disabled={currentIndex === 0}
//                     className="text-gray-400 hover:text-white disabled:opacity-30 transition">
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
//                   </button>
//                   <button onClick={() => togglePlay(currentIndex!)}
//                     className="w-10 h-10 rounded-full bg-[#FF4B6E] flex items-center justify-center hover:bg-[#e03d5f] transition">
//                     {isPlaying
//                       ? <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
//                       : <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
//                     }
//                   </button>
//                   <button onClick={playNext} disabled={currentIndex === songs.length - 1}
//                     className="text-gray-400 hover:text-white disabled:opacity-30 transition">
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" /></svg>
//                   </button>
//                 </div>

//               </div>

//               {/* Bottom Row: Progress Bar */}
//               <div className="flex items-center gap-2 w-full">
//                 <span className="text-gray-400 text-xs w-8">{formatTime(progress)}</span>
//                 <div className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer"
//                   onClick={e => {
//                     const rect = e.currentTarget.getBoundingClientRect()
//                     // Corregido para reproducir de izquierda a derecha de forma nativa (Estándar LTR)
//                     const ratio = (e.clientX - rect.left) / rect.width
//                     if (audioRef.current) {
//                       audioRef.current.currentTime = ratio * duration
//                     }
//                   }}>
//                   <div className="h-full bg-[#FF4B6E] rounded-full transition-all duration-100"
//                     style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} />
//                 </div>
//                 <span className="text-gray-400 text-xs w-8">{formatTime(duration)}</span>
//               </div>

//             </div>
//           </div>
//         )
//       }
//     </main >
//   )
// }