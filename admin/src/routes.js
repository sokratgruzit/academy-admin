import { Routes, Route, Navigate } from "react-router-dom";
import _uniqueId from "lodash.uniqueid";

import Article from "./components/pages/Article";
import AuthPage from "./components/pages/AuthPage";
import Dashboard from "./components/pages/Dashboard";
import DashboardTab from "./components/pages/DashboardTab/DashboardTab";
import Footer from "./components/pages/Footer";
import Header from "./components/pages/Header";
import Glossary from "./components/pages/Glossary";
import Pages from "./components/pages/Pages";
import Taxonomies from "./components/pages/Taxonomies";
import BecomeInstructor from "./components/pages/BecomeInstructor";
import QuestionBank from "./components/pages/QuestionBank";
import Quiz from "./components/pages/Quiz";
import Tags from "./components/pages/Tags/Tags";
import Categories from "./components/pages/Categories/Categories";
import SubCategories from "./components/pages/Categories/SubCategories/SubCategories";
import React from "react";
import Menu from "./components/pages/Menu/Menu";

const temproraryData = [
  {
    title: "Dashboard",
    to: "dashboard",
    active: false,
    component: <DashboardTab />,
  },
  {
    title: "Admin",
    to: "",
    active: false,
    subLinks: [
      {
        title: "Menu",
        to: "menu",
        active: false,
        component: <Menu />,
      },
    ],
  },
  {
    title: "Taxonomies",
    to: "taxonomies",
    active: false,
    component: <Taxonomies />,
  },
  {
    title: "Articles",
    to: "articles",
    active: false,
    component: <Article />,
  },
  {
    title: "Pages",
    to: "pages",
    active: false,
    component: <Pages />,
  },
  {
    title: "Glossary",
    to: "glossary",
    active: false,
    component: <Glossary />,
  },
  {
    title: "Become instructor",
    to: "become-instructor",
    active: false,
    component: <BecomeInstructor />,
  },
  {
    title: "Footer",
    to: "footer",
    active: false,
    component: <Footer />,
  },
  {
    title: "Header",
    to: "header",
    active: false,
    component: <Header />,
  },
  {
    title: "Question Bank",
    to: "question-bank",
    active: false,
    component: <QuestionBank />,
  },
  {
    title: "Quiz",
    to: "quiz",
    active: false,
    component: <Quiz />,
  },
  {
    title: "Courses",
    to: "",
    active: false,
    subLinks: [
      {
        title: "Tags",
        to: "tags",
        active: false,
        component: <Tags />,
      },
      {
        title: "Categories",
        to: "categories",
        active: false,
        component: <Categories />,
      },
      {
        title: "Sub Categories",
        to: "sub-categories",
        active: false,
        component: <SubCategories />,
      },
    ],
  },
];

const recursiveRoutes = (data) => {
  return (
    <React.Fragment>
      {data.map((item) => {
        return (
          <React.Fragment key={_uniqueId("sub1prefix-")}>
            {item.subLinks && (
              <Route path={item.to} element={item.component}>
                {item.subLinks && recursiveRoutes(item.subLinks)}
              </Route>
            )}
            {!item.subLinks && (
              <Route path={item.to} element={item.component} />
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {recursiveRoutes(temproraryData)}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};