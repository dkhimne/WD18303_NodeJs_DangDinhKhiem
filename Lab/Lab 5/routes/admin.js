const ProductController = require ("../controllers/admin/ProductController")
const PostController = require ("../controllers/api/PostController")
const multer = require('multer');
const express  = require("express");

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/data/uploads/') // noi luu anh
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
const uploads = multer({ storage: storage })


router.get('/listproducts',ProductController.getProducts); // /listproducts tự đặt

router.get('/themproduct',ProductController.AddProduct);
router.post('/themproduct',uploads.single('image'),ProductController.postAddProduct);

router.get('/posts', PostController.getPosts);

module.exports = router;