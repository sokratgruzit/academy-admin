import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import BaseInput from '../UI/BaseInput'

function BecomeInstructor() {
   const { token } = useContext(AuthContext);
   const { request } = useHttp();
   const [result, setResult] = useState(null);
   const [advLength, setAdvlength] = useState(null);
   const [stepsLength, setStepslength] = useState(null);


   const getData = async () => {
      const result = await request('/api/content/become-instructor', 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      setResult(result.result)
      setAdvlength(result.result.advantages.length)
      setStepslength(result.result.steps.length)
   }

   const updateData = async (formData) => {
      const result = await request('/api/content/become-instructor', 'put', formData, {
         Authorization: `Bearer ${token}`
      });
   }

   const advantages = [];
   for (let i = 1; i <= advLength; i++) {
      advantages.push(
         (
            <div key={i}>
               <BaseInput
                  type="text"
                  id={`adv_title_${i}`}
                  name={`adv_title_${i}`}
                  label="title"
                  defaultValue={result.advantages[i - 1] ? result.advantages[i - 1].title : ''}
                  placeholder="title" />
               <BaseInput
                  type="text"
                  id={`adv_teaser_${i}`}
                  name={`adv_teaser_${i}`}
                  label="teaser"
                  defaultValue={result.advantages[i - 1] ? result.advantages[i - 1].teaser : ''}
                  placeholder="teaser" />
               <br />
               <br />
            </div>
         )
      )
   }

   const steps = [];
   for (let i = 1; i <= stepsLength; i++) {
      steps.push(
         (
            <div key={i}>
               <BaseInput
                  type="text"
                  id={`step_title_${i}`}
                  name={`step_title_${i}`}
                  label="title"
                  defaultValue={result.steps[i - 1] ? result.steps[i - 1].title : ''}
                  placeholder="title" />
               <BaseInput
                  type="text"
                  id={`step_teaser_${i}`}
                  name={`step_teaser_${i}`}
                  label="teaser"
                  defaultValue={result.steps[i - 1] ? result.steps[i - 1].teaser : ''}
                  placeholder="teaser" />
               <br />
               <br />
            </div>
         )
      )
   }

   const submitHandler = (e) => {
      e.preventDefault();
      let formData = {
         title: e.target.title.value,
         additional_info: {
            title: e.target.add_info_title.value,
            teaser: e.target.add_info_teaser.value
         },
         steps: [],
         advantages: []
      }

      const getDynamicValues = (prefix, length, name) => {
         let obj = {}
         for (let i = 0; i < length; i++) {
            obj.title = e.target[`${prefix}_title_${i + 1}`].value
            obj.teaser = e.target[`${prefix}_teaser_${i + 1}`].value
            formData[name].push(obj)
            obj = {}
         }
      }
      getDynamicValues('adv', advLength, 'advantages')
      getDynamicValues('step', stepsLength, 'steps')
      updateData(formData)
   }

   useEffect(() => {
      getData();
   }, [])


   return (
      <div className="content-page article">
         <div className="top">
            <h1 className="title">Become Instructor</h1>
         </div>
         <div>
            <br />
            <br />
            {result ? (
               <form onSubmit={submitHandler} className="form-list">
                  <BaseInput
                     type="text"
                     id="title"
                     name="title"
                     label="title"
                     defaultValue={result.title}
                     placeholder="title" />
                  <br />
                  <br />
                  <div>
                     <h4>advantages</h4>
                     <br />
                     {advantages}
                     <br />
                     <div className='btn' onClick={() => setAdvlength(advLength + 1)}>add advnatages</div>
                     {advLength > 1 ? (
                        <div className='btn' onClick={() => setAdvlength(advLength - 1)}>remove advnatages</div>
                     ) : ''}
                  </div>
                  <br />
                  <br />
                  <div>
                     <h4>steps</h4>
                     <br />
                     {steps}
                     <br />
                     <div className='btn' onClick={() => setStepslength(stepsLength + 1)}>add step</div>
                     {stepsLength > 1 ? (
                        <div className='btn' onClick={() => setStepslength(stepsLength - 1)}>remove step</div>
                     ) : ''}
                  </div>

                  <br /> 
                  <br />
                  <div className="add_info">
                     <BaseInput
                        type="text"
                        id="add_info_title"
                        name="add_info_title"
                        label="title"
                        defaultValue={result.additional_info.title}
                        placeholder="title" />
                     <BaseInput
                        type="text"
                        id="add_info_teaser"
                        name="add_info_teaser"
                        label="teaser"
                        defaultValue={result.additional_info.teaser}
                        placeholder="teaser" />
                  </div>

                  <br />
                  <button className='btn' type="submit"> submit</button>
               </form>
            ) : ''}

         </div>
      </div>
   )
}

export default BecomeInstructor; 