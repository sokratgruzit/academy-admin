import { useContext, useEffect, useState} from 'react';
import Modal from './Modal';

import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

import BaseInput from '../UI/BaseInput';
import BaseSelect from '../UI/BaseSelect';

 const temproraryData = [
   {
     title: "Dashboard",
     value: 'dashboard',
     label: 'dashboard',
     to: "dashboard",
     active: false
   },
   {
     title: "Admin",
     to: "",
     value: 'Admin',
     label: 'Admin',
     active: false,
     subLinks: [
       {
         title: "Menu",
         to: "menu",
         active: false
       }
     ]
   },
   {
     title: "Taxonomies",
     to: "taxonomies",
     value: 'taxsonimies',
     label: 'taxsonomies',
     active: false
   },
   {
     title: "Articles",
     to: "articles",
     value: 'articles',
     label: 'articles',
     active: false
   },
   {
     title: "Pages",
     to: "pages",
     value: 'pages',
     label: 'pages',
     active: false
   },
   {
     title: "Glossary",
     to: "glossary",
     value: 'glossary',
     label: 'glossary',
     active: false
   },
   {
     title: "Become instructor",
     to: "become-instructor",
     value: 'become-instructor',
     label: 'become-instructor',
     active: false
   },
   {
     title: "Footer",
     to: "footer",
     value: 'footer',
     label: 'footer',
     active: false
   },
   {
     title: "Header",
     to: "header",
     value: 'header',
     label: 'header',
     active: false
   },
   {
     title: "Question Bank",
     to: "question-bank",
     value: 'question-bank',
     label: 'question-bank',
     active: false
   },
   {
     title: "Quiz",
     to: "quiz",
     value: 'quiz',
     label: 'quiz',
     active: false
   },
   {
     title: "Courses",
     to: '',
     value: 'Courses',
     label: 'Courses',
     active: false,
     subLinks: [
       {
         title: "Tags",
         to: "tags",
         value: 'tags',
         label: 'tags',
         active: false
       }, 
       {
         title: "Categories",
         to: "categories",
         value: 'categories',
         label: 'categories',
         active: false
       },
       {
         title: "Sub Categories",
         to: "course/sub-categories",
         value: 'Sub Categories',
         label: 'Sub Categories',
         active: false,
       },
     ]
   }
 ];
 
 function MenuModal({ open = false, onClose, menu, isCreate }) {
   const { token } = useContext(AuthContext);
   const [ selectData, setSelectData] = useState(temproraryData);
   const [ selectOptionData, setSelectOptionData] = useState([temproraryData]);
   const { request } = useHttp();

   
   const submitHandler = async (e) => {
      e.preventDefault();
      
      let formData = {
         title: '',
         editor: ''
      };
      formData.title = e.target.title.value;
      formData.to = "koko";
      formData.tag = "koko";
      
      const method = isCreate ? 'POST' : 'PUT';
      const path = isCreate ? '/api/content/menu' : '/api/content/menu/' + menu.to;
      
      const result = await request(path, method, formData, {
         Authorization: `Bearer ${token}`
      });
      console.log(result)
      onClose();
   };

   const handleChange = (e) => {
      if (e.subLinks) {
         // console.log(e, 'hi');
         setSelectData(e.subLinks);
         let optionData = [temproraryData];
         optionData.push(e.subLinks)
         setSelectOptionData(optionData)
         // console.log(selectOptionData);
      } else {
         console.log('this component has not children')
      }
   };
   
   useEffect(() => {
      setSelectData(temproraryData);
      setSelectOptionData([temproraryData]);
      console.log(selectOptionData, 'useffect')
   }, []);


   return (
      <Modal open={open} onClose={onClose} title="admin">
         <form onSubmit={submitHandler} className="form-list">
            <BaseInput
               type="text"
               id="title"
               name="title" defaultValue={menu.title}
               label="title"
               placeholder="title"
            />
            <BaseInput
               type="text"
               id="tag"
               name="tag" defaultValue={menu.tag}
               label="Tag"
               placeholder="tag" 
            />
            <BaseInput
               type="text"
               id="to"
               name="to" defaultValue={menu.to}
               label="To"
               placeholder="to" 
            />

            {console.log(selectOptionData, 'dsef')}
            
            <BaseSelect
                  name="perent"
                  options={selectOptionData[0]}
                  placeholder={"select component"} 
                  getOptionLabel={selectOptionData?.title}
                  getOptionValue={selectOptionData?.to}
                  defaultValue={'selectlals'}
                  onChange={handleChange}
            />
            {selectOptionData.length < 1 ?
               (
                  console.log('hs')
               ) 
                :
               (
               selectOptionData.map((q, i )=> {
                  console.log(q, 'q')
                  return(
                     <BaseSelect
                        key={i}
                        name="perent"
                        options={q}
                        placeholder={"select component"} 
                        // getOptionLabel={q[1].title}
                        // getOptionValue={q?.to}
                        defaultValue={'selectlals'}
                        onChange={handleChange}
                     />
                  )
               })
            )}

            <button className='btn' type="submit"> submit</button>
         </form>
      </Modal>
   )
}

export default MenuModal;