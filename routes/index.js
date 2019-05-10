const express = require('express');
const router = express.Router();

// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parked', user: req.session.currentUser });
});

// Login page
router.get('/login', (req, res) => {
  res.render('login', {title: 'Login'});
});

// Dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.currentUser) {
    let user = {
      first_name: titleize(req.session.currentUser.first_name),
      last_name: titleize(req.session.currentUser.last_name),
    };
    res.render('dashboard', {user, title: "Dashboard"} );
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

function titleize(s) {
  const f = s.slice(0, 1);
  const l = s.slice(1, s.length);
  return f.toUpperCase() + l.toLowerCase();
}

module.exports = router;
