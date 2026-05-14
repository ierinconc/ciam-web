import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import './ArticlePage.css'

/**
 * ArticlePage — Detalle de un artículo del blog CIAM.
 *
 * Patch 16 — ajustes:
 *  - Fondo: misma imagen que el blog (/blog-bg.webp) con velo más denso
 *    (variante lectura: el centro respira aún más blanco).
 *  - Título: ahora en morado (no tinta negra).
 *  - SIN bloque "POR · Editor CIAM" en el header (avatar, "Por", nombre).
 *  - Subtítulos h2/h3/h4 en morado.
 *  - Párrafos más anchos (contenedor 880px, párrafos ~78ch).
 *  - Resto se mantiene del Patch 15.
 */

function ArticlePage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [article, setArticle] = useState(null)
    const [siblings, setSiblings] = useState({ prev: null, next: null })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [progress, setProgress] = useState(0)

    // Patch 22: Modo lectura sepia para descansar la vista en artículos largos.
    // Persiste la preferencia en localStorage para que se mantenga entre artículos.
    const [readingMode, setReadingMode] = useState(() => {
        if (typeof window === 'undefined') return false
        try {
            return localStorage.getItem('ciam-reading-mode') === '1'
        } catch {
            return false
        }
    })

    const toggleReadingMode = () => {
        setReadingMode((prev) => {
            const next = !prev
            try {
                localStorage.setItem('ciam-reading-mode', next ? '1' : '0')
            } catch {
                /* Si localStorage está deshabilitado, el modo sigue funcionando
                   en la sesión actual aunque no persista. */
            }
            return next
        })
    }

    const bodyRef = useRef(null)

    // ----- helpers ---------------------------------------------------------

    const decodeHtml = (html) => {
        if (!html) return ''
        const txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
    }

    const formatDateLong = (iso) => {
        if (!iso) return ''
        try {
            const d = new Date(iso)
            const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
            return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`
        } catch {
            return ''
        }
    }

    const readingTime = (html) => {
        if (!html) return 1
        const text = html.replace(/<[^>]*>/g, ' ').trim()
        const words = text.split(/\s+/).filter(Boolean).length
        return Math.max(1, Math.round(words / 220))
    }

    const getCategory = (post) => {
        const terms = post?._embedded?.['wp:term']
        if (!Array.isArray(terms) || !terms.length) return 'Análisis'
        const cats = terms[0]
        if (!Array.isArray(cats) || !cats.length) return 'Análisis'
        return decodeHtml(cats[0]?.name) || 'Análisis'
    }

    const getFeaturedImage = (post) => {
        const fm = post?._embedded?.['wp:featuredmedia']?.[0]
        if (!fm) return null
        return {
            url: fm.source_url,
            alt: fm.alt_text || '',
            caption: fm.caption?.rendered ? decodeHtml(fm.caption.rendered).replace(/<[^>]*>/g, '').trim() : '',
        }
    }

    // ----- fetch principal -------------------------------------------------
    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(false)
        setArticle(null)
        setSiblings({ prev: null, next: null })
        setProgress(0)
        window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })

        fetch(`https://centrociam.org/wp-json/wp/v2/posts/${id}?_embed`)
            .then((r) => {
                if (!r.ok) throw new Error('HTTP ' + r.status)
                return r.json()
            })
            .then((data) => {
                if (cancelled) return
                setArticle(data)
                setLoading(false)
            })
            .catch(() => {
                if (cancelled) return
                setError(true)
                setLoading(false)
            })

        return () => { cancelled = true }
    }, [id])

    // ----- fetch prev/next ------------------------------------------------
    useEffect(() => {
        if (!article) return
        let cancelled = false

        fetch('https://centrociam.org/wp-json/wp/v2/posts?per_page=100&_fields=id,title,date')
            .then((r) => {
                if (!r.ok) throw new Error('HTTP ' + r.status)
                return r.json()
            })
            .then((list) => {
                if (cancelled || !Array.isArray(list)) return
                const idx = list.findIndex((p) => p.id === article.id)
                if (idx === -1) return
                const prev = list[idx + 1] || null  // más antiguo
                const next = list[idx - 1] || null  // más reciente
                setSiblings({ prev, next })
            })
            .catch(() => { /* silent */ })

        return () => { cancelled = true }
    }, [article])

    // ----- reading progress bar -------------------------------------------
    useEffect(() => {
        if (!article || loading) return
        let raf = null

        const onScroll = () => {
            if (raf) return
            raf = requestAnimationFrame(() => {
                raf = null
                const el = bodyRef.current
                if (!el) return
                const rect = el.getBoundingClientRect()
                const total = rect.height - window.innerHeight
                const scrolled = Math.max(0, -rect.top)
                const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0
                setProgress(pct)
            })
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [article, loading])

    // ----- datos derivados -------------------------------------------------
    const derived = useMemo(() => {
        if (!article) return null
        const titulo = decodeHtml(article.title?.rendered || '')
        const contenido = article.content?.rendered || ''
        return {
            titulo,
            contenido,
            fecha: formatDateLong(article.date),
            categoria: getCategory(article),
            imagen: getFeaturedImage(article),
            minutos: readingTime(contenido),
        }
    }, [article])

    // ============ LOADING ============
    if (loading) {
        return (
            <div className="ap">
                <ArticleBackground />
                <div className="ap-container">
                    <div className="ap-loading" aria-live="polite" aria-busy="true">
                        <span className="ap-loading-label">Cargando publicación</span>
                        <div className="ap-loading-dots">
                            <div className="ap-loading-dot" />
                            <div className="ap-loading-dot" />
                            <div className="ap-loading-dot" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // ============ ERROR ============
    if (error || !article || !derived) {
        return (
            <div className="ap">
                <ArticleBackground />
                <div className="ap-container">
                    <div className="ap-error" role="alert">
                        <div className="ap-error-kicker">
                            <span className="ap-error-dot" />
                            <span>404 · No encontrado</span>
                            <span className="ap-error-dot" />
                        </div>
                        <h1 className="ap-error-title">
                            No fue posible <em>cargar</em> esta publicación
                        </h1>
                        <p className="ap-error-lead">
                            El artículo que buscas pudo haber sido movido o ya no está disponible.
                        </p>
                        <button
                            type="button"
                            className="ap-back-cta"
                            onClick={() => navigate('/blog')}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            <span>Volver al blog</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // ============ NORMAL ============
    return (
        <article className={`ap ${readingMode ? 'is-reading-mode' : ''}`}>
            <ArticleBackground />

            {/* Patch 22: Botón flotante de modo lectura — esquina superior
                derecha, debajo del navbar. Cambia colores a sepia para
                lectura cómoda en artículos largos. */}
            <button
                type="button"
                className="ap-reading-toggle"
                onClick={toggleReadingMode}
                aria-pressed={readingMode}
                aria-label={readingMode ? 'Desactivar modo lectura' : 'Activar modo lectura'}
                title={readingMode ? 'Desactivar modo lectura' : 'Activar modo lectura'}
            >
                <span className="ap-reading-toggle-icon" aria-hidden="true">
                    {readingMode ? (
                        /* Sol: para volver al modo claro normal */
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="4" />
                            <line x1="12" y1="2" x2="12" y2="4" />
                            <line x1="12" y1="20" x2="12" y2="22" />
                            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
                            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
                            <line x1="2" y1="12" x2="4" y2="12" />
                            <line x1="20" y1="12" x2="22" y2="12" />
                            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
                            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
                        </svg>
                    ) : (
                        /* Libro abierto: para activar el modo lectura sepia */
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 4.5A1.5 1.5 0 0 1 3.5 3H11v17H3.5A1.5 1.5 0 0 1 2 18.5v-14z" />
                            <path d="M22 4.5A1.5 1.5 0 0 0 20.5 3H13v17h7.5a1.5 1.5 0 0 0 1.5-1.5v-14z" />
                        </svg>
                    )}
                </span>
                <span className="ap-reading-toggle-label">
                    {readingMode ? 'Modo claro' : 'Modo lectura'}
                </span>
            </button>

            {/* Reading progress bar */}
            <div className="ap-progress" aria-hidden="true">
                <div className="ap-progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="ap-container">
                {/* Volver al blog */}
                <Link to="/blog" className="ap-back">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    <span>Volver al blog</span>
                </Link>

                {/* HEADER */}
                <header className="ap-header">
                    {/* Eyebrow: punto · categoría · fecha · tiempo de lectura */}
                    <div className="ap-eyebrow">
                        <span className="ap-eyebrow-dot" />
                        <span className="ap-eyebrow-cat">{derived.categoria}</span>
                        <span className="ap-eyebrow-sep" aria-hidden="true">·</span>
                        <span>{derived.fecha}</span>
                        <span className="ap-eyebrow-sep" aria-hidden="true">·</span>
                        <span>{derived.minutos} min de lectura</span>
                    </div>

                    {/* Título — ahora en MORADO, sentence-case, peso 300 */}
                    <h1
                        className="ap-title"
                        dangerouslySetInnerHTML={{ __html: derived.titulo }}
                    />

                    {/* Hairline morado→dorado */}
                    <div className="ap-hairline" aria-hidden="true" />

                    {/* SIN bloque autor (como pediste). */}
                </header>

                {/* Imagen featured */}
                {derived.imagen?.url && (
                    <figure className="ap-featured">
                        <div className="ap-featured-frame">
                            <img
                                src={derived.imagen.url}
                                alt={derived.imagen.alt || derived.titulo}
                                className="ap-featured-img"
                                loading="eager"
                            />
                        </div>
                        {derived.imagen.caption && (
                            <figcaption className="ap-featured-caption">
                                {derived.imagen.caption}
                            </figcaption>
                        )}
                    </figure>
                )}

                {/* CUERPO */}
                <div
                    ref={bodyRef}
                    className="ap-body"
                    dangerouslySetInnerHTML={{ __html: derived.contenido }}
                />

                {/* Cierre ornamental */}
                <div className="ap-closer" aria-hidden="true">
                    <span className="ap-closer-diamond" />
                    <span className="ap-closer-diamond" />
                    <span className="ap-closer-diamond" />
                </div>

                {/* Navegación prev/next */}
                {(siblings.prev || siblings.next) && (
                    <nav className="ap-siblings" aria-label="Navegación entre artículos">
                        {siblings.prev ? (
                            <Link
                                to={`/articulo/${siblings.prev.id}`}
                                className="ap-sibling ap-sibling--prev"
                            >
                                <span className="ap-sibling-label">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <line x1="19" y1="12" x2="5" y2="12" />
                                        <polyline points="12 19 5 12 12 5" />
                                    </svg>
                                    <span>Anterior</span>
                                </span>
                                <span
                                    className="ap-sibling-title"
                                    dangerouslySetInnerHTML={{ __html: decodeHtml(siblings.prev.title?.rendered || '') }}
                                />
                            </Link>
                        ) : (
                            <span className="ap-sibling ap-sibling--placeholder" aria-hidden="true" />
                        )}

                        {siblings.next ? (
                            <Link
                                to={`/articulo/${siblings.next.id}`}
                                className="ap-sibling ap-sibling--next"
                            >
                                <span className="ap-sibling-label">
                                    <span>Siguiente</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </span>
                                <span
                                    className="ap-sibling-title"
                                    dangerouslySetInnerHTML={{ __html: decodeHtml(siblings.next.title?.rendered || '') }}
                                />
                            </Link>
                        ) : (
                            <span className="ap-sibling ap-sibling--placeholder" aria-hidden="true" />
                        )}
                    </nav>
                )}

                {/* CTA final */}
                <div className="ap-end">
                    <Link to="/blog" className="ap-end-link">
                        <span>Ver todas las publicaciones</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    )
}

/**
 * Fondo atmosférico — misma imagen que el blog pero con velo más denso
 * para favorecer lectura larga (variante "reader").
 */
function ArticleBackground() {
    return (
        <>
            <div className="ap-bg" aria-hidden="true" />
            <div className="ap-bg-veil" aria-hidden="true" />
        </>
    )
}

export default ArticlePage
