import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// --- VARIABLES DE TEXTO PARA ORACIÓN ACTUALIZADAS (FÁCILES DE EDITAR) ---

const PRAYER_TEXT_ES = `
<strong>🚨 MOTIVOS CRÍTICOS DE ORACIÓN 🚨</strong>
<li><strong>🙏🏼 Petición Especial por mi Familia 🚘:</strong> Les ruego encarecidamente que levanten un clamor por mi familia. Mi hermano Ariel tuvo un choque automovilístico y lamentablemente no contaba con licencia de conducir. Pedimos para que Dios traiga calma total al corazón de los afectados y nos permita llegar a un acuerdo, ya que están solicitando una compensación de 5 millones de pesos ARS.</li>
<li><strong>🙏🏼 Hogar de Paz a las Naciones 🌍:</strong> Es un proyecto de discipulado e iglesia en la nube que hace tiempo late en mi corazón. Antes de saltar a otro continente, quiero que mis discípulos y los discípulos recién convertidos puedan tener un espacio en donde seguir creciendo. Todo líder y ministro que quiera sumarse, esta es la visión.</li>

<br />
<strong>🗓️ PRÓXIMAS MISIONES Y AGENDA DE EVENTOS ¡Acompáñame orando! 🙏🏼</strong>
<br />
<strong>• 🙏🏼 SEPTIEMBRE:</strong>
<li>📍 Obligado: Del 03 al 13</li>
<li>📍 Luque: Del 14 al 20</li>
<li>🎪 Campaña "5 días de esperanza" en 3 Bocas: Del 21 al 25</li>
<li>🌅 Noche de Esperanza (Paseo Costero San Antonio): 26/09</li>

<strong>• 🙏🏼 OCTUBRE:</strong>
<li>🏢 CFA Limpio: Evento especial junto a mi profesor David Kandole 🇺🇸</li>
<li>⛺️ Campamento de Jesús: En Buenos Aires, Argentina 🇦🇷 (Del 12 al 17)</li>
<li>🌍 Presentación de la misión de África a las iglesias locales.</li>

<strong>• 🙏🏼 NOVIEMBRE:</strong>
<li>🌍 Presentación de la misión de África a las iglesias ¡Seguimos expandiendo la misión!</li>

<strong>• 🙏🏼 DICIEMBRE (Destino Europa ✈️🇪🇺):</strong>
<li>🗺️ Hay que saltar el charco hacia otros continentes. ¿Hacia dónde abrirá las puertas el Señor? Estoy orando por: ¡Reino Unido, España y Países Bajos!</li>
`.trim();

const PRAYER_TEXT_EN = `
<strong>🚨 CRITICAL PRAYER REQUESTS 🚨</strong>
<li><strong>🙏🏼 Special Request for my Family 🚘:</strong> I earnestly ask you to lift up a prayer for my family. My brother Ariel was involved in a car accident and unfortunately did not have a driver's license. We pray that God brings total peace to the hearts of those affected and allows us to reach an agreement, as they are requesting a compensation of 5 million ARS pesos.</li>
<li><strong>🙏🏼 Hogar de Paz a las Naciones 🌍:</strong> This is a discipleship and cloud church project that has been beating in my heart for a long time. Before jumping to another continent, I want my disciples and newly converted disciples to have a space where they can continue to grow. Any leader and minister who wants to join, this is the vision.</li>

<br />
<strong>🗓️ UPCOMING MISSIONS AND EVENT SCHEDULE Join me in prayer! 🙏🏼</strong>
<br />
<strong>• 🙏🏼 SEPTEMBER:</strong>
<li>📍 Obligado: From Sept 03 to 13</li>
<li>📍 Luque: From Sept 14 to 20</li>
<li>🎪 "5 Days of Hope" Campaign in 3 Bocas: From Sept 21 to 25</li>
<li>🌅 Night of Hope (Paseo Costero San Antonio): 09/26</li>

<strong>• 🙏🏼 OCTOBER:</strong>
<li>🏢 CFA Limpio: Special event alongside my teacher David Kandole 🇺🇸</li>
<li>⛺️ Jesus Camp: In Buenos Aires, Argentina 🇦🇷 (From Oct 12 to 17)</li>
<li>🌍 Presentation of the African mission to local churches.</li>

<strong>• 🙏🏼 NOVEMBER:</strong>
<li>🌍 Presentation of the African mission to churches. We keep expanding the mission!</li>

<strong>• 🙏🏼 DECEMBER (Destination Europe ✈️🇪🇺):</strong>
<li>🗺️ We must cross the pond to other continents. Where will the Lord open doors? I am praying for: United Kingdom, Spain, and the Netherlands!</li>
`.trim();

