var db = require("../../models/index")
var paging = require("../../utils/pagination");
var paging_raw = require("../../utils/pagination_raw")
var {get_wealth, get_cows} = require("../../utils/sql")
const { QueryTypes } = require('sequelize');
db.UserWealths.sync();
db.UserCommons.sync();

/**
 * GET 
 * Description: Get the wealth of a user with the user id and the commons id as arguments
 *  
 * 
**/
function get_users_in_common(req, commonId){
	return db.sequelize.query(
		'SELECT u.id, u.firstName, u.lastName, u.email, u.type, ' +
		`(${get_wealth} u.id AND CommonId = ?) AS wealth, ` +
		`(${get_cows} u.id AND CommonId = ?) AS cows ` +
		'FROM UserCommons AS uc JOIN Users AS u ON u.id = uc.UserId  WHERE uc.CommonId = ? ' +
		'LIMIT ?, ?',
		{
			replacements: [
				commonId,commonId,commonId, ...paging_raw(req)
			],
			type: QueryTypes.SELECT
		}).then((dbRes)=>{
		return dbRes;
	});
}

function get_user_wealth(uId, cId){
	db.UserWealths.findAll({
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
	db.UserWealths.findAll({
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

async function remove_user_from_common(cid, uid){
	return await db.UserCommons.destroy({
		where: { CommonId: cid, UserId: uid }
	})
}




module.exports = {get_users_in_common, remove_user_from_common}
