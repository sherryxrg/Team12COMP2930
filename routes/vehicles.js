const express = require('express');
const router = express.Router();
import models from '../models/';

const Vehicle = models.Vehicle;

//Register vehicle
router.post('/', async (req, res) => {
  let user = req.session.currentUser;
  if (user) {
    req.body.user = user._id;
    let vehicle = new models.Vehicle(req.body);
    let result = await vehicle.save();
    res.send(result);
  } else {
    res.send("Not logged in.");
  }
});

router.get('/new', (req, res) => {
  res.render('new_vehicle', {title: 'Create a Vehicle'});
});

module.exports = router;