const { Schema, model, mongoose } = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Title is required"],
  },
  type: {
    type: String,
    enum: ["question", "informational"],
  },
  question: {
    type: String,
  },
  // answers: {
  //   type: Array,
  //   default: [
  //     {
  //       title: String,
  //       value: Boolean,
  //     },
  //   ],
  // },
  answers: Object,
  editor: {
    type: String,
  },
});

module.exports = model("QuestionBank", schema);
