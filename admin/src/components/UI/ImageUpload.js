import { useState } from "react";

function ImageUpload({ getImageFile, article, label = "upload image" }) {
  const [fileURL, setFIleURL] = useState(article.image.path || "");
  const [imageTitle, setImageTitle] = useState("");

  return (
    <div className="image-uploader">
      <label htmlFor="imageUploader" className="uploader">
        <span className="label">{label}</span>
        <div className="upload-btn">Upload Image</div>
        <input
          type="file"
          name="image"
          id="imageUploader"
          accept="image/jpeg, image/png, image/jpg"
          onChange={(e) => {
            setFIleURL(URL.createObjectURL(e.target.files[0]));
            setImageTitle(e.target.files[0]?.name);
            getImageFile(e.target.files[0]);
          }}
        />
      </label>
      <div className="imgOverview">
        <img className="preview" src={fileURL} alt="img" />
        <div className="imageTitle">{imageTitle}</div>
      </div>
    </div>
  );
}

export default ImageUpload;
