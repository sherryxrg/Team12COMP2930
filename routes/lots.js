const express = require('express');
const router = express.Router();
import models from '../models/';

const Lot = models.Lot;

//Find lot
router.get('/:id', async (req,res) => {
  Lot.findById(req.params.id, (err, lot) => {
    if (err) return next(err);
    res.send(lot);
  });
});

module.exports = router;
