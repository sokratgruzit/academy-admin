import { useState, useContext, useEffect } from "react";
import TaxonomiesModal from "../modals/TaxonomiesModal";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";


function Taxonomies() {
   const { token } = useContext(AuthContext);
   const { request } = useHttp();
   const [tab, setTab] = useState(null);
   const [isOpen, setIsOpen] = useState(false);
   const [taxonomies, settaxonomies] = useState(null);
   const [taxonomy, setTaxonomy] = useState({});
   const [isCreate, setIsCreate] = useState(true)

   const getTaxonomies = async (id) => {
      const res = await request('/api/content/' + id, 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      settaxonomies(res);
   }

   const tabClickHanlder = (id) => {
      setTab(id);
      getTaxonomies(id);
   }

   const removeHandler = async (id) => {
      const result = await request('/api/content/' + tab + '/' + id, 'delete', null, {
         Authorization: `Bearer ${token}`
      });

      getTaxonomies(tab);
   }

   const editHandler = async (taxonomy) => {
      setIsCreate(false);
      setTaxonomy(taxonomy);
      setIsOpen(true);
   }

   const createHandler = () => {
      setIsCreate(true);
      setIsOpen(true);
   }

   const closeHandler = () => {
      setIsOpen(false);
      getTaxonomies(tab);
      setTaxonomy({});
   }


   return (
      <div className="taxonomies">
         <div className="tabs">
            <button className={`tab ${tab === 'category' ? 'active' : ''}`} onClick={() => tabClickHanlder('category')}>
               categories
            </button>
            <button className={`tab ${tab === 'tag' ? 'active' : ''}`} onClick={() => tabClickHanlder('tag')}>
               tags
            </button>
            <button className={`tab ${tab === 'level' ? 'active' : ''}`} onClick={() => tabClickHanlder('level')}>
               levels
            </button>
            <button className={`tab ${tab === 'level' ? 'active' : ''}`} onClick={() => tabClickHanlder('language')}>
               language
            </button>
         </div>
         <br/>
         <br/>
         <div className="content-page">
            {tab && (
               <div className="top">
                  <h2 className="title">{tab}</h2>
                  <button onClick={createHandler}>Add {tab}</button>
               </div>
            )}

            {taxonomies && (
               <div className="list">
                  {taxonomies.map((taxonomy) => {
                     return (
                        <div className="list-item" key={taxonomy._id}>
                           <span>{taxonomy.slug}</span>
                           <div className="btns">
                              <button onClick={() => editHandler(taxonomy)}>Edit</button>
                              <button onClick={() => removeHandler(taxonomy._id)}>Remove</button>
                           </div>
                        </div>
                     )
                  })}
               </div>
            )}
         </div>
         <TaxonomiesModal
            open={isOpen}
            onClose={closeHandler}
            path={tab}
            taxonomy={taxonomy}
            isCreate={isCreate}>
         </TaxonomiesModal>
      </div>
   )
}

export default Taxonomies;  