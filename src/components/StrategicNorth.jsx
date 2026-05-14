import { useState, useRef, useEffect } from 'react'
import './StrategicNorth.css'

const ITEMS = [
    {
        id: 'mision',
        title: 'Misión',
        text: 'Ser un Centro de Pensamiento que ofrece servicios de investigación social y sistematización de experiencias, formación, capacitación, asesorías y consultorías a actores sociales, estatales, gubernamentales y públicos, con el objetivo de fortalecer su capacidad de incidencia en la toma de decisiones públicas.',
    },
    {
        id: 'vision',
        title: 'Visión',
        text: 'Convertirnos en uno de los referentes más importantes para la generación de conocimientos sociales que fortalezcan las capacidades comunitarias, populares y ciudadanas de los actores políticos y que hagan posible un desarrollo más integral de la democracia colombiana.',
    },
]

function StrategicNorth() {
    const [openId, setOpenId] = useState(null)
    const sectionRef = useRef(null)

    // Cerrar al clickear afuera (solo en mobile / cuando se activa por click)
    useEffect(() => {
        if (!openId) return
        const handleClickOutside = (event) => {
            if (sectionRef.current && !sectionRef.current.contains(event.target)) {
                setOpenId(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [openId])

    const handleToggle = (id) => {
        setOpenId((current) => (current === id ? null : id))
    }

    return (
        <section
            ref={sectionRef}
            className="sn"
            aria-labelledby="sn-title"
        >
            {/* Capas de fondo decorativas */}
            <div className="sn-bg" aria-hidden="true" />
            <div className="sn-grain" aria-hidden="true" />

            <div className="sn-container">
                <header className="sn-header">
                
                    <h2 id="sn-title" className="sn-title">
                        Misión y Visión
                    </h2>
                    <p className="sn-lead">
                        Dos declaraciones que orientan todo lo que hacemos.
                        Pase el cursor o toque cada burbuja para conocer más.
                    </p>
                </header>

                <div
                    className={`sn-stage ${openId ? `sn-stage--${openId}` : ''}`}
                    onMouseLeave={() => setOpenId(null)}
                >
                    {ITEMS.map((item) => {
                        const isOpen = openId === item.id
                        return (
                            <article
                                key={item.id}
                                className={`sn-card sn-card--${item.id} ${isOpen ? 'is-open' : ''}`}
                                onMouseEnter={() => setOpenId(item.id)}
                                onClick={() => handleToggle(item.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        handleToggle(item.id)
                                    }
                                    if (e.key === 'Escape') setOpenId(null)
                                }}
                                tabIndex={0}
                                role="button"
                                aria-expanded={isOpen}
                            >
                                {/* Borde animado con gradiente cónico — la "firma visual" */}
                                <div className="sn-card-border" aria-hidden="true" />

                                {/* Contenido principal */}
                                <div className="sn-card-body">
                                    <span className="sn-card-index" aria-hidden="true">
                                        {item.index}
                                    </span>

                                    <h3 className="sn-card-title">
                                        {item.title}
                                    </h3>
                                    <h2 className="sn-card-bigtitle">{item.title}</h2>
                                    {/* Glifo geométrico — la "firma conceptual" de cada card.
                                        Visible en estado cerrado, se desvanece al abrir. */}
                                    <div className="sn-card-glyph" aria-hidden="true">
                                        {item.id === 'mision' ? (
                                            // Diana concéntrica: un objetivo, dirección, acción precisa.
                                            <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                                                {/* Anillos concéntricos */}
                                                <circle cx="60" cy="60" r="54" opacity="0.25" />
                                                <circle cx="60" cy="60" r="40" opacity="0.4" />
                                                <circle cx="60" cy="60" r="26" opacity="0.6" />
                                                <circle cx="60" cy="60" r="12" opacity="0.85" />
                                                {/* Punto al centro: el objetivo */}
                                                <circle cx="60" cy="60" r="3" fill="currentColor" stroke="none" />
                                                {/* Línea diagonal que cruza: la trayectoria, la acción */}
                                                <line x1="14" y1="106" x2="106" y2="14" strokeWidth="1" opacity="0.55" />
                                                {/* Marca al final de la línea */}
                                                <line x1="100" y1="14" x2="106" y2="14" opacity="0.7" />
                                                <line x1="106" y1="14" x2="106" y2="20" opacity="0.7" />
                                            </svg>
                                        ) : (
                                            // Horizonte con sol naciente: lo que se ve más allá.
                                            <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                                                {/* Línea de horizonte */}
                                                <line x1="6" y1="78" x2="114" y2="78" opacity="0.6" />
                                                {/* Sol/arco naciente, semicírculo emergiendo del horizonte */}
                                                <path d="M 30 78 A 30 30 0 0 1 90 78" opacity="0.85" />
                                                {/* Rayos del sol (5 líneas que se abren hacia arriba) */}
                                                <line x1="60" y1="32" x2="60" y2="14" opacity="0.55" className="sn-glyph-ray sn-glyph-ray--1" />
                                                <line x1="42" y1="38" x2="32" y2="22" opacity="0.5" className="sn-glyph-ray sn-glyph-ray--2" />
                                                <line x1="78" y1="38" x2="88" y2="22" opacity="0.5" className="sn-glyph-ray sn-glyph-ray--3" />
                                                <line x1="28" y1="52" x2="14" y2="44" opacity="0.4" className="sn-glyph-ray sn-glyph-ray--4" />
                                                <line x1="92" y1="52" x2="106" y2="44" opacity="0.4" className="sn-glyph-ray sn-glyph-ray--5" />
                                                {/* Reflejo sutil debajo del horizonte */}
                                                <path d="M 36 84 L 84 84" opacity="0.25" strokeDasharray="2 4" />
                                            </svg>
                                        )}
                                    </div>

                                    <div className="sn-card-reveal">
                                        <div className="sn-card-divider" aria-hidden="true" />
                                        <p className="sn-card-text">
                                            {item.text}
                                        </p>
                                        <div className="sn-card-hint" aria-hidden="true">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"/>
                                                <polyline points="12 5 19 12 12 19"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Indicador de estado cerrado (un "+" sutil que invita) */}
                                <span className="sn-card-trigger" aria-hidden="true">
                                    <span></span>
                                    <span></span>
                                </span>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default StrategicNorth
