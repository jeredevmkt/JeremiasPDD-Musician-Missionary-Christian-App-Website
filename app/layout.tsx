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
  title: 'JeremiasPDD - PDD Records | Official Website',
  description: 'The official website of JeremiasPDD, singer, songwriter, and music producer. Owner of PDD Records - a professional music production studio. Explore music releases, portfolio, production services, and live show updates.',
  keywords: ['JeremiasPDD', 'PDD Records', 'production studio', 'recording studio', 'music production', 'backing tracks', 'music portfolio'],
  openGraph: {
    title: 'JeremiasPDD - PDD Records | Official Website',
    description: 'The official website of JeremiasPDD, singer, songwriter, and music producer. Owner of PDD Records - a professional music production studio.',
    type: 'website',
    url: 'https://jeremiaspdd-music-official.com',
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

