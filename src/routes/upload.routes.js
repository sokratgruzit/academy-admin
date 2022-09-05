const {Router} = require('express');
const router = Router();
 
const UploadController = require('../middlewares/upload.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');


//  /api/auth
router.post('/image',AuthMiddleware,  UploadController.single('image') , (req, res) => {
   const path = 'uploads/images/' + req.file.filename;
   res.status(200).json({path})
});

 
module.exports = router;
    