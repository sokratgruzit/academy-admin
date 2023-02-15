import { NavLink } from "react-router-dom";

import styles from "../../assets/css/Courses.module.scss"

function Courses() {
   return (
      <div className={styles.inExpand}>
         <NavLink className='link' to="course/tags">Tags</NavLink>
         <NavLink className='link' to="course/categories">Categories</NavLink>
         <NavLink className='link' to="course/subCategories">Sub Categories</NavLink>
      </div>
   );
}

export default Courses; 