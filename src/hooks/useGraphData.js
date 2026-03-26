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

    // Top 10 by Betweenness
    const top10Betweenness = [...nodes]
      .sort((a, b) => b.betweenness - a.betweenness)
      .slice(0, 10)

    // Max values for normalizing progress bars
    const maxBetweenness      = Math.max(...nodes.map(n => n.betweenness))
    const maxDegree           = Math.max(...nodes.map(n => n.degree))
    const maxDegreeCentrality = Math.max(...nodes.map(n => n.degree_centrality))
    const maxClustering       = Math.max(...nodes.map(n => n.clustering))

    // Unique communities with label derived from members' categories
    const communityMap = {}
    nodes.forEach(n => {
      // Restore dynamic node sizing (scaling from 5 to roughly 30 based on degree and betweenness)
      n.val = Math.max(5, 5 + (n.degree / maxDegree) * 15 + (n.betweenness / maxBetweenness) * 10);
      
      const groupId = n.group !== undefined ? n.group : 0;
      if (!communityMap[groupId]) {
        communityMap[groupId] = { id: groupId, members: [], categories: [] }
      }
      communityMap[groupId].members.push(n.label)
      communityMap[groupId].categories.push(n.category || `Comunidad ${groupId}`)
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

    return { nodes, links, top10Betweenness, maxBetweenness, maxDegree, maxDegreeCentrality, maxClustering, communities }
  }, [])
}
