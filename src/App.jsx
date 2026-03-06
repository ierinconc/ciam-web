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
        <Route path="/articulo/:id" element={<ArticlePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App