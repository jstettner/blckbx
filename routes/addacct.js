var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var mongoDB = 'localhost:27017/blckbx';
mongoose.createConnection(mongoDB);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.post('/', function(req, res, next) {
  db.once('open', function() {
    var current_instance = new SomeModel({
      user: req.body.user,
      pass: req.body.pass
    });

    current_instance.save(function (err) {
      if (err) return handleError(err);
    });
  });
  console.log('instance saved');
  res.send();
});

module.exports = router;