const PRAYER_TEXT_PT = `
<strong>🚨 MOTIVOS CRÍTICOS DE ORAÇÃO 🚨</strong>
<li><strong>🙏🏼 Pedido Especial pela minha Família 🚘:</strong> Peço encarecidamente que levantem um clamor pela minha família. Meu irmão Ariel sofreu um acidente de carro e infelizmente não tinha carteira de motorista. Pedimos para que Deus traga calma total ao coração dos afetados e nos permita chegar a um acordo, pois eles estão solicitando uma indenização de 5 milhões de pesos ARS.</li>
<li><strong>🙏🏼 Hogar de Paz a las Naciones 🌍:</strong> É um projeto de discipulado e igreja na nuvem que há muito tempo bate no meu coração. Antes de partir para outro continente, quero que meus discípulos e os recém-convertidos tenham um espaço onde possam continuar crescendo. Todo líder e ministro que quiser se juntar, esta é a visão.</li>

<br />
<strong>🗓️ PRÓXIMAS MISSÕES E AGENDA DE EVENTOS Acompanhe-me em oração! 🙏🏼</strong>
<br />
<strong>• 🙏🏼 SETEMBRO:</strong>
<li>📍 Obligado: De 03 a 13</li>
<li>📍 Luque: De 14 a 20</li>
<li>🎪 Campanha "5 dias de esperança" em 3 Bocas: De 21 a 25</li>
<li>🌅 Noite de Esperança (Paseo Costero San Antonio): 26/09</li>

<strong>• 🙏🏼 OUTUBRO:</strong>
<li>🏢 CFA Limpio: Evento especial junto com meu professor David Kandole 🇺🇸</li>
<li>⛺️ Acampamento de Jesus: Em Buenos Aires, Argentina 🇦🇷 (De 12 a 17)</li>
<li>🌍 Apresentação da missão na África para as igrejas locais.</li>

<strong>• 🙏🏼 NOVEMBRO:</strong>
<li>🌍 Apresentação da missão na África para as igrejas. Continuamos expandindo a missão!</li>

<strong>• 🙏🏼 DEZEMBRO (Destino Europa ✈️🇪🇺):</strong>
<li>🗺️ É hora de atravessar o oceano para outros continentes. Para onde o Senhor abrirá as portas? Estou orando por: Reino Unido, Espanha e Países Baixos!</li>
`.trim();

const PRAYER_TEXT_DE = `
<strong>🚨 DRINGENDE GEBETSANLIEGEN 🚨</strong>
<li><strong>🙏🏼 Besondere Bitte für meine Familie 🚘:</strong> Ich bitte Sie inständig, für meine Familie zu beten. Mein Bruder Ariel hatte einen Autounfall und besaß leider keinen Führerschein. Wir beten, dass Gott den Herzen der Betroffenen völligen Frieden schenkt und es uns ermöglicht, eine Einigung zu erzielen, da eine Entschädigung von 5 Millionen ARS-Pesos gefordert wird.</li>
<li><strong>🙏🏼 Hogar de Paz a las Naciones 🌍:</strong> Dies ist ein Jüngerschafts- und Cloud-Kirchen-Projekt, das schon lange in meinem Herzen schlägt. Bevor ich auf einen anderen Kontinent aufbreche, möchte ich, dass meine Jünger und die neu bekehrten Jünger einen Ort haben, an dem sie weiter wachsen können. Jeder Leiter und Diener, der sich anschließen möchte – das ist die Vision.</li>

<br />
<strong>🗓️ KOMMENDE MISSIONEN UND VERANSTALTUNGSKALENDER Begleiten Sie mich im Gebet! 🙏🏼</strong>
<br />
<strong>• 🙏🏼 SEPTEMBER:</strong>
<li>📍 Obligado: Vom 03. bis 13.</li>
<li>📍 Luque: Vom 14. bis 20.</li>
<li>🎪 Kampagne "5 Tage der Hoffnung" in 3 Bocas: Vom 21. bis 25.</li>
<li>🌅 Nacht der Hoffnung (Paseo Costero San Antonio): 26.09.</li>

<strong>• 🙏🏼 OKTOBER:</strong>
<li>🏢 CFA Limpio: Sonderveranstaltung zusammen mit meinem Lehrer David Kandole 🇺🇸</li>
<li>⛺️ Jesus-Camp: In Buenos Aires, Argentinien 🇦🇷 (Vom 12. bis 17.)</li>
<li>🌍 Vorstellung der Afrika-Mission in den örtlichen Gemeinden.</li>

<strong>• 🙏🏼 NOVEMBER:</strong>
<li>🌍 Vorstellung der Afrika-Mission in den Gemeinden. Wir dehnen die Mission weiter aus!</li>

<strong>• 🙏🏼 DEZEMBER (Ziel Europa ✈️🇪🇺):</strong>
<li>🗺️ Wir müssen den großen Teich zu anderen Kontinenten überqueren. Wohin wird der Herr die Türen öffnen? Ich bete für: Großbritannien, Spanien und die Niederlande!</li>
`.trim();


