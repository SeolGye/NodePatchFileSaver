const posts = [];

exports.getPosts = (req, res, next) => {
    res.render('home/post-list', {
        pos: posts,
        pageTitle : 'All posts',
        path: '/posts'
    })
}

exports.getIndex = (req, res, next) => {
    res.render('home/index', {
        pos: posts,
        pageTitle : 'Home',
        path: '/'

    })
}