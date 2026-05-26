import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MSG1   = 'Tell me my new good leads and prepare a draft email for them please.'
const INTRO1 = 'Here are your 3 new good leads from the Intake Agent:'

const leads = [
  { initials: 'MS', name: 'Miguel Santibañes', email: 'miguelito@gostudy.com.au', visa: 'Subclass 482', fit: 'Strong fit',   flags: ['WHV 6-month per-employer limit — compliance risk'] },
  { initials: 'AP', name: 'Anika Patel',       email: 'anika.patel@gmail.com',    visa: 'Subclass 190', fit: 'Possible fit', flags: ['No skills assessment yet'] },
]

const MSG2       = 'Write an email to Anika to book a consultation'
const EMAIL_TEXT = "Subject: SC 190 Consultation. Hi Anika, following your intake assessment I'd love to schedule a 30-min call to discuss your visa pathway options. Are you available this week? — John"
const EMAIL_LABEL = '↳ Email drafted for Anika Patel'

const MSG3          = 'Can you analyse the docs for Miguel?'
const ANALYSIS_TEXT = "I found that Miguel's visa is expiring soon — we need to move fast. We also need a police check from Chile. I can see he lived there for more than 12 years, until about 4 years ago. This must be obtained before lodgement."

function LeadCard({ lead, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg p-2.5 mb-1.5"
          style={{ background: '#2a2a2a', border: '1px solid #3a3a3a' }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: '#3a3a3a', color: '#a0a0a0' }}>
              {lead.initials}
            </div>
            <div>
              <p className="text-white text-[11px] font-semibold leading-tight">{lead.name}</p>
              <p className="text-[10px]" style={{ color: '#6b6b6b' }}>{lead.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-1.5">
            <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: '#3a3a3a', color: '#9ca3af' }}>{lead.visa}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: '#3a3a3a', color: '#9ca3af' }}>{lead.fit}</span>
          </div>
          {lead.flags.length > 0 && (
            <div className="rounded px-2 py-1" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p className="text-[9px] flex items-center gap-1" style={{ color: '#f87171' }}>⚠ {lead.flags[0]}</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ClaudeChat() {
  const [user1, setUser1]           = useState('')
  const [showTool1, setShowTool1]   = useState(false)
  const [intro1, setIntro1]         = useState('')
  const [lead1Vis, setLead1Vis]     = useState(false)
  const [lead2Vis, setLead2Vis]     = useState(false)
  const [draftLabel, setDraftLabel] = useState(false)

  const [user2, setUser2]           = useState('')
  const [showTool2, setShowTool2]   = useState(false)
  const [emailText, setEmailText]   = useState('')
  const [emailLabel, setEmailLabel] = useState(false)

  const [user3, setUser3]               = useState('')
  const [showTool3, setShowTool3]       = useState(false)
  const [analysisText, setAnalysisText] = useState('')

  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [user1, intro1, lead1Vis, lead2Vis, draftLabel, user2, emailText, emailLabel, user3, analysisText])

  useEffect(() => {
    let timers = []
    let alive = true

    function schedule(fn, delay) {
      const id = setTimeout(() => { if (alive) fn() }, delay)
      timers.push(id)
    }

    function run() {
      timers.forEach(clearTimeout)
      timers = []

      setUser1(''); setShowTool1(false); setIntro1('')
      setLead1Vis(false); setLead2Vis(false); setDraftLabel(false)
      setUser2(''); setShowTool2(false); setEmailText(''); setEmailLabel(false)
      setUser3(''); setShowTool3(false); setAnalysisText('')

      const T = 30   // ms per typed char
      const S = 18   // ms per streamed char
      let t = 700

      // -- Exchange 1: leads --
      MSG1.split('').forEach((_, i) =>
        schedule(() => setUser1(MSG1.slice(0, i + 1)), t + i * T)
      )
      t += MSG1.length * T + 500
      schedule(() => setShowTool1(true), t); t += 700
      INTRO1.split('').forEach((_, i) =>
        schedule(() => setIntro1(INTRO1.slice(0, i + 1)), t + i * S)
      )
      t += INTRO1.length * S + 300
      schedule(() => setLead1Vis(true), t); t += 400
      schedule(() => setLead2Vis(true), t); t += 500
      schedule(() => setDraftLabel(true), t); t += 2400

      // -- Exchange 2: email --
      MSG2.split('').forEach((_, i) =>
        schedule(() => setUser2(MSG2.slice(0, i + 1)), t + i * T)
      )
      t += MSG2.length * T + 500
      schedule(() => setShowTool2(true), t); t += 700
      EMAIL_TEXT.split('').forEach((_, i) =>
        schedule(() => setEmailText(EMAIL_TEXT.slice(0, i + 1)), t + i * S)
      )
      t += EMAIL_TEXT.length * S + 300
      schedule(() => setEmailLabel(true), t); t += 2400

      // -- Exchange 3: doc analysis --
      MSG3.split('').forEach((_, i) =>
        schedule(() => setUser3(MSG3.slice(0, i + 1)), t + i * T)
      )
      t += MSG3.length * T + 500
      schedule(() => setShowTool3(true), t); t += 700
      ANALYSIS_TEXT.split('').forEach((_, i) =>
        schedule(() => setAnalysisText(ANALYSIS_TEXT.slice(0, i + 1)), t + i * S)
      )
      t += ANALYSIS_TEXT.length * S + 4500

      schedule(run, t)
    }

    run()
    return () => { alive = false; timers.forEach(clearTimeout) }
  }, [])

  const Cursor = () => <span className="inline-block w-0.5 h-3 bg-white/40 ml-0.5 animate-pulse align-middle" />
  const StreamCursor = () => <span className="inline-block w-0.5 h-3 bg-purple-400/70 ml-0.5 animate-pulse align-middle" />

  return (
    <div className="rounded-xl overflow-hidden flex flex-col h-full" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
      {/* Title bar */}
      <div className="px-4 py-2.5 flex items-center gap-2 flex-shrink-0 border-b" style={{ borderColor: '#2a2a2a' }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <span className="text-[11px] mx-auto" style={{ color: '#6b6b6b' }}>Claude — Migro</span>
      </div>

      {/* Scrollable chat */}
      <div
        ref={scrollRef}
        className="flex-1 px-3 py-3 overflow-y-auto flex flex-col justify-end gap-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* ── Exchange 1 ── */}
        {user1 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
            <div className="text-[11px] px-2.5 py-1.5 rounded-xl rounded-br-sm max-w-[85%] leading-relaxed" style={{ background: '#2a2a2a', color: '#e5e5e5' }}>
              {user1}{user1.length < MSG1.length && <Cursor />}
            </div>
          </motion.div>
        )}
        {showTool1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
            <span className="text-[10px]" style={{ color: '#6b6b6b' }}>↳ Loaded tools, used Migro integration</span>
            <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M9 5l3 3-3 3" stroke="#6b6b6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.div>
        )}
        {intro1 && (
          <p className="text-[11px] leading-relaxed" style={{ color: '#e5e5e5' }}>
            {intro1}{intro1.length < INTRO1.length && <StreamCursor />}
          </p>
        )}
        {(lead1Vis || lead2Vis) && (
          <div>
            <LeadCard lead={leads[0]} visible={lead1Vis} />
            <LeadCard lead={leads[1]} visible={lead2Vis} />
          </div>
        )}
        {draftLabel && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px]" style={{ color: '#6b6b6b' }}>
            {draftLabel && '↳ Draft emails ready — 2 prepared'}
          </motion.p>
        )}

        {/* ── Exchange 2 ── */}
        {user2 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
            <div className="text-[11px] px-2.5 py-1.5 rounded-xl rounded-br-sm max-w-[85%] leading-relaxed" style={{ background: '#2a2a2a', color: '#e5e5e5' }}>
              {user2}{user2.length < MSG2.length && <Cursor />}
            </div>
          </motion.div>
        )}
        {showTool2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
            <span className="text-[10px]" style={{ color: '#6b6b6b' }}>↳ Used Migro integration</span>
            <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M9 5l3 3-3 3" stroke="#6b6b6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.div>
        )}
        {emailText && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="text-[11px] px-2.5 py-2 rounded-xl rounded-bl-sm max-w-[90%] leading-relaxed border border-purple-900/30" style={{ background: '#1e1530', color: '#d4b8ff' }}>
              {emailText}{emailText.length < EMAIL_TEXT.length && <StreamCursor />}
            </div>
          </motion.div>
        )}
        {emailLabel && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px]" style={{ color: '#6b6b6b' }}>
            {EMAIL_LABEL}
          </motion.p>
        )}

        {/* ── Exchange 3 ── */}
        {user3 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
            <div className="text-[11px] px-2.5 py-1.5 rounded-xl rounded-br-sm max-w-[85%] leading-relaxed" style={{ background: '#2a2a2a', color: '#e5e5e5' }}>
              {user3}{user3.length < MSG3.length && <Cursor />}
            </div>
          </motion.div>
        )}
        {showTool3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
            <span className="text-[10px]" style={{ color: '#6b6b6b' }}>↳ Analysing documents via Migro</span>
            <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M9 5l3 3-3 3" stroke="#6b6b6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.div>
        )}
        {analysisText && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="text-[11px] px-2.5 py-2 rounded-xl rounded-bl-sm max-w-[90%] leading-relaxed border border-purple-900/30" style={{ background: '#1e1530', color: '#d4b8ff' }}>
              {analysisText}{analysisText.length < ANALYSIS_TEXT.length && <StreamCursor />}
            </div>
          </motion.div>
        )}

        {/* scroll anchor */}
        <div />
      </div>
    </div>
  )
}

