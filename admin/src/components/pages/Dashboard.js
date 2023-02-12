import { Outlet } from 'react-router-dom';
import Header from "../modules/Header";
import Sidebar from "../modules/Sidebar";


function Dashboard() {

  return (
    <div className="dashboard">
      <Header />
      <div className="container">
        <div className="wrapper">
          <Sidebar />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;   