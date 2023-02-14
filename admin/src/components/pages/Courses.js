import { NavLink } from "react-router-dom";
import { useState } from "react";
import Expand from "../UI/Expand";

function Courses() {
   const [showExpand, setShowExpand] = useState(false);

      const onExpand = () => {
      setShowExpand(!showExpand);
   }
   return (
      <div  style={{overflow: 'hidden', height: !showExpand ? '45px' : '180px'}}>
            <h2 onClick={onExpand} style={{height: '45px'}} >Courses</h2>
            <div style={{display: showExpand ? 'flex' : 'none', display: 'flex', flexDirection: 'column'}}>
               <NavLink className='link' to="course/tags">Tags</NavLink>
               <NavLink className='link' to="course/categories">Categories</NavLink>
               <NavLink className='link' to="course/subCategories">Sub Categories</NavLink>
            </div>
      </div>
   );
}

export default Courses; 