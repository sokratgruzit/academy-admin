import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Logo from '../../assets/svg/logo.svg'

function Header() {
   const { logout } = useContext(AuthContext);

   const logoutHandler = (event) => {
      event.preventDefault();
      logout();
   }

   return (
      <header>
         <div className="container">
            <div className="inner">
               <a href="/">
                  <img src={Logo} alt="" />
               </a>
               <a href="/" className="orange-btn" onClick={logoutHandler}>Logout</a>
            </div>
         </div>
      </header>
   )

}

export default Header;