import SmartImage from './SmartImage'
export default function Avatar({ agent, size = 48 }) {
  return <SmartImage src={agent.photo} alt={agent.name} style={{ width: size, height: size }} className="shrink-0 rounded-full bg-ink object-cover" />
}
