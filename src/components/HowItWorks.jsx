import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Embed on your site',
    desc: "Add a single line of code to your website. The Migro widget appears instantly — fully branded with your firm's logo and colours.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI qualifies and assesses',
    desc: 'Prospects chat with Migro 24/7. The AI gathers their details, runs a visa pathway assessment, flags red flags, and collects initial documents.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Review ready-to-action leads',
    desc: 'Your dashboard shows pre-assessed, pre-qualified leads with full profiles, documents, and confidence scores — ready for your expert review.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-24 bg-warm-grey border-t border-warm-grey" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-forest/40 text-sm font-medium uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-4xl font-bold text-forest mb-4 font-display">Live in minutes.<br />Saving hours from day one.</h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-9 left-0 right-0 h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-gradient-to-r from-transparent via-emerald/20 to-transparent origin-left"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 relative">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 z-10">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8h8M9 5l3 3-3 3" stroke="#2D6A2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4"/>
                    </svg>
                  </div>
                )}

                <div className="rounded-xl border border-warm-grey bg-surface p-6 h-full group hover:shadow-warm transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 rounded-full bg-emerald-tint border border-emerald/20 text-emerald flex items-center justify-center group-hover:bg-emerald/15 transition-colors duration-300">
                      {step.icon}
                    </div>
                    <span className="text-5xl font-bold text-emerald-tint font-display select-none">{step.number}</span>
                  </div>
                  <h3 className="text-forest font-semibold text-xl mb-3">{step.title}</h3>
                  <p className="text-forest/55 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
