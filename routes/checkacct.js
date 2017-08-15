var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./user_model.js');
var db = require('./db.js');

// account login
router.get('/', function(req, res, next) {
  var user = req.query.user;
  var pass = req.query.pass;

  User.find({}, function (err, users) {
    if (err) return handleError(err);
    console.log(users);
  });

  res.send();
});

module.exports = router;
