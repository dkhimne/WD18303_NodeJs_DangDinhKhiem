const db = require('./Database.js');

module.exports = class Product {
    constructor() {

    }
    static getAll(callback) {
        let sqlProducts = `SELECT * FROM products`;
        let sqlCatelog = `SELECT * FROM categories`;

        db.query(sqlProducts, (errProducts, productsData) => {
            if (errProducts) throw errProducts;

            db.query(sqlCatelog, (errCatelog, catelogData) => {
                if (errCatelog) throw errCatelog;

                callback(productsData, catelogData);
            });
        });
    }
    static getProductId(req,callback) {
        let cateId = req.params.cateId;
        let sqlProducts = `SELECT * FROM products WHERE category_id='${cateId}'`;
        let sqlCatelog = `SELECT * FROM categories`;

        db.query(sqlProducts, (errProducts, productsData) => {
            if (errProducts) throw errProducts;

            db.query(sqlCatelog, (errCatalog, catelogData) => {
                if (errCatalog) throw errCatalog;
                callback(productsData, catelogData);

            });
        });
    }
    static addProduct(callback) {
        let sqlCate = `SELECT * FROM categories`;

        db.query(sqlCate, (err, catelogData) => {
            if (err) throw err;

            callback(catelogData);
        });
    }
    static saveProduct(product) {
        db.query('insert into products SET ?', product, function (err, data) {
            if (err) throw err;
            return true;
        })
    }
}