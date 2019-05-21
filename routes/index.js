const express = require('express');
const router = express.Router();

import models from '../models/';
const Receipt = models.Receipt;
const Card = models.Card;
const Vehicle = models.Vehicle;
const Lot = models.Lot;
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

// Home page
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Parked'});
  if (req.session.currentUser) {
  let user = req.session.currentUser;
    let userName = {
      first_name: titleize(req.session.currentUser.first_name),
      last_name: titleize(req.session.currentUser.last_name),
    };
  res.render('index', { 
    title: 'Parked', 
    user: req.session.currentUser, 
    userName
  });
  }
});

// Login page
router.get('/login', (req, res) => {
  res.render('login', {title: 'Login'});
  let user = req.session.currentUser;
  if (user) {
    let userName = {
      first_name: titleize(req.session.currentUser.first_name),
      last_name: titleize(req.session.currentUser.last_name),
    };
 res.render('login', {
      user,
      userName,
      title: 'Login'
    });
  } else {
    res.redirect('/login');
  }

});

// Dashboard
router.get('/dashboard', async (req, res) => {
  if (req.session.currentUser) {
    let user = req.session.currentUser;
    let userName = {
      first_name: titleize(req.session.currentUser.first_name),
      last_name: titleize(req.session.currentUser.last_name),
    };
    const cards = await Card.find({
      user: user._id
    });
    const vehicles = await Vehicle.find({
      user: user._id
    });

    let date = new Date();
    date.setDate(date.getDate() + 1);

    res.render('dashboard', {
      user,
      userName,
      title: "Dashboard",
      vehicles: vehicles,
      cards: cards,
      date: date.toLocaleString()
    });
  } else {
    res.redirect('/login');
  }
});

/* Landing
router.get('/landing', (req, res) => {
  let user = null;
  user = req.session.currentUser;
  if (user) {
    res.render('landing', { user: user, title: "Landing" });
  } else {
    res.redirect('/login');
  }
});
*/

// Register
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Payment
router.get('/payment', async (req, res) => {
  let card = req.query.card;
  console.log(req.query.card);
  let vehicle = req.query.vehicle;
  let lot = req.query.lot;
  let total = req.query.total;
  let rate_type = req.query['rate-type'];
  let hours = req.body.hours;
  console.log(vehicle);
  if (card && vehicle) {
    let c = await Card.findById(card);
    let v = await Vehicle.findById(vehicle);
    let l = await Lot.findOne({number: lot});
    res.render('payment', {
      title: 'Payment',
      card: c,
      vehicle: v,
      lot: l,
      total,
      rate_type,
      hours
    });
  }

});

//Create Receipt
router.post('/payment', async (req, res) => {
  let user = req.session.currentUser;
  if (user) {
    let receipt = new models.Receipt();
    receipt.vehicle = req.body.vehicle_id;
    receipt.card = req.body.card_id;
    receipt.user = user._id;
    receipt.lot = req.body.lot_id;
    receipt.price = req.body.total;
    receipt.start_time = new Date();
    let rate_type = req.body.rate_type;
    let hours = req.body.hours;
    let end_time = new Date();
    if (rate_type == 'hourly') {
      end_time.setTime(end_time.getTime() + (60*60*1000));
      //Error cannot cast to Date
      receipt.end_time = end_time;
    } else if (rate_type == 'daily') {
      end_time.setTime(end_time.getTime() + (24*60*60*1000));
      //Error cannot cast to Date
      receipt.end_time = end_time;
    }
    console.log(receipt);
    await receipt.save();
    Receipt.find({ _id: receipt._id}).populate('vehicle').populate('card').populate('lot').exec((err, receipts) => {
      res.render('receipt', {
        title: 'Payment Success',
        receipt: receipts[0]
      });
    });
  } else {
      res.redirect('/login');
  }
});

// Current Receipt
router.get('/current', async (req, res) => {
  let date = new Date();
  Receipt.find({
    end_time: {
      $gt: date,
    }
  }).sort({ end_time: -1 }).exec((err, docs) => {
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
