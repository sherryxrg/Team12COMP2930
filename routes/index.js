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
  res.render('dashboard', {user: user, title: "Dashboard"});
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

//Receipt Test
import models from '../models/';
const Receipt = models.Receipt;
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});

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

router.get('/payment_success', async (req, res) => {
  const receipts = await Receipt.find();
  const receipt = receipts[0];
  res.render('receipt', {
    title: 'Receipt',
    receipt
  });
});

module.exports = router;
