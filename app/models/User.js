/**
 * Created by vbaimurzin on 03.11.2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    created: {type: Date, default: Date.now},
    access_token: {type:String, unique: true, required: true},
    vkontakteId: {type: String, required:true}
});

module.exports = mongoose.model('User', UserSchema);