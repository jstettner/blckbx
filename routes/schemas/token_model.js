var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = require('./user_model.js');

var tokenSchema = new Schema({
  key: String,
  user: Schema.ObjectId,
  createdAt: { type: Date, default: Date.now, expires: 60*60*24*30 }
});

module.exports = mongoose.model('TokenSchema', tokenSchema);
