import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const chatMessages = [
  { role: 'bot', text: "Welcome! I'm here to help assess your migration options to Australia. Let's start — what is your full name?" },
  { role: 'user', text: 'Maria Santos' },
  { role: 'bot', text: 'Nice to meet you, Maria. What is your current nationality and country of residence?' },
  { role: 'user', text: 'Filipino, currently living in Sydney on a bridging visa' },
  { role: 'bot', text: 'What is your occupation and how many years of experience do you have?' },
  { role: 'user', text: 'Registered nurse, 8 years in hospitals in Manila and 1 year in Sydney' },
  { role: 'bot', text: 'Do you have any relevant qualifications or skills assessments completed?' },
  { role: 'user', text: 'Bachelor of Nursing from UST. AHPRA registration is in progress.' },
  { role: 'bot', text: 'What is your English language proficiency? Do you have any test scores (IELTS, PTE, etc.)?' },
  { role: 'user', text: 'IELTS overall 7.5, with no band below 7' },
  { role: 'bot', text: 'Thank you, Maria! You can upload your IELTS results and any other relevant documents directly here.' },
  { role: 'user', type: 'file', text: 'IELTS_Results.pdf' },
  { role: 'user', type: 'file', text: 'Resume_MariaSantos.pdf' },
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

function FileMessage({ name }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-emerald rounded-xl rounded-tr-sm max-w-[80%]">
      <svg className="w-3.5 h-3.5 text-white/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
      </svg>
      <span className="text-white text-xs font-medium truncate max-w-[140px]">{name}</span>
    </div>
  )
}

function ChatWidget() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping] = useState(false)
  const [showAssessment, setShowAssessment] = useState(false)
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [visibleCount, typing, showAssessment])

  useEffect(() => {
    if (visibleCount < chatMessages.length) {
      const msg = chatMessages[visibleCount]
      const delay = visibleCount === 0 ? 800 : 700
      const t = setTimeout(() => {
        setTyping(true)
        const duration = msg.type === 'file' ? 600 : msg.text.length * 20 + 150
        setTimeout(() => {
          setTyping(false)
          setVisibleCount(v => v + 1)
        }, duration)
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
      <div
        ref={messagesRef}
        className="px-4 py-4 space-y-3 h-64 overflow-y-auto bg-surface"
        style={{ scrollbarWidth: 'none' }}
      >
        {chatMessages.slice(0, visibleCount).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.type === 'file' ? (
              <FileMessage name={msg.text} />
            ) : (
              <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald text-white font-medium rounded-tr-sm'
                  : 'bg-warm-grey text-forest rounded-tl-sm'
              }`}>
                {i === visibleCount - 1 && msg.role === 'bot' && !typing
                  ? <TypewriterText text={msg.text} />
                  : msg.text}
              </div>
            )}
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
                { label: 'Subclass 186', score: 88 },
                { label: 'Subclass 189', score: 76 },
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
          </motion.div>
        </div>

        {/* Full-width callout below both columns */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 rounded-xl border border-emerald/20 bg-emerald/5 p-5 text-center"
        >
          <p className="text-forest text-sm font-semibold leading-snug">Add your own branded AI intake chat to your website</p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {['Fully MARA-compliant', 'GDPR secure', 'Live in minutes'].map((tag, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-emerald text-xs font-medium">
                <span className="w-1 h-1 rounded-full bg-emerald" />{tag}
              </span>
            ))}
          </div>
          <p className="text-forest/60 text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
            Migro is a registered ASD Cyber Security Business Partner, receiving threat intelligence and advisories from Australia's national cyber security agency.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
