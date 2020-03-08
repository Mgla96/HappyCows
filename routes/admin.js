var express = require('express');
var router = express.Router();
var admin_common_get = require('../views/admin_common_get');
var admin_common_post = require('../views/admin_common_post');
var admin_get = require('../views/admin_get');
router.get('/', admin_get);
router.get('/common', admin_common_get);
router.post('/common', admin_common_post);

module.exports = router;
