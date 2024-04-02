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
}