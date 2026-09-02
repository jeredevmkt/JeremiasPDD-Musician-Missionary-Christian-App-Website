'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next';
import {
  SiYoutube,
  SiInstagram,
  SiTiktok,
  SiFacebook,
  SiSpotify,
  SiApplemusic,
  SiSoundcloud,
  SiDailymotion
} from 'react-icons/si';

export default function Footer() {

  const { t } = useTranslation()

  return (
    <footer className="bg-[#0d0d1a] border-t border-white/10 py-4 px4" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-2 text-right">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-lg text-white">JeremiasPDD</span>
              <div className="w-8 h-8 rounded-lg bg-[#00F2FE] flex items-center justify-center text-black text-sm">♪</div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
            </p>
          </div>

          {/* PDD Records and SMEDIA */}
          <div className="flex md:flex-nowrap items-center justify-center gap-3 md:gap-6 gap-2 w-full md:w-auto">

            {/* BOTÓN DAILYMOTION (Dinámico por i18n) */}
            <a
              href={t('footer.dailymotion')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-[#0066DC] hover:-translate-y-1 shadow-md hover:shadow-[#0066DC]/20 transition-all duration-300 shrink-0"
              aria-label="Dailymotion"
            >
              <SiDailymotion className="w-6 h-6" />
            </a>

            {/* BOTÓN SOUNDCLOUD */}
            <a
              href="https://soundcloud.com/jeremiaspdd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-[#FF5500] hover:-translate-y-1 shadow-md hover:shadow-[#FF5500]/20 transition-all duration-300"
              aria-label="SoundCloud"
            >
              <SiSoundcloud className="w-10 h-10" />
            </a>

            {/* BOTÓN SPOTIFY */}
            <a
              href="https://open.spotify.com/intl-es/artist/1N5hJIV6KdhgNiSbNAwhIn?si=SjTqDTc9SaCo8stwlbX8Yg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-[#1DB954] hover:-translate-y-1 shadow-md hover:shadow-[#1DB954]/20 transition-all duration-300 shrink-0"
              aria-label="Spotify"
            >
              <SiSpotify className="w-6 h-6" />
            </a>

            {/* BOTÓN APPLE MUSIC */}
            <a
              href="https://music.apple.com/ar/artist/jeremiaspdd/1651145717?l=en-GB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-[#FC3C44] hover:-translate-y-1 shadow-md hover:shadow-[#FC3C44]/20 transition-all duration-300 shrink-0"
              aria-label="Apple Music"
            >
              <SiApplemusic className="w-6 h-6" />
            </a>

            {/* BOTÓN TIKTOK */}
            <a
              href="https://www.tiktok.com/@jeremiaspdd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-[#000000] hover:-translate-y-1 shadow-md hover:shadow-black/40 transition-all duration-300 shrink-0"
              aria-label="TikTok"
            >
              <SiTiktok className="w-5 h-5" />
            </a>

            {/* BOTÓN FACEBOOK */}
            <a
              href="https://www.facebook.com/jeremiaspddoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-[#1877F2] hover:-translate-y-1 shadow-md hover:shadow-[#1877F2]/20 transition-all duration-300 shrink-0"
              aria-label="Facebook"
            >
              <SiFacebook className="w-6 h-6" />
            </a>

            {/* BOTÓN INSTAGRAM */}
            <a
              href="https://www.instagram.com/jeremiaspdd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-[#E1306C] hover:-translate-y-1 shadow-md hover:shadow-[#E1306C]/20 transition-all duration-300 shrink-0"
              aria-label="Instagram"
            >
              <SiInstagram className="w-6 h-6" />
            </a>

            {/* BOTÓN YOUTUBE (Dinámico por i18n) */}
            <a
              href={t('footer.youtube')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-[#FF0000] hover:-translate-y-1 shadow-md hover:shadow-[#FF0000]/20 transition-all duration-300 shrink-0"
              aria-label="YouTube"
            >
              <SiYoutube className="w-6 h-6" />
            </a>

          </div>
        </div>

        <div className="border-t border-white/10 pt-2 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-2">
          <p>{t('footer.created')}</p>
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
