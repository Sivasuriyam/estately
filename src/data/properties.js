const cities = [['Kochi', 9.9312, 76.2673], ['Thrissur', 10.5276, 76.2144], ['Bengaluru', 12.9716, 77.5946], ['Mumbai', 19.076, 72.8777], ['Chennai', 13.0827, 80.2707], ['Hyderabad', 17.385, 78.4867]]
const types = ['Apartment', 'Villa', 'House', 'Plot', 'Commercial']
const AMENITIES = ['Parking', 'Swimming pool', 'Gym', 'Garden', '24/7 security', 'Lift', 'Power backup', 'Clubhouse', 'Wi-Fi', 'Balcony']
export const agents = [
  { id: 'a1', name: 'Anjali Menon', title: 'Senior advisor, Kochi', phone: '+91 98470 11001', email: 'anjali@estately.dev', bio: 'Twelve years helping families buy their first home along the Kerala coast.', rating: 4.9, photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 'a2', name: 'Rahul Nair', title: 'Villa specialist, Thrissur', phone: '+91 98470 11002', email: 'rahul@estately.dev', bio: 'Focused on independent houses and heritage properties.', rating: 4.7, photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 'a3', name: 'Priya Shah', title: 'Metro rentals, Bengaluru', phone: '+91 98470 11003', email: 'priya@estately.dev', bio: 'Matches working professionals with well-located rentals.', rating: 4.8, photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 'a4', name: 'Imran Qureshi', title: 'Commercial leasing, Mumbai', phone: '+91 98470 11004', email: 'imran@estately.dev', bio: 'Office and retail spaces for growing businesses.', rating: 4.6, photo: 'https://randomuser.me/api/portraits/men/75.jpg' },
]
const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`
const EXT = {
  Apartment: ['photo-1545324418-cc1a3fa10c00', 'photo-1460317442991-0ec209397118', 'photo-1512917774080-9991f1c4c750'],
  Villa: ['photo-1580587771525-78b9dba3b914', 'photo-1600596542815-ffad4c1539a9', 'photo-1613490493576-7fde63acd811'],
  House: ['photo-1568605114967-8130f3a36994', 'photo-1570129477492-45c003edd2be', 'photo-1564013799919-ab600027ffc6'],
  Commercial: ['photo-1486406146926-c627a92ad1ab', 'photo-1497366216548-37526070297c', 'photo-1497366811353-6870744d04b2'],
  Plot: ['photo-1500382017468-9049fed747ef', 'photo-1470071459604-3b5ec3a7fe05', 'photo-1501785888041-af3ef285b470', 'photo-1441974231531-c6227db76b6e'],
}
const LIVING = ['photo-1502672260266-1c1ef2d93688', 'photo-1560448204-e02f11c3d0e2', 'photo-1493663284031-b7e3aefcae8e']
const KITCHEN = ['photo-1556911220-bff31c812dba', 'photo-1556909114-f6e7ad7d3136']
const BED = ['photo-1540518614846-7eded433c457', 'photo-1522771739844-6a9f6d5f14af']
const BATH = ['photo-1584622650111-993a426fbf0a', 'photo-1552321554-5fefe8c9ef14']
const OFFICE = ['photo-1497366216548-37526070297c', 'photo-1524758631624-e2822e304c36', 'photo-1497215842964-222b430dc094']
const pick = (a, i) => a[i % a.length]
const photosFor = (type, i) => {
  if (type === 'Plot') return [0, 1, 2, 3].map((k) => U(pick(EXT.Plot, i + k)))
  if (type === 'Commercial') return [U(pick(EXT.Commercial, i)), U(pick(OFFICE, i)), U(pick(OFFICE, i + 1)), U(pick(EXT.Commercial, i + 1))]
  return [U(pick(EXT[type], i)), U(pick(LIVING, i)), U(pick(KITCHEN, i)), U(pick(i % 2 ? BED : BATH, i))]
}
export const properties = Array.from({ length: 30 }, (_, i) => {
  const [city, lat, lng] = cities[i % cities.length]
  const type = types[i % types.length]
  const listing = i % 3 === 0 ? 'Rent' : 'Buy'
  const beds = type === 'Plot' ? 0 : (i % 4) + 1
  const area = 600 + ((i * 137) % 2400)
  const price = listing === 'Rent' ? 12000 + ((i * 3100) % 90000) : 2500000 + ((i * 1370000) % 38000000)
  return {
    id: String(i + 1), title: `${type === 'Plot' ? 'Residential plot' : `${beds} BHK ${type.toLowerCase()}`} in ${city}`, type, listing, city,
    address: `${10 + i} Lakeview Road, ${city}`, price, beds, baths: type === 'Plot' ? 0 : Math.max(1, beds - (i % 2)), area,
    lat: lat + (i % 5) * 0.004, lng: lng + (i % 7) * 0.004, agentId: agents[i % 4].id, year: 2012 + (i % 12),
    description: 'A well-kept property close to schools, transit, and daily needs, with good natural light and a quiet street.',
    amenities: AMENITIES.filter((_, k) => (i + k) % 3 !== 0).slice(0, 7),
    images: photosFor(type, i), createdAt: i,
  }
})
export { AMENITIES, types as TYPES }
export const fmtPrice = (p, listing) => `₹${new Intl.NumberFormat('en-IN').format(p)}${listing === 'Rent' ? '/mo' : ''}`
