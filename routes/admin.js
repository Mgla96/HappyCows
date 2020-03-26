var express = require('express');
var router = express.Router();
var admin_common_get = require('../views/admin_common_get');
var admin_common_post = require('../views/admin_common_post');
var admin_get = require('../views/admin_get');

var admin_cost_update =  require('../views/admin_cost_cow_post');
var admin_degradation_update =  require('../views/admin_degradation_post');
var admin_max_cow_update =  require('../views/admin_max_cow_post');
var admin_taxes_update =  require('../views/admin_taxes_post');
var admin_remove_player =  require('../views/admin_remove_player_post');

let {auth_middleware} = require("../utils/auth");

router.get('/', auth_middleware, admin_get);
router.get('/common/:commonId', auth_middleware, admin_common_get);
router.post('/common', auth_middleware, admin_common_post);

router.post('/cow_cost_update', auth_middleware, admin_cost_update);
router.post('/degradation_update', auth_middleware, admin_degradation_update);
router.post('/max_cow_update', auth_middleware, admin_max_cow_update);
router.post('/taxes_update', auth_middleware, admin_taxes_update);
router.post('/remove_player', auth_middleware, admin_remove_player);

module.exports = router;
