import { useMemo } from 'react'
import rawData from '../data/graph_data.json'

// ── Community color palette ─────────────────────────────────────────────────
export const COMMUNITY_COLORS = {
  0: '#00f5ff',   // cyan
  1: '#a855f7',   // purple
  2: '#f59e0b',   // amber
  3: '#22c55e',   // green
  4: '#f43f5e',   // rose
  5: '#3b82f6',   // blue
  6: '#fb923c',   // orange
  7: '#e879f9',   // fuchsia
  8: '#34d399',   // emerald
}

export function getCommunityColor(communityId) {
  return COMMUNITY_COLORS[communityId % Object.keys(COMMUNITY_COLORS).length] ?? '#94a3b8'
}

// ── Main hook ───────────────────────────────────────────────────────────────
export function useGraphData() {
  return useMemo(() => {
    const nodes = JSON.parse(JSON.stringify(rawData.nodes))
    const links = JSON.parse(JSON.stringify(rawData.links))

    // Top 10 by PageRank
    const top10PageRank = [...nodes]
      .sort((a, b) => b.pagerank - a.pagerank)
      .slice(0, 10)

    // Max values for normalizing progress bars
    const maxPagerank    = Math.max(...nodes.map(n => n.pagerank))
    const maxBetweenness = Math.max(...nodes.map(n => n.betweenness))
    const maxDegree      = Math.max(...nodes.map(n => n.degree))

    // Unique communities with label derived from members' categories
    const communityMap = {}
    nodes.forEach(n => {
      if (!communityMap[n.community]) {
        communityMap[n.community] = { id: n.community, members: [], categories: [] }
      }
      communityMap[n.community].members.push(n.label)
      communityMap[n.community].categories.push(n.category)
    })

    // Label each community by its most common category
    const communities = Object.values(communityMap).map(c => {
      const freq = {}
      c.categories.forEach(cat => { freq[cat] = (freq[cat] || 0) + 1 })
      const topCat = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0]
      return {
        id: c.id,
        label: topCat,
        members: c.members,
        color: getCommunityColor(c.id),
      }
    }).sort((a, b) => a.id - b.id)

    return { nodes, links, top10PageRank, maxPagerank, maxBetweenness, maxDegree, communities }
  }, [])
}
