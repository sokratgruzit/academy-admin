import { NavLink } from "react-router-dom";

function Courses() {
   return (
      <div>
         Here must be courses expand
         <NavLink className='link' to="course/tags">Tags</NavLink>
         <NavLink className='link' to="course/categories">Categories</NavLink>
      </div>
   );
}

export default Courses; 