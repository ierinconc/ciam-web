import { useState, useRef } from 'react'
import './Interlocuciones.css'

/**
 * Interlocuciones — Página /proyectos/interlocuciones
 *
 * Patch 22:
 *  - Reusa el fondo atmósfera del Services (mismo lenguaje visual)
 *  - Header editorial: título "Interlocuciones" peso 600 morado + lead
 *  - Bloque "¿Qué es?": breve nota sobre el proyecto
 *  - Dos episodios embedidos directamente desde YouTube (nocookie)
 *    con tarjeta "ficha editorial": número de episodio, nombre del
 *    invitado/a, descripción corta, player que se reproduce ahí mismo
 *  - Cierre con CTA al canal de YouTube
 *  - Performance: el <iframe> solo carga al hacer click en "Reproducir"
 *    (lazy load real, no solo loading="lazy") usando una thumb de YouTube
 */

// ============================================================
// Datos de los episodios
// ============================================================
const episodes = [
    {
        number: '01',
        videoId: 'XD61QVHNGSM',
        guest: 'Shameel Thahir Silva',
        title: 'Interlocuciones #1',
        description:
            'Conversación con Shameel Thahir Silva, politólogo y magister en Estudios Políticos Latinoamericanos de la Universidad Nacional de Colombia, doctorando en la Universidad Externado. Analista político y autor en Razón Pública.',
    },
    {
        number: '02',
        videoId: 'k-FadP9mcjg',
        guest: 'Ángela Velandia Cruz',
        title: 'Interlocuciones #2 — PAX en Colombia',
        description:
            'Diálogo sobre PAX en Colombia, su trabajo de construcción de paz y los procesos sociales que articula desde el campo de los derechos humanos y la incidencia ciudadana.',
    },
]

const YT_CHANNEL = 'https://www.youtube.com/@centrociam'

// ============================================================
// Glifo SVG: play (mismo lenguaje del sitio)
// ============================================================
const PlayIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" />
    </svg>
)

const YouTubeIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.2 26.2 0 0 0 2 12c0 1.61.13 3.22.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77c.27-1.58.4-3.19.4-4.8a26.2 26.2 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
    </svg>
)

