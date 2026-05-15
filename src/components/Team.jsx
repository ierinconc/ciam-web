import { useState, useEffect, useRef, useCallback } from 'react'
import './Team.css'

/**
 * Team — Página /equipo de CIAM.
 *
 * Patch 17:
 *  - Fondo CSS puro Opción 2 (manchas + grano + constelación tenue).
 *  - 4 miembros en fila (desktop), 2x2 (tablet), columna (mobile).
 *  - SIN jerarquía visual: todos al mismo tamaño y tratamiento.
 *  - David primero por orden visual, pero al mismo nivel.
 *  - Cada avatar: anillo cónico animado violeta-dorado + badge dorado con
 *    glifo SVG (compás, lupa, ondas, pluma).
 *  - Sebastián sin avatar → placeholder con texto "Próximamente".
 *  - Click en cualquier miembro → modal con bio (placeholder editable).
 *  - Accesibilidad: focus trap, ESC, click fuera, ARIA, scroll-lock.
 *  - Microcopy editorial coherente con el resto del sitio.
 */

// ============================================================
// DATOS DEL EQUIPO — editar libremente cuando lleguen las bios reales
// ============================================================
const teamData = [
    {
        id: 'david',
        name: 'David Rincón Cerquera',
        role: 'Director Ejecutivo y Representante Legal',
        avatar: '/team/david.webp',
        avatarLarge: '/team/david-large.webp',
        cv: '/team/cv/david.pdf',
        icon: 'compass',
        bio: [
            'Politólogo de la Universidad Nacional de Colombia con trayectoria en gestión pública territorial y distrital. Ha trabajado en la formulación, implementación y seguimiento de políticas públicas con enfoque diferencial, especialmente para sectores LGBTI y poblaciones de niñez y adolescencia.',
            'Actualmente se desempeña como asesor del director general de la Unidad Nacional de Protección (abril de 2026 — actualidad). Su experiencia previa incluye la Secretaría Distrital de Integración Social y la Alcaldía de Sopó, donde lideró la formulación de la Política Pública de Primera Infancia, Infancia y Adolescencia 2026–2036.',
            'En CIAM se ha vinculado como investigador asociado en líneas de democracia, participación juvenil y análisis de coyuntura, con producción de informes sobre prensa, discurso y política.',
        ],
        education: 'Politólogo, Universidad Nacional de Colombia · Diplomado en Construcción de Paz y Derechos Humanos',
        focus: ['Política pública', 'Enfoque diferencial', 'Análisis de coyuntura', 'Gestión territorial'],
    },
    {
        id: 'daniel',
        name: 'Daniel Cerón Urrutia',
        role: 'Director de Investigaciones',
        avatar: '/team/daniel.webp',
        avatarLarge: '/team/daniel-large.webp',
        cv: '/team/cv/daniel.pdf',
        icon: 'magnifier',
        bio: [
            'Politólogo de la Universidad Nacional de Colombia y maestrante en Filosofía Latinoamericana de la Universidad Santo Tomás de Aquino. Su trabajo articula investigación académica, sistematización de experiencias y pedagogía crítica, con énfasis en conflictos territoriales y socioambientales, teoría política, teoría decolonial y procesos de paz en Colombia.',
            'Actualmente es asesor senior de investigación cualitativa para la evaluación de políticas públicas en el Departamento Nacional de Planeación. Su trayectoria reciente incluye trabajo investigativo con la Fundación Foro Cívico, gestión territorial en laboratorios de transformación cultural y procesos formativos con personas mayores. Ha publicado capítulos de libro, artículos de revista y cartillas de formación.',
            'En CIAM dirigió la línea de investigaciones durante 2025, coordinando la producción editorial del centro y los análisis sobre la Consulta Popular, la Reforma Social del Estado y el reclutamiento forzado en el Chocó.',
        ],
        education: 'Politólogo, Universidad Nacional de Colombia · Maestrante en Filosofía Latinoamericana, Universidad Santo Tomás · Diplomado en Atención Integral a Personas Mayores, CIDE',
        focus: ['Teoría política', 'Teoría decolonial', 'Conflictos territoriales', 'Investigación cualitativa', 'Pedagogía crítica'],
    },
    {
        id: 'sebastian',
        name: 'Sebastián Ciendua',
        role: 'Director de Comunicaciones',
        avatar: '/team/sebastian.webp',
        avatarLarge: '/team/sebastian-large.webp',
        cv: '/team/cv/sebastian.pdf',
        icon: 'waves',
        bio: [
            'Politólogo de la Universidad Nacional de Colombia, especializado en análisis, coordinación y gestión de proyectos sociales. Su trabajo combina investigación social, comunicación política y organizacional con experiencia en ayuda humanitaria, relaciones públicas y coordinación de equipos.',
            'Como Director de Comunicaciones del CIAM, dirige el diseño de la imagen corporativa, la formulación e implementación de la estrategia de comunicaciones digitales y el posicionamiento de la oferta de servicios del centro. Su trabajo incluye la producción audiovisual para difundir la investigación del CIAM y adaptarla a sus públicos objetivo, así como la gestión de las relaciones públicas y la cooperación organizacional.',
            'Coordinó el grupo estudiantil LUPA (Laboratorio Universitario para Análisis de Coyuntura) durante su formación en la Universidad Nacional. Ha sido mediador voluntario de la Unidad de Búsqueda de Personas Dadas por Desaparecidas y coordinador de proyectos en la Fundación Comunidad Viva.',
        ],
        education: 'Politólogo, Universidad Nacional de Colombia · Análisis de Datos, Alura/Oracle',
        focus: ['Comunicación política', 'Investigación social', 'Estrategia digital', 'Producción audiovisual', 'Coordinación de proyectos'],
    },
    {
        id: 'vonny',
        name: 'Vonny Sánchez',
        role: 'Cofundadora e Investigadora',
        avatar: '/team/vonny.webp',
        avatarLarge: '/team/vonny-large.webp',
        cv: '/team/cv/vonny.pdf',
        icon: 'feather',
        bio: [
            'Politóloga de la Universidad Nacional de Colombia, cofundadora del CIAM y pedagoga popular y comunitaria con énfasis en género, comunicación política y ecofeminismos. Ha coordinado escuelas de formación itinerantes y procesos de articulación de movimientos sociales feministas, marikas y disidentes de género.',
            'Su trabajo ha estado vinculado al diseño de estrategias de comunicación para movimientos sociales, al análisis de la securitización del espacio público y a la pedagogía del cuidado colectivo en escenarios de movilización. Ha sido gestora territorial de la Política Pública LGBTI en Puente Aranda y Los Mártires con la Secretaría Distrital de Integración Social.',
            'En CIAM ha liderado las líneas de investigación en género, movimientos sociales y comunicación política, así como la construcción de proyectos para cooperación internacional.',
        ],
        education: 'Politóloga, Universidad Nacional de Colombia',
        focus: ['Género y disidencias', 'Pedagogía popular', 'Comunicación para movimientos sociales', 'Ecofeminismos', 'Política pública LGBTI'],
    },
]

