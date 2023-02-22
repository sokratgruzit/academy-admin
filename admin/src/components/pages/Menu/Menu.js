import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";

import MenuModal from "../../modals/MenuModal";

function Menu() {
   const [ isOpen, setIsOpen ] = useState(false);
   const [ menuData, setMenuData ] = useState(null);
   const [ menuDatatitle, setMenuDatatitle ] = useState(null);
   const [ menu, setMenu ] = useState({}); 
   const [ isCreate, setIsCreate ] = useState(true)
   const { token } = useContext(AuthContext);
   const { request } = useHttp();

   const getMenu = async () => {
      const result = await request('/api/content/menu', 'GET', null, {
         Authorization: `Bearer ${token}`
      });
        setMenuData(result);
        setMenuDatatitle(result.docs[0].title);
    };
    
    const removeHandler = async (to) => {
        const result = await request('/api/content/menu/' + to, 'delete', null, {
            Authorization: `Bearer ${token}`
        });
        
        getMenu();
    };
    
    const editHandler = async (menu) => {
        setIsCreate(false);
        setMenu(menu);
        setIsOpen(true);
    };
    
    const createHandler = () => {
        setIsCreate(true);
        setIsOpen(true);
    };
    
    const closeHandler = () => {
        setIsOpen(false); 
        getMenu();
        setMenu({});
    };
    
    useEffect(() => {
        getMenu();
    }, []);
    
   return (
      <div className="content-page article">
         <div className="top">
            <h1 className="title">Menu</h1>
            <button onClick={createHandler}>create</button>
         </div>
         {menuData && menuData.result ? (
            <div className="list">
               {menuData.result.map((menuDataItem) => {
                  return (
                     <div className="list-item" key={menuDataItem._id}>
                        <span>{menuDataItem.title}</span>
                        <div className="btns">
                           <button onClick={() => editHandler(menuDataItem)}>Edit</button>
                           <button onClick={() => removeHandler(menuDataItem.to)}>Remove</button>
                        </div>
                     </div>
                  )
               })}
            </div>
         ) : null}

         <MenuModal
            open={isOpen}
            onClose={closeHandler}
            menuDataTitle={menuDatatitle}
            menu={menu}
            isCreate={isCreate}>
         </MenuModal>
      </div>
   )
}

export default Menu; 