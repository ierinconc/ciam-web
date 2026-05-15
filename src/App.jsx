import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'

// Componentes que siempre están en pantalla → import directo
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollResetOnRoute from './components/ScrollResetOnRoute'

// Home se importa directo porque es la primera ruta que ve el usuario
import Home from './components/Home'

// Patch 31: code splitting por ruta. Cada página se descarga solo cuando
// el usuario entra a ella. El Home arranca cargando ~80 KB en lugar de
// 308 KB. Impacto enorme en mobile/conexiones lentas.
const ArticleList = lazy(() => import('./components/ArticleList'))
const ArticlePage = lazy(() => import('./components/ArticlePage'))
const Team = lazy(() => import('./components/Team'))
const Services = lazy(() => import('./components/Services'))
const Interlocuciones = lazy(() => import('./components/Interlocuciones'))
const Polifonias = lazy(() => import('./components/Polifonias'))
const Archivo = lazy(() => import('./components/Archivo'))

/**
 * Fallback mientras se carga la ruta. Minimalista para no competir con
 * el contenido real que va a aparecer en ~200ms. Usa los mismos tokens
 * del sitio para que se sienta coherente.
 */
function RouteFallback() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
      }}
      aria-label="Cargando"
      role="status"
    >
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--color-accent, #5b1268)',
          opacity: 0.4,
          animation: 'ciamPulse 1.4s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes ciamPulse {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
      `}</style>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollResetOnRoute />
      <Navbar />
      <main>
        <Suspense fallback={<RouteFallback />}>
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
        </Suspense>
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
