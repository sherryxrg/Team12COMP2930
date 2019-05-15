const express = require('express');
const router = express.Router();

import models from '../models/';
import { RSA_NO_PADDING } from 'constants';
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

const Card = models.Card;

//Add a new card (payment option)
router.post('/new', async (req, res) => {
  let user = req.session.currentUser;
  if (user) {
    req.body.user = user._id;
    let card = new models.Card(req.body);
    await card.save();
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');;
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
  let user = req.session.currentUser;
  if (user) {
    let user = req.session.currentUser;
    let userName = {
      first_name: titleize(req.session.currentUser.first_name),
      last_name: titleize(req.session.currentUser.last_name),
  };
    const cards = await Card.find({
      user: user._id
    });
    res.render('card_list', {
      title: 'Cards',
      cards: cards,
      user,
      userName
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/new', (req, res) => {
  let user = req.session.currentUser;
  if (user) {
    let userName = {
      first_name: titleize(user.first_name),
      last_name: titleize(user.last_name)
    }
    res.render('new_card', {
      user,
      userName,
      title: 'Add a New Payment Method'
    });
  } else {
    res.redirect('/login');
  }
  
});

function titleize(s) {
  const f = s.slice(0, 1);
  const l = s.slice(1, s.length);
  return f.toUpperCase() + l.toLowerCase();
}

module.exports = router;