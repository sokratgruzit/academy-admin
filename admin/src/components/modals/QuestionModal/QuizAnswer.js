import React from "react";

const QuizAnswer = ({ onChange, value, checked, onCheckedChange, ...props }) => {

    
  return (
    <div className="answersInputWrapper">
      <input
        className="answersInput"
        onChange={onChange}
        value={value}
        placeholder={`Answer`}
      />
      <input
        type={"radio"}
        checked={checked}
        onChange={onCheckedChange}
        name="correctAnswer"
      />
    </div>
  );
};

export default QuizAnswer;
