const ProductController = require ("../controllers/admin/ProductController");
const CategoryController = require ("../controllers/admin/CategoryController")

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

//product
router.get('/listproducts',ProductController.getProducts); // /listproducts tự đặt

router.get('/themproduct',ProductController.AddProduct);

router.post('/themproduct',uploads.single('image'),ProductController.postAddProduct);

//category
router.get('/listcategories',CategoryController.getCategories);

router.get('/themcate',CategoryController.AddCategory);

router.post('/themcate',CategoryController.postAddCategory);

router.get('/delete/:id', CategoryController.delCategory);

router.delete('/delete/:id', CategoryController.delCategory);


module.exports = router;