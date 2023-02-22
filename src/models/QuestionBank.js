const { Schema, model, mongoose } = require("mongoose");

const slug = require("mongoose-slug-updater");

// Exclude the QuestionBank model
const pluginOptions = { excludedModels: ["QuestionBank"] };

mongoose.plugin(slug, pluginOptions);

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
  answers: Object,
  editor: {
    type: String,
  },
});

module.exports = model("QuestionBank", schema);
