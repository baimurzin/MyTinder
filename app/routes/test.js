/**
 * Created by vbaimurzin on 03.11.2015.
 */

var express = require('express');
var router = express.Router();

var log = require('../libs/log')(module);

router.route('/')
    .get(function (req, res) {
        require('fs').readFile('test.json', 'utf8', function (err, file) {
            if (err)
                log.error(err);
            res.json(JSON.parse(file));
        })
    });

module.exports = router;