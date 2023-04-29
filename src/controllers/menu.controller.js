const Menu = require("../models/Menu");
var ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs-extra");
const path = require("path");

async function parseStructure(req, res) {
  try {
    const contentFolder = path.resolve("admin/src/components/pages");
    const dataFolders = fs.readdirSync(contentFolder);

    res.status(200).json(dataFolders);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function index(req, res) {
  try {
    const {limit, page } = req.query;

    let query = {};
    let options = {
      limit: limit || 10,
      page: page || 1,
      sort:{ord:1,createdAt:-1 }
    };

    const result = await Menu.paginate(query, options);
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function create(req, res) {
  try {
    const { title, to, tag, subLinks } = req.body;

    let result = new Menu({
      title,
      to, 
      tag, 
      subLinks
    });

    result = await result.save();
    res.status(200).json({ message: "New Menu Created", result });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function update(req, res) {
  try {
    const result = await Menu.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
    }).populate(["category", "level", "tag", "language"]);

    if (result) {
      return res.status(201).json({ message: "Menu successuly updated", result });
    }
    res.status(400).json({ message: "Menu update failed" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

async function destroy(req, res) {
  try {
    // const result = await Menu.destroy(req.params.slug);

    const result = await Menu.deleteOne({ to: req.params.to });

    if (result.acknowledged === true) {
      return res.status(200).json({ message: "Menu successuly deleted" });
    }
    res.status(400).json({ message: "Menu deletion failed" });
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
  parseStructure
};
