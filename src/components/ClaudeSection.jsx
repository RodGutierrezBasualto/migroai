import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FULL_RESPONSE = "Based on Maria's Migro assessment: Police clearance (NBI) is missing — required for Subclass 186. Name mismatch between passport and AHPRA registration needs resolution. Visa pathway confidence: 88%. Two items need attention before lodgement."

function ClaudeChat() {
  const [phase, setPhase] = useState('idle')
  const [userText, setUserText] = useState('')
  const [responseText, setResponseText] = useState('')
  const [streamIndex, setStreamIndex] = useState(0)

  const USER_MSG = 'Is Maria Santos ready to lodge her 186?'

  useEffect(() => {
    let timers = []

    function run() {
      setPhase('idle')
      setUserText('')
      setResponseText('')
      setStreamIndex(0)

      timers.push(setTimeout(() => setPhase('typing'), 800))

      let charDelay = 1200
      USER_MSG.split('').forEach((_, i) => {
        timers.push(setTimeout(() => {
          setUserText(USER_MSG.slice(0, i + 1))
        }, charDelay + i * 38))
      })

      const doneTyping = charDelay + USER_MSG.length * 38 + 300
      timers.push(setTimeout(() => setPhase('loading'), doneTyping))
      timers.push(setTimeout(() => {
        setPhase('streaming')
        setStreamIndex(0)
      }, doneTyping + 1400))
    }

    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase !== 'streaming') return
    if (streamIndex >= FULL_RESPONSE.length) {
      const t = setTimeout(() => {
        setPhase('idle')
        setUserText('')
        setResponseText('')
        setStreamIndex(0)
        setTimeout(() => {
          setPhase('typing')
        }, 1200)
      }, 4000)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setResponseText(FULL_RESPONSE.slice(0, streamIndex + 1))
      setStreamIndex(i => i + 1)
    }, 22)
    return () => clearTimeout(t)
  }, [phase, streamIndex])

  return (
    <div className="rounded-xl overflow-hidden border border-warm-grey shadow-warm-md flex flex-col h-full">
      {/* Claude header */}
      <div
        className="px-4 py-3 flex items-center gap-2.5"
        style={{ background: 'linear-gradient(135deg, #d97706 0%, #7c3aed 100%)' }}
      >
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-white text-sm font-semibold">Claude</span>
        <span className="ml-auto text-white/50 text-xs">via Migro MCP</span>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-white p-4 space-y-3 overflow-hidden min-h-[220px] flex flex-col justify-end">

        <AnimatePresence>
          {userText && (
            <motion.div
              key="user-msg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="bg-forest text-white text-xs px-3 py-2 rounded-xl rounded-br-sm max-w-[80%] leading-relaxed">
                {userText}
                {phase === 'typing' && (
                  <span className="inline-block w-0.5 h-3 bg-white/60 ml-0.5 animate-pulse" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 px-3 py-2"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-purple-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {responseText && (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="text-xs px-3 py-2.5 rounded-xl rounded-bl-sm max-w-[85%] leading-relaxed border border-purple-100" style={{ background: '#f5f3ff', color: '#4c1d95' }}>
                {responseText}
                {phase === 'streaming' && streamIndex < FULL_RESPONSE.length && (
                  <span className="inline-block w-0.5 h-3 bg-purple-400 ml-0.5 animate-pulse" />
                )}
                {(phase === 'streaming' && streamIndex >= FULL_RESPONSE.length) || phase === 'idle' ? null : null}
                {phase !== 'streaming' && responseText === FULL_RESPONSE && (
                  <p className="text-purple-400/70 text-[10px] font-mono mt-2">↳ via Migro</p>
                )}
                {phase === 'streaming' && streamIndex >= FULL_RESPONSE.length && (
                  <p className="text-purple-400/70 text-[10px] font-mono mt-2">↳ via Migro</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function MigroDataCard() {
  return (
    <div className="rounded-xl border border-warm-grey bg-surface shadow-warm overflow-hidden h-full">
      <div className="px-4 py-3 border-b border-warm-grey flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#1a2b1a' }}>
          <svg width="11" height="11" viewBox="0 0 18 18" fill="none">
            <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.9"/>
            <path d="M9 4.5L13.5 9L9 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
        <span className="text-forest text-sm font-semibold">Migro</span>
        <span className="ml-auto text-forest/35 text-xs">Maria Santos</span>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="text-forest/40 text-[10px] uppercase tracking-wider mb-1.5">Visa Pathway</p>
          <div className="space-y-1.5">
            {[
              { label: '186 — Employer Nomination', pct: 88 },
              { label: '189 — Skilled Independent', pct: 76 },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-forest/50 text-xs w-36 flex-shrink-0">{item.label}</span>
                <div className="flex-1 h-1.5 bg-warm-grey rounded-full overflow-hidden">
                  <div className="h-full bg-emerald rounded-full" style={{ width: `${item.pct}%` }} />
                </div>
                <span className="text-emerald text-xs font-semibold w-8 text-right">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-forest/40 text-[10px] uppercase tracking-wider mb-1.5">Document flags</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-red-200 bg-red-50">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <span className="text-red-700 text-xs">Police clearance missing</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-amber-200 bg-amber-50">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              <span className="text-amber-700 text-xs">Name mismatch detected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClaudeSection() {
  return (
    <section className="py-24 bg-surface border-t border-warm-grey">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-forest/40 text-sm font-medium mb-3">The only Migration tool that connects to your AI agent</p>
            <h2 className="text-4xl font-bold text-forest font-display leading-tight mb-5">
              Ask Claude about<br />your cases.
            </h2>
            <p className="text-forest/55 text-base leading-relaxed">
              Migro connects directly to Claude. No dashboards to switch between, no copy-pasting — just answers from your own practice data on demand.
            </p>
          </motion.div>

          {/* Animation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
            style={{ minHeight: '320px' }}
          >
            <MigroDataCard />
            <ClaudeChat />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
