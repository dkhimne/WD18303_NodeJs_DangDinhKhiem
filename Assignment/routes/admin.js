const ProductController = require ("../controllers/admin/ProductController");
const CategoryController = require ("../controllers/admin/CategoryController")
const UserController = require ("../controllers/admin/UserController")

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
router.get('/listproducts',ProductController.getProducts); 

router.get('/themproduct',ProductController.AddProduct);

router.post('/themproduct',uploads.single('image'),ProductController.postAddProduct);

router.get('/delete/:id', ProductController.delProduct);

router.delete('/delete/:id', ProductController.delProduct);

//category
router.get('/listcategories',CategoryController.getCategories);

router.get('/themcate',CategoryController.AddCategory);

router.post('/themcate',CategoryController.postAddCategory);

router.get('/delete/:id', CategoryController.delCategory);

router.delete('/delete/:id', CategoryController.delCategory);

//user
router.get('/listkh',UserController.getUsers);

router.get('/themkh',UserController.AddUser);

router.post('/themkh',UserController.postAddUser);

router.get('/delete/:id', UserController.delUser);

router.delete('/delete/:id', UserController.delUser);

module.exports = router;