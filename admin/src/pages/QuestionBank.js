import { useState, useContext, useEffect } from "react";
import QuestionModal from "../components/modals/QuestionModal";
import Pagination from "../components/UI/Pagination";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

function QuestionBank() {
   const [isOpen, setIsOpen] = useState(false);
   const [taxonomies, settaxonomies] = useState({
      category: null,
      tag: null,
      level: null,
      language: null
   })
   const [questions, setQuestions] = useState(null);
   const [question, setQuestion] = useState({});
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

   const getQuestions = async (page) => {
      let query;
      page ? query = '?page=' + page : query  = '';
      const questions = await request('/api/content/question-bank' + query , 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      setQuestions(questions);
   }

   const removeHandler = async (slug) => {
      await request('/api/content/question-bank/' + slug, 'delete', null, {
         Authorization: `Bearer ${token}`
      });
      getQuestions();
   }

   const editHandler = async (question) => {
      setIsCreate(false);
      setQuestion(question);
      setIsOpen(true);
   }

   const createHandler = () => {
      setIsCreate(true);
      setIsOpen(true);
   }

   const closeHandler = () => {
      setIsOpen(false);
      getQuestions();
      setQuestion({});
   }

   const pageHandler = (page) => {
      getQuestions(page);
   }

   useEffect(() => {
      getTaxomonies();
      getQuestions();
   }, [])


   return (
      <div className="content-page question" >
         <div className="top">
            <h1 className="title">Question</h1>
            <button onClick={createHandler}>create</button>
         </div>
         {questions && questions.result ? (
            <>
               <div className="list">
                  {questions.result.map((question) => {
                     return (
                        <div className="list-item" key={question._id}>
                           <span className="title">{question.slug}</span>
                           <div className="btns">
                              <button onClick={() => editHandler(question)}>Edit</button>
                              <button onClick={() => removeHandler(question.slug)}>Remove</button>
                           </div>
                        </div>
                     )
                  })}
               </div> 
               <Pagination pages={questions.pages} page={questions.page} pageHandler={pageHandler} />
            </>
         ) : null}

         <QuestionModal
            open={isOpen}
            onClose={closeHandler}
            taxonomies={taxonomies}
            question={question} 
            isCreate={isCreate}>
         </QuestionModal>
      </div>
   )
}

export default QuestionBank; 