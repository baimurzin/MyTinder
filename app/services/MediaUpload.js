/**
 * Created by vbaimurzin on 03.11.2015.
 */
var cloudinary = require('cloudinary');
var config = require("../config/config").get("cloudinary");
var log = require('../libs/log')(module);

function MediaUpload(cfg) {
    cfg = cfg || config;
    cloudinary.config({
        cloud_name: cfg.cloud_name,
        api_key: cfg.api_key,
        api_secret: cfg.api_secret
    });
}

MediaUpload.prototype.upload = function (file, callback, options) {
    options = options || {crop: 'limit',width: 612,height: 612};
    log.info(options);
    cloudinary.uploader.upload(file, callback, options);
    log.info('upload')
};

MediaUpload.prototype.createStream = function (callback, options) {
    options = options || {crop: 'limit',width: 612,height: 612};
    return cloudinary.uploader.upload_stream(callback, options);
};

module.exports = MediaUpload;