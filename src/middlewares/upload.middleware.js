const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Article = require("../models/Article");

const storage = new Storage({
  projectId: "buoyant-imagery-378110",
  keyFilename: path.join(__dirname, "../../buoyant-imagery-378110-078ae3dc746a.json"),
});

const bucket = storage.bucket("academy-images");

const upload = async (req, res, next) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }
  let fileName = req.file.originalname.replace(/\s/g, "");

  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();

   blobStream.on("error", (err) => {
      next(err);
   });

  blobStream.on("finish", async () => {
    await Article.findOneAndUpdate(
      { _id: req.body.id },
      { image: { path: `http://localhost:4000/api/images/${fileName}` } },
    );

    res.status(200).json({ path: `http://localhost:4000/api/images/${fileName}` });
  });
  
  blobStream.end(req.file.buffer);
};

const getImage = async (req, res) => {
  const { filename } = req.params;
  const file = bucket.file(filename);

  const stream = file.createReadStream();
  stream.on("error", (err) => {
    res.status(404).send("Image not found");
  });

  res.setHeader("Content-Type", "image/png");

  stream.pipe(res);
>>>>>>> cf8beac15bbc63028b77d16c07e6f9564f9b8453
};

async function deleteImage(fileName) {
  try {
    await bucket.file(fileName).delete();
  } catch (err) {}
}

module.exports = {
  upload,
  getImage,
  deleteImage,
};
