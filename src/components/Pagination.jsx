export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null
  const b = 'min-w-10 rounded-lg border border-ink/20 px-3 py-2 text-sm disabled:opacity-40'
  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-wrap justify-center gap-2">
      <button className={b} disabled={page === 1} onClick={() => onChange(page - 1)}>Previous</button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => <button key={n} aria-current={n === page} className={`${b} ${n === page ? '!border-ink bg-ink text-white' : ''}`} onClick={() => onChange(n)}>{n}</button>)}
      <button className={b} disabled={page === pages} onClick={() => onChange(page + 1)}>Next</button>
    </nav>
  )
}
