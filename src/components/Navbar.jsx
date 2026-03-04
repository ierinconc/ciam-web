import './Navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar(){
    const navigate = useNavigate()
    return(
        <nav className='Navbar'>
            <h1 onClick={()=>{navigate('/')}}>CIAM</h1>
            <ul>
                <li>Inicio</li>
                <li>Política Nacional</li>
                <li>Paz y Conflicto</li>
                <li>Quiénes Somos</li>
            </ul>
        </nav>
    )
}

export default Navbar