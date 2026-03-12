import './Hero.css'

function Hero (){
    return(
        <div className="hero" style={{backgroundImage: 'url(/HERO.png',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className='hero-overlay'></div>
            <div className='hero-content'>
              
            </div>    
        </div>
    )
}

export default Hero