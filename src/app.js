const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const cookieParser = require('cookie-parser');


//configs
require('./database');
require('./passport/local-auth');


//settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(path.join(__dirname, 'views'), 'pages'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

//middlewares
app.use(express.json());//this is to be able get the data from REST CLIENT via JSON
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cookieParser('30-12-2001'));
app.use(session({
  secret : '30-12-2001',
  resave : false,
  saveUninitialized : false
}));
app.use(flash());
app.use((req, res, next) => {
  app.locals.success_msg = req.flash('success_msg');
  app.locals.error_msg = req.flash('error_msg');
  // I use req.session instead req.user(passport) because req.user is failing(I dont know the reason :( )
  app.locals.user = req.session.user;
  next();
});
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/notes'));

module.exports = app;