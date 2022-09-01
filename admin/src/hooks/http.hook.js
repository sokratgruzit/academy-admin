import { useCallback, useState } from "react"

export const useHttp = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState([]);

   const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

      setLoading(true);
      setError([]);

      try {
         if(body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
         }
         
         const response = await fetch(url, {
            method, body, headers
         })

         const data = await response.json();

         if (!response.ok) {
            throw new Error(JSON.stringify(data.errors) || JSON.stringify([{msg: data.message}]) || JSON.stringify([{msg: 'Something get wrong'}]));
         }

         setLoading(false);
        
         return data;
      } catch (e) {
         const errors = JSON.parse(e.message).map((error) => {
            return {...error, type: 'error'}
         })
         setLoading(false);
         setError(errors);
         throw errors; 
      }
      
   }, [])

   const clearError = () => setError([]);

   return { loading, request, error, clearError }
}