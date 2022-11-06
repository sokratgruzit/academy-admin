import { NavLink } from "react-router-dom";

function Sidebar() {
   return (
      <div className="border sidebar">
         <div className="inner"></div>
         <NavLink className='link' to="taxonomies">Taxonomies</NavLink>
         <NavLink className='link' to="articles">Articles</NavLink>
         <NavLink className='link' to="pages">Pages</NavLink>
         <NavLink className='link' to="glossaries">Glossaries</NavLink>
         <NavLink className='link' to="become-instructor">Become instructor</NavLink>
         <NavLink className='link' to="footer">Footer</NavLink>
      </div>
   )
}

export default Sidebar;