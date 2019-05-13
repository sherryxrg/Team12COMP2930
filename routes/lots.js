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
      };
    });
    res.json({lots});
  });
});

module.exports = router;
