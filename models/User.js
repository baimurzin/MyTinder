/**
 * Created by vlad on 02.11.2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String
});

module.exports = mongoose.model('User', UserSchema);