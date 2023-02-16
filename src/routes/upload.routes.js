const { Router } = require("express");
const router = Router();
const Multer = require("multer");

const multer = Multer({ storage: Multer.memoryStorage() });

const UploadController = require("../middlewares/upload.middleware");
const AuthMiddleware = require("../middlewares/auth.middleware");

router.post("/image", AuthMiddleware, multer.single("image"), UploadController.upload);

module.exports = router;
