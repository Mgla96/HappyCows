var express = require('express');
var router = express.Router();
const main = require("../views/main")
let {auth_middleware} = require("../utils/auth")

/* GET home page. */
router.get('/', auth_middleware, main);

module.exports = router;
