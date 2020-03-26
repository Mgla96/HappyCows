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

//need commons id and user id
function get_user_wealth(cId, uId) {
	result = db.sequelize.query(
		'SELECT SUM(uw.wealth) ' +
		`FROM UserWealths AS uw `+
		'WHERE uw.UserId = ' + uId +
		' AND uw.CommonId = ' + cId  ,
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
			console.log(result);
			return result;
		}
}

/*
average health of all user's cows rounded to nearest integer
*/
async function get_user_cow_health(cid,uid){
	result = await db.sequelize.query(
		'SELECT AVG(c.health) ' +
		`FROM Cows AS c `+
		'WHERE c.UserId = ' + uid +
		' AND c.CommonId = ' + cid  ,
		{
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			console.log("avg cow health: " + parseInt(sol, 10).toFixed(2));
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
function get_user_day_profit(uId, cId, date) {
	db.UserWealth.findAll({
		attributes: ['wealth'],
		where: { id: uId, CommonId: cId, createdAt: date }
	}).then((dbRes) => {
		if (dbRes.length == 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}


function buy_cow(cowId, commonId, uId) {
	db.Cows.findAll({
		where: { id: cowId }
	}).then((dbRes) => {
		if (dbRes.length == 1) {
			dbRes[0].CommonId = commonId;
			dbRes[0].UserId = uId;
			dbRes[0].save();
			return true;
		}
		else {
			return false;
		}
	})
}


async function buy_cow_transaction(cost, cid, uid) {
	await db.sequelize.query(
		'SELECT SUM(uw.wealth) ' +
		`FROM UserWealths AS uw `+
		'WHERE uw.UserId = ' + uid +
		' AND uw.CommonId = ' + cid  ,
		{
			raw: true,
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			var key = Object.keys(dbRes[0]);
			var current_wealth = dbRes[0][key];
			console.log("current_wealth: " +current_wealth);
			console.log("cost: " + cost);
			var result = parseInt(current_wealth, 10)+parseInt(cost, 10);
			console.log("cw+cost: "+ result);
			costres = parseInt(cost, 10);
			//wealth: parseInt(cost,10),
			if(result >= 0){
				var today = new Date();  
				let UserWealths = db.UserWealths.build({
					wealth: costres,
					createdAt: today,
					updatedAt: today,
					CommonId: cid,
					UserId: uid
				})
				UserWealths.save();
				console.log("UserWealths" + UserWealths);
				console.log("You have purchased cow!");
				return true;
			}
			else{
				console.log("You do not have enough money to purchase another cow!");
				return false;
			}
		})
}
/*
checks if user has 1 or more cows and if so sells cow and adds money to userwealth table for user
*/
async function sell_cow_transaction(cost, health, cid, uid) {
	var result = await get_cow_total(cid,uid);
	console.log("result: " + result);
	var value = cost*(health/100);
	if(result>0){
		var today = new Date();  
		let UserWealths = db.UserWealths.build({
			wealth: value,
			createdAt: today,
			updatedAt: today,
			CommonId: cid,
			UserId: uid
		})
		UserWealths.save();
		console.log("You have sold cow!");
		return true;
	}
	else{
		console.log("No cows to sell!");
		return false;
	}

}



/*
-remove cow from user
-get cow price (from config table) w 
and maybe selling a cow is 70% of that or so?
in future we can add this option in commons config
-add to user's wealth 

--OUTDATED
*/
function sell_cow(cowId, cId, uId) {
	db.Cows.destroy({
		where: { id: cowId }
	})
	db.UserWealth.findAll({
		where: { CommonId: cId, UserId: uId }
	}).then((dbRes) => {
		if (dbRes.length == 1) {
			dbRes[0].wealth += (.7 * 20); //whatever % of cow price will be (will have to call get cowprice function)
			dbRes[0].save();
			return true;
		}
		else {
			return false;
		}
	})
}

/*
Total cows of a current user in a commons
*/
function get_cow_total(cId, uId) {
	result = db.sequelize.query(
		'SELECT COUNT(c.id) ' +
		`FROM Cows AS c `+
		'WHERE c.UserId = ' + uId +
		' AND c.CommonId = ' + cId  ,
		{

			type: QueryTypes.SELECT
		}).then((dbRes) => {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			console.log("total cows: " + sol);
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
get id and name of every commons
*/
function get_all_commons(req) {
	return db.sequelize.query(
		'SELECT c.id, c.name ' +
		`FROM Commons AS c`,
		{
			replacements: [
				...paging_raw(req)
			],
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			return dbRes;
		});
}

function get_user_commons(req, userId) {
	return db.sequelize.query(
		'SELECT c.id, c.name ' +
		'FROM Commons c ' +
		'WHERE c.id IN ' +
		'(SELECT uc.CommonId ' +
		'FROM UserCommons uc ' +
		'WHERE uc.UserID = ' +
		userId + ');',
		{
			replacements: [
				...paging_raw(req)
			],
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			return dbRes;
		});
}

async function get_cow_common_price(cid, uid){
	return await db.Configs.findAll({
		raw: true,
		attributes: ['cowPrice'],
		where: { CommonId: cid}
	}).then(function(dbRes) {
		if (dbRes.length == 0) {
			return false, null
		}
		else {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			console.log("cow Price: " + sol);
			return sol
		}
	})
}
/*
buy cow so add cow to table and subtract wealth of user
*/
async function user_buy_cow(cid, uid) {
	let cows = db.Cows.build({
		health: 100,
		status: "alive",
		CommonId: cid,
		UserId: uid,
	});

	await cows.save();

	await db.Configs.findAll({
		raw: true,
		attributes: ['cowPrice'],
		where: { CommonId: cid}
	}).then((dbRes) => {
		if (dbRes.length == 0) {
			return false, null
		}
		else {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			//bitwise to get negative value
			sol = ~sol + 1;
			console.log("sol " + sol);
			console.log("uid: " + uid);
			buy_cow_transaction(sol,cid,uid);
		}
	})
}

async function get_a_cow(cid,uid){
	return await db.sequelize.query(
		'SELECT c.id ' +
		'FROM Cows c ' +
		'WHERE c.CommonId = ' + cid +
		' AND c.UserId = ' + uid,
		{
			raw: true,
			type: QueryTypes.SELECT
		}).then(function(dbRes) {
			if (dbRes.length == 0) {
				console.log("errrrrr");
			} else {
				var key = Object.keys(dbRes[0]);
				var sol = dbRes[0][key];
				console.log("get a cow id: " + sol);
				return sol;
			}
		})
}

async function user_sell_cow(cid, uid) {
	var cowId = await get_a_cow(cid,uid);
	let cows = await db.Cows.destroy({
		where: { id: cowId }
	})
	db.Configs.findAll({
		raw: true,
		attributes: ['cowPrice'],
		where: { CommonId: cid}
	}).then((dbRes) => {
		if (dbRes.length == 0) {
			return false, null
		}
		else {
			var key = Object.keys(dbRes[0]);
			var sol = dbRes[0][key];
			sell_cow_transaction(sol,70,cid,uid);
			
		}
	})
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
		createdAt: today,
		updatedAt: today,
		CommonId: cid,
		UserId: uid
	})

	await UserWealths.save();
	return true;
}


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
	get_user_cow_health
}

