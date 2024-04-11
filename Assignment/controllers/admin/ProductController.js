const Product = require("../../models/Product")
const Category = require('../../models/Category');

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
            res.status(500).send("Đã có lỗi xảy ra khi xóa sản phẩm.");
        } else {
            res.redirect('/admin/listproducts');
        }
    });
}

exports.editProduct = (req, res, next) => {
    let productId = req.params.id;
    console.log(productId);
    Product.getProductById(productId, (err, productData) => {
        if (err) {
            res.status(500).send("Đã có lỗi xảy ra khi tìm sản phẩm.");
        } else {
            Category.getAllCate((err, categoriesData) => {
                if (err) {
                    res.status(500).send("Thầy chưa fix.");
                } else {
                    res.render('editsp.ejs', { product: productData, categories: categoriesData });
                }
            });
        }
    });
}


exports.postEditProduct = (req, res, next) => {
    let productId = req.params.id;
    let updatedProductData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        sale_price: req.body.sale_price, 
        category_id: req.body.category_id,
    };

    Product.updateProduct(productId, updatedProductData, (err, updatedProduct) => {
        if (err) {
            res.status(500).send("Đã có lỗi xảy ra khi cập nhật sản phẩm.");
        } else {
            res.redirect('/admin/listproducts'); 
        }
    });
}


