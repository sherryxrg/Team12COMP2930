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
    res.redirect('/login');
  }
});

router.get('/', async (req, res) => {
  let user = req.session.currentUser;
  let userName = {
    first_name: titleize(user.first_name),
    last_name: titleize(user.last_name),
  };
  if (user) {
    const vehicles = await Vehicle.find({
      user: user._id
    });
    res.render('vehicle_list', {
      title: 'Your Vehicles',
      vehicles,
      user,
      userName,
    });
  } else {
    res.send("Not logged in.");
  }
});

router.get('/success', async (req, res) => {
  const user = req.session.currentUser;
  let userName = {
    first_name: titleize(user.first_name),
    last_name: titleize(user.last_name),
  };
  const vehicles = await Vehicle.find();
  const newVehicle = vehicles[vehicles.length -1];
  res.render('new_vehicle_added', {
    title: 'Vehicle Registered',
    newVehicle,
    user,
    userName,
  });
});

router.get('/new', (req, res) => {
  const user = req.session.currentUser;
  let userName = {
    first_name: titleize(user.first_name),
    last_name: titleize(user.last_name),
  };
  res.render('new_vehicle', {
    title: 'Add Vehicle',
    user,
    userName,
  });
});

router.post('/delete', async (req, res) => {
  let v = req.body.vehicle_id;
  console.log(v);
  Vehicle.findByIdAndRemove(v, (err, vehicle) => {
    if (err) return next(err);
    res.redirect('/dashboard');
  });
});

function titleize(s) {
  const f = s.slice(0, 1);
  const l = s.slice(1, s.length);
  return f.toUpperCase() + l.toLowerCase();
}

module.exports = router;
