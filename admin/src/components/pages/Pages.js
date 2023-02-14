import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

import PagesModal from "../modals/PagesModal";

function Pages() {
   const [ isOpen, setIsOpen ] = useState(false);
   const [ pages, setPages ] = useState(null);
   const [ page, setPage ] = useState({}); 
   const [ isCreate, setIsCreate ] = useState(true)
   const { token } = useContext(AuthContext);
   const { request } = useHttp();

   const getPages = async () => {
      const result = await request('/api/content/pages', 'GET', null, {
         Authorization: `Bearer ${token}`
      });

      setPages(result);
   };

   const removeHandler = async (slug) => {
      const result = await request('/api/content/pages/' + slug, 'delete', null, {
         Authorization: `Bearer ${token}`
      });

      getPages();
   };

   const editHandler = async (page) => {
      setIsCreate(false);
      setPage(page);
      setIsOpen(true);
   };

   const createHandler = () => {
      setIsCreate(true);
      setIsOpen(true);
   };

   const closeHandler = () => {
      setIsOpen(false); 
      getPages();
      setPage({});
   };

   useEffect(() => {
      getPages();
   }, []);

   return (
      <div className="content-page article">
         <div className="top">
            <h1 className="title">Pages</h1>
            <button onClick={createHandler}>create</button>
         </div>
         {pages && pages.result ? (
            <div className="list">
               {pages.result.map((page) => {
                  return (
                     <div className="list-item" key={page._id}>
                        <span>{page.title}</span>
                        <div className="btns">
                           <button onClick={() => editHandler(page)}>Edit</button>
                           <button onClick={() => removeHandler(page.slug)}>Remove</button>
                        </div>
                     </div>
                  )
               })}
            </div>
         ) : null}

         <PagesModal
            open={isOpen}
            onClose={closeHandler}
            page={page}
            isCreate={isCreate}>
         </PagesModal>
      </div>
   )
}

export default Pages; 