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
  var name = req.body.name;
  var prompt = req.body.prompt;
  var program = req.body.program;
  var token = req.body.token;

  var response = {
    link: null,
    success: false
  }

  TokenSchema.findOne({'key': token}, function (err, tokenFound) {
    if (err) return handleError(err);
    if(tokenFound !== null) {
      var programInstance = new ProgramSchema({
        name: name,
        prompt: prompt,
        program: program
      });
      UserSchema.findOneAndUpdate({_id: tokenFound.user}, {$push: {programs: {name: name, link: programInstance}}}, function (err, user) {
        if(user !== null) {
          programInstance.user = user;
          programInstance.save(function (err) {
            if (err) {
              console.log(err);
              res.json(response);
            }
            else {
              response.success = true;
              response.link = programInstance._id;
              res.json(response);
            }
          });
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
