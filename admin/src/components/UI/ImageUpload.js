import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from "../../context/AuthContext";
import FormData from "form-data"


function ImageUpload({ upload, data = {}, label = 'upload image' }) {
   const imgRef = useRef(null);
   const altRef = useRef(null);
   const [image, setImage] = useState(null);
   const { token } = useContext(AuthContext);

   const onChange = (e) => {
      setImage(URL.createObjectURL(e.target.files[0]));
   };

   useEffect(() => {
      console.log(data)
      upload.current = () => saveImage(data);
   }, [])

   async function saveImage(defaultData) {

      if (!imgRef.current.files.length) {
         return {
            path: defaultData.path || '',
            alt: altRef.current.value
         }
      }
      let data = new FormData();
      data.append('image', imgRef.current.files[0])
      const res = await fetch('api/upload/image', {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
         },
         body: data
      })
      const { path } = await res.json();
      return {
         path,
         alt: altRef.current.value
      }
   }


   return (
      <div className="image-uploader">

         <label htmlFor="imageUploader" className='uploader'>
            <input type="file" name="image" id="imageUploader"
               ref={imgRef}
               accept="image/jpeg, image/png, image/jpg" onChange={onChange} />
            <span className='label'>{label}</span>
            <div className="upload-btn">
               Upload Image
            </div>
            <img className='preview'
               src={image ? image : data.path ? 'http://localhost:4000/' + data.path : ''} />
         </label>
         <div className="input">
            <input type="text" name="alt" ref={altRef} defaultValue={data.alt || ''} placeholder="alt text" />
         </div>
      </div>
   )
}

export default ImageUpload;