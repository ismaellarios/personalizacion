import { Layers } from 'lucide-react'

export default function LegendPanel({ communities, highlightCommunity, onToggle }) {
  return (
    <div
      className="glass-panel"
      style={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 'calc(100vw - 680px)',
        minWidth: 300,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        color: 'var(--cyan)',
        fontSize: '0.6rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        fontFamily: 'Orbitron',
        whiteSpace: 'nowrap',
        marginRight: 4,
      }}>
        <Layers size={11} />
        Comunidades
      </div>

      {communities.map((c) => {
        const isActive = highlightCommunity === c.id
        return (
          <button
            key={c.id}
            className={`legend-btn${isActive ? ' active' : ''}`}
            style={{
              borderColor: isActive ? c.color : `${c.color}44`,
              color: isActive ? '#fff' : c.color,
              background: isActive ? `${c.color}22` : 'rgba(255,255,255,0.04)',
              boxShadow: isActive ? `0 0 10px ${c.color}66, inset 0 0 8px ${c.color}22` : 'none',
            }}
            onClick={() => onToggle(c.id)}
          >
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: c.color,
              flexShrink: 0,
              boxShadow: `0 0 ${isActive ? 8 : 4}px ${c.color}`,
            }} />
            {c.label}
            <span style={{ opacity: 0.5, fontSize: '0.6rem' }}>({c.members.length})</span>
          </button>
        )
      })}

      {highlightCommunity !== null && (
        <button
          className="legend-btn"
          style={{ borderColor: 'rgba(148,163,184,0.3)', color: 'var(--text-secondary)' }}
          onClick={() => onToggle(null)}
        >
          ✕ Mostrar todos
        </button>
      )}
    </div>
  )
}
