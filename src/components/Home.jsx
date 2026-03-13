import "./Home.css"
import { FiBriefcase, FiBookOpen, FiShare2, FiSearch } from 'react-icons/fi'


function Home () {
    return(
        <div className="Home">
            {/* <section className="quienes-somos">
                <div className="qs-overlay">
                    <h2>¿Quiénes somos?</h2>
                    <p>La Corporación CIAM es un Centro de Pensamiento dedicado a articular y fortalecer los saberes que circulan en la democracia colombiana, con el objetivo de construir colectivamente estrategias de acción política para el cuidado y gobierno de la vida común.</p>
                </div>
            </section> */}
            
            <section className="mision-vision">
                <div className="mision">
                    <h2>Misión</h2>
                    <p>Ser un Centro de Pensamiento que ofrece servicios de investigación social y sistematización de experiencias, formación, capacitación, asesorías y consultorías a actores sociales, estatales, gubernamentales y públicos, con el objetivo de fortalecer su capacidad de incidencia en la toma de decisiones públicas.</p>
                </div>
                <div className='mision-vision-divider'></div>
                <div className="vision">
                    <h2>Visión</h2>
                    <p>Convertirnos en uno de los referentes más importantes para la generación de conocimientos sociales que fortalezcan las capacidades comunitarias, populares y ciudadanas de los actores políticos y que hagan posible un desarrollo más integral de la democracia colombiana.</p>
                </div>
            </section>

            <section className="servicios">
                <h2>Nuestros Servicios</h2>
                <div className="servicios-grid">
                    <div className="servicio-card">
                        <FiBriefcase className="servicio-icono" />
                        <h3>Consultorías y Asesorías</h3>
                        <p>Implementamos estrategias basadas en la eficiencia para optimizar procesos, mejorar la productividad y facilitar la toma de decisiones informadas dentro de su organización.</p>
                    </div>
                    <div className="servicio-card">
                        <FiBookOpen className="servicio-icono" />
                        <h3>Formación y Capacitación</h3>
                        <p>Diseñamos e implementamos programas de formación y acompañamiento para líderes y lideresas en ámbitos políticos, comunitarios, sindicales, gremiales y empresariales.</p>
                    </div>
                    <div className="servicio-card">
                        <FiShare2 className="servicio-icono" />
                        <h3>Comunicación y Difusión</h3>
                        <p>Brindamos asesoría especializada para el diseño e implementación de estrategias de comunicación efectivas, tanto en el ámbito interno como externo.</p>
                    </div>
                    <div className="servicio-card">
                        <FiSearch className="servicio-icono" />
                        <h3>Investigación Social</h3>
                        <p>Producimos informes detallados sobre el contexto político, social y económico, identificando tendencias, riesgos y oportunidades para la toma de decisiones estratégicas.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home