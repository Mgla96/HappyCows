var express = require('express');
var router = express.Router();
var {get_link, auth} = require('../apis/users/auth');
let {auth_middleware, admin_middleware} = require("../utils/auth")
/* GET users listing. */
router.get('/auth/get_link', function(req, res, next) {
  get_link(req, res)
});

router.post('/auth', function(req, res, next) {
  auth(req, res)
});

router.get('/middleware_test', auth_middleware, function(req, res, next) {
  res.json({
    data: res.locals.user // user object
  })
});

module.exports = router;
