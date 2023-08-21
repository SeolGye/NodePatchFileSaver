const posts = [];

exports.getAddPost = (req, res, next) => {
    res.render('admin/add-post', {
        pageTitle: 'Add Post',
        path: '/admin/add-post',
        formsCSS: true,
        postCSS: true,
        activeAddPost: true
    });
}

exports.postAddPost = (req, res, next) => { 
    const title = req.body.title;
    const fileUrl = req.body.fileUrl;
    const description = req.body.description;

    posts.push({ title: title, 
        fileUrl : fileUrl,
        description: description
     });
    res.redirect('/');
}

exports.getPosts = (req, res, next) => {
    res.render('admin/posts', {
        pos: posts,
        pageTitle : 'Admin posts',
        path: '/admin/posts'

    })
}