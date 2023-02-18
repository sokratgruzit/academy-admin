const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Article = require("../models/Article");

const gc = new Storage({
  keyFilename: path.join(__dirname, "../../optimum-habitat-377819-2e92f3dfa8d6.json"),
  projectId: "optimum-habitat-377819",
});

const cubitrixBucket = gc.bucket("cubitrix-storage-bucket");

async function generateV4ReadSignedUrl(fileName) {
   // These options will allow temporary read access to the file
   const options = {
      version: "v4",
      action: "read",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
   };

   // Get a v4 signed URL for reading the file
   gc
   .bucket("cubitrix-storage-bucket")
   .file(fileName)
   .getSignedUrl(options);

   return url;
}

const upload = (req, res, next) => {
   if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
   }

   let fileName = req.file.originalname.replace(/\s/g, "");

   const blob = cubitrixBucket.file(fileName);
   const blobStream = blob.createWriteStream();

   blobStream.on("error", (err) => {
      next(err);
   });

   blobStream.on("finish", async () => {
      // The public URL can be used to directly access the file via HTTP. const publicUrl = format(https://storage.googleapis.com/${bucket.name}/${blob.name});
      await generateV4ReadSignedUrl(fileName).then(async (path) => {
         await Article.findOneAndUpdate({ _id: req.body.id }, { image: { path } });

         res.status(200).json({ path: path });
      });

      //let publicUrl = `https://storage.googleapis.com/cubitrix-storage-bucket/${blob.name}`
   });

   blobStream.end(req.file.buffer);
};

module.exports = {
  upload,
};
