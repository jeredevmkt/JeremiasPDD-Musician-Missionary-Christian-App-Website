'use client'
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NewsletterModal from "../../components/NewsletterModal";
import { SiPaypal, SiWise, SiPatreon, SiBinance, SiMercadopago } from 'react-icons/si';
import { FaCoffee } from 'react-icons/fa'; // Usamos un icono de café limpio para Cafecito
import { FiGlobe } from 'react-icons/fi'; // Para SEPA/Europa como comodín global
import { AR, PY, CL, US, UY } from 'country-flag-icons/react/3x2';

// Definimos la interfaz para evitar cualquier error de tipo any en TypeScript
interface CuentaBancaria {
  id: string;
  pais: string;
  banco: string;
  detalle: string;
  alias: string;
  flag: React.ReactNode;
}

export default function Donation() {

  const { t } = useTranslation()

  // Estado para manejar el copiado de los CBU/IBAN
  const [copiado, setCopiado] = useState<string | null>(null);

  const copiarAlPortapapeles = (texto: string, id: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  // 1. Datos de las Plataformas con sus iconos reales asignados
  const plataformas = [
    { name: 'Mercado Pago', color: 'bg-[#009EE3] hover:bg-[#007EB5]', link: 'link.mercadopago.com.ar/adonai', logo: <SiMercadopago className="w-5 h-6" /> }, // MP requiere un poco más de tamaño por su forma
    { name: 'PayPal', color: 'bg-[#003087] hover:bg-[#002261]', link: 'https://paypal.me/jeremiaspdd', logo: <SiPaypal className="w-5 h-5" /> },
    { name: 'Wise', color: 'bg-[#00B67A] hover:bg-[#009161]', link: 'https://wise.com/pay/me/jeremiase8', logo: <SiWise className="w-5 h-5" /> },
    { name: 'Patreon', color: 'bg-[#FF424D] hover:bg-[#D6303A]', link: 'https://patreon.com/jeremiaspdd?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink', logo: <SiPatreon className="w-5 h-5" /> },
    { name: 'Cafecito.app', color: 'bg-[#00ACEE] hover:bg-[#008BBF]', link: 'https://cafecito.app/jeremiaspdd', logo: <FaCoffee className="w-5 h-5" /> },
  ];

  // 2. Datos de las Plataformas de Pago
  const cuentasBancarias: CuentaBancaria[] = [
    { id: 'py', pais: 'Paraguay', banco: 'Banco ', detalle: 'Alias: liz755962@gmail.com', alias: 'RUC/CI: 5514585 Enviar Comprobante al 0993633924', flag: <PY className="w-6 h-4 rounded shadow-sm" /> },
    { id: 'arg', pais: 'Argentina', banco: 'Naranja X', detalle: 'CBU: 4530000800012888268094', alias: 'ALIAS: misionguinea Titular: Jeremias Nahuel Escobedo', flag: <AR className="w-6 h-4 rounded shadow-sm" /> },
    { id: 'cl', pais: 'Chile', banco: 'Global66', detalle: '13005196', alias: 'ID: 530156621', flag: <CL className="w-6 h-4 rounded shadow-sm" /> },
    { id: 'uy', pais: 'Uruguay', banco: 'Banco Prex', detalle: 'Nº Cuenta: 1733811', alias: 'Titular: Jeremias Nahuel Escobedo', flag: <UY className="w-6 h-4 rounded shadow-sm" /> },
    { id: 'usa', pais: 'Estados Unidos', banco: 'Community Federal Savings', detalle: 'Rut Number (ACH-Wire): 026073150', alias: 'Account Nº: 8311995435 Checking Acc Swift/Bic: CMFGUS33', flag: <US className="w-6 h-4 rounded shadow-sm" /> },
    { id: 'sepa', pais: 'Europa (SEPA)', banco: 'Wise', detalle: 'IBAN: BE35 9672 6830 9137', alias: 'BIC/SWIFT: TRWIBEB1XXX', flag: <FiGlobe className="w-5 h-5 text-blue-600" /> },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="text-[#0f0f1e]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-500">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M6 12c0-1.7.7-3.2 1.8-4.2"></path>
                <path d="M18 12c0 1.7-.7 3.2-1.8 4.2"></path>
              </svg>
              <span className="text-violet-600 text-xs tracking-wider uppercase font-medium">{t('donation.support')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-[#9900df]">:)</span> {t('donation.subtitle')}
            </h2>
            <p
              className="text-gray-700 text-lg leading-relaxed mb-5 text-right font-bold italic drop-shadow-[0_10px_10px_rgba(139,92,246,0.9)]"
              dir="ltr"
              dangerouslySetInnerHTML={{ __html: t('donation.phrase') }}>
            </p>

            {/* ================= SECCIÓN DE BOTONES DE PAGO ================= */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-700 mb-4 px-2">💳 {t('donation.digitalpay')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {plataformas.map((p, index) => (
                  <motion.a
                    key={index}
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl font-semibold text-white shadow-md transition-colors duration-300 text-sm md:text-base ${p.color}`}
                  >
                    <span>{p.logo}</span>
                    {p.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* ================= SECCIÓN DE CUENTAS BANCARIAS ================= */}
            <div>
              <h3 className="text-xl font-bold text-gray-700 mb-4 px-2">🏦 {t('donation.transfer')}</h3>
              <p
                className="text-gray-700 text-lg leading-relaxed mb-5 text-right font-bold italic drop-shadow-[0_8px_8px_rgba(139,92,246,0.9)]"
                dir="ltr"
                dangerouslySetInnerHTML={{ __html: t('donation.phrase2') }}>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cuentasBancarias.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                  >
                    <div className="flex justify-between items-center mb-3">
                      {/* CONTENEDOR DE LA BANDERA + NOMBRE DEL PAÍS */}
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 flex items-center justify-center">
                          {c.flag}
                        </div>
                        <span className="font-bold text-gray-800 text-base md:text-lg">{c.pais}</span>
                      </div>
                      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{c.banco}</span>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 font-mono bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="truncate">{c.detalle}</p>
                      <p className="text-xs text-gray-500">{c.alias}</p>
                    </div>

                    <button
                      onClick={() => copiarAlPortapapeles(`${c.detalle} - ${c.alias}`, c.id)}
                      className="absolute right-3 top-3 bg-gray-100 hover:bg-200 text-gray-600 text-xs px-2 py-1 rounded-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      {copiado === c.id ? '✅ ¡Copiado!' : '📋 Copiar'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <h4 className="text-4xl md:text-3xl font-bold mb-6 mt-12 text-center">
              {t('donation.prayer')}
            </h4>
            <div
              className="text-gray-700 text-lg leading-relaxed text-left space-y-2"
              dir="ltr"
              dangerouslySetInnerHTML={{ __html: t('donation.prayertext') }}
            />
            <div className="flex gap-12 mt-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#0f0f1e]">4</div>
                <div className="text-gray-500 text-sm mt-1">{t('donation.data3')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#0f0f1e]">4</div>
                <div className="text-gray-500 text-sm mt-1">{t('donation.data2')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#0f0f1e]">5%</div>
                <div className="text-gray-500 text-sm mt-1">{t('donation.data1')}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full md:flex-1 items-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={t('donation.donationimg1')}
                alt="mission guinea bissau"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl mt-10">
              <img
                src={t('donation.donationimg2')}
                alt="mission guinea bissau"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <NewsletterModal />
    </main>
  )
}