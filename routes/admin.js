const express = require('express');
const router=  express.Router();

const adminController = require('../controllers/adminController');
const isAuth = require('../middlewares/is-auth');

// /admin/add-post => GET
router.get('/add-post', isAuth, adminController.getAddPost);

// /admin/posts => GET
router.get('/posts', isAuth, adminController.getPosts);

// /admin/add-post => POST
router.post('/add-post', isAuth, adminController.postAddPost)

router.get('/edit-post/:postId', isAuth, adminController.getEditPost);

router.post('/edit-post', isAuth, adminController.postEditPost);

router.post('/delete-post', isAuth, adminController.postDeletePost);

module.exports = router