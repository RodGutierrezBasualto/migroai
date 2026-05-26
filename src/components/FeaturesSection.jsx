import { motion } from 'framer-motion'

const features = [
  {
    tag: 'Intake Agent',
    title: 'AI chat widget that interviews your clients before you do.',
    desc: 'Migro interviews prospective clients before they ever speak to you — collecting visa goals, personal details, and their migration situation automatically. You get a structured AI assessment with the key info in your dashboard before the first consultation.',
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
    tag: 'Document Analysis',
    title: '25 documents read simultaneously. Every issue cited.',
    desc: 'Our AI reads up to 25 documents simultaneously, cross-references them against the requirements of the nominated visa subclass, and flags what needs attention — expired certificates, missing evidence, inconsistencies — with the exact clause from the Migration Act or Regulations that applies.',
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
]

export default function FeaturesSection() {
  return (
    <section className="relative py-24 bg-off-white border-t border-warm-grey" id="features">
      <div className="max-w-6xl mx-auto px-6">
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
                <p className="text-forest/55 text-base leading-relaxed">{f.desc}</p>
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
