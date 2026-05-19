import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SIGNUP_URL = 'https://app.migro.com.au/signup'

function getSecondsUntilMidnight() {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Sydney',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).formatToParts(now)
  const get = type => parseInt(parts.find(p => p.type === type)?.value ?? '0', 10)
  const elapsed = get('hour') * 3600 + get('minute') * 60 + get('second')
  return Math.max(0, 86400 - elapsed)
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function useCountdown() {
  const [total, setTotal] = useState(getSecondsUntilMidnight)

  useEffect(() => {
    const t = setInterval(() => setTotal(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    secs: total % 60,
    expired: total === 0,
  }
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function BadgeCheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function UnlockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 019.9-1" />
    </svg>
  )
}

function VideoModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(10,15,10,0.82)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-100 opacity-80"
          style={{ background: 'rgba(0,0,0,0.3)' }}
          aria-label="Close"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1 1l11 11M12 1L1 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div id="hero-video-embed" style={{ position: 'relative', paddingTop: '56.25%' }}>
          <iframe
            src="https://player.mediadelivery.net/embed/650182/8fda7481-9b31-4a0e-bd03-9a3e99a9ec7f?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
            loading="lazy"
            style={{ border: 0, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowFullScreen
            title="Migro product overview"
          />
        </div>

        <div className="px-6 py-6 text-center">
          <a
            href={SIGNUP_URL}
            className="block w-full py-4 px-6 rounded-lg font-sans font-bold text-xl text-white transition-opacity hover:opacity-90"
            style={{ background: '#1a2b1a' }}
          >
            Sign Up Free
          </a>
          <p className="mt-3 font-sans text-sm leading-relaxed" style={{ color: '#555555' }}>
            Create your free account and get your first month on Pro completely free. Worth $199.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FreemonthPage() {
  const [modalOpen, setModalOpen] = useState(true)
  const { hours, minutes, secs, expired } = useCountdown()

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">

      <AnimatePresence>
        {modalOpen && <VideoModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>

      {/* SECTION 1: HERO */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight mb-6 text-forest"
          >
            Migro, The first secure AI built for Australian migration agents.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-xl leading-relaxed mb-8"
            style={{ color: '#555555' }}
          >
            Analyse 25 documents in under two minutes. Fully MARA compliant.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href={SIGNUP_URL}
              className="block sm:inline-block w-full sm:w-auto py-4 px-10 rounded-lg font-sans font-semibold text-white text-lg transition-opacity hover:opacity-90"
              style={{ background: '#1a2b1a' }}
            >
              Sign Up Free – Get One Month Free
            </a>
            <p className="mt-4 font-sans text-sm" style={{ color: '#555555' }}>
              Use code <strong style={{ color: '#1a2b1a' }}>MIGRO_100_OFF</strong> at checkout. First month on Pro ($199 value) completely free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: URGENCY BANNER */}
      <div className="sticky top-0 z-30" style={{ background: '#fffbeb', borderBottom: '1px solid rgba(26,43,26,0.08)' }}>
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <p className="font-sans text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#1a2b1a', opacity: 0.5 }}>
              Offer Ends In
            </p>
            {expired ? (
              <p className="font-sans font-semibold text-sm sm:text-base" style={{ color: '#1a2b1a' }}>
                Offer extended until tomorrow, sign up now before it closes.
              </p>
            ) : (
              <div className="flex items-end gap-2">
                {[
                  { val: pad(hours), label: 'HRS' },
                  { val: ':', label: null },
                  { val: pad(minutes), label: 'MIN' },
                  { val: ':', label: null },
                  { val: pad(secs), label: 'SEC' },
                ].map((item, i) =>
                  item.label === null ? (
                    <span
                      key={i}
                      className="font-display font-bold text-3xl sm:text-4xl leading-none pb-4"
                      style={{ color: '#1a2b1a' }}
                    >:</span>
                  ) : (
                    <div key={i} className="flex flex-col items-center">
                      <span
                        className="font-display font-bold text-3xl sm:text-4xl leading-none"
                        style={{ color: '#1a2b1a' }}
                      >{item.val}</span>
                      <span
                        className="font-sans text-[10px] mt-1 font-semibold tracking-wider"
                        style={{ color: '#1a2b1a', opacity: 0.4 }}
                      >{item.label}</span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div className="max-w-xs text-center sm:text-right">
            <p className="font-sans text-sm sm:text-base font-medium" style={{ color: '#1a2b1a' }}>
              Free month offer ends tonight. Full Document Intelligence access, no commitment.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: TRUST SIGNALS */}
      <section className="py-16 px-6" style={{ background: '#f0fdf4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              {
                icon: <ShieldIcon />,
                label: 'Your data stays in Australia.',
                text: 'We use Australian servers and nothing is stored after your session ends.',
              },
              {
                icon: <BadgeCheckIcon />,
                label: 'Built for MARA compliance.',
                text: 'Designed from day one so you can use it with real client data.',
              },
              {
                icon: <UnlockIcon />,
                label: 'No lock-in.',
                text: 'Start free, upgrade when you are ready, cancel any time.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                <div className="mb-4 text-forest">{item.icon}</div>
                <p className="font-sans font-semibold text-base mb-2 text-forest">{item.label}</p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: '#555555' }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: MID-PAGE VIDEO */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="font-sans text-xs font-semibold uppercase tracking-widest mb-7"
              style={{ color: '#1a2b1a', opacity: 0.4 }}
            >
              See It In Action
            </p>
            <div
              id="demo-video-embed"
              className="mx-auto mb-7"
              style={{
                position: 'relative',
                paddingTop: '56.25%',
                maxWidth: '800px',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1.5px solid #1a2b1a',
              }}
            >
              <iframe
                src="https://player.mediadelivery.net/embed/650182/fe95e30b-9b25-4806-8187-05cce98fba4d?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
                loading="lazy"
                style={{ border: 0, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                allowFullScreen
                title="Migro document intelligence walkthrough"
              />
            </div>
            <p className="font-sans text-base mb-8" style={{ color: '#555555' }}>
              From upload to compliance report in under two minutes.
            </p>
            <a
              href={SIGNUP_URL}
              className="block sm:inline-block w-full sm:w-auto py-4 px-10 rounded-lg font-sans font-semibold text-white text-lg transition-opacity hover:opacity-90"
              style={{ background: '#1a2b1a' }}
            >
              Sign Up Free – Get One Month Free
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: PRICING CARDS */}
      <section className="py-16 px-6" style={{ background: '#f0fdf4' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-4xl text-forest mb-3">
              Simple, transparent pricing.
            </h2>
            <p className="font-sans text-base" style={{ color: '#555555' }}>
              Start free. Upgrade when you are ready.
            </p>
          </motion.div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:py-5 items-stretch max-w-2xl mx-auto w-full">

            {/* Starter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="order-2 sm:order-1 rounded-xl p-8 flex flex-col"
              style={{ background: '#f0fdf4', border: '1.5px solid #d1fae5' }}
            >
              <p className="font-display font-bold text-2xl text-forest mb-3">Starter</p>
              <p className="font-display font-bold text-5xl text-forest mb-1">Free</p>
              <p className="font-sans text-sm mb-7" style={{ color: '#555555' }}>10 free credits to get started.</p>
              <ul className="flex-1 space-y-3 mb-8">
                {['Try Document Intelligence', 'No time limit', 'No credit card required'].map(f => (
                  <li key={f} className="font-sans text-sm flex items-start gap-2.5" style={{ color: '#555555' }}>
                    <span className="mt-0.5 font-semibold" style={{ color: '#15803d' }}>–</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={SIGNUP_URL}
                className="block text-center py-3.5 px-4 rounded-lg font-sans font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: '#15803d' }}
              >
                Create Free Account
              </a>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="order-1 sm:order-2 rounded-xl relative overflow-hidden flex flex-col sm:-mt-5 sm:-mb-5 z-10"
              style={{ background: '#1a2b1a', boxShadow: '0 20px 60px rgba(26,43,26,0.3)' }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: 96, height: 96, overflow: 'hidden', pointerEvents: 'none' }}>
                <div style={{
                  position: 'absolute',
                  top: 18,
                  right: -28,
                  width: 130,
                  transform: 'rotate(45deg)',
                  background: '#fffbeb',
                  color: '#1a2b1a',
                  textAlign: 'center',
                  padding: '4px 0',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: 'DM Sans, sans-serif',
                  letterSpacing: '0.02em',
                }}>
                  1 Month Free
                </div>
              </div>

              <div className="px-7 py-10 flex flex-col flex-1">
                <p className="font-display font-bold text-2xl text-white mb-3">Pro</p>
                <div className="mb-1 flex items-baseline gap-1">
                  <span className="font-display font-bold text-4xl text-white/40 line-through">$199</span>
                  <span className="font-sans text-lg text-white/40 line-through">/month</span>
                </div>
                <p className="font-sans text-sm font-semibold mb-6" style={{ color: '#86efac' }}>
                  First month free with code MIGRO_100_OFF
                </p>
                <ul className="flex-1 space-y-3 mb-8">
                  {['Full Document Intelligence', 'PDF and Excel export', 'MARA compliant', 'GCP Sydney', 'Connect to Claude, n8n, Make, and Zapier', 'API access available on request'].map(f => (
                    <li key={f} className="font-sans text-sm flex items-start gap-2.5" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      <span className="mt-0.5 font-semibold" style={{ color: '#86efac' }}>–</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={SIGNUP_URL}
                  className="block text-center py-4 px-4 rounded-lg font-sans font-bold text-base transition-opacity hover:opacity-90 mb-3"
                  style={{ background: '#ffffff', color: '#1a2b1a' }}
                >
                  Claim Free Month
                </a>
                <p className="text-center font-sans text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Apply code MIGRO_100_OFF at checkout.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 6: PROMO CALLOUT */}
      <section className="py-20 px-6" style={{ background: '#1a2b1a' }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-5">
              Your first month is on us.
            </h2>
            <p className="font-sans text-base leading-relaxed mb-9" style={{ color: '#f0fdf4' }}>
              Sign up free, then apply code MIGRO_100_OFF at checkout to unlock a full month on the Pro plan. Full access, no commitment.
            </p>
            <a
              href={SIGNUP_URL}
              className="block sm:inline-block w-full sm:w-auto py-4 px-10 rounded-lg font-sans font-bold text-lg transition-opacity hover:opacity-90 mb-4"
              style={{ background: '#ffffff', color: '#1a2b1a' }}
            >
              Claim Your Free Month
            </a>
            <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Limited time offer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: FOOTER */}
      <footer style={{ background: '#1a2b1a', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.9" />
                <path d="M9 4.5L13.5 9L9 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span className="font-display font-semibold text-lg text-white">Migro</span>
          </div>
          <p className="font-sans text-sm text-center" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Built in Australia for Australian migration agents.
          </p>
          <a
            href="https://migro.com.au"
            className="font-sans text-sm transition-colors duration-200 hover:text-white"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            migro.com.au
          </a>
        </div>
      </footer>

    </div>
  )
}
