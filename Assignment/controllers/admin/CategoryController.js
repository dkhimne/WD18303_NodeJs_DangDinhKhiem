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
    Category.getAll(function (data) {
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

exports.editCategory = (req, res, next) => {
    let categoryId = req.params.id;
    console.log(categoryId);
    Category.getCategoryById(categoryId, (err, productData) => {
        if (err) {
            res.status(500).send("Đã có lỗi xảy ra khi tìm sản phẩm.");
        } else {
            Category.getAll((err, categoriesData) => {
                if (err) {
                    res.status(500).send("Thầy chưa fix.");
                } else {
                    res.render('editsp.ejs', { product: productData, categories: categoriesData });
                }
            });
        }
    });
}

exports.postEditCategory = (req, res, next) => {
    let categoryId = req.params.id;
    let updatedCategoryData = {
        name: req.body.name,
        
    };

    Category.updateCategory(categoryId, updatedCategoryData, (err, updatedProduct) => {
        if (err) {
            res.status(500).send("Đã có lỗi xảy ra khi cập nhật sản phẩm.");
        } else {
            res.redirect('/admin/listcategories'); 
        }
    });
}
