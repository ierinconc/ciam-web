import { useNavigate } from 'react-router-dom'
import './Invitations.css'

const INVITATIONS = [
    {
        id: 'servicios',
        index: '01',
        eyebrow: 'Servicios',
        title: 'Acceda a nuestros servicios',
        description:
            'Consultoría especializada, formación, comunicación estratégica e investigación social para fortalecer la incidencia pública.',
        keywords: [
            'Consultoría',
            'Formación',
            'Investigación social',
            'Comunicación',
            'Asesoría',
            'Capacitación',
            'Análisis político',
            'Incidencia pública',
        ],
        cta: 'Ver servicios',
        path: '/servicios',
        accent: 'purple', // marca el acento principal
    },
    {
        id: 'investigaciones',
        index: '02',
        eyebrow: 'Publicaciones',
        title: 'Acceda a nuestras investigaciones',
        description:
            'Análisis, ensayos y columnas sobre democracia, medios y la coyuntura política colombiana. Lecturas para quien piensa lo público.',
        keywords: [
            'Análisis',
            'Ensayos',
            'Columnas',
            'Coyuntura',
            'Democracia',
            'Medios',
            'Política',
            'Investigación',
        ],
        cta: 'Ver publicaciones',
        path: '/blog',
        accent: 'gold',
    },
]

function Invitations() {
    const navigate = useNavigate()

    return (
        <section className="inv" aria-labelledby="inv-title">
            <div className="inv-bg-image" aria-hidden="true" />
            <div className="inv-bg-overlay" aria-hidden="true" />
            <div className="inv-container">
                <header className="inv-header">
                    <span className="inv-eyebrow">§ 02 · Invitación</span>
                    <h2 id="inv-title" className="inv-title">
                        Dos puertas para <em>conocernos</em>
                    </h2>
                </header>

                <div className="inv-stack">
                    {INVITATIONS.map((item) => (
                        <article
                            key={item.id}
                            className={`inv-banner inv-banner--${item.accent}`}
                            onClick={() => navigate(item.path)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    navigate(item.path)
                                }
                            }}
                            tabIndex={0}
                            role="link"
                            aria-label={`Ir a ${item.cta}`}
                        >
                            {/* Borde animado (mismo lenguaje que StrategicNorth) */}
                            <div className="inv-banner-border" aria-hidden="true" />

                            {/* Capa de relleno que aparece al hover */}
                            <div className="inv-banner-fill" aria-hidden="true" />

                            {/* Contenido */}
                            <div className="inv-banner-grid">
                                {/* Columna 1: texto principal */}
                                <div className="inv-banner-main">
                                    <span className="inv-banner-eyebrow">
                                        {item.eyebrow}
                                    </span>

                                    {/* Título: tinta lavada → color sólido al hover */}
                                    <h3 className="inv-banner-title">
                                        {item.title}
                                        <span className="inv-banner-title-underline" aria-hidden="true" />
                                    </h3>

                                    <p className="inv-banner-desc">
                                        {item.description}
                                    </p>

                                    {/* Marquee sutil de palabras clave */}
                                    <div className="inv-banner-marquee" aria-hidden="true">
                                        <div className="inv-banner-marquee-track">
                                            {/* Duplicamos las keywords para loop sin corte */}
                                            {[...item.keywords, ...item.keywords].map((kw, i) => (
                                                <span key={i} className="inv-banner-keyword">
                                                    <span className="inv-banner-keyword-dot" />
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Columna 2: CTA */}
                                <div className="inv-banner-cta">
                                    <span className="inv-banner-cta-label">
                                        {item.cta}
                                    </span>
                                    <span className="inv-banner-cta-arrow" aria-hidden="true">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="6" y1="16" x2="26" y2="16" />
                                            <polyline points="18 8 26 16 18 24" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Invitations
