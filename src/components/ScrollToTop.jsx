import { useEffect, useState } from 'react'
import './ScrollToTop.css'

function ScrollToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTop = () => {
        // Animación custom: ~1.2s con easing cubic out.
        // Más cinematográfica que el smooth nativo del navegador.
        const startY = window.scrollY
        if (startY === 0) return

        const duration = 1200
        const startTime = performance.now()

        // easeOutCubic: arranca rápido, frena suave al final
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

        const tick = (now) => {
            const elapsed = now - startTime
            const t = Math.min(elapsed / duration, 1)
            const eased = easeOutCubic(t)
            window.scrollTo(0, startY * (1 - eased))
            if (t < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
    }

    return (
        <button
            type="button"
            className={`scroll-top ${visible ? 'is-visible' : ''}`}
            onClick={scrollTop}
            aria-label="Volver arriba"
        >
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
            </svg>
        </button>
    )
}

export default ScrollToTop
