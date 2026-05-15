import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import './Footer.css'

function Footer() {
    const navigate = useNavigate()

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <img
                            src="/logo.png"
                            alt="CIAM"
                            className="footer-logo"
                            onClick={() => navigate('/')}
                        />
                        <p>
                            Centro de Investigación, Análisis y Mediaciones.
                            Centro de Pensamiento dedicado a articular y fortalecer
                            los saberes que circulan en la democracia colombiana.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4>Explorar</h4>
                        <ul>
                            <li onClick={() => navigate('/')}>Inicio</li>
                            <li onClick={() => navigate('/servicios')}>Servicios</li>
                            <li onClick={() => navigate('/equipo')}>Equipo</li>
                            <li onClick={() => navigate('/archivo')}>Archivo</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Proyectos</h4>
                        <ul>
                            <li onClick={() => navigate('/blog')}>Blog</li>
                            <li onClick={() => navigate('/proyectos/taracea')}>Taracea</li>
                            <li onClick={() => navigate('/proyectos/interlocuciones')}>Interlocuciones</li>
                            <li onClick={() => navigate('/proyectos/polifonias')}>Polifonías</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Contacto</h4>
                        <ul>
                            <li>
                                <a href="mailto:centrociammedios@gmail.com">
                                    centrociammedios@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+573025711196">+57 302 571 1196</a>
                            </li>
                            <li>Calle 38 # 15 – 10, Teusaquillo</li>
                            <li>Bogotá D.C., Colombia</li>
                        </ul>

                        <div className="footer-social">
                            <a
                                href="https://facebook.com/centrociam"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                            ><FaFacebook /></a>
                            <a
                                href="https://instagram.com/centro_ciam"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                            ><FaInstagram /></a>
                            <a
                                href="https://x.com/centro_CIAM"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X / Twitter"
                            ><FaXTwitter /></a>
                            <a
                                href="https://youtube.com/@centrociam"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="YouTube"
                            ><FaYoutube /></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} Corporación CIAM. Todos los derechos reservados.</span>
                    <span>Hecho en Bogotá</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
