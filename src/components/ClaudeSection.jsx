import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const USER_MSG = 'Tell me my new good leads and prepare a draft email for them please.'

const INTRO = 'Here are your 3 new good leads from the Intake Agent:'

const leads = [
  {
    initials: 'MS',
    name: 'Miguel Santibañes',
    email: 'miguelito@gostudy.com.au',
    visa: 'Subclass 482',
    fit: 'Strong fit',
    flags: ['WHV 6-month per-employer limit — compliance risk'],
  },
  {
    initials: 'AP',
    name: 'Anika Patel',
    email: 'anika.patel@gmail.com',
    visa: 'Subclass 190',
    fit: 'Possible fit',
    flags: ['No skills assessment yet'],
  },
]

const DRAFT_LABEL = '↳ Draft emails ready — 2 prepared'

function LeadCard({ lead, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg p-3 mb-2"
          style={{ background: '#2a2a2a', border: '1px solid #3a3a3a' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: '#3a3a3a', color: '#a0a0a0' }}>
              {lead.initials}
            </div>
            <div>
              <p className="text-white text-xs font-semibold leading-tight">{lead.name}</p>
              <p className="text-xs" style={{ color: '#6b6b6b' }}>{lead.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: '#3a3a3a', color: '#9ca3af' }}>{lead.visa}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: '#3a3a3a', color: '#9ca3af' }}>{lead.fit}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: '#3a3a3a', color: '#9ca3af' }}>Medium urgency</span>
          </div>
          {lead.flags.length > 0 && (
            <div className="rounded px-2 py-1.5" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              {lead.flags.map((f, i) => (
                <p key={i} className="text-[10px] flex items-center gap-1" style={{ color: '#f87171' }}>
                  <span>⚠</span>{f}
                </p>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ClaudeChat() {
  const [phase, setPhase] = useState('idle')
  const [userText, setUserText] = useState('')
  const [introText, setIntroText] = useState('')
  const [lead1Visible, setLead1Visible] = useState(false)
  const [lead2Visible, setLead2Visible] = useState(false)
  const [draftVisible, setDraftVisible] = useState(false)

  useEffect(() => {
    let timers = []

    function run() {
      setPhase('idle')
      setUserText('')
      setIntroText('')
      setLead1Visible(false)
      setLead2Visible(false)
      setDraftVisible(false)

      // Type user message
      timers.push(setTimeout(() => setPhase('typing'), 600))
      USER_MSG.split('').forEach((_, i) => {
        timers.push(setTimeout(() => setUserText(USER_MSG.slice(0, i + 1)), 700 + i * 32))
      })

      const afterUser = 700 + USER_MSG.length * 32 + 400

      // Tool use line
      timers.push(setTimeout(() => setPhase('tool'), afterUser))

      // Intro text streams
      timers.push(setTimeout(() => setPhase('streaming'), afterUser + 700))
      INTRO.split('').forEach((_, i) => {
        timers.push(setTimeout(() => setIntroText(INTRO.slice(0, i + 1)), afterUser + 800 + i * 28))
      })

      const afterIntro = afterUser + 800 + INTRO.length * 28 + 300

      // Lead cards appear
      timers.push(setTimeout(() => setLead1Visible(true), afterIntro))
      timers.push(setTimeout(() => setLead2Visible(true), afterIntro + 500))
      timers.push(setTimeout(() => setDraftVisible(true), afterIntro + 1100))

      // Loop
      timers.push(setTimeout(() => {
        run()
      }, afterIntro + 1100 + 5000))
    }

    run()
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="rounded-xl overflow-hidden flex flex-col h-full" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
      {/* Title bar */}
      <div className="px-4 py-2.5 flex items-center gap-2 border-b" style={{ borderColor: '#2a2a2a' }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <span className="text-xs mx-auto" style={{ color: '#6b6b6b' }}>Good leads from Migro</span>
      </div>

      {/* Chat */}
      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto flex flex-col justify-end" style={{ scrollbarWidth: 'none' }}>

        {/* User message */}
        <AnimatePresence>
          {userText && (
            <motion.div
              key="user"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="text-xs px-3 py-2 rounded-xl rounded-br-sm max-w-[85%] leading-relaxed" style={{ background: '#2a2a2a', color: '#e5e5e5' }}>
                {userText}
                {phase === 'typing' && <span className="inline-block w-0.5 h-3 bg-white/40 ml-0.5 animate-pulse" />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tool use */}
        <AnimatePresence>
          {(phase === 'tool' || phase === 'streaming' || lead1Visible) && (
            <motion.div
              key="tool"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5"
            >
              <span className="text-[10px]" style={{ color: '#6b6b6b' }}>Loaded tools, used Migro integration</span>
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M9 5l3 3-3 3" stroke="#6b6b6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Intro text */}
        {introText && (
          <p className="text-sm" style={{ color: '#e5e5e5' }}>
            {introText}
            {phase === 'streaming' && introText.length < INTRO.length && (
              <span className="inline-block w-0.5 h-3.5 bg-white/40 ml-0.5 animate-pulse" />
            )}
          </p>
        )}

        {/* Lead cards */}
        <div>
          <LeadCard lead={leads[0]} visible={lead1Visible} />
          <LeadCard lead={leads[1]} visible={lead2Visible} />
        </div>

        {/* Draft label */}
        <AnimatePresence>
          {draftVisible && (
            <motion.p
              key="draft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px]"
              style={{ color: '#6b6b6b' }}
            >
              {DRAFT_LABEL}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function MigroDataCard() {
  return (
    <div className="rounded-xl border border-warm-grey bg-surface shadow-warm overflow-hidden h-full flex flex-col">
      <div className="px-4 py-3 border-b border-warm-grey flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#1a2b1a' }}>
          <svg width="11" height="11" viewBox="0 0 18 18" fill="none">
            <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.9"/>
            <path d="M9 4.5L13.5 9L9 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
        <span className="text-forest text-sm font-semibold">Migro</span>
        <span className="ml-auto text-forest/35 text-xs">Intake leads</span>
      </div>
      <div className="p-4 space-y-2">
        {[
          { initials: 'MS', name: 'Miguel Santibañes', visa: 'SC 482', tag: 'Good lead', tagColor: 'text-emerald', tagBg: 'bg-emerald-tint' },
          { initials: 'AP', name: 'Anika Patel', visa: 'SC 190', tag: 'Good lead', tagColor: 'text-emerald', tagBg: 'bg-emerald-tint' },
          { initials: 'JS', name: 'John Smith', visa: 'SC 482', tag: 'Bad lead', tagColor: 'text-red-600', tagBg: 'bg-red-50' },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-warm-grey/50">
            <div className="w-6 h-6 rounded-full bg-emerald-tint text-emerald flex items-center justify-center text-[10px] font-bold flex-shrink-0">
              {row.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-forest text-xs font-medium truncate">{row.name}</p>
              <p className="text-forest/40 text-[10px]">{row.visa}</p>
            </div>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${row.tagBg} ${row.tagColor}`}>{row.tag}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow flex-shrink-0" />
          <span className="text-forest/40 text-[10px]">3 new leads this week</span>
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
          style={{ height: 380 }}
          >
            <MigroDataCard />
            <ClaudeChat />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
