var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = require('./schemas/user_model.js');
var db = require('./db.js');
var sanitize = require("mongo-sanitize");
var bcrypt = require('bcrypt');

const saltRounds = 10;

// account signup
router.post('/', function(req, res, next) {
  req.body = sanitize(req.body);
  var username = req.body.user;
  var password = req.body.pass;

  var response = {
    valid: false,
    errors: []
  };

  UserSchema.find({ 'user': username }, function (err, users) {
    if (err) response.errors.push(err);
    if (users.length > 0) {
      response.error.push('already exists');
    }

    // only alpha, underscore, dot, between 6 and 20
    var userspec = new RegExp("^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$");
    if(! userspec.test(username)) response.errors.push('username invalid');

    // 8+, letter, number
    var passspec = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
    if(! passspec.test(password)) response.errors.push('password invalid');

    if(response.errors.length === 0) {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err) res.json(response);
        var user = new UserSchema({
          user: username,
          pass: hash,
          validation: [],
          programs: []
        });

        response.valid = true;
        user.save(function (err) {
          if (err) {
            console.log(err);
            response.errors.push(err);
          }
          else {
            console.log('saved');
            res.json(response);
          }
        });
      });
    } else {
      res.json(response);
    }
  });
});

module.exports = router;
