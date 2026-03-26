import { MousePointerClick, Activity } from 'lucide-react'
import { getCommunityColor } from '../hooks/useGraphData'

function MetricBar({ label, value, maxValue, color }) {
  const pct = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {label}
        </span>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color, fontFamily: 'Orbitron' }}>
          {typeof value === 'number' && value < 1 ? value.toFixed(5) : value}
        </span>
      </div>
      <div className="metric-bar-track">
        <div
          className="metric-bar-fill"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  )
}

export default function DetailsPanel({ selectedNode, maxBetweenness, maxDegree, maxDegreeCentrality, maxClustering, communities }) {
  const community = communities.find(c => c.id === selectedNode?.group)

  return (
    <div
      className="glass-panel-purple"
      style={{
        position: 'absolute',
        top: 80,
        right: 16,
        zIndex: 10,
        width: 300,
        padding: '14px 16px',
        maxHeight: 'calc(100vh - 130px)',
        overflowY: 'auto',
      }}
    >
      <div className="section-heading" style={{ color: 'var(--purple)' }}>
        <Activity size={12} />
        Detalles del Creador
      </div>

      {!selectedNode ? (
        /* Empty state */
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          padding: '28px 10px',
          textAlign: 'center',
        }}>
          <MousePointerClick size={32} color="var(--purple)" style={{ opacity: 0.5 }} />
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Haz clic en un creador en el grafo para ver su influencia en la red
          </p>
          <div style={{
            fontSize: '0.65rem',
            color: 'rgba(168,85,247,0.5)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Degree Centrality · Betweenness · Clustering
          </div>
        </div>
      ) : (
        /* Node detail */
        <div className="animate-fadein">
          {/* Name */}
          <div style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            fontFamily: 'Orbitron',
            color: '#fff',
            marginBottom: 6,
            lineHeight: 1.2,
          }}>
            {selectedNode.label}
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            <span className="community-badge" style={{
              color: community?.color ?? '#94a3b8',
              borderColor: (community?.color ?? '#94a3b8') + '66',
              background: (community?.color ?? '#94a3b8') + '15',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: community?.color ?? '#94a3b8',
                flexShrink: 0,
                boxShadow: `0 0 6px ${community?.color ?? '#94a3b8'}`,
              }} />
              {community?.label ?? `Comunidad ${selectedNode.group}`}
            </span>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(168,85,247,0.2)', marginBottom: 14 }} />

          {/* Metric bars */}
          <MetricBar
            label="Degree Centrality"
            value={selectedNode.degree_centrality}
            maxValue={maxDegreeCentrality}
            color="#00f5ff"
          />
          <MetricBar
            label="Betweenness"
            value={selectedNode.betweenness}
            maxValue={maxBetweenness}
            color="#a855f7"
          />
          <MetricBar
            label="Clustering Coeff."
            value={selectedNode.clustering}
            maxValue={maxClustering}
            color="#34d399"
          />
          <MetricBar
            label="Degree (Grado)"
            value={selectedNode.degree}
            maxValue={maxDegree}
            color="#f59e0b"
          />

          {/* Rank info */}
          <div style={{
            marginTop: 14,
            padding: '10px',
            background: 'rgba(168,85,247,0.06)',
            borderRadius: 8,
            border: '1px solid rgba(168,85,247,0.15)',
            fontSize: '0.68rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
          }}>
            <span style={{ color: 'var(--purple)', fontWeight: 600 }}>
              Comunidad #{selectedNode.group}
            </span>
            {' '}— miembro de la red <em>{community?.label}</em> con{' '}
            <span style={{ color: '#e2e8f0' }}>{selectedNode.degree} conexiones directas</span>.
          </div>
        </div>
      )}
    </div>
  )
}
