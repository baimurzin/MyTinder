/**
 * Created by vbaimurzin on 19.11.2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var CommentSchema = new Schema({
    time_created: {type: Date, default: Date.now},
    msg_text: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

CommentSchema.virtual('date').get(function (v) {
    return moment(this.time_created).fromNow();
});

module.exports = mongoose.model('Comment', CommentSchema);