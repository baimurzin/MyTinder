/**
 * Created by vbaimurzin on 03.11.2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    time_created : {type: Date, default: Date.now},
    img_path: String,
    msg_text: String,
    location: {type: [Number], index: '2d'},
    posted_by: {type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{
        text: String,
        posted_by: {type: Schema.Types.ObjectId, ref: 'User'}
    }]
});
module.exports = mongoose.model('Post', PostSchema);