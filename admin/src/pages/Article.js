import { useState, useContext, useEffect } from "react";
import ArticleModal from "../components/modals/ArticleModal";
import Pagination from "../components/UI/Pagination";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

function Article() {
   const [isOpen, setIsOpen] = useState(false);
   const [taxonomies, settaxonomies] = useState({
      category: null,
      tag: null,
      level: null,
      language: null
   })
   const [articles, setArticles] = useState(null);
   const [article, setArticle] = useState({});
   const [isCreate, setIsCreate] = useState(true)
   const { token } = useContext(AuthContext);
   const { request } = useHttp();



   const getTaxomonies = async () => {
      const category = await request('/api/content/category', 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      const tag = await request('/api/content/tag', 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      const level = await request('/api/content/level', 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      const language = await request('/api/content/language', 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      settaxonomies({ category, tag, level, language });
   }

   const getArticles = async (page) => {
      console.log(page)
      let query;
      page ? query = '?page=' + page : query  = '';
      const articles = await request('/api/content/articles' + query , 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      setArticles(articles);
   }

   const removeHandler = async (slug) => {
      const result = await request('/api/content/articles/' + slug, 'delete', null, {
         Authorization: `Bearer ${token}`
      });
      getArticles();
   }

   const editHandler = async (article) => {
      setIsCreate(false);
      setArticle(article);
      setIsOpen(true);
   }

   const createHandler = () => {
      setIsCreate(true);
      setIsOpen(true);
   }

   const closeHandler = () => {
      setIsOpen(false);
      getArticles();
      setArticle({});
   }

   const pageHandler = (page) => {
      getArticles(page);
   }

   useEffect(() => {
      getTaxomonies();
      getArticles();
   }, [])


   return (
      <div className="content-page article">
         <div className="top">
            <h1 className="title">Article</h1>
            <button onClick={createHandler}>create</button>
         </div>
         {articles && articles.total ? (
            <>
               <div className="list">
                  {articles.docs.map((article) => {
                     return (
                        <div className="list-item" key={article._id}>
                           <span className="title">{article.slug}</span>
                           <div className="btns">
                              <button onClick={() => editHandler(article)}>Edit</button>
                              <button onClick={() => removeHandler(article.slug)}>Remove</button>
                           </div>
                        </div>
                     )
                  })}
               </div>
               <Pagination pages={articles.pages} page={articles.page} pageHandler={pageHandler} />
            </>
         ) : null}

         <ArticleModal
            open={isOpen}
            onClose={closeHandler}
            taxonomies={taxonomies}
            article={article}
            isCreate={isCreate}>
         </ArticleModal>
      </div>
   )
}

export default Article; 