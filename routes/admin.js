var express = require('express');
var router = express.Router();
var admin_get = require('../views/admin_get');

router.get('/common', admin_get);

module.exports = router;
