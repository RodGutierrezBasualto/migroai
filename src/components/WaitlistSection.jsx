import { useState } from 'react'
import { motion } from 'framer-motion'

export default function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${import.meta.env.VITE_HS_PORTAL_ID}/${import.meta.env.VITE_HS_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [{ objectTypeId: '0-1', name: 'email', value: email }],
            context: { pageUri: 'https://migro.com.au', pageName: 'Migro Waitlist' },
          }),
        }
      )
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-28 bg-forest overflow-hidden" id="waitlist">
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse-slow flex-shrink-0" />
            <span className="text-white/50 text-sm">Early access · Limited spots</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight font-display">
            Be first to transform<br />your practice.
          </h2>
          <p className="text-white/55 text-lg mb-10 max-w-lg mx-auto">
            Join the waitlist and get early access, founding member pricing, and a direct line to shape the product before launch.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@yourfirm.com.au"
                required
                className="flex-1 px-4 py-3 rounded-[6px] bg-white/10 border border-white/15 text-white placeholder-white/35 text-sm focus:outline-none focus:border-white/30 focus:bg-white/15 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-[6px] bg-white hover:bg-off-white disabled:opacity-70 text-forest font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Joining...
                  </span>
                ) : 'Join Waitlist'}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white/10 border border-white/20"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-tint flex items-center justify-center text-forest font-bold text-sm">✓</div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">You're on the list!</p>
                <p className="text-white/50 text-xs">We'll reach out as soon as early access opens.</p>
              </div>
            </motion.div>
          )}

          {error && (
            <p className="text-red-400/80 text-xs mt-3">Something went wrong — please try again.</p>
          )}
          <p className="text-white/25 text-xs mt-5">No spam. Unsubscribe anytime. We respect your privacy.</p>
        </motion.div>
      </div>
    </section>
  )
}
