var express = require('express');
var router = express.Router();
var admin_common_get = require('../views/admin_common_get');
var admin_common_post = require('../views/admin_common_post');
var admin_get = require('../views/admin_get');
let {auth_middleware} = require("../utils/auth");

router.get('/', auth_middleware, admin_get);
router.get('/common/:commonId', auth_middleware, admin_common_get);
router.post('/common', auth_middleware, admin_common_post);

module.exports = router;
