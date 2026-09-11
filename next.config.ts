import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 🟢 Si necesitas cargar imágenes desde algún dominio web, añádelo aquí.
      // Si por ahora no usas imágenes alojadas externamente, puedes borrar este bloque.
    ],
  },
}