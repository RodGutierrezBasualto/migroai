import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TOOLS = [
  { label: 'HubSpot',    angle: 0   },
  { label: 'n8n',        angle: 60  },
  { label: 'Make',       angle: 120 },
  { label: 'Zapier',     angle: 180 },
  { label: 'Case Mgmt',  angle: 240 },
  { label: 'Your CRM',   angle: 300 },
]

const RADIUS = 130
const CENTER = 160

function toXY(angleDeg, r) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER + r * Math.sin(rad),
  }
}

function Packet({ angle, active }) {
  const end = toXY(angle, RADIUS - 28)
  const start = { x: CENTER, y: CENTER }

  return (
    <AnimatePresence>
      {active && (
        <motion.circle
          key={`packet-${angle}`}
          r={4}
          fill="#2D6A2D"
          initial={{ cx: start.x, cy: start.y, opacity: 0 }}
          animate={{ cx: end.x, cy: end.y, opacity: [0, 1, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  )
}

function RadialAnimation() {
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    let timers = []

    function cycle() {
      TOOLS.forEach((_, i) => {
        timers.push(setTimeout(() => setActiveIndex(i), i * 350))
      })
      timers.push(setTimeout(() => {
        setActiveIndex(-1)
        timers = []
        cycle()
      }, TOOLS.length * 350 + 1200))
    }

    const start = setTimeout(cycle, 600)
    return () => {
      clearTimeout(start)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="relative" style={{ width: CENTER * 2, height: CENTER * 2, maxWidth: '100%', margin: '0 auto' }}>
      <svg
        width={CENTER * 2}
        height={CENTER * 2}
        className="absolute inset-0"
        style={{ overflow: 'visible' }}
      >
        {/* Spoke lines */}
        {TOOLS.map((tool, i) => {
          const end = toXY(tool.angle, RADIUS - 30)
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={end.x}
              y2={end.y}
              stroke="#EFEDE8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          )
        })}

        {/* Animated packets */}
        {TOOLS.map((tool, i) => (
          <Packet key={i} angle={tool.angle} active={activeIndex === i} />
        ))}
      </svg>

      {/* Center node */}
      <div
        className="absolute flex items-center justify-center rounded-xl"
        style={{
          width: 48,
          height: 48,
          left: CENTER - 24,
          top: CENTER - 24,
          background: '#1a2b1a',
          boxShadow: '0 0 0 8px rgba(26,43,26,0.08)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
          <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" fillOpacity="0.9"/>
          <path d="M9 4.5L13.5 9L9 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </div>

      {/* Tool nodes */}
      {TOOLS.map((tool, i) => {
        const pos = toXY(tool.angle, RADIUS)
        const isActive = activeIndex === i
        return (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center rounded-lg border text-xs font-semibold px-2 py-1.5 select-none"
            style={{
              left: pos.x - 36,
              top: pos.y - 16,
              width: 72,
              textAlign: 'center',
              transition: 'all 0.2s ease',
              background: isActive ? '#E8F2E8' : '#fff',
              borderColor: isActive ? 'rgba(45,106,45,0.3)' : '#EFEDE8',
              color: isActive ? '#1a2b1a' : '#1a2b1a99',
            }}
          >
            {tool.label}
          </motion.div>
        )
      })}
    </div>
  )
}

export default function APISection() {
  return (
    <section className="py-24 bg-warm-grey border-t border-warm-grey">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Animation — left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <RadialAnimation />
          </motion.div>

          {/* Copy — right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-forest/40 text-sm font-medium mb-3">API</p>
            <h2 className="text-4xl font-bold text-forest font-display leading-tight mb-5">
              Connect Migro to your<br />practice stack.
            </h2>
            <p className="text-forest/55 text-base leading-relaxed">
              The API lets you connect Migro to your other practice tools — CRM, case management, or automation workflows — so client data flows automatically without manual entry. Build once and your intake assessments and document analysis results appear wherever you need them. Also connects to n8n, Make, and Zapier.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
