import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const uploadFiles = [
  { name: 'passport_scan_final.pdf',             type: 'Passport' },
  { name: 'payslip_jan.pdf',                     type: 'Payslip' },
  { name: 'payslip_feb.pdf',                     type: 'Payslip' },
  { name: 'employment_reference_letter.docx',    type: 'Employment letter' },
  { name: 'Vetasses_Assessment.pdf',             type: 'Skills assessment' },
  { name: 'pte_results.pdf',                     type: 'English test' },
  { name: 'police_check_australia.pdf',          type: 'Police check' },
  { name: 'final_final.pdf',                     type: 'Unclassified' },
  { name: 'health_exam_results.pdf',             type: 'Health assessment' },
  { name: 'student_visa_grant_letter.pdf',       type: 'Visa grant letter' },
  { name: 'bank_statement_personal.pdf',         type: 'Financials' },
  { name: 'travel_history_log_2015_2026.xlsx',   type: 'Travel history' },
]

const analysisMessages = [
  'Reading Vetasses_Assessment.pdf — checking expiry date…',
  'Cross-referencing travel history against residence periods…',
  'Detected a gap in travel_history_log_2015_2026.xlsx — investigating…',
  'final_final.pdf — document type unrecognised, attempting classification…',
  'bank_statement_personal.pdf — financials not required for this visa subclass…',
  'Matching police clearances against countries of residence…',
  'Canadian residence period identified — police check coverage check…',
  'Compiling compliance report…',
]

const statCards = [
  { count: 12, label: 'Total',   color: 'text-forest' },
  { count: 3,  label: 'Issues',  color: 'text-red-500' },
  { count: 0,  label: 'Review',  color: 'text-amber-500' },
  { count: 8,  label: 'Clear',   color: 'text-emerald' },
  { count: 2,  label: 'Missing', color: 'text-red-400' },
]

const docResults = [
  { name: 'Vetasses_Assessment.pdf',           type: 'Skills assessment',   status: 'issue', validUntil: '2025-08-26', issue: 'Expired. Valid until 2025-08-26, today is 15 Apr 2026.' },
  { name: 'travel_history_log_2015_2026.xlsx', type: 'Travel history',       status: 'issue', validUntil: '—',          issue: 'Gap detected 2022-04-10 to 2023-05-15 (1 year, 1 month).' },
  { name: 'passport_scan_final.pdf',           type: 'Passport',             status: 'issue', validUntil: '—',          issue: 'One listed passport number is explicitly marked EXPIRED.' },
  { name: 'bank_statement_personal.pdf',       type: 'Financials',           status: 'note',  validUntil: '—',          issue: 'Not required for this visa type — sent by mistake.' },
  { name: 'payslip_jan.pdf',                   type: 'Payslip',              status: 'valid', validUntil: '—',          issue: '' },
  { name: 'payslip_feb.pdf',                   type: 'Payslip',              status: 'valid', validUntil: '—',          issue: '' },
  { name: 'employment_reference_letter.docx',  type: 'Employment letter',    status: 'valid', validUntil: '—',          issue: '' },
  { name: 'pte_results.pdf',                   type: 'English test',         status: 'valid', validUntil: '2027-03-10', issue: '' },
  { name: 'police_check_australia.pdf',        type: 'Police check',         status: 'valid', validUntil: '2026-09-15', issue: '' },
  { name: 'final_final.pdf',                   type: 'Police check (Canada)', status: 'valid', validUntil: '2026-07-22', issue: 'Classified despite ambiguous filename.' },
  { name: 'health_exam_results.pdf',           type: 'Health assessment',    status: 'valid', validUntil: '2027-01-05', issue: '' },
  { name: 'student_visa_grant_letter.pdf',     type: 'Visa grant letter',    status: 'valid', validUntil: '—',          issue: '' },
]

