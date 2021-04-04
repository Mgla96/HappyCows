var db = require("../../models/index");
var paging = require("../../utils/pagination");
var paging_raw = require("../../utils/pagination_raw")
const { Sequelize, QueryTypes } = require('sequelize');
const uuid = require('uuid/v4'); // ES5

db.Users.sync();
db.Cows.sync();
db.UserCommons.sync();
db.UserWealths.sync();

function update_self(firstName, lastName) {
	let currentRes = res.locals.user;
	currentRes.firstName = firstName;
	currentRes.lastName = lastName;
	currentRes.save();
	return true;
}

async function get_user_wealth(cid, uid) {
	let result = await db.sequelize.query(
		'SELECT SUM(uw.wealth) ' +
		`FROM UserWealths AS uw `+
		'WHERE uw.UserId = ?' +
		' AND uw.CommonId = ?' ,
		{
			type: QueryTypes.SELECT,
			replacements: [uid, cid]
		}).then((dbRes) => {
			var key = Object.keys(dbRes[0]);
			return dbRes[0][key];
		});
		if(result == null){
			return -1;
		}
		else{
			return result;
		}
}

/*
average health of all user's cows rounded to nearest integer
*/
async function get_user_cow_health(cid,uid){
	let result = await db.sequelize.query(
		'SELECT AVG(c.health) ' +
		`FROM Cows AS c `+
		'WHERE c.UserId = ?'+
		' AND c.CommonId = ?' ,
		{
			type: QueryTypes.SELECT,
			replacements: [uid, cid]
		}).then((dbRes) => {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			//console.log("avg cow health: " + parseInt(sol, 10).toFixed(2));
			if(sol==null){
				return 0;
			}
			else{
				return parseInt(sol, 10).toFixed(0);
			}		
		});
	return result;
}

