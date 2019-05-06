const express = require('express');
const router = express.Router();
import models from '../models/';

const Receipt = models.Receipt;

//Create receipt
router.post('/', async (req, res) => {
  let user = req.session.currentUser;
  if (user) {
    req.body.user = user._id;
    let receipt = new models.Receipt(req.body);
    let result = await receipt.save();
    res.send(result);
  } else {
    res.send("Not logged in.");
  }
});

//Get receipt
router.get('/:id', async (req,res) => {
  Receipt.findById(req.params.id, (err, receipt) => {
    if (err) return next(err);
    res.send(receipt);
  });
});

//Delete receipt
router.delete('/:id/delete', async (req, res) => {
  Receipt.findByIdAndRemove(req.params.id, (err, receipt) => {
    if (err) return next(err);
    res.send('Receipt deleted');
  });
});

module.exports = router;
