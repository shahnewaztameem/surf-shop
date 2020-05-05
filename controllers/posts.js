const Post = require('../models/post');

module.exports = {
    // Posts index
    async getPosts(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', { posts });
    },

    // Posts new
    newPost(req, res, next) {
        res.render('posts/new');
    },

    // Posts create
    async createPost(req, res, next) {
        // use req.body to create a new post
        let post = await Post.create(req.body);
        res.redirect(`/posts/${post.id}`);
    }
}