const crossRefFlags = [
  { level: 'red',   text: 'Skills assessment (Vetasses_Assessment.pdf) expired 2025-08-26. Today is 15 Apr 2026.' },
  { level: 'red',   text: 'Passport number explicitly marked as expired in document.' },
  { level: 'red',   text: 'Travel history gap: 2022-04-10 to 2023-05-15 (1 year, 1 month, 5 days).' },
  { level: 'amber', text: 'bank_statement_personal.pdf — Financials not required for this visa subclass — sent by mistake.' },
  { level: 'amber', text: 'final_final.pdf — unrecognised filename, document classified as Canadian Police Check based on content.' },
]

const missingDocs = [
  'Updated Skills Assessment required — Vetasses_Assessment.pdf expired 8 months ago.',
  'Canadian Police Check (current) — required for cumulative Canadian residence exceeding 12 months.',
]

const demoChat = [
  { role: 'bot',  text: "Hi there! I'm here to help figure out your options for Australian visas. What's on your mind tonight?" },
  { role: 'user', text: "Hey, I want to know if I can sponsor my wife to come live with me here. I think it's a 482?" },
  { role: 'bot',  text: "Absolutely, let's look into that. Are you and your wife legally married, or are you in a de facto relationship?" },
  { role: 'user', text: "Married — just over 3 years now." },
  { role: 'bot',  text: "Great. And are you currently employed by an Australian business that holds approved sponsorship status?" },
  { role: 'user', text: "Yes, I'm a Software Engineer working in Sydney. My employer is definitely an approved sponsor." },
  { role: 'bot',  text: "Perfect. One last thing — does your wife have any Australian visa history, or any health or character matters I should flag?" },
  { role: 'user', text: "She was here on a student visa a few years ago and she's actually still on it now. No health issues at all." },
  { role: 'bot',  text: "Got it, that's really helpful. I've got everything I need. A migration agent will review this first thing Monday and reach out to book a time with you." },
]

const securityPillars = [
  { title: 'Australian Data Residency',  desc: 'All data processed and stored within Australia. No data ever leaves Australian jurisdiction.' },
  { title: 'Session-only Storage',       desc: 'No client data is retained after your session ends. Documents are never persisted.' },
  { title: 'MARA Code of Conduct',       desc: 'Built to meet the professional obligations of MARA-registered migration agents.' },
  { title: 'GDPR Standards Applied',     desc: 'GDPR principles applied for all client data, including offshore and international clients.' },
]

const exportLeads = [
  { date: '14 Apr 2026', name: 'Rodrigo Gutierrez', visa: '482 — Spouse Sponsorship',     status: 'Qualified' },
  { date: '12 Apr 2026', name: 'Maria Santos',       visa: '186 — Employer Nomination',    status: 'Qualified' },
  { date: '10 Apr 2026', name: 'James Chen',         visa: '189 — Skilled Independent',   status: 'Qualified' },
]

// ─── TypewriterText ────────────────────────────────────────────────────────────

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
        if (onDone) setTimeout(onDone, 500)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [text])
  return <span>{displayed}</span>
}

// ─── Phase 1: Document Intelligence ───────────────────────────────────────────

