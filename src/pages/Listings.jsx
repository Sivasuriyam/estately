import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import PropertyCard from '../components/PropertyCard'
import Pagination from '../components/Pagination'
import { TYPES } from '../data/properties'

const PER = 9
export default function Listings() {
  const { all } = useApp()
  const [sp] = useSearchParams()
  const blank = { q: '', listing: '', type: '', min: '', max: '', beds: '', sort: 'new' }
  const [f, setF] = useState({ ...blank, q: sp.get('q') || '', listing: sp.get('listing') || '', type: sp.get('type') || '' })
  const [page, setPage] = useState(1)
  const [show, setShow] = useState(false)
  useEffect(() => { setPage(1) }, [f])
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const list = useMemo(() => {
    const q = f.q.toLowerCase()
    const r = all.filter((p) => (!q || `${p.title} ${p.address} ${p.city}`.toLowerCase().includes(q)) && (!f.listing || p.listing === f.listing) && (!f.type || p.type === f.type) && (!f.min || p.price >= +f.min) && (!f.max || p.price <= +f.max) && (!f.beds || p.beds >= +f.beds))
    const s = { new: (a, b) => b.createdAt - a.createdAt, low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, area: (a, b) => b.area - a.area }[f.sort]
    return [...r].sort(s)
  }, [all, f])
  const pages = Math.ceil(list.length / PER)
  const view = list.slice((page - 1) * PER, page * PER)
  return (
    <div className="wrap py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-bold">Properties</h1><p className="text-ink/60">{list.length} results</p></div>
        <div className="flex gap-2">
          <button className="btn-ghost lg:hidden" onClick={() => setShow(!show)}>{show ? 'Hide filters' : 'Filters'}</button>
          <select className="input !w-auto" value={f.sort} onChange={set('sort')} aria-label="Sort by"><option value="new">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="area">Largest area</option></select>
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className={`${show ? 'block' : 'hidden'} h-fit space-y-4 rounded-xl bg-white p-4 ring-1 ring-ink/10 lg:sticky lg:top-24 lg:block`}>
          <input className="input" placeholder="Search city or address" value={f.q} onChange={set('q')} aria-label="Search" />
          <select className="input" value={f.listing} onChange={set('listing')} aria-label="Listing type"><option value="">Buy or rent</option><option>Buy</option><option>Rent</option></select>
          <select className="input" value={f.type} onChange={set('type')} aria-label="Property type"><option value="">Any type</option>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
          <div className="grid grid-cols-2 gap-2"><input className="input" type="number" placeholder="Min ₹" value={f.min} onChange={set('min')} /><input className="input" type="number" placeholder="Max ₹" value={f.max} onChange={set('max')} /></div>
          <select className="input" value={f.beds} onChange={set('beds')} aria-label="Bedrooms"><option value="">Any bedrooms</option>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+ beds</option>)}</select>
          <button className="btn-ghost w-full" onClick={() => setF(blank)}>Clear filters</button>
        </aside>
        <div>
          {view.length ? <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{view.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
            : <div className="rounded-xl bg-white p-12 text-center ring-1 ring-ink/10"><p className="font-display text-xl">No properties match these filters</p><p className="text-ink/60">Widen the price range or clear a filter.</p></div>}
          <Pagination page={page} pages={pages} onChange={(n) => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
        </div>
      </div>
    </div>
  )
}
