import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './components/Home'
import ArticleList from './components/ArticleList'
import ArticlePage from './components/ArticlePage'
import Team from './components/Team'
import Services from './components/Services'
import Interlocuciones from './components/Interlocuciones'
import Polifonias from './components/Polifonias'
import Archivo from './components/Archivo'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/equipo" element={<Team />} />
          <Route path="/blog" element={<ArticleList />} />
          <Route path="/articulo/:id" element={<ArticlePage />} />
          <Route path="/proyectos/taracea" element={<PlaceholderPage title="Taracea" />} />
          <Route path="/proyectos/interlocuciones" element={<Interlocuciones />} />
          <Route path="/proyectos/polifonias" element={<Polifonias />} />
          <Route path="/archivo" element={<Archivo />} />
        </Routes>
      </main>
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  )
}

function PlaceholderPage({ title }) {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8rem 2rem',
      textAlign: 'center'
    }}>
      <span style={{
        fontSize: '0.7rem',
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        color: 'var(--color-ink-muted)',
        marginBottom: '1.5rem'
      }}>
        Próximamente
      </span>
      <h1 style={{
        fontSize: 'var(--text-4xl)',
        fontWeight: 200,
        letterSpacing: '-0.02em'
      }}>
        {title}
      </h1>
      <p style={{
        marginTop: '1.5rem',
        color: 'var(--color-ink-muted)',
        maxWidth: '420px'
      }}>
        Esta sección está en construcción.
      </p>
    </div>
  )
}

export default App
