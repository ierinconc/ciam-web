import './Navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar(){
    const navigate = useNavigate()
    return(
        <nav className='Navbar'>
            <h1 onClick={()=>{navigate('/')}}>CIAM</h1>
            <ul className='nav-links'>
                <li onClick={() => {('/')}}>Inicio</li>
                <li onClick={()=>{('/servicios')}}>Servicios</li>
                <li onClick={()=>{('/equipo')}}>Equipo</li>
                <li className='nav-dropdown'>
                    Proyectos
                    <ul className='dropdown-menu'>
                        <li onClick={()=>{('/blog')}}>Blog</li>
                        <li onClick={()=>{('/proyectos/tarasea')}}>Tarasea</li>
                        <li onClick={()=>{('/proyectos/inerlocuciones')}}>Interlocuciones</li>
                        <li onClick={()=>{('/proyectos/polifonias')}}>Polifonias</li>
                    </ul>
                </li>
                <li onClick={()=>('/archivo')}>Archivo</li>
            </ul>
        </nav>
    )
}

export default Navbar