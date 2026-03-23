import { motion } from 'framer-motion'

const problems = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Hours lost on unqualified leads',
    desc: 'Up to 70% of inquiries never qualify. Agents spend 15–30 minutes per prospect only to discover they have no viable pathway.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6m-3-3v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Inconsistent intake, missed leads',
    desc: 'Manual notes are incomplete and hard to track. Promising leads fall through the cracks before a follow-up can happen.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: 'No time left for real casework',
    desc: 'Administrative burden at intake eats into billable hours, limiting growth and the quality of advice you can give paying clients.',
  },
]

export default function ProblemSection() {
  return (
    <section className="relative py-24 bg-warm-grey border-t border-warm-grey">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-forest/40 text-sm font-medium uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-4xl font-bold text-forest mb-4 font-display">The old way doesn't scale.</h2>
          <p className="text-forest/55 text-lg max-w-xl mx-auto">
            Manual intake is the silent bottleneck in every migration firm. And your competitors aren't standing still.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-warm-grey bg-surface p-6 shadow-warm hover:shadow-warm-md transition-shadow duration-300 group"
            >
              <div className="text-forest/30 mb-4">
                {p.icon}
              </div>
              <h3 className="text-forest font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-forest/55 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
