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
  title: 'JeremiasPDD | Official Website',
  description: 'The official website of JeremiasPDD, son of God, musician, misionnary graduated on ALMA Paraguay, proclaiming the gospel with CFAN Latino. Owner of PDD Records. Discover about missions, reports, music and worship releases.',
  keywords: ['JeremiasPDD', 'PDD Records', 'Christian Missions', 'Missionary Website', 'Christian Missionary Donations', 'Support Missions', 'Missionary Work', 'backing tracks', 'music portfolio', 'obra misionera', 'trabajo misionero', 'donaciones para misiones', 'apoyo a misiones', 'música cristiana', 'JeremiasPDD música', 'JeremiasPDD canciones'],
  openGraph: {
    title: 'JeremiasPDD | Official Website',
    description: 'The official website of JeremiasPDD, son of God, musician, misionnary graduated on ALMA Paraguay, proclaiming the gospel with CFAN Latino. Owner of PDD Records. Discover about missions, reports, music and worship releases',
    type: 'website',
    url: 'https://jeremiaspdd.vercel.app',
    images: [
      {
        url: '../public/youth5.JPG', // 👈 Pon la URL absoluta de tu imagen aquí
        width: 1200, // 👈 Medida recomendada por WhatsApp/Facebook
        height: 630, // 👈 Medida recomendada por WhatsApp/Facebook
        alt: 'JeremiasPDD Official Website',
      },
    ],
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

