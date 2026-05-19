import { useState } from 'react'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    priceNote: 'forever',
    badge: null,
    highlight: false,
    features: [
      '10 free credits to get started',
      'Document Intelligence',
      'Intake Agent',
      'All visa subclasses',
      '12-month dashboard history',
      '1 team member',
    ],
    cta: 'Get started free',
    ctaHref: 'https://app.migro.com.au/signup',
    ctaStyle: 'outline',
  },
  {
    name: 'Pro',
    price: 'AUD $199',
    priceNote: '/ month',
    badge: 'Most Popular',
    highlight: true,
    features: [
      'Document Intelligence',
      'Intake Agent',
      'All visa subclasses',
      '12-month dashboard history',
      'Data Processing Agreement',
      'MARA compliance report',
      'Connect to Claude, n8n, Make, and Zapier',
      'API access available on request',
      'Email support',
      '1 team member',
    ],
    cta: 'Start free today',
    ctaHref: 'https://app.migro.com.au/signup',
    ctaStyle: 'solid',
  },
]

const comparisonRows = [
  { feature: 'Monthly price',              starter: 'Free',        pro: '$199/mo' },
  { feature: 'Document Intelligence',      starter: '✓',           pro: '✓' },
  { feature: 'Intake Agent',               starter: '✓',           pro: '✓' },
  { feature: 'Visa subclasses',            starter: 'All',         pro: 'All' },
  { feature: 'Dashboard history',          starter: '12 months',   pro: '12 months' },
  { feature: 'Team members',               starter: '1',           pro: '1' },
  { feature: 'Data Processing Agreement',  starter: '—',           pro: '✓' },
  { feature: 'MARA compliance report',     starter: '—',           pro: '✓' },
  { feature: 'Connect to Claude, n8n, Make, Zapier', starter: '—', pro: '✓' },
  { feature: 'API access',                 starter: '—',           pro: 'On request' },
  { feature: 'Support',                    starter: '—',           pro: 'Email' },
]

const faqs = [
  {
    q: 'Can I change plans?',
    a: 'Yes, upgrade or downgrade any time from your account settings. Changes take effect at the next billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: 'The Starter plan is free forever. No credit card required to start.',
  },
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="bg-off-white pt-24">

      {/* Hero */}
      <section className="py-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow flex-shrink-0" />
            <span className="text-forest/50 text-sm">Transparent pricing</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-forest font-display leading-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-forest/55 text-lg max-w-xl mx-auto">
            Built for MARA-registered migration agents. Start free, scale as you grow.
          </p>
        </motion.div>
      </section>

      {/* Promo banner */}
      <section className="pb-2 px-6">
        <div className="max-w-4xl mx-auto px-5 py-3 bg-emerald-tint border border-emerald/20 rounded-lg text-center">
          <p className="text-emerald text-sm font-semibold">
            First 20 agents get their first month free — use code <span className="font-bold">MIGRO_100_OFF</span> at signup.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-20 px-6 pt-6">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`rounded-xl border p-6 flex flex-col ${
                plan.highlight
                  ? 'border-emerald bg-forest text-white shadow-lg'
                  : 'border-warm-grey bg-surface'
              }`}
            >
              {plan.badge && (
                <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                  plan.highlight ? 'bg-white/15 text-white' : 'bg-emerald-tint text-emerald'
                }`}>
                  {plan.badge}
                </span>
              )}
              {!plan.badge && <div className="mb-9" />}
              <p className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-white/60' : 'text-forest/50'}`}>{plan.name}</p>
              <div className="mb-1">
                <span className={`text-3xl font-bold ${plan.highlight ? 'text-white' : 'text-forest'}`}>{plan.price}</span>
              </div>
              <p className={`text-xs mb-6 ${plan.highlight ? 'text-white/40' : 'text-forest/35'}`}>{plan.priceNote}</p>
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-white/70' : 'text-emerald'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm leading-snug ${plan.highlight ? 'text-white/80' : 'text-forest/65'}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.ctaHref}
                className={`block text-center py-2.5 px-4 rounded-[6px] text-sm font-semibold transition-colors duration-200 ${
                  plan.highlight
                    ? 'bg-white text-forest hover:bg-off-white'
                    : 'border border-warm-grey text-forest hover:border-forest/30 bg-surface'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-forest mb-8">Full Feature Comparison</h2>
            <div className="rounded-xl border border-warm-grey overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead>
                  <tr className="border-b border-warm-grey">
                    <th className="px-5 py-4 text-left text-forest/40 text-xs font-medium w-48">Feature</th>
                    <th className="px-4 py-4 text-center text-forest/40 text-xs font-medium">Starter</th>
                    <th className="px-4 py-4 text-center text-xs font-medium bg-forest text-white">
                      <span className="block">Pro</span>
                      <span className="block text-white/50 text-[10px] font-normal">Most Popular</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={`border-b border-warm-grey/50 last:border-0 ${i % 2 === 1 ? 'bg-warm-grey/20' : ''}`}>
                      <td className="px-5 py-3 text-forest text-sm font-medium">{row.feature}</td>
                      <td className="px-4 py-3 text-center text-forest/55 text-sm">{row.starter}</td>
                      <td className="px-4 py-3 text-center text-forest/80 text-sm font-medium bg-emerald-tint/40">{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-forest mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-warm-grey rounded-lg overflow-hidden bg-surface">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-forest text-sm font-semibold">{faq.q}</span>
                    <svg
                      className={`w-4 h-4 text-forest/40 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-warm-grey">
                      <p className="text-forest/60 text-sm leading-relaxed pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="bg-forest rounded-xl px-8 py-12 text-center"
          >
            <h2 className="text-white text-3xl font-bold font-display mb-2">Start Free Today.</h2>
            <p className="text-white/55 text-lg mb-8">No credit card required.</p>
            <a
              href="https://app.migro.com.au/signup"
              className="inline-block px-8 py-3 rounded-[6px] bg-white text-forest font-semibold text-sm hover:bg-off-white transition-colors duration-200"
            >
              Start free today
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
