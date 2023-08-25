const path = require('path');
const rootDir = require('./util/path');
const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser')
const { redirect } = require('express/lib/response')

const app = express()
const connectAndInitializeDatabase = require('./util/db'); // db.js 경로에 맞게 수정
const createDummyData = require('./util/seed');

const errorController = require('./controllers/errorController')
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');

const getMenuItemsMiddleware = require('./middlewares/menuMiddleware'); // 미들웨어 경로에 맞게 수정


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));


app.use((req, res, next) => {
  User.findById('64e56b7c346c96def594d258')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(getMenuItemsMiddleware);

app.use('/admin', adminRoutes);
app.use(homeRoutes);
app.use(errorController.get404);

connectAndInitializeDatabase()
  .then(() => { 
    return createDummyData()
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => { 
      console.log('Server is running on port ${PORT}');
    })
  })
  .catch(err => {
    console.error('Error: ', err);
  });
