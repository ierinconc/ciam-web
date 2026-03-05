import './Footer.css'
import {FaFacebook, FaInstagram, FaYoutube} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

function Footer(){
    return(
        <footer className="footer">
            <div className= 'footer-brand'>
                <h3>CENTRO CIAM</h3>
                <p>Centro de Investigación, Análisis y Mediaciones</p>
            </div>
            <div className='footer-info'>
                <p>centrociammedios@gmail.com</p>
                <p>Calle 38 # 15 - 10, Teusaquillo</p>
                <p>Bogotá D.C., Colombia</p>
                <p>Teléfono: +57 302 571 1196</p>
            </div>
            <div className='footer-social'>
                <a href="https://facebook.com/centrociam" target='_blank'><FaFacebook/> Facebook</a>
                <a href="https://instagram.com/centro_ciam" target='_blank'><FaInstagram/> Instagram</a>
                <a href="https://x.com/centro_CIAM" target='_blank'><FaXTwitter/> X/Twitter</a>
                <a href="https://youtube.com/@centrociam" target='_blank'><FaYoutube/> YouTube</a>
            </div>
            <div className='footer-copy'>
                <p>© 2026 CIAM. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer