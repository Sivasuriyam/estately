import SmartImage from '../components/SmartImage'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { fmtPrice } from '../data/properties'
export default function Compare() {
  const { all, compare, toggleCompare, clearCompare } = useApp()
  const items = all.filter((p) => compare.includes(p.id))
  if (!items.length) return <div className="wrap py-16 text-center"><h1 className="text-3xl font-bold">Compare properties</h1><p className="my-3 text-ink/60">Add up to three listings to see them side by side.</p><Link to="/properties" className="btn">Browse properties</Link></div>
  const rows = [['Price', (p) => fmtPrice(p.price, p.listing)], ['Type', (p) => p.type], ['City', (p) => p.city], ['Bedrooms', (p) => p.beds || '–'], ['Bathrooms', (p) => p.baths || '–'], ['Area', (p) => `${p.area} sq ft`], ['Year built', (p) => p.year], ['Amenities', (p) => p.amenities.length]]
  return (
    <div className="wrap py-8">
      <div className="flex items-center justify-between"><h1 className="text-3xl font-bold">Compare</h1><button className="btn-ghost" onClick={clearCompare}>Clear all</button></div>
      <div className="mt-6 overflow-x-auto rounded-xl bg-white ring-1 ring-ink/10">
        <table className="w-full min-w-[640px] text-left">
          <thead><tr><th className="w-32 p-4" />{items.map((p) => <th key={p.id} className="p-4 align-top"><SmartImage src={p.images[0]} alt="" className="mb-2 aspect-[3/2] w-full rounded-lg object-cover" /><Link to={`/properties/${p.id}`} className="font-display hover:text-lagoon">{p.title}</Link><button onClick={() => toggleCompare(p.id)} className="mt-1 block text-sm font-normal text-rose-600">Remove</button></th>)}</tr></thead>
          <tbody>{rows.map(([k, fn]) => <tr key={k} className="border-t border-ink/10"><td className="p-4 text-sm font-medium text-ink/60">{k}</td>{items.map((p) => <td key={p.id} className="p-4">{fn(p)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}
