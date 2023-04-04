const { deleteImage } = require("../middlewares/upload.middleware");
const Article = require("../models/Article");
var ObjectId = require("mongoose").Types.ObjectId;

async function index(req, res) {
  try {
    const { category, level,groupBy, tag, limit, page, id_not, language } = req.query;

    const limitNum = parseInt(limit);
    if(groupBy && groupBy=="category"){
      let art = await Article.aggregate([
          {
            $sort:{createdAt:-1}
          },
          {
            $lookup: {
              from: "levels",
              localField: "level",
              foreignField: "_id",
              as: "level"
            }
          },
          {
            $unwind: "$level"
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category"
            }
          },
          {
            $unwind: "$category"
          },
          {
            $lookup: {
              from: "tags",
              localField: "tag",
              foreignField: "_id",
              as: "tag"
            }
          },
          {
            $lookup: {
              from: "languages",
              localField: "language",
              foreignField: "_id",
              as: "language"
            }
          },
          {
            $unwind: "$language"
          },
          {
            $group: {
              _id: "$category.slug",
              articles: { $push: "$$ROOT" }
            }
          },
          {
            $project: {
              _id: 1,
              articles: { $slice: ["$articles", limitNum] }
            }
          }
          
        ]);
        return res.status(200).json(art);
    }
    if (limit && isNaN(limitNum)) {
      return res.status(400).send("Invalid limit parameter");
    }
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
    if (limitNum === 0) {
      const result = await Article.find().populate(["category", "level", "tag", "language"]);
      return res.status(200).json(result);
    }

    const result = await Article.paginate(query, options);
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function findOne(req, res) {
  try {
    let article = await Article.findOne({
      slug: req.params.slug,
    }).populate(["category", "level", "tag", "language"]);
    let tagsDb = article.tag;
    let tags = [];
    for(let i=0; i<tagsDb.length; i++){
      tags.push(tagsDb[i]._id);
    }
    let featuredData = await Article.find({
      tag:{$in:tags}, slug: { $ne: req.params.slug }
    }).limit(3).populate(["category", "level", "tag", "language"]);
   let returnData = {
    article,
    featured:{docs:featuredData}
   }
    res.status(200).json(returnData);
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
