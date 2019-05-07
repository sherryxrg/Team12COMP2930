const express = require('express');
const router = express.Router();
import models from '../models/';

//Add a new card (payment option)
router.post('/', async (req, res) => {
  //let user = req.session.currentUser;
  if (true) {
    //req.body.user = user._id;
    let card = new models.Card(req.body);
    let result = await card.save();
    res.send(result);
  } else {
    res.send("Not logged in.");
  }
});

router.get('/new', (req, res) => {
  res.render('new_card', {title: 'Add a new payment method'});
});

module.exports = router;