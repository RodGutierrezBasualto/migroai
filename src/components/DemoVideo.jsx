import { useState } from 'react'
import { motion } from 'framer-motion'

const VIDEO_ID = 'lOR3Wjybbqc'

export default function DemoVideo() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="demo" className="bg-off-white py-24 border-t border-warm-grey">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-forest/40 text-xs font-medium uppercase tracking-widest mb-4">
            Product demo
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-forest font-display leading-tight">
            Watch Migro run a full analysis.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden border border-warm-grey shadow-warm-md bg-forest">
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title="Migro product demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                aria-label="Play the Migro demo video"
                className="group absolute inset-0 w-full h-full"
              >
                <img
                  src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt="Preview of the Migro product demo video"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-16 h-16 rounded-full bg-surface flex items-center justify-center shadow-warm-md group-hover:scale-105 transition-transform duration-200">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#2D6A2D">
                      <path d="M8 5.14v13.72L19 12 8 5.14z" />
                    </svg>
                  </span>
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
