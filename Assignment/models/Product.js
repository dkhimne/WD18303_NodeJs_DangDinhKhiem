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



    static addProduct(callback) {
        let sqlCate = `SELECT * FROM categories`;

        db.query(sqlCate, (err, catelogData) => {
            if (err) throw err;

            callback(catelogData);
        });
    }



    static saveProduct(product) {
        db.query('SELECT MAX(id) AS maxId FROM products', function (err, result) {
            if (err) throw err;
            let newId = result[0].maxId + 1;
            product.id = newId;
            db.query('INSERT INTO products SET ?', product, function (err, data) {
                if (err) throw err;
                return true;
            });
        });
    }

    static delProduct(id, callback) {
        db.query(`DELETE FROM products WHERE id = ${id}`, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }  
}