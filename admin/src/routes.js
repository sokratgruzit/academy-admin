import { Routes, Route, Navigate } from 'react-router-dom';
import Article from './pages/Article';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Footer from './pages/Footer';
import Header from './pages/Header';
import Glossary from './pages/Glossary';
import Pages from './pages/Pages';
import Taxonomies from './pages/Taxonomies';
import BecomeInstructor from './pages/BecomeInstructor';
import QuestionBank from './pages/QuestionBank';
import Quiz from './pages/Quiz';

export const useRoutes = (isAuthenticated) => {
   if (isAuthenticated) {
      return (
         <Routes>
            <Route path='/' element={< Dashboard />}>
               <Route path='articles' element={< Article />}></Route>
               <Route path='taxonomies' element={< Taxonomies />}></Route>
               <Route path='pages' element={< Pages />}></Route>
               <Route path='glossaries' element={< Glossary />}></Route>
               <Route path='footer' element={< Footer />}></Route>
               <Route path='header' element={< Header />}></Route>
               <Route path='become-instructor' element={< BecomeInstructor />}></Route>
               <Route path='question-bank' element={< QuestionBank />}></Route>
               <Route path='quiz' element={< Quiz />}></Route>
               <Route
                  path="*"
                  element={<Navigate to="/" replace />}
               />
            </Route>
         </Routes>
      )
   }
 
   return (
      <Routes>
         <Route path='/' element={< AuthPage />}></Route>
         <Route
            path="*"
            element={<Navigate to="/" replace />}
         />
      </Routes>
   )
}

