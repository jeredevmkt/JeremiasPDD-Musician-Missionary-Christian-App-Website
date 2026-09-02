'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    /* send to supabase */
    const { error } = await supabase.from('messages').insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    })

    if (!error) {
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }
    setLoading(false)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-dark">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
          <span className="text-primary">{t('contact.title')}</span>
        </h1>
        <p className="text-white-400 text-center mb-12 text-lg" dir='ltr'>
          {t('contact.subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="bg-dark/50 border border-primary/30 rounded-lg p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">{t('contact.fullname')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-dark/50 border border-primary/30 rounded-lg text-white focus:border-primary outline-none transition"
              placeholder={t('contact.fullnameph')}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">{t('contact.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-dark/50 border border-primary/30 rounded-lg text-white focus:border-primary outline-none transition"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold mb-2">{t('contact.subject')}</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-dark/50 border border-primary/30 rounded-lg text-white focus:border-primary outline-none transition"
              placeholder={t('contact.topic')}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2">{t('contact.msg')}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 bg-dark/50 border border-primary/30 rounded-lg text-white focus:border-primary outline-none transition resize-none"
              placeholder={t('contact.writemsg')}
            />
          </div>

          {submitted && (
            <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300">
              ✓ {t('contact.submitted')}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-600 rounded-lg text-white font-semibold transition"
          >
            {loading ? t('contact.sending') : t('contact.send')}
          </button>
        </form>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center mt-6">
            <h3 className="text-xl font-bold mb-2 text-primary">{t('contact.email')}</h3>
            <p className="text-white-400">
              <a href={`mailto:${email}`} className="hover:text-primary transition">
                {email}
              </a>
            </p>
          </div>

          {/* Bloque de Redes de Mensajería (Actualizado con botones) */}
          <div className="text-center bg-dark/30 border border-primary/10 p-6 rounded-xl flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-primary"> {t('contact.chat')}</h3>

            {/* Contenedor de los botones en fila o columna según pantalla */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">

              {/* Botón de WhatsApp */}
              <a
                href="https://wa.me/5491121711944"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebd59] text-white font-semibold rounded-lg shadow-md transition w-full text-sm"
              >
                {/* Importa o usa directamente el icono de react-icons/fa */}
                <span className="text-lg">💬</span> {/* Puedes cambiar por <FaWhatsapp className="text-xl" /> */}
                WhatsApp
              </a>

              {/* Botón de Telegram */}
              <a
                href="https://t.me/jeremiaspdd" // ← Reemplaza 'tu_usuario_telegram' por tu alias real
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0088cc] hover:bg-[#0077b3] text-white font-semibold rounded-lg shadow-md transition w-full text-sm"
              >
                <span className="text-lg">✈️</span> {/* Puedes cambiar por <FaTelegramPlane className="text-xl" /> */}
                Telegram
              </a>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}