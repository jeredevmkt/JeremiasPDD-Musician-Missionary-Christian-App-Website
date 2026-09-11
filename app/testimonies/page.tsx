'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';
import { SiCanvas, SiYoutube } from 'react-icons/si';
import NewsletterModal from "../../components/NewsletterModal";
import dynamic from 'next/dynamic';
import i18next from 'i18next';
import '../../lib/i18n';
import { getTestimoniesAction } from '../../lib/actions'
export interface TestimonyItem {
  id: string;
  title: string;
  url_id: string;
  display_order: number;
  category: 'canva' | 'pdf' | 'horizontal_top' | 'short' | 'horizontal_bottom';
  lang: string;
}

function Testimonies() {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState<TestimonyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // 1. SOLUCIÓN AL BUG: Mantenemos i18n.language fijo en las dependencias para que el tamaño NUNCA cambie
  useEffect(() => {
    async function fetchTestimonies() {
      setLoading(true);
      try {
        // Llamamos a la acción segura del servidor de Neon
        const result = await getTestimoniesAction()

        if (!result.success) throw new Error("No se pudieron cargar los datos");

        // Modificamos el estado con los datos obtenidos
        setItems(result.data);
      } catch (err) {
        console.error("Error crítico leyendo Neon:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonies();
  }, [i18n.language]);

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

  // 2. FILTRADO CON JAVASCRIPT: Ordenamos primero por prioridad
  const itemsOrdenados = [...items].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  // Filtramos dinámicamente agregando el signo ? para evitar que se rompa si el idioma no cargó aún
  const canvaItem = itemsOrdenados.find(i =>
    i.category === 'canva' &&
    (i.lang === 'all' || !i.lang || (i18n.language && i18n.language.startsWith(i.lang)))
  );
  const pdfItem = itemsOrdenados.find(i =>
    i.category === 'pdf' &&
    (i.lang === 'all' || !i.lang || (i18n.language && i18n.language.startsWith(i.lang)))
  );

  const horizontalesSuperiores = itemsOrdenados.filter(i => i.category === 'horizontal_top');
  const shortsMedios = itemsOrdenados.filter(i => i.category === 'short');
  const horizontalesInferiores = itemsOrdenados.filter(i => i.category === 'horizontal_bottom');


  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1e] flex items-center justify-center text-gray-400 text-sm">
        {t('testimonies.loading', 'Cargando reportes y testimonios...')}
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 bg-[#0f0f1e] text-white">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ENCABEZADO */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-[#FF4B6E]">{t('testimonies.title')}</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            {t('testimonies.subtitle')}
          </p>
        </div>

        {/* ================= BLOQUE 1: REPORTES PRINCIPALES (CANVA & PDF) ================= */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Columna Izquierda: Reporte en Video de Canva */}
          <motion.div {...fadeInUp} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl">
                  <SiCanvas />
                </div>
                <span className="text-[9px] bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded-full font-bold tracking-wider uppercase">
                  {t('testimonies.canvaReport')}
                </span>
              </div>
              <h3 className="text-lg font-bold">{canvaItem?.title || "Video"}</h3>

              {canvaItem?.url_id ? (
                <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={canvaItem.url_id}
                    allowFullScreen
                    className="w-full h-full block"
                  ></iframe>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-xl bg-white/5 flex items-center justify-center text-xs text-gray-500">{t('testimonies.prox')}</div>
              )}
            </div>
          </motion.div>

          {/* Columna Derecha: Descarga del Reporte PDF */}
          <motion.div {...fadeInUp} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-xl">
                <FaFilePdf />
              </div>
              <div>
                <h3 className="text-lg font-bold">{pdfItem?.title || t('testimonies.pdfTitle', 'Último Reporte Ministerial (PDF)')}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  {t('testimonies.pdfDes', 'Descarga el informe completo en PDF con el resumen detallado de actividades, alcances de misiones, estados financieros y metas planificadas para este periodo.')}
                </p>
              </div>
            </div>

            {pdfItem?.url_id && (
              <div className="mt-6">
                <a
                  href={pdfItem.url_id}
                  target="_blank"
                  download
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-red-600 to-pink-600 shadow-lg shadow-red-600/10"
                >
                  <span>{t('testimonies.pdfBtn')}</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            )}
          </motion.div>

        </div>

        {/* ================= BLOQUE 2: VIDEOS HORIZONTALES SUPERIORES (16:9) ================= */}
        {horizontalesSuperiores.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-purple-400 uppercase flex items-center gap-2">
              <SiYoutube /> {t('testimonies.section1')}
            </h4>
            <div className="grid sm:grid-cols-2 gap-6">
              {horizontalesSuperiores.map((item) => (
                <motion.div key={item.id} {...fadeInUp} className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl">
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://youtube.com/embed/${item.url_id}?controls=1&modestbranding=1&hl=es&rel=0`}
                      title={item.title}
                      allowFullScreen
                      className="w-full h-full block"
                    ></iframe>
                  </div>
                  <h5 className="text-xs font-semibold text-gray-300 mt-3 px-1 truncate">{item.title}</h5>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ================= BLOQUE 3: VIDEOS EN FORMATO SHORTS (9:16 VERTICAL) ================= */}
        {shortsMedios.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-pink-400 uppercase flex items-center gap-2">
              ⚡ {t('testimonies.shortsSection')}
            </h4>
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              {shortsMedios.map((item) => (
                <motion.div key={item.id} {...fadeInUp} className="bg-white/5 border border-white/10 rounded-2xl p-3 shadow-xl">
                  <div className="w-full aspect-[9/16] rounded-xl overflow-hidden border border-white/5 bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://youtube.com/embed/${item.url_id}?controls=1&modestbranding=1&hl=es&rel=0`}
                      title={item.title}
                      allowFullScreen
                      className="w-full h-full block"
                    ></iframe>
                  </div>
                  <h5 className="text-[11px] font-semibold text-gray-300 mt-2.5 px-1 truncate text-center">{item.title}</h5>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ================= BLOQUE 4: VIDEOS HORIZONTALES INFERIORES (16:9) ================= */}
        {horizontalesInferiores.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-purple-400 uppercase flex items-center gap-2">
              <SiYoutube /> {t('testimonies.section2')}
            </h4>
            <div className="grid sm:grid-cols-2 gap-6">
              {horizontalesInferiores.map((item) => (
                <motion.div key={item.id} {...fadeInUp} className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl">
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://youtube.com/embed/${item.url_id}?controls=1&modestbranding=1&hl=es&rel=0`}
                      title={item.title}
                      allowFullScreen
                      className="w-full h-full block"
                    ></iframe>
                  </div>
                  <h5 className="text-xs font-semibold text-gray-300 mt-3 px-1 truncate">{item.title}</h5>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>

      <NewsletterModal />

    </main>
  );
}

export default dynamic(() => Promise.resolve(Testimonies), {
  ssr: false
});
