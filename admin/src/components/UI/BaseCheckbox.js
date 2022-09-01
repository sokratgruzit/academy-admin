
function BaseCheckox({ id = 'checkbox', name = 'checkbox', defaultChecked = false , label = 'checkbox value'}) {
   return (
      <label className="checkbox" htmlFor={id}>
         <input type="checkbox" id={id} name={name} defaultChecked={defaultChecked} />
         <div className="marker">
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M1.39844 5.19922L5.39844 9.19922L13.3984 1.19922" stroke="white" />
            </svg>
         </div>
         <span className="label">{label}</span>
      </label>
   )
}

export default BaseCheckox; 