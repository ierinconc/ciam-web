import { useEffect, useRef} from 'react'
import './ScrollHero.css'

function ScrollHero() {
    const logoRef = useRef(null)
    const textoRef = useRef(null)

    useEffect(()=>{
        const handleScroll = ()=> {
            console.log(scrollY)
            if(logoRef.current && textoRef.current){
                logoRef.current.style.transform = `translateX(calc(-50% - ${Math.min(scrollY * 0.5, 246)}px))`

                textoRef.current.style.opacity = Math.min(scrollY / 200, 1)
                textoRef.current.style.transform = `translateY(-50%)`


            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return(
        <div className='scroll-hero'>
            <div className='sh-sticky'>
                <div className='sh-logo' ref={logoRef}>
                    <img src="/logo-ciam-blanco.png" alt="Logo CIAM" />
                </div>
                 <div className='sh-texto' ref={textoRef}>
                    <h2>¿Quiénes Somos?</h2>
                    <p>La Corporación CIAM es un Centro de Pensamiento dedicado a articular y fortalecer los saberes que circulan en la democracia colombiana, con el objetivo de construir colectivamente estrategias de acción política para el cuidado y gobierno de la vida común.</p>
                </div>
            </div>
           
        </div>
    )
}

export default ScrollHero