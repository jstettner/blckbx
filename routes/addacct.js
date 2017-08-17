var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = require('./schemas/user_model.js');
var db = require('./db.js');
var sanitize = require("mongo-sanitize");

// account signup
router.post('/', function(req, res, next) {
  /*
   TODO:
   - add hashed password/comparison (bcrypt)
   - add signed in token (https://www.npmjs.com/package/rand-token)
   */

  req.body = sanitize(req.body);
  var username = req.body.user;
  var password = req.body.pass;

  var response = {
    valid: false,
    errors: []
  };

  UserSchema.find({ 'user': username }, function (err, users) {
    if (err) return handleError(err);
    if (users.length > 0) {
      response.errors.push('already exists');
    }

    // only alpha, underscore, dot, between 6 and 20
    var userspec = new RegExp("^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$");
    if(! userspec.test(username)) response.errors.push('username invalid');

    // 8+, letter, number
    var passspec = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
    if(! passspec.test(password)) response.errors.push('password invalid');

    if(response.errors.length === 0) {
      var user = new UserSchema({
        user: username,
        pass: password,
        validation: [],
        programs: []
      });

      response.valid = true;
      user.save(function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('saved');
        }
      });
    }

    console.log(response);
    res.json(response);
  });
});

module.exports = router;
