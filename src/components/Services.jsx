import { useState, useEffect, useRef, useCallback } from 'react'
import './Services.css'

/**
 * Services — Página /servicios de CIAM.
 *
 * Patch 21 — Vida en las cards + bug de modal:
 *  - Hover de tarjeta: el borde metálico se "enciende" y rota suavemente
 *    (eco del lenguaje de las burbujas Misión/Visión), el contenido escala
 *    +1.5%, el ícono crece y rota, el título y CTA crecen levemente.
 *  - Click: el modal EMERGE desde la posición de la tarjeta clickeada
 *    (no teletransporta). Usa la rect del botón origen como transform-origin
 *    + animación staged: la card se "agranda" hacia el centro y se convierte
 *    en modal.
 *  - Fix bug del modal: max-height ahora respeta el navbar, align-items
 *    cambia de center a flex-start con padding-top, X siempre visible.
 */

// ============================================================
// DATOS DE SERVICIOS — fieles al brochure oficial CIAM 2025
// ============================================================
const servicesData = [
    {
        id: 'consultorias-asesorias',
        number: '01',
        name: 'Consultorías y Asesorías',
        icon: 'compass',
        tagline:
            'Estrategias basadas en análisis riguroso para la toma de decisiones y la gestión de proyectos.',
        description: [
            'Implementamos estrategias basadas en la eficiencia para optimizar procesos, mejorar la productividad y facilitar la toma de decisiones informadas dentro de su organización.',
            'Aplicamos metodologías avanzadas de la investigación social para interpretar datos de manera amplia y compleja, proporcionando información clave que impulsa el desarrollo estratégico y la innovación.',
            'Diseñamos, estructuramos y gestionamos proyectos a medida, garantizando su viabilidad, eficiencia y alineación con los objetivos de cada organización.',
        ],
        lines: [
            'Gestión operativa y toma de decisiones',
            'Análisis cuantitativo y cualitativo',
            'Gestión y diseño de proyectos',
        ],
    },
    {
        id: 'formacion-capacitacion',
        number: '02',
        name: 'Formación y Capacitación',
        icon: 'book',
        tagline:
            'Programas de formación y acompañamiento para líderes, lideresas, equipos y grupos focales.',
        description: [
            'Diseñamos e implementamos programas de formación y acompañamiento para líderes y lideresas en ámbitos políticos, comunitarios, sindicales, gremiales, empresariales y de partidos políticos.',
            'A partir de enfoques propios de la ciencia política, la economía y la investigación social, fortalecemos las competencias para la toma de decisiones, la construcción de consensos y la gestión de iniciativas estratégicas en cada sector.',
        ],
        lines: [
            'Fortalecimiento de capacidades de liderazgo',
            'Acompañamiento a equipos y grupos focales',
            'Construcción de consensos y toma de decisiones',
        ],
    },
    {
        id: 'comunicacion-difusion',
        number: '03',
        name: 'Comunicación y Difusión',
        icon: 'waves',
        tagline:
            'Asesoría especializada en comunicación política y estratégica, interna y externa.',
        description: [
            'Brindamos asesoría especializada para el diseño e implementación de estrategias de comunicación efectivas, tanto en el ámbito interno como externo.',
            'Nuestro enfoque abarca la gestión de canales de difusión, el posicionamiento en redes sociales y la construcción de comunidades, ya sean de carácter masivo o dirigidas a públicos específicos.',
            'A través de un análisis del contexto político y social, facilitamos la creación de mensajes alineados con los objetivos institucionales, fortaleciendo la influencia, la visibilidad y el impacto de cada organización.',
        ],
        lines: [
            'Comunicación política y estratégica',
            'Gestión de canales y posicionamiento en redes',
            'Construcción de comunidades y audiencias',
        ],
    },
    {
        id: 'investigacion-sistematizacion',
        number: '04',
        name: 'Investigación Social y Sistematización de Experiencias',
        icon: 'magnifier',
        tagline:
            'Investigación social aplicada y sistematización de experiencias con rigor metodológico.',
        description: [
            'Producimos informes detallados sobre el contexto político, social y económico, identificando tendencias, riesgos y oportunidades para la toma de decisiones estratégicas.',
            'Desarrollamos escritos de opinión, ensayos y estudios prospectivos, con un enfoque crítico y fundamentado en el análisis político y social, anticipando escenarios futuros y brindando recomendaciones que orientan la planificación.',
            'Diseñamos y organizamos bases de datos estructuradas, recopilamos, procesamos y analizamos información de fuentes primarias y secundarias, garantizando su sistematización con herramientas especializadas (Power BI, ATLAS.ti, Looker Studio).',
        ],
        lines: [
            'Informes de análisis de coyuntura',
            'Escritos de opinión, ensayos y estudios prospectivos',
            'Bases de datos y análisis de fuentes',
        ],
    },
]

