'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
// Importamos los logos de las plataformas que ya tienes en react-icons
import { SiSpotify, SiApplemusic, SiYoutubemusic } from 'react-icons/si'

interface Playback {
  id: string
  title: string
  genre: string
  audio_url: string
  spotify_url?: string // Campos opcionales por si alguna canción no está en todas las plataformas
  apple_url?: string
  youtube_url?: string
}

export default function Playbacks() {
  const [playbacks, setPlaybacks] = useState<Playback[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Fetch backing tracks from the database
  useEffect(() => {
    async function fetchPlaybacks() {
      const { data } = await supabase
        .from('playbacks')
        .select('*')
        .order('created_at', { ascending: false })
      setPlaybacks(data || [])
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
                className={`bg-white/5 border rounded-2xl p-5 transition flex flex-col cursor-pointer ${
                  currentIndex === index ? 'border-[#FF4B6E]/70 bg-white/10' : 'border-white/10 hover:border-[#FF4B6E]/30'
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
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                          <path d="M8 5v14l11-7z"/>
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


// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { supabase } from '@/lib/supabase'

// interface Playback {
//   id: string
//   title: string
//   genre: string
//   price: number
//   audio_url: string
// }

// export default function Playbacks() {
//   const [playbacks, setPlaybacks] = useState<Playback[]>([])
//   const [loading, setLoading] = useState(true)
//   const [currentIndex, setCurrentIndex] = useState<number | null>(null)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [progress, setProgress] = useState(0)
//   const [duration, setDuration] = useState(0)
//   const audioRef = useRef<HTMLAudioElement | null>(null)

//   // Fetch backing tracks from the database
//   useEffect(() => {
//     async function fetchPlaybacks() {
//       const { data } = await supabase
//         .from('playbacks')
//         .select('*')
//         .order('created_at', { ascending: false })
//       setPlaybacks(data || [])
//       setLoading(false)
//     }
//     fetchPlaybacks()
//   }, [])

//   // Audio lifecycle management and auto-advance to the next backing track
//   useEffect(() => {
//     if (currentIndex === null) return
//     const pb = playbacks[currentIndex]
//     if (!pb?.audio_url) return

//     if (audioRef.current) {
//       audioRef.current.pause()
//     }

//     const audio = new Audio(pb.audio_url)
//     audioRef.current = audio

//     audio.addEventListener('timeupdate', () => {
//       setProgress(audio.currentTime)
//     })
//     audio.addEventListener('loadedmetadata', () => {
//       setDuration(audio.duration)
//     })
//     audio.addEventListener('ended', () => {
//       // Auto-advance to the next backing track in the list
//       if (currentIndex < playbacks.length - 1) {
//         setCurrentIndex(currentIndex + 1)
//       } else {
//         setIsPlaying(false)
//         setCurrentIndex(null)
//       }
//     })

//         audio.play()
//     setIsPlaying(true)

//     return () => {
//       audio.pause()
//     }
//   }, [currentIndex, playbacks])

//   // Play and Pause function
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

//   const formatTime = (t: number) => {
//     const m = Math.floor(t / 60)
//     const s = Math.floor(t % 60)
//     return `${m}:${s.toString().padStart(2, '0')}`
//   }

//   return (
//     <main className="min-h-screen pt-24 pb-16 px-4 bg-[#0f0f1e]">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
//           <span className="text-[#FF4B6E]">Backing Tracks</span>
//         </h1>
//         <p className="text-gray-400 text-center mb-16">Professional backing tracks for purchase</p>

//         {loading ? (
//           <p className="text-center text-gray-400">Loading...</p>
//         ) : playbacks.length === 0 ? (
//           <p className="text-center text-gray-400">No backing tracks available yet</p>
//         ) : (
//           <div className="space-y-4">
//             {playbacks.map((pb, index) => (
//               <div 
//                 key={pb.id}
//                 onClick={() => togglePlay(index)}
//                 className={`bg-white/5 border rounded-2xl p-6 transition flex flex-col cursor-pointer ${
//                   currentIndex === index ? 'border-[#FF4B6E]/70 bg-white/10' : 'border-white/10 hover:border-[#FF4B6E]/40'
//                 }`}
//               >
//                 {/* Top Row: Play button, Details, and Order button */}
//                 <div className="flex items-center justify-between gap-4 w-full">
                  
//                   <div className="flex items-center gap-4 flex-1">
//                     {/* 1. Circular play button styled with SVG */}
//                     <button 
//                       onClick={(e) => { e.stopPropagation(); togglePlay(index); }}
//                       className="w-12 h-12 rounded-full bg-[#FF4B6E] flex items-center justify-center hover:bg-[#e03d5f] transition-all duration-300 text-white shrink-0 shadow-lg shadow-[#FF4B6E]/20"
//                     >
//                       {currentIndex === index && isPlaying ? (
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                           <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
//                         </svg>
//                       ) : (
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
//                           <path d="M8 5v14l11-7z"/>
//                         </svg>
//                       )}
//                     </button>

//                     <div>
//                       <h3 className="text-xl font-bold mb-1 text-white">{pb.title}</h3>
//                       <p className="text-gray-400 text-sm">
//                         {pb.genre && `${pb.genre} • `}
//                         {pb.price ? <span className="text-[#FF4B6E] font-semibold">${pb.price}</span> : 'Free'}
//                       </p>
//                     </div>
//                   </div>

//                   {/* 2. Order button with dynamically encoded Query Parameter */}
//                   <div className="flex gap-3 shrink-0" onClick={e => e.stopPropagation()}>
//                     <a 
//                       href={`/contact?subject=${encodeURIComponent(`Interested in purchasing the backing track: ${pb.title}`)}`}
//                       className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
//                       style={{ background: 'linear-gradient(135deg, #FF4B6E, #FFB347)' }}
//                     >
//                       Order Now
//                     </a>
//                   </div>
//                 </div>

//                 {/* 3. Internal and custom Progress Bar - only visible when the track is playing */}
//                 {currentIndex === index && (
//                   <div 
//                     className="mt-5 pt-4 border-t border-white/5 flex items-center gap-3 w-full animate-fadeIn"
//                     onClick={e => e.stopPropagation()}
//                   >
//                     <span className="text-gray-400 text-xs w-10 text-left select-none">{formatTime(progress)}</span>
                    
//                     {/* Progress bar completely adapted to LTR */}
//                     <div 
//                       className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer relative group"
//                       onClick={e => {
//                         const rect = e.currentTarget.getBoundingClientRect()
//                         // Position calculation according to Left-to-Right orientation (LTR)
//                         const ratio = (e.clientX - rect.left) / rect.width
//                         if (audioRef.current) {
//                           audioRef.current.currentTime = Math.max(0, Math.min(1, ratio)) * duration
//                         }
//                       }}
//                     >
//                       <div 
//                         className="h-full bg-[#FF4B6E] rounded-full absolute left-0 top-0 transition-all duration-100 group-hover:bg-[#e03d5f]"
//                         style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} 
//                       />
//                     </div>
                    
//                     <span className="text-gray-400 text-xs w-10 select-none text-right">{formatTime(duration)}</span>
//                   </div>
//                 )}

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   )
// }