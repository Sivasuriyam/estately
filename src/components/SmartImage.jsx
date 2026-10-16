export const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 600'><rect width='900' height='600' fill='#dbe4ee'/><path d='M300 360l150-120 150 120v120H300z' fill='#10243e' opacity='.25'/></svg>")
// Shows a neutral placeholder if a remote photo fails to load.
export default function SmartImage({ src, alt = '', ...rest }) {
  return <img src={src} alt={alt} onError={(e) => { if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK }} {...rest} />
}
