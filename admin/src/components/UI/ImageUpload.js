import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import FormData from "form-data";

function ImageUpload({ getImagePath, getImageAlt, article, label = "upload image" }) {
  const [altValue, setAltValue] = useState("Image");
  const { token } = useContext(AuthContext);

  async function saveImage(file) {
    let data = new FormData();
    data.append("image", file);
    data.append("id", article._id);

    await fetch("api/upload/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      getImagePath(data.path);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="image-uploader">
      <label htmlFor="imageUploader" className="uploader">
        <input
          type="file"
          name="image"
          id="imageUploader"
          accept="image/jpeg, image/png, image/jpg"
          onChange={(e) => {
            saveImage(e.target.files[0]);
          }}
        />
        <span className="label">{label}</span>
        <div className="upload-btn">Upload Image</div>
        <img className="preview" src={""} />
      </label>
      <div className="input">
        <input
          type="text"
          name="alt"
          defaultValue={article?.image?.alt || altValue}
          placeholder="alt text"
          onChange={(e) => {
            setAltValue(e.target.value);
            getImageAlt(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default ImageUpload;
