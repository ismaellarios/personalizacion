import { useState, useCallback } from 'react'
import { useGraphData } from './hooks/useGraphData'
import NetworkGraph from './components/NetworkGraph'
import TitlePanel from './components/TitlePanel'
import MetricsPanel from './components/MetricsPanel'
import DetailsPanel from './components/DetailsPanel'
import LegendPanel from './components/LegendPanel'
import ScatteredInfoPanels from './components/ScatteredInfoPanels'

export default function App() {
  const { nodes, links, top10Betweenness, maxBetweenness, maxDegree, maxDegreeCentrality, maxClustering, communities } =
    useGraphData()
  const [selectedNode, setSelectedNode] = useState(null)
  const [highlightCommunity, setHighlightCommunity] = useState(null)
  const [highlightNodes, setHighlightNodes] = useState(null) // Array of labels or IDs
  const [activeSection, setActiveSection] = useState(null)
  const [viewMode, setViewMode] = useState('normal')

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node)
    setHighlightNodes(null) // Clear set highlight on selection
  }, [])

  const handleCommunityToggle = useCallback((id) => {
    setHighlightCommunity(prev => (prev === id ? null : id))
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ── Background: Interactive Force Graph ── */}
      <div style={{
        width: '100%',
        height: '100%',
        transform: activeSection !== null ? 'translateX(25vw)' : 'translateX(0)',
        transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
      }}>
        <NetworkGraph
          nodes={nodes}
          links={links}
          onNodeClick={handleNodeClick}
          highlightCommunity={highlightCommunity}
          highlightNodes={highlightNodes}
          viewMode={viewMode}
          maxBetweenness={maxBetweenness}
        />
      </div>

      {/* ── Standard UI Overlays (hidden during presentation viewing) ── */}
      <div style={{
        opacity: activeSection !== null ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: activeSection !== null ? 'none' : 'auto'
      }}>
        {/* ── Overlay: Title Panel (top center) ── */}
        <TitlePanel />

        {/* ── Overlay: Metrics Panel (left) ── */}
        <MetricsPanel top10={top10Betweenness} viewMode={viewMode} setViewMode={setViewMode} />

        {/* ── Overlay: Details Panel (right) ── */}
        <DetailsPanel
          selectedNode={selectedNode}
          maxDegreeCentrality={maxDegreeCentrality}
          maxBetweenness={maxBetweenness}
          maxClustering={maxClustering}
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

      {/* ── Overlay: Scattered Presentation Panels & Left Panel ── */}
      <ScatteredInfoPanels 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        viewMode={viewMode}
        setViewMode={setViewMode}
        highlightCommunity={highlightCommunity}
        setHighlightCommunity={setHighlightCommunity}
        highlightNodes={highlightNodes}
        setHighlightNodes={setHighlightNodes}
      />
    </div>
  )
}
