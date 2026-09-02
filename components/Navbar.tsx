'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Flag from 'react-world-flags'


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false)
  const pathname = usePathname()
  const { t, i18n } = useTranslation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mapeo de los 4 idiomas solicitados con sus respectivas banderas
  const languages = [
    { code: 'en-US', label: 'English (US)', country: 'US' },
    { code: 'es-AR', label: 'Español (AR)', country: 'AR' },
    { code: 'pt-PT', label: 'Português (PT)', country: 'PT' },
    { code: 'de-DE', label: 'Deutsch (DE)', country: 'DE' }
  ]

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value)
  }

  // Detecta la bandera del idioma actual para renderizarla
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  // Enlaces de navegación llamando dinámicamente a la función de traducción t()
  const links = [
    { href: '/', label: t('navbar.home') },
    { href: '/about', label: t('navbar.about') },
    { href: '/donation', label: t('navbar.donation') },
    { href: '/songs', label: t('navbar.songs') },
    // { href: '/playbacks', label: t('navbar.playbacks') },
    { href: '/testimonies', label: t('navbar.testimonies') },
    // { href: '/performances', label: t('navbar.shows') },
    { href: '/contact', label: t('navbar.contact') },
  ]

  if (!mounted) {
    return <nav className="fixed top-0 w-full h-16 z-50 bg-[#0f0f1e]/95 border-b border-white/10" />
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f0f1e]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-[#9900df]">♪</span> JeremiasPDD
        </Link>

        {/* Desktop links - Centrados / Alineados a la izquierda de los botones */}
        <div className="hidden md:flex items-center gap-8 ml-8 mr-auto">
          {links.map(l => {
            const isActive = pathname === l.href
            return (
              <Link key={l.href} href={l.href}
                className={`text-sm font-medium pb-1 border-b-2 transition-all duration-200 ${isActive
                  ? 'text-[#ffffff] border-[#00F2FE]'
                  : 'text-gray-300 border-transparent hover:text-white'
                  }`}>
                {l.label}
              </Link>
            )
          })}
        </div>

        {/* Bloque de Acciones: Selector de Idioma + Botón Admin */}
        <div className="hidden md:flex items-center gap-4">

          {/* CONTENEDOR RELATIVE OBLIGATORIO: Mantiene el desplegable en su lugar */}
          <div className="relative">

            {/* Botón disparador de escritorio */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 hover:border-white/20 transition text-sm text-white font-medium"
            >
              <div className="w-5 h-4 flex items-center overflow-hidden rounded-sm shrink-0">
                <Flag code={currentLanguage.country} className="w-full object-cover" />
              </div>
              <span>{currentLanguage.label}</span>
              <span className="text-gray-400 text-xs transition-transform duration-200" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                ▼
              </span>
            </button>

            {/* Lista flotante de opciones */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0f0f1e] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setIsDropdownOpen(false); // Cierra el menú al elegir
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-white hover:bg-white/10 transition ${i18n.language === lang.code ? 'bg-white/5 text-[#FF4B6E] font-semibold' : ''
                      }`}
                  >
                    <div className="w-5 h-4 flex items-center overflow-hidden rounded-sm shrink-0">
                      <Flag code={lang.country} className="w-full object-cover" />
                    </div>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Admin Button (Queda perfectamente alineado al lado del selector) */}
          <Link href="/admin" className="px-4 py-1.5 bg-[#9900df] hover:bg-[#e03d5f] text-white rounded-lg text-sm font-semibold transition">
            Admin
          </Link>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white flex items-center gap-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Menu Desplegable Mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#0f0f1e] border-t border-white/10 px-6 py-4 space-y-4">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`block text-sm font-medium transition ${pathname === l.href ? 'text-[#9900df]' : 'text-gray-300 hover:text-white'
                }`}
              onClick={() => setIsOpen(false)}>
              {l.label}
            </Link>
          ))}

          {/* Selector de Idioma en Mobile Custom (Formato Acordeón) */}
          <div className="w-full bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300">

            {/* Botón Principal del Acordeón Móvil */}
            <button
              onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-white hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-4 flex items-center overflow-hidden rounded-sm shrink-0">
                  <Flag code={currentLanguage.country} className="w-full object-cover" />
                </div>
                <span>{currentLanguage.label}</span>
              </div>
              <span className="text-gray-400 text-xs transition-transform duration-200" style={{ transform: isMobileLangOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                ▼
              </span>
            </button>

            {/* Lista Desplegable de Idiomas (Se abre hacia abajo) */}
            {isMobileLangOpen && (
              <div className="border-t border-white/5 bg-black/20 divide-y divide-white/5">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setIsMobileLangOpen(false); // Cierra el acordeón de idiomas
                      setIsOpen(false);           // Cierra el menú de hamburguesa general
                    }}
                    className={`w-full flex items-center gap-3 px-6 py-3 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white transition ${i18n.language === lang.code ? 'bg-white/5 text-[#FF4B6E] font-semibold' : ''
                      }`}
                  >
                    <div className="w-5 h-4 flex items-center overflow-hidden rounded-sm shrink-0">
                      <Flag code={lang.country} className="w-full object-cover" />
                    </div>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Admin Button Mobile */}
          <Link href="/admin"
            className="block text-center px-4 py-2 bg-[#9900df] text-white rounded-lg text-sm font-semibold"
            onClick={() => setIsOpen(false)}>
            Admin
          </Link>
        </div>
      )}
    </nav>
  )
}