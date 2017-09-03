var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = require('./schemas/user_model.js');
var TokenSchema = require('./schemas/token_model.js');
var ProgramSchema = require('./schemas/program_model.js');
var db = require('./db.js');
var sanitize = require("mongo-sanitize");

// account signup
router.post('/', function(req, res, next) {
  req.body = sanitize(req.body);
  var link = req.body.link;
  var token = req.body.token;

  var response = {
    success: false
  }

  TokenSchema.findOne({'key': token}, function (err, tokenFound) {
    if (err) return handleError(err);
    if(tokenFound) {
      UserSchema.findOneAndUpdate({_id: tokenFound.user}, {$pull: {programs: {link: link}}}, function (err, user) {
        if(user) {
          ProgramSchema.findOneAndRemove({_id: link}, function (err) {
            if(err) {
              response.success = false;
              res.json(response);
            } else {
              response.success = true;
              res.json(response);
            }
          });
        } else {
          response.success = false;
          res.json(response);
        }
      });
    } else {
      response.success = false;
      res.json(response);
    }
  });
});

module.exports = router;
