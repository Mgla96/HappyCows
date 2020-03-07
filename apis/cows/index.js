var db = require("../../models/index");
db.Cows.sync();

/**
 * get_cow in admin cows returns health
 * in future only show cow health of cows from current user
 * but for now can just show cow health of requested cow
 **/
function get_cow_health(cowId) {
	db.Cows.findAll({
		attributes: ['health'],
		where: {id: cowId}
	}).then((dbRes)=>{
		if (dbRes.length === 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}
