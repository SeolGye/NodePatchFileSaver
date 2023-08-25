const express = require('express');
const router=  express.Router();

const adminController = require('../controllers/adminController');

// /admin/add-post => GET
router.get('/add-post', adminController.getAddPost);

// /admin/posts => GET
router.get('/posts', adminController.getPosts);

// /admin/add-post => POST
router.post('/add-post', adminController.postAddPost)

router.get('/edit-post/:postId', adminController.getEditPost);

router.post('/edit-post', adminController.postEditPost);

router.post('/delete-post', adminController.postDeletePost);

module.exports = router