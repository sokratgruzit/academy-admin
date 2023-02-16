import { useState, useContext, useEffect } from "react";
import ArticleModal from "../modals/ArticleModal";
import Pagination from "../UI/Pagination";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

function Article() {
  const [isOpen, setIsOpen] = useState(false);
  const [taxonomies, setTaxonomies] = useState({
    category: null,
    tag: null,
    level: null,
    language: null,
  });

  const [articles, setArticles] = useState(null);
  const [article, setArticle] = useState({});
  const [isCreate, setIsCreate] = useState(true);
  const { token } = useContext(AuthContext);
  const { request } = useHttp();

  const getTaxomonies = async () => {
    try {
      const [category, tag, level, language] = await Promise.all([
        request("/api/content/category", "GET", null, {
          Authorization: `Bearer ${token}`,
        }),
        request("/api/content/tag", "GET", null, {
          Authorization: `Bearer ${token}`,
        }),
        request("/api/content/level", "GET", null, {
          Authorization: `Bearer ${token}`,
        }),
        request("/api/content/language", "GET", null, {
          Authorization: `Bearer ${token}`,
        }),
      ]);

      setTaxonomies({ category, tag, level, language });
    } catch (error) {
      console.error(error);
    }
  };

  const getArticles = async (page) => {
    let query;
    page ? (query = "?page=" + page) : (query = "");
    const articles = await request("/api/content/articles" + query, "GET", null, {
      Authorization: `Bearer ${token}`,
    });

    setArticles(articles);
  };

  const removeHandler = async (slug) => {
    const result = await request("/api/content/articles/" + slug, "delete", null, {
      Authorization: `Bearer ${token}`,
    });

    if (result.message === "Article successuly deleted") {
      const updatedItems = articles.docs.filter((item) => item.title !== slug);
      setArticles((prev) => ({ ...prev, docs: updatedItems }));
    }
  };

  const editHandler = async (article) => {
    setIsCreate(false);
    setArticle(article);
    setIsOpen(true);
  };

  const createHandler = () => {
    setIsCreate(true);
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  const pageHandler = (page) => {
    getArticles(page);
  };

  useEffect(() => {
    getTaxomonies();
    getArticles();
  }, []);

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
                  <img
                    className="thumbnail private"
                    src={article.image.path}
                    alt={article.image.alt}
                  />
                  <span className="title">{article.slug}</span>
                  <div className="btns">
                    <button onClick={() => editHandler(article)}>Edit</button>
                    <button onClick={() => removeHandler(article.slug)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination
            pages={articles.pages}
            page={articles.page}
            pageHandler={pageHandler}
          />
        </>
      ) : null}

      <ArticleModal
        open={isOpen}
        onClose={closeHandler}
        taxonomies={taxonomies}
        article={article}
        isCreate={isCreate}
        setArticles={setArticles}
      ></ArticleModal>
    </div>
  );
}

export default Article;
