import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import BaseInput from "../UI/BaseInput";
import BaseSelect from "../UI/BaseSelect";
import Modal from "./Modal";

function QuestionModal({ open = false, onClose, question, isCreate, setQuestions }) {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [questionType, setQuestionType] = useState(question.type || "question");

  const [answersValue, setAnswersValue] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });

  useEffect(() => {
    if (question.answers) {
      setAnswersValue(question.answers);
    }
  }, [question]);

  const [correctAnswer, setCorrectAnswer] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();

    let formData = {
      title: "",
      type: null,
      question: "",
      answers: {},
    };
    formData.title = e.target.title.value;
    formData.type = e.target.type.value || null;
    formData.question = e.target.question.value;
    formData.answers = answersValue;

    const method = isCreate ? "POST" : "PUT";
    const path = isCreate
      ? "/api/content/question-bank"
      : "/api/content/question-bank/" + question.slug;

    const result = await request(path, method, formData, {
      Authorization: `Bearer ${token}`,
    });

    if (result?.message === "new question created") {
      setQuestions((prev) => [...prev, result.result]);
    }

    if (result?.message === "question updated") {
      // setQuestions((prev) => [...prev, result.result]);
      // setQuestions((prev) => [
      //   ...prev.map((q) => (q._id === result.result._id ? result.result : q)),
      // ]);
    }
    console.log(result);
    onClose();
  };

  const chooseCorrectAnswer = (e, num) => {
    if (e.currentTarget.checked) setCorrectAnswer(num);
  };

  return (
    <Modal open={open} onClose={onClose} title="Question">
      <form onSubmit={submitHandler} className="form-list">
        <BaseInput
          type="text"
          id="title"
          name="title"
          defaultValue={question.title || ""}
          label="title"
          placeholder="enter title"
        />
        <BaseSelect
          name="type"
          options={[
            { value: "question", label: "question" },
            { value: "informational", label: "informational" },
          ]}
          defaultValue={{ value: questionType, label: questionType }}
          onChange={(e) => {
            setQuestionType(e.value);
          }}
          placeholder="select type"
        />
        <BaseInput
          type="text"
          id="question"
          name="question"
          defaultValue={question.question || ""}
          label="question"
          placeholder="enter question"
        />
        <div className="correctAnswersSection">
          <div className="answersTitle">
            <h1>Possible Answers</h1>
            <h1>Choose correct answer</h1>
          </div>
          <div className="answersInputWrapper">
            <input
              className="answersInput"
              onChange={(e) => {
                setAnswersValue((prev) => ({ ...prev, answer1: e.target.value }));
              }}
              value={answersValue["answer1"]}
              placeholder="Answer 1"
            />
            <input
              type={"radio"}
              checked={correctAnswer === 0}
              onChange={(e) => chooseCorrectAnswer(e, 0)}
              name="correctAnswer"
            />
          </div>
          <div className="answersInputWrapper">
            <input
              className="answersInput"
              onChange={(e) => {
                setAnswersValue((prev) => ({ ...prev, answer2: e.target.value }));
              }}
              value={answersValue["answer2"]}
              placeholder="Answer 2"
            />
            <input
              type={"radio"}
              checked={correctAnswer === 1}
              onChange={(e) => chooseCorrectAnswer(e, 1)}
              name="correctAnswer"
            />
          </div>
          <div className="answersInputWrapper">
            <input
              className="answersInput"
              onChange={(e) => {
                setAnswersValue((prev) => ({ ...prev, answer3: e.target.value }));
              }}
              value={answersValue["answer3"]}
              placeholder="Answer 3"
            />
            <input
              type={"radio"}
              checked={correctAnswer === 2}
              onChange={(e) => chooseCorrectAnswer(e, 2)}
              name="correctAnswer"
            />
          </div>
          <div className="answersInputWrapper">
            <input
              className="answersInput"
              onChange={(e) => {
                setAnswersValue((prev) => ({ ...prev, answer4: e.target.value }));
              }}
              value={answersValue["answer4"]}
              placeholder="Answer 4"
            />
            <input
              type={"radio"}
              checked={correctAnswer === 3}
              onChange={(e) => chooseCorrectAnswer(e, 3)}
              name="correctAnswer"
            />
          </div>
        </div>
        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </Modal>
  );
}

export default QuestionModal;
