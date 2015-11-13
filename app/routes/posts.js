/**
 * Created by vbaimurzin on 03.11.2015.
 */
var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var log = require('../libs/log')(module);

router.route('/')
    .post(function (req, res) {
        //TODO: fix comments
        var post = new Post({
            img_path: req.body.img_path,
            msg_text: req.body.msg_text,
            location: req.body.location,
            posted_by: '5637cfef7d61c964232c6372',
            comments: [{
                text: "Norm",
                posted_by: '5637cfef7d61c964232c6372'
            }, {
                text: "5 like",
                posted_by: '5637cfef7d61c964232c6372'
            }]
        });
        post.save(function (err) {
            if (!err) {
                res.status(201).json();
            } else {
                res.status(500).json(res)
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
                    res.status(500).json(err);
                res.status(200).json(posts);
            })
    });
router.route('/:post_id')
    .get(function (req, res) {
        var post_id = req.params.post_id;
        Post.findOne({ '_id' : post_id})
            .populate('posted_by')
            .populate('comments.posted_by')
            .exec(function (err, post) {
                if (err)
                    res.status(500).json(err);
                res.status(200).json(post);
            })
    })
    .put(function (req, res) {
        var post_id = req.params.post_id;
        Post.findOne({ '_id' : post_id})
            .exec(function (err, post) {
                if (err) {
                    res.status(500).json(err);
                }
                post.views += 1;
                post.save(function (err) {
                    if (err)
                        res.status(500).json(err);
                    res.status(200).end();
                })
            })
    });

module.exports = router;