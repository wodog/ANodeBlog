/**
 * Created by gefan on 2016/1/18.
 */
var express = require('express');
var webHelper = require('../lib/webHelper');
var config = require('../config');

var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('dashboard/index', {menu: 'index',layout: 'dashboard'});
});



module.exports = router;