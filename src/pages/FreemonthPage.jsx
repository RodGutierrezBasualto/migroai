import { motion } from 'framer-motion'

const SIGNUP_URL = 'https://app.migro.com.au/signup'

export default function FreemonthPage() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full text-center"
      >
        <div className="mb-8">
          <div className="w-12 h-12 rounded-xl mx-auto mb-6 flex items-center justify-center" style={{ background: '#1a2b1a' }}>
            <svg width="22" height="22" viewBox="0 0 18 18" fill="none">
              <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.9"/>
              <path d="M9 4.5L13.5 9L9 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <p className="font-sans text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#1a2b1a', opacity: 0.35 }}>
            Migro
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl leading-tight mb-5" style={{ color: '#1a2b1a' }}>
            This offer has expired.
          </h1>
          <p className="font-sans text-lg leading-relaxed" style={{ color: '#555555' }}>
            The free month promotion is no longer available. You can still create a free Starter account and try Migro with no credit card required.
          </p>
        </div>

        <a
          href={SIGNUP_URL}
          className="block w-full sm:w-auto sm:inline-block py-5 px-12 rounded-xl font-sans font-bold text-xl text-white transition-opacity hover:opacity-90"
          style={{ background: '#1a2b1a' }}
        >
          Create Your Free Account
        </a>
        <p className="mt-4 font-sans text-sm" style={{ color: '#555555', opacity: 0.6 }}>
          No credit card required.
        </p>
      </motion.div>
    </div>
  )
}
