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
    res.render('dashboard', {user, title: "Dashboard", vehicles: ["vehicle 1", "vehicle 2", "vehicle 3"], 
    cards: ["card 1", "card 2", "card 3"], ratesHourly: ["11", "22", "33"], ratesDaily: ["99", "111", "222"]} );
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
