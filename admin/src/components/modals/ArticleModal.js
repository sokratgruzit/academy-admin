import { useContext, useState } from 'react';
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
   const [ myEditor, setMyEditor ] = useState(null);
   const [ imgPath, setImgPath ] = useState("");
   const [ imgAlt, setImgAlt ] = useState("");

   const submitHandler = async (e) => {
      e.preventDefault();

      let formData = {
         title: '',
         category: null,
         tag: null,
         level: null,
         language: null,
         duration: '',
         editor: '',
         image: {
            path: '',
            alt: ''
         }
      };

      formData.title = e.target.title.value;
      formData.category = e.target.category.value || null;
      formData.language = e.target.language.value || null;
      formData.tag = e.target.tag.length ? Array.from(e.target.tag).map(item => item.value) : e.target.tag.value ? e.target.tag.value : null ;
      formData.level = e.target.level.value || null;
      formData.duration = e.target.duration.value;
      formData.editor = myEditor.getData();
      formData.image.path = imgPath;
      formData.image.alt = imgAlt;

      const method = isCreate ? 'POST' : 'PUT';
      const path = isCreate ? '/api/content/articles' : '/api/content/articles/' + article.slug;

      await request(path, method, formData, {
         Authorization: `Bearer ${token}`
      });

      onClose();
   };

   const getImagePath = path => {
      setImgPath(path);
   };

   const getImageAlt = alt => {
      setImgAlt(alt);
   };

   return (
      <Modal open={open} onClose={onClose} title="Article">
         <form onSubmit={submitHandler} className="form-list">
            <BaseInput
               type="text"
               id="title"
               name="title" defaultValue={article.title || ''}
               label="title"
               placeholder="enter title" />
            <BaseSelect
               name="category"
               options={taxonomies.category}
               getOptionLabel={option => option.title}
               getOptionValue={option => option._id}
               defaultValue={article.category}
               placeholder='select category'
            /> 
            <BaseSelect
               name="tag"
               options={taxonomies.tag}
               getOptionLabel={option => option.title}
               getOptionValue={option => option._id}
               defaultValue={article.tag || ''}
               placeholder='select tags'
               isMulti={true}
            />
            <BaseSelect
               name="level"
               options={taxonomies.level}
               getOptionLabel={option => option.title}
               getOptionValue={option => option._id}
               defaultValue={article.level || ''}
               placeholder='select level'
            />
             <BaseSelect
               name="language"
               options={taxonomies.language}
               getOptionLabel={option => option.title}
               getOptionValue={option => option._id}
               defaultValue={article.language}
               placeholder='select language'
            />
            <BaseInput
               type="text"
               id="duration"
               name="duration" defaultValue={article.duration || ''}
               label="duration"
               placeholder="enter duration" />
            <BaseEditor data={article.editor} setMyEditor={setMyEditor} id="articleEditor"/>

            <ImageUpload 
               getImagePath={getImagePath} 
               getImageAlt={getImageAlt} 
               data={article.image} 
               label="article image" 
            />
            <button className='btn' type="submit">Submit</button>
         </form>
      </Modal>
   )
}

export default ArticleModal;