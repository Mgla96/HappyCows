var express = require('express');
var router = express.Router();
const main = require("../views/main")

const user_cow_post = require('../views/user_cow_post');
const commonschoice = require("../views/user_choose_commons")
const notapage = require("../views/error")
const commonsjoin = require("../views/user_common_join_post")
let {auth_middleware} = require("../utils/auth")

/* GET home page. */
router.get('/', auth_middleware, main);
router.post('//:common', auth_middleware, user_cow_post);
//router.get('/', auth_middleware, main);
router.get('/choosecommons', auth_middleware, commonschoice); //user choosing commons
router.post('/choosecommons/:join', auth_middleware, commonsjoin); //user joining common (posting to db)

/* custom page when no page exists not working correctly - for future implementation */
//router.get('*',auth_middleware, notapage);

module.exports = router;
