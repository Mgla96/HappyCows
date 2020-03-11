var express = require('express');
var router = express.Router();

const main = require("../views/main")
const commonschoice = require("../views/user_choose_commons")
//const commonsjoin = require("../views/user_common_join")
let {auth_middleware} = require("../utils/auth")

/* GET home page. */
router.get('/', auth_middleware, main);
router.get('/choosecommons', auth_middleware, commonschoice); //user choosing commons
module.exports = router;
