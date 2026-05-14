import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import './Archivo.css'

/**
 * Archivo — Página /archivo de CIAM (Patch 25)
 *
 * Galería visual con 5 categorías editoriales + mosaico masonry +
 * lightbox accesible. Las fotos vienen del Drive del cliente,
 * procesadas y optimizadas a webp (37 fotos, ~5.7 MB total).
 *
 *  - Mosaico masonry CSS (CSS columns) que aprovecha la diversidad
 *    de proporciones de las fotos
 *  - Filtros tipo pill (mismo lenguaje que Servicios)
 *  - Lightbox a pantalla completa con navegación ←/→, ESC, focus trap
 *  - Lazy load nativo de imágenes para performance
 *  - Fondo atmósfera reusando el de Servicios
 */

// ============================================================
// CATEGORÍAS
// ============================================================
const CATEGORIES = [
    { id: 'all', label: 'Todo' },
    { id: 'territorio', label: 'Territorio' },
    { id: 'movilizacion', label: 'Movilización' },
    { id: 'memoria-viva', label: 'Memoria viva' },
    { id: 'formacion', label: 'Formación' },
    { id: 'ciam-accion', label: 'CIAM en acción' },
]

const CATEGORY_LABELS = Object.fromEntries(
    CATEGORIES.map((c) => [c.id, c.label])
)