// ============================================================
// GLIFOS SVG — Íconos del badge dorado de cada miembro
// Trazo 1.5px, viewBox 24x24, stroke-linecap round (consistencia)
// ============================================================
const Icons = {
    // Compás (David — orientación, dirección)
    compass: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M16 8l-2.5 5.5L8 16l2.5-5.5L16 8z" />
        </svg>
    ),
    // Lupa (Daniel — investigación)
    magnifier: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6" />
            <line x1="15" y1="15" x2="19.5" y2="19.5" />
        </svg>
    ),
    // Ondas concéntricas (Sebastián — comunicación)
    waves: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <path d="M8 12a4 4 0 0 1 8 0" />
            <path d="M5 12a7 7 0 0 1 14 0" />
        </svg>
    ),
    // Pluma (Vonny — autoría, investigación escrita)
    feather: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 4c-3 0-7 1.5-10 4.5C7 11.5 5.5 15 5.5 18l3-3" />
            <path d="M16 8l-7 7" />
            <path d="M5.5 18l-1.5 1.5" />
        </svg>
    ),
}

function Team() {
    const [selectedId, setSelectedId] = useState(null)
    // Patch 22: capturamos posición de la card para emergencia del modal
    const [originRect, setOriginRect] = useState(null)

    const openModal = useCallback((id, rect) => {
        setOriginRect(rect)
        setSelectedId(id)
    }, [])
    const closeModal = useCallback(() => setSelectedId(null), [])

    const selectedMember = selectedId ? teamData.find((m) => m.id === selectedId) : null

    return (
        <section className="team">
            {/* ============ Fondo Opción 2: CSS puro + constelación ============ */}
            <TeamBackground />

            <div className="team-container">
                {/* ============ HEADER ============ */}
                <header className="team-header">
                    <div className="team-kicker" aria-hidden="true">
                        <span className="team-kicker-dot" />
                      
                        <span className="team-kicker-dot" />
                    </div>

                    <h1 className="team-title">
                        Equipo de trabajo
                    </h1>

                    <p className="team-lead">
                        Un equipo interdisciplinario comprometido con la investigación,
                        el análisis riguroso y la mediación para el bien público.
                    </p>

                    <div className="team-ornament" aria-hidden="true">
                        <span className="team-ornament-line team-ornament-line--purple" />
                        <span className="team-ornament-diamond" />
                        <span className="team-ornament-line team-ornament-line--gold" />
                    </div>
                </header>

                {/* ============ GRID DE MIEMBROS ============ */}
                <ul className="team-grid" role="list">
                    {teamData.map((member, i) => (
                        <li
                            key={member.id}
                            className="team-card-wrap"
                            style={{ '--team-delay': `${i * 90}ms` }}
                        >
                            <TeamCard member={member} onOpen={openModal} />
                        </li>
                    ))}
                </ul>

                {/* ============ Cierre ornamental ============ */}
                <div className="team-closer" aria-hidden="true">
                    <span className="team-closer-diamond" />
                    <span className="team-closer-diamond" />
                    <span className="team-closer-diamond" />
                </div>
            </div>

            {/* ============ MODAL ============ */}
            <TeamMemberModal member={selectedMember} originRect={originRect} onClose={closeModal} />
        </section>
    )
}

