const express = require('express');
const router = express.Router();

// Home page
router.get('/', function(req, res, next) {
  let name = null;
  if (req.session.currentUser) {
    name = req.session.currentUser.first_name;
    name += " " + req.session.currentUser.last_name;
  }
  res.render('index', { title: 'Parked', name: name });
});

// Login page
router.get('/login', (req, res) => {
  res.render('login', {title: 'Login'});
});

// Dashboard
router.get('/dashboard', (req, res) => {
  let user = null;
  user = req.session.currentUser;
  if (user) {
  res.render('dashboard', {user: user, title: "Dashboard"} );
  } else {
    res.redirect('/login');
  }
});

// Register
router.get('/register', (req, res) => {
  res.render('register', {title: 'Register'});
});

// Payment
router.get('/payment', (req, res) => {
  res.render('payment', {title: 'Payment'});
});

// Edit location
router.get('/edit_location', (req, res) => {
  res.render('edit_location', {title: 'Edit_location'});
});



module.exports = router;
