import { motion } from 'framer-motion'

const features = [
  {
    tag: 'Intake Agent',
    title: 'Qualify clients before they book a call.',
    desc: 'Share a unique intake link or embed the chat on your website. Migro qualifies the enquiry, captures consent, and builds a structured client profile — before you spend a minute of your time.',
    visual: (
      <div className="relative rounded-xl border border-warm-grey bg-surface p-4 overflow-hidden shadow-warm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-forest/20" />
          <div className="w-2 h-2 rounded-full bg-forest/20" />
          <div className="w-2 h-2 rounded-full bg-forest/20" />
          <span className="ml-2 text-forest/30 text-xs font-mono">yourfirm.com.au</span>
        </div>
        <div className="space-y-2">
          {[
            { step: '01', label: 'Personal Details', done: true },
            { step: '02', label: 'Education Background', done: true },
            { step: '03', label: 'Work Experience', done: true },
            { step: '04', label: 'English Proficiency', done: false, active: true },
            { step: '05', label: 'Health & Character', done: false },
            { step: '06', label: 'Migration Goals', done: false },
          ].map(item => (
            <div key={item.step} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              item.active ? 'bg-emerald-tint border border-emerald/25' : item.done ? 'opacity-50' : 'opacity-30'
            }`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                item.done ? 'bg-emerald text-white' : item.active ? 'border-2 border-emerald text-emerald' : 'border border-forest/20 text-forest/30'
              }`}>
                {item.done ? '✓' : item.step}
              </div>
              <span className={`text-xs ${item.active ? 'text-emerald font-medium' : 'text-forest/60'}`}>{item.label}</span>
              {item.active && <span className="ml-auto text-emerald text-xs animate-pulse-slow">●</span>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    tag: 'Document Intelligence',
    title: 'Turn a document folder into an audit-ready evidence pack.',
    desc: 'Upload up to 25 files — PDFs, Word docs, spreadsheets, images. Migro reads every document, flags expired certificates, catches inconsistencies, and cites the exact Migration Regulations clause. Branded PDF report ready in under two minutes.',
    visual: (
      <div className="rounded-xl border border-warm-grey bg-surface p-4 shadow-warm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-forest/50 text-xs font-medium">Documents Received</span>
          <span className="text-xs text-forest/40">3 issues found</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'Vetasses_Assessment.pdf', size: 'Expired 2025-08-26', status: 'issue' },
            { name: 'IELTS_Certificate_2024.pdf', size: '890 KB', status: 'verified' },
            { name: 'Resume_Updated.docx', size: '420 KB', status: 'verified' },
            { name: 'Passport_Scan.pdf', size: 'Expired passport detected', status: 'issue' },
            { name: 'travel_history.xlsx', size: 'Gap 2022–2023 flagged', status: 'issue' },
          ].map((doc, i) => (
            <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              doc.status === 'verified' ? 'bg-warm-grey' : 'border border-red-200 bg-red-50'
            }`}>
              <div className={`w-6 h-6 rounded flex items-center justify-center text-xs flex-shrink-0 ${
                doc.status === 'verified' ? 'bg-emerald-tint text-emerald' : 'bg-red-100 text-red-500'
              }`}>
                {doc.status === 'verified' ? '✓' : '!'}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs truncate ${doc.status === 'verified' ? 'text-forest/70' : 'text-red-700 font-medium'}`}>{doc.name}</p>
              </div>
              <span className={`text-xs flex-shrink-0 ${doc.status === 'verified' ? 'text-forest/30' : 'text-red-400'}`}>{doc.size}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-forest/35">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          AES-256 encrypted · Sydney region
        </div>
      </div>
    ),
  },
  {
    tag: 'Migration Counsel',
    title: 'Your AI migration law research assistant.',
    desc: 'Ask any question about the Migration Act 1958, Migration Regulations 1994, or PAM3. Grounded, cited answers — not general knowledge.',
    cta: 'Join waitlist',
    ctaHref: '#waitlist',
    comingSoon: true,
    visual: (
      <div className="rounded-xl border border-warm-grey bg-surface p-4 shadow-warm opacity-75">
        <div className="flex items-center justify-between mb-4">
          <span className="text-forest/50 text-xs font-medium">Migration Counsel</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-warm-grey text-forest/40">Coming mid-2026</span>
        </div>
        <div className="space-y-3">
          <div className="bg-warm-grey rounded-xl rounded-tl-sm px-3 py-2.5">
            <p className="text-forest/70 text-xs leading-relaxed">What are the evidentiary requirements for a de facto relationship under reg 1.15A?</p>
          </div>
          <div className="bg-emerald-tint border border-emerald/15 rounded-xl rounded-tr-sm px-3 py-2.5">
            <p className="text-forest/70 text-xs leading-relaxed mb-2">Under r 1.15A(1)(b), a de facto relationship requires a genuine, committed and continuing relationship. Evidence of cohabitation, financial interdependence, and social recognition is relevant to the assessment.</p>
            <p className="text-forest/40 text-[10px] font-mono">↳ Migration Regulations 1994, r 1.15A(1)(b)</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-forest/30 text-[10px]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          Grounded in PAM3 and current legislation
        </div>
      </div>
    ),
  },
]

export default function FeaturesSection() {
  return (
    <section className="relative py-24 bg-off-white border-t border-warm-grey" id="features">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-forest/40 text-sm font-medium uppercase tracking-widest mb-3">The Migro Way</p>
          <h2 className="text-4xl font-bold text-forest mb-4 font-display">Everything you need,<br />nothing you don't.</h2>
          <p className="text-forest/55 text-lg max-w-xl mx-auto">
            Three capabilities working together to transform the first 15 minutes of every client relationship.
          </p>
        </motion.div>

        <div className="space-y-20">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${f.comingSoon ? 'opacity-60' : ''}`}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-forest/40 text-sm font-medium">{f.tag}</p>
                  {f.comingSoon && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-warm-grey text-forest/40">Coming mid-2026</span>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-forest mb-4 leading-tight font-display">{f.title}</h3>
                <p className="text-forest/55 text-base leading-relaxed mb-6">{f.desc}</p>
                {f.cta && (
                  <a href={f.ctaHref} className="text-emerald text-sm font-semibold hover:underline">{f.cta} →</a>
                )}
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                {f.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
