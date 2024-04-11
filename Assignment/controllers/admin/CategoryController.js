const Category = require("../../models/Category")

exports.AddCategory = (req, res, next) => {
    Category.addCategory(function (data) {
        res.render('addcate.ejs', { categories: data })
    })
}

exports.postAddCategory = (req, res, next) => {
    const {name} = req.body;
    category = {
        name: name
    }
    Category.saveCategory(category);
    res.redirect('/admin/listcategories');

}

exports.getCategories = (req, res, next) => {
    Category.getAllCate(function (data) {
        console.log(data);
        res.render('listcate.ejs', { categories: data });
    })
}

exports.delCategory = (req, res, next) => {
    let cateId = req.params.id;
    Category.delCategory(cateId, (err, data) => {
        if (err) {
            res.status(500).send("Đã xóa thành công.");
        } else {
            res.redirect('/admin/listcategories');
        }
    });
}
