var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = require('./schemas/user_model.js');
var TokenSchema = require('./schemas/token_model.js');
var db = require('./db.js');
var sanitize = require("mongo-sanitize");
var randtoken = require('rand-token');

function registerToken() {
  // do something
  console.log('');
}

// account login
router.get('/', function(req, res, next) {
  req.body = sanitize(req.body);
  var user = req.query.user;
  var pass = req.query.pass;

  var response = {
    valid: true,
    error: null,
    token : null
  }

  UserSchema.findOne({'user': user}, function (err, userFound) {
    if (err) return handleError(err);
    if(userFound !== null) {
      if(userFound.pass === pass) {
        var key = randtoken.generate(16);
        var token = new TokenSchema({
          key: key,
          user: userFound
        });

        token.save(function (err) {
          if (err) {
            console.log(err);
            response.valid = false;
            res.json(response);
          }
          else {
            response.valid = true;
            response.token = key;
            res.json(response);
          }
        });
      } else {
        response.error = 'password incorrect';
        response.valid = false;
        res.json(response);
      }
    } else {
      response.error = 'user not found';
      response.valid = false
      res.json(response);
    }
  });
});

module.exports = router;
