import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { AMENITIES, TYPES } from '../data/properties'

const F = ({ n, label, err, ...r }) => <label className="block text-sm font-medium">{label}<input name={n} className="input mt-1 font-normal" {...r} />{err[n] && <span className="text-sm text-rose-600">{err[n]}</span>}</label>

export default function Submit() {
  const { user, addProperty } = useApp()
  const nav = useNavigate()
  const [err, setErr] = useState({})
  const [photos, setPhotos] = useState([])
  if (!user) return <div className="wrap py-20 text-center"><h1 className="text-2xl font-bold">Sign in to list a property</h1><Link to="/login" className="btn mt-4">Sign in</Link></div>
  const onFiles = (e) => setPhotos([...e.target.files].slice(0, 4).map((f) => URL.createObjectURL(f)))
  const submit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target), d = Object.fromEntries(fd)
    const er = {}
    if (!d.title?.trim()) er.title = 'Add a title.'
    if (!d.city?.trim()) er.city = 'Add a city.'
    if (!(+d.price > 0)) er.price = 'Enter a price above 0.'
    if (!(+d.area > 0)) er.area = 'Enter the area.'
    setErr(er)
    if (Object.keys(er).length) return
    const id = addProperty({ title: d.title, type: d.type, listing: d.listing, city: d.city, address: d.address || d.city, price: +d.price, beds: +d.beds, baths: +d.baths, area: +d.area, lat: 10.5276, lng: 76.2144, year: new Date().getFullYear(), description: d.description || 'No description provided.', amenities: fd.getAll('amenities'), images: photos.length ? photos : ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=70'] })
    nav(`/properties/${id}`)
  }
  return (
    <div className="wrap max-w-3xl py-8">
      <h1 className="text-3xl font-bold">List a property</h1>
      <form onSubmit={submit} noValidate className="mt-6 space-y-5 rounded-xl bg-white p-6 ring-1 ring-ink/10">
        <F n="title" err={err} label="Title" placeholder="3 BHK villa near the lake" />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">Listing<select name="listing" className="input mt-1 font-normal"><option>Buy</option><option>Rent</option></select></label>
          <label className="block text-sm font-medium">Type<select name="type" className="input mt-1 font-normal">{TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
          <F n="city" err={err} label="City" /><F n="address" err={err} label="Address" />
          <F n="price" err={err} label="Price (₹)" type="number" /><F n="area" err={err} label="Area (sq ft)" type="number" />
          <F n="beds" err={err} label="Bedrooms" type="number" defaultValue="2" min="0" /><F n="baths" err={err} label="Bathrooms" type="number" defaultValue="2" min="0" />
        </div>
        <label className="block text-sm font-medium">Description<textarea name="description" rows="4" className="input mt-1 font-normal" /></label>
        <fieldset><legend className="text-sm font-medium">Amenities</legend><div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">{AMENITIES.map((a) => <label key={a} className="flex items-center gap-2 text-sm"><input type="checkbox" name="amenities" value={a} className="accent-lagoon" />{a}</label>)}</div></fieldset>
        <div><label className="text-sm font-medium">Photos (up to 4)<input type="file" accept="image/*" multiple onChange={onFiles} className="input mt-1 font-normal" /></label>
          <div className="mt-2 flex gap-2">{photos.map((s) => <img key={s} src={s} alt="Selected upload" className="h-16 w-24 rounded-lg object-cover" />)}</div></div>
        <button className="btn w-full sm:w-auto">Publish listing</button>
      </form>
    </div>
  )
}
