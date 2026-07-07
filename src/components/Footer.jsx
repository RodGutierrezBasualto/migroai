import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-forest">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.7"/>
                    <path d="M9 4.5L13.5 9L9 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.7"/>
                  </svg>
                </div>
                <span className="text-white/70 font-semibold text-base font-display">Migro</span>
              </div>
              <p className="text-white/30 text-xs leading-relaxed max-w-xs">
                AI-powered document intelligence for MARA-registered migration agents. Made in Australia.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-12">
              <div>
                <p className="text-white/25 text-xs uppercase tracking-widest mb-3">Product</p>
                <div className="space-y-2">
                  <Link to="/pricing" className="block text-white/50 hover:text-white text-sm transition-colors duration-200">Pricing</Link>
                  <a href="https://app.migro.com.au/signup" className="block text-white/50 hover:text-white text-sm transition-colors duration-200">Start free today</a>
                </div>
              </div>
              <div>
                <p className="text-white/25 text-xs uppercase tracking-widest mb-3">Company</p>
                <div className="space-y-2">
                  <Link to="/about" className="block text-white/50 hover:text-white text-sm transition-colors duration-200">About</Link>
                  <a href="mailto:info@migro.com.au" className="block text-white/50 hover:text-white text-sm transition-colors duration-200">Contact</a>
                </div>
              </div>
              <div>
                <p className="text-white/25 text-xs uppercase tracking-widest mb-3">Legal &amp; Security</p>
                <div className="space-y-2">
                  <a href="/#security" className="block text-white/50 hover:text-white text-sm transition-colors duration-200">Security</a>
                  <a href="https://cloudsecurityalliance.org/star/registry/migro" target="_blank" rel="noopener noreferrer" className="block text-white/50 hover:text-white text-sm transition-colors duration-200">CSA STAR Registry</a>
                  <a href="mailto:info@migro.com.au?subject=DPA%20request" className="block text-white/50 hover:text-white text-sm transition-colors duration-200">Request a DPA</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-xs">
              © {new Date().getFullYear()} Integrated Platforms Pty Ltd &nbsp;·&nbsp; ABN 69 693 247 513
            </p>
            <p className="text-white/20 text-xs text-center">
              Intelligent Intake for Migration Agents 🇦🇺
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
