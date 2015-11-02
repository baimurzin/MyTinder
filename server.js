/**
 * Created by vlad on 01.11.2015.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var log = require('./libs/log')(module);
var User = require('./models/User');
var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect('mongodb://localhost/test1', function (err) {
    if (err)
        log.error(err);
});

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = express.Router();

router.get('/', function (req, res) {
    res.json({msg: "api is running"});
});

router.route('/test')
    .get(function (req, res) {
        fs.readFile('test.json', 'utf8',function (err, file) {
            if (err)
                log.error(err);
            res.json(JSON.parse(file));
        })
    });
router.route('/posts')
    .post(function (req, res) {
        //add new post
        res.send('not');
    })
    .get(function (req, res) {
        //get all posts
        res.send('not');
    });

router.route('/posts/:post_id')
    .get(function (req, res) {
        //return one post
        res.json(req.params.post_id);
    });

router.route('/users')
    .post(function (req, res) {
        console.log(req.body);
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
app.use('/api', router);

app.listen(1338, function () {
    log.info('express server listen on port 1338');
});