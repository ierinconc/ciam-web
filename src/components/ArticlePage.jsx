import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'


function ArticlePage (){
    const {id} = useParams()
    const [article, setArticle] = useState(null)

    useEffect(() => {
        fetch(`https://centrociam.org/wp-json/wp/v2/posts/${id}`)
        .then(response => response.json())
        .then(data => setArticle(data))

    }, [id])

    if(!article) return <p>Cargando...</p>

    return (
        <div>
            <h1 dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
            <div dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
        </div>
    )

}

export default ArticlePage
    