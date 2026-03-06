import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ArticleList from './components/ArticleList'
import ArticlePage from './components/ArticlePage'
import Hero from './components/Hero'
import Home from './components/Home'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Home />
          </>
        } />
        <Route path="/servicios" element={<div>Servicios</div>} />
        <Route path="/equipo" element={<div>Equipo</div>} />
        <Route path="/blog" element={<ArticleList />} />
        <Route path="/articulo/:id" element={<ArticlePage />} />
        <Route path="/proyectos/tarasea" element={<div>Tarasea</div>} />
        <Route path="/proyectos/interlocuciones" element={<div>Interlocuciones</div>} />
        <Route path="/proyectos/polifonias" element={<div>Polifonías</div>} />
        <Route path="/archivo" element={<div>Archivo</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App