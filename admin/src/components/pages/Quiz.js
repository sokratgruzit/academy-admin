import { useState, useContext, useEffect } from "react";
import QuizModal from "../modals/QuizModal";
import Pagination from "../UI/Pagination";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

function Quiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [taxonomies, setTaxonomies] = useState({
    category: null,
    tag: null,
    level: null,
    language: null,
  });
  const [questions, setQuestions] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [isCreate, setIsCreate] = useState(true);
  const { token } = useContext(AuthContext);
  const { request } = useHttp();

  const getTaxomonies = async () => {
    Promise.allSettled([
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
    ]).then((results) => {
      let mappedResults;
      results.forEach((result) => {
        mappedResults = results.map((result) => {
          if (result.status === "fulfilled") {
            return result.value;
          }
          return null;
        });
      });

      setTaxonomies({
        category: mappedResults[0],
        tag: mappedResults[1],
        level: mappedResults[2],
        language: mappedResults[3],
      });
    });
  };

  const getQuestions = async () => {
    const questions = await request("/api/content/question-bank?limit=0", "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setQuestions(questions);
  };

  const getQuiz = async (page) => {
    let query;
    page ? (query = "?page=" + page) : (query = "");
    const quizzes = await request("/api/content/quiz" + query, "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setQuizzes(quizzes.result);
  };

  const removeHandler = async (title) => {
    const result = await request("/api/content/quiz/" + title, "delete", null, {
      Authorization: `Bearer ${token}`,
    });
    setQuizzes((prev) => ({
      ...prev,
      docs: [...prev.docs.filter((quiz) => quiz.title !== result.title)],
    }));
  };

  const editHandler = async (quiz) => {
    setIsCreate(false);
    setQuiz(quiz);
    setIsOpen(true);
  };

  const createHandler = () => {
    setIsCreate(true);
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
    getQuiz();
    setQuiz({});
  };

  const pageHandler = (page) => {
    getQuiz(page);
  };

  useEffect(() => {
    getTaxomonies();
    getQuestions();
    getQuiz();
  }, []);

  return (
    <div className="content-page quiz">
      <div className="top">
        <h1 className="title">Quizzes</h1>
        <button onClick={createHandler}>create</button>
      </div>
      <>
        <div className="list">
          {quizzes?.docs?.map((quiz) => {
            return (
              <div className="list-item" key={quiz._id}>
                <span className="title">{quiz.slug}</span>
                <div className="btns">
                  <button onClick={() => editHandler(quiz)}>Edit</button>
                  <button onClick={() => removeHandler(quiz.slug)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination pages={quizzes.pages} page={quizzes.page} pageHandler={pageHandler} />
      </>

      <QuizModal
        open={isOpen}
        onClose={closeHandler}
        taxonomies={taxonomies}
        questions={questions}
        quiz={quiz}
        isCreate={isCreate}
        setQuizzes={setQuizzes}
      ></QuizModal>
    </div>
  );
}

export default Quiz;
