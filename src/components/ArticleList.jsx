import { useState, useEffect } from 'react'
import './ArticleList.css'
function ArticleList() { 
    const [articles, setArticles] = useState ([])

    useEffect (() => {
        fetch('https://centrociam.org/wp-json/wp/v2/posts?per_page=6')
        .then(response => response.json())
        .then(data => setArticles(data))
    }, [])

    return (
    <div className="articles-section">
        <h2>Últimos Artículos</h2>
        <div className="articles-grid">
        {articles.map(article => (
            <div key={article.id} className="article-card">
            <h3 dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
            </div>
        ))}
        </div>
    </div>
    )

}


export default ArticleList
