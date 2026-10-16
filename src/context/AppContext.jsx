import { createContext, useContext, useEffect, useState } from 'react'
import { properties as seed } from '../data/properties'

const Ctx = createContext()
export const useApp = () => useContext(Ctx)
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }

export function AppProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => load('wl', []))
  const [compare, setCompare] = useState(() => load('cmp', []))
  const [user, setUser] = useState(() => load('user', null))
  const [custom, setCustom] = useState(() => load('custom', []))
  useEffect(() => { try { localStorage.setItem('wl', JSON.stringify(wishlist)); localStorage.setItem('cmp', JSON.stringify(compare)); localStorage.setItem('user', JSON.stringify(user)); localStorage.setItem('custom', JSON.stringify(custom)) } catch {} }, [wishlist, compare, user, custom])
  const toggleWish = (id) => setWishlist((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))
  const toggleCompare = (id) => setCompare((l) => (l.includes(id) ? l.filter((x) => x !== id) : l.length >= 3 ? l : [...l, id]))
  const all = [...custom, ...seed]
  const addProperty = (p) => { const np = { ...p, id: `u${Date.now()}`, createdAt: 100 + custom.length, agentId: 'a1' }; setCustom((c) => [np, ...c]); return np.id }
  return <Ctx.Provider value={{ all, wishlist, toggleWish, compare, toggleCompare, clearCompare: () => setCompare([]), user, login: setUser, logout: () => setUser(null), addProperty }}>{children}</Ctx.Provider>
}
