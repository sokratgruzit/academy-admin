import { useState, useContext, useEffect } from "react";
import QuizModal from "../modals/QuizModal";
import Pagination from "../UI/Pagination";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

function Quiz() {
   const [isOpen, setIsOpen] = useState(false);
   const [taxonomies, settaxonomies] = useState({
      category: null,
      tag: null,
      level: null,
      language: null
   })
   const [questions, setQuestions] = useState(null);
   const [quizzes, setQuizzes] = useState(null);
   const [quiz, setQuiz] = useState({});
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

   const getQuestions = async () => {
      const questions = await request('/api/content/question-bank', 'GET', null, {
         Authorization: `Bearer ${token}`
      }); 
      if(questions.result?.length) setQuestions(questions.result);
   }

   const getQuiz = async (page) => {
      let query;
      page ? query = '?page=' + page : query  = '';
      const quizzes = await request('/api/content/quiz' + query , 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      setQuizzes(quizzes);
   }

   const removeHandler = async (slug) => {
      await request('/api/content/quiz/' + slug, 'delete', null, {
         Authorization: `Bearer ${token}`
      });
      getQuiz();
   }

   const editHandler = async (quiz) => {
      setIsCreate(false);
      setQuiz(quiz);
      setIsOpen(true);
   }

   const createHandler = () => {
      setIsCreate(true);
      setIsOpen(true);
   }

   const closeHandler = () => {
      setIsOpen(false);
      getQuiz();
      setQuiz({});
   }

   const pageHandler = (page) => {
      getQuiz(page);
   }

   useEffect(() => {
      getTaxomonies();
      getQuestions();
      getQuiz();
   }, [])


   return (
      <div className="content-page quiz" >
         <div className="top">
            <h1 className="title">Quizzes</h1>
            <button onClick={createHandler}>create</button>
         </div>
         {quizzes && quizzes.result ? (
            <>
               <div className="list">
                  {quizzes.result.map((quiz) => {
                     return (
                        <div className="list-item" key={quiz._id}>
                           <span className="title">{quiz.slug}</span>
                           <div className="btns">
                              <button onClick={() => editHandler(quiz)}>Edit</button>
                              <button onClick={() => removeHandler(quiz.slug)}>Remove</button>
                           </div>
                        </div>
                     )
                  })}
               </div> 
               <Pagination pages={quizzes.pages} page={quizzes.page} pageHandler={pageHandler} />
            </>
         ) : null}

         <QuizModal
            open={isOpen}
            onClose={closeHandler}
            taxonomies={taxonomies}
            questions={questions}
            quiz={quiz} 
            isCreate={isCreate}>
         </QuizModal>
      </div>

   )
}

export default Quiz; 