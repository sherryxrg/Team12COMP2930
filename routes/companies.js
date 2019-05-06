const express = require('express');
const router = express.Router();
import models from '../models/';

const Company = models.Company;

//Find company
router.get('/:id', async (req,res) => {
  Company.findById(req.params.id, (err, company) => {
    if (err) return next(err);
    res.send(company);
  });
});

module.exports = router;