// ============================================================
// TeamCard — Tarjeta individual
// ============================================================
function TeamCard({ member, onOpen }) {
    const hasAvatar = Boolean(member.avatar)
    const buttonRef = useRef(null)

    // Patch 22: capturamos posición real del botón para que el modal emerja
    const handleClick = () => {
        const rect = buttonRef.current?.getBoundingClientRect()
        if (rect) {
            onOpen(member.id, {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            })
        } else {
            onOpen(member.id, null)
        }
    }

    return (
        <button
            ref={buttonRef}
            type="button"
            className="team-card"
            onClick={handleClick}
            aria-label={`Ver detalles de ${member.name}`}
        >
            {/* Marco con anillo cónico animado */}
            <div className={`team-avatar ${!hasAvatar ? 'team-avatar--empty' : ''}`}>
                <div className="team-avatar-ring" aria-hidden="true" />
                <div className="team-avatar-inner">
                    {hasAvatar ? (
                        <img
                            src={member.avatar}
                            alt=""
                            className="team-avatar-img"
                            loading="lazy"
                        />
                    ) : (
                        <PlaceholderSilhouette />
                    )}
                </div>

                {/* Badge dorado con ícono */}
                <div className="team-avatar-badge" aria-hidden="true">
                    {Icons[member.icon]}
                </div>
            </div>

            {/* Nombre + rol */}
            <div className="team-card-body">
                <h3 className="team-card-name">{member.name}</h3>
                <p className="team-card-role">{member.role}</p>

                {!hasAvatar && (
                    <span className="team-card-soon">Avatar próximamente</span>
                )}
            </div>

            {/* CTA sutil — "Ver perfil" */}
            <span className="team-card-cta" aria-hidden="true">
                <span>Ver perfil</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </span>
        </button>
    )
}

