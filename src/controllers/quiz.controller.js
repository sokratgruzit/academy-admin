const Quiz = require("../models/Quiz");
const quiz = require("../services/quiz.service");

async function index(req, res) {
  try {
    const { limit, page } = req.query;

    let query = {};
    let options = {
      limit: limit || 10,
      page: page || 1,
    };
    const result = await Quiz.paginate(query, options);
    res.status(200).json({ result });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function findOne(req, res) {
  try {
    let result = await quiz.findOne(req.params.slug);
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function create(req, res) {
  try {
    let result = new Quiz(body);
    result = await result.save();

    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function update(req, res) {
  try {
    const result = await quiz.update(req.params.slug, req.body);
    res.status(201).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function destroy(req, res) {
  try {
    await Quiz.deleteOne({ title: req.params.title });
    res
      .status(200)
      .json({ message: "Quiz deleted successfully", title: req.params.title });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

module.exports = {
  create,
  index,
  findOne,
  update,
  destroy,
};
