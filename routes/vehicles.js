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
    res.redirect('/vehicles/success');
  } else {
    res.send("Not logged in.");
  }
});

router.get('/', async (req, res) => {
  let user = req.session.currentUser;
  if (user) {
    const vehicles = await Vehicle.find({
      user: user._id
    });
    res.render('vehicle_list', {
      title: 'Your Vehicles',
      vehicles
    });
  } else {
    res.send("Not logged in.");
  }
});

router.get('/success', async (req, res) => {
  const vehicles = await Vehicle.find();
  const newVehicle = vehicles[vehicles.length -1]
  res.render('new_vehicle_added', {
    title: 'Vehicle Registered',
    newVehicle
  });
});

router.get('/new', (req, res) => {
  res.render('new_vehicle', {title: 'Add Vehicle'});
});

router.post('/delete', async (req, res) => {
  let v = req.body.vehicle_id;
  console.log(v);
  Vehicle.findByIdAndRemove(v, (err, vehicle) => {
    if (err) return next(err);
    res.redirect('/dashboard');
  });
});

module.exports = router;