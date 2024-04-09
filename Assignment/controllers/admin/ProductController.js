const Product = require("../../models/Product")

exports.AddProduct = (req, res, next) => {
    Product.addProduct(function (data) {
        res.render('addsp.ejs', { categories: data })
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
    res.redirect('/admin/listproducts');

}

exports.getProducts = (req, res, next) => {
    Product.getAll(function (data) {
        console.log(data);
        res.render('listsp.ejs', { products: data });
    })
}

exports.delProduct = (req, res, next) => {
    let productId = req.params.id;
    Product.delProduct(productId, (err, data) => {
        if (err) {
            res.status(500).send("Đã xóa thành công..");
        } else {
            res.redirect('/admin/listproducts');
        }
    });
}