// Diccionarios de traducción
const resources = {
  'en-US': {
    translation: {
      navbar: { home: 'Home', about: 'About', songs: 'Songs', playbacks: 'Playbacks', testimonies: 'Testimonies', shows: 'Shows', contact: 'Contact', donation: 'Donation' },
      footer: { dailymotion: 'https://www.dailymotion.com/user/jeremiahpddrecords', youtube: 'https://www.youtube.com/@jeremiaspddrecords', created: 'Created & Developed by @jere.dev.mkt', copyright: 'PDD Records. All rights reserved © 2026' },
      home: {
        title: 'Mission to All the World', subtitle: 'MISSIONARY --- SON OF GOD --- WORSHIPPER',
        bannertxt: '"The church exists solely to continue the work of Christ, which is the salvation of souls. <br /> Every member must be either a missionary or a supporter of missions." <br /> - Andrew Murray',
        bannerask: '?The harvest is ready — John 4:35-36 — Who ill go', btnsupport: 'Sow in the Mission', about: 'About me', about1: 'Blessings and thank you for visiting my web',
        about2: '"God had an only Son and He made Him a missionary." <br /> - David Livingstone',
        aboutlist: "<li>I received the call to be “an envoy” of God in <strong>2020</strong> (in the midst of the pandemic, at age 18), to reach the northern provinces of Argentina, all of Paraguay, and part of Brazil.</li><li><strong>2022–2024:</strong> I took my first steps in missionary work among the Toba-Qom communities in the Argentine Chaco, Alberdi, and Asunción, Paraguay.</li><li><strong>2025:</strong> I received a scholarship and graduated as a missionary from the <strong>ALMA</strong> (Latin America Missions to the World) seminary school located in Escobar, Paraguarí, Paraguay. God confirmed in various ways that we should go and plant a church in <strong>Croatia and Turkey.</strong></li><li><strong>February 2026: CFAN</strong> (Christ For All Nations) has become the family where I will grow and put down roots at the organizational level—an international foundation. <br /> Through Jesus camps, youth crusades, and outreach efforts in Latin America, Africa, and the Middle East.</li><li><strong>May–June 2026:</strong> While on a mission of faith in Chile, I had a divine encounter that led me to meet a special person, and I was called to my first mission outside the continent: <strong>Guinea-Bissau, Africa, in January 2027</strong></li>",
        data1: 'Faith Decisions in the last 18 months',
        data2: 'Outreachs & Campaings',
        data3: 'Young people and trained evangelists'
      },
      about: {
        about1: 'Nice to meet you',
        about2: "It all began when I was born again… at age 13, which was when the seed to become a missionary was planted in my heart at a themed food fair featuring guest missionaries from Belgium and the Netherlands. I accepted Jesus as my Savior and Lord when I could no longer bear the suffering caused by my asthma; He also rescued me from video games and loneliness. <br /> <br /> I received the call to be “an envoy” of God in 2020 (in the midst of the pandemic, at age 18), to reach the northern provinces of Argentina, all of Paraguay, and part of Brazil.\n\nThe map included three physical locations and three important steps to take in my life.\n\nI understood that my first steps and my ministry began in Paraguay, but a missionary goes and plants a local church in a place where the gospel does not reach easily. <br /> <br />  In 2021–2022, I completed my high school studies as a computer technician, web programmer, and cell phone repair technician. Every bit of applied knowledge is worthwhile. Between 2022 and 2024, I began my first experiences traveling outside the province of Buenos Aires to explore other regions of Argentina. <br /> Mainly in the Argentine Chaco among the Toba-Qom communities, and I traveled abroad several times to Alberdi and Ñeembucu in Paraguay. After years of prayer, between 2024 and 2025, God fulfilled the vision. <br /> <br /> In 2025, I received a scholarship and trained at the ALMA (Latin American Missions to the World) school/seminary located in Escobar, Paraguarí, Paraguay. Having gone through this very intensive, 9-month cross-cultural training program—which provided highly practical tools to apply throughout my life—I now have what I need personally to reach the countries to which God has called me: Croatia and Turkey. <br /> As a team, I was missing something, and in 2026 God also introduced me to the family with whom I will grow and put down roots, and to the organization I can count on all over the world: CFAN (Christ for All Nations). <br /> <br /> I am currently 24 years old and enjoying my single life. My local church is LMEJ (“Lo Mejor es Jesucristo”), located in Maquinista Savio, Buenos Aires, where my family also attends. In Paraguay, it is CFA 3 Bocas. <br /> Recently, in May–June 2026, while on a mission of faith in Chile, I had a divine encounter that led me to meet someone special, and I was called to my first mission outside the continent: Guinea-Bissau, in Africa, in January 2027. God is good, true, and faithful; His mercy endures forever. All glory be to Him.",
        data1: 'Years in the faith',
        data2: 'Countries reached',
        data3: 'Songs produced'
      },
      donation: {
        support: 'Support me', subtitle: 'Be Part of the Mission',
        phrase: '"I will go down into the pit, if you will hold the rope." - William Carey',
        digitalpay: 'Digital Payments & Missionary Suscription with Benefits',
        transfer: 'Direct Bank Transfers',
        copied: 'Copied!',
        copy: 'Copy',
        phrase2: '"Go, send, or disobey." - John Piper',
        prayer: 'Prayer Requests 🙏🏼 Matthew 9:37-38',
        prayertext: PRAYER_TEXT_EN,
        data1: 'Goal Africa 2027',
        data2: 'Faith Missions Experiences',
        data3: 'Countries visited',
        donationimg1: 'sow-into-the-mission-to-guinea-bissau-post.png',
        donationimg2: '/IG-post-Mission-2027.jpg'
      },
      contact: {
        title: 'Contact us',
        subtitle: "Want to share something? Ask a question? Let's talk!",
        fullname: 'Full Name',
        fullnameph: 'Your name',
        email: 'Email Address',
        subject: 'Subject',
        topic: "Topic of conversation",
        msg: 'Message',
        writemsg: 'Write your message here...',
        submitted: 'Message sent successfully! Thank you for reaching out',
        sending: 'Sending',
        send: 'Send Message',
        chat: 'Chat with us'
      },
      news: {
        title: 'Join the Newsletter',
        p: 'Receive updates on missions, music releases, and exclusive content directly to your email and phone',
        email: 'Email Address *',
        number: 'Phone Number *',
        submitok: 'Subscription successful! Thank you for joining',
        submiterr: 'This email is already registered or an error occurred'
      },
      iglobby: {
        title: 'Content Feed',
        subtitle: 'Stay up to date with my latest posts, missions, and music',
        err: 'Could not load the Instagram feed at this time',
        see: 'View on Instagram',
        button: 'Follow on Instagram'
      },
      songs: {
        title: 'Discography',
        p: 'Listen to my full tracks directly through YouTube Music, Spotify, and Apple Music',
        loading: 'Loading tracks...',
        noTracks: 'No tracks available yet',
        missing: 'Missing Link'
      },
      testimonies: {
        loading: 'Loading reports and testimonies...',
        title: 'Testimonies & Reports',
        subtitle: 'Visualize the impact of our ministry through live reports and testimonies',
        canvaReport: 'Latest Missionary Video Report',
        prox: 'Coming Soon',
        pdfTitle: 'Missionary PDF Report',
        pdfBtn: 'Download PDF',
        pdfDes: 'Missionary report in PDF format with detailed information about our recent missions, trips, and evangelisms.',
        section1: 'Stories & Recent Impact',
        shortsSection: 'Shorts / Quick Reflections',
        section2: 'Music & Music Videos'
      }
    }
  },
  'es-AR': {
    translation: {
      navbar: { home: 'Inicio', about: 'Sobre mí', songs: 'Canciones', playbacks: 'Reproducciones', testimonies: 'Testimonios', shows: 'Experiencias', contact: 'Contacto', donation: 'Donación' },
      footer: { dailymotion: 'https://www.dailymotion.com/jeremiaspdd', youtube: 'https://www.youtube.com/channel/UCTsQGi_Kn8BDdQTN2I9O2Mg', created: 'Creado y desarrollado por @jere.dev.mkt', copyright: 'PDD Records. Todos los derechos reservados © 2026' },
      home: {
        title: 'Misión a Todo el Mundo', subtitle: 'MISIONERO --- HIJO DE DIOS --- ADORADOR',
        bannertxt: '"La iglesia existe únicamente para continuar la obra de Cristo, que es la salvación de las almas. <br /> Cada miembro debe ser o un misionero o un sostenedor de misiones." <br /> - Andrew Murray',
        bannerask: '?La cosecha está lista — Juan 4:35-36 — ¿Quién irá', btnsupport: 'Siembra en la Misión', about: 'Sobre mí', about1: 'Bendiciones y gracias por visitar mi web',
        about2: '"Dios tenía un Hijo único y lo hizo misionero." <br /> - David Livingstone',
        aboutlist: "<li>Recibí el llamado a ser “un enviado” de Dios en <strong>2020</strong> (en plena pandemia, a los 18 años), para alcanzar las provincias del norte de Argentina, todo Paraguay y parte de Brasil.</li><li><strong>2022–2024:</strong> Di mis primeros pasos en el trabajo misionero entre las comunidades toba-qom del Chaco argentino, Alberdi y Asunción, Paraguay.</li><li><strong>2025:</strong> Recibí una beca y me gradué como misionero en la escuela seminario <strong>ALMA</strong> (Misión Latinoamérica al Mundo) ubicada en Escobar, Paraguarí, Paraguay. Dios confirmó de varias maneras que debíamos ir y plantar una iglesia en <strong>Croacia y Turquía.</strong></li><li><strong>Febrero 2026: CFAN</strong> (Cristo Para Todas las Naciones) se ha convertido en la familia donde creceré y echaré raíces a nivel organizacional—una fundación internacional. <br /> A través de campamentos de Jesús, cruzadas juveniles y esfuerzos de alcance en Latinoamérica, África y Medio Oriente.</li><li><strong>Mayo–Junio 2026:</strong> Mientras estaba en una misión de fe en Chile, tuve un encuentro divino que me llevó a conocer a una persona especial, y fui llamado a mi primera misión fuera del continente: <strong>Guinea-Bissau, África, en Enero 2027</strong></li>",
        data1: 'Decisiones de Fe en los últimos 18 meses',
        data2: 'Alcances y Campañas',
        data3: 'Jóvenes y evangelistas entrenados'
      },
      about: {
        about1: 'Encantado de conocerte',
        about2: "Todo comenzó cuando nací de nuevo… a los 13 años, que fue cuando se sembró en mi corazón la semilla de ser misionero en una feria gastronómica temática con misioneros invitados de Bélgica y Países Bajos. Acepté a Jesús como mi Salvador y Señor cuando ya no podía soportar el sufrimiento que me causaba mi asma; Él también me rescató de los videojuegos y la soledad. <br /> <br /> Recibí el llamado a ser “un enviado” de Dios en 2020 (en plena pandemia, a los 18 años), para alcanzar las provincias del norte de Argentina, todo Paraguay y parte de Brasil.\n\nEl mapa incluía tres ubicaciones físicas y tres pasos importantes a dar en mi vida.\n\nEntendí que mis primeros pasos y mi ministerio comenzaron en Paraguay, pero un misionero va y planta una iglesia local en un lugar donde el evangelio no llega fácilmente. <br /> <br /> En 2021–2022, completé mis estudios de secundaria como técnico en computación, programador web y técnico en reparación de celulares. Cada conocimiento aplicado vale la pena. Entre 2022 y 2024, comencé mis primeras experiencias viajando fuera de la provincia de Buenos Aires para explorar otras regiones de Argentina. <br /> Principalmente en el Chaco argentino entre las comunidades toba-qom, y viajé al extranjero varias veces a Alberdi y Ñeembucu en Paraguay. Después de años de oración, entre 2024 y 2025, Dios cumplió la visión. <br /> <br /> En 2025, recibí una beca y me formé en la escuela/seminario ALMA (Misión Latinoamérica al Mundo) ubicada en Escobar, Paraguarí, Paraguay. Habiendo pasado por este programa de formación intercultural muy intensivo de 9 meses—que brindó herramientas altamente prácticas para aplicar a lo largo de mi vida—ahora tengo lo que necesito personalmente para alcanzar los países a los que Dios me ha llamado: Croacia y Turquía. <br /> Como equipo, nos faltaba algo, y en 2026 Dios también me presentó a la familia con la que creceré y echaré raíces, y a la organización en la que puedo confiar en todo el mundo: CFAN (Cristo Para Todas las Naciones). <br /> <br /> Actualmente tengo 24 años y disfruto mi vida de soltero. Mi iglesia local es LMEJ (“Lo Mejor es Jesucristo”), ubicada en Maquinista Savio, Buenos Aires, donde también asiste mi familia. En Paraguay es CFA 3 Bocas. <br /> Recientemente, en Mayo–Junio 2026, mientras estaba en una misión de fe en Chile, tuve un encuentro divino que me llevó a conocer a alguien especial, y fui llamado a mi primera misión fuera del continente: Guinea-Bissau, en África, en Enero 2027. Dios es bueno, verdadero y fiel; Su misericordia es eterna. Toda gloria sea para Él.",
        data1: 'Años en la fe',
        data2: 'Países alcanzados',
        data3: 'Canciones producidas'
      },
      donation: {
        support: 'Apóyame', subtitle: 'Sé parte de la misión',
        phrase: '"Descenderé al pozo, si tú sostienes la cuerda." - William Carey',
        digitalpay: 'Pagos digitales y suscripción misionera con beneficios',
        transfer: 'Transferencias bancarias directas',
        copied: '¡Copiado!',
        copy: 'Copiar',
        phrase2: '"Ve, envía o desobedece." - John Piper',
        prayer: 'Peticiones de oración 🙏🏼',
        prayertext: PRAYER_TEXT_ES,
        data2: 'Experiencias de Misiones de Fe',
        data3: 'Países alcanzados',
        donationimg1: '/Siembra-en-la-misión-Guinea-Bissau-2027.png',
        donationimg2: '/IG-post-Mision-2027.JPG'
      },
      contact: {
        title: 'Contáctanos',
        subtitle: "¿Algo que quieras compartirnos? ¿Alguna pregunta? Hablemos :)",
        fullname: 'Nombre Completo',
        fullnameph: 'Tu nombre',
        email: 'Correo Electrónico',
        subject: 'Asunto',
        topic: "Tema de conversación",
        msg: 'Mensaje',
        writemsg: 'Escribe tu mensaje aquí',
        submitted: 'Mensaje enviado correctamente! Gracias por hacernos saber',
        sending: 'Enviando',
        send: 'Envía el mensaje',
        chat: 'Chatea con nosotros'
      },
      news: {
        title: 'Únete al Newsletter',
        p: 'Recibe actualizaciones de misiones, lanzamientos musicales y contenido exclusivo directamente en tu correo y teléfono',
        email: 'Correo Electrónico *',
        number: 'Número de Teléfono *',
        submitok: '¡Suscripción exitosa! Gracias por sumarte',
        submiterr: 'Este correo ya está registrado o hubo un error'
      },
      iglobby: {
        title: 'Cartelera de Contenido',
        subtitle: 'Mantente al día con mis últimos posteos, misiones y música',
        err: 'No se pudo cargar la cartelera de Instagram en este momento',
        see: 'Ver en Instagram',
        button: 'Seguir en Instagram'
      },
      songs: {
        title: 'Discografía',
        p: 'Escucha mis canciones completas directamente a través de YouTube Music, Spotify y Apple Music',
        loading: 'Cargando canciones...',
        noTracks: 'No hay canciones disponibles aún',
        missing: 'Enlace faltante'
      },
      testimonies: {
        loading: 'Cargando reportes y testimonios...',
        title: 'Testimonios & Reportes',
        subtitle: 'Visualiza el impacto de nuestro ministerio a través de reportes y testimonios en vivo',
        canvaReport: 'Último Video-Reporte Misionero',
        prox: 'Próximamente',
        pdfTitle: 'Reporte PDF Misionero',
        pdfBtn: 'Descargar PDF',
        pdfDes: 'Reporte misionero en PDF con información detallada sobre nuestras misiones, viajes y evangelismos recientes.',
        section1: 'Historias & Impacto Reciente',
        shortsSection: 'Shorts / Reflexiones Rápidas',
        section2: 'Música & Videoclips'
      }
    },
  },
  'pt-PT': {
    translation: {
      navbar: { home: 'Início', about: 'Sobre mim', songs: 'Canções', playbacks: 'Reproduções', testimonies: 'Testemunhos', shows: 'Experiências', contact: 'Contacto', donation: 'Doação' },
      footer: { dailymotion: 'https://www.dailymotion.com/jeremiaspdd', youtube: 'https://www.youtube.com/channel/UCTsQGi_Kn8BDdQTN2I9O2Mg', created: 'Criado e desenvolvido por @jere.dev.mkt', copyright: 'PDD Records. Todos os direitos reservados © 2026' },
      home: {
        title: 'Missão para Todo o Mundo', subtitle: 'MISSIONÁRIO --- FILHO DE DEUS --- ADORADOR',
        bannertxt: '"A igreja existe unicamente para continuar a obra de Cristo, que é a salvação das almas. <br /> Cada membro deve ser ou um missionário ou um apoiador de missões." <br /> - Andrew Murray',
        bannerask: '?A colheita está pronta — João 4:35-36 — Quem irá', btnsupport: 'Semeie na Missão', about: 'Sobre mim', about1: 'Bênçãos e obrigado por visitar meu site',
        about2: '"Deus tinha um Filho único e Ele o fez missionário." <br /> - David Livingstone',
        aboutlist: "<li>Recebi o chamado para ser “um enviado” de Deus em <strong>2020</strong> (em plena pandemia, aos 18 anos), para alcançar as províncias do norte da Argentina, todo o Paraguai e parte do Brasil.</li><li><strong>2022–2024:</strong> Dei meus primeiros passos no trabalho missionário entre as comunidades toba-qom do Chaco argentino, Alberdi e Assunção, Paraguai.</li><li><strong>2025:</strong> Recebi uma bolsa de estudos e me formei como missionário na escola seminário <strong>ALMA</strong> (Missão América Latina para o Mundo) localizada em Escobar, Paraguarí, Paraguai. Deus confirmou de várias maneiras que deveríamos ir e plantar uma igreja na <strong>Croácia e Turquia.</strong></li><li><strong>Fevereiro 2026: CFAN</strong> (Cristo Para Todas as Nações) tornou-se a família onde vou crescer e criar raízes a nível organizacional—uma fundação internacional. <br /> Através de acampamentos de Jesus, cruzadas juvenis e esforços de alcance na América Latina, África e Oriente Médio.</li><li><strong>Maio–Junho 2026:</strong> Enquanto estava em uma missão de fé no Chile, tive um encontro divino que me levou a conhecer uma pessoa especial, e fui chamado para minha primeira missão fora do continente: <strong>Guiné-Bissau, África, em Janeiro 2027</strong></li>",
        data1: 'Decisões de Fé nos últimos 18 meses',
        data2: 'Alcances e Campanhas',
        data3: 'Jovens e evangelistas treinados'
      },
      about: {
        about1: 'Prazer em conhecê-lo',
        about2: "Tudo começou quando nasci de novo… aos 13 anos, que foi quando a semente de me tornar missionário foi plantada em meu coração em uma feira gastronômica temática com missionários convidados da Bélgica e dos Países Baixos. Aceitei Jesus como meu Salvador e Senhor quando não pude mais suportar o sofrimento causado pela minha asma; Ele também me resgatou dos videogames e da solidão. <br /> <br /> Recebi o chamado para ser “um enviado” de Deus em 2020 (em plena pandemia, aos 18 anos), para alcançar as províncias do norte da Argentina, todo o Paraguai e parte do Brasil.\n\nO mapa incluía três locais físicos e três passos importantes a serem dados em minha vida.\n\nEntendi que meus primeiros passos e meu ministério começaram no Paraguai, mas um missionário vai e planta uma igreja local em um lugar onde o evangelho não chega facilmente. <br /> <br /> Em 2021–2022, concluí meus estudos de ensino médio como técnico em informática, programador web e técnico em reparo de celulares. Cada conhecimento aplicado vale a pena. Entre 2022 e 2024, comecei minhas primeiras experiências viajando para fora da província de Buenos Aires para explorar outras regiões da Argentina. <br /> Principalmente no Chaco argentino entre as comunidades toba-qom, e viajei para o exterior várias vezes para Alberdi e Ñeembucu no Paraguai. Após anos de oração, entre 2024 e 2025, Deus cumpriu a visão. <br /> <br /> Em 2025, recebi uma bolsa de estudos e me formei na escola/seminário ALMA (Missão América Latina para o Mundo) localizada em Escobar, Paraguarí, Paraguai. Tendo passado por este programa de formação intercultural muito intensivo de 9 meses—que forneceu ferramentas altamente práticas para aplicar ao longo da minha vida—agora tenho o que preciso pessoalmente para alcançar os países aos quais Deus me chamou: Croácia e Turquia. <br /> Como equipe, faltava-nos algo, e em 2026 Deus também me apresentou à família com a qual vou crescer e criar raízes, e à organização na qual posso confiar em todo o mundo: CFAN (Cristo Para Todas as Nações). <br /> <br /> Atualmente tenho 24 anos e aproveito minha vida de solteiro. Minha igreja local é LMEJ (“Lo Mejor es Jesucristo”), localizada em Maquinista Savio, Buenos Aires, onde minha família também frequenta. No Paraguai é CFA 3 Bocas. <br /> Recentemente, em Maio–Junho 2026, enquanto estava em uma missão de fé no Chile, tive um encontro divino que me levou a conhecer alguém especial, e fui chamado para minha primeira missão fora do continente: Guiné-Bissau, na África, em Janeiro 2027. Deus é bom, verdadeiro e fiel; Sua misericórdia dura para sempre. Toda glória seja para Ele.",
        data1: 'Anos na fé',
        data2: 'Países alcançados',
        data3: 'Músicas produzidas'
      },
      donation: {
        support: 'Apoie-me', subtitle: 'Faça parte da missão',
        phrase: '"Eu desceria ao poço, se você segurasse a corda." - William Carey',
        digitalpay: 'Pagamentos digitais e assinatura missionária com benefícios',
        transfer: 'Transferências bancárias diretas',
        copied: 'Copiado!',
        copy: 'Copiar',
        phrase2: '"Vá, envie ou desobedeça." - John Piper',
        prayer: 'Pedidos de oração 🙏🏼',
        prayertext: PRAYER_TEXT_PT,
        data1: 'Meta África 2027',
        data2: 'Experiências de Misiones de Fe',
        data3: 'Países alcançados',
        donationimg1: '/Siembra-en-la-misión-Guinea-Bissau-2027.png',
        donationimg2: '/IG-post-Mision-2027.JPG'
      },
      contact: {
        title: 'Contate-nos',
        subtitle: "Algo que queira compartilhar? Alguma pergunta? Vamos conversar :)",
        fullname: 'Nome Completo',
        fullnameph: 'Seu nome',
        email: 'E-mail',
        subject: 'Assunto',
        topic: 'Assunto da conversa',
        msg: 'Mensagem',
        writemsg: 'Escreva sua mensagem aqui...',
        submitted: 'Mensagem enviada com sucesso! Obrigado por nos avisar',
        sending: 'Enviando',
        send: 'Enviar mensagem',
        chat: 'Converse conosco'
      },
      news: {
        title: 'Junte-se à Newsletter',
        p: 'Receba atualizações de missões, lançamentos musicais e conteúdo exclusivo diretamente no seu e-mail e telefone',
        email: 'E-mail *',
        number: 'Número de Telefone *',
        submitok: 'Inscrição bem-sucedida! Obrigado por se juntar a nós',
        submiterr: 'Este e-mail já está registrado ou ocorreu um erro'
      },
      iglobby: {
        title: 'Feed de Conteúdo',
        subtitle: 'Fique por dentro das minhas últimas postagens, missões e músicas',
        err: 'Não foi possível carregar o feed do Instagram no momento',
        see: 'Ver no Instagram',
        button: 'Seguir no Instagram'
      },
      songs: {
        title: 'Discografia',
        p: 'Ouça minhas músicas completas diretamente através do YouTube Music, Spotify e Apple Music',
        loading: 'Carregando músicas...',
        noTracks: 'Nenhuma música disponível ainda',
        missing: 'Link ausente'
      },
      testimonies: {
        loading: 'Carregando relatórios e testemunhos...',
        title: 'Depoimentos & Relatórios',
        subtitle: 'Visualize o impacto do nosso ministério através de relatórios e depoimentos ao vivo',
        canvaReport: 'Último Vídeo-Relatório Missionário',
        prox: 'Em breve',
        pdfTitle: 'Relatório PDF Missionário',
        pdfBtn: 'Baixar PDF',
        pdfDes: 'Relatório missionário em formato PDF com informações detalhadas sobre nossas missões, viagens e evangelismos recentes.',
        section1: 'Histórias & Impacto Recente',
        shortsSection: 'Shorts / Reflexões Rápidas',
        section2: 'Música & Videoclipes'
      }
    }
  },
  'de-DE': {
    translation: {
      navbar: { home: 'Startseite', about: 'Über mich', songs: 'Lieder', playbacks: 'Playbacks', testimonies: 'Erfahrungsberichte', shows: 'Erfahrungen', contact: 'Kontakt', donation: 'Spenden' },
      footer: { dailymotion: 'https://www.dailymotion.com/user/jeremiahpddrecords', youtube: 'https://www.youtube.com/@jeremiaspddrecords', created: 'Erstellt & Entwickelt von @jere.dev.mkt', copyright: 'PDD Records. Alle Rechte vorbehalten © 2026' },
      home: {
        title: 'Mission in die ganze Welt', subtitle: 'MISSIONAR --- SOHN GOTTES --- ANBETER',
        bannertxt: '"Die Kirche existiert ausschließlich, um das Werk Christi fortzusetzen, nämlich die Rettung der Seelen. <br /> Jedes Mitglied muss entweder ein Missionar oder ein Unterstützer von Missionen sein." <br /> - Andrew Murray',
        bannerask: '?Die Ernte ist reif — Johannes 4:35-36 — Wer wird gehen', btnsupport: 'Säe in die Mission', about: 'Über mich', about1: 'Segen und danke, dass du meine Website besuchst',
        about2: '"Gott hatte einen einzigen Sohn und machte ihn zum Missionar." <br /> - David Livingstone',
        aboutlist: "<li>Ich erhielt den Ruf, ein „Gesandter“ Gottes zu sein, im <strong>Jahr 2020</strong> (mitten in der Pandemie, im Alter von 18 Jahren), um die nördlichen Provinzen Argentiniens, ganz Paraguay und einen Teil Brasiliens zu erreichen.</li><li><strong>2022–2024:</strong> Ich machte meine ersten Schritte in der Missionsarbeit unter den Toba-Qom-Gemeinschaften im argentinischen Chaco, Alberdi und Asunción, Paraguay.</li><li><strong>2025:</strong> Ich erhielt ein Stipendium und schloss meine Ausbildung als Missionar an der <strong>ALMA</strong> (Lateinamerika-Missionen in die Welt) Seminar-Schule in Escobar, Paraguarí, Paraguay ab. Gott bestätigte auf verschiedene Weise, dass wir gehen und eine Kirche in <strong>Kroatien und der Türkei</strong> gründen sollten.</li><li><strong>Februar 2026: CFAN</strong> (Christus für alle Nationen) ist die Familie geworden, in der ich auf organisatorischer Ebene wachsen und Wurzeln schlagen werde – eine internationale Stiftung. <br /> Durch Jesus-Camps, Jugendkreuze und Outreach-Bemühungen in Lateinamerika, Afrika und dem Nahen Osten.</li><li><strong>Mai–Juni 2026:</strong> Während einer Glaubensmission in Chile hatte ich eine göttliche Begegnung, die mich dazu führte, eine besondere Person kennenzulernen, und ich wurde zu meiner ersten Mission außerhalb des Kontinents berufen: <strong>Guinea-Bissau, Afrika, im Januar 2027</strong></li>",
        data1: 'Entscheidungen des Glaubens in den letzten 18 Monaten',
        data2: 'Outreachs & Kampagnen',
        data3: 'Jugendliche und ausgebildete Evangelisten'
      },
      about: {
        about1: 'Schön, dich kennenzulernen',
        about2: "Alles begann, als ich wiedergeboren wurde… im Alter von 13 Jahren, als der Samen gepflanzt wurde, Missionar zu werden, auf einer thematischen Lebensmittelmesse mit eingeladenen Missionaren aus Belgien und den Niederlanden. Ich nahm Jesus als meinen Retter und Herrn an, als ich das Leiden durch mein Asthma nicht mehr ertragen konnte; Er rettete mich auch vor Videospielen und Einsamkeit. <br /> <br /> Ich erhielt den Ruf, ein „Gesandter“ Gottes zu sein, im Jahr 2020 (mitten in der Pandemie, im Alter von 18 Jahren), um die nördlichen Provinzen Argentiniens, ganz Paraguay und einen Teil Brasiliens zu erreichen.\n\nDie Karte enthielt drei physische Standorte und drei wichtige Schritte in meinem Leben.\n\nIch verstand, dass meine ersten Schritte und mein Dienst in Paraguay begannen, aber ein Missionar geht und gründet eine lokale Kirche an einem Ort, an dem das Evangelium nicht leicht zugänglich ist. <br /> <br /> In den Jahren 2021–2022 schloss ich meine Schulbildung als Computertechniker, Webprogrammierer und Handy-Reparaturtechniker ab. Jedes angewandte Wissen ist wertvoll. Zwischen 2022 und 2024 begann ich meine ersten Erfahrungen außerhalb der Provinz Buenos Aires, um andere Regionen Argentiniens zu erkunden. <br /> Vor allem im argentinischen Chaco unter den Toba-Qom-Gemeinschaften, und ich reiste mehrmals ins Ausland nach Alberdi und Ñeembucu in Paraguay. Nach Jahren des Gebets erfüllte Gott zwischen 2024 und 2025 die Vision. <br /> <br /> Im Jahr 2025 erhielt ich ein Stipendium und absolvierte eine Ausbildung an der ALMA (Lateinamerika-Missionen in die Welt) Schule/Seminar in Escobar, Paraguarí, Paraguay. Nachdem ich dieses sehr intensive, 9-monatige interkulturelle Ausbildungsprogramm durchlaufen hatte – das hochpraktische Werkzeuge für mein ganzes Leben bereitstellte – habe ich nun persönlich das, was ich brauche, um die Länder zu erreichen, zu denen Gott mich berufen hat: Kroatien und die Türkei. <br /> Als Team fehlte uns etwas, und im Jahr 2026 stellte mich Gott auch der Familie vor, mit der ich wachsen und Wurzeln schlagen werde, und der Organisation, auf die ich weltweit zählen kann: CFAN (Christus für alle Nationen). <br /> <br /> Ich bin derzeit 24 Jahre alt und genieße mein Single-Leben. Meine lokale Kirche ist LMEJ („Lo Mejor es Jesucristo“), die sich in Maquinista Savio, Buenos Aires befindet, wo auch meine Familie hingeht. In Paraguay ist es CFA 3 Bocas. <br /> Kürzlich hatte ich im Mai–Juni 2026 während einer Glaubensmission in Chile eine göttliche Begegnung, die mich dazu führte, eine besondere Person kennenzulernen, und ich wurde zu meiner ersten Mission außerhalb des Kontinents berufen: Guinea-Bissau in Afrika im Januar 2027. Gott ist gut, wahrhaftig und treu; Seine Barmherzigkeit währt ewig. Alle Ehre sei Ihm.",
        data1: 'Jahre im Glauben',
        data2: 'Erreichte Länder',
        data3: 'Produzierte Lieder'
      },
      donation: {
        support: 'Unterstütze mich', subtitle: 'Werde Teil der Mission',
        phrase: '"Ich werde in die Grube hinabsteigen, wenn du das Seil hältst." - William Carey',
        digitalpay: 'Digitale Zahlungen & Missionarisches Abonnement mit Vorteilen',
        transfer: 'Direkte Banküberweisungen',
        copied: 'Kopiert!',
        copy: 'Kopieren',
        phrase2: '"Geh, sende oder ungehorsam." - John Piper',
        prayer: ' Gebetsanfragen 🙏🏼',
        prayertext: PRAYER_TEXT_DE,
        data1: 'Afrika-Ziel 2027',
        data2: 'Erfahrungen mit Glaubensmission',
        data3: 'erreichte Länder',
        donationimg1: '/sae-en-de-mission.png',
        donationimg2: '/IG german Mission GB 2027.jpg'
      },
      contact: {
        title: 'Kontaktieren Sie uns',
        subtitle: "Möchten Sie etwas mit uns teilen? Haben Sie eine Frage? Lassen Sie uns sprechen :)",
        fullname: 'Vollständiger Name',
        fullnameph: 'Ihr Name',
        email: 'E-Mail-Adresse',
        subject: 'Betreff',
        topic: 'Thema des Gesprächs',
        msg: 'Nachricht',
        writemsg: 'Schreiben Sie Ihre Nachricht hier...',
        submitted: 'Nachricht erfolgreich gesendet! Vielen Dank, dass Sie uns informiert haben',
        sending: 'Wird gesendet',
        send: 'Nachricht senden',
        chat: 'Chatten Sie mit uns'
      },
      news: {
        title: 'Melden Sie sich für den Newsletter an',
        p: 'Erhalten Sie Updates zu Missionen, Musikveröffentlichungen und exklusiven Inhalten direkt per E-Mail und Telefon',
        email: 'E-Mail-Adresse *',
        number: 'Telefonnummer *',
        submitok: 'Anmeldung erfolgreich! Vielen Dank, dass Sie dabei sind',
        submiterr: 'Diese E-Mail ist bereits registriert oder es ist ein Fehler aufgetreten'
      },
      iglobby: {
        title: 'Inhalts-Feed',
        subtitle: 'Bleiben Sie auf dem Laufenden mit meinen neuesten Beiträgen, Missionen und Musik',
        err: 'Der Instagram-Feed konnte derzeit nicht geladen werden',
        see: 'Auf Instagram ansehen',
        button: 'Auf Instagram folgen'
      },
      songs: {
        title: 'Diskografie',
        p: 'Hören Sie meine vollständigen Songs direkt über YouTube Music, Spotify und Apple Music',
        loading: 'Songs werden geladen...',
        noTracks: 'Noch keine Songs verfügbar',
        missing: 'Fehlender Link'
      },
      testimonies: {
        loading: 'Lade Berichte und Zeugnisse...',
        title: 'Zeugnisse & Berichte',
        subtitle: 'Erleben Sie die Auswirkungen unseres Dienstes durch Live-Berichte und Zeugnisse',
        canvaReport: 'Neuester Missions-Videobericht',
        prox: 'Demnächst',
        pdfTitle: 'Missionsbericht (PDF)',
        pdfBtn: 'PDF herunterladen',
        pdfDes: 'Missionsbericht im PDF-Format mit detaillierten Informationen über unsere jüngsten Missionen, Reisen und Evangelisationen.',
        section1: 'Geschichten & aktuelle Auswirkungen',
        shortsSection: 'Shorts / Kurze Reflexionen',
        section2: 'Musik & Musikvideos'
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US', // 👈 Idioma por defecto si todo falla
  });

export default i18n;