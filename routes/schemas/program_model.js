var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var programSchema = new Schema({
  name: String,
  program: String,
  user: Schema.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProgramSchema', programSchema);
