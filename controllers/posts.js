const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dwhdli8yc',
    api_key: '743619644164754',
    api_secret: process.env.CLOUDINARY_SECRET
});
module.exports = {
    // Posts index
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', { posts });
    },

    // Posts new
    postNew(req, res, next) {
        res.render('posts/new');
    },

    // Posts create
    async postCreate(req, res, next) {
        req.body.post.images = [];
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            })
        }
        // use req.body to create a new post
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },

    // Posts show
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', {
            post
        })
    },

    // Posts Edit
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', {
            post
        });

    },

    // Posts Update
    async postUpdate(req, res, next) {
        let post = await Post.findById(req.params.id);

        // check for any images deletions
        if(req.body.deleteImages && req.body.deleteImages.length) {
            let deleteImages = req.body.deleteImages;
            // loop over delete images
            for(const public_id of deleteImages) {
                // delete images from cloudinary
                await cloudinary.v2.uploader.destroy(public_id);
                // delete images from post.images
                for(const image of post.images) {
                    if(image.public_id === public_id) {
                        let index = post.images.indexOf(image);
                        post.images.splice(index,1);
                    }
                }
            }
        }
        // check if there is any image uploaded
        if(req.files) {
            // upload the images
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                // add to the post.image array
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                })
            }  
        }
        // update the post with new properties
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        post.location = req.body.post.location;
        post.save();
        // eval(require('locus'));
        res.redirect(`/posts/${post.id}`);
    },

    // Posts Destroy
    async postDestroy(req, res, next) {
        let post = await Post.findById(req.params.id);
        for(const image of post.images) {
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
        await post.remove();
        res.redirect('/posts');
    }
}