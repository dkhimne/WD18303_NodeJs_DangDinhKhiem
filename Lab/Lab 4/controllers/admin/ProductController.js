const Product = require("../../models/Product")

exports.AddProduct = (req, res, next) => {
    Product.addProduct(function (data) {
        res.render('themsp.ejs', { categories: data })
    })
}

exports.postAddProduct = (req, res, next) => {
    const file = req.file;
    const { name, price, sale_price, describe, category_id } = req.body;
    const image = file.filename;

    product = {
        name: name,
        price: price,
        sale_price : sale_price,
        describe : describe,
        category_id : category_id,
        image: image
    }
    Product.saveProduct(product);
    res.redirect('/client/shop');

}

exports.getProducts = (req, res, next) => {
    Product.getAll(function (data) {
        console.log(data);
        res.render('listsp.ejs', { products: data });
    })
}

exports.getShop = (req, res, next) => {
    Product.getAll(function (data) {
        console.log(data);
        res.render('shop.ejs', { products: data });
    })
}

exports.getShopId = (req, res, next) => {
    Product.getProductId(req,function (data) {
        console.log(data);
        res.render('shop.ejs', { products: data , categories :data });
    })
}

