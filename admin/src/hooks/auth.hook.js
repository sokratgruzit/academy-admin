import { useState, useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'

const storageName = 'userData';

export const useAuth = () => {
   const [token, setToken] = useState('not detected');
   const [userId, setUserId] = useState(null);

   const login = useCallback((jwtToken, id) => {
      setToken(jwtToken);
      setUserId(id);

      Cookies.set(storageName, JSON.stringify({
         userId: id, token: jwtToken
      }) , { expires: (1 / 1440) * 50})
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
   }, [login])

   return { login, logout, token, userId }
}