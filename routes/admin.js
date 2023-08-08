const express = require('express');
const router=  express.Router();
const path = require('path');
const rootDir = require('../util/path');
const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-post', {
        pageTitle: 'Add Post',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
});

router.post('/add-product', (req,res,next) => { 
    products.push({ title: req.body.title });
    res.redirect('/');
})

exports.routes = router;
exports.products = products;