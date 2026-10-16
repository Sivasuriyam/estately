import Avatar from '../components/Avatar'
import { useParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { agents } from '../data/properties'
import PropertyCard from '../components/PropertyCard'
export default function AgentProfile() {
  const { id } = useParams()
  const { all } = useApp()
  const a = agents.find((x) => x.id === id)
  if (!a) return <div className="wrap py-24 text-center"><Link to="/agents" className="btn">Back to agents</Link></div>
  const list = all.filter((p) => p.agentId === id)
  return (
    <div className="wrap py-8">
      <div className="flex flex-col gap-5 rounded-xl bg-white p-6 ring-1 ring-ink/10 sm:flex-row sm:items-center">
        <Avatar agent={a} size={96} />
        <div className="flex-1"><h1 className="text-3xl font-bold">{a.name}</h1><p className="text-ink/60">{a.title} · ★ {a.rating}</p><p className="mt-2 max-w-xl">{a.bio}</p></div>
        <div className="flex gap-2"><a href={`tel:${a.phone}`} className="btn">Call</a><a href={`mailto:${a.email}`} className="btn-ghost">Email</a></div>
      </div>
      <h2 className="mt-10 text-2xl font-bold">Listings by {a.name.split(' ')[0]} ({list.length})</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
    </div>
  )
}
