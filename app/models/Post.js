/**
 * Created by vbaimurzin on 03.11.2015.
 */

var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    time_created: {type: Date, default: Date.now},
    img_path: String,
    msg_text: String,
    location: {type: [Number], index: '2d'},
    views: [{type: Schema.Types.ObjectId, ref: 'User'}],
    viewsCount: {type: Number, default: 0},
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    likesCount: {type: Number, default: 0},
    posted_by: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

PostSchema.virtual('date').get(function (v) {
    return moment(this.time_created).fromNow();
});

module.exports = mongoose.model('Post', PostSchema);