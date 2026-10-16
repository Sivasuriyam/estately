import SmartImage from '../components/SmartImage'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import PropertyCard from '../components/PropertyCard'
import { TYPES } from '../data/properties'

export default function Home() {
  const nav = useNavigate()
  const { all } = useApp()
  const [q, setQ] = useState(''), [listing, setListing] = useState('Buy'), [type, setType] = useState('')
  const go = (e) => { e.preventDefault(); nav(`/properties?${new URLSearchParams({ q, listing, ...(type && { type }) })}`) }
  const cities = ['Kochi', 'Thrissur', 'Bengaluru', 'Mumbai', 'Chennai', 'Hyderabad']
  return (
    <>
      <section className="bg-ink text-white">
        <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Find a home that fits your street, your budget, your life.</motion.h1>
            <p className="mt-4 max-w-md text-white/70">Search verified listings across six cities. Save favourites, compare three side by side, and talk to an agent directly.</p>
            <form onSubmit={go} className="mt-8 grid gap-3 rounded-xl bg-white p-3 text-ink sm:grid-cols-[auto_1fr_auto]">
              <div className="flex rounded-lg bg-mist p-1">{['Buy', 'Rent'].map((l) => <button type="button" key={l} onClick={() => setListing(l)} className={`flex-1 rounded-md px-4 py-1.5 text-sm font-medium ${listing === l ? 'bg-ink text-white' : ''}`}>{l}</button>)}</div>
              <input className="input" placeholder="City or address" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search location" />
              <button className="btn">Search</button>
              <select className="input sm:col-span-3" value={type} onChange={(e) => setType(e.target.value)} aria-label="Property type"><option value="">Any property type</option>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
            </form>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((n) => <SmartImage key={n} src={all[n + 4].images[0]} alt="" className={`h-40 w-full rounded-xl object-cover sm:h-56 ${n % 2 ? 'mt-8' : ''}`} />)}
          </motion.div>
        </div>
      </section>
      <section className="wrap py-14">
        <h2 className="text-2xl font-bold">Browse by city</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {cities.map((c) => <Link key={c} to={`/properties?q=${c}`} className="rounded-xl bg-white p-4 text-center font-medium ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:ring-lagoon">{c}<span className="block text-sm font-normal text-ink/60">{all.filter((p) => p.city === c).length} listings</span></Link>)}
        </div>
      </section>
      <section className="wrap">
        <div className="flex items-end justify-between"><h2 className="text-2xl font-bold">Latest listings</h2><Link to="/properties" className="font-medium text-lagoon-d">View all</Link></div>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{all.slice(0, 6).map((p) => <PropertyCard key={p.id} p={p} />)}</div>
      </section>
      <section className="wrap mt-14">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-lagoon p-8 text-white sm:flex-row sm:items-center">
          <div><h2 className="text-2xl font-bold">Selling or renting out?</h2><p className="text-white/80">Create a listing in about three minutes.</p></div>
          <Link to="/submit" className="rounded-lg bg-white px-5 py-2.5 font-medium text-ink">List a property</Link>
        </div>
      </section>
    </>
  )
}
