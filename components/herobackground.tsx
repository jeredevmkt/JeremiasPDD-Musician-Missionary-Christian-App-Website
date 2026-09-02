'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroBackground() {
  // 1. Define tu lista de imágenes de fondo aquí
  const imagenesBackground = [
    '/banner-youtube-without-text.jpg',
    '/Carrousel2.jpg',
    '/Carrousel0.jpg', // Reutilizo tus imágenes anteriores del proyecto
    '/youth5.JPG',
    '/Carrousel3.jpg'
  ];

  const [indiceActual, setIndiceActual] = useState(0);

  // 2. Temporizador para cambiar automáticamente cada 12 segundos (12000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      siguienteImagen();
    }, 12000);

    return () => clearInterval(timer); // Limpieza automática del bucle
  }, [indiceActual]);

  // Funciones de navegación para las flechas
  const siguienteImagen = () => {
    setIndiceActual((prev) => (prev + 1) % imagenesBackground.length);
  };

  const anteriorImagen = () => {
    setIndiceActual((prev) => (prev - 1 + imagenesBackground.length) % imagenesBackground.length);
  };

  return (
    <div className="absolute inset-0 overflow-hidden w-full h-full z-0 select-none">

      {/* CONTENEDOR DE IMÁGENES ANIMADAS CON CROSSFADE */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={indiceActual} // Clave crítica: Al cambiar el índice, activa la animación
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${imagenesBackground[indiceActual]}')` }}
        />
      </AnimatePresence>

      {/* Capa de Degradado (Gradient Overlay) que mantiene tus colores neón intactos */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-pink-900/50 to-[#0f0f1e]/90 pointer-events-none" />

      {/* ================= CONTROLES: FLECHAS LATERALES ================= */}
      {/* Flecha Izquierda */}
      <button
        onClick={anteriorImagen}
        type="button"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/20 text-white/60 backdrop-blur-xs hover:bg-white/10 hover:text-white hover:border-white/20 active:scale-95 transition duration-300"
        aria-label="Previous background"
      >
        <span className="text-lg leading-none font-mono">◀</span>
      </button>

      {/* Flecha Derecha */}
      <button
        onClick={siguienteImagen}
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/20 text-white/60 backdrop-blur-xs hover:bg-white/10 hover:text-white hover:border-white/20 active:scale-95 transition duration-300"
        aria-label="Next background"
      >
        <span className="text-lg leading-none font-mono">▶</span>
      </button>

    </div>
  );
}
