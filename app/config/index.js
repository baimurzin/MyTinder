/**
 * Created by vbaimurzin on 03.11.2015.
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//require('mongoose').mongoose.connect('mongodb://localhost/test1', function (err) {
//    if (err)
//        log.error(err);
//});

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;