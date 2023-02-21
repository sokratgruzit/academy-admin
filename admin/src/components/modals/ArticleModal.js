import { useContext, useState } from "react";
import { useHttp } from "../../hooks/http.hook";

import { AuthContext } from "../../context/AuthContext";
import ImageUpload from "../UI/ImageUpload";
import BaseInput from "../UI/BaseInput";
import BaseSelect from "../UI/BaseSelect";
import Modal from "./Modal";
import BaseEditor from "../UI/BaseEditor";

function ArticleModal({
  open = false,
  onClose,
  taxonomies,
  article,
  isCreate,
  setArticles,
}) {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [myEditor, setMyEditor] = useState(null);
  const [imageFile, setImageFile] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();

    saveImage(imageFile);

    let formData = {
      title: "",
      category: null,
      tag: null,
      level: null,
      language: null,
      duration: "",
      editor: "",
      image: {
        path: `http://localhost:4000/api/images/${article._id}_article.png`,
      },
    };

    formData.title = e.target.title.value;
    formData.category = e.target.category.value || null;
    formData.language = e.target.language.value || null;
    formData.tag = e.target.tag.length
      ? Array.from(e.target.tag).map((item) => item.value)
      : e.target.tag.value
      ? e.target.tag.value
      : null;
    formData.level = e.target.level.value || null;
    formData.duration = e.target.duration.value;
    formData.editor = myEditor.getData();

    const method = isCreate ? "POST" : "PUT";
    const path = isCreate
      ? "/api/content/articles"
      : "/api/content/articles/" + article.slug;

    const { result, message } = await request(path, method, formData, {
      Authorization: `Bearer ${token}`,
    });

    if (message === "Article successuly updated") {
      setArticles((prev) => ({
        ...prev,
        docs: prev.docs.map((doc) => (doc.title === article.title ? result : doc)),
      }));
    }

    if (message === "New Article Created") {
      setArticles((prev) => ({ ...prev, docs: [...prev.docs, result] }));
    }

    onClose();
  };

  async function saveImage(file) {
    if (!file?.name) return;
    let blob = file.slice(0, file.size, "image/png");
    const newFile = new File([blob], `${article._id}_article.png`, { type: "image/png" });

    let data = new FormData();
    data.append("image", newFile);
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
        setArticles((prev) => ({
          ...prev,
          docs: prev.docs.map((doc) =>
            doc.title === article.title ? { ...doc, image: { path: data.path } } : doc,
          ),
        }));
      });
  }

  const getImageFile = (file) => {
    setImageFile(file);
  };

  return (
    <Modal open={open} onClose={onClose} title="Article">
      <form onSubmit={submitHandler} className="form-list">
        <BaseInput
          type="text"
          id="title"
          name="title"
          defaultValue={article.title || ""}
          label="title"
          placeholder="enter title"
        />
        <BaseSelect
          name="category"
          options={taxonomies.category}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          defaultValue={article.category}
          placeholder="select category"
        />
        <BaseSelect
          name="tag"
          options={taxonomies.tag}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          defaultValue={article.tag || ""}
          placeholder="select tags"
          isMulti={true}
        />
        <BaseSelect
          name="level"
          options={taxonomies.level}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          defaultValue={article.level || ""}
          placeholder="select level"
        />
        <BaseSelect
          name="language"
          options={taxonomies.language}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          defaultValue={article.language}
          placeholder="select language"
        />
        <BaseInput
          type="text"
          id="duration"
          name="duration"
          defaultValue={article.duration || ""}
          label="duration"
          placeholder="enter duration"
        />
        <BaseEditor data={article.editor} setMyEditor={setMyEditor} id="articleEditor" />
        <ImageUpload
          getImageFile={getImageFile}
          article={article}
          label="article image"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default ArticleModal;
