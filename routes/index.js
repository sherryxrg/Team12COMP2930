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
  res.render('login');
});

// Dashboard
router.get('/dashboard', (req, res) => {
  let user = null;
  user = req.session.currentUser;
  if (user) {
  res.render('dashboard', {user: user} );
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
