import { motion } from 'framer-motion'

const features = [
  {
    tag: 'AI Intake Widget',
    title: 'Smart client conversations, on your website.',
    desc: 'Embed a fully branded AI chatbot that guides prospective clients through a 6-step intake — gathering all essential information before you ever pick up the phone.',
    points: [
      'Embeds on any website with a single line of code',
      "Fully customisable with your firm's logo and colours",
      'Adapts questions based on client responses',
      'Available 24/7, even when you\'re not',
    ],
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
    tag: 'Automated Assessment',
    title: 'Visa pathways in seconds, not hours.',
    desc: "Migro's AI analyses each client's data against Australian immigration legislation, delivering ranked visa pathway recommendations with confidence scores and red flags — instantly.",
    points: [
      'Covers all major visa subclasses (skilled, family, employer, student)',
      'Confidence scores show eligibility likelihood',
      'Automatic red flag detection (age, health, character)',
      'Detailed next-steps for the agent review',
    ],
    visual: (
      <div className="rounded-xl border border-warm-grey bg-surface p-4 shadow-warm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-forest/50 text-xs font-medium">Visa Pathway Assessment</span>
          <span className="text-xs text-emerald font-medium">Completed</span>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Subclass 189 — Skilled Independent', score: 87 },
            { label: 'Subclass 190 — Skilled Nominated', score: 74 },
            { label: 'Subclass 491 — Regional Provisional', score: 61 },
            { label: 'Subclass 482 — Employer Sponsored', score: 42 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-forest/65 text-xs">{item.label}</span>
                <span className="text-forest/50 text-xs font-semibold">{item.score}%</span>
              </div>
              <div className="h-1.5 bg-warm-grey rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 * i }}
                  className="h-full bg-emerald rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
          <span className="text-amber-500 text-sm">⚠</span>
          <p className="text-amber-700 text-xs">Skills assessment must be current (within 3 years)</p>
        </div>
      </div>
    ),
  },
  {
    tag: 'Secure Document Collection',
    title: 'Documents collected at day zero.',
    desc: "Clients upload supporting documents directly during intake. Everything is encrypted, stored securely in Australia, and ready for your review — with full audit logging for MARA compliance.",
    points: [
      'Supports PDF, DOCX, XLSX uploads',
      'Encrypted at rest and in transit',
      'Australian data residency guaranteed',
      'Audit logs for every action and access event',
    ],
    visual: (
      <div className="rounded-xl border border-warm-grey bg-surface p-4 shadow-warm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-forest/50 text-xs font-medium">Documents Received</span>
          <span className="text-xs text-forest/40">3 of 5</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'Engineers_Australia_Assessment.pdf', size: '1.2 MB', status: 'verified' },
            { name: 'IELTS_Certificate_2024.pdf', size: '890 KB', status: 'verified' },
            { name: 'Resume_Updated.docx', size: '420 KB', status: 'verified' },
            { name: 'Passport_Scan.pdf', size: '—', status: 'pending' },
            { name: 'Skills_Assessment_Letter.pdf', size: '—', status: 'pending' },
          ].map((doc, i) => (
            <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              doc.status === 'verified' ? 'bg-warm-grey' : 'border border-dashed border-forest/15 bg-off-white'
            }`}>
              <div className={`w-6 h-6 rounded flex items-center justify-center text-xs flex-shrink-0 ${
                doc.status === 'verified' ? 'bg-emerald-tint text-emerald' : 'bg-warm-grey text-forest/25'
              }`}>
                {doc.status === 'verified' ? '✓' : '↑'}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs truncate ${doc.status === 'verified' ? 'text-forest/70' : 'text-forest/30'}`}>{doc.name}</p>
              </div>
              <span className={`text-xs flex-shrink-0 ${doc.status === 'verified' ? 'text-forest/30' : 'text-forest/20'}`}>{doc.size}</span>
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
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="text-forest/40 text-sm font-medium mb-3">{f.tag}</p>
                <h3 className="text-3xl font-bold text-forest mb-4 leading-tight font-display">{f.title}</h3>
                <p className="text-forest/55 text-base leading-relaxed mb-6">{f.desc}</p>
                <ul className="space-y-2.5">
                  {f.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3 text-forest/60 text-sm">
                      <span className="text-emerald flex-shrink-0 mt-0.5 leading-none">–</span>
                      {point}
                    </li>
                  ))}
                </ul>
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
