import './Footer.css'

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
            </div>
            <div className='footer-social'>
                <p>Twitter / X</p>
                <p>Facebook</p>
                <p>Instagram</p>
                <p>YouTube</p>
            </div>
            <div className='footer-copy'>
                <p>© 2026 CIAM. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer