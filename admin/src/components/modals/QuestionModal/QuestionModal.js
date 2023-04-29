import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import BaseInput from "../../UI/BaseInput";
import BaseSelect from "../../UI/BaseSelect";
import BaseEditor from "../../UI/BaseEditor";
import Modal from "../Modal";
import QuizAnswer from "./QuizAnswer";

function QuestionModal({ open = false, onClose, question, isCreate, setQuestions }) {
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [questionType, setQuestionType] = useState(question.type || "question");
  const [infoEditor, setInfoEditor] = useState(null);

  const [answersValue, setAnswersValue] = useState({
    answer1: { value: "" },
    answer2: { value: "" },
  });

  useEffect(() => {
    if (question.answers) {
      setAnswersValue(question.answers);
      console.log();
    }
  }, [question]);

  const [correctAnswer, setCorrectAnswer] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();

    let formData = {
      title: "",
      type: questionType,
    };
    if (questionType === "question") {
      formData.answers = answersValue;
      formData.question = e.target.question.value;
    }
    if (questionType === "informational") {
      formData.editor = infoEditor?.getData();
    }
    formData.title = e.target.title.value;

    console.log(formData.answers);

    // const method = isCreate ? "POST" : "PUT";
    // const path = isCreate
    //   ? "/api/content/question-bank"
    //   : "/api/content/question-bank/" + question._id;

    // const result = await request(path, method, formData, {
    //   Authorization: `Bearer ${token}`,
    // });

    // if (result?.message === "new question created") {
    //   setQuestions((prev) => ({ ...prev, docs: [...prev.docs, result.result] }));
    // }

    // if (result?.message === "question updated") {
    //   setQuestions((prev) => ({
    //     ...prev,
    //     docs: [
    //       ...prev.docs.map((q) => (q._id === result.result._id ? result.result : q)),
    //     ],
    //   }));
    // }
    // onClose();
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
        {questionType === "question" && (
          <BaseInput
            type="text"
            id="question"
            name="question"
            defaultValue={question.question || ""}
            label="question"
            placeholder="enter question"
          />
        )}
        {questionType === "question" && (
          <div className="correctAnswersSection">
            <div className="answersTitle">
              <h1>Possible Answers</h1>
              <h1>Choose correct answer</h1>
            </div>
            {Object.entries(answersValue).map(([key, value], index) => {
              return (
                <QuizAnswer
                  key={index}
                  onChange={(e) => {
                    // setAnswersValue((prev) => ({
                    //   ...prev,
                    //   [key]: {
                    //     value: e.target.value,
                    //     correct: correctAnswer === index,
                    //   },
                    // }));
                    // chooseCorrectAnswer(e, index);
                  }}
                  value={value.value}
                  checked={correctAnswer === index}
                />
                // <div key={index} className="answersInputWrapper">
                //   <input
                //     className="answersInput"
                //     onChange={(e) => {
                //       setAnswersValue((prev) => ({
                //         ...prev,
                //         [key]: {
                //           value: e.target.value,
                //           correct: correctAnswer === index,
                //         },
                //       }));
                //     }}
                //     value={value.value}
                //     placeholder={`Answer ${index + 1}`}
                //   />
                //   <input
                //     type={"radio"}
                //     checked={correctAnswer === index}
                //     onChange={(e) => chooseCorrectAnswer(e, index)}
                //     name="correctAnswer"
                //   />
                // </div>
              );
            })}
            {/* {Array.from({ length: 4 }, (_, index) => {
              return (
                <div key={index} className="answersInputWrapper">
                  <input
                    className="answersInput"
                    onChange={(e) => {
                      setAnswersValue((prev) => ({
                        ...prev,
                        [`answer${index + 1}`]: {
                          value: e.target.value,
                          correct: correctAnswer === index,
                        },
                      }));
                    }}
                    value={answersValue[`answer${index + 1}`].value}
                    placeholder={`Answer ${index + 1}`}
                  />
                  <input
                    type={"radio"}
                    checked={correctAnswer === 0}
                    onChange={(e) => chooseCorrectAnswer(e, 0)}
                    name="correctAnswer"
                  />
                </div>
              );
            })} */}
            {/* <div className="answersInputWrapper">
              <input
                className="answersInput"
                onChange={(e) => {
                  setAnswersValue((prev) => ({
                    ...prev,
                    answer1: { question: e.target.value, value: correctAnswer === 0 },
                  }));
                }}
                value={answersValue["answer1"].answer}
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
                  setAnswersValue((prev) => ({
                    ...prev,
                    answer2: { question: e.target.value, value: correctAnswer === 1 },
                  }));
                }}
                value={answersValue["answer2"].answer}
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
                  setAnswersValue((prev) => ({
                    ...prev,
                    answer3: { question: e.target.value, value: correctAnswer === 2 },
                  }));
                }}
                value={answersValue["answer3"].answer}
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
                  setAnswersValue((prev) => ({
                    ...prev,
                    answer4: { question: e.target.value, value: correctAnswer === 3 },
                  }));
                }}
                value={answersValue["answer4"].answer}
                placeholder="Answer 4"
              />
              <input
                type={"radio"}
                checked={correctAnswer === 3}
                onChange={(e) => chooseCorrectAnswer(e, 3)}
                name="correctAnswer"
              />
            </div> */}
          </div>
        )}

        {questionType === "informational" && (
          <BaseEditor
            data={question.editor}
            setMyEditor={setInfoEditor}
            id="questionEditor"
          />
        )}

        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </Modal>
  );
}

export default QuestionModal;
