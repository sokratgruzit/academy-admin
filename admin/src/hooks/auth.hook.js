import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

const storageName = 'userData';

export const useAuth = () => {
   const [token, setToken] = useState('not detected');
   const [userId, setUserId] = useState(null);
   const location = useLocation();

   const login = useCallback((jwtToken, id) => {
      setToken(jwtToken);
      setUserId(id);
      const expiresTime = new Date(new Date().getTime() + 58 * 60 * 1000);
      Cookies.set(storageName, JSON.stringify({
         userId: id, token: jwtToken
      }) , { expires: expiresTime})
   }, []);

   const logout = useCallback(() => { 
      setToken(null);
      setUserId(null);
      Cookies.remove(storageName)
   }, []);

   useEffect(() => {
      let data = Cookies.get(storageName);
      if(data) data = JSON.parse(data);

      if(data && data.token){
         login(data.token, data.userId)
      }else{
         setToken(null);
      }
   }, [login, location])

   return { login, logout, token, userId }
}