import { motion } from 'framer-motion'

const trustPillars = [
  {
    title: 'Australian Data Residency',
    desc: 'GCP Sydney (australia-southeast1). Data never leaves Australia.',
  },
  {
    title: 'Zero AI Retention',
    desc: 'Documents are never used to train AI models. Enforced at infrastructure level.',
  },
  {
    title: 'Privacy Act 1988 (Cth)',
    desc: 'All 13 Australian Privacy Principles enforced.',
  },
  {
    title: 'MARA Code of Conduct',
    desc: 'Aligned with MARA agent professional obligations and Migration Act 1958.',
  },
]

const certBadges = [
  {
    title: 'CSA STAR Level 1',
    desc: 'Cloud Security Alliance security self-assessment — 263 controls. Published on the public CSA registry.',
  },
  {
    title: 'CSA STAR for AI Level 1',
    desc: 'AI governance assessment — 311 controls covering model security, AI governance, and responsible AI practices.',
  },
  {
    title: 'ASD Cyber Security Business Partner',
    desc: 'Registered partner of the Australian Signals Directorate — Australia\'s national cyber security agency.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-off-white pt-24">

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow flex-shrink-0" />
              <span className="text-forest/50 text-sm">About Migro</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-forest font-display leading-tight mb-6">
              Built for Australia's<br />Migration Profession
            </h1>
            <p className="text-forest/60 text-lg leading-relaxed">
              Migro is an AI-powered practice intelligence platform built exclusively for MARA-registered migration agents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The problem we solve */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <p className="text-forest/40 text-xs font-medium uppercase tracking-widest mb-4">The Problem</p>
              <h2 className="text-3xl font-bold text-forest font-display mb-6 leading-tight">
                Hours of manual work<br />before the legal work begins.
              </h2>
              <div className="space-y-4 text-forest/60 text-base leading-relaxed">
                <p>
                  Migration agents manage 15 to 25 documents per visa application — passports, police clearances, employment records, skills assessments, health checks — arriving unorganised across weeks of client communication.
                </p>
                <p>
                  Manually reviewing every document against visa requirements takes 1 to 3 hours per case. For a sole practitioner running 20 cases a month, that is up to 60 hours of non-billable work — a week and a half — before any legal work begins.
                </p>
                <p className="text-forest font-semibold">
                  Migro eliminates that. Upload the entire bundle. Get a compliance dashboard in two minutes.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '1–3 hrs', label: 'manual review per case' },
                { stat: '20+', label: 'documents per application' },
                { stat: '2 min', label: 'with Migro AI review' },
                { stat: '60 hrs/mo', label: 'saved for a busy practitioner' },
              ].map((item, i) => (
                <div key={i} className="bg-surface border border-warm-grey rounded-xl p-5 text-center">
                  <p className="text-emerald text-2xl font-bold font-display mb-1">{item.stat}</p>
                  <p className="text-forest/50 text-xs leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section className="pb-20 px-6 bg-surface border-y border-warm-grey">
        <div className="max-w-6xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div>
              <p className="text-forest/40 text-xs font-medium uppercase tracking-widest mb-4">Founder</p>
              <h2 className="text-3xl font-bold text-forest font-display mb-2">Rodrigo Gutierrez</h2>
              <p className="text-emerald text-sm font-semibold mb-3">Founder &amp; CEO, Integrated Platforms Pty Ltd</p>
              <a
                href="https://www.linkedin.com/in/rodrigogutierrezb/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-forest/45 hover:text-forest text-sm mb-6 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                linkedin.com/in/rodrigogutierrezb
              </a>
              <div className="space-y-4 text-forest/60 text-base leading-relaxed">
                <p>
                  Rodrigo is an AI automation specialist with 15 years of experience across Chile, Canada, the United States, and Australia. He is a published author of <em>Working with AI</em> — an Amazon bestseller in its category — and an international speaker on AI adoption in professional services, having presented at HubSpot INBOUND San Francisco, YPO Sydney, and Seoul Startup Hub.
                </p>
                <p>
                  Rodrigo built Migro after going through the Australian visa process himself as a Subclass 190 NSW applicant. The experience of navigating 20+ documents across weeks of back-and-forth — even as a technology professional — revealed how manual and error-prone the document review process is for agents and clients alike.
                </p>
                <p>
                  He also serves as Global CRM &amp; AI Automation Manager at Antler, a global venture capital firm operating across 27 countries, where he builds and deploys AI infrastructure across the portfolio.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/rod.jpeg"
                alt="Rodrigo Gutierrez"
                className="w-48 h-48 rounded-full object-cover object-top shadow-warm-md"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company details */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-forest/40 text-xs font-medium uppercase tracking-widest mb-8">Company Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <p className="text-forest text-sm font-semibold mb-3">Company</p>
                <div className="space-y-1 text-forest/55 text-sm">
                  <p>Integrated Platforms Pty Ltd</p>
                  <p>ABN 69 693 247 513</p>
                  <p>ACN 693 247 513</p>
                  <p>Founded November 2025</p>
                </div>
              </div>
              <div>
                <p className="text-forest text-sm font-semibold mb-3">Location</p>
                <div className="space-y-1 text-forest/55 text-sm">
                  <p>Bondi Beach, NSW 2026</p>
                  <p>Australia</p>
                </div>
              </div>
              <div>
                <p className="text-forest text-sm font-semibold mb-3">Contact</p>
                <div className="space-y-1 text-sm">
                  <p><a href="mailto:info@migro.com.au" className="text-emerald hover:underline">info@migro.com.au</a></p>
                  <p><a href="https://migro.com.au" className="text-emerald hover:underline">migro.com.au</a></p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security & compliance */}
      <section className="py-20 px-6 bg-forest">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/35 text-xs font-medium uppercase tracking-widest mb-4 text-center">Security &amp; Compliance</p>
            <h2 className="text-white text-3xl font-bold font-display text-center mb-12">
              Built secure. Compliant by design.
            </h2>

            {/* Cert badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {certBadges.map((cert, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="w-8 h-8 rounded-lg bg-emerald/20 flex items-center justify-center mb-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-emerald">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                  </div>
                  <p className="text-white text-sm font-semibold mb-1.5">{cert.title}</p>
                  <p className="text-white/45 text-xs leading-relaxed">{cert.desc}</p>
                </div>
              ))}
            </div>

            {/* Trust pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trustPillars.map((pillar, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-white text-sm font-semibold mb-1.5">{pillar.title}</p>
                  <p className="text-white/45 text-xs leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-forest/40 text-xs font-medium uppercase tracking-widest mb-4">Infrastructure</p>
            <h2 className="text-2xl font-bold text-forest font-display mb-6">Built on Google Cloud Sydney</h2>
            <p className="text-forest/60 text-base leading-relaxed">
              Migro is built entirely on Google Cloud (australia-southeast1 — Sydney). AI inference runs on Google Vertex AI (Gemini 1.5 Pro). All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Infrastructure certified ISO 27001 and SOC 2 Type II (Google Cloud).
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