//another table for user day wealth
//date, profit, user common ids
function get_user_day_profit(uid, cid, date) {
	db.UserWealth.findAll({
		attributes: ['wealth'],
		where: { id: uid, CommonId: cid, createdAt: date }
	}).then((dbRes) => {
		if (dbRes.length === 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}

async function buy_cow_transaction(cost, cid, uid) {
	var current_wealth = await get_user_wealth(cid,uid);
	var result = parseInt(current_wealth, 10)+parseInt(cost, 10); //cost is negative
			//console.log("cw+cost: "+ result); 
			costres = parseInt(cost, 10);
			if(result >= 0){
				var today = new Date();  
				let UserWealths = await db.UserWealths.build({
					wealth: costres,
					type:"buy",
					createdAt: today,
					updatedAt: today,
					CommonId: cid,
					UserId: uid
				})
				await UserWealths.save();
				let cows = await db.Cows.build({
					health: 100,
					status: "alive",
					CommonId: cid,
					UserId: uid,
				});
				await cows.save();
				//console.log("You have purchased cow!");
				return true;
			}
			else{
				//console.log("You do not have enough money to purchase another cow!");
				return false;
			}
}

/*
checks if user has 1 or more cows and if so sells cow and adds money to userwealth table for user
*/
async function sell_cow_transaction(cost, health, cid, uid) {
	var result = await get_cow_total(cid,uid);
	//var value = cost*(health/100); 
	if(result>0){
		var today = new Date(); 
		var cowId = await get_a_cow(cid,uid); 
		var cowHealth = await get_a_cow_health(cowId); 
		var value = cost*(cowHealth/100);
		await db.Cows.destroy({
			where: { id: cowId }
		})
		let UserWealths = await db.UserWealths.build({
			wealth: value,
			type: "sell",
			createdAt: today,
			updatedAt: today,
			CommonId: cid,
			UserId: uid
		})
		await UserWealths.save();
		//console.log("You have sold cow!");
		return true;
	}
	else{
		//console.log("No cows to sell!");
		return false;
	}

}


/*
Total cows of a current user in a commons
*/
async function get_cow_total(cId, uId) {
	let result = await  db.sequelize.query(
		'SELECT COUNT(c.id) ' +
		`FROM Cows AS c ` +
		'WHERE c.UserId = ?' +
		' AND c.CommonId = ?',
		{
			type: QueryTypes.SELECT,
			replacements: [uId, cId]
		}).then((dbRes) => {
		var key = Object.keys(dbRes[0]);
		var sol = dbRes[0][key];
		//console.log("total cows: " + sol);
		if (sol == null) {
			return 0;
		} else {
			return sol;
		}
	});
	return result;
}

/*
get id and name of every commons
*/
async function get_all_commons(req) {
	let result = await db.sequelize.query(
		'SELECT c.id, c.name FROM Commons AS c',
		{
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			return dbRes;
		});
	return result
}

async function get_user_commons(req, userId) {
	let result = await db.sequelize.query(
		'SELECT c.id, c.name ' +
		'FROM Commons c ' +
		'WHERE c.id IN ' +
		'(SELECT uc.CommonId ' +
		'FROM UserCommons uc ' +
		'WHERE uc.UserID = ?);',
		{
			replacements: [
				userId
			],
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			return dbRes;
		});
	return result;
}

async function get_cow_common_price(cid, uid){
	return await db.Configs.findAll({
		raw: true,
		attributes: ['cowPrice'],
		where: { CommonId: cid}
	}).then(function(dbRes) {
		if (dbRes.length === 0) {
			return false, null
		}
		else {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			return sol
		}
	})
}
/*
buy cow so add cow to table and subtract wealth of user
*/
async function user_buy_cow(cid, uid) {
	let res = await db.Configs.findAll({
		raw: true,
		attributes: ['cowPrice'],
		where: { CommonId: cid}
	}).then((dbRes) => {
		if (dbRes.length === 0) {
			return false, null
		}
		else {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			sol = ~sol + 1; //bitwise to get negative value
			return sol;
		}
	})
	await buy_cow_transaction(res,cid,uid);
}

async function get_a_cow(cid,uid){ //
	let result = await db.sequelize.query(
		'SELECT c.id ' +
		'FROM Cows c ' +
		'WHERE c.CommonId = ? '+
		' AND c.UserId = ?',
		{
			replacements: [cid, uid],
			raw: true,
			type: QueryTypes.SELECT
		}).then(function(dbRes) {
			if (dbRes.length == 0) {
				//console.log("errrrrr");
				return null;
			} else {
				var key = Object.keys(dbRes[0]);
				var sol = dbRes[0][key];
				//console.log("get a cow id: " + sol);
				return sol;
			}
		});
	return result;
}
async function get_a_cow_health(cowid){ //
	let result = await db.sequelize.query(
		'SELECT c.health ' +
		'FROM Cows c ' +
		'WHERE c.id = ? ',
		{
			replacements: [cowid],
			raw: true,
			type: QueryTypes.SELECT
		}).then(function(dbRes) {
			if (dbRes.length == 0) {
				//console.log("errrrrr");
				return null;
			} else {
				var key = Object.keys(dbRes[0]);
				var sol = dbRes[0][key];
				return sol;
			}
		});
	return result;
}

async function user_sell_cow(cid, uid) { //Wants this to be actual health
	let res = await db.Configs.findAll({
		raw: true,
		attributes: ['cowPrice'],
		where: { CommonId: cid}
	}).then((dbRes) => {
		if (dbRes.length === 0) {
			return false, null
		}
		else {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			return sol;
		}
	})
	var cowHealth = await get_a_cow_health(cid,uid); //make this round cow health?
	await sell_cow_transaction(res,cowHealth,cid,uid);
}


/*
Places user in selected common and gives them a starting wealth
for that common
*/
async function join_common(cid, uid, log) {
	let UserCommons = db.UserCommons.build({
		log: log,
		CommonId: cid,
		UserId: uid,
	})
	await UserCommons.save();
	
	var today = new Date();  

	let UserWealths = db.UserWealths.build({
		wealth: 1000,
		type: "initial",
		createdAt: today,
		updatedAt: today,
		CommonId: cid,
		UserId: uid
	})
	await UserWealths.save();
	return true;
}


async function get_common_day(cid) {
	let start = await db.Configs.findAll({
		raw: true,
		attributes: ['startDate'],
		where: { CommonId: cid}
	}).then((dbRes) => {
		if (dbRes.length === 0) {
			return null;
		}
		else {
			var key = Object.keys(dbRes[0]);
			return dbRes[0][key];
		}
	})
	var today = new Date(); 
	// To calculate the time difference of two dates 
	var Difference_In_Time = today.getTime() - start.getTime(); 
	// To calculate the no. of days between two dates 
	var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
	return Math.ceil(Difference_In_Days);
}

async function get_start_date(cid) {
	let result = await db.sequelize.query(
		'SELECT c.startDate ' +
		`FROM Configs AS c `+
		'WHERE c.CommonId = ?',
		{
			replacements: [cid],
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			if(sol==null){
				return 0;
			}
			else{
				return sol;
			}		
		});
	return result;
}

async function get_end_date(cid) {
	let result =  await db.sequelize.query(
		'SELECT c.endDate ' +
		`FROM Configs AS c `+
		'WHERE c.CommonId = ?',
		{
			replacements: [cid],
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			if(sol==null){
				return 0;
			}
			else{
				var month = sol.getUTCMonth() + 1;
				return month + "/" + sol.getUTCDate() + "/" + sol.getUTCFullYear();
			}		
		});
	return result;

}
// LIMIT 5 removed from query to show all milkings
async function get_all_milkings(req,cid,uid) {
	let result =  await db.sequelize.query(
		'SELECT SUM(sol.wealth), MONTH(sol.createdAt), DAY(sol.createdAt), YEAR(sol.createdAt) FROM '+
		'( SELECT uw.wealth, uw.createdAt ' +
		'FROM UserWealths AS uw '+
		'WHERE uw.CommonId = ?'+
		' AND uw.UserId = ?'+
		' AND type = "milk" )'+
		' AS sol GROUP BY YEAR(sol.createdAt), MONTH(sol.createdAt), DAY(sol.createdAt)',
		{
			replacements: [
				cid,uid, ...paging_raw(req)
			],
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			if (dbRes.length >= 1) {
				return dbRes
			}
			else {
				return dbRes;
			}
			
		});
	return result;
}

/*
async function get_all_milkings(req,cid,uid) {
	let result =  await db.sequelize.query(
		'SELECT uw.wealth, uw.createdAt ' +
		'FROM UserWealths AS uw '+
		'WHERE uw.CommonId = ?'+
		' AND uw.UserId = ?'+
		' AND type = "milk"',
		{
			replacements: [
				cid,uid, ...paging_raw(req)
			],
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			if (dbRes.length >= 1) {
				return dbRes
			}
			else {
				return dbRes;
			}
			
		});
	return result;
}
*/
async function get_user_total(cid) {
	let result =  await db.sequelize.query(
		'SELECT COUNT(c.UserId) ' +
		`FROM UserCommons AS c `+
		'WHERE c.CommonId = ?',
		{
			replacements: [cid],
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			if(sol==null){
				return 0;
			}
			else{
				return sol;
			}		
		});
	return result;
}

/*
async function get_wealth_ranking(cid) {
	let result = await db.sequelize.query(
		'SELECT SUM(uw.wealth) ' +
		`FROM UserWealths AS uw `+
		'WHERE uw.UserId = ' + uid +
		' AND uw.CommonId = ' + cid  ,
		{
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			//console.log(dbRes);
			var key = Object.keys(dbRes[0]);
			//console.log(Object.keys(dbRes[0]));
			//console.log(dbRes[0][key]);
			return dbRes[0][key];
		});
		if(result == null){
			return -1;
		}
		else{
			//console.log(result);
			return result;
		}
}
*/


/*
function get_user_commons(req)
*/

module.exports = {
	get_all_commons,
	get_user_commons,
	user_buy_cow,
	user_sell_cow,
	join_common,
	get_cow_total,
	get_user_wealth,
	buy_cow_transaction,
	sell_cow_transaction,
	get_cow_common_price,
	get_user_cow_health,
	get_common_day,
	get_end_date,
	get_all_milkings,
	get_user_total
}

