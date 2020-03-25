var express = require('express');
var router = express.Router();
const main = require("../views/main")

const user_cow_post = require('../views/user_cow_post');
const user_sell_cow_post = require('../views/user_sell_cow_post');

const commonschoice = require("../views/user_choose_commons")
const notapage = require("../views/error")
const commonsjoin = require("../views/user_common_join_post")
const commonsenter = require("../views/user_common_enter")
let {auth_middleware} = require("../utils/auth")

/* GET home page. */
router.get('/', auth_middleware, main);


//router.get('/', auth_middleware, main);
router.get('/choosecommons', auth_middleware, commonschoice); //user choosing commons
router.post('/choosecommons/:join', auth_middleware, commonsjoin); //user joining common (posting to db)
router.post('/play', auth_middleware, commonsenter);
router.post('/:sellcow', auth_middleware, user_sell_cow_post);
router.post('/:buycow', auth_middleware, user_cow_post);



/* custom page when no page exists not working correctly - for future implementation */
router.get('/?err',auth_middleware, notapage);

module.exports = router;
