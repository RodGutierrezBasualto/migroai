import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const chatMessages = [
  { role: 'bot', text: 'Hi! I\'m Migro. What brings you here today?' },
  { role: 'user', text: 'I want to migrate to Australia permanently.' },
  { role: 'bot', text: 'Great! Do you have a skills assessment completed?' },
  { role: 'user', text: 'Yes, from Engineers Australia.' },
  { role: 'bot', text: 'Excellent. Assessing visa pathways...' },
]

function TypewriterText({ text, onDone }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        if (onDone) setTimeout(onDone, 600)
      }
    }, 28)
    return () => clearInterval(interval)
  }, [text])

  return <span>{displayed}</span>
}

function ChatWidget() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping] = useState(false)
  const [showAssessment, setShowAssessment] = useState(false)

  useEffect(() => {
    if (visibleCount < chatMessages.length) {
      const delay = visibleCount === 0 ? 800 : 900
      const t = setTimeout(() => {
        setTyping(true)
        setTimeout(() => {
          setTyping(false)
          setVisibleCount(v => v + 1)
        }, chatMessages[visibleCount].text.length * 28 + 200)
      }, delay)
      return () => clearTimeout(t)
    } else {
      setTimeout(() => setShowAssessment(true), 600)
    }
  }, [visibleCount])

  return (
    <div className="w-full max-w-sm mx-auto rounded-xl overflow-hidden border border-warm-grey bg-surface shadow-warm-md">
      {/* Widget header */}
      <div className="px-4 py-3 bg-warm-grey border-b border-warm-grey flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center text-xs font-bold text-white font-display">M</div>
        <div>
          <p className="text-forest text-sm font-semibold">Migro Assistant</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow"></span>
            <span className="text-emerald text-xs font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 space-y-3 min-h-[220px] bg-surface">
        {chatMessages.slice(0, visibleCount).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-emerald text-white font-medium rounded-tr-sm'
                : 'bg-warm-grey text-forest rounded-tl-sm'
            }`}>
              {i === visibleCount - 1 && msg.role === 'bot' && !typing
                ? <TypewriterText text={msg.text} />
                : msg.text}
            </div>
          </motion.div>
        ))}

        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="px-3 py-2.5 rounded-xl rounded-tl-sm bg-warm-grey flex gap-1">
              {[0, 1, 2].map(i => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-forest/30 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </motion.div>
        )}

        {showAssessment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-2 rounded-lg border border-warm-grey bg-emerald-tint p-3"
          >
            <p className="text-forest/50 text-xs font-medium mb-2">Assessment ready</p>
            <div className="space-y-1.5">
              {[
                { label: 'Subclass 189', score: 87 },
                { label: 'Subclass 190', score: 74 },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-forest/60 text-xs w-24">{item.label}</span>
                  <div className="flex-1 h-1.5 bg-warm-grey rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-emerald rounded-full"
                    />
                  </div>
                  <span className="text-emerald text-xs font-semibold">{item.score}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-off-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow flex-shrink-0" />
              <span className="text-forest/50 text-sm">Coming soon · Built for MARA-registered agents</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-forest font-display"
            >
              Intelligent Intake<br />
              <span className="text-emerald">for Migration Agents.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-forest/60 text-lg leading-relaxed mb-8 max-w-md"
            >
              Migro gives every MARA agent their own AI-powered intake assistant — qualifying leads, collecting documents, and assessing visa pathways before you pick up the phone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#waitlist"
                className="px-6 py-3 rounded-[6px] bg-emerald hover:bg-emerald-hover text-white font-semibold text-sm transition-colors duration-200"
              >
                Join the Waitlist
              </a>
              <a
                href="#how-it-works"
                className="px-6 py-3 rounded-[6px] border border-warm-grey hover:border-forest/20 text-forest/60 hover:text-forest font-medium text-sm transition-colors duration-200 bg-surface"
              >
                See how it works ↓
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-warm-grey"
            >
              {[
                'Built for MARA agents',
                'GDPR + Privacy Act compliant',
                'Australian data residency',
              ].map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald" />
                  <span className="text-forest/50 text-xs font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Framed Chat Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            {/* Label above widget */}
            <p className="text-center text-forest/35 text-xs mb-1">This is what your clients see</p>

            <ChatWidget />

            {/* Callout below widget */}
            <div className="px-2 pt-1">
              <p className="text-forest/55 text-sm font-medium">Add your own branded AI intake chat to your website</p>
              <p className="text-forest/35 text-xs mt-0.5">Fully MARA-compliant · GDPR secure · Live in minutes</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