// ============================================================
// PlaceholderSilhouette — para Sebastián sin avatar todavía
// ============================================================
function PlaceholderSilhouette() {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="team-avatar-placeholder" aria-hidden="true">
            {/* Silueta sutil estilo crosshatch tenue para coherencia con los avatares reales */}
            <defs>
                <pattern id="silhouette-hatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="4" stroke="#5b1268" strokeWidth="0.4" opacity="0.25" />
                </pattern>
            </defs>
            <rect width="100" height="100" fill="#faf5ea" />
            <circle cx="50" cy="38" r="14" fill="url(#silhouette-hatch)" stroke="#5b1268" strokeWidth="0.5" opacity="0.6" />
            <path d="M 22 95 Q 22 65 50 62 Q 78 65 78 95 Z" fill="url(#silhouette-hatch)" stroke="#5b1268" strokeWidth="0.5" opacity="0.6" />
        </svg>
    )
}

// ============================================================
// TeamMemberModal — Modal accesible con detalles del miembro
// ============================================================
function TeamMemberModal({ member, originRect, onClose }) {
    const dialogRef = useRef(null)
    const closeBtnRef = useRef(null)
    const previousActiveElement = useRef(null)

    const isOpen = Boolean(member)

    // Lock body scroll + focus management cuando se abre
    useEffect(() => {
        if (!isOpen) return

        previousActiveElement.current = document.activeElement
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        // Mover el foco al botón cerrar tras la animación de entrada
        const t = setTimeout(() => closeBtnRef.current?.focus(), 100)

        return () => {
            clearTimeout(t)
            document.body.style.overflow = originalOverflow
            // Restaurar foco al elemento que disparó la apertura
            previousActiveElement.current?.focus?.()
        }
    }, [isOpen])

    // ESC para cerrar + focus trap
    useEffect(() => {
        if (!isOpen) return

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                onClose()
                return
            }
            if (e.key === 'Tab') {
                // Focus trap básico: mantener el foco dentro del modal
                const dialog = dialogRef.current
                if (!dialog) return
                const focusables = dialog.querySelectorAll(
                    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
                )
                if (focusables.length === 0) return
                const first = focusables[0]
                const last = focusables[focusables.length - 1]
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault()
                    last.focus()
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault()
                    first.focus()
                }
            }
        }

        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) return null

    const hasAvatar = Boolean(member.avatarLarge)

    // Patch 22: inyectamos origen para que el modal emerja desde la card
    const originStyle = originRect
        ? {
              '--origin-x': `${originRect.left + originRect.width / 2}px`,
              '--origin-y': `${originRect.top + originRect.height / 2}px`,
          }
        : {}

    return (
        <div
            className={`team-modal-overlay ${originRect ? 'has-origin' : ''}`}
            onClick={onClose}
            role="presentation"
            style={originStyle}
        >
            <div
                ref={dialogRef}
                className="team-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="team-modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón cerrar */}
                <button
                    ref={closeBtnRef}
                    type="button"
                    className="team-modal-close"
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <div className="team-modal-grid">
                    {/* Columna izquierda: avatar grande + botón CV */}
                    <div className="team-modal-media">
                        <div className="team-modal-avatar">
                            <div className="team-modal-avatar-ring" aria-hidden="true" />
                            <div className="team-modal-avatar-inner">
                                {hasAvatar ? (
                                    <img
                                        src={member.avatarLarge}
                                        alt=""
                                        className="team-modal-avatar-img"
                                    />
                                ) : (
                                    <PlaceholderSilhouette />
                                )}
                            </div>
                            <div className="team-modal-avatar-badge" aria-hidden="true">
                                {Icons[member.icon]}
                            </div>
                        </div>

                        {/* Patch 26: Botón hoja de vida (solo si hay PDF disponible) */}
                        {member.cv && (
                            <a
                                href={member.cv}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="team-modal-cv-btn"
                                aria-label={`Descargar hoja de vida de ${member.name} en PDF (se abre en nueva pestaña)`}
                            >
                                <span className="team-modal-cv-icon" aria-hidden="true">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                                        <polyline points="14 3 14 9 20 9" />
                                        <line x1="8" y1="13" x2="16" y2="13" />
                                        <line x1="8" y1="16.5" x2="13" y2="16.5" />
                                    </svg>
                                </span>
                                <span>Hoja de vida</span>
                            </a>
                        )}
                    </div>

                    {/* Columna derecha: contenido */}
                    <div className="team-modal-content">
                        <div className="team-modal-kicker">
                            <span className="team-modal-kicker-dot" />
                            <span>Perfil profesional</span>
                        </div>

                        <h2 id="team-modal-title" className="team-modal-name">
                            {member.name}
                        </h2>

                        <p className="team-modal-role">{member.role}</p>

                        <div className="team-modal-hairline" aria-hidden="true" />

                        <div className="team-modal-bio">
                            {member.bio.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        {member.focus && member.focus.length > 0 && (
                            <div className="team-modal-meta">
                                <div className="team-modal-meta-label">
                                    Áreas de interés
                                </div>
                                <ul className="team-modal-meta-tags">
                                    {member.focus.map((f, i) => (
                                        <li key={i}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {member.education && (
                            <div className="team-modal-meta">
                                <div className="team-modal-meta-label">Formación</div>
                                <p className="team-modal-meta-text">{member.education}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ============================================================
// TeamBackground — Fondo Opción 2: CSS + constelación SVG
// ============================================================
function TeamBackground() {
    return (
        <>
            <div className="team-bg" aria-hidden="true" />
            <div className="team-bg-constellation" aria-hidden="true">
                <ConstellationSVG />
            </div>
        </>
    )
}

/**
 * Constelación: red de puntos dorados conectados por líneas finas.
 * Evoca la idea de "red de pensamiento, conexiones intelectuales".
 * Construida estática pero con posiciones cuidadas, no aleatorias.
 */
function ConstellationSVG() {
    // Nodos (x, y) en porcentaje del viewport
    const nodes = [
        { x: 8, y: 12 }, { x: 22, y: 28 }, { x: 14, y: 48 },
        { x: 6, y: 68 }, { x: 18, y: 82 }, { x: 28, y: 65 },
        { x: 78, y: 16 }, { x: 92, y: 30 }, { x: 82, y: 52 },
        { x: 94, y: 70 }, { x: 76, y: 86 }, { x: 88, y: 92 },
    ]
    // Aristas: índices de nodos conectados
    const edges = [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2], [1, 5],
        [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [8, 11], [7, 9],
    ]
    return (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Aristas */}
            {edges.map(([a, b], i) => (
                <line
                    key={`e-${i}`}
                    x1={nodes[a].x}
                    y1={nodes[a].y}
                    x2={nodes[b].x}
                    y2={nodes[b].y}
                    stroke="currentColor"
                    strokeWidth="0.08"
                    opacity="0.55"
                    vectorEffect="non-scaling-stroke"
                />
            ))}
            {/* Nodos */}
            {nodes.map((n, i) => (
                <circle
                    key={`n-${i}`}
                    cx={n.x}
                    cy={n.y}
                    r="0.35"
                    fill="currentColor"
                    opacity="0.85"
                />
            ))}
        </svg>
    )
}

export default Team
