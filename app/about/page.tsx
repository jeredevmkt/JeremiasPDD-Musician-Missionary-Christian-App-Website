'use client'

import { useTranslation } from 'react-i18next'
import { motion, Variants } from 'framer-motion'
import { useState, useEffect } from 'react';
import Link from 'next/link'
import NewsletterModal from "../../components/NewsletterModal";
import dynamic from 'next/dynamic';
import i18next from 'i18next';
import '../../lib/i18n';

function About() {

  const { t } = useTranslation()
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

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen pt-20 pb-16 bg-white">
      {/* CONTENEDOR PRINCIPAL: Alinea el texto y la sección de imágenes lado a lado */}
      <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto p-4">
        <div className="text-[#0f0f1e] w-full md:max-w-[55%] flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-2 py-1.5 bg-pink-50 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-500">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="2"></circle>
              <path d="M6 12c0-1.7.7-3.2 1.8-4.2"></path>
              <path d="M18 12c0 1.7-.7 3.2-1.8 4.2"></path>
            </svg>
            <span className="text-violet-600 text-xs tracking-wider uppercase font-medium">About me</span>
          </div>
          {/* Bloque de Texto */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('about.about1')} <span className="text-[#9900df]"> :)</span>
          </h2>
          <p
            className="text-gray-700 text-lg leading-relaxed mb-5 text-right"
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: t('home.about2') }}>
          </p>
          <p
            className="text-gray-700 text-lg leading-relaxed mb-8 text-left"
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: t('about.about2') }}>
          </p>
          <div className="flex gap-12 mt-10">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0f0f1e]">4</div>
              <div className="text-gray-500 text-sm mt-1">{t('about.data3')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0f0f1e]">8</div>
              <div className="text-gray-500 text-sm mt-1">{t('about.data2')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0f0f1e]">11</div>
              <div className="text-gray-500 text-sm mt-1">{t('about.data1')}</div>
            </div>
          </div>
        </div>

        <NewsletterModal />

        <div className="flex flex-col gap-4 w-full md:flex-1 items-center" dir="ltr">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.7 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            // Cambiado: quitamos h-[500px] y agregamos aspect-square junto a un ancho máximo w-full max-w-[350px]
            className="rounded-2xl overflow-hidden aspect-square w-full max-w-[380px] order-1 md:order-2 shadow-2xl"
          >
            <img
              src="/about2.JPG"
              alt="JeremiasPDD"
              // object-cover se encarga de recortar la imagen automáticamente para que llene el cuadrado sin deformarse
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              style={{ objectPosition: 'center 25%' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.7 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden aspect-square w-full max-w-[380px] order-1 md:order-2 shadow-2xl"
          >
            <img
              src="/youth.JPG"
              alt="JeremiasPDD Evangelism with CFAN"
              // object-cover se encarga de recortar la imagen automáticamente para que llene el cuadrado sin deformarse
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              style={{ objectPosition: 'center 40%' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.7 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden aspect-square w-full max-w-[380px] order-1 md:order-2 shadow-2xl"
          >
            <img
              src="/youth4.jpg"
              alt="JeremiasPDD CFAN Jesus Camp Evangelismo"
              // object-cover se encarga de recortar la imagen automáticamente para que llene el cuadrado sin deformarse
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              style={{ objectPosition: 'center 40%' }}
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center order-last mt-10">
            <Link href="/donation"
              className="px-10 py-3 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40"
              style={{ background: 'linear-gradient(135deg, #9900df, #ff47c5)' }}>
              {t('home.btnsupport')}
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default dynamic(() => Promise.resolve(About), {
  ssr: false
});