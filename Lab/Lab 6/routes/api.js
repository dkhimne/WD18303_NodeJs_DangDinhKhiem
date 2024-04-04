const PostController = require ("../controllers/api/PostController")
const express  = require("express");

const router = express.Router();


router.get('/posts', PostController.getPosts);

router.post('/post', PostController.createPost);

router.get('/post/:id', PostController.getOnePost);

router.put('/post/:id',PostController.updatePost);

router.delete('/post/:id', PostController.deletePost);


module.exports = router;