import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './ArticlePage.css'


function ArticlePage (){
    const navigate = useNavigate()
    const {id} = useParams()
    const [article, setArticle] = useState(null)

    useEffect(() => {
        fetch(`https://centrociam.org/wp-json/wp/v2/posts/${id}?_embed`)
        .then(response => response.json())
        .then(data => setArticle(data))

    }, [id])

    if(!article) return <p>Cargando...</p>

    return (
        <div className="article-page">
            <div className='back-button' onClick={() => navigate('/')}> ← Volver al inicio</div>

            <h1 dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
                {article._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <img className="article-image" src={article._embedded['wp:featuredmedia'][0].source_url} alt="imagen del artículo" />)}
            <p className='article-meta'>
                {new Date(article.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                · {article._embedded.author[0].name}
                · {article._embedded['wp:term'][0].map(cat => cat.name).join(', ')}
            </p>
        
            <div className='article-body' dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
        </div>
    )

}

export default ArticlePage
    