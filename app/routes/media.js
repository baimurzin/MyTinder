/**
 * Created by vbaimurzin on 03.11.2015.
 */
var express = require('express');
var router = express.Router();
var log = require('../libs/log')(module);
var mediaUploader = require('../services/MediaUpload');
var MediaUpload = new mediaUploader();

router.route('/upload')
    .post(function (req, res) {
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename, encoding, mime) {
            var stream = MediaUpload.createStream(console.log, null);
            file.pipe(stream);
            res.status(200).send(fieldname);
        })
    });


module.exports = router;