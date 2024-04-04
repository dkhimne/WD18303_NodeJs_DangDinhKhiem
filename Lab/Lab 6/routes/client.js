const ProductController = require ("../controllers/admin/ProductController")
const PostController = require ("../controllers/api/PostController")
const PageController = require ("../controllers/client/PageController")

const express  = require("express");

const router = express.Router();

router.get('/shop',ProductController.getShop);
router.get('/shop/:cateId',ProductController.getShopId);

router.get('/',PageController.homePage);



module.exports = router;