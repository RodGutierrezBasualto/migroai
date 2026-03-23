import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-forest">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.7"/>
                <path d="M9 4.5L13.5 9L9 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.7"/>
              </svg>
            </div>
            <span className="text-white/60 font-semibold text-base font-display">Migro</span>
          </div>

          {/* Tagline */}
          <p className="text-white/30 text-sm text-center">
            Intelligent Intake for Migration Agents. Made in Australia 🇦🇺
          </p>

          {/* Copyright */}
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Migro. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
