import { useState, useCallback } from 'react'
import { useGraphData } from './hooks/useGraphData'
import NetworkGraph from './components/NetworkGraph'
import TitlePanel from './components/TitlePanel'
import MetricsPanel from './components/MetricsPanel'
import DetailsPanel from './components/DetailsPanel'
import LegendPanel from './components/LegendPanel'

export default function App() {
  const { nodes, links, top10PageRank, maxPagerank, maxBetweenness, maxDegree, communities } =
    useGraphData()

  const [selectedNode, setSelectedNode] = useState(null)
  const [highlightCommunity, setHighlightCommunity] = useState(null)

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node)
  }, [])

  const handleCommunityToggle = useCallback((id) => {
    setHighlightCommunity(prev => (prev === id ? null : id))
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ── Background: Interactive Force Graph ── */}
      <NetworkGraph
        nodes={nodes}
        links={links}
        onNodeClick={handleNodeClick}
        highlightCommunity={highlightCommunity}
      />

      {/* ── Overlay: Title Panel (top center) ── */}
      <TitlePanel />

      {/* ── Overlay: Metrics Panel (left) ── */}
      <MetricsPanel top10={top10PageRank} />

      {/* ── Overlay: Details Panel (right) ── */}
      <DetailsPanel
        selectedNode={selectedNode}
        maxPagerank={maxPagerank}
        maxBetweenness={maxBetweenness}
        maxDegree={maxDegree}
        communities={communities}
      />

      {/* ── Overlay: Legend Panel (bottom center) ── */}
      <LegendPanel
        communities={communities}
        highlightCommunity={highlightCommunity}
        onToggle={handleCommunityToggle}
      />
    </div>
  )
}
