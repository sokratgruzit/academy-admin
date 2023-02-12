import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

function DialogItem({ type = 'warning', message = '' }) {
   const [show, setShow] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setShow(false)
      }, 5000)
   }, [])
   return (
      <>
         <AnimatePresence>
            {show ?
               (<motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0, pointerEvents: 'none' }}
                  transition={{ duration: 0.4 }}
                  className={`item ${type}`}>
                  <button className="close" onClick={() => setShow(false)}>
                     x
                  </button>
                  <p className="content">
                     {message}
                  </p>
               </motion.div>) : null}
         </AnimatePresence>
      </>
   )
}

export default DialogItem;