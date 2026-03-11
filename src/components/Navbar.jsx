import './Navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar(){
    const navigate = useNavigate()
    return(
        <nav className='Navbar'>
            <h1 onClick={()=>{navigate('/')}}>CIAM</h1>
            <ul className='nav-links'>
                <li onClick={() => navigate('/')}>Inicio</li>
                <li onClick={()=> navigate('/servicios')}>Servicios</li>
                <li onClick={()=> navigate('/equipo')}>Equipo</li>
                <li className='nav-dropdown'>
                    Proyectos
                    <ul className='dropdown-menu'>
                        <li onClick={()=>navigate('/blog')}>Blog</li>
                        <li onClick={()=>navigate('/proyectos/tarasea')}>Tarasea</li>
                        <li onClick={()=>navigate('/proyectos/inerlocuciones')}>Interlocuciones</li>
                        <li onClick={()=>navigate('/proyectos/polifonias')}>Polifonias</li>
                    </ul>
                </li>
                <li onClick={()=> navigate('/archivo')}>Archivo</li>
            </ul>
        </nav>
    )
}

export default Navbar