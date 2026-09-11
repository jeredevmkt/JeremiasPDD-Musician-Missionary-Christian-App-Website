'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link'
import { SiInstagram } from 'react-icons/si';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import i18next from 'i18next';
import '../lib/i18n'

// 2. Declaramos la etiqueta personalizada para que TypeScript no tire error
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'behold-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 'feed-id': string }, HTMLElement>;
        }
    }
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

function InstagramLobby() {
    const { t } = useTranslation();
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

    return (
        <section className="py-10 px-4 bg-[#07070f] border-t border-white/5 relative overflow-hidden">

            <Script
                src="https://w.behold.so/widget.js"
                type="module"
                strategy="afterInteractive" // Se ejecuta de forma asíncrona sin ralentizar la web
            />

            {/* Luces de fondo de neón */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Encabezado */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        // Cambiado: px-6 py-2.5 (más relleno), text-base (letra más grande), mb-6 (más separación abajo)
                        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 text-purple-300 text-base font-bold mb-6 tracking-widest uppercase"
                    >
                        {/* Cambiado text-sm a text-xl para agrandar el icono de Instagram */}
                        <SiInstagram className="text-xl text-pink-400" />
                        <span>INSTAGRAM FEED</span>
                    </motion.div>


                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                        {t('iglobby.title')}
                    </h2>
                    <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
                        {t('iglobby.subtitle')}
                    </p>
                </div>

                {/* CONTENEDOR DEL WIDGET DE BEHOLD */}
                <div className="w-full bg-[#0f0f1e]/40 border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl overflow-hidden custom-behold-wrapper">
                    {/* Engañamos a TypeScript creando el elemento de forma dinámica */}
                    {React.createElement('behold-widget', { 'feed-id': '3vSadXFxRx3CV28QVQ38' })}
                </div>

                {/* Botón inferior */}
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center py-10">
                    <Link href="https://instagram.com/jeremiaspdd"
                        // SOLUCIÓN: Añadimos 'flex items-center justify-center gap-2'
                        className="flex items-center justify-center gap-2 px-10 py-3 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 text-center"
                        style={{ background: 'linear-gradient(135deg, #9900df, #ff47c5)' }}>
                        <span>{t('iglobby.button')}</span>
                        {/* Cambié la clase a text-white/60 para que combine mejor con el degradado */}
                        <span className="text-white/60 text-base transition-transform group-hover:translate-x-1">➔</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export default dynamic(() => Promise.resolve(InstagramLobby), {
    ssr: false
});
