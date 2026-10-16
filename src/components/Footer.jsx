import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-white/80">
      <div className="wrap flex flex-col justify-between gap-6 py-10 sm:flex-row">
        <div><p className="font-display text-xl font-bold text-white">Estately</p><p className="mt-1 max-w-xs text-sm">Homes, rentals, and plots from verified agents.</p></div>
        <div className="flex gap-8 text-sm">
          <div className="flex flex-col gap-2"><Link to="/properties">Browse</Link><Link to="/agents">Agents</Link><Link to="/submit">List a property</Link></div>
          <div className="flex flex-col gap-2"><Link to="/wishlist">Saved</Link><Link to="/compare">Compare</Link><Link to="/login">Sign in</Link></div>
        </div>
      </div>
    </footer>
  )
}
