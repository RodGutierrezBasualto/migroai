import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const dashRows = [
  { date: '19 Mar', name: 'Maria Santos', email: 'maria.santos@gmail.com', visa: '186 — Employer Nomination', status: 'complete' },
  { date: '19 Mar', name: 'James Chen', email: 'james.chen@outlook.com', visa: '189 — Skilled Independent', status: 'complete' },
  { date: '19 Mar', name: 'Priya Sharma', email: 'priya.sharma@yahoo.com', visa: '—', status: 'progress' },
]

const visaPathways = [
  { label: '186 — Employer Nomination', pct: 88 },
  { label: '189 — Skilled Independent', pct: 76 },
  { label: '482 — Temp Skill Shortage', pct: 54 },
]

const statCards = [
  { count: 8, label: 'Received', color: 'text-forest' },
  { count: 4, label: 'Issues', color: 'text-red-500' },
  { count: 2, label: 'Missing', color: 'text-red-400' },
  { count: 1, label: 'Review', color: 'text-amber-500' },
  { count: 2, label: 'All clear', color: 'text-emerald' },
]

const docRows = [
  { name: 'Passport', status: 'valid' },
  { name: 'Bachelor of Nursing (UST)', status: 'valid' },
  { name: 'AHPRA Registration', status: 'issue' },
  { name: 'IELTS Certificate (7.5)', status: 'valid' },
  { name: 'Police Check (Philippines)', status: 'missing' },
]

