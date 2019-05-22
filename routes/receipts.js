const express = require('express');
const router = express.Router();
import models from '../models/';

const Receipt = models.Receipt;

//Create receipt
router.post('/', async (req, res) => {
  let receipt = new models.Receipt(req.body);
  let result = await receipt.save();
  res.send(result);
});

//Get receipt
router.get('/:id', async (req,res) => {
  Receipt.findById(req.params.id, (err, receipt) => {
    if (err) return (err);
    res.send(receipt);
  });
});

module.exports = router;
