import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

const links = [['/properties', 'Browse'], ['/agents', 'Agents'], ['/compare', 'Compare'], ['/wishlist', 'Saved']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout, wishlist, compare } = useApp()
  const nav = useNavigate()
  const badge = { '/wishlist': wishlist.length, '/compare': compare.length }
  const item = ({ isActive }) => `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-ink text-white' : 'hover:bg-ink/5'}`
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold">Estately</Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([to, l]) => <NavLink key={to} to={to} className={item}>{l}{badge[to] > 0 && <span className="ml-1.5 rounded-full bg-marigold px-1.5 text-xs text-ink">{badge[to]}</span>}</NavLink>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/submit" className="btn-ghost">List a property</Link>
          {user ? <button className="btn" onClick={() => { logout(); nav('/') }}>Sign out ({user.name.split(' ')[0]})</button> : <Link to="/login" className="btn">Sign in</Link>}
        </div>
        <button className="rounded-md p-2 md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? 'M5 5l14 14M19 5L5 19' : 'M3 6h18M3 12h18M3 18h18'} /></svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-ink/10 md:hidden" onClick={() => setOpen(false)}>
            <div className="wrap flex flex-col gap-1 py-3">
              {links.map(([to, l]) => <NavLink key={to} to={to} className={item}>{l}</NavLink>)}
              <NavLink to="/submit" className={item}>List a property</NavLink>
              {user ? <button className="btn mt-2" onClick={logout}>Sign out</button> : <NavLink to="/login" className="btn mt-2">Sign in</NavLink>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
