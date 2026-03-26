import { useState } from 'react'
import { Target, BarChart2, Crosshair, Users, X, ChevronRight, ChevronLeft, Maximize2 } from 'lucide-react'
import imgChart1 from '../assets/3_picture1.png'
import imgChart2 from '../assets/3_picture2.png'

export default function ScatteredInfoPanels({
  activeSection,
  setActiveSection,
  viewMode,
  setViewMode,
  highlightCommunity,
  setHighlightCommunity,
  highlightNodes,
  setHighlightNodes
}) {
  const [enlargedImage, setEnlargedImage] = useState(null)

  const sections = [
    {
      id: 0,
      buttonPos: { top: 16, left: 16 },
      title: 'Introducción',
      shortTitle: 'Introducción',
      icon: <Target size={20} />,
      color: 'var(--cyan)',
      content: (
        <div className="script-content presentation-mode">
          <div className="slide-block" style={{ borderLeftColor: 'var(--cyan)' }}>
            <p><strong>Contexto del Proyecto:</strong> Análisis de la red social de YouTube Hispano utilizando un dataset de Kaggle con 40 creadores de contenido.</p>
          </div>

          <ul className="talking-points">
            <li><strong>Objetivos:</strong> Aplicar <em>Computación Social</em> para extraer métricas, identificar influyentes y entender agrupaciones.</li>
            <li><strong>Metodología:</strong> Procesamiento con <strong>Python y NetworkX</strong> (Grafo no dirigido y no ponderado).</li>
            <li><strong>Estadísticos:</strong> 40 nodos y 71 aristas. Cada canal incluye su categoría (Streamer, Gaming, Ciencia, Tech...).</li>
            <li><strong>Hito Final:</strong> Detección de comunidades mediante el algoritmo de <strong>Louvain</strong>.</li>
          </ul>
        </div>
      )
    },
    {
      id: 1,
      buttonPos: { top: 16, right: 16 },
      title: 'Métricas globales de la red',
      shortTitle: 'Métricas globales',
      icon: <BarChart2 size={20} />,
      color: '#34d399',
      content: (
        <div className="script-content presentation-mode">
          <div className="slide-block" style={{ borderLeftColor: '#34d399' }}>
            <p>El análisis del grafo revela una <strong>única componente conectada</strong> (la componente gigante que abarca el 100% de la red), lo que indica que todos los creadores del dataset están conectados entre sí de forma directa o indirecta.</p>
          </div>

          <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>Métricas globales de la red analizada:</p>

          <div className="stats-table-wrapper">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>MÉTRICA</th>
                  <th>VALOR</th>
                  <th>INTERPRETACIÓN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nodos</td>
                  <td>40</td>
                  <td>Número total de miembros analizados en la red.</td>
                </tr>
                <tr>
                  <td>Aristas</td>
                  <td>71</td>
                  <td>Número total de interacciones sociales observadas.</td>
                </tr>
                <tr>
                  <td className="highlight">Grado medio</td>
                  <td className="highlight">3.55</td>
                  <td>De media, cada miembro interactúa con otros 3 o 4 miembros.</td>
                </tr>
                <tr>
                  <td>Densidad</td>
                  <td>0.091</td>
                  <td>Es una red dispersa. Solo el 9.1% de las conexiones posibles existen.</td>
                </tr>
                <tr>
                  <td className="highlight">Clustering</td>
                  <td className="highlight">0.3108</td>
                  <td>Probabilidad del 31.08% de que dos amigos de un creador sean amigos entre sí.</td>
                </tr>
                <tr>
                  <td>Distancia media</td>
                  <td>3.37</td>
                  <td>Separación media entre dos creadores de algo más de 3 saltos.</td>
                </tr>
                <tr>
                  <td className="highlight">Diámetro</td>
                  <td className="highlight">7</td>
                  <td>Distancia máxima entre los dos nodos más alejados (7 saltos).</td>
                </tr>
                <tr>
                  <td>Asortatividad</td>
                  <td>0.0347</td>
                  <td>Red ligeramente asortativa. Nodos de alto grado tienden a conectarse entre sí.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 2,
      buttonPos: { bottom: 16, left: 16 },
      title: 'Centralidades e Influencia',
      shortTitle: 'Centralidades e Influencia',
      icon: <Crosshair size={20} />,
      color: '#f59e0b',
      content: (
        <div className="script-content presentation-mode">
          <div className="slide-block" style={{ borderLeftColor: '#f59e0b' }}>
            <p><strong>Centralidades:</strong> ¿Quién es importante y por qué? Analizamos el rol estratégico mediante tres métricas fundamentales:</p>
          </div>

          <ul className="talking-points">
            <li><strong>Degree Centrality (Grado):</strong> Importancia local. ¿Cuántas conexiones directas tiene este nodo?</li>
            <li><strong>Betweenness Centrality (Intermediación):</strong> Nodos puente. ¿Conecta comunidades y controla el flujo de información?</li>
            <li><strong>Clustering Coefficient (Agrupamiento):</strong> Cohesión del entorno. ¿Sus contactos también se conocen entre sí?</li>
          </ul>

          <div style={{ display: 'flex', gap: '15px', marginTop: '15px', justifyContent: 'center' }}>
            <div
              className="zoom-card"
              onClick={() => setEnlargedImage({ src: imgChart1, title: 'Distribución de Grados' })}
              style={{ flex: 1, background: '#fff', padding: '10px', borderRadius: '12px', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
            >
              <div className="zoom-icon"><Maximize2 size={14} /></div>
              <img src={imgChart1} alt="Métricas 1" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            <div
              className="zoom-card"
              onClick={() => setEnlargedImage({ src: imgChart2, title: 'Comparativa de Centralidades' })}
              style={{ flex: 1, background: '#fff', padding: '10px', borderRadius: '12px', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
            >
              <div className="zoom-icon"><Maximize2 size={14} /></div>
              <img src={imgChart2} alt="Métricas 2" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      buttonPos: { bottom: 16, right: 16 },
      title: 'Comunidades, interpretación y conclusión',
      shortTitle: 'Comunidades y Conclusión',
      icon: <Users size={20} />,
      color: '#a855f7',
      content: (
        <div className="script-content presentation-mode">

          <div className="slide-block">
            <button
              className={`interactive-btn ${viewMode === 'louvain' ? 'active' : ''}`}
              onClick={() => setViewMode('louvain')}
            >
              <Users size={16} /> Mostrar Comunidades (Louvain)
            </button>
            <ul className="talking-points mini">
              <li>Modularidad: <strong>0,60</strong> (Red fuertemente sectorizada).</li>
              <li>Detección: <strong>5 grandes bloques</strong> temáticos.</li>
            </ul>
          </div>

          <div className="slide-block">
            <p style={{ marginBottom: '10px', fontSize: '1rem', fontWeight: 600 }}>Nichos detectados (Hover para resaltar):</p>
            <div className="community-pills">
              <button className="pill-btn science" onMouseEnter={() => setHighlightCommunity(2)} onMouseLeave={() => setHighlightCommunity(null)}>Ciencia y Tech</button>
              <button className="pill-btn latam" onMouseEnter={() => setHighlightCommunity(1)} onMouseLeave={() => setHighlightCommunity(null)}>Núcleo LATAM</button>
              <button className="pill-btn gaming" onMouseEnter={() => setHighlightCommunity(4)} onMouseLeave={() => setHighlightCommunity(null)}>Gaming Clásico</button>
              <button className="pill-btn irl" onMouseEnter={() => setHighlightCommunity(0)} onMouseLeave={() => setHighlightCommunity(null)}>IRL y Eventos</button>
              <button className="pill-btn variety" onMouseEnter={() => setHighlightCommunity(3)} onMouseLeave={() => setHighlightCommunity(null)}>Variety</button>
            </div>
          </div>

          <div className="slide-block">
            <button
              className={`interactive-btn ${highlightNodes ? 'active' : ''}`}
              style={{ background: '#3b82f6' }}
              onClick={() => {
                const cliqueNodes = ['QuantumFracture', 'Javier Santaolalla', 'La Gata de Schrodinger'];
                setHighlightNodes(highlightNodes ? null : cliqueNodes);
              }}
            >
              <Target size={16} /> Ver Clique: Ciencia y Divulgación
            </button>
            <ul className="talking-points mini">
              <li>Subgrupos: <strong>39 cliques</strong> encontrados.</li>
              <li>Ejemplo: Trío de Física y Divulgación.</li>
            </ul>
          </div>

          <div className="slide-block">
            <button
              className={`interactive-btn ${viewMode === 'betweenness' ? 'active' : ''}`}
              onClick={() => setViewMode('betweenness')}
            >
              <Target size={16} /> Destacar Nodos Puente (Betweenness)
            </button>
            <p style={{ marginTop: '10px', fontSize: '1.1rem' }}>Canales aislados vs <strong>Estratégicos (Ibai, Jordi Wild)</strong>.</p>
          </div>

          <div className="slide-block final">
            <ul className="talking-points">
              <li><strong>Limitaciones:</strong> Foto fija, sin evolución temporal.</li>
              <li><strong>Conclusión:</strong> Estructura jerarquizada y estable.</li>
              <li><strong>Idea Fuerza:</strong> Matemática de una red social madura.</li>
            </ul>
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid #ffffff22', paddingTop: '15px' }}>
            <button
              className={`interactive-btn outline ${viewMode === 'normal' ? 'active' : ''}`}
              onClick={() => { setViewMode('normal'); setHighlightCommunity(null); setHighlightNodes(null); }}
            >
              <Crosshair size={16} /> Restablecer vista
            </button>
          </div>

        </div>
      )
    }
  ];

  const isPanelOpen = activeSection !== null;
  const activeData = isPanelOpen ? sections[activeSection] : null;

  return (
    <>
      {/* ── Scattered Triggers (Visible only when panel is closed) ── */}
      <div style={{
        opacity: isPanelOpen ? 0 : 1,
        pointerEvents: isPanelOpen ? 'none' : 'auto',
        transition: 'opacity 0.4s ease'
      }}>
        {sections.map(sec => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className="glass-panel pulse-border"
            style={{
              position: 'absolute',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 18px',
              border: `1px solid ${sec.color}66`,
              background: 'rgba(6, 12, 24, 0.7)',
              color: '#e2e8f0',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '0.95rem',
              boxShadow: `0 0 15px ${sec.color}22`,
              ...sec.buttonPos
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 25px ${sec.color}66`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 15px ${sec.color}22`}
          >
            <div style={{ color: sec.color }}>{sec.icon}</div>
            {sec.shortTitle}
          </button>
        ))}
      </div>

      {/* ── Left Half-Screen Presentation Sidebar ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50vw',
          height: '100vh',
          background: 'rgba(6, 12, 24, 0.95)',
          borderRight: `2px solid ${activeData?.color || 'var(--cyan)'}`,
          boxShadow: `10px 0 50px ${activeData?.color || 'transparent'}33`,
          zIndex: 40,
          transform: isPanelOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 60px',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}
      >
        {activeData && (
          <div className="animate-fadein" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ color: activeData.color, background: `${activeData.color}15`, padding: 12, borderRadius: 12 }}>
                  {activeData.icon}
                </div>
                <h2 style={{
                  margin: 0,
                  fontSize: '2rem',
                  color: '#fff',
                  fontFamily: 'Orbitron, sans-serif',
                  textShadow: `0 0 10px ${activeData.color}55`
                }}>
                  {activeData.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveSection(null)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: 8,
                  borderRadius: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Script Text */}
            <div style={{
              flex: 1,
              fontSize: '1.25rem',
              lineHeight: 1.8,
              color: '#cbd5e1',
              fontFamily: 'Inter, sans-serif'
            }}>
              {activeData.content}
            </div>

            {/* Navigation Controls */}
            <div style={{
              marginTop: 40,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <button
                disabled={activeSection === 0}
                onClick={() => setActiveSection(activeSection - 1)}
                style={{
                  opacity: activeSection === 0 ? 0.3 : 1,
                  pointerEvents: activeSection === 0 ? 'none' : 'auto',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '1rem'
                }}
              >
                <ChevronLeft size={18} /> Anterior
              </button>

              <button
                disabled={activeSection === sections.length - 1}
                onClick={() => setActiveSection(activeSection + 1)}
                style={{
                  opacity: activeSection === sections.length - 1 ? 0.3 : 1,
                  pointerEvents: activeSection === sections.length - 1 ? 'none' : 'auto',
                  background: `${activeData.color}33`,
                  border: `1px solid ${activeData.color}`,
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                Siguiente <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Image Zoom Overlay ── */}
      {enlargedImage && (
        <div
          className="image-zoom-overlay animate-fadein"
          onClick={() => setEnlargedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            boxSizing: 'border-box'
          }}
        >
          <div className="zoom-content" onClick={e => e.stopPropagation()}>
            <div className="zoom-header">
              <h3>{enlargedImage.title}</h3>
              <button onClick={() => setEnlargedImage(null)}><X size={24} /></button>
            </div>
            <img src={enlargedImage.src} alt={enlargedImage.title} />
          </div>
        </div>
      )}

      {/* Global styles for the script paragraphs and UI actions */}
      <style>{`
        .script-content p {
          margin-bottom: 24px;
        }

        .stats-table-wrapper {
          margin-top: 15px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(15, 23, 42, 0.3);
        }

        .stats-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
        }

        .stats-table th {
          background: rgba(52, 211, 153, 0.2);
          color: #34d399;
          text-align: left;
          padding: 12px 15px;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(52, 211, 153, 0.3);
        }

        .stats-table td {
          padding: 10px 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #cbd5e1;
          line-height: 1.4;
        }

        .stats-table tr:last-child td {
          border-bottom: none;
        }

        .stats-table tr:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .stats-table td:nth-child(2) {
          font-family: 'Orbitron', sans-serif;
          color: #fff;
          font-weight: bold;
          width: 80px;
        }

        .stats-table td.highlight {
          color: #34d399;
        }
        
        .slide-block {
          background: rgba(255, 255, 255, 0.03);
          border-left: 3px solid rgba(255, 255, 255, 0.1);
          padding: 16px 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          transition: all 0.3s;
        }
        
        .slide-block:hover {
          background: rgba(255, 255, 255, 0.05);
          border-left-color: #a855f7;
        }

        .slide-block p {
          margin-bottom: 0 !important;
          font-size: 1.15rem;
        }

        .interactive-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #a855f7;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          margin-bottom: 12px;
          transition: all 0.2s;
          box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
        }

        .interactive-btn:hover {
          background: #c084fc;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(168, 85, 247, 0.4);
        }

        .interactive-btn.outline {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: none;
        }

        .interactive-btn.outline:hover {
          background: rgba(255,255,255,0.1);
        }

        .community-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 12px;
        }

        .pill-btn {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pill-btn:hover {
          transform: scale(1.05);
        }

        .pill-btn.science:hover { background: #f59e0b; border-color: #f59e0b; }
        .pill-btn.latam:hover { background: #a855f7; border-color: #a855f7; }
        .pill-btn.gaming:hover { background: #f43f5e; border-color: #f43f5e; }
        .pill-btn.irl:hover { background: #00f5ff; border-color: #00f5ff; color: black; font-weight: bold; }
        .pill-btn.variety:hover { background: #22c55e; border-color: #22c55e; }

        .talking-points {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .talking-points li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 15px;
          font-size: 1.2rem;
          line-height: 1.6;
        }

        .talking-points li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #a855f7;
          font-weight: bold;
        }

        .talking-points.mini li {
          font-size: 1rem;
          margin-bottom: 8px;
        }

        .talking-points ul {
          list-style: none;
          padding-left: 20px;
          margin-top: 5px;
        }

        .talking-points ul li {
          font-size: 1rem;
          margin-bottom: 5px;
          opacity: 0.8;
          padding-left: 15px;
        }

        .talking-points ul li::before {
          content: '•';
          color: rgba(255,255,255,0.4);
        }

        .zoom-card {
          transition: all 0.3s;
        }
        .zoom-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.08) !important;
          border-color: #f59e0b99 !important;
        }
        .zoom-icon {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(0,0,0,0.5);
          color: white;
          padding: 4px;
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .zoom-card:hover .zoom-icon {
          opacity: 1;
        }

        .zoom-content {
          background: #fff;
          padding: 15px;
          border-radius: 16px;
          width: 95vw;
          height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 40px 100px rgba(0,0,0,0.7);
        }

        .zoom-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          color: #1e293b;
        }

        .zoom-header h3 {
          margin: 0;
          font-family: 'Orbitron', sans-serif;
          font-size: 1.1rem;
        }

        .zoom-header button {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .zoom-header button:hover {
          color: #f43f5e;
        }

        .zoom-content img {
          flex: 1;
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }

      `}</style>
    </>
  )
}