// ============================================================
// GLIFOS SVG
// ============================================================
const Icons = {
    compass: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M16 8l-2.5 5.5L8 16l2.5-5.5L16 8z" />
        </svg>
    ),
    book: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5v-12z" />
            <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 0 1.5-1.5v-12z" />
            <line x1="6.5" y1="8" x2="9" y2="8" />
            <line x1="6.5" y1="11" x2="9" y2="11" />
            <line x1="15" y1="8" x2="17.5" y2="8" />
            <line x1="15" y1="11" x2="17.5" y2="11" />
        </svg>
    ),
    waves: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <path d="M8 12a4 4 0 0 1 8 0" />
            <path d="M5 12a7 7 0 0 1 14 0" />
        </svg>
    ),
    magnifier: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6" />
            <line x1="15" y1="15" x2="19.5" y2="19.5" />
            <line x1="8" y1="10.5" x2="13" y2="10.5" />
            <line x1="10.5" y1="8" x2="10.5" y2="13" />
        </svg>
    ),
    download: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    ),
    arrow: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    ),
    whatsapp: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    ),
}

const BROCHURE_PATH = '/brochure-ciam.pdf'
const CONTACT_EMAIL = 'centrociammedios@gmail.com'
const CONTACT_PHONE_DISPLAY = '+57 302 571 1196'
const CONTACT_PHONE_E164 = '573025711196'

