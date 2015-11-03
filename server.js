/**
 * Created by vlad on 01.11.2015.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var log = require('./libs/log')(module);
//var User = require('./models/User');
//var Post = require('./models/Post');
var mongoose = require('mongoose');
var fs = require('fs');
//mongoose.connect('mongodb://localhost/test1', function (err) {
//    if (err)
//        log.error(err);
//});

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api', require('./app/routes'));

app.listen(1338, function () {
    log.info('express server listen on port 1338');
});