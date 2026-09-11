'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic';
import i18next from 'i18next';
import '../lib/i18n';
import { subscribeNewsletterAction } from '../lib/actions'

function NewsletterModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const { t, i18n } = useTranslation()
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

        // Si el usuario cambia el idioma, borramos el bloqueo para permitir que lo vea en su nueva traducción
        localStorage.removeItem('newsletter_dismissed');
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 15000); // 15 segundos calibrados

        // Limpieza del temporizador si el usuario cambia de idioma antes de los 10 segundos o se va de la página
        return () => clearTimeout(timer);
    }, [i18n.language]);

    // Si i18next no ha cargado los diccionarios en memoria, congelamos el renderizado
    if (!isReady) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center text-white">
                <p className="text-lg">Loading translations...</p>
            </div>
        );
    }

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('newsletter_dismissed', 'true');
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        // Llamamos a la acción segura del servidor enviando los datos
        const result = await subscribeNewsletterAction(email, phone || null)

        setLoading(false);

        if (!result.success) {
            // Si no funcionó, verificamos si fue por correo duplicado (código '23505' en Postgres)
            // O si fue cualquier otro error de conexión
            setStatus('error');
        } else {
            setStatus('success');
            setEmail('');
            setPhone('');
            setTimeout(() => handleClose(), 3000); // Cierra automáticamente tras el éxito
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Fondo oscuro difuminado */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Caja del Pop-up */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0f0f1e] border border-white/10 p-6 text-white shadow-2xl z-10"
                    >
                        {/* Botón de cerrar */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition text-lg"
                        >
                            ✕
                        </button>

                        <div className="text-center mb-6">
                            <span className="text-3xl">📰</span>
                            <h3 className="text-xl font-bold mt-2 text-primary"> {t('news.title')}</h3>
                            <p className="text-xs text-gray-400 mt-1">
                                {t('news.p')}
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <div>
                                <label htmlFor="modal-email" className="block text-xs font-semibold text-gray-400 mb-1">
                                    {t('news.email')}
                                </label>
                                <input
                                    type="email"
                                    id="modal-email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-purple-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label htmlFor="modal-phone" className="block text-xs font-semibold text-gray-400 mb-1">
                                    {t('news.number')}
                                </label>
                                <input
                                    type="tel"
                                    id="modal-phone"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-purple-500 outline-none transition"
                                />
                            </div>

                            {status === 'success' && (
                                <div className="p-2.5 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-xs text-center">
                                    ✓ {t('news.submitok')}
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs text-center">
                                    ✕ {t('news.submiterr')}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || status === 'success'}
                                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 rounded-lg text-sm font-semibold transition text-white"
                            >
                                {loading ? 'Procesando...' : 'Suscribirme'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default dynamic(() => Promise.resolve(NewsletterModal), {
    ssr: false
});
