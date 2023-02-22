import { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import Modal from './Modal';
import BaseInput from '../UI/BaseInput'
import BaseEditor from '../UI/BaseEditor';

function PagesModal({ open = false, onClose, page, isCreate }) {
   const { token } = useContext(AuthContext);
   const { request } = useHttp();
   const [myEditor, setMyEditor] = useState(null);

 
   const submitHandler = async (e) => {
      e.preventDefault();

      let formData = {
         title: '',
         editor: ''
      };
      formData.title = e.target.title.value;
      formData.editor = myEditor.getData();


      const method = isCreate ? 'POST' : 'PUT';
      const path = isCreate ? '/api/content/pages' : '/api/content/pages/' + page.slug;

      const result = await request(path, method, formData, {
         Authorization: `Bearer ${token}`
      });
      onClose();
      console.log(result)
   }

   return (
      <Modal open={open} onClose={onClose} title="Pages">
         <form onSubmit={submitHandler} className="form-list">
            <BaseInput
               type="text"
               id="title"
               name="title" defaultValue={page.title}
               label="title"
               placeholder="title" />
            <BaseEditor data={page.editor} setMyEditor={setMyEditor} id="editor1" />
            <button className='btn' type="submit"> submit</button>
         </form>
      </Modal>
   )
}

export default PagesModal;