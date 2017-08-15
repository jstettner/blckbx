var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./user_model.js');
var db = require('./db.js');

// account signup
router.post('/', function(req, res, next) {
  var user = new User({
    user: req.body.user,
    pass: req.body.pass
  });

  user.save(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('saved');
    }
  });

  res.send();
});

module.exports = router;
