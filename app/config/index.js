/**
 * Created by vbaimurzin on 03.11.2015.
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var passport = require('../auth/auth');
var methodOverride = require('method-override');
var swagger = require("swagger-node-express");
require('mongoose').connect('mongodb://localhost/test1', function (err) {
    if (err)
        log.error(err);
});

var app = express();
app.use(passport.initialize());
app.use(methodOverride());
app.use(busboy());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

swagger.setAppHandler(app);

module.exports = app;