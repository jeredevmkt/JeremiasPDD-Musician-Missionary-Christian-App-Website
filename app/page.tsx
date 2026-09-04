'use client'

import GlowText from '@/components/GlowText'
import Link from 'next/link'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import '../lib/i18n'
import { useTranslation } from 'react-i18next'
import IgLobby from "../components/iglobby"
import HeroBackground from "../components/herobackground"
import NewsletterModal from "../components/NewsletterModal";

export default function Home() {
  // 1. Explicitly defining types for Variants resolves TypeScript compilation errors
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const h1Variants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
  };

  const statsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const statItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  // 2. Your Solution - Defining the data array outside the return statement to avoid parsing errors
  // const services = [
  //   { title: "Songwriting", desc: "Original lyrics written straight from the heart, tailored specifically for each client and event.", icon: <><path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" /></> },
  //   { title: "Composing", desc: "Catchy, original melodies that stay in your head, featuring a unique and modern style.", icon: <><circle cx="8" cy="18" r="4" /><path d="M12 18V2l7 4" /></> },
  //   { title: "Music Production", desc: "Full professional production delivering a rich, modern sound experience.", icon: <><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /></> },
  //   { title: "Recording", desc: "Professional vocal recording in-studio equipped with top-tier gear.", icon: <>path d="m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12"/<path d="M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5" /><circle cx="16" cy="7" r="5" /></> },
  //   { title: "Mixing & Mastering", desc: "Precise audio engineering for a flawless, polished final result.", icon: <><circle cx="12" cy="12" r="10" /><path d="M6 12c0-1.7.7-3.2 1.8-4.2" /><circle cx="12" cy="12" r="2" /><path d="M18 12c0 1.7-.7 3.2-1.8 4.2" /></> },
  //   { title: "Backing Tracks", desc: "Professional playbacks and backing tracks ready to purchase across various genres.", icon: <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" /></> }
  // ];

  const { t } = useTranslation()

  return (
    <main className="min-h-screen bg-[#0f0f1e] text-white overflow-x-hidden">

      {/* HERO - With Crowd/Concert Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-11"
        >
          <motion.p
            variants={fadeInUp}
            className="text-gray-200 tracking-[0.5em] text-sm mb-6 uppercase"
          >
            {t('home.subtitle')}
          </motion.p>

          <motion.h1
            variants={h1Variants}
            className="text-7xl md:text-4xl lg:text-9xl mb-4 leading-none py-2 px-10 text-center select-none overflow-visible filter drop-shadow-[0_0_30px_rgba(34,211,238,0.45)]"
          >
            <span
              className="bg-clip-border bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 text-transparent"
              style={{
                fontFamily: '"Brush Script MT", cursive',
                letterSpacing: '0.04em',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              {t('home.title')}
            </span>
          </motion.h1>

          {/* <motion.p variants={fadeInUp} className="text-gray-300 tracking-[0.4em] text-3xl mb-8">
            PDD Records
          </motion.p> */}

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2.5xl font-semibold mb-2"
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: t('home.bannertxt') }}>
          </motion.p>
          <motion.p variants={fadeInUp} className="text-gray-300 text-lg mb-4">{t('home.bannerask')}</motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center">
            <Link href="/donation"
              className="px-10 py-3 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40"
              style={{ background: 'linear-gradient(135deg, #9900df, #ff47c5)' }}>
              {t('home.btnsupport')}
            </Link>
          </motion.div>

          {/* <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/albums"
              className="px-10 py-4 rounded-full font-semibold text-lg text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40"
              style={{ background: 'linear-gradient(170deg, rgb(81, 242, 215), rgb(31, 67, 227))' }}>
              The New Album
            </Link>
          </motion.div>

        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-2xl animate-bounce">↓</div> */}
        </motion.div>
      </section>

      <NewsletterModal />

      {/* ABOUT */}
      <section className="py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* About Text - Smoothly slides from right to center on scroll */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[#0f0f1e] order-2 md:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-500">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M6 12c0-1.7.7-3.2 1.8-4.2"></path>
                <path d="M18 12c0 1.7-.7 3.2-1.8 4.2"></path>
              </svg>
              <span className="text-violet-600 text-xs tracking-wider uppercase font-medium">{t('home.about')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('home.about1')}<span className="text-[#9900df]"> :)</span>
            </h2>
            <p
              className="text-gray-700 text-lg leading-relaxed mb-5 text-left"
              dir="ltr"
              dangerouslySetInnerHTML={{ __html: t('home.about2') }}>
            </p>
            <div
              className="text-gray-700 text-lg leading-relaxed text-left space-y-2 ml-4 md:ml-0"
              dir="ltr"
              dangerouslySetInnerHTML={{ __html: t('home.aboutlist') }}
            />

            {/* Stats - Revealed with a subtle and smooth spring-stagger effect */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={statsContainerVariants}
              className="flex gap-12 mt-10"
            >
              {[
                { title: "+100", desc: t('home.data3') },
                { title: "+200", desc: t('home.data2') },
                { title: "+5300", desc: t('home.data1') }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={statItemVariants}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-[#0f0f1e]">{stat.title}</div>
                  <div className="text-gray-500 text-sm mt-1">{stat.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <div className="flex flex-col gap-4 w-full md:flex-1 items-center">
            {/* About Image - Enters with an elegant angle from the right */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.7 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="rounded-2xl overflow-hidden aspect-square w-full max-w-[380px] order-1 md:order-2 shadow-2xl"
            >
              <img
                src="/youth5.JPG"
                alt="JeremiasPDD CFAN Latino"
                // object-cover se encarga de recortar la imagen automáticamente para que llene el cuadrado sin deformarse
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ objectPosition: 'center 40%' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.7 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="rounded-2xl overflow-hidden aspect-square w-full max-w-[380px] order-1 md:order-2 shadow-2xl"
            >
              <img
                src="/youth3.jpg"
                alt="JeremiasPDD Evangelismo CFAN Latino"
                // object-cover se encarga de recortar la imagen automáticamente para que llene el cuadrado sin deformarse
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ objectPosition: 'center 40%' }}
              />
            </motion.div>
          </div>
        </div>
      </section >´

      <IgLobby />

      {/* SERVICES */}
      {/* <section className="py-20 px-4 bg-[#0f0f1e]">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#9900df] tracking-[0.4em] text-sm mb-4">Our Services</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            From Idea to <span className="text-[#9900df]">Finished</span> Track
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            Everything you need for perfect song production — all under one roof
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-pink-500/30 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 flex items-center justify-center mb-5 group-hover:from-cyan-300 to-violet-500 group-hover:to-blue-700 transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-pink-400">
                    {service.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* PDD Records */}
      {/* <section className="py-16 px-4 bg-[#0f0f1e]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-left">
              <p className="text-[#9900df] tracking-[0.4em] text-xs mb-3">Production Studio</p>
              <h2 className="text-4xl font-bold mb-4">PDD Records</h2>
              <p className="text-gray-400 leading-relaxed max-w-lg text-sm">
                A professional production studio managed by Je — songwriting, composing, production, recording, mixing, and mastering. Everything you need for perfect song production, all under one roof
              </p>
            </div>
            <Link href="/studio"
              className="whitespace-nowrap px-8 py-3 rounded-full font-semibold text-white flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/10"
              style={{ background: 'linear-gradient(135deg, #9900df, #ff47c5)' }}>
              Visit PDD Records →
            </Link>
          </motion.div>
        </div>
      </section> */}

      {/* SONG IN HEAD CTA */}
      {/* <section className="relative py-32 px-4 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#0f0f1e]/80" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <p className="text-[#00F2FE] tracking-[0.4em] text-sm mb-4">Let's Create Together</p>
          <GlowText text="?Got a song in your head" />
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's turn it into reality. From the initial concept down to the final product — I am here for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/playbacks"
              className="px-10 py-4 border-2 border-white/40 text-white hover:border-white rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95">
              Backing Tracks Store
            </Link>
            <Link href="/contact"
              className="px-10 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/20"
              style={{ background: 'linear-gradient(170deg, rgb(81, 242, 215), rgb(31, 67, 227))' }}>
              Get in Touch →
            </Link>
          </div>
        </motion.div>
      </section> */}

    </main >
  )
}