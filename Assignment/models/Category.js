const db = require('./Database.js');

module.exports = class Category {
    constructor() {
    }
    static getAllCate(callback) {
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


    static addCategory(callback) {
        let sqlCate = `SELECT * FROM categories`;

        db.query(sqlCate, (err, catelogData) => {
            if (err) throw err;

            callback(catelogData);
        });
    }


    static saveCategory(category) {
        db.query('SELECT MAX(id) AS maxId FROM categories', function (err, result) {
            if (err) throw err;
            let idnew = result[0].maxId + 1;
            category.id = idnew;
            db.query('INSERT INTO categories SET ?', category, function (err, data) {
                if (err) throw err;
                return true;
            });
        });
    }


    static delCategory(id, callback) {
        db.query(`DELETE FROM categories WHERE id = ${id}`, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }    
    
}