const db = require('./Database.js');

module.exports = class User {
    constructor() {
    }
    static getAllUser(callback) {
        let sqlUser = `SELECT * FROM users`;

        db.query(sqlUser, (errUser, UserData) => {
            if (errUser) throw errUser;
            callback(UserData);
        });
    }


    static addUser(callback) {
        let sqlUser = `SELECT * FROM users`;

        db.query(sqlUser, (err, UserData) => {
            if (err) throw err;

            callback(UserData);
        });
    }


    static saveUser(user) {
        db.query('SELECT MAX(id) AS maxId FROM users', function (err, result) {
            if (err) throw err;
            let idnew = result[0].maxId + 1;
            user.id = idnew;
            db.query('INSERT INTO users SET ?', user, function (err, data) {
                if (err) throw err;
                return true;
            });
        });
    }


    static delUser(id, callback) {
        db.query(`DELETE FROM users WHERE id = ${id}`, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }    
    
    static getUserById(id, callback) {
        db.query(`SELECT * FROM users WHERE id = ${id}`, function (err, data) {
            if (err ) {
                callback(err, null);
            } else {
                callback(null,data);
            }
        });
    }
}