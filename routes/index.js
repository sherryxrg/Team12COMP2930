const express = require('express');
const router = express.Router();

import models from '../models/';
const Receipt = models.Receipt;
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});

// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parked', user: req.session.currentUser });
});

// Login page
router.get('/login', (req, res) => {
  let success = '';
  if (req.flash('success')) {
    success = req.flash('success');
  }
  res.render('login', {title: 'Login', success});
});

// Dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.currentUser) {
    let user = {
      first_name: titleize(req.session.currentUser.first_name),
      last_name: titleize(req.session.currentUser.last_name),
    };
    res.render('dashboard', {
      success: req.flash('success'),
      user, title: "Dashboard",
      vehicles: ["vehicle 1", "vehicle 2", "vehicle 3"], 
      cards: ["card 1", "card 2", "card 3"], ratesHourly: ["11", "22", "33"], ratesDaily: ["99", "111", "222"]} );
  } else {
    res.redirect('/login');
  }
});

// Landing
router.get('/landing', (req, res) => {
  let user = null;
  user = req.session.currentUser;
  if (user) {
  res.render('landing', {user: user, title: "Landing"} );
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

//Create Receipt
router.post('/payment', async (req, res) => {
  let user = req.session.currentUser;
  if (user) {
    req.body.user = user._id;
    let receipt = new models.Receipt(req.body);
    let result = await receipt.save();
    res.send(result);
  } else {
    res.send("Not logged in.");
  }
});

// Current Receipt
router.get('/current', async (req, res) => {
  let date = new Date();
  Receipt.find({
    end_time: {
      $gt: date,
    }
  }).sort({end_time: -1}).exec( (err, docs) => {
    if (err) return (err);
    const receipt = docs[0];
    res.render('receipt', {
      title: 'Current Session',
      receipt
    });
  });
});

// Payment Success Page
router.get('/payment_success', async (req, res) => {
  const receipts = await Receipt.find();
  const receipt = receipts[receipts.length - 1];
  res.render('receipt', {
    title: 'Receipt',
    receipt
  });
});

function titleize(s) {
  if (s) {
    const f = s.slice(0, 1);
    const l = s.slice(1, s.length);
    return f.toUpperCase() + l.toLowerCase();
  }
  return "";
}

module.exports = router;
