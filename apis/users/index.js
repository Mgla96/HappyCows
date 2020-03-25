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
	return true
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
					wealth: -110,
					createdAt: today,
					updatedAt: today,
					CommonId: cid,
					UserId: uid
				})
				//await UserWealths.save();
				console.log(UserWealths);
				console.log("You have purchased cow!");
				return true;
			}
			else{
				console.log("You do not have enough money to purchase another cow!");
				return false;
			}
		})
		//await UserWealths.save();
		
}



/*
-remove cow from user
-get cow price (from config table) w 
and maybe selling a cow is 70% of that or so?
in future we can add this option in commons config
-add to user's wealth 
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
			return dbRes;
			/*
			console.log(dbRes);
			var key = Object.keys(dbRes)[0];
			//value = dbRes[key];
			//console.log(value);
			console.log(key);

			if(dbRes == null){
				return 0;
			}
			else{
				//return key;
				return 2;
			}
			*/
		});
		if(result == null){
			return 0;
		}
		else{
			var key = Object.keys(result)[0];
			return result[key];


		}
	//function to get current user id as uId
	/*
	db.Cows.findAll({
		attributes: {
			include: [
				[sequelize.fn('COUNT', sequelize.col('id')), 'n_cows']
			]
		},
		where: { CommonId: cId, UserId: uId }
	}).then((dbRes) => {
		if (dbRes.length == 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
	*/
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

/*
buy cow so add cow to table and subtract wealth of user
*/
async function user_buy_cow(cid, uid) {
	let cows = db.Cows.build({
		health: 100,
		status: "available",
		CommonId: cid,
		UserId: uid,
	});

	await cows.save();
	
	console.log(cows);
	console.log("id");
	console.log(cows.id);

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
			//console.log(key);
			//console.log(Object.keys(dbRes[0]));
			var sol = dbRes[0][key];
			//bitwise to get negative value
			sol = ~sol + 1;
			console.log("sol " + sol);
			console.log("uid: " + uid);
			buy_cow_transaction(sol,cid,uid);
		}
	})
	/*
	console.log(val);
	if(val!=null){
		db.UserWealths.build({
			wealth: val,
			CommonId: cid,
			UserId: uid,
		})
	}
	*/
}

async function user_sell_cow(cid, uid) {
	let cows = db.Cows.build({
		health: 100,
		status: "available",
		CommonId: cid,
		uid: uid,
	});

	await cows.save();
	
	console.log(cows);
	console.log("id");
	console.log(cows.id);

	db.Configs.findAll({
		raw: true,
		attributes: ['cowPrice'],
		where: { CommonId: cid}
	}).then((dbRes) => {
		if (dbRes.length == 0) {
			return false, null
		}
		else {
			//console.log(dbRes);
			var key = Object.keys(dbRes[0]);
			//console.log(key);
			//console.log(Object.keys(dbRes[0]));
			var sol = dbRes[0][key];
			console.log(sol);
			buy_cow_transaction(sol,cid,uid);
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
	buy_cow_transaction
}

