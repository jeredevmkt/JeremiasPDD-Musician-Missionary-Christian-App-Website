'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useTranslation } from 'react-i18next'

export default function NewsletterModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const { t, i18n } = useTranslation()

    useEffect(() => {
        // Si el usuario cambia el idioma, borramos el bloqueo para permitir que lo vea en su nueva traducción
        localStorage.removeItem('newsletter_dismissed');
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 15000); // 15 segundos calibrados

        // Limpieza del temporizador si el usuario cambia de idioma antes de los 10 segundos o se va de la página
        return () => clearTimeout(timer);
    }, [i18n.language]);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('newsletter_dismissed', 'true');
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        const { error } = await supabase
            .from('newsletter_subscribers')
            .insert({ email, phone: phone || null });

        setLoading(false);

        if (error) {
            // Si el email ya existe, Supabase devuelve un error de duplicado (código 23505)
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
                                    placeholder="ejemplo@correo.com"
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
                                    placeholder="+54 911 21711944"
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
