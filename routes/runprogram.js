var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema = require('./schemas/user_model.js');
var TokenSchema = require('./schemas/token_model.js');
var ProgramSchema = require('./schemas/program_model.js');
var db = require('./db.js');
var sanitize = require("mongo-sanitize");
var sandbox = require('../vm/vm.js');

// account signup
router.post('/', function(req, res, next) {
  req.body = sanitize(req.body);
  var link = req.body.link;
  var params = req.body.params;

  var response = {
    success: false,
    result: "",
    console: "",
    errors: []
  }

  ProgramSchema.findOne({_id: link}, function (err, program) {
    if(program) {
      console.log('reached');
      sandbox(program.program, params, function (output) {
        response.success = true;
        response.result = unescape(output.result);
        response.console = unescape(output.console);
        res.json(response);
      });
    } else {
      response.errors.push('program doesn\'t exist');
      res.json(response);
    }
  });
});

module.exports = router;
