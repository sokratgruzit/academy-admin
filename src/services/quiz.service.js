const Quiz = require("../models/Quiz");

async function index() {
  // const result = await Quiz.find().populate(['category', 'level']).populate({path:'structure.question', model:'QuestionBank'});
  return { result };
}

async function findOne(slug) {
  const result = await Quiz.findOne({ slug });
  return { result };
}

async function create(body) {
  let result = new Quiz(body);
  result = await result.save();
  return { result };
}

async function update(slug, body) {
  const result = await Quiz.findOne({ slug });
  await result.updateOne(body);

  return {
    message: "Quiz successuly updated",
  };
}

async function destroy(slug) {
  await Quiz.deleteOne({ slug });

  return {
    message: "Quiz successuly deleted",
  };
}

module.exports = {
  create,
  index,
  findOne,
  update,
  destroy,
};
