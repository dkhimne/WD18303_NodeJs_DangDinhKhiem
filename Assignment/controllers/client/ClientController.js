const Client = require("../../models/Client")

exports.getAbout = (req, res, next) => {
        res.render('about.ejs');
}

exports.getCart = (req, res, next) => {
        res.render('cart.ejs');
}

exports.getShop = (req, res, next) => {
        res.render('shop.ejs');
}

exports.getCheckout = (req, res, next) => {
        res.render('checkout.ejs');
}

exports.getContact = (req, res, next) => {
        res.render('contact.ejs');
}

exports.getSingle_product = (req, res, next) => {
        res.render('single-product.ejs');
}

exports.getThank = (req, res, next) => {
        res.render('thank.ejs');
}
