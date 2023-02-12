
const Pagination = ({ page, pages , pageHandler }) => {
 
   const pagination = [];
   for(let i = 1; i <= pages; i++){
      pagination.push(
         (
            <div  className={`num ${page === i ? 'active' : ''}`} onClick={() => pageHandler(i)} key={i}>{i}</div>
         )
      )
   }

   return (
      <div className="pagination">
         <div className="item prev">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path  d="M5.05996 9.79079C5.3389 9.51184 5.3389 9.05958 5.05996 8.78064L1.53182 5.2525C1.3941 5.11478 1.3941 4.88522 1.53182 4.7475L5.05996 1.21936C5.3389 0.940416 5.3389 0.488155 5.05996 0.209209C4.78101 -0.0697375 4.32875 -0.0697375 4.0498 0.209209L0.521665 3.73735C-0.173947 4.43296 -0.173947 5.56704 0.521665 6.26265L4.0498 9.79079C4.32875 10.0697 4.78101 10.0697 5.05996 9.79079Z" fill="#00050F" />
            </svg>
         </div>     
         {pagination}
         <div className="item next">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0.478374 9.79079C0.199429 9.51184 0.199429 9.05958 0.478374 8.78064L4.00651 5.2525C4.14423 5.11478 4.14423 4.88522 4.00651 4.7475L0.478374 1.21936C0.199428 0.940416 0.199428 0.488155 0.478374 0.209209C0.75732 -0.0697375 1.20958 -0.0697375 1.48853 0.209209L5.01666 3.73735C5.71228 4.43296 5.71228 5.56704 5.01666 6.26265L1.48853 9.79079C1.20958 10.0697 0.75732 10.0697 0.478374 9.79079Z" fill="#00050F" />
            </svg>
         </div>
      </div>
   )
}

export default Pagination;