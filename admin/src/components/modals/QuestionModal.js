import { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import BaseInput from '../UI/BaseInput'
import BaseSelect from '../UI/BaseSelect';
import Modal from './Modal';
import BaseEditor from '../UI/BaseEditor';
import BaseCheckox from '../UI/BaseCheckbox';


function QuestionModal({ open = false, onClose, taxonomies, question, isCreate }) {
   const { token } = useContext(AuthContext);
   const { request } = useHttp();
   const [myEditor, setMyEditor] = useState(null);
   const [answersLength, setAnswersLength] = useState(1);

   const submitHandler = async (e) => {
      e.preventDefault();

      let formData = {
         title: '',
         type: null,
         question: '',
         answers: [],
         editor: ''
      };
      formData.title = e.target.title.value;
      formData.type = e.target.type.value || null;
      formData.question = e.target.question.value;
      formData.editor = myEditor.getData();

      const getDynamicValues = (prefix, length, name) => {
         let obj = {}
         for (let i = 0; i < length; i++) {
            obj.title = e.target[`${prefix}_title_${i + 1}`].value
            obj.value = e.target[`${prefix}_value_${i + 1}`].checked
            formData[name].push(obj)
            obj = {}
         }
      }
      getDynamicValues('answ', answersLength, 'answers')

      const method = isCreate ? 'POST' : 'PUT';
      const path = isCreate ? '/api/content/question-bank' : '/api/content/question-bank/' + question.slug;

      const result = await request(path, method, formData, {
         Authorization: `Bearer ${token}`
      });
      onClose();
   }

   const answers = [];
   for (let i = 1; i <= answersLength; i++) {
      answers.push(
         (
            <div key={i}>
               <BaseInput
                  type="text"
                  id={`answ_title_${i}`}
                  name={`answ_title_${i}`}
                  label="title"
                  defaultValue={question?.answers && question.answers[i - 1]?.title ? question.answers[i - 1].title : ''}
                  placeholder="title" />
               <br />
               <BaseCheckox name={`answ_value_${i}`} id={`answ_value_${i}`} label="is question correct or false"
                  defaultChecked={question?.answers && question.answers[i - 1]?.value ? question.answers[i - 1].value : false} />
               <br />
               <br />
               <hr/>
            </div>
         )
      )
   }


   useEffect(() => {
      if(question.answers){
         setAnswersLength(question.answers.length || 1)
      }else{
         setAnswersLength(1)
      }
   }, [open])

   return (
      <Modal open={open} onClose={onClose} title="Question">
         <form onSubmit={submitHandler} className="form-list">
            <BaseInput
               type="text"
               id="title"
               name="title" defaultValue={question.title || ''}
               label="title"
               placeholder="enter title" />
            <BaseSelect
               name="type"
               options={[
                  { value: 'question', label: 'question' },
                  { value: 'informational', label: 'informational' }
               ]}
               defaultValue={question.type}
               placeholder='select type'
            />
            <BaseInput
               type="text"
               id="question"
               name="question" defaultValue={question.question || ''}
               label="question"
               placeholder="enter question" />

            {answersLength && (
               <div>
                  <h4>answers</h4>
                  <br />
                  {answers}
                  <br />
                  <div className='btn' onClick={() => setAnswersLength(answersLength + 1)}>add answer</div>
                  {answersLength > 1 ? (
                     <div className='btn' onClick={() => setAnswersLength(answersLength - 1)}>remove answer</div>
                  ) : ''}
               </div>
            )}

            <BaseEditor data={question.editor} setMyEditor={setMyEditor} id="questionEditor" />

            <button className='btn' type="submit"> submit</button>
         </form>
      </Modal>
   )
}

export default QuestionModal;