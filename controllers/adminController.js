const Post = require('../models/post');
const mongoose = require('mongoose');

exports.getAddPost = (req, res, next) => {
    res.render('admin/add-post', {
        pageTitle: 'Add Post',
        path: '/admin/add-post',
        editing: false
    });
}

exports.postAddPost = (req, res, next) => { 
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const attachedFilesData = req.body.attachedFilesData;
    const attachedFiles = JSON.parse(attachedFilesData);

    const post = new Post({
        title: title,
        imageUrl: imageUrl,
        description: description,
        userId: req.user
    })
    post.save()
        .then(result => { 
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getEditPost = ( req, res, next) => {

    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/')
    }
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post => {
        if(!post)
        {
            return res.redirect('/');
        }
        res.render('admin/add-post', {
            pageTitle: 'Edit Post',
            path: '/admin/add-post',
            editing: editMode,
            post: post 
        });
    })
    .catch(err => console.log(err));
};

exports.postEditPost = (req, res, next) => { 
    const postId = req.body.postId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const attachedFilesData = req.body.attachedFilesData;
    const attachedFiles = JSON.parse(attachedFilesData);

    Post.findById(postId)
        .then(post => {
            post.title = updatedTitle;
            post.description = updatedDesc;
            post.imageUrl = updatedImageUrl;
            post.attachedFiles = attachedFiles;
            return post.save()
        })
        .then(result=>{
            res.redirect('/admin/posts')
        })
        .catch(err => console.log(err));
}

exports.getPosts = (req, res, next) => {
    Post.find()
    .then(posts => {
        res.render('admin/posts', {
            pos: posts,
            pageTitle : 'Admin posts',
            path: '/admin/posts'
        });
    })
    .catch(err => console.log(err));
};

exports.postDeletePost = (req, res, next) => {
    const postId = req.body.postId;
    Post.findByIdAndRemove(mongoose.Types.ObjectId(postId))    
    .then(() => {
        console.log('DESTROYED POST');
        res.redirect('/admin/posts');
    })
    .catch(err => console.log(err));
}