const express = require('express');
const router = express.Router();
const Bcrypt = require('bcryptjs');
import models from '../models/';

const User = models.User;
//Register
router.post('/register', async (req, res) => {
  req.body.password = Bcrypt.hashSync(req.body.password, 10);
  let user = new models.User(req.body);
  let result = await user.save();
  res.send(result);
});

//Login
router.post('/', async (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.error(err);
    }
    if(!user || !Bcrypt.compareSync(req.body.password, user.password)) {
      console.log(user);
      return res.status(400).send("Login failed.");
    }
    req.session.currentUser = user;
    res.json(user);
  });
});

module.exports = router;