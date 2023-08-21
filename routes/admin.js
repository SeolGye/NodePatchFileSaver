const express = require('express');
const router=  express.Router();

const adminController = require('../controllers/admin');

router.get('/add-post', adminController.getAddPost);

router.get('/posts', adminController.getPosts);

router.post('/add-post', adminController.postAddPost)

module.exports = router