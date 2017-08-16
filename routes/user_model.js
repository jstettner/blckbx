var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user: { type: String, trim: true },
    pass: { type: String, trim: true },
    validation: [{ key: String, created: Date }],
    programs: [String]
});

// Compile model from schema
module.exports = mongoose.model('user', userSchema);
