import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
export default function Auth() {
  const [mode, setMode] = useState('login')
  const [err, setErr] = useState({})
  const { login } = useApp()
  const nav = useNavigate()
  const submit = (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.target))
    const er = {}
    if (!/^\S+@\S+\.\S+$/.test(d.email)) er.email = 'Enter a valid email address.'
    if ((d.password || '').length < 6) er.password = 'Use at least 6 characters.'
    if (mode === 'signup' && !d.name?.trim()) er.name = 'Enter your name.'
    setErr(er)
    if (Object.keys(er).length) return
    login({ name: d.name || d.email.split('@')[0], email: d.email }) // UI only: swap for a real API call
    nav('/')
  }
  const field = (name, label, type = 'text') => <label className="block text-sm font-medium">{label}<input name={name} type={type} className="input mt-1 font-normal" aria-invalid={!!err[name]} />{err[name] && <span className="text-sm text-rose-600">{err[name]}</span>}</label>
  return (
    <div className="wrap grid place-items-center py-14">
      <div className="w-full max-w-md rounded-xl bg-white p-6 ring-1 ring-ink/10">
        <div className="mb-5 flex rounded-lg bg-mist p-1">{[['login', 'Sign in'], ['signup', 'Create account']].map(([m, l]) => <button key={m} onClick={() => { setMode(m); setErr({}) }} className={`flex-1 rounded-md py-2 text-sm font-medium ${mode === m ? 'bg-ink text-white' : ''}`}>{l}</button>)}</div>
        <form onSubmit={submit} className="space-y-4" noValidate>
          <AnimatePresence initial={false}>{mode === 'signup' && <motion.div key="n" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{field('name', 'Full name')}</motion.div>}</AnimatePresence>
          {field('email', 'Email', 'email')}{field('password', 'Password', 'password')}
          <button className="btn w-full">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
        </form>
      </div>
    </div>
  )
}