// ============================================================
// MANIFEST DE FOTOS (curaduría visual del archivo CIAM)
// ============================================================
const ARCHIVE_ITEMS = [
    { id: 1,  slug: 'archivo-001', category: 'movilizacion', caption: null, orientation: 'landscape' },
    { id: 2,  slug: 'archivo-002', category: 'formacion',    caption: 'Escuela de Liderazgos Políticos para la Paz — Ciudad Bolívar', orientation: 'landscape' },
    { id: 3,  slug: 'archivo-003', category: 'memoria-viva', caption: null, orientation: 'landscape' },
    { id: 4,  slug: 'archivo-004', category: 'territorio',   caption: null, orientation: 'landscape' },
    { id: 5,  slug: 'archivo-005', category: 'movilizacion', caption: null, orientation: 'landscape' },
    { id: 6,  slug: 'archivo-006', category: 'formacion',    caption: 'Escuela Marika Feminista Distrital — Tabula Rasa', orientation: 'landscape' },
    { id: 7,  slug: 'archivo-007', category: 'memoria-viva', caption: null, orientation: 'landscape' },
    { id: 8,  slug: 'archivo-008', category: 'ciam-accion',  caption: null, orientation: 'landscape' },
    { id: 9,  slug: 'archivo-009', category: 'movilizacion', caption: null, orientation: 'landscape' },
    { id: 10, slug: 'archivo-010', category: 'territorio',   caption: null, orientation: 'portrait' },
    { id: 11, slug: 'archivo-011', category: 'ciam-accion',  caption: null, orientation: 'portrait' },
    { id: 12, slug: 'archivo-012', category: 'formacion',    caption: null, orientation: 'portrait' },
    { id: 13, slug: 'archivo-013', category: 'memoria-viva', caption: null, orientation: 'landscape' },
    { id: 14, slug: 'archivo-014', category: 'formacion',    caption: null, orientation: 'landscape' },
    { id: 15, slug: 'archivo-015', category: 'territorio',   caption: null, orientation: 'square' },
    { id: 16, slug: 'archivo-016', category: 'formacion',    caption: null, orientation: 'landscape' },
    { id: 17, slug: 'archivo-017', category: 'ciam-accion',  caption: null, orientation: 'landscape' },
    { id: 18, slug: 'archivo-018', category: 'formacion',    caption: 'Ciclo de talleres Enjambre Eco-Transfeminista — Aula Ambiental Siekyka', orientation: 'landscape' },
    { id: 19, slug: 'archivo-019', category: 'formacion',    caption: null, orientation: 'landscape' },
    { id: 20, slug: 'archivo-020', category: 'movilizacion', caption: null, orientation: 'landscape' },
    { id: 21, slug: 'archivo-021', category: 'ciam-accion',  caption: null, orientation: 'landscape' },
    { id: 22, slug: 'archivo-022', category: 'memoria-viva', caption: null, orientation: 'landscape' },
    { id: 23, slug: 'archivo-023', category: 'formacion',    caption: null, orientation: 'landscape' },
    { id: 24, slug: 'archivo-024', category: 'ciam-accion',  caption: null, orientation: 'landscape' },
    { id: 25, slug: 'archivo-025', category: 'ciam-accion',  caption: null, orientation: 'landscape' },
    { id: 26, slug: 'archivo-026', category: 'formacion',    caption: null, orientation: 'landscape' },
    { id: 27, slug: 'archivo-027', category: 'formacion',    caption: null, orientation: 'portrait' },
    { id: 28, slug: 'archivo-028', category: 'ciam-accion',  caption: null, orientation: 'landscape' },
    { id: 29, slug: 'archivo-029', category: 'formacion',    caption: null, orientation: 'landscape' },
    { id: 30, slug: 'archivo-030', category: 'ciam-accion',  caption: null, orientation: 'landscape' },
    { id: 31, slug: 'archivo-031', category: 'ciam-accion',  caption: null, orientation: 'landscape' },
    { id: 32, slug: 'archivo-032', category: 'formacion',    caption: null, orientation: 'portrait' },
    { id: 33, slug: 'archivo-033', category: 'ciam-accion',  caption: null, orientation: 'portrait' },
    { id: 34, slug: 'archivo-034', category: 'ciam-accion',  caption: null, orientation: 'portrait' },
    { id: 35, slug: 'archivo-035', category: 'ciam-accion',  caption: null, orientation: 'portrait' },
    { id: 36, slug: 'archivo-036', category: 'ciam-accion',  caption: null, orientation: 'portrait' },
    { id: 37, slug: 'archivo-037', category: 'ciam-accion',  caption: null, orientation: 'portrait' },
]

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
function Archivo() {
    const [activeCategory, setActiveCategory] = useState('all')
    const [lightboxIndex, setLightboxIndex] = useState(null)

    const filteredItems = useMemo(() => {
        if (activeCategory === 'all') return ARCHIVE_ITEMS
        return ARCHIVE_ITEMS.filter((item) => item.category === activeCategory)
    }, [activeCategory])

    const openLightbox = useCallback((index) => setLightboxIndex(index), [])
    const closeLightbox = useCallback(() => setLightboxIndex(null), [])

    return (
        <section className="arch">
            <div className="arch-bg" aria-hidden="true" />
            <div className="arch-bg-overlay" aria-hidden="true" />
            <div className="arch-bg-grain" aria-hidden="true" />

            <div className="arch-container">
                <header className="arch-header">
                    <div className="arch-kicker" aria-hidden="true">
                        <span className="arch-kicker-dot" />
                      
                        <span className="arch-kicker-dot" />
                    </div>

                    <h1 className="arch-title">Archivo</h1>

                    <p className="arch-lead">
                        Una memoria visual del trabajo que nos sostiene.
                        Encuentros, talleres, territorios y comunidades que
                        forman parte del camino de CIAM.
                    </p>

                    <div className="arch-ornament" aria-hidden="true">
                        <span className="arch-ornament-line arch-ornament-line--purple" />
                        <span className="arch-ornament-diamond" />
                        <span className="arch-ornament-line arch-ornament-line--gold" />
                    </div>
                </header>

                {/* Filtros */}
                <nav className="arch-filters" aria-label="Filtrar por categoría">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`arch-filter ${activeCategory === cat.id ? 'is-active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                            aria-pressed={activeCategory === cat.id}
                        >
                            {cat.label}
                        </button>
                    ))}
                </nav>

                {/* Mosaico masonry */}
                <div className="arch-grid" role="list">
                    {filteredItems.map((item, idx) => (
                        <button
                            key={item.id}
                            type="button"
                            className="arch-item"
                            onClick={() => openLightbox(idx)}
                            aria-label={item.caption || `Foto ${item.id} del archivo CIAM, categoría ${CATEGORY_LABELS[item.category]}`}
                            role="listitem"
                        >
                            <img
                                src={`/archivo/${item.slug}.webp`}
                                alt={item.caption || ''}
                                loading="lazy"
                                className="arch-item-img"
                            />
                            <span className="arch-item-veil" aria-hidden="true" />
                            <span className="arch-item-cat" aria-hidden="true">
                                {CATEGORY_LABELS[item.category]}
                            </span>
                            {item.caption && (
                                <span className="arch-item-caption" aria-hidden="true">
                                    {item.caption}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="arch-empty">
                        <p>No hay fotos en esta categoría aún.</p>
                    </div>
                )}

                {/* Cierre ornamental */}
                <div className="arch-closer" aria-hidden="true">
                    <span className="arch-closer-diamond" />
                    <span className="arch-closer-diamond" />
                    <span className="arch-closer-diamond" />
                </div>

                <div className="arch-note">
                    <p className="arch-note-text">
                        Un archivo en construcción. Si quieres compartir material
                        de algún encuentro, escríbenos.
                    </p>
                </div>
            </div>

            {lightboxIndex !== null && (
                <Lightbox
                    items={filteredItems}
                    index={lightboxIndex}
                    setIndex={setLightboxIndex}
                    onClose={closeLightbox}
                />
            )}
        </section>
    )
}

// ============================================================
// Lightbox — modal pantalla completa con navegación
// ============================================================
function Lightbox({ items, index, setIndex, onClose }) {
    const dialogRef = useRef(null)
    const closeBtnRef = useRef(null)
    const previousActiveElement = useRef(null)

    const item = items[index]
    const hasPrev = index > 0
    const hasNext = index < items.length - 1

    const goPrev = useCallback(() => {
        if (hasPrev) setIndex(index - 1)
    }, [hasPrev, index, setIndex])

    const goNext = useCallback(() => {
        if (hasNext) setIndex(index + 1)
    }, [hasNext, index, setIndex])

    // Scroll lock + focus initial
    useEffect(() => {
        previousActiveElement.current = document.activeElement
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const t = setTimeout(() => closeBtnRef.current?.focus(), 100)
        return () => {
            clearTimeout(t)
            document.body.style.overflow = originalOverflow
            previousActiveElement.current?.focus?.()
        }
    }, [])

    // Teclado: ESC + flechas
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                onClose()
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault()
                goPrev()
            } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                goNext()
            } else if (e.key === 'Tab') {
                const dialog = dialogRef.current
                if (!dialog) return
                const focusables = dialog.querySelectorAll(
                    'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
    }, [goPrev, goNext, onClose])

    return (
        <div
            className="arch-lb-overlay"
            onClick={onClose}
            role="presentation"
        >
            <div
                ref={dialogRef}
                className="arch-lb"
                role="dialog"
                aria-modal="true"
                aria-label={`Foto ${index + 1} de ${items.length}`}
                onClick={(e) => e.stopPropagation()}
            >
                <header className="arch-lb-header">
                    <span className="arch-lb-eyebrow">
                        {CATEGORY_LABELS[item.category]} · {index + 1} de {items.length}
                    </span>
                    <button
                        ref={closeBtnRef}
                        type="button"
                        className="arch-lb-close"
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </header>

                <div className="arch-lb-image-wrap">
                    <img
                        key={item.slug}
                        src={`/archivo/${item.slug}-large.webp`}
                        alt={item.caption || `Foto ${item.id} del archivo CIAM`}
                        className="arch-lb-image"
                    />
                </div>

                {item.caption && (
                    <p className="arch-lb-caption">{item.caption}</p>
                )}

                <div className="arch-lb-nav">
                    <button
                        type="button"
                        className="arch-lb-nav-btn"
                        onClick={goPrev}
                        disabled={!hasPrev}
                        aria-label="Foto anterior"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <span>Anterior</span>
                    </button>

                    <button
                        type="button"
                        className="arch-lb-nav-btn"
                        onClick={goNext}
                        disabled={!hasNext}
                        aria-label="Foto siguiente"
                    >
                        <span>Siguiente</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Archivo