// ============================================================
// Componente principal
// ============================================================
function Interlocuciones() {
    return (
        <section className="ilocs">
            {/* Fondo atmósfera (reusa el del Services) */}
            <div className="ilocs-bg" aria-hidden="true" />
            <div className="ilocs-bg-overlay" aria-hidden="true" />
            <div className="ilocs-bg-grain" aria-hidden="true" />

            <div className="ilocs-container">
                {/* HEADER */}
                <header className="ilocs-header">
                    <div className="ilocs-kicker" aria-hidden="true">
                        
                        
                       
                    </div>
                    <span className="ilocs-kicker-dot" />
                    <h1 className="ilocs-title">Interlocuciones</h1>
                     <span className="ilocs-kicker-dot" />

                    <p className="ilocs-lead">
                        Un espacio de diálogo en formato podcast, donde conversamos con investigadoras, analistas y figuras del
                        debate público sobre las preguntas que atraviesan
                        nuestra democracia.
                    </p>

                    <div className="ilocs-ornament" aria-hidden="true">
                        <span className="ilocs-ornament-line ilocs-ornament-line--purple" />
                        <span className="ilocs-ornament-diamond" />
                        <span className="ilocs-ornament-line ilocs-ornament-line--gold" />
                    </div>
                </header>

                {/* INTRO de los episodios */}
                <div className="ilocs-intro">
                    <h2 className="ilocs-intro-title">Episodios disponibles</h2>
                    <p className="ilocs-intro-sub">
                        Conversaciones completas, reproducibles aquí mismo.
                    </p>
                </div>

                {/* EPISODIOS */}
                <ul className="ilocs-grid" role="list">
                    {episodes.map((ep, i) => (
                        <li
                            key={ep.videoId}
                            className="ilocs-episode-wrap"
                            style={{ '--ilocs-delay': `${i * 120}ms` }}
                        >
                            <EpisodeCard episode={ep} />
                        </li>
                    ))}
                </ul>

                {/* Cierre + CTA canal YouTube */}
                <div className="ilocs-closer" aria-hidden="true">
                    <span className="ilocs-closer-diamond" />
                    <span className="ilocs-closer-diamond" />
                    <span className="ilocs-closer-diamond" />
                </div>

                <div className="ilocs-cta-channel">
                    <p className="ilocs-cta-channel-text">
                        Encuentra todos los episodios en nuestro canal
                    </p>
                    <a
                        href={YT_CHANNEL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ilocs-cta-channel-link"
                        aria-label="Ir al canal de YouTube de CIAM (se abre en nueva pestaña)"
                    >
                        <span className="ilocs-cta-channel-icon" aria-hidden="true">
                            {YouTubeIcon}
                        </span>
                        <span>YouTube · @centrociam</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

// ============================================================
// EpisodeCard — Tarjeta editorial con player embed perezoso
// ------------------------------------------------------------
// Antes del click: thumbnail de YouTube + botón play sobreimpreso.
// Al click: se reemplaza por <iframe> de youtube-nocookie.com
// que arranca reproducción automática. Ventajas:
//  1. No carga JS de YouTube hasta que el usuario decide ver el video
//     (mejor performance + privacidad)
//  2. Si el usuario nunca ve los videos, no se trackea nada
// ============================================================
function EpisodeCard({ episode }) {
    const [playing, setPlaying] = useState(false)
    const iframeRef = useRef(null)

    const thumbUrl = `https://i.ytimg.com/vi/${episode.videoId}/maxresdefault.jpg`
    const embedSrc = `https://www.youtube-nocookie.com/embed/${episode.videoId}?autoplay=1&rel=0&modestbranding=1`

    return (
        <article className="ilocs-episode">
            <div className="ilocs-episode-border" aria-hidden="true" />

            <div className="ilocs-episode-content">
                {/* Header de la card */}
                <header className="ilocs-episode-header">
                    <span className="ilocs-episode-number">#{episode.number}</span>
                    <span className="ilocs-episode-hairline" aria-hidden="true" />
                </header>

                {/* Player */}
                <div className="ilocs-episode-player">
                    {!playing ? (
                        <button
                            type="button"
                            className="ilocs-episode-thumb-btn"
                            onClick={() => setPlaying(true)}
                            aria-label={`Reproducir ${episode.title}`}
                        >
                            <img
                                src={thumbUrl}
                                alt=""
                                className="ilocs-episode-thumb"
                                loading="lazy"
                                /* Si maxresdefault no existe, YouTube devuelve un placeholder
                                   gris; añadimos onerror para caer a hqdefault. */
                                onError={(e) => {
                                    e.currentTarget.src = `https://i.ytimg.com/vi/${episode.videoId}/hqdefault.jpg`
                                }}
                            />
                            <span className="ilocs-episode-thumb-veil" aria-hidden="true" />
                            <span className="ilocs-episode-play" aria-hidden="true">
                                {PlayIcon}
                            </span>
                            <span className="ilocs-episode-play-hint">
                                Reproducir aquí
                            </span>
                        </button>
                    ) : (
                        <iframe
                            ref={iframeRef}
                            className="ilocs-episode-iframe"
                            src={embedSrc}
                            title={episode.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                        />
                    )}
                </div>

                {/* Cuerpo con título + descripción */}
                <div className="ilocs-episode-body">
                    <h3 className="ilocs-episode-title">{episode.title}</h3>
                    <p className="ilocs-episode-guest">
                        Con <strong>{episode.guest}</strong>
                    </p>
                    <p className="ilocs-episode-description">
                        {episode.description}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default Interlocuciones
