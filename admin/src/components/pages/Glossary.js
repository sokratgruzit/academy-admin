import { useState, useContext, useEffect } from "react";
import GlossaryModal from "../modals/GlossaryModal";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";

function Glossary() {
   const [isOpen, setIsOpen] = useState(false);
   const [glossaries, setGlossaries] = useState(null);
   const [glossary, setGlossary] = useState({}); 
   const [isCreate, setIsCreate] = useState(true)
   const { token } = useContext(AuthContext);
   const { request } = useHttp();

   const getGlossaries = async () => {
      const result = await request('/api/content/glossaries', 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      setGlossaries(result);
   };

   const removeHandler = async (slug) => {
      const result = await request('/api/content/glossaries/' + slug, 'delete', null, {
         Authorization: `Bearer ${token}`
      });
      getGlossaries();
   };

   const editHandler = async (glossary) => {
      setIsCreate(false);
      setGlossary(glossary);
      setIsOpen(true);
   };

   const createHandler = () => {
      setIsCreate(true);
      setIsOpen(true);
   };

   const closeHandler = () => {
      setIsOpen(false); 
      getGlossaries();
      setGlossary({});
   };

   useEffect(() => {
      getGlossaries();
   }, []);


   return (
      <div className="content-page article">
         <div className="top">
            <h1 className="title">Article</h1>
            <button onClick={createHandler}>create</button>
         </div>
         {glossaries && glossaries.result ? (
            <div className="list">
               {glossaries.result.map((glossary) => {
                  return (
                     <div className="list-item" key={glossary._id}>
                        <span>{glossary.slug}</span>
                        <div className="btns">
                           <button onClick={() => editHandler(glossary)}>Edit</button>
                           <button onClick={() => removeHandler(glossary.slug)}>Remove</button>
                        </div>
                     </div>
                  )
               })}
            </div>
         ) : null}

         <GlossaryModal
            open={isOpen}
            onClose={closeHandler}
            glossary={glossary}
            isCreate={isCreate}>
         </GlossaryModal>
      </div>
   );
};

export default Glossary; 