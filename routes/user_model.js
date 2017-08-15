var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user: String,
    pass: String
});

// Compile model from schema
module.exports = mongoose.model('user', userSchema);
