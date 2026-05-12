import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ArticleList.css'

function ArticleList() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://centrociam.org/wp-json/wp/v2/posts?per_page=100&_embed')
            .then((response) => response.json())
            .then((data) => {
                setArticles(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    // Formatear fecha desde el ISO de WordPress
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

    // Limpiar HTML del excerpt (WordPress devuelve <p>...</p> con [...])
    const cleanExcerpt = (html) => {
        if (!html) return ''
        return html
            .replace(/\[…\]|\[\.\.\.\]/g, '…')
            .replace(/<[^>]*>/g, '')
            .trim()
    }

    return (
        <div className="blog">
            {/* ============ Fondo decorativo (mismo lenguaje que las invitaciones) ============ */}
            <div className="blog-bg" aria-hidden="true" />

            <div className="blog-container">
                {/* ============ Header editorial ============ */}
                <header className="blog-header">
                    <h1 className="blog-title">
                        Nuestro <em>Blog</em>
                    </h1>
                    <p className="blog-lead">
                        Ensayos, columnas e investigaciones sobre democracia, medios
                        y la coyuntura política colombiana.
                    </p>
                    <div className="blog-hairline" aria-hidden="true" />
                </header>

                {/* ============ Lista ============ */}
                {loading ? (
                    <div className="blog-loading" aria-live="polite">
                        <div className="blog-loading-dot" />
                        <div className="blog-loading-dot" />
                        <div className="blog-loading-dot" />
                    </div>
                ) : articles.length === 0 ? (
                    <div className="blog-empty">
                        <p>No se pudieron cargar las publicaciones en este momento.</p>
                    </div>
                ) : (
                    <ol className="blog-list">
                        {articles.map((article, i) => {
                            const imagen =
                                article._embedded?.['wp:featuredmedia']?.[0]?.source_url
                            const fecha = formatDate(article.date)
                            const titulo = article.title?.rendered || ''
                            const excerpt = cleanExcerpt(article.excerpt?.rendered)

                            return (
                                <li
                                    key={article.id}
                                    className="blog-item"
                                    style={{ '--blog-delay': `${i * 60}ms` }}
                                    onClick={() => navigate(`/articulo/${article.id}`)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault()
                                            navigate(`/articulo/${article.id}`)
                                        }
                                    }}
                                    tabIndex={0}
                                    role="link"
                                >
                                    {/* Imagen — siempre cuadrada, cover */}
                                    <div className="blog-item-media">
                                        {imagen ? (
                                            <img
                                                src={imagen}
                                                alt=""
                                                className="blog-item-img"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="blog-item-img blog-item-img--placeholder" />
                                        )}
                                        <div className="blog-item-tint" aria-hidden="true" />
                                    </div>

                                    {/* Cuerpo */}
                                    <div className="blog-item-body">
                                        {fecha && (
                                            <div className="blog-item-meta">
                                                <span>{fecha}</span>
                                                <span className="blog-item-meta-dot" />
                                                <span>Análisis</span>
                                            </div>
                                        )}

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

                                    {/* Línea inferior animada (acento dorado→morado) */}
                                    <div className="blog-item-line" aria-hidden="true" />
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
