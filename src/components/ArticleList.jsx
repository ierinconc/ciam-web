import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ArticleList.css'

/**
 * ArticleList — Listado de publicaciones del blog CIAM.
 *
 * Patch 16 — ajustes:
 *  - Fondo nuevo con imagen real (/blog-bg.webp) — periódicos + libros, centro respira blanco.
 *  - Header: sin underline dorado bajo "Blog", sin contador de publicaciones,
 *    ornamento central rediseñado más sutil y simétrico.
 *  - Resto se mantiene del Patch 15.
 */

function ArticleList() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        let cancelled = false
        fetch('https://centrociam.org/wp-json/wp/v2/posts?per_page=100&_embed')
            .then((response) => {
                if (!response.ok) throw new Error('HTTP ' + response.status)
                return response.json()
            })
            .then((data) => {
                if (cancelled) return
                setArticles(Array.isArray(data) ? data : [])
                setLoading(false)
            })
            .catch(() => {
                if (cancelled) return
                setError(true)
                setLoading(false)
            })
        return () => { cancelled = true }
    }, [])

    // ----- helpers ---------------------------------------------------------

    const decodeHtml = (html) => {
        if (!html) return ''
        const txt = document.createElement('textarea')
        txt.innerHTML = html
        return txt.value
    }

    const formatDate = (iso) => {
        if (!iso) return ''
        try {
            const d = new Date(iso)
            const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
            return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
        } catch {
            return ''
        }
    }

    const cleanExcerpt = (html) => {
        if (!html) return ''
        const stripped = html
            .replace(/\[…\]|\[\.\.\.\]/g, '…')
            .replace(/<[^>]*>/g, '')
            .trim()
        return decodeHtml(stripped)
    }

    const getCategory = (article) => {
        const terms = article?._embedded?.['wp:term']
        if (!Array.isArray(terms) || !terms.length) return 'Análisis'
        const cats = terms[0]
        if (!Array.isArray(cats) || !cats.length) return 'Análisis'
        return decodeHtml(cats[0]?.name) || 'Análisis'
    }

    return (
        <div className="blog">
            {/* ============ Fondo: imagen real con overlay para que el centro respire ============ */}
            <div className="blog-bg" aria-hidden="true" />
            <div className="blog-bg-veil" aria-hidden="true" />

            <div className="blog-container">
                {/* ============ HEADER EDITORIAL ============ */}
                <header className="blog-header">
                    {/* Cintillo: punto · "Publicaciones" · punto */}
                    <div className="blog-kicker" aria-hidden="true">
                        <span className="blog-kicker-dot" />
                        <span className="blog-kicker-label">Publicaciones</span>
                        <span className="blog-kicker-dot" />
                    </div>

                    <h1 className="blog-title">
                        Blog
                    </h1>

                    <p className="blog-lead">
                        Ensayos, columnas e investigaciones sobre democracia,
                        medios y la coyuntura política colombiana.
                    </p>

                    {/* Ornamento centrado: línea morada — diamante — línea dorada */}
                    <div className="blog-ornament" aria-hidden="true">
                        <span className="blog-ornament-line blog-ornament-line--purple" />
                        <span className="blog-ornament-diamond" />
                        <span className="blog-ornament-line blog-ornament-line--gold" />
                    </div>
                </header>

                {/* ============ LISTA ============ */}
                {loading ? (
                    <div className="blog-loading" aria-live="polite" aria-busy="true">
                        <span className="blog-loading-label">Cargando publicaciones</span>
                        <div className="blog-loading-dots">
                            <div className="blog-loading-dot" />
                            <div className="blog-loading-dot" />
                            <div className="blog-loading-dot" />
                        </div>
                    </div>
                ) : error ? (
                    <div className="blog-empty" role="alert">
                        <p>No fue posible cargar las publicaciones en este momento.</p>
                        <p className="blog-empty-hint">Revise su conexión o intente más tarde.</p>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="blog-empty">
                        <p>Aún no hay publicaciones disponibles.</p>
                    </div>
                ) : (
                    <ol className="blog-list">
                        {articles.map((article, i) => {
                            const imagen = article._embedded?.['wp:featuredmedia']?.[0]?.source_url
                            const altText = article._embedded?.['wp:featuredmedia']?.[0]?.alt_text || ''
                            const fecha = formatDate(article.date)
                            const titulo = decodeHtml(article.title?.rendered || '')
                            const excerpt = cleanExcerpt(article.excerpt?.rendered)
                            const categoria = getCategory(article)

                            return (
                                <li
                                    key={article.id}
                                    className="blog-item-wrap"
                                    style={{ '--blog-delay': `${Math.min(i, 8) * 60}ms` }}
                                >
                                    <Link
                                        to={`/articulo/${article.id}`}
                                        className="blog-item"
                                        aria-label={`Leer artículo: ${titulo}`}
                                    >
                                        <div className="blog-item-media">
                                            {imagen ? (
                                                <img
                                                    src={imagen}
                                                    alt={altText}
                                                    className="blog-item-img"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="blog-item-img blog-item-img--placeholder" />
                                            )}
                                            <div className="blog-item-tint" aria-hidden="true" />
                                        </div>

                                        <div className="blog-item-body">
                                            <div className="blog-item-meta">
                                                {fecha && <span>{fecha}</span>}
                                                {fecha && <span className="blog-item-meta-dot" aria-hidden="true" />}
                                                <span className="blog-item-meta-cat">{categoria}</span>
                                            </div>

                                            <h3
                                                className="blog-item-title"
                                                dangerouslySetInnerHTML={{ __html: titulo }}
                                            />

                                            <p className="blog-item-excerpt">{excerpt}</p>

                                            <span className="blog-item-cta">
                                                <span>Leer artículo</span>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                    <polyline points="12 5 19 12 12 19" />
                                                </svg>
                                            </span>
                                        </div>

                                        <div className="blog-item-line" aria-hidden="true" />
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                )}
            </div>
        </div>
    )
}

export default ArticleList
