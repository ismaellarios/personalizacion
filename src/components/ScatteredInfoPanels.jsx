import { Target, BarChart2, Crosshair, Users, X, ChevronRight, ChevronLeft } from 'lucide-react'

const sections = [
  {
    id: 0,
    buttonPos: { top: 16, left: 16 },
    title: 'Persona 1: Introducción',
    shortTitle: 'Introducción',
    icon: <Target size={20} />,
    color: 'var(--cyan)',
    content: (
      <div className="script-content">
        <p>“Hola, somos [nombres del equipo] y hoy vamos a presentar nuestro análisis de la red de YouTube hispano.</p>
        <p>La idea principal de este trabajo fue estudiar cómo se conectan los creadores entre sí. Muchas veces vemos un canal por separado, pero aquí quisimos mirar el conjunto completo, como una red.</p>
        <p>En esta red, cada canal es un nodo y cada relación entre canales es una conexión. Con eso, podemos responder preguntas como:<br/>
        • qué canales son más importantes,<br/>
        • qué canales unen grupos,<br/>
        • y cómo se organiza toda la comunidad.</p>
        <p>Nuestro objetivo fue entender no solo quién tiene más conexiones, sino también quién ocupa una posición clave dentro de la red.</p>
        <p>Ahora vamos a explicar cómo hicimos el análisis y qué resultados encontramos.”</p>
      </div>
    )
  },
  {
    id: 1,
    buttonPos: { top: 16, right: 16 },
    title: 'Persona 2: Metodología',
    shortTitle: 'Metodología',
    icon: <BarChart2 size={20} />,
    color: '#34d399',
    content: (
      <div className="script-content">
        <p>“Primero cargamos los datos desde un archivo de red. Después revisamos datos básicos: número de nodos, número de conexiones y tipo de red.</p>
        <p>Luego calculamos métricas globales para entender la red completa. Por ejemplo, medimos densidad, componentes, distancia media y diámetro. Estas métricas nos ayudan a saber si la red está muy conectada o si está separada en partes.</p>
        <p>También estudiamos el grado de cada nodo. El grado es cuántas conexiones tiene cada canal. Así vimos qué nodos tienen pocas conexiones y cuáles tienen muchas.</p>
        <p>Después aplicamos centralidades, sobre todo degree y betweenness. Degree nos dice qué nodos están más conectados. Betweenness nos dice qué nodos están en medio de muchos caminos y conectan grupos.</p>
        <p>Finalmente usamos Louvain para detectar comunidades. Eso nos permitió encontrar grupos de canales que están más conectados entre sí.”</p>
      </div>
    )
  },
  {
    id: 2,
    buttonPos: { bottom: 16, left: 16 },
    title: 'Persona 3: Resultados principales',
    shortTitle: 'Resultados',
    icon: <Crosshair size={20} />,
    color: '#f59e0b',
    content: (
      <div className="script-content">
        <p>“Los resultados muestran varias cosas importantes.</p>
        <p>Primero, no todos los nodos cumplen el mismo papel. Algunos tienen muchas conexiones y otros tienen menos, pero aun así son clave porque unen comunidades.</p>
        <p>Segundo, encontramos nodos puente. Un nodo puente es un canal que conecta grupos distintos. Si ese nodo desaparece, la comunicación entre grupos se vuelve más difícil.</p>
        <p>Tercero, detectamos comunidades claras dentro de la red. Eso significa que hay grupos de canales que comparten más relaciones entre ellos que con el resto.</p>
        <p>También vimos que la red tiene una estructura desigual: hay pocos nodos muy importantes y muchos nodos más pequeños. Este patrón es común en redes sociales reales.</p>
        <p>En resumen, no basta con mirar el tamaño de un canal. Su posición en la red también influye mucho en su impacto.”</p>
      </div>
    )
  },
  {
    id: 3,
    buttonPos: { bottom: 16, right: 16 },
    title: 'Persona 4: Conclusión y cierre',
    shortTitle: 'Conclusión',
    icon: <Users size={20} />,
    color: '#a855f7',
    content: (
      <div className="script-content">
        <p>“Como conclusión, este análisis muestra que YouTube hispano funciona como un sistema conectado.</p>
        <p>La red no está formada por canales aislados. Está formada por grupos, conexiones y nodos que hacen de enlace.</p>
        <p>Por eso, entender la estructura de la red ayuda a explicar mejor cómo se mueve la información y por qué algunos canales tienen más alcance que otros.</p>
        <p>También hay limitaciones. Este análisis es una foto de un momento específico y no incluye cambios en el tiempo. Como mejora futura, sería útil agregar datos temporales y métricas de interacción, como comentarios o participación.</p>
        <p>Para terminar, nuestra idea principal es esta: en una red social, importa tanto cuántas conexiones tienes como dónde estás ubicado en la red.</p>
        <p>Muchas gracias por escuchar. Ahora, si quieren, respondemos preguntas.”</p>
      </div>
    )
  }
]

export default function ScatteredInfoPanels({ activeSection, setActiveSection }) {
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
      
      {/* Global styles for the script paragraphs */}
      <style>{`
        .script-content p {
          margin-bottom: 24px;
        }
      `}</style>
    </>
  )
}
