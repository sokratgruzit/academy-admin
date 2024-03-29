const { deleteImage } = require("../middlewares/upload.middleware");
const Article = require("../models/Article");
var ObjectId = require("mongoose").Types.ObjectId;

async function index(req, res) {
  try {
    const { category, level, tag, limit, page, id_not, language, type } = req.query;
    
    let query = {};
    let options = {
      populate: ["category", "level", "tag", "language"],
      limit: limit || 10,
      page: page || 1,
    };

    category && ObjectId.isValid(category) ? (query.category = ObjectId(category)) : "";
    level && ObjectId.isValid(level) ? (query.level = ObjectId(level)) : "";
    language && ObjectId.isValid(language) ? (query.language = ObjectId.isValid(language)) : "";
    tag ? (query.tag = { $in: tag }) : "";
    id_not ? (query._id = { $ne: id_not }) : "";

    const result = await Article.paginate(query, options);
    
    if (type === 'common') {
      return result.docs;
    } else {
      res.status(200).json(result);
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function findOne(req, res) {
  try {
    let result = await Article.find({
      slug: { $in: [req.params.slug] },
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
    // const foundArticle = await Article.findOne({ slug: req.params.slug });

    // if (!foundArticle) return res.status(400).json({ message: "Article not found" });

    // console.log({ ...foundArticle, _doc: {...req.body} });

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
    const result = await Article.deleteOne({ _id: req.params.slug });

    deleteImage(`${req.params.slug}_article.png`);

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
