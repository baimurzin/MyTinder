/**
 * Created by vlad on 01.11.2015.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var log = require('./libs/log')(module);
var User = require('./models/User');
var Post = require('./models/Post');
var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect('mongodb://localhost/test1', function (err) {
    if (err)
        log.error(err);
});
var testUser;

User.findOne({name: 'Vlad'}, function (err, user) {
    testUser = user;
});

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = express.Router();

function getImgPath() {
    return "http://placehold.it/350x150";
}

router.get('/', function (req, res) {
    res.json({msg: "api is running"});
});

router.route('/test')
    .get(function (req, res) {
        fs.readFile('test.json', 'utf8',function (err, file) {
            if (err)
                log.error(err);
            console.log(testUser);
            res.json(JSON.parse(file));
        })
    });
router.route('/posts')
    .post(function (req, res) {
        //add new post
        var post = new Post({
            img_path: req.body.img_path,
            msg_text: req.body.msg_text,
            location: req.body.location,
            posted_by: testUser._id,
            comments: [{
                text: "Norm",
                posted_by: testUser._id
            }, {
                text: "5 like",
                posted_by: testUser._id
            }]
        });
        post.save(function (err) {
            if (!err) {
                Post.find({})
                    .populate('posted_by')
                    .populate('comments.posted_by')
                    .exec(function (err, posts) {
                        if (err)
                            log.error(err);
                        res.json(posts);
                    })
            }
        });
    })
    .get(function (req, res) {
        Post.find({})
            .limit(15)//per page
            .skip(15 * req.query.page) //page number
            .populate('posted_by')
            .populate('comments.posted_by')
            .exec(function (err, posts) {
                if (err)
                    log.error(err);
                res.json(posts);
            })
    });

router.route('/media')
    .post(function (req, res) {
        res.send({path: 'placehold.it/350x150'}); //todo
    });

router.route('/posts/:post_id')
    .get(function (req, res) {
        var post_id = req.params.post_id;
        Post.findOne({ '_id' : post_id})
            .populate('posted_by')
            .populate('comments.posted_by')
            .exec(function (err, post) {
                if (err)
                    log.error(err);
                res.json(post);
            })
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