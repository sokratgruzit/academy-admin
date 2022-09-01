import { useContext, useEffect, useState } from "react";
import Dialog from "../components/dialog/Dialog";
import BaseInput from "../components/UI/BaseInput";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

function AuthPage() {
   const auth = useContext(AuthContext);
   const [form, setForm] = useState({
      email: '',
      password: ''
   })


   const { request, loading, error } = useHttp();
   const [messages, setMessages] = useState(null);

   const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value })
   }

   const registerHandler = async () => {
      try {
         const res = await request('api/auth/register', 'POST', { ...form });
         setMessages([{
            type: 'success',
            msg: res.message || 'you successfully registered'
         }]);
      } catch (e) {  
      }
   }

   const loginHandler = async () => {
      try {
         const data = await request('api/auth/login', 'POST', { ...form });
         auth.login(data.token, data.userId); 
      } catch (e) { 
      }
   }

   useEffect(() => {
      setMessages(error);
   }, [error])
 
   return (
      <div className="auth-page">
         <div className="container">
            <div className="inner">
               <h1 className="t-medium title">Authorization</h1>
               <form className="form form-list">
                  <BaseInput 
                     type="email" 
                     name="email" 
                     id="email" 
                     placeholder="enter your email" 
                     onChange={changeHandler}
                     label="Email"/>


                  <BaseInput 
                     type="password" 
                     name="password" 
                     id="password" 
                     placeholder="enter your password" 
                     label="Password"
                     onChange={changeHandler}/>

                  <div className="btns">
                     <button className="btn" disabled={loading} onClick={loginHandler}>login</button>
                     <button className="btn" onClick={registerHandler} disabled={loading}>register</button>
                  </div>
               </form>
            </div>
         </div>
         <Dialog data={messages}/>
      </div>
   );
}
 
export default AuthPage;