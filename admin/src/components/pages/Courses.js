import { NavLink } from "react-router-dom";

import Expand from "../UI/Expand";

import styles from "../../assets/css/Courses.module.scss"

function Courses() {
   return (
      <div className={styles.inExpand}>
         <NavLink className='link' to="course/tags">Tags</NavLink>
         <NavLink className='link' to="course/categories">Categories</NavLink>

         <Expand title={"SubCategories"}>
            {/* <NavLink className='link' to="course/subCategories"> */}
               <div className="link">education</div>
               <div className="link">featured</div>
               <div className="link">reliases</div>
               <div className="link">traiding</div>
               <div className="link">blockchain</div>
               <div className="link">esentials</div>
            {/* </NavLink> */}
         </Expand>
      </div>
   );
}

export default Courses; 