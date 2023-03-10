import { useContext, useEffect, useState} from 'react';
import Modal from './Modal';
import _uniqueId from "lodash.uniqueid";

import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

import BaseInput from '../UI/BaseInput';
import BaseSelect from '../UI/BaseSelect';
 
 function MenuModal({ open = false, onClose, menu, isCreate }) {
   const { token } = useContext(AuthContext);
   const [ comps, setComps ] = useState([]);
   const [ message, setMessage ] = useState("");
   const [ compPath, setCompPath ] = useState("/");
   const [ subLink, setSubLink ] = useState([]);
   const [ subLinkBlock, setSubLinkBlock ] = useState([]);
   const { request } = useHttp();

   const submitHandler = async (e) => {
      e.preventDefault();
      
      let formData = {
         to: '',
         component: '',
         path: '',
         active: false
      };

      formData.component = e.target.component.value;
      formData.to = e.target.to.value;
      formData.path = e.target.path.value;
      
      const method = isCreate ? 'POST' : 'PUT';
      const path = isCreate ? '/api/content/menu' : '/api/content/menu/' + menu.to;
      
      await request(path, method, formData, {
         Authorization: `Bearer ${token}`
      })
      .then(res => {
         return res;
      })
      .catch(err => {
         setMessage(err[0].msg);
      });

      onClose();
   };

   const handleChange = (e) => {
      setCompPath(e.compPath);
   };

   const genereteSubLink = () => {
      let sub = <div key={_uniqueId('sub1prefix-')}>
         <h3>Sub link</h3>
         <BaseSelect
            name="subComponent"
            options={comps}
            placeholder={"Select component"} 
            defaultValue={'None'}
            isMulti={false}
            onChange={handleChange}
         />
         <BaseInput
            type="text"
            id="to"
            name="subTo" 
            label="To"
            placeholder="To" 
         />
         <BaseInput
            type="text"
            name="subPath" 
            label="Component path"
            value={compPath}
            placeholder="Path"
            readOnly={true} 
         />
      </div>

      setSubLinkBlock([...subLinkBlock, sub]);
   };
   
   useEffect(() => {
      const getComponents = async () => {
         const result = await request('/api/content/menu/structure', 'GET', null, {
            Authorization: `Bearer ${token}`
         });

         setComps(result);
         onClose();
      };

      comps.map(item => {
         let newResult = item.label.replace('.js', '');
         return newResult; 
      });

      getComponents();
   }, []);


   return (
      <Modal open={open} onClose={onClose} title="admin">
         <form onSubmit={submitHandler} className="form-list">
            <span style={{color: 'red'}}>{ message }</span>
            <BaseSelect
               name="component"
               options={comps}
               placeholder={"Select component"} 
               defaultValue={'None'}
               isMulti={false}
               onChange={handleChange}
            />
            <BaseInput
               type="text"
               id="to"
               name="to" 
               label="To"
               placeholder="To" 
            />
            <BaseInput
               type="text"
               name="path" 
               label="Component path"
               value={compPath}
               placeholder="Path"
               readOnly={true} 
            />
            <div onClick={genereteSubLink}>Add sublink</div>
            {subLinkBlock}
            {/* {               
               selectOptionData.map((q, i )=> {
                  return(
                     q.map((item, index) => {
                        return(
                           <BaseSelect
                              key={index}
                              name="component"
                              options={item}
                              placeholder={"Select component"} 
                              // getOptionLabel={q[1].title}
                              // getOptionValue={q?.to}
                              defaultValue={'selectlals'}
                              isMulti={false}
                              onChange={handleChange}
                           />
                        )
                     })
                  ) 
               })
            } */}

            <button className='btn' type="submit">Submit</button>
         </form>
      </Modal>
   )
}

export default MenuModal;