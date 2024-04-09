const User = require("../../models/User")

exports.AddUser = (req, res, next) => {
    User.addUser(function (data) {
        res.render('addkh.ejs', { users: data })
    })
}

exports.postAddUser = (req, res, next) => {
    const name = req.body;
    const email = req.body;
    const password = req.body;
    user = {
        name: name,
        email: email,
        password : password
    }
    User.saveUser(user);
    res.redirect('/admin/listkh');

}

exports.getUsers = (req, res, next) => {
    User.getAllUser(function (data) {
        console.log(data);
        res.render('listkh.ejs', { users: data });
    })
}

exports.delUser = (req, res, next) => {
    let userId = req.params.id;
    User.delUser(userId, (err, data) => {
        if (err) {
            res.status(500).send("Đã xóa thành công.");
        } else {
            res.redirect('/admin/listkh');
        }
    });
}
