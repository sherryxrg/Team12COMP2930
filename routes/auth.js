const express = require('express');
const router = express.Router();
const Bcrypt = require('bcryptjs');
import models from '../models/';

const User = models.User;
//Register
router.post('/register', async (req, res) => {
  req.body.password = Bcrypt.hashSync(req.body.password, 10);
  let user = new models.User(req.body);
  user.save((err) => {
    console.log(err);
    if (err) {
      res.redirect('/register');
    } else {
      req.session.currentUser = user;
      res.redirect('/dashboard');
    }
  });
});

//Login
router.post('/', async (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
    if (err) {
      console.error(err);
      res.redirect('/login');
    }
    if (!user || !Bcrypt.compareSync(req.body.password, user.password)) {
      console.log(user);
      res.redirect('/login');
    } else {
    req.session.currentUser = user;
    res.redirect('/dashboard');
    }
  });
});

//Logout
router.get('/logout', (req, res) => {
  req.session.currentUser = null;
  res.redirect('/');
});

module.exports = router;
