import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const intakeRows = [
  { date: '23 May', name: 'Rodrigo Gutierrez', contact: 'coopercine@gmail.com',     visa: 'SC 190 — Skilled Nominated', reviewed: true,  quality: 'good' },
  { date: '22 May', name: 'John Smith',         contact: 'smittyjon@gmail.com',      visa: 'SC 482 — Skills in Demand',   reviewed: true,  quality: 'bad'  },
  { date: '21 May', name: 'Miguel Santibañes',  contact: 'rodrigo@gostudy.com.au',   visa: 'SC 482 — Temp Skill Shortage', reviewed: true,  quality: 'good' },
  { date: '20 May', name: 'Anika Patel',        contact: 'anika.patel@gmail.com',    visa: 'SC 186 — Employer Nomination', reviewed: false, quality: null   },
]

const navItems = [
  {
    label: 'Clients',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Intake Chat',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    label: 'Documents',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    label: 'Migro AI',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    badge: 'BETA',
  },
]

function DashboardWidget() {
  const [visibleRows, setVisibleRows] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    setVisibleRows(0)
    const timers = []
    intakeRows.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleRows(i + 1), 400 + i * 380))
    })
    timers.push(setTimeout(() => {
      setCycle(c => c + 1)
    }, 400 + intakeRows.length * 380 + 3000))
    return () => timers.forEach(clearTimeout)
  }, [cycle])

  return (
    <div className="w-full rounded-xl overflow-hidden border border-warm-grey shadow-warm-md flex" style={{ minHeight: 320 }}>
      {/* Sidebar */}
      <div className="w-10 sm:w-44 bg-white border-r border-warm-grey flex flex-col flex-shrink-0">
        <div className="px-3 py-3.5 border-b border-warm-grey">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-forest flex items-center justify-center flex-shrink-0">
              <svg width="11" height="11" viewBox="0 0 18 18" fill="none">
                <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.9"/>
                <path d="M9 4.5L13.5 9L9 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="text-forest text-sm font-semibold font-display">Migro</span>
          </div>
          <div className="sm:hidden w-6 h-6 rounded-lg bg-forest flex items-center justify-center mx-auto">
            <svg width="11" height="11" viewBox="0 0 18 18" fill="none">
              <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.9"/>
              <path d="M9 4.5L13.5 9L9 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
        </div>
        <nav className="px-1 sm:px-2 py-3 flex-1 space-y-0.5">
          {navItems.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 px-1 sm:px-2.5 py-2 rounded-lg ${i === 0 ? 'bg-emerald-tint text-emerald' : 'text-forest/40 hover:text-forest/70'}`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="hidden sm:block text-xs font-medium">{item.label}</span>
              {item.badge && (
                <span className="hidden sm:block ml-auto text-[9px] font-bold px-1 py-0.5 rounded" style={{ background: '#E8F2E8', color: '#2D6A2D' }}>{item.badge}</span>
              )}
            </div>
          ))}
        </nav>
        <div className="hidden sm:block px-3 py-3 border-t border-warm-grey">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">M</div>
            <p className="text-forest/30 text-[10px] truncate">agent@coastalmigration</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-off-white overflow-hidden flex flex-col min-w-0">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-warm-grey bg-white">
          <h2 className="text-forest text-base font-bold mb-0.5">Clients</h2>
          <p className="text-forest/40 text-xs">Pre-qualified client enquiries from your intake form</p>
        </div>

        {/* Intake link banner */}
        <div className="mx-4 mt-3 mb-2 rounded-lg border border-warm-grey bg-surface px-3 py-2 flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-emerald-tint flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2D6A2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-forest/40 text-[9px] uppercase tracking-wider font-semibold">Your Intake Link</p>
            <p className="text-forest/60 text-[10px] truncate font-mono">https://app.migro.com.au/intake/john-doe</p>
          </div>
          <span className="hidden sm:block text-[10px] border border-warm-grey rounded px-2 py-1 text-forest/40 flex-shrink-0">Copy</span>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-hidden px-4 pb-4">
          <div className="rounded-lg border border-warm-grey bg-white overflow-hidden">
            <div className="flex items-center px-3 py-2 border-b border-warm-grey">
              <span className="w-14 text-forest/35 text-[10px] font-medium flex-shrink-0">Date</span>
              <span className="flex-1 text-forest/35 text-[10px] font-medium">Applicant</span>
              <span className="hidden sm:block w-32 text-forest/35 text-[10px] font-medium flex-shrink-0">Requested Visa</span>
              <span className="w-28 text-forest/35 text-[10px] font-medium text-right flex-shrink-0">Status / Quality</span>
            </div>
            {intakeRows.slice(0, visibleRows).map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center px-3 py-2.5 border-b border-warm-grey/60 last:border-0"
              >
                <span className="w-14 text-forest/40 text-[10px] flex-shrink-0">{row.date}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-forest text-xs font-semibold truncate">{row.name}</p>
                  <p className="text-forest/35 text-[10px] truncate hidden sm:block">{row.contact}</p>
                </div>
                <span className="hidden sm:block w-32 text-forest/50 text-[10px] flex-shrink-0 pr-2 truncate">{row.visa}</span>
                <div className="w-28 flex items-center justify-end gap-1.5 flex-shrink-0">
                  {row.reviewed && (
                    <span className="text-[10px] text-forest/40">Reviewed</span>
                  )}
                  {row.quality === 'good' && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: '#E8F2E8', color: '#2D6A2D' }}>Good lead</span>
                  )}
                  {row.quality === 'bad' && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: '#FEE2E2', color: '#DC2626' }}>Bad lead</span>
                  )}
                  {!row.reviewed && (
                    <span className="flex items-center gap-1 text-[10px] text-amber-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-slow flex-shrink-0" />
                      Active
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
          className="max-w-3xl mx-auto"
        >
          <DashboardWidget />
        </motion.div>
      </div>
    </section>
  )
}
