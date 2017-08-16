var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = require('./schemas/user_model.js');
var TokenSchema = require('./schemas/token_model.js');
var db = require('./db.js');
var sanitize = require("mongo-sanitize");

// account login
router.get('/', function(req, res, next) {
  req.body = sanitize(req.body);
  var user = req.query.user;
  var pass = req.query.pass;

  UserSchema.find({'user': user}, function (err, users) {
    if (err) return handleError(err);
    console.log(users);
  });

  res.send();
});

module.exports = router;
