var db = require("../../models/index");
const { QueryTypes } = require('sequelize');

db.Configs.sync();
db.TieredTaxings.sync();
db.Cows.sync();
/*
function cow_price(commonId){
    db.Configs.findAll({
		attributes: ['cowPrice'], 
		where: {CommonId: commonId}
	}).then((dbRes)=>{
		if (dbRes.length == 0) {
			return false, null
		}
		else {
			return true, dbRes
		}
	})
}
*/

async function milk_time(commonId){
    return await db.Configs.findAll({
		attributes: ['milkTime'], 
		where: {CommonId: commonId}
	}).then((dbRes)=>{
		if (dbRes.length == 0) {
			return false, null
		}
		else {
			return true, dbRes
		}
	})
}

/*
* Working on global_health 
*/
/*
function global_health(commonId){
	db.Cows.findAll({
        attributes: [commonId, [models.sequelize.fn('AVG', models.sequelize.col('health')),'healthAvg']], 
        group: [commonId],
        order: [[models.sequelize.fn('AVG', models.sequelize.col('health')), 'DESC']]
    }).then((dbRes)=>{
		if (dbRes.length == 0) {
			return false, null
		}
		else {
			return true, dbRes
		}
	})
}
*/

/*
get create date with configId
*/
function get_create_date(configId){ 
	db.Configs.findAll({
		attributes: ['startDate'],
		where: {id: configId}
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
get end date with configId
*/
function get_end_date(configId){
	db.Configs.findAll({
		attributes: ['endDate'],
		where: {id: configId}
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
get create date with commonId
*/
async function get_create_date_common(commonId){ 
	await db.Configs.findAll({
		attributes: ['startDate'],
		where: {CommonId: commonId}
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
get end date with commonId
*/
async function get_end_date_common(commonId){
	await db.Configs.findAll({
		attributes: ['endDate'],
		where: {CommonId: commonId}
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
get gen info with configId
*/
function get_gen_info_common(configId){
	db.Configs.findAll({
		attributes: ['milkTime','cowPrice','startDate','endDate'],
		where: {id: configId}
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
get gen info with commonID
*/
function get_gen_info(commonId){
	db.Configs.findAll({
		attributes: ['milkTime','cowPrice','startDate','endDate'],
		where: {CommonId: commonId}
	}).then((dbRes)=>{
		if (dbRes.length == 1) {
			return true, dbRes[0]
		}
		else {
			return false, null
		}
	})
}

async function max_cow_update(cid,sol){
	return await db.Configs.findAll({
		where: { CommonId: cid }
	  }).then((dbRes)=>{
		if (dbRes.length == 1){
		  let currentRes = dbRes[0];
		  currentRes.maxCowPerPerson = sol;
		  currentRes.save();
		} else {
		  return false
		}
	  })
}

async function cost_per_cow_update(cid,sol){
	//console.log("COSTPERCOW CALLED: cid:"+cid+" sol:" + sol +"\n\n");
	return await db.Configs.findAll({
		where: { CommonId: cid }
	  }).then((dbRes)=>{
		if (dbRes.length == 1){
		  let currentRes = dbRes[0];
		  currentRes.cowPrice = sol;
		  currentRes.save();
		} else {
		  return false
		}
	  })
}

async function milk_price_update(cid,sol){
	return await db.Configs.findAll({
		where: { CommonId: cid }
	  }).then((dbRes)=>{
		if (dbRes.length == 1){
		  let currentRes = dbRes[0];
		  currentRes.milkPrice = sol;
		  currentRes.save();
		} else {
		  return false
		}
	  })
}

async function degradation_rate_update(cid,sol){
	return await db.Configs.findAll({
		where: { CommonId: cid }
	  }).then((dbRes)=>{
		if (dbRes.length == 1){
		  let currentRes = dbRes[0];
		  currentRes.degradeRate = sol;
		  currentRes.save();
		} else {
		  return false
		}
	  })
}



async function get_conf_id(cid){
	console.log("cid: "+ cid);
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

async function tax_rate_update(cid,sol){
	let confId = await get_conf_id(cid);
	console.log("tax rate update confId: "+confId);
	return await db.TieredTaxings.findAll({
		where: { ConfigId: confId }
	  }).then((dbRes)=>{
		if (dbRes.length == 1){
		  let currentRes = dbRes[0];
		  currentRes.tax = sol;
		  currentRes.save();
		  return true;
		} else {
		  return false;
		}
	  })
}

async function get_tax_rate(cid) {
	let confId = await get_conf_id(cid);
	console.log("get tax rate confId: "+confId);
	return await db.sequelize.query(
		'SELECT d.tax ' +
		`FROM TieredTaxings AS d `+
		'WHERE d.ConfigId = ' + confId,
		{
			type: QueryTypes.SELECT
		}).then((dbRes) => {
			if (dbRes.length == 0) {
				return 0;
			}
			else {
				var key = Object.keys(dbRes[0]);
				var sol = dbRes[0][key];
				if(sol==null){
					return 0;
				}
				else{
					return sol;
				}			
			}
		});
}



async function get_cow_price(uid) {
	return await db.sequelize.query(
		'SELECT c.cowPrice ' +
		`FROM Configs AS c `+
		'WHERE c.CommonId = ' + uid,
		{
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
}

async function get_max_cow(uid) {
	return await db.sequelize.query(
		'SELECT c.maxCowPerPerson ' +
		`FROM Configs AS c `+
		'WHERE c.CommonId = ' + uid,
		{
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
}
async function get_degrade_rate(uid) {
	return await db.sequelize.query(
		'SELECT c.degradeRate ' +
		`FROM Configs AS c `+
		'WHERE c.CommonId = ' + uid,
		{
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
}
async function get_start_date(uid) {
	return await db.sequelize.query(
		'SELECT c.startDate ' +
		`FROM Configs AS c `+
		'WHERE c.CommonId = ' + uid,
		{
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
}
async function get_end_date(uid) {
	return await db.sequelize.query(
		'SELECT c.endDate ' +
		`FROM Configs AS c `+
		'WHERE c.CommonId = ' + uid,
		{
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
}
async function get_milk_price(uid) {
	return await db.sequelize.query(
		'SELECT c.milkPrice ' +
		`FROM Configs AS c `+
		'WHERE c.CommonId = ' + uid,
		{
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
}




module.exports = {
    max_cow_update,
	cost_per_cow_update,
	degradation_rate_update,
	get_conf_id,
	tax_rate_update,
	get_tax_rate,
	get_cow_price,
	get_max_cow,
	get_degrade_rate,
	get_start_date,
	get_end_date,
	get_milk_price,
	milk_price_update
}

