import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { TrendingUp } from 'lucide-react'
import { getCommunityColor } from '../hooks/useGraphData'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const d = payload[0].payload
    return (
      <div style={{
        background: 'rgba(6,12,24,0.95)',
        border: '1px solid var(--cyan)',
        borderRadius: 8,
        padding: '6px 12px',
        fontSize: '0.72rem',
        color: 'var(--cyan)',
      }}>
        <div style={{ fontWeight: 700, marginBottom: 2 }}>{d.label}</div>
        <div>Betweenness: <strong>{d.betweenness.toFixed(5)}</strong></div>
        <div style={{ color: 'var(--text-secondary)' }}>Grado: {d.degree}</div>
      </div>
    )
  }
  return null
}

export default function MetricsPanel({ top10, viewMode, setViewMode }) {
  // Format for recharts horizontal bar: value is betweenness * 1000 for readability
  const data = top10.map(n => ({
    ...n,
    name: n.label.length > 12 ? n.label.slice(0, 12) + '…' : n.label,
    value: +(n.betweenness * 1000).toFixed(3),
  }))

  return (
    <div
      className="glass-panel"
      style={{
        position: 'absolute',
        top: 80,
        left: 16,
        zIndex: 10,
        width: 300,
        padding: '14px 16px',
        maxHeight: 'calc(100vh - 130px)',
        overflowY: 'auto',
      }}
    >
      <div className="section-heading">
        <TrendingUp size={12} />
        Top 10 · Betweenness
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
        >
          <XAxis
            type="number"
            tick={{ fill: 'rgba(148,163,184,0.7)', fontSize: 9 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => v.toFixed(1)}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={82}
            tick={{ fill: '#e2e8f0', fontSize: 10, fontFamily: 'Inter' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,245,255,0.05)' }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={14}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCommunityColor(entry.group)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Mini stat row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        marginTop: 10,
      }}>
        {[
          { label: 'Nodos', value: 40 },
          { label: 'Aristas', value: 71 },
        ].map(({ label, value }) => (
          <div key={label} style={{
            background: 'rgba(0,245,255,0.05)',
            border: '1px solid rgba(0,245,255,0.15)',
            borderRadius: 8,
            padding: '8px 10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--cyan)', fontFamily: 'Orbitron' }}>
              {value}
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* View Mode Controls */}
      <div style={{
        marginTop: 16,
        padding: '12px 10px',
        background: 'rgba(0, 245, 255, 0.05)',
        border: '1px solid rgba(0, 245, 255, 0.1)',
        borderRadius: 8,
      }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, textAlign: 'center' }}>
          Modo de Visualización
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { id: 'normal', label: 'Nodos Individuales' },
            { id: 'louvain', label: 'Comunidades (Louvain)' },
            { id: 'betweenness', label: 'Heatmap (Betweenness)' }
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              style={{
                background: viewMode === mode.id ? 'var(--cyan)' : 'rgba(255, 255, 255, 0.05)',
                color: viewMode === mode.id ? '#020408' : '#e2e8f0',
                border: viewMode === mode.id ? '1px solid var(--cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '6px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: viewMode === mode.id ? 700 : 500,
                transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
