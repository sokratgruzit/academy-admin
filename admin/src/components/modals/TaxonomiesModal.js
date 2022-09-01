import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import BaseInput from '../UI/BaseInput';
import Modal from './Modal';


function TaxonomiesModal({ open = false, onClose, path = '', isCreate, taxonomy }) {
   const { token } = useContext(AuthContext);
   const { request } = useHttp();
 
   const submitHandler = async (e) => {
      e.preventDefault();

      let formData = {
         title: ''
      };

      formData.title = e.target.title.value;

      const method = isCreate ? 'POST' : 'PUT';
      const fullPath = isCreate ? '/api/content/' + path : '/api/content/' + path + '/' + taxonomy._id;

      const result = await request(fullPath, method, formData, {
         Authorization: `Bearer ${token}`
      });
      onClose();
   }

   return (
      <Modal open={open} onClose={onClose} title={path}>
         <form  onSubmit={submitHandler} className="form-list">
         <BaseInput type="text" name="title" defaultValue={taxonomy.title} id="title" label="title"/>
         <button className='btn' type="submit"> submit</button>
         </form>
      </Modal>
   )
  
}

export default TaxonomiesModal;