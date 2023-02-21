import { useState, useContext, useEffect } from "react";
import QuestionModal from "../modals/QuestionModal";
import Pagination from "../UI/Pagination";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

function QuestionBank() {
  const [isOpen, setIsOpen] = useState(false);
  const [taxonomies, setTaxonomies] = useState({
    category: null,
    tag: null,
    level: null,
    language: null,
  });
  const [questions, setQuestions] = useState(null);
  const [question, setQuestion] = useState({});
  const [isCreate, setIsCreate] = useState(true);
  const { token } = useContext(AuthContext);
  const { request } = useHttp();

  const getTaxomonies = async () => {
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
  };

  const getQuestions = async (page) => {
    let query;
    page ? (query = "?page=" + page) : (query = "");
    const questions = await request("/api/content/question-bank" + query, "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setQuestions(questions);
  };

  const removeHandler = async (slug) => {
    await request("/api/content/question-bank/" + slug, "delete", null, {
      Authorization: `Bearer ${token}`,
    });
    //  getQuestions();
  };

  const editHandler = async (question) => {
    setIsCreate(false);
    setQuestion(question);
    setIsOpen(true);
  };

  const createHandler = () => {
    setIsCreate(true);
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
    //   getQuestions();
    setQuestion({});
  };

  const pageHandler = (page) => {
    getQuestions(page);
  };

  useEffect(() => {
    getTaxomonies();
    getQuestions();
  }, []);

  return (
    <div className="content-page question">
      <div className="top">
        <h1 className="title">Question</h1>
        <button onClick={createHandler}>create</button>
      </div>
      <>
        <div className="list">
          {questions?.map((question) => {
            return (
              <div className="list-item" key={question._id}>
                <span className="title">{question.title}</span>
                <div className="btns">
                  <button onClick={() => editHandler(question)}>Edit</button>
                  <button onClick={() => removeHandler(question._id)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          pages={questions?.pages}
          page={questions?.page}
          pageHandler={pageHandler}
        />
      </>

      <QuestionModal
        open={isOpen}
        onClose={closeHandler}
        question={question}
        isCreate={isCreate}
        setQuestions={setQuestions}
      ></QuestionModal>
    </div>
  );
}

export default QuestionBank;
