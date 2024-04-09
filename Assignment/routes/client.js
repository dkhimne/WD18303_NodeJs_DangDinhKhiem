const ClientController = require ("../controllers/client/ClientController")
const express  = require("express");

const router = express.Router();

router.get('/shop',ClientController.getShop);
router.get('/about',ClientController.getAbout);
router.get('/cart',ClientController.getCart);
router.get('/checkout',ClientController.getCheckout);
router.get('/contact',ClientController.getContact);
router.get('/single-product',ClientController.getSingle_product);
router.get('/thank',ClientController.getThank);

module.exports = router;