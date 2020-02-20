var express = require('express');
var router = express.Router();
var {get_link, auth} = require('../apis/users/auth');

var auth_get = require("../views/auth_get");
var auth_callback_all = require("../views/auth_callback_all");

router.get('/auth', auth_get);
router.all('/auth_callback', auth_callback_all);

module.exports = router;
