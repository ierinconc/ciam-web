import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

function Navbar(){
    const [scrolled, setScrolled ] = useState(false)
    useEffect(()=>{
        const handleScroll = ()=>{
            if(scrollY > 50){
                setScrolled(true)
            }else{
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    },[])
    const navigate = useNavigate()
    return(
        <nav className={`Navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <img 
                src="/logo-ciam-blanco.png" 
                alt="Logo CIAM" 
                className='navbar-logo'
                onClick={()=>{navigate('/')}}
            />
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