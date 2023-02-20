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

  const [first, setfirst] = useState(3);

  useEffect(() => {
    setfirst(3);
  }, [first]);

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

  //Images managment
  const removeHandler = async (chosenArticle) => {
    const result = await request(
      "/api/content/articles/" + chosenArticle._id,
      "delete",
      null,
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (result.message === "Article successuly deleted") {
      const updatedItems = articles.docs.filter(
        (item) => item.title !== chosenArticle.title,
      );
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
                    src={article?.image?.path}
                    // src={`https://ffedfd2f3d05057467d4cef2f82a1b7f44118e779d39ab71ad63edc-apidata.googleusercontent.com/download/storage/v1/b/academy-images/o/download.jpeg?jk=AahUMluQCRd8TAMF0wXsnMBOKINV6D_3QGHKChXPSrrPplHhTwUuPA8ByORpPcRzu13gq56UKLLPxZ1qUVQ2ixHWfxoLRLL7AYZQV1v4OcuoXVgB9Mw4uBMMdlkOmp-F5w15NqciuQCVvMHISUBCfyoRUeuH4ko79-NkvhY-RmtyU-dtoz5BRoPK13DezpmvRdWsbphEj2eY2YH1nH15ym7Zc33jJ329LIa-O2oaJWHd8Rjfplltsocn4zj0ippf5bhUVmGmRoygUhvyLGfy6XWGbU654-Pc6etY0cut7Yn4SvSqTxTqAfi9CEl02iyyoivqGK_9WEqUrY6IWkSTKonw42AqSTH-6p95W4hBK2LQFQlM67D8DwFHSr5tfEqnBmRpiWcQxFUN6SKAX1jDfYSmm2946mFvMd_7Gf-h5UT2zk8mh5knCEPgecz_mStOZwvUXlIqm50ZEuSCxUrbv8bxWfq5cngJ6CiggnNGpfx0HG6woxBV0sTb0ta3ymLDBzod9DpndSTQp0C5ZkKkxle9aKoeEO2VA0-WAxamkgq2V7jNuTjBOD3eS54qXPl1CqY6hbZCwKQRph7b88XNRksZjr_AqFXL01CoWGaA_QzjIpkRaWQxsch319jkJ9JdZszMWNHvvFdS08qg70S6QIIBK9zFmta6Bpzw0stErZnAU2Q_78ybAxJCQ4fqxowhzoOQ361IEQETwe0zxfmrbq-u88qwJsf56JU4e69fFPTVuOgFR0os1Di9mJaNhL1QQpn8-Lam5woXqOE7W9jxHXQj2p-VBD07lWLFBqZKxfzttd_cJszBNOY0PqKcb0UWTrNkk7UZLDpkTIf999MqMODvhWyj-nG_1FnIm8QuFW6WCTIjb2HpB4TopCOt5ozmwm6wCKwr2JKCZ-ATaNIlFACOW8IrOuS6NuaDMUQjG0nmha6CL8pnTINFW5gx-PJwLtFFQlMoXVOPEQgPUVSPgFUxw4pbr3PJkVzSzwPEOEFsLS5pR3tYszh30v0x15A7qOvlzYtJuq6-t1tYGLyZs1_9aUgozBhZMIeeczsDzh-HjHC_vV1edF9GVD0COKVDCRFAcM535ziPpEPN2JejgmsG8nBYJw2Rz-LEJdIhobfxS-V364U_-7DbUtBSAZOpMbhHtoB-5mXaOeWw1o-Bm49yZA&isca=1`}
                    alt={article?.image?.alt}
                  />
                  <span className="title">{article.slug}</span>
                  <div className="btns">
                    <button onClick={() => editHandler(article)}>Edit</button>
                    <button onClick={() => removeHandler(article)}>Remove</button>
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
