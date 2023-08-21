const express = require('express');
const router=  express.Router();

const postsController = require('../controllers/posts');

router.get('/', postsController.getIndex);

router.get('/posts', postsController.getPosts);


module.exports = router;