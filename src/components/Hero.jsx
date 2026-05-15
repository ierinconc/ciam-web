import './Hero.css'

function Hero() {
    return (
        <section className="hero">
            {/* Patch 31: background image se sirve desde CSS (responsive con media queries
                + preload en index.html). Antes era inline style con /hero.jpg fijo. */}
            <div className="hero-bg" aria-hidden="true" />
            <div className="hero-overlay" aria-hidden="true" />
            <div className="hero-grain" aria-hidden="true" />

            <div className="hero-content">
                
                <div className="hero-center">
                    <img
                        className="hero-logo"
                        src="/logo-blanco.png"
                        alt="CIAM"
                    />
                    <div className="hero-eyebrow">Centro de Pensamiento</div>
                    <p className="hero-tagline">
                        Centro de Investigación, Análisis y Mediaciones.<br />
                        <span className="hero-meta-faint">Bogotá, Colombia</span>
                    </p>
                </div>
            </div>

            <div className="hero-scroll">
                <div className="hero-scroll-line" />
                Explorar
            </div>
        </section>
    )
}

export default Hero
