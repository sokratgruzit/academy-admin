import { useContext, useState, useRef } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import ImageUpload from '../UI/ImageUpload';
import BaseInput from '../UI/BaseInput'
import BaseSelect from '../UI/BaseSelect';
import Modal from './Modal';
import BaseEditor from '../UI/BaseEditor';


function ArticleModal({ open = false, onClose, taxonomies, article, isCreate }) {
   const { token } = useContext(AuthContext);
   const { request } = useHttp();
   const [myEditor, setMyEditor] = useState(null);
   const upload = useRef(null)


   const submitHandler = async (e) => {
      e.preventDefault();


      let formData = {
         title: '',
         category: null,
         tag: null,
         level: null,
         editor: ''
      };
      formData.title = e.target.title.value;
      formData.category = e.target.category.value || null;
      formData.tag = e.target.tag.value || null;
      formData.level = e.target.level.value || null;
      formData.editor = myEditor.getData();

      const image = await upload.current();
      formData.image = image;

      const method = isCreate ? 'POST' : 'PUT';
      const path = isCreate ? '/api/content/articles' : '/api/content/articles/' + article._id;

      const result = await request(path, method, formData, {
         Authorization: `Bearer ${token}`
      });
      onClose();
   }

   return (
      <Modal open={open} onClose={onClose} title="Article">
         <form onSubmit={submitHandler} className="form-list">
            <BaseInput
               type="text"
               id="title"
               name="title" defaultValue={article.title || ''}
               label="title"
               placeholder="title" />
            <BaseSelect
               name="category"
               options={taxonomies.category}
               getOptionLabel={option => option.title}
               getOptionValue={option => option._id}
               defaultValue={article.category}
            />
            <BaseSelect
               name="tag"
               options={taxonomies.tag}
               getOptionLabel={option => option.title}
               getOptionValue={option => option._id}
               defaultValue={article.tag || ''}
            />
            <BaseSelect
               name="level"
               options={taxonomies.level}
               getOptionLabel={option => option.title}
               getOptionValue={option => option._id}
               defaultValue={article.level || ''}
            />
            <BaseEditor data={article.editor} setMyEditor={setMyEditor} id="articleEditor"/>
            <ImageUpload upload={upload} data={article.image} label="article image" />
            <button className='btn' type="submit"> submit</button>
         </form>
      </Modal>
   )
}

export default ArticleModal;