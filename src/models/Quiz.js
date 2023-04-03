const { Schema, model, mongoose } = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const questionSchema = new Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
      slug: "title",
      slugPaddingSize: 2,
      unique: true,
    },
    question: {
      type: String,
    },
    answers: {
      type: Array,
      default: [
        {
          title: String,
          value: Boolean,
        },
      ],
    },
    editor: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const schema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Title is required"],
    },
    slug: {
      type: String,
      slug: "title",
      slugPaddingSize: 2,
      unique: true,
    },
    question: String,
    duration: {
      type: String,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    level: { type: Schema.Types.ObjectId, ref: "Level" },
    structure: [questionSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = model("Quiz", schema);
