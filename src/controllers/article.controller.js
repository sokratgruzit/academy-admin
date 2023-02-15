const article = require("../services/article.service");
const Article = require("../models/Article");
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;

async function index(req, res) {
  try {
    const { category, level, tag, limit, page, id_not, language } = req.query;
    const result = await article.index(
      category,
      level,
      tag,
      limit,
      page,
      id_not,
      language,
    );
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function findOne(req, res) {
  try {
    let result = await Article.find({
      tag: { $in: [new ObjectId(req.params.slug)] },
    }).populate(["category", "level", "tag", "language"]);

    res.status(200).json({ docs: result });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function create(req, res) {
  try {
    const { title, category, tag, level, language, duration, editor, image } = req.body;

    console.log(image);
    const result = await article.create(req.body);
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function update(req, res) {
  try {
    const result = await article.update(req.params.slug, req.body);
    res.status(201).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function destroy(req, res) {
  try {
    const result = await article.destroy(req.params.slug);
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
