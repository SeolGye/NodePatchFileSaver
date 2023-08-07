const http = require('http')
const express = require('express')
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const { redirect } = require('express/lib/response')

const app = express()

const adminRoutes = require('./routes/admin');
const postRoutes = require('./routes/post');
const MONGODB_URI = `mongodb://127.0.0.1:27017/nodePatchFilesSaver`;


app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(postRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1> Page not found</h1>');
})

app.use('/admin', adminRoutes);
app.use(postRoutes);


app.listen(3000)
// mongoose
//     .connect(
//         MONGODB_URI
//     )
//     .then(result => {
//         app.listen(process.env.PORT || 3001);  
//     })
//     .catch(err => console.log(err));
