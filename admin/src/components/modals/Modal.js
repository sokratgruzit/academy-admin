import ReactDom from 'react-dom';

function Modal({ children, open, onClose, title = 'Title' }) {
   if (!open) return null;


   return ReactDom.createPortal(
      <>
         <div className="modal-layer">
            <div className="modal">
               <div className="top">
                  <h2 className="title">{title}</h2>
                  <button onClick={onClose}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9999 9.86935L18.7598 3.10945C19.1503 2.71893 19.7835 2.71893 20.174 3.10945L20.8928 3.82824C21.2833 4.21876 21.2833 4.85192 20.8928 5.24245L14.1329 12.0023L20.8928 18.7622C21.2833 19.1528 21.2833 19.7859 20.8928 20.1765L20.174 20.8952C19.7835 21.2858 19.1503 21.2858 18.7598 20.8952L11.9999 14.1353L5.24001 20.8952C4.84948 21.2858 4.21632 21.2858 3.82579 20.8952L3.10701 20.1765C2.71648 19.7859 2.71648 19.1528 3.10701 18.7622L9.8669 12.0023L3.10701 5.24245C2.71648 4.85192 2.71648 4.21876 3.10701 3.82824L3.82579 3.10945C4.21632 2.71893 4.84948 2.71893 5.24001 3.10945L11.9999 9.86935Z" fill="#4D5057" />
                     </svg>
                  </button>
               </div>
               <div className="body">
                  {children}
               </div>
            </div>
         </div>
      </>,
      document.getElementById('portal')
   )
}

export default Modal;