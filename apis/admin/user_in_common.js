var db = require("../../models/index");
db.UserWealths.sync();

/**
 * GET 
 * Description: Get the wealth of a user with the user id and the commons id as arguments
 *  
 * 
**/
function get_user_wealth(uId, cId){
	db.UserWealth.findAll({
		attributes: ['wealth'],
		where: {id: uId, CommonId: cId}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}