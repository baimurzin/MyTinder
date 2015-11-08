/**
 * Created by vlad on 07.11.2015.
 */
var config = require('../config/config');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/User');
var VkStrategy = require('passport-vkontakte').Strategy;
var options = config.get('auth');

passport.use(new VkStrategy(
    options.vkontakte,
    function (accessToken, refreshToken, profile, done) {
        User.findOne({
            vkontakteId: profile.id
        }, function (err, user) {
            if (err)
                done(err);
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    vkontakteId: profile.id,
                    access_token: accessToken
                });
                user.save(function (err) {
                    if (err) console.log(err);
                    return done(err, user);
                })
            } else {
                return done(err, user);
            }

        })
    }
));

passport.use(new BearerStrategy(
    function (token, done) {
        User.findOne({access_token: token},
            function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user, {scope: 'all'});
            }
        )
    }
));
module.exports = passport;