'use client'

import Link from 'next/link'

export default function Studio() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || ''
  
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-dark">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
          <span className="text-primary">PDD Records</span>
        </h1>

        <div className="bg-dark/50 border border-primary/30 rounded-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold mb-4">Professional Production Services</h2>
          <p className="text-gray-300 text-lg mb-6">
            A full production studio uniquely designed by JeremiasPDD - managed by Jeremias as the lead sound designer of PDD Records.
          </p>
          <p className="text-gray-400 mb-8">
            At PDD Records, we provide professional production services that include:
            composing, songwriting, recording, mixing, mastering, and full production of finished tracks. Everything you need to bring your own song to life!
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark/50 border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-primary">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>✓ Composing & Arranging</li>
                <li>✓ Songwriting & Lyrics</li>
                <li>✓ Recording & Mixing</li>
                <li>✓ Mastering</li>
                <li>✓ Music Entrepreneurship</li>
                <li>✓ Final Track Production</li>
              </ul>
            </div>

            <div className="bg-dark/50 border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-primary">Details</h3>
              {/* <p className="text-gray-400 mb-2">
                <strong>Address:</strong><br />
                11, 600 Street, Bnei Brak
              </p> */}
              <p className="text-gray-400 mb-2">
                <strong>Email:</strong><br />
                <a href={`mailto:${email}`} className="text-primary hover:underline">
                  {email}
                </a>
              </p>
              <p className="text-gray-400">
                <strong>Phone:</strong><br />
                +593 993633924
              </p>
            </div>
          </div>

          <Link href="/contact" className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 rounded-lg text-white font-semibold transition">
            Contact for Consultation
          </Link>
        </div>
      </div>
    </main>
  )
}