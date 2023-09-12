const express = require('express');
const router=  express.Router();

const postController = require('../controllers/postController');
const isAuth = require('../middlewares/is-auth');

router.get('/', postController.getIndex);

router.get('/posts', postController.getPosts);

router.get('/posts/:postId', postController.getPost);

router.post('/download', postController.postDownload);

router.get('/download', postController.getDownload);

module.exports = router;