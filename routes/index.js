var express = require('express');
var router = express.Router();
import models from '../models/';

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parked' });
});

router.post('/register', async (req, res) => {
  req.body.password = Bcrypt.hashSync(req.body.password, 10);
  let user = new models.User(req.body);
  let result = await user.save();
  res.send(result);
});

module.exports = router;
