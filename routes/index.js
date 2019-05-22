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
  if (req.session.currentUser) {
    let user = req.session.currentUser;
    let userName = {
      first_name: titleize(user.first_name),
      last_name: titleize(user.last_name),
    };
    res.render('index', {title: 'Parked',
      user,
      userName,
    });
  }
  res.render('index', {title: 'Parked'});
});

// Login page
router.get('/login', (req, res) => {
  if (req.session.currentUser) {
    res.redirect('/dashboard');
  } else {
    res.render('login', {title: 'Login'});
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

// Register
router.get('/register', (req, res) => {
  if (req.session.currentUser) {
    res.redirect('/dashboard');
  } else {
    res.render('register', { title: 'Register' });
  }
});

// Payment
router.get('/payment', async (req, res) => {
  if (req.session.currentUser) {
    let user = req.session.currentUser;
    let userName = {
      first_name: titleize(user.first_name),
      last_name: titleize(user.last_name),
    };
    let card = req.query.card;
    let vehicle = req.query.vehicle;
    let lot = req.query.lot;
    let total = req.query.total;
    let rate_type = req.query['rate-type'];
    let hours = req.query.hours;
    if (card && vehicle) {
      let c = await Card.findById(card);
      let v = await Vehicle.findById(vehicle);
      let l = await Lot.findOne({number: lot});
      res.render('payment', {
        user,
        userName,
        title: 'Payment',
        card: c,
        vehicle: v,
        lot: l,
        total,
        rate_type,
        hours
      });
    }
  }
});

//Create Receipt
router.post('/payment', async (req, res) => {
  let user = req.session.currentUser;
  if (user) {
    let userName = {
      first_name: titleize(user.first_name),
      last_name: titleize(user.last_name),
    };
    let receipt = new models.Receipt();
    receipt.vehicle = req.body.vehicle_id;
    receipt.card = req.body.card_id;
    receipt.user = user._id;
    receipt.lot = req.body.lot_id;
    receipt.price = req.body.total;
    receipt.start_time = new Date();
    let rate_type = req.body.rate_type;
    let hours = req.body.hours;
    console.log(hours);
    let end_time = new Date();
    if (rate_type == 'hourly') {
      end_time.setTime(end_time.getTime() + (hours * 60*60*1000));
      //Error cannot cast to Date
      receipt.end_time = end_time;
    } else if (rate_type == 'daily') {
      end_time.setTime(end_time.getTime() + (24*60*60*1000));
      //Error cannot cast to Date
      receipt.end_time = end_time;
    }
    await receipt.save();
    Receipt.find({ _id: receipt._id}).populate('vehicle').populate('card').populate('lot').exec((err, receipts) => {
      res.render('receipt', {
        title: 'Payment Success',
        receipt: receipts[0],
        userName,
        user,
      });
    });
  } else {
      res.redirect('/login');
  }
});

// Current Receipt
router.get('/current', async (req, res) => {
  const user = req.session.currentUser;
  let date = new Date();
  Receipt.find({
    end_time: {
      $gt: date,
    }
  }).populate('vehicle').populate('card').populate('lot')
    .sort({ end_time: -1 }).exec((err, docs) => {
    if (err) return (err);
    const receipt = docs[0];
    res.render('receipt', {
      title: 'Current Session',
      receipt,
      user
    });
  });
});

// Payment Success Page
router.get('/payment_success', async (req, res) => {
  const receipts = await Receipt.find();
  const receipt = receipts[receipts.length - 1];
  const user = req.session.currentUser;
  res.render('receipt', {
    title: 'Receipt',
    receipt,
    user
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
