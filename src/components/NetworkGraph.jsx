import { useRef, useCallback, useEffect, useState, useMemo } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import { getCommunityColor } from '../hooks/useGraphData'

export default function NetworkGraph({
  nodes,
  links,
  onNodeClick,
  highlightCommunity, // null | number
  highlightNodes,     // null | string[]
  viewMode = 'louvain',
  maxBetweenness = 1
}) {
  const graphRef = useRef(null)
  const containerRef = useRef(null)

  // Memoize the highlight set for O(1) lookup in renderer
  const highlightedSet = useMemo(() => 
    highlightNodes ? new Set(highlightNodes) : null
  , [highlightNodes])

  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight })
  const [hoveredNode, setHoveredNode] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // Responsive resize
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Custom canvas node renderer with glow effect
  const nodeCanvasObject = useCallback((node, ctx, globalScale) => {
    if (typeof node.x !== 'number' || typeof node.y !== 'number') return;
    
    let color = '#94a3b8';
    if (viewMode === 'normal') {
      // Normal: Unique color per node
      const identifier = node.id || node.label || '0';
      const colors = [
        '#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', 
        '#ec4899', '#0ea5e9', '#eab308', '#14b8a6', '#f97316',
        '#a3e635', '#2dd4bf', '#a78bfa', '#fb7185', '#60a5fa'
      ];
      let hash = 0;
      for (let i = 0; i < String(identifier).length; i++) {
        hash = String(identifier).charCodeAt(i) + ((hash << 5) - hash);
      }
      color = colors[Math.abs(hash) % colors.length];
    } else if (viewMode === 'betweenness') {
      // Heatmap scale for betweenness (Blue -> Purple -> Red -> Orange -> Yellow)
      const HEAT_COLORS = ['#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e', '#ef4444', '#f97316', '#eab308'];
      const intensityIdx = Math.floor(Math.min(0.99, (node.betweenness || 0) / Math.max(0.0001, maxBetweenness)) * HEAT_COLORS.length);
      color = HEAT_COLORS[intensityIdx];
    } else {
      // Louvain (default)
      color = getCommunityColor(node.group);
    }

    const radius  = node.val ?? 5
    const isDimmed = 
      (highlightCommunity !== null && node.group !== highlightCommunity) ||
      (highlightedSet !== null && !highlightedSet.has(node.label))

    // Glow halo (only for non-dimmed)
    if (!isDimmed) {
      const glowRadius = radius * 2.2
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius)
      gradient.addColorStop(0, color + '55')
      gradient.addColorStop(1, color + '00')
      ctx.beginPath()
      ctx.arc(node.x, node.y, glowRadius, 0, 2 * Math.PI)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    // Node circle
    ctx.beginPath()
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = isDimmed ? 'rgba(30,40,60,0.3)' : color
    ctx.fill()

    // Node border
    ctx.strokeStyle = isDimmed ? 'rgba(100,120,160,0.2)' : color
    ctx.lineWidth = isDimmed ? 0.5 : 1.5
    ctx.stroke()

    // Label (only when zoomed in enough or node is large)
    const labelThreshold = 3
    if (globalScale >= labelThreshold || radius > 8) {
      const label = node.label
      const fontSize = Math.max(10 / globalScale, 3)
      ctx.font = `600 ${fontSize}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = isDimmed ? 'rgba(150,170,200,0.3)' : '#ffffff'
      ctx.fillText(label, node.x, node.y + radius + fontSize * 0.9)
    }
  }, [highlightCommunity, highlightedSet, viewMode, maxBetweenness])

  const nodePointerAreaPaint = useCallback((node, color, ctx) => {
    if (typeof node.x !== 'number' || typeof node.y !== 'number') return;
    ctx.beginPath()
    ctx.arc(node.x, node.y, (node.val ?? 5) + 3, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
  }, [])

  // Click: center camera on node + notify parent
  const handleNodeClick = useCallback((node) => {
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 800)
      graphRef.current.zoom(5, 800)
    }
    onNodeClick(node)
  }, [onNodeClick])

  // Hover
  const handleNodeHover = useCallback((node, _prevNode, evt) => {
    setHoveredNode(node || null)
    if (evt) {
      setTooltipPos({ x: evt.clientX, y: evt.clientY })
    }
  }, [])

  // Mouse move to keep tooltip following
  const handleMouseMove = useCallback((evt) => {
    if (hoveredNode) {
      setTooltipPos({ x: evt.clientX, y: evt.clientY })
    }
  }, [hoveredNode])

  // Link color
  const linkColor = useCallback((link) => {
    const sourceNode = typeof link.source === 'object' ? link.source : { label: '', group: -1 }
    const targetNode = typeof link.target === 'object' ? link.target : { label: '', group: -1 }

    // Case 1: Highlight Nodes
    if (highlightedSet !== null) {
      const isHighlighted = highlightedSet.has(sourceNode.label) && highlightedSet.has(targetNode.label)
      return isHighlighted ? 'rgba(0, 245, 255, 0.6)' : 'rgba(50, 60, 80, 0.05)'
    }

    // Case 2: Highlight Community
    if (highlightCommunity !== null) {
      const isHighlighted = sourceNode.group === highlightCommunity && targetNode.group === highlightCommunity
      return isHighlighted ? 'rgba(0, 245, 255, 0.4)' : 'rgba(50, 60, 80, 0.15)'
    }

    // Default
    return 'rgba(0, 245, 255, 0.12)'
  }, [highlightCommunity, highlightedSet])

  return (
    <div
      ref={containerRef}
      style={{ width: '100vw', height: '100vh', position: 'absolute', inset: 0, zIndex: 0 }}
      onMouseMove={handleMouseMove}
    >
      <ForceGraph2D
        ref={graphRef}
        graphData={{ nodes, links }}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#020408"
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={nodePointerAreaPaint}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        linkColor={linkColor}
        linkWidth={1}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleColor={() => '#00f5ff'}
        linkDirectionalParticleSpeed={0.004}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        cooldownTicks={120}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        onEngineStop={() => {
          // After simulation settles, do a gentle zoom-fit
          if (graphRef.current) {
            graphRef.current.zoomToFit(600, 80)
          }
        }}
      />

      {/* Tooltip */}
      {hoveredNode && (
        <div
          className="graph-tooltip"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            opacity: hoveredNode ? 1 : 0,
          }}
        >
          {hoveredNode.label}
          <span style={{ marginLeft: 8, opacity: 0.6, fontSize: '0.65rem' }}>
            BC: {hoveredNode.betweenness?.toFixed(4)} | DC: {hoveredNode.degree_centrality?.toFixed(4)}
          </span>
        </div>
      )}
    </div>
  )
}
