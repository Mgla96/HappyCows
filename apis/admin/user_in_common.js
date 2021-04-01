var db = require("../../models/index")
var paging = require("../../utils/pagination");
var paging_raw = require("../../utils/pagination_raw")
var {get_wealth, get_cows} = require("../../utils/sql")

const { QueryTypes } = require('sequelize');
db.UserWealths.sync();
db.UserCommons.sync();
db.Commons.sync();
db.Cows.sync();
db.TieredTaxings.sync();
db.Configs.sync();

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

/*
would actually need to sum this
*/
function get_user_day_profit(uid, cid, date){
	db.UserWealths.findAll({
		attributes: ['wealth'],
		where: {id: uid, CommonId: cid, createdAt:date}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}

/*
also want to delete all game state of player including wealth, cows, etc
*/
async function remove_user_from_common(cid, uid){
	//delete cows with common id and user id
	//delete user wealths with CommonId and UserId
	await db.Cows.destroy({
		where: {CommonId: cid, UserId: uid}
	})
	await db.UserWealths.destroy({
		where: {CommonId: cid, UserId: uid}
	})
	return await db.UserCommons.destroy({
		where: { CommonId: cid, UserId: uid }
	})
}

/*
also want to delete all game state of player including wealth, cows, etc
*/

async function get_conf_id2(cid){
	return await db.Configs.findAll({
		attributes: ['id'],
		where: { CommonId: cid }
	  }).then((dbRes)=>{
		if (dbRes.length == 1){
		  let currentRes = dbRes[0];
		  return currentRes.id;
		} else {
		  return false
		}
	  })
}
async function remove_common(cid){
	let confId = await get_conf_id2(cid);
	await db.TieredTaxings.destroy({ //double check assuming config id same as common id
		where: { ConfigId: confId}
	})
	await db.Cows.destroy({ 
		where: {CommonId: cid}
	})
	await db.UserWealths.destroy({ 
		where: {CommonId: cid}
	})
	await db.UserCommons.destroy({  
		where: { CommonId: cid}
	})
	await db.Configs.destroy({ 
		where: { CommonId: cid}
	})
	return await db.Commons.destroy({ 
		where: { id: cid}
	}).then((dbRes)=>{
		if (dbRes.length > 0){
			let currentRes = dbRes[0];
			return currentRes.id;
		  } else {
			return false
		  }
	})
}




module.exports = {get_users_in_common, remove_user_from_common, remove_common}
