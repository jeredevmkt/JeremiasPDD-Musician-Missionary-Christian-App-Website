'use client'

import { useState, useEffect } from 'react'
import { SiSpotify, SiApplemusic } from 'react-icons/si'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic';
import i18next from 'i18next';
import '../../lib/i18n';
import { getSongsAction } from '../../lib/actions'

export interface Song {
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

function Songs() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // --- Mantenemos intacto tu bloque de salvavidas para i18next ---
    if (i18next.isInitialized) {
      setIsReady(true);
    } else {
      const handleInitialized = () => {
        setIsReady(true);
      };
      i18next.on('initialized', handleInitialized);

      const backupTimer = setTimeout(() => {
        setIsReady(true);
      }, 100);

      return () => {
        i18next.off('initialized', handleInitialized);
        clearTimeout(backupTimer);
      };
    }

    // --- Nueva función adaptada para Neon ---
    async function fetchSongs() {
      const result = await getSongsAction()

      if (result.success) {
        setSongs(result.data) // TypeScript lo aceptará sin problemas gracias al tipado de la acción
      } else {
        setSongs([])
      }
      setLoading(false)
    }

    fetchSongs()
  }, []);

  // Si i18next no ha cargado los diccionarios en memoria, congelamos el renderizado
  if (!isReady) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center text-white">
        <p className="text-lg">Loading translations...</p>
      </div>
    );
  }

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

export default dynamic(() => Promise.resolve(Songs), {
  ssr: false
});
