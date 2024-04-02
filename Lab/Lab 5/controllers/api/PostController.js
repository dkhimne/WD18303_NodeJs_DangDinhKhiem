const Post = require('../../models/Post');

exports.getPosts = (req, res, next) => {
    Post.getAll(function (posts) {
        res.status(200).json({
            hovaten: "Dang Dinh Khiem",
            tuoi:"2 tuoi",
            monhoc:"NodeJs",
            hocky:"ky5555",
            lop:"WD18303",
            data: posts
        });
    })
}

exports.createPost = (req, res, next) => {
    let post = {
        title : req.body.title,
        content : req.body.content
    }
    Post.create(post,function(posts){
        res.status(200).json({
            data : posts
        })
    })        
};
