import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import PropertyCard from '../components/PropertyCard'
export default function Wishlist() {
  const { all, wishlist } = useApp()
  const items = all.filter((p) => wishlist.includes(p.id))
  return (
    <div className="wrap py-8"><h1 className="text-3xl font-bold">Saved properties</h1>
      {items.length ? <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
        : <div className="mt-6 rounded-xl bg-white p-12 text-center ring-1 ring-ink/10"><p className="font-display text-xl">Nothing saved yet</p><p className="mb-4 text-ink/60">Tap the heart on any listing to keep it here.</p><Link to="/properties" className="btn">Browse properties</Link></div>}
    </div>
  )
}
