import { useState } from "react";

import RecursiveLink from "../UI/RecursiveLink";

const temproraryData = [
  {
    title: "Dashboard",
    to: "dashboard",
    active: false
  },
  {
    title: "Admin",
    to: "admin",
    active: false,
    subLinks: [
      {
        title: "Menu",
        to: "admin/menu",
        active: false
      }
    ]
  },
  {
    title: "Taxonomies",
    to: "taxonomies",
    active: false
  },
  {
    title: "Articles",
    to: "articles",
    active: false
  },
  {
    title: "Pages",
    to: "pages",
    active: false
  },
  {
    title: "Glossary",
    to: "glossary",
    active: false
  },
  {
    title: "Become instructor",
    to: "become-instructor",
    active: false
  },
  {
    title: "Footer",
    to: "footer",
    active: false
  },
  {
    title: "Header",
    to: "header",
    active: false
  },
  {
    title: "Question Bank",
    to: "question-bank",
    active: false
  },
  {
    title: "Quiz",
    to: "quiz",
    active: false
  },
  {
    title: "Courses",
    to: '',
    active: false,
    subLinks: [
      {
        title: "Tags",
        to: "course/tags",
        active: false
      }, 
      {
        title: "Categories",
        to: "course/categories",
        active: false
      },
      {
        title: "Sub Categories",
        to: "course/sub-categories",
        active: false,
      },
    ]
  }
];

function Sidebar() {
  const [ links, setLinks ] = useState(temproraryData);

  const onActive = (e) => {
    console.log(e)
    let newLinks = temproraryData.map((link, index) => {
      if (e.target.id == index) {
        link.active = true;
      } else {
        link.active = false;
      }

      return link;
    });

    setLinks(newLinks);
  };

  return (
    <div className="border sidebar">
      <div className="inner"></div>
      <RecursiveLink activeLink={onActive} data={links} />
    </div>
  );
}

export default Sidebar;
