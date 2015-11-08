/**
 * Created by vbaimurzin on 03.11.2015.
 */

var express = require('express');
var router = express.Router();
var passport = require('../auth/auth');
var log = require('../libs/log')(module);

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));
router.use('/media', require('./media'));
router.use('/test', require('./test'));

router.get('/auth/vkontakte',
    passport.authenticate('vkontakte', {session: false, scope: [], display: 'mobile'}),
    function (req, res) {
        // ...
    });

router.get('/auth/vkontakte/callback',
    passport.authenticate('vkontakte', {session: false, failureRedirect: '/login'}),
    function (req, res) {
        log.info("auth");
        // Successful authentication, redirect home.
        res.redirect("/api/profile?access_token=" + req.user.access_token);
    });

router.get('/profile',
passport.authenticate('bearer', {session:false}),
    function (req, res) {
        log.info("auth",req.user.access_token);
        res.status(200).json(req.user);
    });

router.get('/', function (req, res) {
    res.status(200).json({msg: "api is running", status: "ok"});
});

module.exports = router;