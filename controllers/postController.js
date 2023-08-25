const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    Post.find()
        .then(posts => 
        { 
            res.render('home/post-list', {
                pos: posts,
                pageTitle : 'All posts',
                path: '/posts'
            })
        })
    .catch(err=> { 
        console.log(err)
    })
}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId
    Post.findById(postId)
        .populate('attachedFiles')
        .then(post => { 
            res.render('home/post-detail', {
                post: post,
                pageTitle: post.title,
                path: '/posts'
            });
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    Post.find()
    .then(posts => 
        { 
            res.render('home/index', {
                pos: posts,
                pageTitle : 'Home',
                path: '/'
            })
        })
    .catch(err=> { 
        console.log(err)
    })
}


exports.getDownload = (req, res, next) => { 
    res.render('home/download', {
        pageTitle: 'download',
        path:'/posts'
    })
}

exports.postDownload = (req, res, next) => { 
    const postId = req.body.postId


    res.redirect('/download');
}