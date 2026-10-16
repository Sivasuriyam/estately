import SmartImage from './SmartImage'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { fmtPrice } from '../data/properties'

export default function PropertyCard({ p }) {
  const { wishlist, toggleWish, compare, toggleCompare } = useApp()
  const saved = wishlist.includes(p.id), cmp = compare.includes(p.id)
  return (
    <motion.article layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-ink/10">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Link to={`/properties/${p.id}`}><SmartImage src={p.images[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></Link>
        <span className="absolute left-3 top-3 rounded-md bg-ink px-2 py-1 text-xs font-medium text-white">For {p.listing.toLowerCase()}</span>
        <button onClick={() => toggleWish(p.id)} aria-pressed={saved} aria-label={saved ? 'Remove from saved' : 'Save property'} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white shadow">
          <motion.svg whileTap={{ scale: 1.4 }} width="18" height="18" viewBox="0 0 24 24" fill={saved ? '#e11d48' : 'none'} stroke={saved ? '#e11d48' : 'currentColor'} strokeWidth="2"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.8-8 11-8 11z" /></motion.svg>
        </button>
      </div>
      <div className="p-4">
        <p className="text-xl font-bold">{fmtPrice(p.price, p.listing)}</p>
        <Link to={`/properties/${p.id}`} className="mt-1 block font-display font-medium hover:text-lagoon">{p.title}</Link>
        <p className="truncate text-sm text-ink/60">{p.address}</p>
        <p className="mt-3 flex gap-4 text-sm text-ink/80">{p.beds > 0 && <span>{p.beds} bed</span>}{p.baths > 0 && <span>{p.baths} bath</span>}<span>{p.area} sq ft</span></p>
        <button onClick={() => toggleCompare(p.id)} className={`mt-4 w-full rounded-lg border py-2 text-sm font-medium transition ${cmp ? 'border-lagoon bg-lagoon/10 text-lagoon-d' : 'border-ink/20 hover:bg-ink/5'}`}>{cmp ? 'Added to compare' : compare.length >= 3 ? 'Compare is full (3)' : 'Add to compare'}</button>
      </div>
    </motion.article>
  )
}
