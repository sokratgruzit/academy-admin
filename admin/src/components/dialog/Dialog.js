import ReactDom from 'react-dom'
import DialogItem from './DialogItem';

 
function Dialog({data = []}) {
   if(!data || !data.length) return null;
   

   return ReactDom.createPortal(
      <>
         <div className="dialog">
            <div className="list">
               {data.map((item, index) => {
                  return <DialogItem type={item.type} message={item.msg} key={index}/> 
               })}
            </div>
         </div>
      </>,
      document.getElementById('portal')
   )
}

export default Dialog;