const express = require('express');
const router = express.Router();

//Map
router.get('/', (req, res) => {
  res.render('map_test', {title: 'Test Map'});
});

module.exports = router;