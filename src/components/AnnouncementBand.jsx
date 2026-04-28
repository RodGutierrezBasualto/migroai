export default function AnnouncementBand() {
  const text = 'First 20 agents get their first month free. Use code MIGRO_100_OFF at signup.'
  const repeated = Array(8).fill(text).join('   ·   ')

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-emerald overflow-hidden flex items-center">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-white text-lg font-medium pr-16">{repeated}</span>
        <span className="text-white text-lg font-medium pr-16" aria-hidden="true">{repeated}</span>
      </div>
    </div>
  )
}
