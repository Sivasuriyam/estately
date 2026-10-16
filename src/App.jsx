import { Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Listings from './pages/Listings'
import PropertyDetail from './pages/PropertyDetail'
import Wishlist from './pages/Wishlist'
import Compare from './pages/Compare'
import Agents from './pages/Agents'
import AgentProfile from './pages/AgentProfile'
import Auth from './pages/Auth'
import Submit from './pages/Submit'

export default function App() {
  const loc = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [loc.pathname])
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
        <motion.main key={loc.pathname} className="flex-1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Listings />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agents/:id" element={<AgentProfile />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="*" element={<div className="wrap py-24 text-center"><h1 className="text-3xl">Page not found</h1></div>} />
          </Routes>
        </motion.main>
      <Footer />
    </div>
  )
}
