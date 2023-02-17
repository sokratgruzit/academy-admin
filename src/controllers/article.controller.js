const Article = require("../models/Article");
var ObjectId = require("mongoose").Types.ObjectId;

async function index(req, res) {
  try {
    const { category, level, tag, limit, page, id_not, language } = req.query;

    let query = {};
    let options = {
      populate: ["category", "level", "tag", "language"],
      limit: limit || 10,
      page: page || 1,
    };

    category ? (query.category = category) : "";
    level ? (query.level = level) : "";
    language ? (query.language = language) : "";
    tag ? (query.tag = { $in: tag }) : "";
    id_not ? (query._id = { $ne: id_not }) : "";

    const result = await Article.paginate(query, options);
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

    let result = new Article({
      title,
      category,
      tag,
      level,
      language,
      duration,
      editor,
      image,
    });

    result = await result.save();
    res.status(200).json({ message: "New Article Created", result });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function update(req, res) {
  try {
    const result = await Article.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
    }).populate(["category", "level", "tag", "language"]);

    if (result) {
      return res.status(201).json({ message: "Article successuly updated", result });
    }
    res.status(400).json({ message: "Article update failed" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function destroy(req, res) {
  try {
    // const result = await article.destroy(req.params.slug);

    const result = await Article.deleteOne({ slug: req.params.slug });

    if (result.acknowledged === true) {
      return res.status(200).json({ message: "Article successuly deleted" });
    }
    res.status(400).json({ message: "Article deletion failed" });
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
