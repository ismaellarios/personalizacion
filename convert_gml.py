"""
Script para convertir youtube-hispano.gml a graph_data.json
con métricas de red computadas (PageRank, Betweenness, Degree, Louvain).
Instalar dependencias: pip install networkx python-louvain
"""

import json
import networkx as nx

# Intentar importar community (python-louvain)
try:
    import community as community_louvain
    LOUVAIN_AVAILABLE = True
except ImportError:
    print("ADVERTENCIA: python-louvain no instalado. Usando categorías como comunidades.")
    print("Instálalo con: pip install python-louvain")
    LOUVAIN_AVAILABLE = False

# ─── Leer el GML ──────────────────────────────────────────────────────────────
G = nx.read_gml("youtube-hispano.gml", label="id")

print(f"Grafo cargado: {G.number_of_nodes()} nodos, {G.number_of_edges()} aristas")

# ─── Calcular métricas ────────────────────────────────────────────────────────
pagerank    = nx.pagerank(G, alpha=0.85)
betweenness = nx.betweenness_centrality(G, normalized=True)
degree      = dict(G.degree())

# ─── Detectar comunidades Louvain ─────────────────────────────────────────────
if LOUVAIN_AVAILABLE:
    partition = community_louvain.best_partition(G)
    # Mapear los IDs de comunidad a enteros
    community_ids = partition
else:
    # Usar la categoría del nodo como proxy de comunidad
    categories = list(set(nx.get_node_attributes(G, "category").values()))
    cat_to_id  = {cat: i for i, cat in enumerate(categories)}
    community_ids = {
        node: cat_to_id.get(G.nodes[node].get("category", "Unknown"), 0)
        for node in G.nodes()
    }

# ─── Normalizar PageRank para escalar tamaño de nodos ─────────────────────────
pr_values  = list(pagerank.values())
pr_min, pr_max = min(pr_values), max(pr_values)
def norm_pr(v):
    if pr_max == pr_min:
        return 0.5
    return (v - pr_min) / (pr_max - pr_min)

# ─── Construir estructura JSON para react-force-graph ────────────────────────
nodes = []
for node_id in G.nodes():
    data = G.nodes[node_id]
    nodes.append({
        "id":          str(node_id),
        "label":       data.get("label", str(node_id)),
        "category":    data.get("category", "Unknown"),
        "community":   community_ids[node_id],
        "pagerank":    round(pagerank[node_id], 6),
        "betweenness": round(betweenness[node_id], 6),
        "degree":      degree[node_id],
        "val":         round(3 + norm_pr(pagerank[node_id]) * 12, 2)  # tamaño del nodo 3–15
    })

links = []
for source, target in G.edges():
    links.append({
        "source": str(source),
        "target": str(target)
    })

graph_data = {"nodes": nodes, "links": links}

# ─── Guardar ──────────────────────────────────────────────────────────────────
output_path = "src/data/graph_data.json"
import os
os.makedirs(os.path.dirname(output_path), exist_ok=True)

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(graph_data, f, ensure_ascii=False, indent=2)

print(f"\n[OK] Guardado en: {output_path}")
print(f"   Nodos: {len(nodes)}, Aristas: {len(links)}")
print("\nTop 10 PageRank:")
top10 = sorted(nodes, key=lambda n: n["pagerank"], reverse=True)[:10]
for n in top10:
    print(f"  {n['label']:25s}  PR={n['pagerank']:.6f}  Bet={n['betweenness']:.4f}  Deg={n['degree']}")

print("\nComunidades detectadas:")
from collections import Counter
comm_count = Counter(n["community"] for n in nodes)
for comm_id, count in sorted(comm_count.items()):
    members = [n["label"] for n in nodes if n["community"] == comm_id]
    print(f"  Comunidad {comm_id} ({count} nodos): {', '.join(members)}")
