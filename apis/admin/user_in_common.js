var db = require("../../models/index");
db.UserWealth.sync();

/**
 * GET 
 * Description: Get the wealth of a user with the user id and the commons id as arguments
 *  
 * 
**/
function place_user_in_common(uId, cId){
	db.UserCommons.build({
		//uId: health,
	}).save()
	return true;
}

function get_user_wealth(uId, cId){
	db.UserWealth.findAll({
		attributes: [models.sequelize.fn('sum', models.sequelize.col('wealth'))],
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

function get_user_day_profit(uId, cId, date){
	db.UserWealth.findAll({
		attributes: ['wealth'],
		where: {id: uId, CommonId: cId, createdAt:date}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}