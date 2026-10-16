import Avatar from '../components/Avatar'
import { Link } from 'react-router-dom'
import { agents } from '../data/properties'
export default function Agents() {
  return (
    <div className="wrap py-8"><h1 className="text-3xl font-bold">Our agents</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((a) => <Link key={a.id} to={`/agents/${a.id}`} className="rounded-xl bg-white p-6 text-center ring-1 ring-ink/10 transition hover:ring-lagoon"><span className="mx-auto block w-fit"><Avatar agent={a} size={80} /></span><p className="mt-3 font-display font-medium">{a.name}</p><p className="text-sm text-ink/60">{a.title}</p><p className="mt-2 text-sm">★ {a.rating}</p></Link>)}
      </div>
    </div>
  )
}