function DashboardScreen({ visibleRows }) {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-3">
        <h2 className="text-forest text-sm font-bold">Dashboard</h2>
        <p className="text-forest/40 text-xs mt-0.5">Coastal Migration — Intake submissions</p>
      </div>
      <div className="flex-1 bg-surface rounded-lg border border-warm-grey overflow-hidden">
        <div className="flex items-center px-3 py-2 border-b border-warm-grey">
          <span className="w-12 text-forest/35 text-xs flex-shrink-0">Date</span>
          <span className="flex-1 text-forest/35 text-xs">Applicant</span>
          <span className="hidden sm:block w-40 text-forest/35 text-xs flex-shrink-0">Visa</span>
          <span className="w-16 text-forest/35 text-xs flex-shrink-0 text-right">Status</span>
        </div>
        {dashRows.slice(0, visibleRows).map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center px-3 py-2.5 border-b border-warm-grey/50 last:border-0"
          >
            <span className="w-12 text-forest/40 text-xs flex-shrink-0">{row.date}</span>
            <div className="flex-1 min-w-0">
              <p className="text-forest text-xs font-medium truncate">{row.name}</p>
              <p className="text-forest/40 text-[10px] truncate hidden xs:block">{row.email}</p>
            </div>
            <span className="hidden sm:block w-40 text-forest/50 text-xs flex-shrink-0 truncate pr-2">{row.visa}</span>
            <span className="w-16 flex-shrink-0 flex items-center justify-end gap-1">
              {row.status === 'complete' ? (
                <span className="text-xs text-emerald font-medium">Complete</span>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-slow flex-shrink-0" />
                  <span className="text-xs text-amber-600 font-medium">Active</span>
                </>
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DetailScreen({ showAssessment }) {
  return (
    <div className="p-5 h-full overflow-y-auto">
      <p className="text-forest/40 text-xs mb-3">← Back to Dashboard</p>
      <h2 className="text-forest text-base font-bold mb-4">Maria Santos — 19 Mar 2026, 12:08 PM</h2>
      <div className="bg-surface rounded-lg border border-warm-grey p-3 mb-4">
        <p className="text-forest text-xs font-semibold mb-2">Contact Details</p>
        <div className="space-y-1">
          <p className="text-forest/55 text-xs">maria.santos@gmail.com</p>
          <p className="text-forest/55 text-xs">+61 412 345 678</p>
        </div>
      </div>
      {showAssessment && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-surface rounded-lg border border-warm-grey p-3"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-forest text-xs font-semibold">Pre-qualification Assessment</p>
            <span className="text-xs text-emerald font-medium bg-emerald-tint px-2 py-0.5 rounded">High Confidence</span>
          </div>
          <div className="space-y-2.5">
            {visaPathways.map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-forest/50 text-xs w-28 sm:w-40 flex-shrink-0">{item.label}</span>
                <div className="flex-1 h-1.5 bg-warm-grey rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-emerald rounded-full"
                  />
                </div>
                <span className="text-emerald text-xs font-semibold w-8 text-right">{item.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

const flags = [
  {
    level: 'error',
    title: 'Police clearance missing',
    detail: 'Philippines residency detected — NBI clearance required for Subclass 186 but not provided.',
  },
  {
    level: 'warning',
    title: 'Name mismatch across documents',
    detail: "Passport: 'Maria S. Santos' · AHPRA registration: 'Maria Soledad Santos'",
  },
]

function DocsScreen({ visibleCards, visibleDocRows, showFlags }) {
  return (
    <div className="p-4 h-full flex flex-col overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      <div className="mb-3">
        <h2 className="text-forest text-sm font-bold">Documents</h2>
        <p className="text-forest/40 text-xs mt-0.5">Maria Santos</p>
      </div>
      <div className="flex gap-1.5 mb-3">
        {statCards.slice(0, visibleCards).map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 bg-surface rounded border border-warm-grey p-1.5 text-center min-w-0"
          >
            <p className={`text-xs font-bold ${card.color}`}>{card.count}</p>
            <p className="text-forest/40 text-[9px] leading-tight">{card.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-surface rounded-lg border border-warm-grey overflow-hidden mb-3">
        <div className="flex items-center px-3 py-1.5 border-b border-warm-grey">
          <span className="flex-1 text-forest/35 text-xs">Document</span>
          <span className="text-forest/35 text-xs">Status</span>
        </div>
        {docRows.slice(0, visibleDocRows).map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center px-3 py-2 border-b border-warm-grey/50 last:border-0"
          >
            <span className="flex-1 text-forest text-xs">{row.name}</span>
            <span className={`text-xs font-medium ${
              row.status === 'valid'   ? 'text-emerald' :
              row.status === 'review' ? 'text-amber-600' :
              row.status === 'issue'  ? 'text-red-500' : 'text-red-400'
            }`}>
              {row.status === 'valid' ? 'Valid' : row.status === 'review' ? 'Review' : row.status === 'issue' ? 'Issue' : 'Missing'}
            </span>
          </motion.div>
        ))}
      </div>

      {showFlags && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-forest/40 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span className="text-forest/40 text-[10px] font-medium uppercase tracking-wider">AI cross-document analysis</span>
          </div>
          {flags.map((flag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.25 }}
              className={`rounded-lg border px-3 py-2 ${
                flag.level === 'error'
                  ? 'border-red-200 bg-red-50'
                  : 'border-amber-200 bg-amber-50'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${flag.level === 'error' ? 'bg-red-500' : 'bg-amber-500'}`} />
                <p className={`text-xs font-semibold ${flag.level === 'error' ? 'text-red-700' : 'text-amber-700'}`}>{flag.title}</p>
              </div>
              <p className={`text-[10px] leading-relaxed pl-3 ${flag.level === 'error' ? 'text-red-600/80' : 'text-amber-700/80'}`}>{flag.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

function DashboardWidget() {
  const [screen, setScreen] = useState('dashboard')
  const [visibleRows, setVisibleRows] = useState(0)
  const [showAssessment, setShowAssessment] = useState(false)
  const [visibleCards, setVisibleCards] = useState(0)
  const [visibleDocRows, setVisibleDocRows] = useState(0)
  const [showFlags, setShowFlags] = useState(false)

  useEffect(() => {
    const timers = []

    if (screen === 'dashboard') {
      setVisibleRows(0)
      ;[0, 1, 2].forEach(i => {
        timers.push(setTimeout(() => setVisibleRows(i + 1), 500 + i * 400))
      })
      timers.push(setTimeout(() => setScreen('detail'), 500 + 2 * 400 + 2300))
    }

    if (screen === 'detail') {
      setShowAssessment(false)
      timers.push(setTimeout(() => setShowAssessment(true), 700))
      timers.push(setTimeout(() => setScreen('docs'), 700 + 1000 + 2500))
    }

    if (screen === 'docs') {
      setVisibleCards(0)
      setVisibleDocRows(0)
      setShowFlags(false)
      ;[0, 1, 2, 3, 4].forEach(i => {
        timers.push(setTimeout(() => setVisibleCards(i + 1), 300 + i * 200))
      })
      const docStart = 300 + 4 * 200 + 200
      ;[0, 1, 2, 3, 4].forEach(i => {
        timers.push(setTimeout(() => setVisibleDocRows(i + 1), docStart + i * 250))
      })
      const flagsAt = docStart + 4 * 250 + 500
      timers.push(setTimeout(() => setShowFlags(true), flagsAt))
      // hold long enough to read both flags (2 × 0.25s delay + read time)
      timers.push(setTimeout(() => setScreen('dashboard'), flagsAt + 3500))
    }

    return () => timers.forEach(clearTimeout)
  }, [screen])

  const navItems = [
    { label: 'Dashboard', active: screen === 'dashboard' || screen === 'detail' },
    { label: 'Documents', active: screen === 'docs' },
    { label: 'Chat Settings', active: false },
  ]

  return (
    <div className="w-full aspect-square rounded-xl overflow-hidden border border-warm-grey shadow-warm-md flex">
      {/* Sidebar */}
      <div className="w-10 sm:w-36 bg-forest flex flex-col flex-shrink-0">
        <div className="px-2 sm:px-3 py-3.5 flex items-center gap-2 border-b border-white/10">
          <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white text-xs font-bold font-display flex-shrink-0">M</div>
          <span className="hidden sm:block text-white text-xs font-semibold">Migro AI</span>
        </div>
        <div className="px-1 sm:px-2 py-3 flex-1 space-y-0.5">
          <p className="hidden sm:block text-white/25 text-[10px] px-2 mb-2 uppercase tracking-wider">Main</p>
          {navItems.map(item => (
            <div
              key={item.label}
              className={`px-1 sm:px-2 py-1.5 rounded ${item.active ? 'bg-white/10 text-white' : 'text-white/45'}`}
            >
              <span className="hidden sm:block text-xs">{item.label}</span>
              <span className={`sm:hidden block w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${item.active ? 'bg-white/60' : 'bg-white/20'}`} />
            </div>
          ))}
        </div>
        <div className="hidden sm:block px-3 py-3 border-t border-white/10">
          <p className="text-white/25 text-[10px] truncate">agent@coastalmigration.com.au</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-off-white overflow-hidden relative min-w-0">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="h-full"
        >
          {screen === 'dashboard' && <DashboardScreen visibleRows={visibleRows} />}
          {screen === 'detail' && <DetailScreen showAssessment={showAssessment} />}
          {screen === 'docs' && <DocsScreen visibleCards={visibleCards} visibleDocRows={visibleDocRows} showFlags={showFlags} />}
        </motion.div>
      </div>
    </div>
  )
}

export default function DashboardSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow flex-shrink-0" />
            <span className="text-forest/50 text-sm">For migration agents</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-forest font-display mb-4 leading-tight">
            Your entire practice,<br />in one view.
          </h2>
          <p className="text-forest/55 text-lg">
            Every intake, assessment, and document — organised automatically. Cross-document inconsistencies caught before they become problems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-xl mx-auto"
        >
          <DashboardWidget />
        </motion.div>
      </div>
    </section>
  )
}
