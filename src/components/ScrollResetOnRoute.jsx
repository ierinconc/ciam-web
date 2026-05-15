import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollResetOnRoute — Patch 30
 *
 * Resetea el scroll al inicio (top) cada vez que el usuario navega a
 * una ruta distinta. Resuelve un comportamiento típico de single-page
 * apps con React Router: cuando se cambia de ruta, el navegador no
 * sabe que conceptualmente es "otra página" y mantiene la posición
 * de scroll anterior.
 *
 * No renderiza nada visible. Solo escucha cambios de ruta.
 *
 * Comportamiento:
 *  - Al cambiar el `pathname`, scrolea al top de forma instantánea
 *    (no animada). Una animación se sentiría rara durante una transición
 *    de página: el usuario espera "estar arriba" en la nueva ruta, no
 *    "ver una animación de subir".
 *  - Si el usuario refrescó (F5) o entró directo a una URL, también
 *    arranca en top.
 *  - No afecta la navegación interna por anclas (#) si se usaran más
 *    adelante: en ese caso solo el cambio de hash, no de pathname.
 */
function ScrollResetOnRoute() {
    const { pathname } = useLocation()

    useEffect(() => {
        // 'instant' (no smooth) — el cambio de página debe sentirse
        // inmediato. Si querés smooth, cambiá a 'smooth' pero se
        // ve raro durante navegación.
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, [pathname])

    return null
}

export default ScrollResetOnRoute