function Phase1() {
  const [step, setStep] = useState('upload')   // 'upload' | 'listing' | 'analysing' | 'results'
  const [visibleFiles, setVisibleFiles]     = useState(0)
  const [filesLocked, setFilesLocked]       = useState(false)
  const [analysisCount, setAnalysisCount]   = useState(0)
  const [visibleStats, setVisibleStats]     = useState(0)
  const [visibleRows, setVisibleRows]       = useState(0)
  const [showFlags, setShowFlags]           = useState(false)
  const [showMissing, setShowMissing]       = useState(false)
  const [exportDone, setExportDone]         = useState(false)
  const timers = useRef([])

  useEffect(() => () => { timers.current.forEach(clearTimeout) }, [])

  const add = (fn, delay) => {
    const t = setTimeout(fn, delay)
    timers.current.push(t)
  }

  const startUpload = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setStep('listing')
    setVisibleFiles(0); setFilesLocked(false); setAnalysisCount(0)
    setVisibleStats(0); setVisibleRows(0)
    setShowFlags(false); setShowMissing(false)

    // Files stagger in at 120ms each
    for (let i = 0; i < uploadFiles.length; i++) {
      add(() => setVisibleFiles(i + 1), 120 * (i + 1))
    }
    const lockAt = 120 * uploadFiles.length + 400
    add(() => setFilesLocked(true), lockAt)

    // Analysis messages at 1000ms each
    add(() => { setStep('analysing'); setAnalysisCount(1) }, lockAt + 700)
    for (let i = 1; i < analysisMessages.length; i++) {
      add(() => setAnalysisCount(i + 1), lockAt + 700 + i * 1000)
    }

    // Results after last message + 2s hold
    const resultsAt = lockAt + 700 + analysisMessages.length * 1000 + 2000
    add(() => setStep('results'), resultsAt)
    for (let i = 0; i < statCards.length; i++) {
      add(() => setVisibleStats(i + 1), resultsAt + 80 + i * 80)
    }
    const rowStart = resultsAt + 80 + statCards.length * 80 + 200
    for (let i = 0; i < docResults.length; i++) {
      add(() => setVisibleRows(i + 1), rowStart + i * 120)
    }
    const flagsAt = rowStart + docResults.length * 120 + 400
    add(() => setShowFlags(true), flagsAt)
    add(() => setShowMissing(true), flagsAt + 700)
  }

  const handleExport = () => {
    setExportDone(true)
    setTimeout(() => setExportDone(false), 2000)
  }

  // Upload zone
  if (step === 'upload') {
    return (
      <div className="flex items-center justify-center min-h-[440px]">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-warm-grey flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-forest/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <h3 className="text-forest text-lg font-semibold mb-2">Upload client documents</h3>
          <p className="text-forest/40 text-sm mb-8 leading-relaxed">All file types supported — PDFs, Word docs, Excel files, images. Everything in at once.</p>
          <button
            onClick={startUpload}
            className="px-6 py-3 rounded-[6px] bg-emerald hover:bg-emerald-hover text-white font-semibold text-sm transition-colors duration-200 inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
            </svg>
            Simulate Upload
          </button>
        </div>
      </div>
    )
  }

  // Listing + analysing
  if (step === 'listing' || step === 'analysing') {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow flex-shrink-0" />
          <h3 className="text-forest text-sm font-semibold">
            {step === 'listing' ? `Reading ${visibleFiles} of ${uploadFiles.length} files…` : 'AI analysis in progress…'}
          </h3>
        </div>

        {/* File list */}
        <div className="bg-surface border border-warm-grey rounded-xl overflow-hidden">
          {uploadFiles.slice(0, visibleFiles).map((file, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-3 px-4 py-2.5 border-b border-warm-grey/50 last:border-0"
            >
              <div className="flex-shrink-0 w-5 h-5">
                {filesLocked ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-tint flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-emerald/30 border-t-emerald animate-spin" />
                )}
              </div>
              <span className="text-forest text-xs font-mono flex-1 truncate">{file.name}</span>
              <span className="text-forest/35 text-xs flex-shrink-0">{filesLocked ? file.type : '…'}</span>
            </motion.div>
          ))}
          {visibleFiles < uploadFiles.length && (
            <div className="px-4 py-2.5 text-forest/25 text-xs italic">
              {uploadFiles.length - visibleFiles} more files…
            </div>
          )}
        </div>

        {/* Analysis panel */}
        {step === 'analysing' && analysisCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-forest rounded-xl p-5"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse-slow flex-shrink-0" />
              <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest">AI Analysis in progress</p>
            </div>
            <div className="space-y-2.5">
              {analysisMessages.slice(0, analysisCount).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2.5"
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${
                    i === analysisCount - 1 ? 'bg-emerald animate-pulse-slow' : 'bg-white/20'
                  }`} />
                  <p className={`text-xs font-mono leading-relaxed ${
                    i === analysisCount - 1 ? 'text-white' : 'text-white/35'
                  }`}>{msg}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    )
  }

  // Results
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-forest text-xl font-bold">Document Analysis</h2>
          <p className="text-forest/40 text-xs mt-0.5">Analysed 12 documents · Generated 15 Apr 2026 at 6:52 am</p>
        </div>
        <button className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-[6px] border border-warm-grey text-forest/55 hover:text-forest hover:border-forest/20 text-xs font-medium transition-colors duration-200">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Report
        </button>
      </div>

      {/* Stat cards */}
      <div className="flex gap-2">
        {statCards.slice(0, visibleStats).map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 bg-surface border border-warm-grey rounded-lg p-2.5 text-center min-w-0"
          >
            <p className={`text-lg font-bold leading-none mb-1 ${card.color}`}>{card.count}</p>
            <p className="text-forest/35 text-[10px] leading-tight">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Document table */}
      <div className="bg-surface border border-warm-grey rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[580px]">
          <thead>
            <tr className="border-b border-warm-grey">
              <th className="px-4 py-2.5 text-left text-forest/35 text-xs font-medium">Filename</th>
              <th className="px-4 py-2.5 text-left text-forest/35 text-xs font-medium hidden sm:table-cell">Type</th>
              <th className="px-4 py-2.5 text-left text-forest/35 text-xs font-medium">Status</th>
              <th className="px-4 py-2.5 text-left text-forest/35 text-xs font-medium hidden md:table-cell">Valid Until</th>
              <th className="px-4 py-2.5 text-left text-forest/35 text-xs font-medium">Issues</th>
            </tr>
          </thead>
          <tbody>
            {docResults.slice(0, visibleRows).map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                className="border-b border-warm-grey/50 last:border-0"
              >
                <td className="px-4 py-2.5 text-forest text-xs font-mono truncate max-w-[140px]">{row.name}</td>
                <td className="px-4 py-2.5 text-forest/50 text-xs hidden sm:table-cell">{row.type}</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${
                    row.status === 'issue' ? 'bg-red-50 text-red-600' :
                    row.status === 'note'  ? 'bg-amber-50 text-amber-700' :
                    'bg-emerald-tint text-emerald'
                  }`}>
                    {row.status === 'issue' ? 'Issue' : row.status === 'note' ? 'Note' : 'Valid'}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-forest/45 text-xs hidden md:table-cell">{row.validUntil}</td>
                <td className="px-4 py-2.5 text-xs max-w-[180px]">
                  {row.issue ? (
                    <span className={
                      row.status === 'issue' ? 'text-red-500' :
                      row.status === 'note'  ? 'text-amber-700' :
                      'text-forest/40'
                    }>{row.issue}</span>
                  ) : <span className="text-forest/20">—</span>}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cross-reference flags */}
      {showFlags && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-surface border border-warm-grey rounded-xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-warm-grey bg-warm-grey/30">
            <p className="text-forest text-sm font-semibold">Cross-Reference Flags</p>
          </div>
          <div className="divide-y divide-warm-grey/50">
            {crossRefFlags.map((flag, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
                className="flex items-start gap-3 px-4 py-3"
              >
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                  flag.level === 'red' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'
                }`}>
                  {flag.level === 'red' ? 'Red' : 'Amber'}
                </span>
                <p className="text-forest/60 text-xs leading-relaxed">{flag.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Missing documents */}
      {showMissing && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-surface border border-warm-grey rounded-xl overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-warm-grey bg-warm-grey/30">
            <p className="text-forest text-sm font-semibold">Missing Documents</p>
          </div>
          <div className="divide-y divide-warm-grey/50">
            {missingDocs.map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.15 }}
                className="flex items-start gap-3 px-4 py-3"
              >
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600 flex-shrink-0 mt-0.5">Red</span>
                <div>
                  <p className="text-forest/65 text-xs leading-relaxed">{doc}</p>
                  <p className="text-forest/30 text-[10px] mt-1">Inferred from document cross-reference analysis</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Footer + export */}
      {showMissing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1"
        >
          <p className="text-forest/30 text-xs leading-relaxed">
            Based on documents provided — always verify against official DIBP requirements.
          </p>
          <button
            onClick={handleExport}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-[6px] border border-warm-grey text-forest/55 hover:text-forest hover:border-forest/20 text-xs font-medium transition-colors duration-200"
          >
            {exportDone ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald font-semibold">Downloaded</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export to Excel
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  )
}

// ─── Phase 2: Intake Agent ─────────────────────────────────────────────────────

function Phase2() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping] = useState(false)
  const [showAgentPanel, setShowAgentPanel] = useState(false)
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [visibleCount, typing, showAgentPanel])

  useEffect(() => {
    if (visibleCount < demoChat.length) {
      const msg = demoChat[visibleCount]
      const delay = visibleCount === 0 ? 1000 : 800
      const t = setTimeout(() => {
        setTyping(true)
        const duration = msg.text.length * 20 + 200
        const t2 = setTimeout(() => {
          setTyping(false)
          setVisibleCount(v => v + 1)
        }, duration)
        return () => clearTimeout(t2)
      }, delay)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setShowAgentPanel(true), 900)
      return () => clearTimeout(t)
    }
  }, [visibleCount])

  return (
    <div className="space-y-6">
      {/* Chat — full width */}
      <div>
        <p className="text-forest/35 text-[10px] uppercase tracking-widest text-center mb-3">What your client sees — 9pm Sunday</p>
        <div className="rounded-xl overflow-hidden border border-warm-grey bg-surface shadow-warm-md max-w-lg mx-auto">
          <div className="px-4 py-3 bg-warm-grey border-b border-warm-grey flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center text-xs font-bold text-white font-display flex-shrink-0">M</div>
            <div>
              <p className="text-forest text-sm font-semibold">Migro Intake Agent</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow" />
                <span className="text-emerald text-xs font-medium">Online</span>
              </div>
            </div>
          </div>
          <div
            ref={messagesRef}
            className="px-4 py-4 space-y-3 h-72 overflow-y-auto bg-surface"
            style={{ scrollbarWidth: 'none' }}
          >
            {demoChat.slice(0, visibleCount).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[82%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
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
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-forest/25 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Agent panel — full width below */}
      <div>
        <p className="text-forest/35 text-[10px] uppercase tracking-widest text-center mb-3">What you see — Monday morning</p>
        <AnimatePresence>
          {showAgentPanel ? (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-warm-grey bg-surface shadow-warm-md overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-warm-grey flex items-center justify-between">
                <div>
                  <p className="text-forest/35 text-xs mb-1">← Back to Clients</p>
                  <h2 className="text-forest text-2xl font-bold font-display">Rodrigo Gutierrez — 14 April 2026</h2>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-[6px] border border-warm-grey text-forest/55 hover:text-forest text-xs font-medium transition-colors duration-200 flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export CSV
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Contact */}
                <div className="bg-warm-grey/30 rounded-xl border border-warm-grey p-4">
                  <p className="text-forest/35 text-[10px] uppercase tracking-wider mb-3">Contact</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-forest/65">
                      <svg className="w-3.5 h-3.5 text-forest/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Rodrigo Gutierrez
                    </div>
                    <div className="flex items-center gap-2 text-sm text-forest/65">
                      <svg className="w-3.5 h-3.5 text-forest/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      roberto.gutierrez@gmail.com
                    </div>
                  </div>
                </div>

                {/* Confidence + Urgency */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Confidence: high
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-700 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    Urgency: high
                  </span>
                </div>

                {/* Applicant summary */}
                <div>
                  <p className="text-forest/35 text-[10px] uppercase tracking-wider mb-2">Applicant Summary</p>
                  <p className="text-forest/65 text-sm leading-relaxed">
                    Rodrigo Gutierrez is a Software Engineer employed by an approved Australian sponsor in Sydney. He has been married for over 3 years and is seeking to include his wife as a secondary applicant on his 482 visa. His wife is currently onshore in Australia on a Student Visa. No health or character concerns have been flagged. Enquiry received Sunday evening — student visa expiry creates moderate urgency.
                  </p>
                </div>

                {/* Recommended pathways */}
                <div>
                  <p className="text-forest/35 text-[10px] uppercase tracking-wider mb-3">Recommended Pathways</p>
                  <div className="space-y-3">
                    {[
                      {
                        subclass: 'Subclass 482 — Temporary Skills Shortage (Secondary Applicant)',
                        fit: 'Strong fit',
                        fitColor: 'bg-emerald-tint text-emerald',
                        desc: "Rodrigo's employer holds approved sponsorship status. His wife qualifies as a secondary applicant on the 482. As she is currently onshore on a Student Visa, she may be eligible to apply without departing Australia, subject to visa conditions.",
                      },
                      {
                        subclass: 'Subclass 186 — Employer Nomination Scheme (Transition Stream)',
                        fit: 'Possible',
                        fitColor: 'bg-amber-50 text-amber-700',
                        desc: 'If Rodrigo has held a 482 for 3+ years in the same role, the 186 Transition Stream offers a pathway to permanent residency. His wife would be included as a secondary applicant. Confirm employment tenure and employer nomination intent.',
                      },
                      {
                        subclass: 'Subclass 820/801 — Partner Visa',
                        fit: 'Alternative',
                        fitColor: 'bg-warm-grey text-forest/60',
                        desc: 'If the 482 secondary applicant pathway has complications, the Partner visa provides an independent pathway to permanent residency based solely on the marriage. Longer processing time but a permanent outcome independent of the employer.',
                      },
                    ].map((pathway, i) => (
                      <div key={i} className="rounded-lg border border-warm-grey bg-surface p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <p className="text-forest text-sm font-semibold leading-snug">{pathway.subclass}</p>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${pathway.fitColor}`}>{pathway.fit}</span>
                        </div>
                        <p className="text-forest/55 text-xs leading-relaxed">{pathway.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing information */}
                <div>
                  <p className="text-forest/35 text-[10px] uppercase tracking-wider mb-2">Missing Information</p>
                  <ul className="space-y-1.5">
                    {[
                      "Wife's full name, date of birth, and nationality.",
                      "Wife's current Student Visa subclass and exact expiry date.",
                      "Whether wife has any health or character concerns.",
                      "Rodrigo's own visa status (482 holder, PR, or Australian citizen).",
                      "Employer's current Labour Market Testing record and sponsorship renewal date.",
                      "Nominated occupation and ANZSCO code for Rodrigo's Software Engineer role.",
                      "Any specific timeline pressure beyond wife's student visa expiry.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-forest/55 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-forest/25 flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next steps */}
                <div>
                  <p className="text-forest/35 text-[10px] uppercase tracking-wider mb-2">Next Steps</p>
                  <ol className="space-y-1.5">
                    {[
                      "Confirm Rodrigo's current visa status to determine which sponsorship pathway applies.",
                      "Obtain wife's Student Visa details — subclass, expiry date, and any conditions on work/study.",
                      "Confirm employer's sponsorship status is current and the nominated occupation is correct.",
                      "Assess whether wife qualifies for an onshore 482 application or must depart first.",
                      "Discuss timeline given wife's student visa and prioritise lodgement accordingly.",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-forest/55 leading-relaxed">
                        <span className="text-emerald font-bold flex-shrink-0 w-4">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <a
                  href="mailto:info@migro.com.au"
                  className="block text-center py-2.5 px-4 rounded-[6px] bg-emerald hover:bg-emerald-hover text-white font-semibold text-sm transition-colors duration-200"
                >
                  Book Consultation
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border-2 border-dashed border-warm-grey min-h-[160px] flex items-center justify-center"
            >
              <div className="text-center px-6">
                <div className="w-8 h-8 rounded-full border-2 border-warm-grey/50 border-t-forest/20 animate-spin mx-auto mb-3" />
                <p className="text-forest/25 text-xs">Waiting for intake to complete…</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Phase 3: Security & Privacy ──────────────────────────────────────────────

function Phase3() {
  const [exportDone, setExportDone] = useState(false)

  const handleExport = () => {
    setExportDone(true)
    setTimeout(() => setExportDone(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Export demo */}
      <div>
        <h3 className="text-forest text-base font-semibold mb-1">Data Export</h3>
        <p className="text-forest/50 text-sm mb-4">Export your leads and assessments to Excel and drop into any system you already use. Migro sits alongside what you have.</p>
        <div className="bg-surface border border-warm-grey rounded-xl overflow-hidden overflow-x-auto mb-4">
          <table className="w-full min-w-[460px]">
            <thead>
              <tr className="border-b border-warm-grey bg-warm-grey/30">
                <th className="px-4 py-2.5 text-left text-forest/35 text-xs font-medium">Date</th>
                <th className="px-4 py-2.5 text-left text-forest/35 text-xs font-medium">Client</th>
                <th className="px-4 py-2.5 text-left text-forest/35 text-xs font-medium">Recommended Visa</th>
                <th className="px-4 py-2.5 text-left text-forest/35 text-xs font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {exportLeads.map((row, i) => (
                <tr key={i} className={`border-b border-warm-grey/50 last:border-0 ${i % 2 === 1 ? 'bg-warm-grey/20' : ''}`}>
                  <td className="px-4 py-2.5 text-forest/45 text-xs">{row.date}</td>
                  <td className="px-4 py-2.5 text-forest text-xs font-medium">{row.name}</td>
                  <td className="px-4 py-2.5 text-forest/55 text-xs">{row.visa}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-tint text-emerald font-medium">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-emerald hover:bg-emerald-hover text-white text-sm font-semibold transition-colors duration-200"
        >
          {exportDone ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Downloaded
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export to Excel
            </>
          )}
        </button>
      </div>

      {/* Data sovereignty */}
      <div className="bg-forest rounded-xl p-6 lg:p-8">
        <p className="text-white/30 text-[10px] font-medium uppercase tracking-widest mb-3 text-center">Security &amp; Compliance</p>
        <h3 className="text-white text-2xl font-bold font-display text-center mb-8">Your clients' data is protected.</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {securityPillars.map((pillar, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white text-sm font-semibold mb-1.5">{pillar.title}</p>
              <p className="text-white/45 text-xs leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-white/25 text-[10px] uppercase tracking-widest text-center mb-5">Certifications</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <img src="/logos/star-level-one.png" alt="CSA STAR Level One"
              className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200" />
            <img src="/logos/star-for-ai-level-one.png" alt="CSA STAR for AI Level One"
              className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200" />
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/20 bg-white/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-white flex-shrink-0">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <div>
                <p className="text-white text-xs font-semibold leading-tight">ASD Cyber Security Business Partner</p>
                <p className="text-white/45 text-[10px]">Australian Signals Directorate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const tabs = [
  { id: 'docs',     label: '① Document Intelligence' },
  { id: 'chat',     label: '② Intake Agent' },
  { id: 'security', label: '③ Security & Privacy' },
]

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('docs')

  return (
    <div className="bg-off-white pt-24">

      {/* Hero */}
      <section className="py-16 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-slow flex-shrink-0" />
            <span className="text-forest/50 text-sm">Interactive demo — no sign-up required</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-forest font-display leading-tight mb-4">
            See Migro in action.
          </h1>
          <p className="text-forest/55 text-lg max-w-xl mx-auto">
            Explore the two core modules with realistic demo data. Click through each phase below.
          </p>
        </motion.div>
      </section>

      {/* Tabs + content */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-forest text-white'
                    : 'border border-warm-grey text-forest/55 hover:text-forest hover:border-forest/20 bg-surface'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-surface border border-warm-grey rounded-xl p-6 lg:p-8 shadow-warm">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'docs'     && <Phase1 />}
              {activeTab === 'chat'     && <Phase2 />}
              {activeTab === 'security' && <Phase3 />}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center border-t border-warm-grey pt-12">
          <p className="text-forest/45 text-base mb-4">Ready to use the real thing?</p>
          <a
            href="mailto:info@migro.com.au"
            className="inline-block px-8 py-3 rounded-[6px] bg-emerald hover:bg-emerald-hover text-white font-semibold text-sm transition-colors duration-200"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

    </div>
  )
}
