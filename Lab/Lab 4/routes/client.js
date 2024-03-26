const ProductController = require ("../controllers/admin/ProductController")
const multer = require('multer');
const express  = require("express");

const router = express.Router();

router.get('/shop',ProductController.getShop);
router.get('/shop/:cateId',ProductController.getShopId);

module.exports = router;