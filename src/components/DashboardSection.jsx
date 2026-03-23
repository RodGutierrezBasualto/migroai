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
  { name: 'AHPRA Registration', status: 'review' },
  { name: 'IELTS Certificate (7.5)', status: 'valid' },
]

function DashboardScreen({ visibleRows }) {
  return (
    <div className="p-5 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-forest text-base font-bold">Dashboard</h2>
        <p className="text-forest/40 text-xs mt-0.5">Coastal Migration — Intake submissions</p>
      </div>
      <div className="flex-1 bg-surface rounded-lg border border-warm-grey overflow-hidden">
        <div className="flex items-center px-4 py-2 border-b border-warm-grey">
          <span className="w-14 text-forest/35 text-xs flex-shrink-0">Date</span>
          <span className="w-28 text-forest/35 text-xs flex-shrink-0">Applicant</span>
          <span className="flex-1 text-forest/35 text-xs">Contact</span>
          <span className="w-44 text-forest/35 text-xs flex-shrink-0">Recommended Visa</span>
          <span className="w-20 text-forest/35 text-xs flex-shrink-0 text-right">Status</span>
        </div>
        {dashRows.slice(0, visibleRows).map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center px-4 py-3 border-b border-warm-grey/50 last:border-0"
          >
            <span className="w-14 text-forest/40 text-xs flex-shrink-0">{row.date}</span>
            <span className="w-28 text-forest text-xs font-medium flex-shrink-0">{row.name}</span>
            <span className="flex-1 text-forest/50 text-xs">{row.email}</span>
            <span className="w-44 text-forest/50 text-xs flex-shrink-0">{row.visa}</span>
            <span className="w-20 flex-shrink-0 flex items-center justify-end gap-1">
              {row.status === 'complete' ? (
                <span className="text-xs text-emerald font-medium">Complete</span>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-slow flex-shrink-0" />
                  <span className="text-xs text-amber-600 font-medium">In Progress</span>
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
                <span className="text-forest/50 text-xs w-40 flex-shrink-0">{item.label}</span>
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

function DocsScreen({ visibleCards, visibleDocRows }) {
  return (
    <div className="p-5 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-forest text-base font-bold">Documents</h2>
        <p className="text-forest/40 text-xs mt-0.5">Maria Santos</p>
      </div>
      <div className="flex gap-2 mb-4">
        {statCards.slice(0, visibleCards).map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 bg-surface rounded border border-warm-grey p-2 text-center min-w-0"
          >
            <p className={`text-sm font-bold ${card.color}`}>{card.count}</p>
            <p className="text-forest/40 text-[10px] leading-tight">{card.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex-1 bg-surface rounded-lg border border-warm-grey overflow-hidden">
        <div className="flex items-center px-4 py-2 border-b border-warm-grey">
          <span className="flex-1 text-forest/35 text-xs">Document</span>
          <span className="text-forest/35 text-xs">Status</span>
        </div>
        {docRows.slice(0, visibleDocRows).map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center px-4 py-2.5 border-b border-warm-grey/50 last:border-0"
          >
            <span className="flex-1 text-forest text-xs">{row.name}</span>
            <span className={`text-xs font-medium ${
              row.status === 'valid' ? 'text-emerald' :
              row.status === 'review' ? 'text-amber-600' : 'text-red-500'
            }`}>
              {row.status === 'valid' ? 'Valid' : row.status === 'review' ? 'Review' : 'Issue'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DashboardWidget() {
  const [screen, setScreen] = useState('dashboard')
  const [visibleRows, setVisibleRows] = useState(0)
  const [showAssessment, setShowAssessment] = useState(false)
  const [visibleCards, setVisibleCards] = useState(0)
  const [visibleDocRows, setVisibleDocRows] = useState(0)

  useEffect(() => {
    const timers = []

    if (screen === 'dashboard') {
      setVisibleRows(0)
      ;[0, 1, 2].forEach(i => {
        timers.push(setTimeout(() => setVisibleRows(i + 1), 500 + i * 400))
      })
      // hold after last row (500 + 2*400 = 1300ms for last row), then transition
      timers.push(setTimeout(() => setScreen('detail'), 500 + 2 * 400 + 2300))
    }

    if (screen === 'detail') {
      setShowAssessment(false)
      timers.push(setTimeout(() => setShowAssessment(true), 700))
      // bars finish at 700 + 200 (delay) + 800 (duration) = 1700ms, hold 2500ms
      timers.push(setTimeout(() => setScreen('docs'), 700 + 1000 + 2500))
    }

    if (screen === 'docs') {
      setVisibleCards(0)
      setVisibleDocRows(0)
      ;[0, 1, 2, 3, 4].forEach(i => {
        timers.push(setTimeout(() => setVisibleCards(i + 1), 300 + i * 220))
      })
      const docStart = 300 + 4 * 220 + 200
      ;[0, 1, 2, 3].forEach(i => {
        timers.push(setTimeout(() => setVisibleDocRows(i + 1), docStart + i * 280))
      })
      timers.push(setTimeout(() => setScreen('dashboard'), docStart + 3 * 280 + 2200))
    }

    return () => timers.forEach(clearTimeout)
  }, [screen])

  const navItems = [
    { label: 'Dashboard', active: screen === 'dashboard' || screen === 'detail' },
    { label: 'Documents', active: screen === 'docs' },
    { label: 'Chat Settings', active: false },
  ]

  return (
    <div className="w-full rounded-xl overflow-hidden border border-warm-grey shadow-warm-md flex" style={{ height: 340 }}>
      {/* Sidebar */}
      <div className="w-36 bg-forest flex flex-col flex-shrink-0">
        <div className="px-3 py-3.5 flex items-center gap-2 border-b border-white/10">
          <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white text-xs font-bold font-display flex-shrink-0">M</div>
          <span className="text-white text-xs font-semibold">Migro AI</span>
        </div>
        <div className="px-2 py-3 flex-1 space-y-0.5">
          <p className="text-white/25 text-[10px] px-2 mb-2 uppercase tracking-wider">Main</p>
          {navItems.map(item => (
            <div
              key={item.label}
              className={`px-2 py-1.5 rounded text-xs ${item.active ? 'bg-white/10 text-white' : 'text-white/40'}`}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="px-3 py-3 border-t border-white/10">
          <p className="text-white/25 text-[10px] truncate">agent@coastalmigration.com.au</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-off-white overflow-hidden relative">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="h-full"
        >
          {screen === 'dashboard' && <DashboardScreen visibleRows={visibleRows} />}
          {screen === 'detail' && <DetailScreen showAssessment={showAssessment} />}
          {screen === 'docs' && <DocsScreen visibleCards={visibleCards} visibleDocRows={visibleDocRows} />}
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
            Every intake, assessment, and document — organised automatically.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[640px]">
            <DashboardWidget />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
