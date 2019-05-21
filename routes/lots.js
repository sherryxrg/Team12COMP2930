const express = require('express');
const router = express.Router();
import models from '../models/';

const Lot = models.Lot;

router.get('/getAll', (req, res) => {
  Lot.find().populate('company').exec((err, results) => {
    if (err) {
      res.send(err);
    }
    let lots = results.map((l) => {
      return {
        name: l.name,
        lat: l.lat,
        long: l.long,
        number: l.number,
        company: l.company,
        daily: l.rates.daily,
        hourly: l.rates.hourly
      };
    });
    res.json({lots});
  });
});

router.get('/find', (req, res) => {
  let lat = req.query.lat;
  let lng = req.query.long;
  Lot.find({lat: lat, long: lng}).populate('company').exec((err, lots) => {
    if (err) {
      console.log(err);
    }
    let lot = lots[0];
    res.json({
      _id: lot._id,
      name: lot.name,
      rates: {
        daily: lot.rates.daily,
        hourly: lot.rates.hourly,
      },
      lat: lot.lat,
      long: lot.long,
      number: lot.number,
      company: lot.company,
    });
  });
});

module.exports = router;
