const { Router } = require("express");
const router = Router();
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
});

const UploadController = require("../middlewares/upload.middleware");
const AuthMiddleware = require("../middlewares/auth.middleware");

router.post("/image", AuthMiddleware, multer.single("image"), UploadController.upload);

module.exports = router;