// ============================================================
// Componente principal
// ============================================================
function Services() {
    const [selectedId, setSelectedId] = useState(null)
    // Guardamos la posición de la card que se clickeó para la animación
    // "emergente" del modal — esto le permite al modal aparecer DESDE
    // donde estaba la card, no del centro como teletransportación.
    const [originRect, setOriginRect] = useState(null)

    const openModal = useCallback((id, rect) => {
        setOriginRect(rect)
        setSelectedId(id)
    }, [])

    const closeModal = useCallback(() => {
        setSelectedId(null)
        // originRect se mantiene hasta que termine la animación de salida
    }, [])

    const selectedService = selectedId
        ? servicesData.find((s) => s.id === selectedId)
        : null

    return (
        <section className="services">
            <div className="services-bg" aria-hidden="true" />
            <div className="services-bg-overlay" aria-hidden="true" />
            <div className="services-bg-grain" aria-hidden="true" />

            <div className="services-container">
                {/* HEADER */}
                <header className="services-header">
                    <h1 className="services-title">Servicios</h1>
                    <p className="services-lead">
                        Ofrecemos servicios de investigación social, formación,
                        comunicación y consultoría a actores sociales, estatales,
                        gubernamentales y públicos, con el fin de fortalecer su
                        capacidad de incidencia en la toma de decisiones públicas.
                    </p>
                    <div className="services-ornament" aria-hidden="true">
                        <span className="services-ornament-line services-ornament-line--purple" />
                        <span className="services-ornament-diamond" />
                        <span className="services-ornament-line services-ornament-line--gold" />
                    </div>
                </header>

                {/* INTRO */}
                <div className="services-grid-intro">
                    <h2 className="services-grid-title">
                        Conoce nuestros servicios
                    </h2>
                    <p className="services-grid-sub">
                        Cuatro líneas de trabajo articuladas por una misma metodología:
                        el análisis de coyuntura aplicado a la incidencia pública.
                    </p>
                </div>

                {/* GRILLA */}
                <ul className="services-grid" role="list">
                    {servicesData.map((service, i) => (
                        <li
                            key={service.id}
                            className="services-card-wrap"
                            style={{ '--services-delay': `${i * 90}ms` }}
                        >
                            <ServiceCard service={service} onOpen={openModal} />
                        </li>
                    ))}
                </ul>

                {/* CATÁLOGO */}
                <div className="services-catalog-wrap">
                    <a
                        href={BROCHURE_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="services-catalog"
                        aria-label="Descargar portafolio de servicios CIAM en PDF (se abre en nueva pestaña)"
                    >
                        <span className="services-catalog-text">
                            ¿Quieres conocer todo a fondo? Descarga el portafolio completo
                        </span>
                        <span className="services-catalog-cta" aria-hidden="true">
                            <span>PDF</span>
                            <span className="services-catalog-cta-icon">
                                {Icons.download}
                            </span>
                        </span>
                    </a>
                </div>

                <div className="services-closer" aria-hidden="true">
                    <span className="services-closer-diamond" />
                    <span className="services-closer-diamond" />
                    <span className="services-closer-diamond" />
                </div>

                {/* CONTACTO (WhatsApp primero, correo debajo, juntos) */}
                <div className="services-contact">
                    <p className="services-contact-text">
                        Escríbenos si te interesa conocer más
                    </p>

                    <a
                        href={`https://wa.me/${CONTACT_PHONE_E164}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="services-contact-whatsapp-btn"
                        aria-label={`Escribir por WhatsApp a ${CONTACT_PHONE_DISPLAY} (se abre en nueva pestaña)`}
                    >
                        <span className="services-contact-whatsapp-logo" aria-hidden="true">
                            {/* Logo oficial de WhatsApp */}
                            <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill="#FFFFFF"
                                    d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.183 8.183 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1.01 2.54.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"
                                />
                                <path
                                    fill="#25D366"
                                    d="M20.5 3.49A11.815 11.815 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.09.55 4.13 1.59 5.93L0 24l6.33-1.66a11.876 11.876 0 0 0 5.71 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.44-8.41zM12.05 21.79h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.87 9.87 0 0 1-1.51-5.26c0-5.44 4.43-9.87 9.88-9.87a9.8 9.8 0 0 1 6.98 2.89c1.87 1.87 2.9 4.34 2.9 6.98-.01 5.45-4.43 9.9-9.87 9.9z"
                                />
                            </svg>
                        </span>
                        <span className="services-contact-whatsapp-text-wrap">
                            <span className="services-contact-whatsapp-eyebrow">WhatsApp</span>
                            <span className="services-contact-whatsapp-number">{CONTACT_PHONE_DISPLAY}</span>
                        </span>
                    </a>

                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="services-contact-email"
                    >
                        {CONTACT_EMAIL}
                    </a>
                </div>
            </div>

            {/* MODAL emergente */}
            <ServiceModal
                service={selectedService}
                originRect={originRect}
                onClose={closeModal}
            />
        </section>
    )
}

// ============================================================
// ServiceCard — vida al hover + captura origen al click
// ============================================================
function ServiceCard({ service, onOpen }) {
    const buttonRef = useRef(null)

    const handleClick = () => {
        // Capturamos la posición y dimensiones reales del botón en pantalla
        // para que el modal emerja DESDE aquí.
        const rect = buttonRef.current?.getBoundingClientRect()
        if (rect) {
            onOpen(service.id, {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            })
        } else {
            onOpen(service.id, null)
        }
    }

    return (
        <button
            ref={buttonRef}
            type="button"
            className="services-card"
            onClick={handleClick}
            aria-label={`Ver detalles de ${service.name}`}
        >
            {/* Borde metálico con gradiente cónico que rota al hover (eco StrategicNorth) */}
            <span className="services-card-border" aria-hidden="true" />
            {/* Glow exterior que aparece al hover */}
            <span className="services-card-glow" aria-hidden="true" />

            <div className="services-card-content">
                <div className="services-card-header">
                    <span className="services-card-number">{service.number}</span>
                    <span className="services-card-hairline" aria-hidden="true" />
                </div>

                <div className="services-card-icon" aria-hidden="true">
                    {Icons[service.icon]}
                </div>

                <h3 className="services-card-name">{service.name}</h3>
                <p className="services-card-tagline">{service.tagline}</p>

                <span className="services-card-cta" aria-hidden="true">
                    <span>Ver más</span>
                    {Icons.arrow}
                </span>
            </div>
        </button>
    )
}

// ============================================================
// ServiceModal — Emerge desde la card origen
// ============================================================
function ServiceModal({ service, originRect, onClose }) {
    const dialogRef = useRef(null)
    const closeBtnRef = useRef(null)
    const previousActiveElement = useRef(null)

    const isOpen = Boolean(service)

    useEffect(() => {
        if (!isOpen) return

        previousActiveElement.current = document.activeElement
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const t = setTimeout(() => closeBtnRef.current?.focus(), 320)

        return () => {
            clearTimeout(t)
            document.body.style.overflow = originalOverflow
            previousActiveElement.current?.focus?.()
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                onClose()
                return
            }
            if (e.key === 'Tab') {
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

    // Si tenemos rect de origen, calculamos el transform-origin del modal
    // para que parezca "emerger" desde la card clickeada.
    // El truco: pasamos las coordenadas como custom-props al modal, y el
    // CSS las usa como punto de origen del transform.
    const originStyle = originRect
        ? {
              '--origin-x': `${originRect.left + originRect.width / 2}px`,
              '--origin-y': `${originRect.top + originRect.height / 2}px`,
          }
        : {}

    return (
        <div
            className={`services-modal-overlay ${originRect ? 'has-origin' : ''}`}
            onClick={onClose}
            role="presentation"
            style={originStyle}
        >
            <div
                ref={dialogRef}
                className="services-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="services-modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    ref={closeBtnRef}
                    type="button"
                    className="services-modal-close"
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <header className="services-modal-header">
                    <div className="services-modal-kicker">
                        <span className="services-modal-kicker-dot" />
                        <span>Servicio · {service.number}</span>
                    </div>
                    <h2 id="services-modal-title" className="services-modal-name">
                        {service.name}
                    </h2>
                    <p className="services-modal-tagline">{service.tagline}</p>
                    <div className="services-modal-hairline" aria-hidden="true" />
                </header>

                <div className="services-modal-body">
                    <div className="services-modal-description">
                        {service.description.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>

                    {service.lines && service.lines.length > 0 && (
                        <div className="services-modal-lines">
                            <div className="services-modal-lines-label">
                                Líneas de trabajo
                            </div>
                            <ol className="services-modal-lines-list">
                                {service.lines.map((line, i) => (
                                    <li key={i}>
                                        <span className="services-modal-lines-num">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="services-modal-lines-text">
                                            {line}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>

                <footer className="services-modal-footer">
                    <a
                        href={BROCHURE_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="services-modal-cta"
                    >
                        <span>Descargar portafolio completo</span>
                        <span className="services-modal-cta-icon" aria-hidden="true">
                            {Icons.download}
                        </span>
                    </a>
                </footer>
            </div>
        </div>
    )
}

export default Services
