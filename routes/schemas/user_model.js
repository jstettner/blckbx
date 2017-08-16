var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user: { type: String, trim: true },
    pass: { type: String, trim: true },
    programs: [String]
});

// Compile model from schema
module.exports = mongoose.model('UserSchema', userSchema);
