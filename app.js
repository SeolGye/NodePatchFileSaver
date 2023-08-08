const path = require('path');
const rootDir = require('./util/path');

const express = require('express')
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const { redirect } = require('express/lib/response')

const app = express()

const adminData = require('./routes/admin');
const postRoutes = require('./routes/post');

const MONGODB_URI = `mongodb://127.0.0.1:27017/nodePatchFilesSaver`;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(postRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});


app.listen(3000)
// mongoose
//     .connect(
//         MONGODB_URI
//     )
//     .then(result => {
//         app.listen(process.env.PORT || 3001);  
//     })
//     .catch(err => console.log(err));
