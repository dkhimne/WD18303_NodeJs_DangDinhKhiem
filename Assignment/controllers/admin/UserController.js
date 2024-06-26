const User = require("../../models/User")

exports.AddUser = (req, res, next) => {
    User.addUser(function (data) {
        res.render('addkh.ejs', { users: data })
    })
}

exports.postAddUser = (req, res, next) => {
    const {name,email,password} = req.body;

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

exports.editUser = (req, res, next) => {
    let userId = req.params.id;
    console.log(userId);
    User.getUserById(userId, (err, userData) => {
        if (err) {
            res.status(500).send("Đã có lỗi xảy ra khi tìm sản phẩm.");
        } else {
            User.getAllUser((err, categoriesData) => {
                if (err) {
                    res.status(500).send("Thầy chưa fix.");
                } else {
                    res.render('editsp.ejs', { user: userData, categories: categoriesData });
                }
            });
        }
    });
}


exports.postEditUser = (req, res, next) => {
    let userId = req.params.id;
    let updatedUserData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password      
    };

    User.updatedUserData(userId, updatedUserData, (err, updatedUserData) => {
        if (err) {
            res.status(500).send("Đã có lỗi xảy ra khi cập nhật khach hang.");
        } else {
            res.redirect('/admin/listproducts'); 
        }
    });
}