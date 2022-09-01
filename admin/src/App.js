import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes'

function App() {
  const { token, login, logout, userId } = useAuth();

  const isAuthenticated = token === 'not detected' ? false : !token ? false : true;

  const routes = useRoutes(isAuthenticated); 

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }}>
      <Router>
        <div className="App">
          {token != 'not detected' && routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
