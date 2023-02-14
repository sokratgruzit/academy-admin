import { Routes, Route, Navigate } from "react-router-dom";
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
import Tags from "./components/pages/Courses/tags/Tags";
import Categories from "./components/pages/Courses/categories/Categories";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="dashboard" element={<DashboardTab />}></Route>
          <Route path="articles" element={<Article />}></Route>
          <Route path="taxonomies" element={<Taxonomies />}></Route>
          <Route path="pages" element={<Pages />}></Route>
          <Route path="glossaries" element={<Glossary />}></Route>
          <Route path="footer" element={<Footer />}></Route>
          <Route path="header" element={<Header />}></Route>
          <Route path="become-instructor" element={<BecomeInstructor />}></Route>
          <Route path="question-bank" element={<QuestionBank />}></Route>
          <Route path="quiz" element={<Quiz />}></Route>
          <Route path="course/tags" element={<Tags />}></Route>
          <Route path="course/categories" element={<Categories />}></Route>
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