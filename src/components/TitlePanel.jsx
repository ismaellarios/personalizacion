import { Network } from 'lucide-react'

export default function TitlePanel() {
  return (
    <div
      className="glass-panel pulse-border"
      style={{
        position: 'absolute',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        padding: '12px 28px',
        textAlign: 'center',
        minWidth: 320,
        maxWidth: 540,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
        <Network size={18} color="var(--cyan)" style={{ filter: 'drop-shadow(0 0 6px var(--cyan))' }} />
        <h1 className="neon-title" style={{ fontSize: '1.1rem', lineHeight: 1 }}>
          Ecosistema YouTube Hispano
        </h1>
        <Network size={18} color="var(--cyan)" style={{ filter: 'drop-shadow(0 0 6px var(--cyan))' }} />
      </div>
      <p className="neon-subtitle">Mapa de relaciones · Análisis de red compleja</p>
    </div>
  )
}
