import { motion } from 'framer-motion'

export default function WaitlistSection() {
  return (
    <section className="relative py-28 bg-forest overflow-hidden" id="signup">
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse-slow flex-shrink-0" />
            <span className="text-white/50 text-sm">Available now</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight font-display">
            Sign up today.
          </h2>
          <p className="text-white/55 text-lg mb-10 max-w-lg mx-auto">
            Your first client intake in under two minutes. No complex setup, no lock-in, just a smarter way to run your practice.
          </p>

          <a
            href="https://app.migro.com.au/signup"
            className="inline-block px-8 py-4 rounded-[6px] bg-white hover:bg-off-white text-forest font-semibold text-sm transition-colors duration-200"
          >
            Get started free →
          </a>

          <p className="text-white/25 text-xs mt-6">Client documents stay in the Google Cloud Sydney region. Designed for the MARA Code of Conduct.</p>
        </motion.div>
      </div>
    </section>
  )
}
