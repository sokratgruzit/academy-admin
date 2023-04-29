const QuestionBank = require("../models/QuestionBank");

async function index(req, res) {
  const { limit, page } = req.query;

  const limitNum = parseInt(limit);

  if (limit && isNaN(limitNum)) {
    return res.status(400).send("Invalid limit parameter");
  }

  if (limitNum === 0) {
    const result = await QuestionBank.find();
    return res.status(200).json(result);
  }

  try {
    let options = {
      limit: limitNum || 10,
      page: page || 1,
    };

    const result = await QuestionBank.paginate({}, options);

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
    const result = await QuestionBank.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(201).json({ message: "question updated", result });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function destroy(req, res) {
  try {
    await QuestionBank.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "question deleted", id: req.params.id });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

module.exports = {
  create,
  index,
  update,
  destroy,
};
