import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import BaseInput from "../UI/BaseInput";
import BaseSelect from "../UI/BaseSelect";
import Modal from "./Modal";
import BaseEditor from "../UI/BaseEditor";
import BaseCheckox from "../UI/BaseCheckbox";

function QuizModal({ open = false, onClose, taxonomies, quiz, isCreate }) {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [myEditor, setMyEditor] = useState(null);
  const [structureLength, setStructureLength] = useState(1);

  const [courseInfoLength, setCourseInfoLength] = useState(1);

  const [courseInfoEditors, setCourseInfoEditors] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let formData = {
      title: "",
      description: [],
      duration: "",
      category: null,
      level: null,
      structure: [],
      editor: "",
    };
    formData.title = e.target.title.value;
    formData.description = courseInfoEditors.map((editor) => editor.getData());
    formData.duration = e.target.duration.value;
    formData.category = e.target.category.value || null;
    formData.level = e.target.level.value || null;
    formData.editor = myEditor.getData();

    const getDynamicValues = (prefix, length, name) => {
      let obj = {};
      for (let i = 0; i < length; i++) {
        obj.title = e.target[`${prefix}_title_${i + 1}`].value;
        obj.question = e.target[`${prefix}_question_${i + 1}`].value;
        formData[name].push(obj);
        obj = {};
      }
    };
    getDynamicValues("structure", structureLength, "structure");

    const method = isCreate ? "POST" : "PUT";
    const path = isCreate ? "/api/content/quiz" : "/api/content/quiz/" + quiz.slug;

    console.log(formData);

    //  const result = await request(path, method, formData, {
    //    Authorization: `Bearer ${token}`,
    //  });
    //  onClose();
  };

  const structure = [];
  for (let i = 1; i <= structureLength; i++) {
    structure.push(
      <div key={i}>
        <br />
        <BaseInput
          type="text"
          id={`structure_title_${i}`}
          name={`structure_title_${i}`}
          label="title"
          defaultValue={
            quiz?.structure && quiz.structure[i - 1]?.title
              ? quiz.structure[i - 1].title
              : ""
          }
          placeholder="title"
        />
        <br />
        <BaseSelect
          id={`structure_question_${i}`}
          name={`structure_question_${i}`}
          options={[]}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          defaultValue={
            quiz?.structure && quiz.structure[i - 1]?.question
              ? quiz.structure[i - 1].question
              : ""
          }
          placeholder="select question"
        />
      </div>,
    );
  }

  // useEffect(() => {
  //    if(question.answers){
  //       setAnswersLength(question.answers.length || 1)
  //    }else{
  //       setAnswersLength(1)
  //    }
  // }, [open])

  const infoData = [];
  for (let k = 1; k <= courseInfoLength; k++) {
    infoData.push(
      <div key={k}>
        <BaseEditor
          data={quiz.editor}
          setMyEditor={(editor) => setCourseInfoEditors((prev) => [...prev, editor])}
        />
      </div>,
    );
  }

  return (
    <Modal open={open} onClose={onClose} title="Quiz">
      <form onSubmit={submitHandler} className="form-list">
        <BaseInput
          type="text"
          id="title"
          name="title"
          defaultValue={quiz.title || ""}
          label="title"
          placeholder="enter title"
        />
        <div>
          {infoData}
          <div className="btn" onClick={() => setCourseInfoLength((prev) => prev + 1)}>
            add step
          </div>
          {courseInfoLength > 1 ? (
            <div className="btn" onClick={() => setCourseInfoLength((prev) => prev - 1)}>
              remove step
            </div>
          ) : (
            ""
          )}
        </div>
        <BaseInput
          type="text"
          id="description"
          name="description"
          defaultValue={quiz.description || ""}
          label="description"
          placeholder="enter description"
        />

        <BaseInput
          type="text"
          id="duration"
          name="duration"
          defaultValue={quiz.duration || ""}
          label="duration"
          placeholder="enter duration"
        />
        <BaseSelect
          name="category"
          options={taxonomies.category}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          defaultValue={quiz.category}
          placeholder="select category"
        />
        <BaseSelect
          name="level"
          options={taxonomies.level}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          defaultValue={quiz.level || ""}
          placeholder="select level"
        />
        <br />
        <br />
        {structureLength && (
          <div>
            <h4>structure</h4>
            <br />
            {structure}
            <br />
            <div className="btn" onClick={() => setStructureLength(structureLength + 1)}>
              add step
            </div>
            {structureLength > 1 ? (
              <div
                className="btn"
                onClick={() => setStructureLength(structureLength - 1)}
              >
                remove step
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        <BaseEditor data={quiz.editor} setMyEditor={setMyEditor} id="quizEditor" />

        <button className="btn" type="submit">
          {" "}
          submit
        </button>
      </form>
    </Modal>
  );
}

export default QuizModal;
