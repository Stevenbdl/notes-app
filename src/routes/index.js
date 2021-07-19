const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

//GETS
router.get('/', (req, res) => {
  res.render('welcome', { pageTitle : 'Notes App - Welcome' });
});

router.get('/signup', userController.restrictLoginAndSignup, userController.signupGET);
router.get('/login', userController.restrictLoginAndSignup, userController.loginGET);
router.get('/profile', userController.isAuthenticated, userController.profile);
router.get('/logout', userController.logout);

//POSTS
router.post('/signup', userController.signupPOST);
router.post('/login', userController.passport);

module.exports = router;