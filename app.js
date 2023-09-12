const path = require('path');
const rootDir = require('./util/path');
const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const { redirect } = require('express/lib/response')

const MONGODB_URI = `mongodb://127.0.0.1:27017/nodePatchFileSaver`;

const app = express()
const connectAndInitializeDatabase = require('./util/db'); // db.js 경로에 맞게 수정
const { createDummyData, createMenuItems }  = require('./util/seed');

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

const errorController = require('./controllers/errorController')
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');

const getMenuItemsMiddleware = require('./middlewares/menuMiddleware'); // 미들웨어 경로에 맞게 수정

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(getMenuItemsMiddleware);

app.use('/admin', adminRoutes);
app.use(homeRoutes);
app.use(errorController.get404);

connectAndInitializeDatabase(MONGODB_URI)
  .then(() => createDummyData()) //더미 데이터 생성
  .then(() => createMenuItems()) //메뉴 초기값 생성
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => { 
      console.log('Server is running on port ${PORT}');
    })
  })
  .catch(err => {
    console.error('Error: ', err);
  });
