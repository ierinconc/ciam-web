import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './ArticlePage.css'


function ArticlePage (){
    const navigate = useNavigate()
    const {id} = useParams()
    const [article, setArticle] = useState(null)

    useEffect(() => {
        fetch(`https://centrociam.org/wp-json/wp/v2/posts/${id}`)
        .then(response => response.json())
        .then(data => setArticle(data))

    }, [id])

    if(!article) return <p>Cargando...</p>

    return (
        <div className="article-page">
            <div className='back-button' onClick={() => navigate('/')}> ← Volver al inicio

            </div>
            <h1 dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
            <div className='article-meta'>
                CIAM · Centro de Investigación, Análisis y Mediaciones
            </div>
            <div className='article-body' dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
        </div>
    )

}

export default ArticlePage
    