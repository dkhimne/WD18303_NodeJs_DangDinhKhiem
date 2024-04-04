const db = require('./Database.js');

module.exports = class Post {

    static getAll(callback) {
        let sqlPost = `SELECT * FROM posts`;

        db.query(sqlPost, (err, post) => {
            if (err) throw err;
            callback(post);
        });
    }

    static create(newPost, callback) {
        db.query('insert into posts SET ?', newPost, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(data, newPost);
            }
        });
    }

    static getOne(id,callback) {
        let sql = `SELECT * FROM posts WHERE id = ${id}`;
        db.query(sql, function(err, data) {
            if (err) {
                throw err;
            }
            callback(data);
        });
    }

    static update(id, data, callback) {
        db.query(`UPDATE posts SET ? WHERE id = ${id}`, data, function(err, post) {
            if (err) {
                throw err;
            }
            callback(post);
        }); 
    }

    //create code static delete product
    static delete(id,callback) {
        let sql = `DELETE FROM posts WHERE id = ${id}`;
        db.query(sql, function(err, data) {
            if (err) {
                throw err;
            }
            callback(data);
        });
    }
}