import networkx as nx
import json
import os

def main():
    print("Loading graph...")
    G = nx.read_gml('youtube-hispano.gml')
    print("Graph loaded. Nodes:", G.number_of_nodes(), "Edges:", G.number_of_edges())

    print("Calculating Louvain communities...")
    try:
        import community as community_louvain
        partition = community_louvain.best_partition(G)
    except Exception as e:
        print("python-louvain not found, falling back to networkx internal louvain...", e)
        from networkx.algorithms.community import louvain_communities
        communities = louvain_communities(G)
        partition = {}
        for i, c in enumerate(communities):
            for node in c:
                partition[node] = i

    print("Calculating centralities... (This might take a minute)")
    degree_centrality = nx.degree_centrality(G)
    
    # We can try to use standard betweenness. If it's too slow, we can limit k, but since the notebook ran it, it should be fine.
    print("  - betweenness_centrality")
    betweenness = nx.betweenness_centrality(G)
    
    print("  - clustering")
    clustering = nx.clustering(G)

    print("Preparing JSON data...")
    nodes = []
    for node in G.nodes():
        node_attr = G.nodes[node]
        nodes.append({
            "id": node,
            "label": node_attr.get('label', node_attr.get('name', str(node))),
            "category": node_attr.get('category', ''),
            "group": partition.get(node, 0),
            "degree": G.degree(node),
            "degree_centrality": degree_centrality.get(node, 0),
            "betweenness": betweenness.get(node, 0),
            "clustering": clustering.get(node, 0)
        })

    links = []
    for u, v in G.edges():
        links.append({
            "source": u,
            "target": v
        })

    data = {
        "nodes": nodes,
        "links": links
    }

    output_path = os.path.join('src', 'data', 'graph_data.json')
    print(f"Saving to {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f)
    print("Done!")

if __name__ == "__main__":
    main()
