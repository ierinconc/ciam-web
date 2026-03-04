import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ArticleList from './components/ArticleList'
import ArticlePage from './components/ArticlePage'
import Hero from './components/Hero'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Hero />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articulo/:id" element={<ArticlePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App