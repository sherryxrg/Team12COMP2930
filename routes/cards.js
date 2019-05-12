const express = require('express');
const router = express.Router();
import models from '../models/';
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

const Card = models.Card;

//Add a new card (payment option)
router.post('/', async (req, res) => {
  let user = req.session.currentUser;
  if (user) {
    req.body.user = user._id;
    let card = new models.Card(req.body);
    let result = await card.save();
    res.redirect('/cards/success');
  } else {
    res.send("Not logged in.");
  }
});

router.get('/success', async (req, res) => {
  const cards = await Card.find();
  const newCard = cards[cards.length -1]
  res.render('new_card_added', {
    title: 'Card Registered',
    newCard
  });
});

router.get('/all', async (req, res) => {
  const cards = await Card.find();
  res.render('card_list', {
    title: 'Your Cards',
    cards
  });
});

router.get('/new', (req, res) => {
  res.render('payment', {title: 'Add a new payment method'});
});

module.exports = router;