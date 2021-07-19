const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(async function(id, done){
  const user = await User.findById(id);
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, (req, email, password, done) => {
  
  User.findOne({ email : email }, function(err, user) {
    if(err) return done(err);

    //If the email dont found
    if(!user) {
      return done(null, false, req.flash('error_msg', 'Incorrect email'));
    }
    //if the password is not equal
    if(!user.comparePassword(password)) {
      return done(null, false, req.flash('error_msg', 'Incorrect password'));
    }
    req.session.user = user;
    return done(null, user);
  });
}));


