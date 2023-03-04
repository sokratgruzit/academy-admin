import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import BaseInput from "../UI/BaseInput";
import BaseSelect from "../UI/BaseSelect";
import Modal from "./Modal";

function QuizModal({
  open = false,
  onClose,
  taxonomies,
  quiz,
  isCreate,
  setQuizzes,
  questions,
}) {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let formData = {
      title: "",
      question: "",
      duration: "",
      category: null,
      level: null,
    };
    formData.title = e.target.title.value;
    formData.question = e.target.question.value;
    formData.duration = e.target.duration.value;
    formData.category = e.target.category.value || null;
    formData.level = e.target.level.value || null;
    formData.structure = selectedQuestions;

    const method = isCreate ? "POST" : "PUT";
    const path = isCreate ? "/api/content/quiz" : "/api/content/quiz/" + quiz.slug;

    console.log(formData);
  };

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
        <BaseInput
          type="text"
          id="question"
          name="question"
          defaultValue={quiz.question || ""}
          label="question"
          placeholder="enter question"
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
          defaultValue={quiz.level}
          placeholder="select level"
        />
        <BaseSelect
          name="questions"
          options={questions}
          getOptionLabel={(option) => option.title}
          getOptionValue={(option) => option._id}
          placeholder="select questions"
          isMulti={true}
          onChange={(data) => setSelectedQuestions(data)}
        />
        {selectedQuestions.map((question, index) => {
          return (
            <div key={question._id} className="quizQuestionsListItem">
              <span>{index + 1}</span>
              <p>{question.title}</p>
            </div>
          );
        })}

        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </Modal>
  );
}

export default QuizModal;
