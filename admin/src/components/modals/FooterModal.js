import { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import BaseCheckox from '../UI/BaseCheckbox';
import BaseInput from '../UI/BaseInput';
import BaseSelect from '../UI/BaseSelect';
import Modal from './Modal';


function FooterModal({ open = false, onClose, link, isCreate }) {
   const { token } = useContext(AuthContext);
   const { request } = useHttp();
   const [row] = useState([
      {
         value: 1,
         label: 1
      },
      {
         value: 2,
         label: 2
      },
      {
         value: 3,
         label: 3
      },
   ]);
   const [pages, setPages] = useState(null);

   const getPages = async () => {
      const result = await request('/api/content/pages', 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      setPages(result);
   }


   const submitHandler = async (e) => {
      e.preventDefault();

      let formData = {};
      formData.title = e.target.title.value;
      formData.row = e.target.row.value || 1;
      formData.target = e.target.target.checked;
      formData.external = e.target.external.checked;
      formData.url = e.target.url.value;
      formData.page_slug = e.target.page_slug.value || null;



      const method = isCreate ? 'POST' : 'PUT';
      const path = isCreate ? '/api/content/footer' : '/api/content/footer/' + link.slug;

      const result = await request(path, method, formData, {
         Authorization: `Bearer ${token}`
      });
      onClose();
   }

   useEffect(() => {
      getPages();
   }, [])

   return (
      <Modal title='Footer' onClose={onClose} open={open}>
         <form onSubmit={submitHandler} className="form-list">
            <BaseInput id='title' label="title" defaultValue={link.title} name="title" placeholder="enter title" />
            <BaseSelect name="row"
               options={row}
               placeholder='select row'
               defaultValue={link.row ? {
                  value: link.row,
                  label: link.row
               } : ''} />
            <BaseCheckox name="target" id="target" label="target value" defaultChecked={link.target}/>
            <BaseCheckox id="external" name="external" defaultChecked={link.external} label="external value"/>
            <BaseInput name="url" id="url" label="url" placeholder="enter url" defaultChecked={link.url} />
            {pages && pages.result ? (
               <BaseSelect
                  name="page_slug"
                  placeholder='select page slug'
                  options={pages.result}
                  getOptionLabel={option => option.slug}
                  getOptionValue={option => option.slug}
                  defaultValue={link.page_slug ? {
                     slug: link.page_slug,
                     slug: link.page_slug
                  } : ''}
               />
            ) : null}
            <button className='btn' type="submit"> submit</button>
         </form>
      </Modal>
   )

}

export default FooterModal;