import SmartImage, { FALLBACK } from './SmartImage'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
export default function Gallery({ images, alt }) {
  const [i, setI] = useState(0)
  const step = (d) => setI((i + d + images.length) % images.length)
  return (
    <div>
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-ink/10">
        <AnimatePresence mode="wait"><motion.img onError={(e) => { e.currentTarget.src = FALLBACK }} key={i} src={images[i]} alt={`${alt} – photo ${i + 1}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="h-full w-full object-cover" /></AnimatePresence>
        {['‹', '›'].map((c, k) => <button key={c} aria-label={k ? 'Next photo' : 'Previous photo'} onClick={() => step(k ? 1 : -1)} className={`absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl shadow ${k ? 'right-3' : 'left-3'}`}>{c}</button>)}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {images.map((src, k) => <button key={src} onClick={() => setI(k)} aria-label={`Show photo ${k + 1}`} className={`aspect-[3/2] overflow-hidden rounded-lg ring-2 ${k === i ? 'ring-lagoon' : 'opacity-70 ring-transparent'}`}><SmartImage src={src} alt="" className="h-full w-full object-cover" /></button>)}
      </div>
    </div>
  )
}
