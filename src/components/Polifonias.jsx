import './Polifonias.css'

/**
 * Polifonias — Página /proyectos/polifonias
 *
 * Patch 22:
 *  Proyecto en construcción. Orden directa del cliente:
 *  presentarlo como "próximamente" pero de forma elegante,
 *  coherente con el sistema visual del sitio.
 */
function Polifonias() {
    return (
        <section className="poli">
            {/* Fondo atmósfera reusando el de Services */}
            <div className="poli-bg" aria-hidden="true" />
            <div className="poli-bg-overlay" aria-hidden="true" />
            <div className="poli-bg-grain" aria-hidden="true" />

            <div className="poli-container">
                {/* Eyebrow superior */}
                <div className="poli-kicker" aria-hidden="true">
                    <span className="poli-kicker-dot" />
                    
                    <span className="poli-kicker-dot" />
                </div>

                {/* Píldora dorada "Próximamente" — protagonista sutil */}
                <div className="poli-badge">
                    <span className="poli-badge-pulse" aria-hidden="true" />
                    <span className="poli-badge-label">Próximamente</span>
                </div>

                {/* Título grande */}
                <h1 className="poli-title">Polifonías</h1>

                {/* Subtítulo editorial */}
                <p className="poli-lead">
                    Un proyecto en construcción. Estamos preparando algo nuevo.
            
                </p>

                {/* Ornamento de firma */}
                <div className="poli-ornament" aria-hidden="true">
                    <span className="poli-ornament-line poli-ornament-line--purple" />
                    <span className="poli-ornament-diamond" />
                    <span className="poli-ornament-line poli-ornament-line--gold" />
                </div>

                {/* Tres diamantes pulsando suavemente */}
                <div className="poli-dots" aria-hidden="true">
                    <span className="poli-dot poli-dot--1" />
                    <span className="poli-dot poli-dot--2" />
                    <span className="poli-dot poli-dot--3" />
                </div>

                {/* Microcopy de cierre */}
                <p className="poli-back-hint">
                    Mientras tanto, conoce nuestras{' '}
                    <a href="/proyectos/interlocuciones" className="poli-back-link">
                        Interlocuciones
                    </a>
                </p>
            </div>
        </section>
    )
}

export default Polifonias
