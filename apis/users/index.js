var db = require("../../models/index");
var paging = require("../../utils/pagination");
var paging_raw = require("../../utils/pagination_raw")
const { QueryTypes } = require('sequelize');

db.Users.sync();
db.Cows.sync();
db.UserCommons.sync();

function update_self(firstName, lastName) {
	let currentRes = res.locals.user;
	currentRes.firstName = firstName;
	currentRes.lastName = lastName;
	currentRes.save();
	return true
}

//need user id and commons id
function get_user_wealth(uId, cId) {
	db.UserWealth.findAll({
		attributes: [models.sequelize.fn('sum', models.sequelize.col('wealth'))],
		where: { id: uId, CommonId: cId }
	}).then((dbRes) => {
		if (dbRes.length == 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
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
	//function to get current user id as uId
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
async function user_buy_cow(health, status, cId, uId) {
	let cows = db.Cows.build({
		health: health,
		status: status,
		CommonId: cId,
		uId: uId,
	});
	await common.save();
	let cowPrice = db.Configs.findAll({
		attributes: ['cowPrice'],
		where: { CommonId: commonId }
	}).then((dbRes) => {
		if (dbRes.length == 0) {
			return false, null
		}
		else {
			db.UserWealths.build({
				wealth: dbRes,
				CommonId: cId,
				UserId: cId,
				uId: uId,
			})
			//return true, dbRes
		}
	})
}


/*
let currentRes = res.locals.user;
*/

async function join_common(cid, uid, log) {
	let UserCommons = db.UserCommons.build({
		log: log,
		CommonId: cid,
		UserId: uid,
	});
	await UserCommons.save();
	
	return true;
}


/*
function get_user_commons(req)
*/

module.exports = {
	get_all_commons,
	get_user_commons,
	user_buy_cow,
	join_common
}

