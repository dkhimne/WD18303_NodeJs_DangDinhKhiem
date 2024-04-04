const Post = require('../../models/Post');

exports.getPosts = (req, res, next) => {
    Post.getAll(function (posts) {
        res.status(200).json({
            hovaten: "Dang Dinh Khiem",
            tuoi: "2 tuoi",
            monhoc: "NodeJs",
            hocky: "ky5555",
            lop: "WD18303",
            data: posts
        });
    })
}

exports.createPost = (req, res, next) => {
    let post = {
        title: req.body.title,
        content: req.body.content
    }
    Post.create(post, function (posts) {
        res.status(200).json({
            data: posts
        })
    })
}
exports.getOnePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    console.log(id);
    if (isNaN(id)) {
        return res.status(400).json({
            "message": "id is not a number",
            "data": []
        })
    }

    Post.getOne(id, function (posts) {
        res.status(200).json({
            messages: "thanh cong ",
            data: posts
        })
    })
}

exports.updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    console.log(id);
    if (isNaN(id)) {
        return res.status(400).json({
            "message": "id is not a number",
            "data": []
        });
    }


    let post = {
        title: req.body.title,
        content: req.body.content
    }

    Post.update(id, post, function (posts) {
        res.status(200).json({
            messages: "Update post successfully",
            data: posts
        });
    });
};


exports.deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    console.log(id);
    if (isNaN(id)) {
        return res.status(400).json({
            "message": "id is not a number",
            "data": []
        });
    }

    Post.delete(id, function (err, result) {
        if (err) {
            return res.status(500).json({
                "message": "Delete successful",
                "error": err
            });
        }

        if (!result) {
            return res.status(404).json({
                "message": "Product not found"
            });
        }

        res.status(200).json({
            "message": "Delete faile"
        });
    });

};
