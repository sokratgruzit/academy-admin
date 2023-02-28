import { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import Modal from './Modal';
import BaseInput from '../UI/BaseInput'
import BaseEditor from '../UI/BaseEditor';
import BaseSelect from '../UI/BaseSelect';


function MenuModal({ open = false, onClose, menu, isCreate }) {
   const { token } = useContext(AuthContext);
   const { request } = useHttp();
   // const [myEditor, setMyEditor] = useState(null);

 
   const submitHandler = async (e) => {
      e.preventDefault();

      let formData = {
         title: '',
         editor: ''
      };
      formData.title = e.target.title.value;
      formData.to = "koko";
      formData.tag = "koko";
      // formData.editor = myEditor.getData();


      const method = isCreate ? 'POST' : 'PUT';
      const path = isCreate ? '/api/content/menu' : '/api/content/menu/' + menu.to;

      const result = await request(path, method, formData, {
         Authorization: `Bearer ${token}`
      });
      onClose();
   }

   return (
      <Modal open={open} onClose={onClose} title="yle">
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

            <BaseSelect
               name="prent"
               options={menu} 
               // getOptionLabel={getOptionLabel}
               // getOptionValue={getOptionValue}
               // defaultValue={defaultValue}
               // isMulti={isMulti}
            />

            {/* <BaseEditor data={menu.editor} setMyEditor={setMyEditor} id="editor1" /> */}
            <button className='btn' type="submit"> submit</button>
         </form>
      </Modal>
   )
}

export default MenuModal;