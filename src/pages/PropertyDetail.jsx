import Avatar from '../components/Avatar'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { agents, fmtPrice } from '../data/properties'
import Gallery from '../components/Gallery'

export default function PropertyDetail() {
  const { id } = useParams()
  const { all, wishlist, toggleWish, compare, toggleCompare } = useApp()
  const p = all.find((x) => x.id === id)
  if (!p) return <div className="wrap py-24 text-center"><h1 className="text-2xl">Property not found</h1><Link to="/properties" className="btn mt-4">Back to listings</Link></div>
  const agent = agents.find((a) => a.id === p.agentId)
  const d = 0.01
  const map = `https://www.openstreetmap.org/export/embed.html?bbox=${p.lng - d},${p.lat - d},${p.lng + d},${p.lat + d}&layer=mapnik&marker=${p.lat},${p.lng}`
  return (
    <div className="wrap py-8">
      <Link to="/properties" className="text-sm text-ink/60 hover:text-ink">‹ All properties</Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-8">
          <Gallery images={p.images} alt={p.title} />
          <section>
            <h1 className="text-3xl font-bold">{p.title}</h1>
            <p className="text-ink/60">{p.address}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[['Bedrooms', p.beds || '–'], ['Bathrooms', p.baths || '–'], ['Area', `${p.area} sq ft`], ['Built', p.year]].map(([k, v]) => <div key={k} className="rounded-lg bg-white p-3 ring-1 ring-ink/10"><p className="text-sm text-ink/60">{k}</p><p className="font-bold">{v}</p></div>)}
            </div>
            <p className="mt-5 leading-relaxed text-ink/80">{p.description}</p>
          </section>
          <section><h2 className="text-xl font-bold">Amenities</h2>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{p.amenities.map((a, i) => <motion.li key={a} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="flex items-center gap-2 text-sm"><span className="text-lagoon">✓</span>{a}</motion.li>)}</ul>
          </section>
          <section><h2 className="mb-3 text-xl font-bold">Location</h2><iframe title="Map" src={map} className="h-72 w-full rounded-xl border-0" loading="lazy" /></section>
        </div>
        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-xl bg-white p-5 ring-1 ring-ink/10">
            <p className="text-3xl font-bold">{fmtPrice(p.price, p.listing)}</p>
            <p className="text-sm text-ink/60">≈ ₹{new Intl.NumberFormat('en-IN').format(Math.round(p.price / p.area))} per sq ft{p.listing === 'Rent' ? ' per month' : ''}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="btn-ghost" onClick={() => toggleWish(p.id)}>{wishlist.includes(p.id) ? 'Saved ♥' : 'Save ♡'}</button>
              <button className="btn-ghost" onClick={() => toggleCompare(p.id)}>{compare.includes(p.id) ? 'In compare' : 'Compare'}</button>
            </div>
          </div>
          <div className="rounded-xl bg-white p-5 ring-1 ring-ink/10">
            <Link to={`/agents/${agent.id}`} className="flex items-center gap-3"><Avatar agent={agent} size={48} /><span><span className="block font-medium">{agent.name}</span><span className="text-sm text-ink/60">{agent.title}</span></span></Link>
            <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); e.target.reset(); alert('Message sent to ' + agent.name) }}>
              <input className="input" required placeholder="Your name" /><input className="input" required type="email" placeholder="Email" />
              <textarea className="input" rows="3" defaultValue="I'm interested in this property." />
              <button className="btn w-full">Message agent</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  )
}
