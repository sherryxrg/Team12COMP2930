const express = require('express');
const router = express.Router();
import models from '../models/';
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

const Vehicle = models.Vehicle;

//Register vehicle
router.post('/', async (req, res) => {
  let user = req.session.currentUser;
  if (user) {
    req.body.user = user._id;
    let vehicle = new models.Vehicle(req.body);
    let result = await vehicle.save();
    req.flash('success', `You have added ${result.nickname} (${result.license_plate})`);
    res.redirect('/dashboard');
  } else {
    res.send("Not logged in.");
  }
});

router.get('/new', (req, res) => {
  res.render('new_vehicle', {title: 'Create a Vehicle'});
});

router.get('/all', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render('vehicle_list', {
    title: 'Your Vehicles',
    vehicles
  });
});

module.exports = router;
