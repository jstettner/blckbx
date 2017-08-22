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

  var response = {
    success: false,
    name: "",
    prompt: "",
    errors: []
  }

  ProgramSchema.findOne({_id: link}, function (err, program) {
    if(program !== null) {
      response.success = true;
      response.name = program.name;
      response.prompt = program.prompt;
      res.json(response);
    } else {
      response.errors.push('program doesn\'t exist');
      res.json(response);
    }
  });
});

module.exports = router;
