import { useState, useContext, useEffect } from "react";
import HeaderModal from "../components/modals/HeaderModal";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

function Footer() {
   const [isOpen, setIsOpen] = useState(false);
   const [links, setLinks] = useState(null);
   const [link, setLink] = useState({});
   const [isCreate, setIsCreate] = useState(true)
   const { token } = useContext(AuthContext);
   const { request } = useHttp();




   const getLinks = async () => {
      const result = await request('/api/content/header', 'GET', null, {
         Authorization: `Bearer ${token}`
      });
      setLinks(result);
   }

   const removeHandler = async (slug) => {
      const result = await request('/api/content/header/' + slug, 'delete', null, {
         Authorization: `Bearer ${token}`
      });
      getLinks();
   }

   const editHandler = async (link) => {
      setIsCreate(false);
      setLink(link);
      setIsOpen(true);
   }

   const createHandler = () => {
      setIsCreate(true);
      setIsOpen(true);
   }

   const closeHandler = () => {
      setIsOpen(false);
      getLinks();
      setLink({});
   }

   useEffect(() => {
      getLinks();
   }, [])


   return (
      <div className="content-page article">
         <div className="top">
            <h1 className="title">Header links</h1>
            <button onClick={createHandler}>create</button>
         </div>
         {links && links.result ? (
            <div className="list">
               {links.result.map((link) => {
                  return (
                     <div className="list-item" key={link._id}>
                        <span>{link.slug}</span>
                        <div className="btns">
                           <button onClick={() => editHandler(link)}>Edit</button>
                           <button onClick={() => removeHandler(link.slug)}>Remove</button>
                        </div>
                     </div>
                  )
               })}
            </div>
         ) : null}

         <HeaderModal
            open={isOpen}
            onClose={closeHandler}
            link={link}
            isCreate={isCreate}>
         </HeaderModal>
      </div>
   )
}

export default Footer; 