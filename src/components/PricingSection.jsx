import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    sub: 'Forever',
    desc: 'Try Migro with no commitment.',
    highlight: false,
    features: [
      '5 intakes/assessments per month',
      '1 embeddable widget',
      'Basic visa assessment',
      'Standard dashboard',
      '30-day data retention',
    ],
    cta: 'Get Started Free',
  },
  {
    name: 'Pro',
    price: '$99',
    sub: 'per month',
    desc: 'For solo agents ready to scale.',
    highlight: true,
    badge: 'Most Popular',
    features: [
      '25 intakes/assessments per month',
      'Unlimited widgets',
      'Full AI assessment with confidence scores',
      'Custom branding (logo + colours)',
      '90-day data retention',
      'Email support',
    ],
    cta: 'Join Waitlist',
  },
  {
    name: 'Team',
    price: '$249',
    sub: 'per month',
    desc: 'For growing firms with multiple agents.',
    highlight: false,
    features: [
      '75 intakes/assessments per month',
      'Up to 10 agent accounts',
      'Collaborative dashboard',
      'API access & CRM export',
      '180-day data retention',
      'Basic audit logging',
      'Priority support',
    ],
    cta: 'Join Waitlist',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    sub: 'contact us',
    desc: 'For large firms and multi-office operations.',
    highlight: false,
    features: [
      'Unlimited intakes & assessments',
      'Unlimited agent accounts',
      'Advanced analytics & reporting',
      'Custom data retention (up to 7 years)',
      'Comprehensive audit logging',
      'SSO & IP whitelisting',
      'Dedicated account manager',
    ],
    cta: 'Contact Us',
  },
]

export default function PricingSection() {
  return (
    <section className="relative py-24 bg-off-white border-t border-warm-grey" id="pricing">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-forest/40 text-sm font-medium uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl font-bold text-forest mb-4 font-display">Simple, transparent pricing.</h2>
          <p className="text-forest/55 text-base max-w-md mx-auto">
            Start free. Upgrade when you're ready. All prices in AUD, subject to change at launch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-xl p-6 flex flex-col ${
                plan.highlight
                  ? 'bg-emerald-tint border-2 border-emerald/35 shadow-warm-md'
                  : 'bg-surface border border-warm-grey shadow-warm'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-semibold text-white bg-emerald px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <p className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-emerald' : 'text-forest/50'}`}>{plan.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-bold text-forest font-display">{plan.price}</span>
                  <span className="text-forest/40 text-sm pb-1">{plan.sub}</span>
                </div>
                <p className="text-forest/45 text-xs">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-forest/60 text-xs">
                    <span className={`mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-emerald' : 'text-forest/30'}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`w-full text-center py-2.5 rounded-[6px] font-semibold text-sm transition-colors duration-200 ${
                  plan.highlight
                    ? 'bg-emerald hover:bg-emerald-hover text-white'
                    : 'border border-warm-grey hover:border-forest/20 text-forest/65 hover:text-forest bg-off-white'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center text-forest/30 text-xs mt-6"
        >
          All prices in AUD excl. GST · Annual billing available with 2 months free · Pricing subject to change at launch
        </motion.p>
      </div>
    </section>
  )
}
