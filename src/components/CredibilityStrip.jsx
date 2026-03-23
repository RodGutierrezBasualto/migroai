import { motion } from 'framer-motion'

const pillars = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 000 20M12 2a14.5 14.5 0 010 20M2 12h20"/>
        <path d="M4.93 4.93a10 10 0 0014.14 14.14"/>
      </svg>
    ),
    title: 'Australian Data Residency',
    body: 'All data processed and stored exclusively within Australia. No data ever leaves Australian jurisdiction.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: 'Encryption',
    body: 'AES-256 encryption at rest. TLS 1.3 in transit. All client immigration documents protected end-to-end.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>
    ),
    title: 'AI Privacy',
    body: 'Zero data retention on AI inference. Your documents are never used to train AI models.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Compliance',
    body: (
      <>
        Privacy Act 1988 (Cth) · Australian Privacy Principles enforced.
        Migration Act 1958 and MARA Code of Conduct aligned.
        GDPR principles applied for offshore client data.
      </>
    ),
  },
]

const logos = [
  { src: '/logos/STAR-Level-1-badge.png',         alt: 'CSA STAR Level One',        h: 'h-14' },
  { src: '/logos/STAR for AI Level One badge.png', alt: 'CSA STAR for AI Level One', h: 'h-14' },
  { src: '/logos/google-cloud.png',                alt: 'Google Cloud',              h: 'h-8'  },
  { src: '/logos/Powered by Vertex AI.svg',        alt: 'Powered by Vertex AI',      h: 'h-8'  },
]

export default function CredibilityStrip() {
  return (
    <section className="bg-forest py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-white/35 text-xs font-medium uppercase tracking-widest mb-4">
            Built for Australia's MARA-registered migration agents
          </p>
          <h2 className="text-white text-3xl lg:text-4xl font-bold font-display leading-tight">
            Built secure. Compliant by design.
          </h2>
        </motion.div>

        {/* Security pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <div className="text-emerald mb-3">{p.icon}</div>
              <p className="text-white text-sm font-semibold mb-2">{p.title}</p>
              <p className="text-white/45 text-xs leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications band */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 pt-12"
        >
          <p className="text-center text-white/35 text-xs uppercase tracking-widest mb-10">
            Certifications &amp; Infrastructure
          </p>

          {/* Logo row */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {logos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.h} w-auto object-contain opacity-75 hover:opacity-100 transition-opacity duration-200`}
              />
            ))}
          </div>

          <p className="text-center text-white/30 text-xs mt-10 max-w-xl mx-auto leading-relaxed">
            Migro infrastructure is built on Google Cloud Platform, which holds ISO 27001, SOC 2 Type II, PCI DSS, and Australian IRAP certifications.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
