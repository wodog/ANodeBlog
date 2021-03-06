var express = require('express');
var router = express.Router();
var async = require('async');
var dbHelper = require('../db/dbHelper');

/* GET users listing. */
router.get('/:username', function (req, res, next) {
    var username = req.params.username;
    var User = dbHelper.User;
    var Article = dbHelper.Article;
    async.waterfall([
        function (callback) {
            User.findOne({username: username}).exec(function (err, user) {
                callback(null, user);
            });
        },
        function (user, callback) {
            if (user) {
                Article.find({_user: user.id}).populate('_user').exec(function (err, articles) {
                    callback(null, articles, user);
                });
            } else {
                callback(null, null);
            }
        }
    ], function (err, articles, user) {
        res.render('my', {
            articles: articles,
            user: user,
            menu: 'my'
        });
    });
});

module.exports = router;
