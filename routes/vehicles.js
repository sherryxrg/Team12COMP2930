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

router.get('/', (req, res) => {
  res.render('new_vehicle', {title: 'Create a Vehicle'});
});

router.get('/success', async (req, res) => {
  const vehicles = await Vehicle.find();
  const newVehicle = vehicles[vehicles.length -1]
  res.render('new_vehicle_added', {
    title: 'Vehicle Registered',
    newVehicle
  });
});

router.get('/all', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render('vehicle_list', {
    title: 'Your Vehicles',
    vehicles
  });
});

module.exports = router;