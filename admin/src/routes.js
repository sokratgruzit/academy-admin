import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import _uniqueId from "lodash.uniqueid";

import AuthPage from "./components/pages/AuthPage";
import Dashboard from "./components/pages/Dashboard";

const temproraryData = [
  {
    title: "Dashboard",
    to: "dashboard",
    active: false,
    component: "./components/pages/DashboardTab/DashboardTab",
  },
  {
    title: "Admin",
    to: "admin",
    active: false,
    component: "./components/pages/Menu/Menu",
    subLinks: [
      {
        title: "Menu",
        to: "admin/menu",
        active: false,
        component: "./components/pages/Menu/Menu",
      },
    ],
  },
  {
    title: "Taxonomies",
    to: "taxonomies",
    active: false,
    component: "./components/pages/Taxonomies",
  },
  {
    title: "Articles",
    to: "articles",
    active: false,
    component: "./components/pages/Article",
  },
  {
    title: "Pages",
    to: "pages",
    active: false,
    component: "./components/pages/Pages",
  },
  {
    title: "Glossary",
    to: "glossary",
    active: false,
    component: "./components/pages/Glossary",
  },
  {
    title: "Become instructor",
    to: "become-instructor",
    active: false,
    component: "./components/pages/BecomeInstructor",
  },
  {
    title: "Footer",
    to: "footer",
    active: false,
    component: "./components/pages/Footer",
  },
  {
    title: "Header",
    to: "header",
    active: false,
    component: "./components/pages/Header",
  },
  {
    title: "Question Bank",
    to: "question-bank",
    active: false,
    component: "./components/pages/QuestionBank",
  },
  {
    title: "Quiz",
    to: "quiz",
    active: false,
    component: "./components/pages/Quiz",
  },
  {
    title: "Courses",
    to: "course",
    active: false,
    subLinks: [
      {
        title: "Tags",
        to: "tags",
        active: false,
        component: "./components/pages/Tags/Tags",
      },
      {
        title: "Categories",
        to: "categories",
        active: false,
        component: "./components/pages/Categories/Categories",
      },
      {
        title: "Sub Categories",
        to: "sub-categories",
        active: false,
        component: "./components/pages/Categories/SubCategories/SubCategories",
      },
    ],
  },
];

const recursiveRoutes = (data) => {
  return (
    <React.Fragment>
      {data.map((item) => {
        let Component = React.lazy(() => import(`${item.component}`)
        .then(module => {
          return module;
        }));
        
        return (
          <React.Fragment key={_uniqueId("sub1prefix-")}>
            {item.subLinks && (
              <Route path={item.subLinks.to} element={<Component />} /> && recursiveRoutes(item.subLinks)
            )}
            {!item.subLinks && (
              <Route path={item.to} element={<Component />} />
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
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            {recursiveRoutes(temproraryData)}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </React.Suspense>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
