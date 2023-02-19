import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import _uniqueId from "lodash.uniqueid";
import _ from "lodash";

import Courses from "../pages/Courses";
import Expand from "../UI/Expand";

const temproraryData = [
  {
    title: "Dashboard",
    to: "dashboard",
    active: false
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
    title: "Glossaries",
    to: "glossaries",
    active: false
  },
  {
    title: "Become instructor",
    to: "become-instructor",
    active: true
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
        to: "",
        active: false,
        subLinks: [
          {
            title: "sTags",
            to: "scourse/tags",
            active: false
          },
          {
            title: "sdTags",
            to: "sdcourse/tags",
            active: false
          }, 
          {
            title: "Sub Categories",
            to: "",
            active: false,
            subLinks: [
              {
                title: "sTags",
                to: "scourse/tags",
                active: false
              },
              {
                title: "sdTags",
                to: "sdcourse/tags",
                active: false,
                subLinks: [
                  {
                    title: "sTags",
                    to: "scourse/tags",
                    active: false
                  },
                  {
                    title: "sdTags",
                    to: "sdcourse/tags",
                    active: false
                  }, 
                  
                ]
              }, 
              
            ]
          },
        ]
      },
    ]
  }
];

function Sidebar() {
  const [ links, setLinks ] = useState(temproraryData);
  const [ sub, setSub ] = useState([]);

  const onActive = (e) => {
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

  const createLinks = () => {
    let checkedArr = [];

    temproraryData.map((item, index) => {
      let checker = (item) => {
        let subArr = _.find(_.values(item), (value) => {
          if (_.isArray(value)) {
            checkedArr.push(
              <Expand title={item.title} key={_uniqueId('sub1prefix-')}>
                {value.map((s, i) => {
                  return (
                    <NavLink onClick={onActive} key={_uniqueId('sub2prefix-')} id={i + 'sub'} className={`link ${s.active ? "activeL" : ""}`} to={s.to}>
                      {s.title}
                    </NavLink>
                  );
                })}
              </Expand>
            );
            _.find(_.values(value), (v) => {
              console.log(item)
              checker(v);
            });
            
            return value;
          } 
        });

        if (subArr) {
          //checkedArr.push(subArr);
        }
      };

      checkedArr.push(
        <NavLink onClick={onActive} key={_uniqueId('prefix-')} id={index} className={`link ${item.active ? "activeL" : ""}`} to={item.to}>
          {item.title}
        </NavLink>
      );

      checker(item);
    });
    
    return checkedArr;
  };

  return (
    <div className="border sidebar">
      <div className="inner"></div>
      {/* {links.map((item, index) => {
        const check = item.subLinks ? false : true;

        let link = null;

        if (check) {
          link =  <NavLink onClick={onActive} key={_uniqueId('prefix-')} id={index} className={`link ${item.active ? "activeL" : ""}`} to={item.to}>
            {item.title}
          </NavLink>;
        } else {
          link = <Expand title={item.title} key={_uniqueId('sub1prefix-')}>
            {sub?.map((s, i) => {
              console.log(s)
              return (
                <NavLink onClick={onActive} key={_uniqueId('sub2prefix-')} id={i + 'sub'} className={`link ${s.active ? "activeL" : ""}`} to={"/"}>
                  {sub.title}
                </NavLink>
              );
            })}
          </Expand>;
        }

        return link;
      })} */}
      {createLinks()}
    </div>
  );
}

export default Sidebar;
