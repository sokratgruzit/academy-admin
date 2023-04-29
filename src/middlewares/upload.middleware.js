const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Article = require("../models/Article");

const storage = new Storage({
  projectId: "academy-385213",
  keyFilename: path.join(__dirname, "../../cloudKey.json"),
});

const bucket = storage.bucket("academy-bucket-admin");

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

  const url = await blob.getSignedUrl({
    action: "read",
    expires: "03-17-2025" // Set the expiration date of the URL (optional)
  });

  await Article.findOneAndUpdate(
    { _id: req.body.id },
    { image: { path: url[0] } },
  );

  blobStream.end(req.file.buffer);

  res.status(200).json({ path: url[0] });
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
