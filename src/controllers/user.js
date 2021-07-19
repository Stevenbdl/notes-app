const User = require('../models/user');//model(user)
const passport = require('passport');//passport authentication

const controller = {};//object to be exported

// GETS
controller.signupGET = (req, res) => {
  res.render('signup', { pageTitle : 'Notes App - Sign Up' });
};

controller.loginGET = (req, res) => {
  res.render('login', { pageTitle : 'Notes App - Login' });
}

controller.profile = (req, res) => {
  //if not isAuth redirect to login
  const data = { pageTitle : 'Notes App - Profile' };
  res.render('profile', data);
}

controller.logout = (req, res) => {
  req.logout();
  /*this is because I use req.session.user for store the session because req.ser(of passport dont work)
    when I use null is like kill the session
  */
  req.session.user = null;
  res.redirect('/');
}

// POSTS
controller.signupPOST = (req, res) => {
  const { name, email, password } = req.body;
  const data = { pageTitle: 'Notes App - Sign up' };
  const errors = [];

  if(password.length < 3) errors.push({ msg : 'Password must be at least 3 characters' });
  
  if(errors.length > 0) {
    data.errors = errors;
    res.render('signup', data);
  }else {
    User.findOne({ email : email }, async function(err, user) {
      if(err) throw err;

      //if user exist
      if(user) {
        errors.push({ msg : 'The user is already register' });
        data.errors = errors;
        res.render('signup', data);
      }else {
        const newUser = new User({ name : name, email : email });
        newUser.password = newUser.hashPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You has been successfully registered');
        res.redirect('/login');
      }
    });
  }
}

// authentication
controller.passport = passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
})


//Restrict routes functions
controller.isAuthenticated = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

controller.restrictLoginAndSignup = function(req, res, next) {
  /**
   * This restrict to user get to login or signup if is authenticated
  */
  if(!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/profile');
}
module.exports = controller;