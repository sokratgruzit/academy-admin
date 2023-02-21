const QuestionBank = require("../models/QuestionBank");
const question = require("../services/question-bank.service");

async function index(req, res) {
  try {
    //  const result = await question.index();
    const result = await QuestionBank.find();

    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function findOne(req, res) {
  try {
    let result = await question.findOne(req.params.slug);
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function create(req, res) {
  try {
    const inst = new QuestionBank(req.body);
    const result = await inst.save();
    res.status(200).json({ message: "new question created", result });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function update(req, res) {
  try {
    const result = await QuestionBank.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true },
    );
    res.status(201).json({ message: "question updated", result });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function destroy(req, res) {
  try {
    const result = await question.destroy(req.params.slug);
    res.status(200).json(result);
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
