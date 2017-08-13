var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  user = req.body.user;
  pass = req.body.pass;
  console.log('user: ' + user);
  console.log('pass: ' + pass);
  res.send();
});

module.exports = router;