function MigroDataCard() {
  return (
    <div className="rounded-xl border border-warm-grey bg-surface shadow-warm overflow-hidden h-full flex flex-col">
      <div className="px-4 py-3 border-b border-warm-grey flex items-center gap-2.5 flex-shrink-0">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#1a2b1a' }}>
          <svg width="11" height="11" viewBox="0 0 18 18" fill="none">
            <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.9"/>
            <path d="M9 4.5L13.5 9L9 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
        <span className="text-forest text-sm font-semibold">Migro</span>
        <span className="ml-auto text-forest/35 text-xs">Intake leads</span>
      </div>
      <div className="p-4 space-y-2 flex-1">
        {[
          { initials: 'MS', name: 'Miguel Santibañes', visa: 'SC 482', tag: 'Good lead', tagColor: 'text-emerald', tagBg: 'bg-emerald-tint' },
          { initials: 'AP', name: 'Anika Patel',       visa: 'SC 190', tag: 'Good lead', tagColor: 'text-emerald', tagBg: 'bg-emerald-tint' },
          { initials: 'JS', name: 'John Smith',         visa: 'SC 482', tag: 'Bad lead',  tagColor: 'text-red-600', tagBg: 'bg-red-50'       },
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
            style={{ height: 440 }}
          >
            <MigroDataCard />
            <ClaudeChat />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
