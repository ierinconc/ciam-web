import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    // En rutas distintas a home no hay hero oscuro, así que el navbar
    // siempre se ve "scrolled" (fondo blanco) para que sea legible
    const isHome = location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Cierra el menú móvil al cambiar de ruta
    useEffect(() => {
        setMobileOpen(false)
        setOpenDropdown(false)
    }, [location.pathname])

    // Bloquea el scroll del body cuando el menú móvil está abierto
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const navState = (scrolled || !isHome) ? 'navbar--solid' : 'navbar--transparent'

    const go = (path) => {
        navigate(path)
        setMobileOpen(false)
    }

    return (
        <nav className={`navbar ${navState} ${mobileOpen ? 'navbar--mobile-open' : ''}`}>
            <div className="navbar-inner">
                <button
                    className="navbar-logo"
                    onClick={() => go('/')}
                    aria-label="Inicio CIAM"
                >
                    <img
                        src="/logo-blanco.png"
                        alt="CIAM"
                        className="navbar-logo-img navbar-logo-img--light"
                    />
                    <img
                        src="/logo.png"
                        alt="CIAM"
                        className="navbar-logo-img navbar-logo-img--dark"
                    />
                </button>

                <ul className="navbar-links">
                    <li onClick={() => go('/')}>Inicio</li>
                    <li onClick={() => go('/servicios')}>Servicios</li>
                    <li onClick={() => go('/equipo')}>Equipo</li>
                    <li
                        className="navbar-dropdown"
                        onMouseEnter={() => setOpenDropdown(true)}
                        onMouseLeave={() => setOpenDropdown(false)}
                    >
                        <span>Proyectos</span>
                        <ul className={`navbar-submenu ${openDropdown ? 'is-open' : ''}`}>
                            <li onClick={() => go('/blog')}>Blog</li>
                            <li onClick={() => go('/proyectos/taracea')}>Taracea</li>
                            <li onClick={() => go('/proyectos/interlocuciones')}>Interlocuciones</li>
                            <li
                                onClick={() => go('/proyectos/polifonias')}
                                className="navbar-submenu-item--soon"
                            >
                                <span>Polifonías</span>
                                <span className="navbar-soon-pill" aria-label="Próximamente">
                                    Próximamente
                                </span>
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => go('/archivo')}>Archivo</li>
                </ul>

                <button
                    className="navbar-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={mobileOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Menú móvil */}
            <div className={`navbar-mobile ${mobileOpen ? 'is-open' : ''}`}>
                <ul className="navbar-mobile-links">
                    <li onClick={() => go('/')}>Inicio</li>
                    <li onClick={() => go('/servicios')}>Servicios</li>
                    <li onClick={() => go('/equipo')}>Equipo</li>
                    <li className="navbar-mobile-group">
                        <span className="navbar-mobile-label">Proyectos</span>
                        <ul>
                            <li onClick={() => go('/blog')}>Blog</li>
                            <li onClick={() => go('/proyectos/taracea')}>Taracea</li>
                            <li onClick={() => go('/proyectos/interlocuciones')}>Interlocuciones</li>
                            <li
                                onClick={() => go('/proyectos/polifonias')}
                                className="navbar-mobile-item--soon"
                            >
                                <span>Polifonías</span>
                                <span className="navbar-soon-pill" aria-label="Próximamente">
                                    Próximamente
                                </span>
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => go('/archivo')}>Archivo</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
