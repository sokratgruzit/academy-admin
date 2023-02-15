import { NavLink } from "react-router-dom";

import Courses from "../pages/Courses";
import Expand from "../UI/Expand";

function Sidebar() {
  return (
    <div className="border sidebar">
      <div className="inner"></div>
      <NavLink className="link" to="dashboard">
        Dashboard
      </NavLink>
      <NavLink className="link" to="taxonomies">
        Taxonomies
      </NavLink>
      <NavLink className="link" to="articles">
        Articles
      </NavLink>
      <NavLink className="link" to="pages">
        Pages
      </NavLink>
      <NavLink className="link" to="glossaries">
        Glossaries
      </NavLink>
      <NavLink className="link" to="become-instructor">
        Become instructor
      </NavLink>
      <NavLink className="link" to="footer">
        Footer
      </NavLink>
      <NavLink className="link" to="header">
        Header
      </NavLink>
      <NavLink className="link" to="question-bank">
        Question Bank
      </NavLink>
      <NavLink className="link" to="quiz">
        Quiz
      </NavLink>
      <Expand>
        <Courses />
      </Expand>
    </div>
  );
}

export default Sidebar;
