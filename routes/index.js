var express = require('express');
var router = express.Router();

const main = require("../views/main")
const commonschoice = require("../views/user_choose_commons")
let {auth_middleware} = require("../utils/auth")

/* GET home page. */
router.get('/', auth_middleware, main);
router.get('/choosecommons', auth_middleware, commonschoice);
module.exports = router;
