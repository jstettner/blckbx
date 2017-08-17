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
  var token = req.query.token;

  var response = {
    valid: false,
    user: null,
    programs: []
  }

  TokenSchema.findOne({'key': token}, function (err, tokenFound) {
    if (err) return handleError(err);
    if(tokenFound !== null) {
      UserSchema.findOne({'_id': tokenFound.user}, function (err, userFound) {
        if(userFound !== null) {
          response.valid = true;
          response.user = userFound.user;
          response.programs = userFound.programs;
          res.json(response);
        } else {
          res.json(response);
        }
      });
    } else {
      res.json(response);
    }
  });
});

module.exports = router;
