import { useState, useEffect } from 'react'
import './ArticleList.css'
import { useNavigate } from 'react-router-dom'

function ArticleList() { 
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://centrociam.org/wp-json/wp/v2/posts?per_page=100&_embed')
        .then(response => response.json())
        .then(data => setArticles(data))
    }, [])

    return (
        <div className="blog-page">
            <div className="blog-header">
                <h1>Blog</h1>
                <p>Análisis, investigación y opinión política</p>
            </div>
            <div className="blog-grid">
                {articles.map(article => {
                    const imagen = article._embedded?.['wp:featuredmedia']?.[0]?.source_url
                    return (
                        <div key={article.id} className="blog-card" onClick={() => navigate(`/articulo/${article.id}`)}>
                            {imagen && <img src={imagen} alt="" className="blog-card-img" />}
                            <div className="blog-card-body">
                                <h3 dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
                                <p dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }} />
                                <span className="blog-leer">Leer más →</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ArticleList