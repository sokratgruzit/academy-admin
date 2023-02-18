import { useState } from "react";

<<<<<<< HEAD
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
=======
function ImageUpload({ getImageFile, article, label = "upload image" }) {
  const [fileURL, setFIleURL] = useState(article.image.path || "");
  const [imageTitle, setImageTitle] = useState("");
>>>>>>> 9c57dc0d3736db80d1bc6aacc68cbd99fc74b47d

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
