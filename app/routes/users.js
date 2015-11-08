/**
 * Created by vbaimurzin on 03.11.2015.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var log = require('../libs/log')(module);


router.route('/')
    .post(function (req, res) {
        if (!req.body.name){
            res.send('error name not specified');
            return;
        }
        console.log(req.body.name);
        var user = new User({name: req.body.name});
        user.save(function (err) {
            if (err)
                res.send(err);
            res.json({msg: "user created"});
        })
    })
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        })
    });

module.exports = router;