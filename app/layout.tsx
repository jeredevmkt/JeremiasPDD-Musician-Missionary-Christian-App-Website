import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Syne } from 'next/font/google' // Cambiada por una fuente musical y vanguardista

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne', // Permite usarla fácilmente con Tailwind CSS si lo deseas
})

export const metadata: Metadata = {
  // 1. URL BASE (Obligatoria en Next.js para que las imágenes funcionen en redes sociales)
  metadataBase: new URL('https://jeremiaspdd.vercel.app'),

  title: 'JeremiasPDD | Official Website',
  description: 'The official website of JeremiasPDD, son of God, musician, misionnary graduated on ALMA Paraguay, proclaiming the gospel with CFAN Latino. Owner of PDD Records. Discover about missions, reports, music and worship releases.',
  keywords: ['JeremiasPDD', 'PDD Records', 'Christian Missions', 'Missionary Website', 'Christian Missionary Donations', 'Support Missions', 'Missionary Work', 'backing tracks', 'music portfolio', 'obra misionera', 'trabajo misionero', 'donaciones para misiones', 'apoyo a misiones', 'música cristiana', 'JeremiasPDD música', 'JeremiasPDD canciones'],

  // Metadatos para WhatsApp, Instagram y Facebook
  openGraph: {
    title: 'JeremiasPDD | Official Website',
    description: 'The official website of JeremiasPDD, son of God, musician, misionnary graduated on ALMA Paraguay, proclaiming the gospel with CFAN Latino. Owner of PDD Records. Discover about missions, reports, music and worship releases.',
    type: 'website',
    url: 'https://jeremiaspdd.vercel.app',
    siteName: 'JeremiasPDD',
    images: [
      {
        url: '/public/os-image.jpg', // Nombre exacto de tu foto en la carpeta public/
        width: 1200,
        height: 630,
        alt: 'JeremiasPDD Official Website Preview',
      },
    ],
  },

  // Metadatos específicos para Twitter/X y Threads
  twitter: {
    card: 'summary_large_image',
    title: 'JeremiasPDD | Official Website',
    description: 'The official website of JeremiasPDD, son of God, musician, misionnary...',
    images: ['/public/os-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html dir="rtl">
      <body className="bg-dark text-white antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

