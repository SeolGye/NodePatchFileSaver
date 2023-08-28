const Post = require('../models/post');
const File = require('../models/file'); 
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

exports.postDeletePost = async (req, res, next) => {
    const postId = req.body.postId;
    const objectIdPostId = new mongoose.Types.ObjectId(postId)

    try 
    {
        const post = await Post.findById(objectIdPostId);
        if(!post)
        {
            return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
        }

        for (const fileId of post.attachedFiles)
        {
            const file = await File.findById(fileId);
            if (file) 
            {
              // 파일 삭제
              //fs.unlinkSync(path.join(__dirname, '../public/uploads', file.path));
              // 파일 데이터베이스에서 삭제
              await File.findByIdAndDelete(fileId);
            }
        }
        // 게시물 삭제
        Post.findByIdAndRemove(objectIdPostId)
        .then(() => {
            console.log('DESTROYED POST');
            res.redirect('/admin/posts');    
        }).catch(err => console.log(err));
        return res.status(200).redirect('/admin/posts')    
    } 
    catch(err)
    {
        return res.status(500).json({ message: '게시물 삭제 중 에러가 발생했습니다.' });

    }
    
}