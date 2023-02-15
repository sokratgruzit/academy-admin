
const { Storage } = require("@google-cloud/storage");
const path = require("path");

const gc = new Storage({
   keyFilename: path.join(__dirname, "../../optimum-habitat-377819-2e92f3dfa8d6.json"),
   projectId: "optimum-habitat-377819"
});

const cubitrixBucket = gc.bucket("cubitrix-storage-bucket");

const upload = (req, res, next) => { 
   if (!req.file) { 
      res.status(400).send("No file uploaded."); 
      return; 
   }

   const blob = cubitrixBucket.file(req.file.originalname); 
   const blobStream = blob.createWriteStream();

   blobStream.on("error", (err) => { next(err); });

   blobStream.on("finish", () => { 
      // The public URL can be used to directly access the file via HTTP. const publicUrl = format(https://storage.googleapis.com/${bucket.name}/${blob.name});
      let publicUrl = `https://storage.googleapis.com/cubitrix-storage-bucket/${blob.name}`
      console.log(publicUrl)
      res.status(200).json({ path: publicUrl });
   });
      
   blobStream.end(req.file.buffer); 
};

// const storage = multer.diskStorage({
//    destination: (req, file, cb) => {
//       cb(null, 'uploads/images')
//    },
//    filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname))
//    }
// });

// const upload = multer({
//    storage,
//    fileFilter: (req, file, cb) => {
//       if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//          cb(null, true);
//       } else {
//          cb(null, false);
//          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//       }
//   }
// });

module.exports = { 
   upload
};