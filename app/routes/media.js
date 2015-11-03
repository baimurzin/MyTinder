/**
 * Created by vbaimurzin on 03.11.2015.
 */
var express = require('express');
var router = express.Router();
var log = require('../libs/log')(module);

router.route('/')
    .post(function (req, res) {
        res.send({path: 'placehold.it/350x150'}); //todo
    });


module.exports = router;